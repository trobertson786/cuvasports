export interface MatchScorecardProps {
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

export function longDate(iso?: string): string | null {
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
 * cell by cell is not a scoreline, so both visual blocks are aria-hidden and
 * this is announced in their place. It is rendered once, by the parent, so a
 * screen reader never hears the result twice.
 */
export function scoreSentence(p: MatchScorecardProps): string {
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
export function withMinuteMark(scorer: string): string {
  return /\d\s*'$/.test(scorer.trim()) ? scorer.trim() : `${scorer.trim()}'`;
}

/** Loser's name sits at 75% white so the result reads at a glance. */
export function teamTone(mine: number, theirs: number): string {
  return mine >= theirs ? "text-white" : "text-white/75";
}

/** The metadata strip, in the order it reads. */
export function metaStrip(p: MatchScorecardProps): string[] {
  return [
    p.halfTime ? `HT ${p.halfTime}` : null,
    p.afterNinety ? `90 MIN ${p.afterNinety}` : null,
    p.venue,
    longDate(p.date),
  ].filter(Boolean) as string[];
}
