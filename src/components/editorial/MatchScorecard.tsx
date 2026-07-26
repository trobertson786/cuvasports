interface MatchScorecardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeScorers?: string[];
  awayScorers?: string[];
  /** e.g. "Enzo Fernandez 90+3' (Argentina)" from the Match Details section. */
  sentOff?: string;
  competition?: string;
  venue?: string;
  date?: string;
  halfTime?: string;
  afterNinety?: string;
  /** Set when the result was decided after extra time. */
  aet?: boolean;
}

function longDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Screen readers must get the result as a sentence. A grid of numbers read
 * cell by cell is not a scoreline, so the visual block is aria-hidden and
 * this is announced in its place.
 */
function scoreSentence(p: MatchScorecardProps): string {
  const parts = [
    `${p.homeTeam} ${p.homeScore}, ${p.awayTeam} ${p.awayScore}${
      p.aet ? ", after extra time" : ""
    }.`,
  ];
  const scorers = [...(p.homeScorers ?? []), ...(p.awayScorers ?? [])];
  if (scorers.length) {
    parts.push(
      `Scorer${scorers.length > 1 ? "s" : ""}: ${scorers
        .map((s) => s.replace(/(\d+)$/, "$1 minutes"))
        .join(", ")}.`
    );
  }
  if (p.sentOff) parts.push(`Sent off: ${p.sentOff}.`);
  return parts.join(" ");
}

/** "Torres 106" -> "Torres 106'". Already-suffixed entries are left alone. */
function withMinuteMark(scorer: string): string {
  return /\d\s*'$/.test(scorer.trim()) ? scorer.trim() : `${scorer.trim()}'`;
}

/** Loser's name sits at 75% white so the result reads at a glance. */
function teamTone(mine: number, theirs: number): string {
  return mine >= theirs ? "text-white" : "text-white/75";
}

export default function MatchScorecard(props: MatchScorecardProps) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeScorers = [],
    awayScorers = [],
    sentOff,
    venue,
    date,
    halfTime,
    afterNinety,
    aet,
  } = props;

  const strip = [
    halfTime ? `HT ${halfTime}` : null,
    afterNinety ? `90 MIN ${afterNinety}` : null,
    venue,
    longDate(date),
  ].filter(Boolean) as string[];

  // The sending-off is attributed to whichever side is named in the detail.
  const sentOffHome = sentOff?.includes(homeTeam);
  const sentOffAway = sentOff?.includes(awayTeam);

  return (
    <section className="on-navy bg-cuva-navy-800 text-white">
      <span className="sr-only">{scoreSentence(props)}</span>

      <div aria-hidden="true">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 px-6 py-6">
          <div className="text-right">
            <p className={`font-prose text-[1.75rem] font-bold leading-tight ${teamTone(homeScore, awayScore)}`}>
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
            <p className={`font-prose text-[1.75rem] font-bold leading-tight ${teamTone(awayScore, homeScore)}`}>
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
    </section>
  );
}
