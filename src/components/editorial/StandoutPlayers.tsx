import type { StandoutPlayer } from "@/lib/article-sections";

interface StandoutPlayersProps {
  players: StandoutPlayer[];
  author?: string;
  /** "standout players" for a match, "stars of the season" for a review. */
  heading?: string;
}

/**
 * This is a judgement, not a statistic, and it is labelled as one. Blurring
 * that line is exactly what erodes trust in a title whose value is the
 * reporter's own eye.
 */
export default function StandoutPlayers({
  players,
  author = "William Powell",
  heading,
}: StandoutPlayersProps) {
  if (!players.length) return null;

  return (
    <section className="my-10 border-l-[3px] border-cuva-navy-800 bg-cuva-tint px-8 py-7">
      <p className="mono-label">Editorial judgement, not a statistic</p>
      <h2 className="mt-2 font-heading text-[1.625rem] font-bold text-cuva-ink">
        {heading ?? `${author}'s standout players`}
      </h2>

      <ul className="mt-5">
        {players.map((p) => (
          <li key={p.name} className="border-b border-cuva-rule py-3 last:border-b-0">
            <p className="font-prose text-[1rem] leading-snug text-cuva-ink">
              <strong className="font-semibold">{p.name}</strong> {p.note}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.8125rem] text-cuva-muted">
        Selected by {author} at the ground.
      </p>
    </section>
  );
}
