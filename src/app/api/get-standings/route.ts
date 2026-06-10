import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
// Imported (not readFileSync) so the JSON is bundled into the serverless
// function. public/ assets are NOT reliably present on Vercel's lambda fs.
import staticStandings from "../../../../public/data/standings.json";

// ── Competition codes ────────────────────────────────────────────────────────
const COMPETITION_MAP: Record<string, string> = {
  PL:           "PL",
  Championship: "ELC",
  L1:           "EL1",
  L2:           "EL2",
  UCL:          "CL",
  UEL:          "EL",
};

const ZONE_CONFIG: Record<string, {
  promotionZone?: number;
  europaZone?: number;
  relegationZone?: number;
}> = {
  PL:           { promotionZone: 4, europaZone: 6, relegationZone: 17 },
  Championship: { promotionZone: 2, europaZone: 6, relegationZone: 21 },
  L1:           { promotionZone: 3, europaZone: 7, relegationZone: 21 },
  L2:           { promotionZone: 3, europaZone: 7, relegationZone: 23 },
  UCL:          { promotionZone: 8 },
  UEL:          { promotionZone: 8 },
};

// ── Types ────────────────────────────────────────────────────────────────────
interface NormalizedRow {
  pos: number;
  club: string;
  played: number;
  gd: number;
  pts: number;
}

interface NormalizedLeague {
  key: string;
  rows: NormalizedRow[];
}

interface StandingsPayload {
  lastUpdated: string;
  leagues: Record<string, unknown>;
}

// ── Haiku tool schema — strict, no optional fields ───────────────────────────
// Token budget: 6 leagues × avg 22 rows × ~15 tokens/row ≈ 1980 tokens output.
// max_tokens set to 2500 — enough headroom, prevents runaway spend.
const NORMALIZE_TOOL: Anthropic.Tool = {
  name: "output_all_standings",
  description: "Output cleaned standings for all six competitions in one response.",
  input_schema: {
    type: "object" as const,
    required: ["leagues"],
    properties: {
      leagues: {
        type: "array",
        items: {
          type: "object",
          required: ["key", "rows"],
          properties: {
            key: { type: "string", description: "Competition key exactly as given (PL, Championship, L1, L2, UCL, UEL)" },
            rows: {
              type: "array",
              items: {
                type: "object",
                required: ["pos", "club", "played", "gd", "pts"],
                properties: {
                  pos:    { type: "integer", description: "League position (1-based)" },
                  club:   { type: "string",  description: "Club name, max 18 characters, use common short forms" },
                  played: { type: "integer", description: "Matches played" },
                  gd:     { type: "integer", description: "Goal difference (negative allowed)" },
                  pts:    { type: "integer", description: "Points total" },
                },
              },
            },
          },
        },
      },
    },
  },
};

// ── Haiku system prompt ──────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a football data formatter for a journalism website.

Your only job is to call output_all_standings with clean, compact league table data.

Rules:
- Club names: max 18 characters. Use standard short forms (e.g. "Man City", "Nott'm Forest", "Sheff Utd", "West Brom", "Birmingham", "Middlesbrough" → "Boro", "Wolverhampton" → "Wolves", "Tottenham Hotspur" → "Spurs").
- All numeric fields must be plain integers — no strings, no nulls, no decimals.
- Drop any row missing pos, club, played, gd, or pts.
- Preserve every competition key exactly as provided.
- Do not add commentary, explanations, or extra fields.
- Respond only with the tool call. No prose.`;

// ── Fetch raw table from football-data.org ───────────────────────────────────
async function fetchRawTable(
  apiKey: string,
  code: string
): Promise<Record<string, unknown>[]> {
  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${code}/standings`,
    {
      headers: { "X-Auth-Token": apiKey },
      signal: AbortSignal.timeout(6000),
    }
  );
  if (!res.ok) throw new Error(`football-data.org ${res.status} for ${code}`);
  const json = await res.json();
  return json.standings?.[0]?.table ?? [];
}

