import MatchScorecardDesktop from "./scorecard/MatchScorecardDesktop";
import MatchScorecardMobile from "./scorecard/MatchScorecardMobile";
import { MatchScorecardProps, scoreSentence } from "./scorecard/types";

export type { MatchScorecardProps };

/**
 * The scorecard, as two separate designs rather than one design with
 * breakpoint overrides threaded through it.
 *
 * The mobile and desktop layouts differ in shape, not in degree: desktop sets
 * the two sides either side of a combined scoreline, mobile gives each side a
 * row with its own tally. Expressing both in one tree meant duplicated score
 * elements toggled with hidden/shown pairs, which is harder to read and easier
 * to break than two honest components.
 *
 * The spoken result is rendered here, once, so a screen reader never hears the
 * scoreline twice. Both visual layouts are aria-hidden.
 */
export default function MatchScorecard(props: MatchScorecardProps) {
  return (
    <section className="on-navy bg-cuva-navy-800 text-white">
      <span className="sr-only">{scoreSentence(props)}</span>
      <MatchScorecardMobile {...props} />
      <MatchScorecardDesktop {...props} />
    </section>
  );
}
