import {
  MatchScorecardProps,
  metaStrip,
  teamTone,
  withMinuteMark,
} from "./types";

/**
 * The scorecard below 640px, designed for the width rather than squeezed into
 * it.
 *
 * Three columns side by side leave about 67px per team name at 390px, so
 * "Argentina" at 28px overflowed its column and pushed the whole document
 * 27px wider than the viewport. Here each side takes a row of its own with its
 * own goal tally on the right, which is how a scoreline reads on a phone
 * anyway, and the metadata strip stacks rather than wrapping mid-item.
 */
export default function MatchScorecardMobile(props: MatchScorecardProps) {
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
  const sides = [
    {
      team: homeTeam,
      score: homeScore,
      tone: teamTone(homeScore, awayScore),
      scorers: homeScorers,
      sentOff: sentOff?.includes(homeTeam) ? sentOff : null,
    },
    {
      team: awayTeam,
      score: awayScore,
      tone: teamTone(awayScore, homeScore),
      scorers: awayScorers,
      sentOff: sentOff?.includes(awayTeam) ? sentOff : null,
    },
  ];

  return (
    <div aria-hidden="true" className="sm:hidden">
      <div className="px-4 py-4">
        {sides.map((side) => (
          <div
            key={side.team}
            className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3 last:border-b-0"
          >
            <div className="min-w-0">
              <p
                className={`font-prose text-[1.625rem] font-bold leading-tight ${side.tone}`}
              >
                {side.team}
              </p>
              {side.scorers.length ? (
                <p className="mt-1 text-[0.8125rem] text-white/70">
                  {side.scorers.map(withMinuteMark).join(", ")}
                </p>
              ) : null}
              {side.sentOff ? (
                <p className="mt-1 text-[0.8125rem] text-white/70">
                  {side.sentOff} sent off
                </p>
              ) : null}
            </div>
            <p className="figure-mono shrink-0 text-[2rem] font-semibold leading-none text-cuva-gold">
              {side.score}
            </p>
          </div>
        ))}

        {aet ? (
          <span className="figure-mono mt-3 inline-block border border-cuva-gold/50 px-2 py-0.5 text-[0.6875rem] text-cuva-gold">
            AET
          </span>
        ) : null}
      </div>

      {strip.length ? (
        <ul className="figure-mono border-t border-white/20 px-4 py-2 text-[0.8125rem] text-white/70">
          {strip.map((item) => (
            <li key={item} className="py-0.5">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
