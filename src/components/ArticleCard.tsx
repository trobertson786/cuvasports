import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";
import { formatCategoryLabel } from "@/lib/taxonomy";

export default function ArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  return (
    <article className="bg-surface-container rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-[0.375rem] rounded-bl-[0.375rem] overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
      {imageSrc && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-surface/20" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-ui text-xs font-semibold uppercase tracking-wider text-apex bg-apex/10 px-2 py-0.5 rounded-full">
            {formatCategoryLabel(article.category, article.subcategory)}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold text-on-surface leading-snug mb-2 group-hover:text-primary transition-colors">
          <Link href={`/reports/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="font-body text-sm text-on-surface-muted leading-relaxed mb-4 line-clamp-2">
          {article.standfirst || article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-on-surface-muted">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{article.readingTime}</span>
        </div>
        <Link
          href={`/reports/${article.slug}`}
          className="inline-block mt-4 font-ui text-sm font-semibold text-apex hover:text-gold-light transition-colors"
        >
          Read more <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
