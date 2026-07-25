import { NextResponse } from "next/server";
// Imported (not readFileSync) so the JSON is bundled into the serverless
// function. public/ assets are NOT reliably present on Vercel's lambda fs.
import staticWorldCup from "../../../../public/data/world-cup.json";

// ── England-at-the-World-Cup endpoint ────────────────────────────────────────
// Scoped deliberately to England: their group table + their fixtures/results,
// pulled live from football-data.org. Mirrors the get-standings pattern
// (parallel fetch, graceful fallback, CDN cache).
//
// The free football-data.org tier allows 10 requests/minute and /api/get-standings
// already spends six of those, so this endpoint gets rate limited (429) in normal
// use. It therefore falls back to the bundled snapshot rather than returning
// { available: false }, which used to blank the panel entirely.

const TEAM = "England";
const BASE = "https://api.football-data.org/v4/competitions/WC";

interface WcRow {
  pos: number;
  club: string;
  played: number;
  gd: number;
  pts: number;
}

interface WcMatch {
  date: string;
  opponent: string;
  homeAway: "H" | "A";
  us: number | null;
  them: number | null;
  status: string;
  stage: string;
}

async function fetchJson(path: string, key: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Auth-Token": key },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`football-data.org ${res.status} for ${path}`);
  return res.json();
}

// Serve the bundled end-of-tournament snapshot when the live API is unavailable
// (no key, 403 on the free tier, or 429 rate limiting).
function fallback(maxAge: number) {
  return NextResponse.json(staticWorldCup, {
    status: 200,
    headers: { "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=3600` },
  });
}

export async function GET() {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return fallback(600);

  try {
    const [standings, matchesData] = await Promise.all([
      fetchJson("/standings", key),
      fetchJson("/matches", key),
    ]);

    // Find the group that actually contains England — robust to label format.
    const groups = (standings.standings ?? []) as Array<{
      group?: string;
      table?: Array<Record<string, unknown>>;
    }>;
    const myGroup = groups.find((g) =>
      (g.table ?? []).some(
        (r) => (r.team as { name?: string })?.name === TEAM
      )
    );

    let table: WcRow[] = [];
    let groupName = "";
    if (myGroup) {
      groupName = myGroup.group ?? "";
      table = (myGroup.table ?? [])
        .map((r) => {
          const team = (r.team as { shortName?: string; name?: string }) ?? {};
          return {
            pos: Number(r.position),
            club: (team.shortName ?? team.name ?? "").slice(0, 18),
            played: Number(r.playedGames),
            gd: Number(r.goalDifference),
            pts: Number(r.points),
          };
        })
        .filter((row) => row.club && !Number.isNaN(row.pos));
    }

    const allMatches = (matchesData.matches ?? []) as Array<Record<string, unknown>>;
    const matches: WcMatch[] = allMatches
      .map((m): WcMatch | null => {
        const home = (m.homeTeam as { name?: string })?.name ?? "";
        const away = (m.awayTeam as { name?: string })?.name ?? "";
        if (home !== TEAM && away !== TEAM) return null;
        const isHome = home === TEAM;
        const score =
          (m.score as { fullTime?: { home?: number | null; away?: number | null } })
            ?.fullTime ?? {};
        return {
          date: String(m.utcDate ?? "").slice(0, 10),
          opponent: isHome ? away : home,
          homeAway: isHome ? "H" : "A",
          us: isHome ? score.home ?? null : score.away ?? null,
          them: isHome ? score.away ?? null : score.home ?? null,
          status: String(m.status ?? ""),
          stage: String(m.stage ?? ""),
        };
      })
      .filter((x): x is WcMatch => x !== null)
      .sort((a, b) => a.date.localeCompare(b.date));

    // A live response with neither a table nor matches is no better than nothing —
    // use the bundled snapshot instead of rendering an empty panel.
    if (table.length === 0 && matches.length === 0) return fallback(300);

    // The tournament is over, so the champion / final / England's finish are not
    // in the England-scoped feed. Carry them through from the bundled snapshot.
    const { complete, final, champion, englandFinish } = staticWorldCup;

    return NextResponse.json(
      {
        available: true,
        lastUpdated: new Date().toISOString().split("T")[0],
        group: groupName,
        table,
        matches,
        complete,
        final,
        champion,
        englandFinish,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    console.error("[wc-england] live fetch failed, serving snapshot:", err);
    return fallback(300);
  }
}
