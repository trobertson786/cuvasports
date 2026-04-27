interface ScoreBoxProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition?: string;
  venue?: string;
  date: string;
  homeScorers?: string[];
  awayScorers?: string[];
}

export default function ScoreBox({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  competition,
  venue,
  date,
  homeScorers,
  awayScorers,
}: ScoreBoxProps) {
  return (
    <div className="bg-surface-container rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-5">
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          <div className="text-right flex-1">
            <span className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              {homeTeam}
            </span>
            {homeScorers?.length ? (
              <div className="mt-1">
                {homeScorers.map((scorer) => (
                  <div key={scorer} className="text-xs text-on-surface-muted">{scorer}</div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-apex">
              {homeScore}
            </span>
            <span className="text-on-surface-muted text-lg">-</span>
            <span className="font-heading text-3xl sm:text-4xl font-bold text-apex">
              {awayScore}
            </span>
          </div>
          <div className="text-left flex-1">
            <span className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              {awayTeam}
            </span>
            {awayScorers?.length ? (
              <div className="mt-1">
                {awayScorers.map((scorer) => (
                  <div key={scorer} className="text-xs text-on-surface-muted">{scorer}</div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {(competition || venue) && (
        <div className="px-6 py-3 border-t border-surface-high">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-ui text-on-surface-muted">
            {competition && <span className="uppercase tracking-wider font-semibold">{competition}</span>}
            {venue && (
              <>
                <span>&middot;</span>
                <span>{venue}</span>
              </>
            )}
            <span>&middot;</span>
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      )}
    </div>
  );
}
