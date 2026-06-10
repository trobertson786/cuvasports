import { matchdayFixtures } from "@/lib/matchday";

export default function UpcomingFixtures() {
  const upcoming = matchdayFixtures.slice(0, 3);
  if (!upcoming.length) return null;

  return (
    <div>
      <h3 className="font-ui text-xs font-bold uppercase tracking-widest text-on-ink mb-3 opacity-70">
        Upcoming
      </h3>
      <div className="space-y-3">
        {upcoming.map((f, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-ui text-[10px] text-on-ink opacity-50 uppercase tracking-wider mb-0.5 truncate">
                {f.competition}
              </div>
              <div className="font-ui text-xs font-semibold text-on-ink leading-tight">
                {f.home} <span className="font-normal opacity-60">vs</span> {f.away}
              </div>
            </div>
            <span className="shrink-0 font-ui text-[10px] font-bold uppercase tracking-wider text-ink bg-amber px-2 py-0.5 rounded">
              {f.dateLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
