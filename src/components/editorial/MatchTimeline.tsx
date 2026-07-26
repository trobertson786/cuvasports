import type { TimelineEvent } from "@/lib/article-sections";

interface MatchTimelineProps {
  events: TimelineEvent[];
  category?: string;
  /** Rendered inside the story, so the heading is quieter than a section h2. */
  inline?: boolean;
}

/**
 * Decisive moments carry weight; routine events stay plain. The red card
 * and the goal are marked by a left rule, a fill and a bold lead-in, so
 * the meaning never depends on colour alone.
 */
export default function MatchTimeline({
  events,
  category = "football",
  inline = false,
}: MatchTimelineProps) {
  if (!events.length) return null;

  const goalColour =
    category === "cricket" ? "border-cuva-cricket" : "border-cuva-football";

  return (
    <section className={inline ? "my-10 border-y border-cuva-rule py-6" : "my-10"}>
      {inline ? (
        <p className="mono-label mb-4">Timeline of key events</p>
      ) : (
        <>
          <h2 className="font-heading text-[1.75rem] font-bold text-cuva-ink">
            Timeline of key events
          </h2>
          <div className="mt-2 border-b-2 border-cuva-ink" />
        </>
      )}

      <ol className={inline ? "" : "mt-4"}>
        {events.map((e, i) => {
          const weighted = e.kind !== "plain";
          const frame =
            e.kind === "red"
              ? `border-l-[3px] border-cuva-live bg-white px-4`
              : e.kind === "goal"
                ? `border-l-[3px] ${goalColour} bg-cuva-tint px-4`
                : "border-b border-cuva-rule";

          return (
            <li
              key={`${e.minute}-${i}`}
              className={`grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-2 py-3 ${frame}`}
            >
              <span
                className={`figure-mono ${
                  e.kind === "red"
                    ? "text-cuva-live"
                    : e.kind === "goal"
                      ? "text-cuva-ink"
                      : "text-cuva-muted"
                } ${e.kind === "goal" ? "text-[1.0625rem]" : "text-[0.9375rem]"}`}
              >
                {e.minute}
              </span>
              <p
                className={`font-prose text-cuva-ink ${
                  weighted ? "text-[1.125rem]" : "text-[1rem]"
                } leading-snug`}
              >
                {e.lead ? <strong className="font-bold">{e.lead} </strong> : null}
                {e.text}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
