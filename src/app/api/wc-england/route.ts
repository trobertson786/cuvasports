import { NextResponse } from "next/server";

// ── England-at-the-World-Cup endpoint ────────────────────────────────────────
// Scoped deliberately to England: their group table + their fixtures/results,
// pulled live from football-data.org. Mirrors the get-standings pattern
// (parallel fetch, graceful fallback, CDN cache). Returns { available: false }
// rather than an error so the UI can simply hide when data is absent.

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

function unavailable(maxAge: number) {
  return NextResponse.json(
    { available: false },
    { status: 200, headers: { "Cache-Control": `public, s-maxage=${maxAge}` } }
  );
}

export async function GET() {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return unavailable(600);

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

    return NextResponse.json(
      {
        available: table.length > 0 || matches.length > 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        group: groupName,
        table,
        matches,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    console.error("[wc-england] failed:", err);
    return unavailable(300);
  }
}
