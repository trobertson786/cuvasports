import {
  MatchScorecardProps,
  metaStrip,
  teamTone,
  withMinuteMark,
} from "./types";

/**
 * The scorecard from 640px up: home, scoreline, away across three columns.
 *
 * This is the settled desktop design and carries no mobile concerns. Its
 * narrow-viewport counterpart is a separate component, not a set of
 * breakpoint overrides threaded through this one.
 */
export default function MatchScorecardDesktop(props: MatchScorecardProps) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeScorers = [],
    awayScorers = [],
    sentOff,
    aet,
  } = props;

  const strip = metaStrip(props);
  const sentOffHome = sentOff?.includes(homeTeam);
  const sentOffAway = sentOff?.includes(awayTeam);

  return (
    <div aria-hidden="true" className="hidden sm:block">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 px-6 py-6">
        <div className="text-right">
          <p
            className={`font-prose text-[1.75rem] font-bold leading-tight ${teamTone(
              homeScore,
              awayScore
            )}`}
          >
            {homeTeam}
          </p>
          {homeScorers.length ? (
            <p className="mt-1 text-[0.8125rem] text-white/70">
              {homeScorers.map(withMinuteMark).join(", ")}
            </p>
          ) : null}
          {sentOffHome ? (
            <p className="mt-1 text-[0.8125rem] text-white/70">{sentOff} sent off</p>
          ) : null}
        </div>

        <div className="text-center">
          <p className="figure-mono text-[2.5rem] font-semibold leading-none text-cuva-gold">
            {homeScore} - {awayScore}
          </p>
          {aet ? (
            <span className="figure-mono mt-2 inline-block border border-cuva-gold/50 px-2 py-0.5 text-[0.6875rem] text-cuva-gold">
              AET
            </span>
          ) : null}
        </div>

        <div className="text-left">
          <p
            className={`font-prose text-[1.75rem] font-bold leading-tight ${teamTone(
              awayScore,
              homeScore
            )}`}
          >
            {awayTeam}
          </p>
          {awayScorers.length ? (
            <p className="mt-1 text-[0.8125rem] text-white/70">
              {awayScorers.map(withMinuteMark).join(", ")}
            </p>
          ) : null}
          {sentOffAway ? (
            <p className="mt-1 text-[0.8125rem] text-white/70">{sentOff} sent off</p>
          ) : null}
        </div>
      </div>

      {strip.length ? (
        <div className="figure-mono flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/20 px-6 py-3 text-[0.8125rem] text-white/70">
          {strip.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 ? <span className="text-white/30">·</span> : null}
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
