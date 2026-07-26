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

  const link =
    "target-44 inline-flex items-center font-ui text-xs font-medium text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]";

  return (
    <div className="border-b border-cuva-rule bg-cuva-newsprint">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8">
        <p className="font-ui text-xs text-cuva-muted">
          {today}
          <span className="mx-2 text-cuva-rule" aria-hidden="true">
            ·
          </span>
          London Edition
        </p>
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
