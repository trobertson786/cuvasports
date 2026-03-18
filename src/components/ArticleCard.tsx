import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";

export default function ArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  return (
    <article className="bg-white border-t-2 border-gold rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {imageSrc && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.subcategory && (
            <span className="text-xs font-medium text-white bg-navy px-2 py-0.5 rounded">
              {article.subcategory}
            </span>
          )}
        </div>
        <h3 className="font-heading text-xl font-bold text-navy leading-snug mb-2 group-hover:text-navy-light transition-colors">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
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
          href={`/blog/${article.slug}`}
          className="inline-block mt-4 text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
        >
          Read more <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
