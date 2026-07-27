import Link from "next/link";
import { Article } from "@/lib/types";
import { formatCategoryLabel } from "@/lib/taxonomy";

export default function DeskBriefs({ articles }: { articles: Article[] }) {
  return (
    <section className="col-rule min-[1000px]:pr-6">
      <h2 className="font-ui mb-4 border-b-2 border-cuva-ink pb-2 text-xs font-bold uppercase tracking-widest text-cuva-ink">
        From the Desk
      </h2>
      <div>
        {articles.slice(0, 4).map((article) => (
          <article
            key={article.slug}
            className="group border-b border-cuva-rule last:border-0"
          >
            {/* The whole brief is the target, not the 23px headline. */}
            <Link href={`/reports/${article.slug}`} className="block py-4">
              <span
                className={`kicker mb-1 block ${
                  article.category === "cricket"
                    ? "kicker-cricket"
                    : "kicker-football"
                }`}
              >
                {formatCategoryLabel(article.category, article.subcategory)}
              </span>
              <h3 className="font-prose mb-1.5 text-[1.0625rem] font-semibold leading-[1.3] text-cuva-ink transition-colors group-hover:text-cuva-link">
                {article.title}
              </h3>
              <p className="font-prose mb-2 line-clamp-2 text-[0.875rem] leading-[1.5] text-cuva-muted">
                {article.standfirst || article.excerpt}
              </p>
              <div className="font-ui flex items-center gap-2 text-[0.6875rem] text-cuva-muted">
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
