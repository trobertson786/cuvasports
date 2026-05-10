import { matchdayResults, matchdayFixtures } from "@/lib/matchday";

export default function MatchdayBar() {
  return (
    <section className="bg-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface-muted">
            Results &amp; Fixtures
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          {matchdayResults.map((r, i) => (
            <div key={`r-${i}`} className="flex items-center gap-3">
              <span className="font-ui bg-surface-highest text-on-surface text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                {r.status}
              </span>
              <span className="font-ui text-on-surface font-bold text-sm">
                {r.home} {r.homeScore}
              </span>
              <span className="text-on-surface-muted text-xs">-</span>
              <span className="font-ui text-on-surface font-bold text-sm">
                {r.awayScore} {r.away}
              </span>
              <span className="font-ui text-[10px] uppercase tracking-[0.12em] text-on-surface-muted">
                {r.competition}
              </span>
            </div>
          ))}

          {matchdayFixtures.map((f, i) => (
            <div key={`f-${i}`} className="flex items-center gap-3">
              <span className="font-ui bg-apex text-surface text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                {f.dateLabel}
              </span>
              <span className="font-ui text-on-surface font-bold text-sm">{f.home}</span>
              <span className="text-on-surface-muted text-xs">vs</span>
              <span className="font-ui text-on-surface font-bold text-sm">{f.away}</span>
              <span className="font-ui text-[10px] uppercase tracking-[0.12em] text-on-surface-muted">
                {f.competition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
