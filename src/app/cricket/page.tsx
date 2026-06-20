import { getArticlesByCategory, getAllSubcategories } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import MatchReportFilters from "@/components/MatchReportFilters";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Cricket",
  "Cricket coverage by William Powell — County Championship, Test cricket, and more."
);

export default function CricketPage() {
  const articles = getArticlesByCategory("cricket");
  const subcategories = getAllSubcategories("cricket");
  const formats = [...new Set(articles.map((a) => a.format).filter(Boolean))] as string[];
  const searchItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    tags: a.tags || [],
    excerpt: a.excerpt,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TranslatedHeading titleKey="cricket.title" subtitleKey="cricket.subtitle" />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar items={searchItems} />
        </div>
        <CategoryFilter />
      </div>

      <MatchReportFilters articles={articles} subcategories={subcategories} formats={formats} />
    </div>
  );
}
