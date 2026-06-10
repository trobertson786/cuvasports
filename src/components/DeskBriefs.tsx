import Link from "next/link";
import { Article } from "@/lib/types";
import { formatCategoryLabel } from "@/lib/taxonomy";

export default function DeskBriefs({ articles }: { articles: Article[] }) {
  return (
    <section className="col-rule pr-6">
      <h2 className="font-ui text-xs font-bold uppercase tracking-widest text-ink-mute mb-4 pb-2 border-b border-surface-high">
        From the Desk
      </h2>
      <div className="space-y-5">
        {articles.slice(0, 4).map((article) => (
          <article key={article.slug} className="pb-5 border-b border-surface-high last:border-0 last:pb-0">
            <span className="kicker mb-1 block">
              {formatCategoryLabel(article.category, article.subcategory)}
            </span>
            <h3 className="font-heading text-base font-bold text-ink leading-snug mb-1.5 hover:text-amber transition-colors">
              <Link href={`/reports/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="font-body text-xs text-ink-mute leading-relaxed line-clamp-2 mb-2">
              {article.standfirst || article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-ui text-ink-faint">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </time>
              <span>·</span>
              <span>{article.readingTime}</span>
              <span className="fwa-micro">FWA</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
