import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";
import { formatCategoryLabel } from "@/lib/taxonomy";

export default function ArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  return (
    <article className="bg-surface-container rounded overflow-hidden border border-surface-high hover:border-amber/40 hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-400"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <span className="kicker mb-1.5 block">
          {formatCategoryLabel(article.category, article.subcategory)}
        </span>
        <h3 className="font-heading text-base font-bold text-ink leading-snug mb-1.5 group-hover:text-amber transition-colors">
          <Link href={`/reports/${article.slug}`}>{article.title}</Link>
        </h3>
        <div className="flex items-center justify-between text-[10px] font-ui text-ink-faint mt-2">
          <time dateTime={article.date}>
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
    </article>
  );
}
