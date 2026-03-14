import { getArticlesByCategory } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import ArticleGrid from "@/components/ArticleGrid";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";

export const metadata = generatePageMetadata(
  "Analysis",
  "In-depth tactical analysis and commentary by William Powell."
);

export default function AnalysisPage() {
  const articles = getArticlesByCategory("analysis");
  const searchItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    tags: a.tags || [],
    excerpt: a.excerpt,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-navy mb-2">
        Analysis
      </h1>
      <p className="text-gray-500 mb-8">
        In-depth tactical analysis and expert commentary.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar items={searchItems} />
        </div>
        <CategoryFilter />
      </div>

      <ArticleGrid articles={articles} />
    </div>
  );
}