// ── Normalize inline (no Haiku) — used when ANTHROPIC_API_KEY absent ─────────
function normalizeInline(rawTable: Record<string, unknown>[]): NormalizedRow[] {
  return rawTable
    .map((row) => {
      const team = row.team as { shortName?: string; name: string };
      const club = (team.shortName ?? team.name ?? "").slice(0, 18);
      const pos    = Number(row.position);
      const played = Number(row.playedGames);
      const gd     = Number(row.goalDifference);
      const pts    = Number(row.points);
      if (!club || isNaN(pos) || isNaN(played) || isNaN(gd) || isNaN(pts)) return null;
      return { pos, club, played, gd, pts };
    })
    .filter(Boolean) as NormalizedRow[];
}

// ── Single batched Haiku call for all competitions ───────────────────────────
async function normalizeAllWithHaiku(
  rawByKey: Record<string, Record<string, unknown>[]>
): Promise<Record<string, NormalizedRow[]>> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userContent = Object.entries(rawByKey)
    .map(([key, rows]) => `${key}:\n${JSON.stringify(rows)}`)
    .join("\n\n");

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2500,          // ~2× the expected output — prevents runaway spend
    system: SYSTEM_PROMPT,
    tools: [NORMALIZE_TOOL],
    tool_choice: { type: "any" },
    messages: [{ role: "user", content: userContent }],
  });

  const toolUse = msg.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Haiku returned no tool_use block");
  }

  const input = toolUse.input as { leagues: NormalizedLeague[] };
  if (!Array.isArray(input.leagues)) throw new Error("Haiku output.leagues is not an array");

  return Object.fromEntries(input.leagues.map((l) => [l.key, l.rows]));
}

// ── Static JSON fallback (bundled at build time) ─────────────────────────────
function getStaticFallback(): StandingsPayload {
  return staticStandings as StandingsPayload;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET() {
  const footballKey = process.env.FOOTBALL_DATA_API_KEY;

  // No football API key — serve static fallback
  if (!footballKey) {
    const fallback = getStaticFallback();
    if (fallback) {
      return NextResponse.json(fallback, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" },
      });
    }
    return NextResponse.json({ error: "No standings data available" }, { status: 503 });
  }

  try {
    // 1. Fetch all competitions in parallel
    const fetchResults = await Promise.allSettled(
      Object.entries(COMPETITION_MAP).map(async ([key, code]) => {
        const rows = await fetchRawTable(footballKey, code);
        return [key, rows] as const;
      })
    );

    const fallback = getStaticFallback();
    const rawByKey: Record<string, Record<string, unknown>[]> = {};

    for (let i = 0; i < fetchResults.length; i++) {
      const result = fetchResults[i];
      const key = Object.keys(COMPETITION_MAP)[i];
      if (result.status === "fulfilled") {
        rawByKey[key] = result.value[1];
      } else {
        console.warn(`[get-standings] fetch failed for ${key}:`, result.reason);
      }
    }

    // 2. Normalize — single Haiku call if key present, inline otherwise
    let normalizedByKey: Record<string, NormalizedRow[]>;

    if (process.env.ANTHROPIC_API_KEY && Object.keys(rawByKey).length > 0) {
      try {
        normalizedByKey = await normalizeAllWithHaiku(rawByKey);
      } catch (err) {
        console.warn("[get-standings] Haiku normalization failed, using inline:", err);
        normalizedByKey = Object.fromEntries(
          Object.entries(rawByKey).map(([k, rows]) => [k, normalizeInline(rows)])
        );
      }
    } else {
      normalizedByKey = Object.fromEntries(
        Object.entries(rawByKey).map(([k, rows]) => [k, normalizeInline(rows)])
      );
    }

    // 3. Build final payload — merge in static fallback for any missing competition
    const leagues: Record<string, unknown> = {};
    for (const key of Object.keys(COMPETITION_MAP)) {
      if (normalizedByKey[key]?.length) {
        leagues[key] = { name: key, rows: normalizedByKey[key], ...ZONE_CONFIG[key] };
      } else if (fallback?.leagues?.[key]) {
        leagues[key] = fallback.leagues[key];
      }
    }

    return NextResponse.json(
      { lastUpdated: new Date().toISOString().split("T")[0], leagues },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("[get-standings] fatal:", err);
    const fallback = getStaticFallback();
    if (fallback) {
      return NextResponse.json(fallback, {
        headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" },
      });
    }
    return NextResponse.json({ error: "Standings unavailable" }, { status: 503 });
  }
}
