import Link from "next/link";
import { Article } from "@/lib/types";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {article.image && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.subcategory && (
            <span className="text-xs text-gray-400">{article.subcategory}</span>
          )}
        </div>
        <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2 group-hover:text-navy-light transition-colors">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
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
      </div>
    </article>
  );
}
