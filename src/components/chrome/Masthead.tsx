import Link from "next/link";
import CuvaLogo from "@/components/brand/CuvaLogo";

/**
 * Logo lockup, descriptor, search.
 *
 * The search box submits to /reports, where the site's real search lives.
 * A search field that only looked like one would be the same mistake as
 * the newsletter link this redesign is removing.
 */
export default function Masthead() {
  return (
    <div className="bg-cuva-newsprint">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-8 px-8 py-6">
        <Link href="/" aria-label="CUVA Sports home" className="shrink-0">
          <CuvaLogo variant="horizontal" tone="navy" size={64} />
        </Link>

        <p className="font-prose hidden border-l border-cuva-rule pl-6 text-[1.0625rem] italic text-cuva-muted min-[1100px]:block">
          Football and cricket journalism, written from the press box.
        </p>

        <form action="/reports" method="get" className="flex shrink-0" role="search">
          <label htmlFor="masthead-search" className="sr-only">
            Search reports and archive
          </label>
          <input
            id="masthead-search"
            name="q"
            type="search"
            placeholder="Search reports and archive"
            className="font-ui h-11 w-[246px] border border-r-0 border-cuva-rule bg-white px-4 text-sm text-cuva-ink placeholder:text-cuva-muted"
          />
          <button
            type="submit"
            className="font-ui h-11 min-w-[88px] bg-cuva-navy-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-cuva-ink"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
