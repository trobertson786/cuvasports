import { matchdayResults } from "@/lib/matchday";

export default function RecentScores() {
  if (!matchdayResults.length) return null;

  return (
    <div>
      <h3 className="font-ui text-xs font-bold uppercase tracking-widest text-on-ink mb-3 opacity-70">
        Recent Scores
      </h3>
      <div className="space-y-2">
        {matchdayResults.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="flex-1 text-right font-ui font-semibold text-on-ink text-xs leading-tight">
              {r.home}
            </div>
            <div className="flex items-center gap-1 font-mono text-amber font-bold text-sm tabular-nums shrink-0">
              <span>{r.homeScore}</span>
              <span className="text-on-ink opacity-40 text-xs">–</span>
              <span>{r.awayScore}</span>
            </div>
            <div className="flex-1 font-ui font-semibold text-on-ink text-xs leading-tight">
              {r.away}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
