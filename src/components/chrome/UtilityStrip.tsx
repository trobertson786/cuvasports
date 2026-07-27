import Link from "next/link";

/**
 * 40px strip above the masthead. Live date on the left, desk links on the
 * right. The date is generated at request time, so it is genuinely today's.
 */
export default function UtilityStrip() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // "Saturday 25 July 2026 · London Edition" does not fit at 320px, so the
  // narrow form drops the weekday name and the edition line rather than
  // wrapping the strip onto two rows.
  const shortDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // min-w-[44px] as well as target-44: "RSS" is only 23px of text, so without
  // it the target clears 44px in height but not in width.
  const link =
    "target-44 inline-flex min-w-[44px] items-center justify-center font-ui text-xs font-medium text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]";

  return (
    <div className="border-b border-cuva-rule bg-cuva-newsprint">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 min-[390px]:px-5 sm:px-6 lg:px-8">
        <p className="font-ui text-xs text-cuva-muted">
          <span className="sm:hidden">{shortDate}</span>
          <span className="hidden sm:inline">
            {today}
            <span className="mx-2 text-cuva-rule" aria-hidden="true">
              ·
            </span>
            London Edition
          </span>
        </p>
        {/* gap-6 is 24px, which is the minimum clear distance WCAG 2.2's
            target-spacing exception asks for between adjacent targets. */}
        <div className="flex items-center gap-6">
          <a href="/feed.xml" className={link}>
            RSS
          </a>
          <Link href="/contact" className={link}>
            Contact the desk
          </Link>
        </div>
      </div>
    </div>
  );
}
