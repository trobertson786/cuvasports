"use client";

import { useState, useEffect } from "react";

interface TableRow {
  pos: number;
  club: string;
  played: number;
  gd: number;
  pts: number;
}

interface LeagueData {
  name: string;
  rows: TableRow[];
  promotionZone?: number;
  europaZone?: number;
  relegationZone?: number;
}

interface Standings {
  lastUpdated: string;
  leagues: Record<string, LeagueData>;
}

const TABS = [
  { key: "PL", label: "PL" },
  { key: "Championship", label: "Champ" },
  { key: "L1", label: "L1" },
  { key: "L2", label: "L2" },
  { key: "UCL", label: "UCL" },
  { key: "UEL", label: "UEL" },
];

function rowBorder(pos: number, league: LeagueData): string {
  const promo = league.promotionZone ?? 2;
  const europa = league.europaZone;
  const rel = league.relegationZone ?? (league.rows.length - 2);

  if (pos <= promo) return "border-l-2 border-amber";
  if (europa && pos <= europa) return "border-l-2 border-amber/40";
  if (pos > rel) return "border-l-2 border-rel";
  return "border-l-2 border-transparent";
}

export default function LeagueTable() {
  const [standings, setStandings] = useState<Standings | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("PL");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/get-standings")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Standings) => setStandings(data))
      .catch(() => {
        // Fall back to static snapshot
        fetch("/data/standings.json")
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((data: Standings) => setStandings(data))
          .catch(() => setError(true));
      });
  }, []);

  if (error) {
    return (
      <div className="text-on-ink opacity-50 text-xs font-ui py-4 text-center">
        Table temporarily unavailable
      </div>
    );
  }

  if (!standings) {
    return (
      <div className="space-y-2 py-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-5 w-full rounded" />
        ))}
      </div>
    );
  }

  const league = standings.leagues[activeTab];
  if (!league) return null;

  const rows = league.rows;
  const totalRows = rows.length;
  const rel = league.relegationZone ?? totalRows - 3;
  const visibleRows = expanded ? rows : [...rows.slice(0, 6), ...rows.slice(rel)];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0.5 mb-3 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpanded(false); }}
            className={`font-ui text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
              activeTab === tab.key
                ? "bg-amber text-ink"
                : "text-on-ink opacity-50 hover:opacity-80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1.5rem_1fr_1.5rem_1.5rem_2rem] gap-1 text-[10px] font-ui font-bold uppercase tracking-wider text-on-ink opacity-40 mb-1 px-1">
        <span>#</span>
        <span>Club</span>
        <span className="text-center">P</span>
        <span className="text-center">GD</span>
        <span className="text-right">Pts</span>
      </div>

      {/* Rows */}
      <div className="space-y-0.5">
        {visibleRows.map((row, i) => {
          const isGap = !expanded && i === 6 && rows.length > 9;
          return (
            <div key={row.pos}>
              {isGap && (
                <div className="text-center text-on-ink opacity-20 text-[10px] py-0.5">···</div>
              )}
              <div
                className={`grid grid-cols-[1.5rem_1fr_1.5rem_1.5rem_2rem] gap-1 items-center text-xs font-ui px-1 py-0.5 rounded-sm ${rowBorder(row.pos, league)} ${
                  row.pos % 2 === 0 ? "bg-white/5" : ""
                }`}
              >
                <span className="text-on-ink opacity-40 text-[10px]">{row.pos}</span>
                <span className="text-on-ink font-medium truncate text-[11px]">{row.club}</span>
                <span className="text-center text-on-ink opacity-60 text-[10px]">{row.played}</span>
                <span className="text-center text-on-ink opacity-60 text-[10px]">
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </span>
                <span className="text-right text-amber font-bold text-[11px] tabular-nums">{row.pts}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand / collapse */}
      {totalRows > 9 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-2 text-[10px] font-ui font-bold uppercase tracking-wider text-on-ink opacity-40 hover:opacity-70 transition-opacity py-1"
        >
          {expanded ? "Show less" : `Show all ${totalRows}`}
        </button>
      )}

      {/* Zone legend */}
      <div className="flex gap-3 mt-3 text-[10px] font-ui text-on-ink opacity-40">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-amber inline-block" />
          Europe / Promotion
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-rel inline-block" />
          Relegation
        </span>
      </div>

      {/* Last updated */}
      {standings.lastUpdated && (
        <p className="text-[9px] font-ui text-on-ink opacity-25 mt-2">
          Updated {standings.lastUpdated}
        </p>
      )}
    </div>
  );
}
