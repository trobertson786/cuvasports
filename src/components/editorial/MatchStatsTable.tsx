import type { StatRow } from "@/lib/article-sections";

interface MatchStatsTableProps {
  home: string;
  away: string;
  rows: StatRow[];
  category?: string;
  /**
   * Where the figures came from. Any figure not counted in William's
   * notebook has to be attributable, which is the whole point of the row.
   */
  sourceNote?: string;
}

const DEFAULT_SOURCE =
  "Possession, shots, passing and fouls: official match data issued in the press box. Expected goals: third party provider, as published. Saves counted at the ground and verified against the team sheet.";

export default function MatchStatsTable({
  home,
  away,
  rows,
  category = "football",
  sourceNote = DEFAULT_SOURCE,
}: MatchStatsTableProps) {
  const sectionColour =
    category === "cricket" ? "text-cuva-cricket" : "text-cuva-football";

  return (
    <section className="my-10">
      <h2 className="font-heading text-[1.75rem] font-bold text-cuva-ink">
        Match statistics
      </h2>
      <div className="mt-2 border-b-2 border-cuva-ink" />

      <div className="overflow-x-auto">
        <table className="mt-5 w-full border-collapse text-left">
          <caption className="mb-3 text-left text-[0.8125rem] text-cuva-muted">
            {home} and {away} compared. Figures recorded in the press box and
            checked against the official post-match team sheet.
          </caption>
          <thead>
            <tr className="border-b border-cuva-rule">
              <th
                scope="col"
                className="font-ui pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cuva-muted"
              >
                Metric
              </th>
              {/* Distinguished by colour AND by position and label, never
                  by colour alone. */}
              <th
                scope="col"
                className={`font-ui pb-2 text-right text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${sectionColour}`}
              >
                {home}
              </th>
              <th
                scope="col"
                className="font-ui pb-2 text-right text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cuva-navy-800"
              >
                {away}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-b border-cuva-rule">
                <th
                  scope="row"
                  className="font-ui py-3 pr-4 text-[0.9375rem] font-semibold text-cuva-ink"
                >
                  {row.metric}
                </th>
                <td className="figure-mono py-3 text-right text-[0.9375rem] text-cuva-ink">
                  {row.home}
                </td>
                <td className="figure-mono py-3 text-right text-[0.9375rem] text-cuva-ink">
                  {row.away}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-4">
        <span className="mono-label pt-0.5">Source</span>
        <p className="text-xs leading-relaxed text-cuva-muted">{sourceNote}</p>
      </div>
    </section>
  );
}
