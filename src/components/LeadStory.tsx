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

  return (
    <article className="col-rule pr-6 animate-fade-in-up">
      <span className="kicker mb-2 block">
        {formatCategoryLabel(article.category, article.subcategory)}
      </span>

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-ink leading-[1.1] mb-3">
        <Link href={`/reports/${article.slug}`} className="hover:text-amber transition-colors">
          {article.title}
        </Link>
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-xs font-ui text-ink-mute mb-4">
        <span className="font-semibold text-ink">{article.author ?? "William Powell"}</span>
        <span>·</span>
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-4 group">
        <MatchCardImage
          src={imageSrc}
          alt={article.title}
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
      </div>

      <p className="font-body text-base text-ink leading-relaxed mb-5">
        {article.standfirst || article.excerpt}
      </p>

      <Link
        href={`/reports/${article.slug}`}
        className="inline-flex items-center gap-2 font-ui text-sm font-bold text-on-ink bg-ink hover:bg-amber hover:text-ink px-5 py-2.5 rounded transition-colors group"
      >
        {getHeroCta(article)}
        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
      </Link>
    </article>
  );
}
