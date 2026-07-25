"use client";

import { useState, useEffect } from "react";

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

interface WcFinal {
  date: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  note?: string;
  venue?: string;
  slug?: string;
}

interface WcData {
  available: boolean;
  lastUpdated?: string;
  group?: string;
  table?: WcRow[];
  matches?: WcMatch[];
  complete?: boolean;
  final?: WcFinal;
  champion?: string;
  englandFinish?: string;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Compact stage labels for England's knockout run.
const STAGE_LABELS: Record<string, string> = {
  GROUP_STAGE: "Grp",
  LAST_32: "R32",
  LAST_16: "R16",
  QUARTER_FINALS: "QF",
  SEMI_FINALS: "SF",
  THIRD_PLACE: "3rd",
  FINAL: "Final",
};

export default function EnglandWorldCup() {
  const [data, setData] = useState<WcData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/wc-england")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: WcData) => setData(d))
      .catch(() => setFailed(true));
  }, []);

  // Hide entirely when unavailable or errored — no empty bordered box.
  if (failed) return null;

  if (!data) {
    return (
      <div className="p-4 border-b border-white/10">
        <div className="space-y-2 py-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-5 w-full rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!data.available) return null;

  const table = data.table ?? [];
  const matches = data.matches ?? [];
  const { complete, final, champion, englandFinish } = data;

  return (
    <div className="p-4 border-b border-white/10">
      <h2 className="font-ui text-xs font-bold uppercase tracking-widest text-on-ink opacity-60 mb-3">
        {complete ? "World Cup 2026 · Final Standings" : "England · World Cup"}
      </h2>

      {/* Tournament result — leads the panel once the World Cup has finished. */}
      {complete && final && (
        <div className="mb-4 rounded-md bg-amber/10 border border-amber/30 p-3">
          <div className="text-[10px] font-ui font-bold uppercase tracking-wider text-amber mb-1.5">
            Final &middot; {fmtDate(final.date)}
          </div>
          <div className="flex items-center gap-2 text-sm font-ui">
            <span className="flex-1 text-on-ink font-bold truncate">{final.home}</span>
            <span className="text-amber font-bold tabular-nums shrink-0">
              {final.homeScore}-{final.awayScore}
            </span>
            <span className="flex-1 text-on-ink text-right truncate">{final.away}</span>
          </div>
          {(final.note || final.venue) && (
            <div className="text-[10px] font-ui text-on-ink opacity-40 mt-1">
              {[final.note, final.venue].filter(Boolean).join(" · ")}
            </div>
          )}
          {champion && (
            <div className="text-[11px] font-ui text-on-ink opacity-70 mt-2 pt-2 border-t border-amber/20">
              <span className="text-amber font-bold">{champion}</span> are world champions
              {englandFinish && ` · England ${englandFinish.toLowerCase()}`}
            </div>
          )}
          {final.slug && (
            <a
              href={`/reports/${final.slug}`}
              className="inline-block mt-2 text-[11px] font-ui font-bold text-amber hover:underline"
            >
              Read the final report &rarr;
            </a>
          )}
        </div>
      )}

      {table.length > 0 && (
        <>
          <div className="grid grid-cols-[1.5rem_1fr_1.5rem_1.5rem_2rem] gap-1 text-[10px] font-ui font-bold uppercase tracking-wider text-on-ink opacity-40 mb-1 px-1">
            <span>#</span>
            <span>{data.group || "Group"}</span>
            <span className="text-center">P</span>
            <span className="text-center">GD</span>
            <span className="text-right">Pts</span>
          </div>
          <div className="space-y-0.5">
            {table.map((row) => {
              const isEng = row.club.toLowerCase().includes("england");
              return (
                <div
                  key={row.pos}
                  className={`grid grid-cols-[1.5rem_1fr_1.5rem_1.5rem_2rem] gap-1 items-center text-xs font-ui px-1 py-0.5 rounded-sm border-l-2 ${
                    isEng ? "border-amber bg-amber/10" : "border-transparent"
                  }`}
                >
                  <span className="text-on-ink opacity-40 text-[10px]">{row.pos}</span>
                  <span
                    className={`truncate text-[11px] ${
                      isEng ? "text-amber font-bold" : "text-on-ink font-medium"
                    }`}
                  >
                    {row.club}
                  </span>
                  <span className="text-center text-on-ink opacity-60 text-[10px]">
                    {row.played}
                  </span>
                  <span className="text-center text-on-ink opacity-60 text-[10px]">
                    {row.gd > 0 ? `+${row.gd}` : row.gd}
                  </span>
                  <span className="text-right text-amber font-bold text-[11px] tabular-nums">
                    {row.pts}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {matches.length > 0 && (
        <div className="mt-3 space-y-1">
          <div className="text-[10px] font-ui font-bold uppercase tracking-wider text-on-ink opacity-40 px-1 mb-1">
            {complete ? "England's Road to Third" : "England's Matches"}
          </div>
          {matches.map((m, i) => {
            const played = m.status === "FINISHED";
            const won = played && m.us !== null && m.them !== null && m.us > m.them;
            const lost = played && m.us !== null && m.them !== null && m.us < m.them;
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-xs font-ui px-1 py-0.5"
              >
                <span className="text-on-ink opacity-40 text-[10px] w-10 shrink-0">
                  {fmtDate(m.date)}
                </span>
                <span className="text-on-ink opacity-40 text-[10px] w-8 shrink-0">
                  {STAGE_LABELS[m.stage] ?? ""}
                </span>
                {/* "v"/"at" rather than H/A: an "H" sitting next to the stage label
                    read as part of a group name. */}
                <span className="flex-1 text-on-ink truncate text-[11px]">
                  <span className="opacity-40">
                    {m.homeAway === "H" ? "v " : "at "}
                  </span>
                  {m.opponent}
                </span>
                {played ? (
                  <span
                    className={`font-bold tabular-nums text-[11px] shrink-0 ${
                      won ? "text-amber" : lost ? "text-on-ink opacity-50" : "text-on-ink opacity-70"
                    }`}
                  >
                    {m.us}-{m.them}
                  </span>
                ) : (
                  <span className="text-on-ink opacity-40 text-[10px] shrink-0">
                    upcoming
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {data.lastUpdated && (
        <p className="text-[9px] font-ui text-on-ink opacity-25 mt-2">
          Updated {data.lastUpdated}
        </p>
      )}
    </div>
  );
}
