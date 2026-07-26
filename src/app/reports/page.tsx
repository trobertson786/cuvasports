import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import type { Article } from "@/lib/types";
import ArticleGrid from "@/components/ArticleGrid";
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Match Reports",
  "Match reports and analysis from William Powell - football, cricket, and more."
);

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Folds case, apostrophes and accents so "lords" finds "Lord's" and
 * "martinez" finds "Martinez". Venue and player names are most of what
 * anyone types into a sports archive, and both are full of punctuation a
 * reader will not reproduce.
 */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’']/g, "")
    .toLowerCase();
}

/**
 * Same fields SearchBar filters on, so the server-rendered results and the
 * type-ahead dropdown agree with each other.
 */
function matches(article: Article, q: string): boolean {
  const needle = fold(q);
  return (
    fold(article.title).includes(needle) ||
    fold(article.category).includes(needle) ||
    fold(article.subcategory ?? "").includes(needle) ||
    (article.tags ?? []).some((t) => fold(t).includes(needle)) ||
    fold(article.excerpt).includes(needle)
  );
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const articles = getAllArticles();
  const featured = getFeaturedArticles();
  const featuredArticle = featured[0] || articles[0];

  const searchItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    tags: a.tags || [],
    excerpt: a.excerpt,
  }));

  // A search replaces the page rather than decorating it: no featured card
  // sitting above a set of results, and every match shown.
  const results = query ? articles.filter((a) => matches(a, query)) : null;
  const remaining = articles.filter((a) => a.slug !== featuredArticle?.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <TranslatedHeading titleKey="blog.title" subtitleKey="blog.subtitle" />

      {!results && featuredArticle && (
        <>
          <FeaturedArticleCard article={featuredArticle} />
          <div className="my-10" />
        </>
      )}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <SearchBar items={searchItems} initialQuery={query} />
        </div>
        <CategoryFilter />
      </div>

      {results ? (
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-ui text-[0.9375rem] text-cuva-ink" role="status">
            {results.length} {results.length === 1 ? "report" : "reports"}{" "}
            matching <strong className="font-semibold">{query}</strong>
          </p>
          <Link
            href="/reports"
            className="font-ui target-44 inline-flex items-center text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
          >
            Clear search
          </Link>
        </div>
      ) : null}

      {results && results.length === 0 ? (
        <p className="font-ui py-8 text-[0.9375rem] text-cuva-muted">
          No reports match that search. Try a team, a competition or a venue.
        </p>
      ) : (
        <ArticleGrid articles={results ?? remaining} />
      )}
    </div>
  );
}
