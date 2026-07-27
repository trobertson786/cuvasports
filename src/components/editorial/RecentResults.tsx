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
      <div className="mb-5 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 className="font-heading text-balance text-[1.625rem] font-bold leading-tight text-cuva-ink sm:text-[1.875rem]">
          Recent Results
        </h2>
        <Link
          href="/reports"
          className="font-ui target-44 inline-flex items-center text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
        >
          All match reports &rarr;
        </Link>
      </div>

      <div className="md:overflow-x-auto">
        {/* Below md the table flattens into stacked rows. `min-w-[720px]`
            inside an overflow container was hiding Result, Status and Report
            off-screen on every phone: the scores, which are the only reason
            this module exists, were invisible.

            Flattening a table's `display` strips row and cell semantics in
            most browsers, which would break the `scope` associations, so
            `role` is re-asserted on every element whose display changes. */}
        <table
          role="table"
          className="block w-full border-collapse text-left md:table md:min-w-[720px]"
        >
          <caption className="sr-only">
            Recent results reported by CUVA Sports
          </caption>
          <thead className="sr-only md:not-sr-only md:table-header-group">
            <tr role="row" className="md:border-b-2 md:border-cuva-ink">
              <th scope="col" className={`${th} md:w-[98px]`}>
                Sport
              </th>
              <th scope="col" className={`${th} md:w-[38%]`}>
                Competition
              </th>
              <th scope="col" className={th}>
                Result
              </th>
              <th scope="col" className={`${th} md:w-[140px]`}>
                Status
              </th>
              <th scope="col" className={`${th} md:w-[104px] md:text-right`}>
                Report
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
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
                  role="row"
                  className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 border-t border-cuva-rule py-3.5 transition-colors last:border-b last:border-cuva-rule hover:bg-cuva-tint md:table-row md:gap-0 md:py-0 md:last:border-b-0"
                >
                  <td role="cell" data-label="Sport" className="md:py-3 md:pr-3">
                    {row.sport ? (
                      <span
                        className={`font-ui border-l-[3px] pl-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] ${accent}`}
                      >
                        {row.sport}
                      </span>
                    ) : null}
                  </td>
                  <td
                    role="cell"
                    data-label="Competition"
                    className="font-ui min-w-0 flex-1 text-[0.8125rem] text-cuva-muted md:py-3 md:pr-4 md:text-[0.875rem] md:text-cuva-ink"
                  >
                    {row.competition}
                  </td>
                  {/* The scoreline is what the reader came for, so below md it
                      takes a full line of its own and the largest type in the
                      row. The grid of numbers is hidden from assistive tech and
                      replaced by a sentence that actually reads as a result. */}
                  <td
                    role="cell"
                    data-label="Result"
                    className="basis-full md:basis-auto md:py-3 md:pr-4"
                  >
                    <span className="sr-only">
                      {row.home} {row.homeScore}, {row.away} {row.awayScore}.
                    </span>
                    <span
                      aria-hidden="true"
                      className="figure-mono text-[1.1875rem] text-cuva-ink md:text-[0.9375rem]"
                    >
                      {row.home} {row.homeScore} - {row.awayScore} {row.away}
                    </span>
                  </td>
                  <td
                    role="cell"
                    data-label="Status"
                    className="font-ui text-xs font-semibold uppercase tracking-[0.06em] text-cuva-muted md:py-3 md:pr-4"
                  >
                    {row.status}
                  </td>
                  <td
                    role="cell"
                    data-label="Report"
                    className="basis-full md:basis-auto md:py-3 md:text-right"
                  >
                    {row.slug ? (
                      <Link
                        href={`/reports/${row.slug}`}
                        className="font-ui target-44 inline-flex items-center text-[0.9375rem] font-semibold text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px] md:text-[0.875rem] md:font-normal"
                      >
                        <span className="md:hidden">
                          Read the report{" "}
                          <span aria-hidden="true" className="figure-mono pl-2">
                            &rarr;
                          </span>
                        </span>
                        <span className="hidden md:inline">Read</span>
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
