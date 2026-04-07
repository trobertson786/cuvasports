import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";
import { formatCategoryLabel } from "@/lib/taxonomy";
import FWABadge from "@/components/FWABadge";

export default function FeaturedArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  return (
    <article className="bg-surface-container rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-[0.375rem] rounded-bl-[0.375rem] overflow-hidden transition-all duration-300 group">
      <div className={`grid grid-cols-1 ${imageSrc ? "lg:grid-cols-2" : ""}`}>
        {imageSrc && (
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-surface/20" />
          </div>
        )}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-ui text-xs font-semibold uppercase tracking-wider text-apex bg-apex/10 px-3 py-1 rounded-full">
              {formatCategoryLabel(article.category, article.subcategory)}
            </span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-on-surface leading-tight mb-4">
            <Link href={`/reports/${article.slug}`} className="hover:text-primary transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="text-on-surface-muted leading-relaxed mb-6">
            {article.standfirst || article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-muted mb-6">
            <span>{article.author ?? "William Powell"}</span>
            <FWABadge size="sm" />
            <span>&middot;</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{article.readingTime}</span>
          </div>
          <Link
            href={`/reports/${article.slug}`}
            className="btn-gradient group/btn inline-block font-ui font-semibold px-6 py-3 rounded-lg self-start"
          >
            Read full article <span className="inline-block transition-transform group-hover/btn:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
