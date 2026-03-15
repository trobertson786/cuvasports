import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import ArticleGrid from "@/components/ArticleGrid";
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Blog",
  "All articles from William Powell — football, cricket, and analysis."
);

export default function BlogPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticles();
  const featuredArticle = featured[0] || articles[0];
  const remaining = articles.filter((a) => a.slug !== featuredArticle?.slug);
  const searchItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    tags: a.tags || [],
    excerpt: a.excerpt,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TranslatedHeading titleKey="blog.title" subtitleKey="blog.subtitle" />

      {featuredArticle && (
        <>
          <FeaturedArticleCard article={featuredArticle} />
          <div className="border-t border-gold/30 my-10" />
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar items={searchItems} />
        </div>
        <CategoryFilter />
      </div>

      <ArticleGrid articles={remaining} />
    </div>
  );
}
