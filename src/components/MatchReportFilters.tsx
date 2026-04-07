"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import ArticleGrid from "./ArticleGrid";

interface MatchReportFiltersProps {
  articles: Article[];
  subcategories: string[];
  formats?: string[];
}

export default function MatchReportFilters({
  articles,
  subcategories,
  formats = [],
}: MatchReportFiltersProps) {
  const [activeSub, setActiveSub] = useState("All");
  const [activeFormat, setActiveFormat] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    let result = activeSub === "All"
      ? articles
      : articles.filter((a) => a.subcategory === activeSub);

    if (activeFormat !== "All") {
      result = result.filter((a) => a.format === activeFormat);
    }

    if (sortOrder === "oldest") {
      result = [...result].reverse();
    }

    return result;
  }, [articles, activeSub, activeFormat, sortOrder]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {["All", ...subcategories].map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`font-ui text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSub === sub
                ? "bg-apex text-surface"
                : "bg-surface-high text-on-surface-muted hover:bg-surface-highest hover:text-on-surface"
            }`}
          >
            {sub === "All" ? t("category.all") : sub}
          </button>
        ))}
      </div>
      {formats.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {["All", ...formats].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveFormat(fmt)}
              className={`font-ui text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFormat === fmt
                  ? "bg-apex text-surface"
                  : "bg-surface-high text-on-surface-muted hover:bg-surface-highest hover:text-on-surface"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mb-8">
        <span className="font-ui text-sm text-on-surface-muted">{t("filter.sort")}</span>
        <button
          onClick={() => setSortOrder("newest")}
          className={`font-ui text-sm px-3 py-1 rounded-lg font-medium transition-colors ${
            sortOrder === "newest"
              ? "bg-surface-highest text-on-surface"
              : "bg-surface-high text-on-surface-muted hover:bg-surface-highest"
          }`}
        >
          {t("filter.newest")}
        </button>
        <button
          onClick={() => setSortOrder("oldest")}
          className={`font-ui text-sm px-3 py-1 rounded-lg font-medium transition-colors ${
            sortOrder === "oldest"
              ? "bg-surface-highest text-on-surface"
              : "bg-surface-high text-on-surface-muted hover:bg-surface-highest"
          }`}
        >
          {t("filter.oldest")}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-on-surface-muted py-12">
          {t("filter.noResults")}
        </p>
      ) : (
        <ArticleGrid articles={filtered} />
      )}
    </>
  );
}
