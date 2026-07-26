import Link from "next/link";

export interface ResultRow {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  status: string;
  /** Derived from the matched report, not from the fixture data. */
  sport?: "football" | "cricket";
  slug?: string;
  date?: string;
}

interface RecentResultsProps {
  rows: ResultRow[];
}

/**
 * The single merged results module.
 *
 * The front page previously carried both a "Recent Scores" list and a
 * "League Table" reading off the same source, which duplicated the
 * information and mislabelled it: a list of results is not a table of
 * positions and points.
 *
 * Columns render only where the underlying data actually supports them.
 * There is no fixture date in content/matchday.json, so there is no date
 * column - inventing one would be worse than omitting it.
 */
export default function RecentResults({ rows }: RecentResultsProps) {
  if (!rows.length) return null;

  const th =
    "font-ui pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cuva-muted";

  return (
    <section className="border-t border-cuva-rule py-12">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-heading text-[1.875rem] font-bold leading-tight text-cuva-ink">
          Recent Results
        </h2>
        <Link
          href="/reports"
          className="font-ui target-44 inline-flex items-center text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
        >
          All match reports &rarr;
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Recent results reported by CUVA Sports
          </caption>
          <thead>
            <tr className="border-b-2 border-cuva-ink">
              <th scope="col" className={`${th} w-[98px]`}>
                Sport
              </th>
              <th scope="col" className={`${th} w-[38%]`}>
                Competition
              </th>
              <th scope="col" className={th}>
                Result
              </th>
              <th scope="col" className={`${th} w-[140px]`}>
                Status
              </th>
              <th scope="col" className={`${th} w-[104px] text-right`}>
                Report
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const accent =
                row.sport === "cricket"
                  ? "border-cuva-cricket text-cuva-cricket"
                  : row.sport === "football"
                    ? "border-cuva-football text-cuva-football"
                    : "border-cuva-rule text-cuva-muted";

              return (
                <tr
                  key={`${row.home}-${row.away}-${i}`}
                  className="border-t border-cuva-rule transition-colors hover:bg-cuva-tint"
                >
                  <td className="py-3 pr-3">
                    {row.sport ? (
                      <span
                        className={`font-ui border-l-[3px] pl-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] ${accent}`}
                      >
                        {row.sport}
                      </span>
                    ) : null}
                  </td>
                  <td className="font-ui py-3 pr-4 text-[0.875rem] text-cuva-ink">
                    {row.competition}
                  </td>
                  <td className="py-3 pr-4">
                    {/* The grid of numbers is hidden from assistive tech and
                        replaced by a sentence that actually reads as a result. */}
                    <span className="sr-only">
                      {row.home} {row.homeScore}, {row.away} {row.awayScore}.
                    </span>
                    <span
                      aria-hidden="true"
                      className="figure-mono text-[0.9375rem] text-cuva-ink"
                    >
                      {row.home} {row.homeScore} - {row.awayScore} {row.away}
                    </span>
                  </td>
                  <td className="font-ui py-3 pr-4 text-xs font-semibold uppercase tracking-[0.06em] text-cuva-muted">
                    {row.status}
                  </td>
                  <td className="py-3 text-right">
                    {row.slug ? (
                      <Link
                        href={`/reports/${row.slug}`}
                        className="font-ui target-44 inline-flex items-center text-[0.875rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
                      >
                        Read
                      </Link>
                    ) : (
                      <span className="text-cuva-muted" aria-label="No report">
                        -
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="font-ui mt-4 text-xs text-cuva-muted">
        This module lists results only. The words &ldquo;League Table&rdquo; are
        used solely where actual positions and points are shown.
      </p>
    </section>
  );
}
