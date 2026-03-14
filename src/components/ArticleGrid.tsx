import { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3;
}

export default function ArticleGrid({
  articles,
  columns = 3,
}: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No articles found.
      </p>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        columns === 3
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
