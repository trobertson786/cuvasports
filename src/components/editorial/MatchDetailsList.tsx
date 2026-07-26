import type { DetailRow } from "@/lib/article-sections";

interface MatchDetailsListProps {
  rows: DetailRow[];
}

/** Scores, times and dates are set in mono so a reader can compare them. */
const MONO_LABELS = /score|half time|after 90|minutes|date/i;

export default function MatchDetailsList({ rows }: MatchDetailsListProps) {
  if (!rows.length) return null;

  return (
    <section className="my-10">
      <h2 className="font-heading text-[1.75rem] font-bold text-cuva-ink">
        Match details
      </h2>
      <div className="mt-2 border-b-2 border-cuva-ink" />

      <dl className="mt-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[170px_minmax(0,1fr)] gap-4 border-b border-cuva-rule py-3"
          >
            <dt className="font-ui text-[0.9375rem] font-semibold text-cuva-muted">
              {row.label}
            </dt>
            <dd
              className={`text-[0.9375rem] text-cuva-ink ${
                MONO_LABELS.test(row.label) ? "figure-mono" : "font-ui"
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
