import { getArticlesByCategory, getAllSubcategories } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MatchReportFilters from "@/components/MatchReportFilters";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Football",
  "Football coverage by William Powell — Premier League, EFL, and beyond."
);

export default function FootballPage() {
  const articles = getArticlesByCategory("football");
  const subcategories = getAllSubcategories("football");
  const searchItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    tags: a.tags || [],
    excerpt: a.excerpt,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TranslatedHeading titleKey="football.title" subtitleKey="football.subtitle" />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar items={searchItems} />
        </div>
        <CategoryFilter />
      </div>

      <MatchReportFilters articles={articles} subcategories={subcategories} />
    </div>
  );
}
