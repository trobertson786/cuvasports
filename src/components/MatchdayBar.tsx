import { matchdayResults, matchdayFixtures } from "@/lib/matchday";

export default function MatchdayBar() {
  return (
    <section className="bg-surface-low border-b border-surface-high">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-1 mb-1.5">
          <span className="font-ui text-[9px] font-bold uppercase tracking-[0.15em] text-ink-faint">
            Results &amp; Fixtures
          </span>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-1.5">
          {matchdayResults.map((r, i) => (
            <div key={`r-${i}`} className="flex items-center gap-2">
              <span className="font-ui bg-surface-highest text-ink text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
                {r.status}
              </span>
              <span className="font-ui text-ink font-semibold text-xs">
                {r.home}
              </span>
              <span className="font-mono text-amber font-bold text-sm tabular-nums">
                {r.homeScore}–{r.awayScore}
              </span>
              <span className="font-ui text-ink font-semibold text-xs">
                {r.away}
              </span>
            </div>
          ))}
          {matchdayFixtures.map((f, i) => (
            <div key={`f-${i}`} className="flex items-center gap-2">
              <span className="font-ui bg-amber text-ink text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
                {f.dateLabel}
              </span>
              <span className="font-ui text-ink font-semibold text-xs">{f.home}</span>
              <span className="text-ink-faint text-xs">vs</span>
              <span className="font-ui text-ink font-semibold text-xs">{f.away}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
