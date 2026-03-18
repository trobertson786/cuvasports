import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getImageForArticle } from "@/lib/gallery-images";

export default function FeaturedArticleCard({ article }: { article: Article }) {
  const imageSrc = getImageForArticle(article.slug, article.category, article.image);

  return (
    <article className="bg-white rounded-lg overflow-hidden border-l-4 border-gold hover:shadow-xl transition-shadow duration-300 group">
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
          </div>
        )}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-3 py-1 rounded">
              {article.category}
            </span>
            {article.subcategory && (
              <span className="text-xs font-medium text-white bg-navy px-2 py-0.5 rounded">
                {article.subcategory}
              </span>
            )}
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4">
            <Link href={`/blog/${article.slug}`} className="hover:text-navy-light transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span>{article.author ?? "William Powell"}</span>
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
            href={`/blog/${article.slug}`}
            className="group/btn inline-block bg-gold text-navy font-semibold px-6 py-3 rounded hover:bg-gold-light hover:shadow-md hover:scale-[1.02] transition-all duration-200 self-start"
          >
            Read full article <span className="inline-block transition-transform group-hover/btn:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
