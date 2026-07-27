import Link from "next/link";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";
import { formatCategoryLabel } from "@/lib/taxonomy";
import MatchCardImage from "@/components/MatchCardImage";
import TextForwardCard from "@/components/TextForwardCard";

export default function ArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  // A report with no photograph degrades to a text-forward row rather than a
  // full-width branded rectangle. This is the server-side signal only:
  // MatchCardImage also falls back when an image fails to load at runtime,
  // which cannot be known here.
  if (!imageSrc) {
    return <TextForwardCard article={article} />;
  }

  return (
    <article className="group border-t border-cuva-rule transition-colors hover:bg-cuva-tint">
      {/* One call to action per card, and the whole card is the target. The
          headline alone was a 23px tap area; wrapping the card makes it the
          full height of the image and text together. */}
      <Link href={`/reports/${article.slug}`} className="block">
        {/* Aspect ratio is declared so nothing shifts as the picture loads. */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <MatchCardImage
            src={imageSrc}
            alt={article.title}
            className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="py-3.5">
          <span
            className={`kicker mb-1.5 block ${
              article.category === "cricket" ? "kicker-cricket" : "kicker-football"
            }`}
          >
            {formatCategoryLabel(article.category, article.subcategory)}
          </span>
          <h3 className="font-prose text-[1.0625rem] font-semibold leading-[1.3] text-cuva-ink transition-colors group-hover:text-cuva-link">
            {article.title}
          </h3>
          <div className="font-ui mt-2 flex items-center justify-between text-[0.6875rem] text-cuva-muted">
            <time dateTime={article.date} className="figure-mono uppercase">
              {new Date(article.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1">
              <span>{article.readingTime}</span>
              <span className="fwa-micro">FWA</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
