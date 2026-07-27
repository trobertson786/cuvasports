import Link from "next/link";
import { Article } from "@/lib/types";
import { formatCategoryLabel } from "@/lib/taxonomy";

/**
 * The card for a report with no photograph.
 *
 * Twelve of eighty-one reports have no picture. Stretching the branded
 * fallback to 16:9 at full mobile width spends about 240px conveying nothing,
 * and two of them fill an entire phone screen. This gives that space back to
 * the scoreline, which is real information and the thing the reader came for,
 * and it does not imply a photograph exists.
 *
 * Three of these fit in the height one fallback card occupied.
 */
export default function TextForwardCard({ article }: { article: Article }) {
  // Cricket reports carry no score fields at all, and football previews and
  // columns have none either, so the mono anchor is omitted rather than
  // printed empty. Nothing here is inferred from the title.
  const hasScore = article.homeScore != null && article.awayScore != null;

  const kickerTone =
    article.category === "cricket" ? "kicker-cricket" : "kicker-football";

  return (
    <article className="border-b border-cuva-rule last:border-b-0">
      <Link
        href={`/reports/${article.slug}`}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1.5 py-3.5 transition-colors hover:bg-cuva-tint"
      >
        <span className={`kicker ${kickerTone}`}>
          {formatCategoryLabel(article.category, article.subcategory)}
        </span>

        {hasScore ? (
          <>
            <span className="sr-only">
              {article.homeTeam} {article.homeScore}, {article.awayTeam}{" "}
              {article.awayScore}.
            </span>
            <span
              aria-hidden="true"
              className="figure-mono row-span-3 self-center text-[1.375rem] font-semibold text-cuva-navy-800"
            >
              {article.homeScore}-{article.awayScore}
            </span>
          </>
        ) : (
          <span aria-hidden="true" className="row-span-3" />
        )}

        <h3 className="font-prose text-[1.125rem] font-semibold leading-[1.3] text-cuva-ink">
          {article.title}
        </h3>

        <time
          dateTime={article.date}
          className="figure-mono text-xs uppercase text-cuva-muted"
        >
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </Link>
    </article>
  );
}
