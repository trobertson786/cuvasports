import Link from "next/link";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";
import { formatCategoryLabel } from "@/lib/taxonomy";
import MatchCardImage from "@/components/MatchCardImage";

function getHeroCta(article: Article): string {
  switch (article.format) {
    case "Match Report":  return "Read the match report";
    case "Preview":       return "Read the preview";
    case "Analysis":      return "Read the analysis";
    case "Column":        return "Read William's column";
    case "Predictions":   return "Read the predictions";
    default:              return "Read the full report";
  }
}

export default function LeadStory({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);
  const hasScore = article.homeScore != null && article.awayScore != null;

  return (
    <article className="col-rule animate-fade-in-up min-[1000px]:pr-6">
      <span
        className={`kicker mb-2 block ${
          article.category === "cricket" ? "kicker-cricket" : "kicker-football"
        }`}
      >
        {formatCategoryLabel(article.category, article.subcategory)}
      </span>

      {/* 32px at 320, 34px at 430, 44px at 1024. Playfair never goes below
          20px, so this is the floor, not a proportional shrink. */}
      <h1 className="font-heading mb-3 text-balance text-[2rem] font-bold leading-[1.1] text-cuva-ink min-[430px]:text-[2.125rem] lg:text-[2.6rem]">
        <Link href={`/reports/${article.slug}`} className="transition-colors hover:text-cuva-link">
          {article.title}
        </Link>
      </h1>

      <div className="byline-row mb-4">
        <span className="byline-name">{article.author ?? "William Powell"}</span>
        <span className="byline-sep" aria-hidden="true">·</span>
        <time dateTime={article.date} className="byline-date">
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span className="byline-sep" aria-hidden="true">·</span>
        <span className="byline-read">{article.readingTime}</span>
      </div>

      {/* No photograph means no image slot at all. A 16:9 branded rectangle at
          full mobile width costs about 240px and conveys nothing; the
          scoreline in its place is real information. */}
      {imageSrc ? (
        <div className="group relative mb-4 aspect-[16/9] overflow-hidden">
          <MatchCardImage
            src={imageSrc}
            alt={article.title}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      ) : hasScore ? (
        <div className="mb-4 border-y-2 border-cuva-ink py-4">
          <span className="sr-only">
            {article.homeTeam} {article.homeScore}, {article.awayTeam}{" "}
            {article.awayScore}.
          </span>
          <p
            aria-hidden="true"
            className="figure-mono text-[2rem] font-semibold leading-none text-cuva-navy-800"
          >
            {article.homeScore}-{article.awayScore}
          </p>
          <p className="font-ui mt-2 text-[0.8125rem] text-cuva-muted">
            {article.homeTeam} v {article.awayTeam}
            {article.venue ? `, ${article.venue}` : ""}
          </p>
        </div>
      ) : null}

      <p className="font-prose mb-5 text-[1.125rem] leading-[1.6] text-cuva-ink">
        {article.standfirst || article.excerpt}
      </p>

      <Link
        href={`/reports/${article.slug}`}
        className="font-ui target-44 group inline-flex items-center gap-2 bg-cuva-navy-800 px-5 text-sm font-bold text-white transition-colors hover:bg-cuva-ink"
      >
        {getHeroCta(article)}
        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
      </Link>
    </article>
  );
}
