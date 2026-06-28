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

  const countFor = (sub: string) =>
    sub === "All" ? articles.length : articles.filter((a) => a.subcategory === sub).length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-surface-highest">
        <div className="relative">
          <select
            aria-label="Filter by competition"
            value={activeSub}
            onChange={(e) => setActiveSub(e.target.value)}
            className="appearance-none font-ui text-sm font-medium pl-4 pr-9 py-2 rounded-lg bg-surface-high text-on-surface border border-surface-highest hover:bg-surface-highest transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-apex/40"
          >
            <option value="All">{t("category.all")} ({countFor("All")})</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub} ({countFor(sub)})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted text-xs">
            ▾
          </span>
        </div>

        {formats.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...formats].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className={`font-ui text-sm px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                  activeFormat === fmt
                    ? "bg-apex text-surface"
                    : "bg-surface-high text-on-surface-muted hover:bg-surface-highest hover:text-on-surface"
                }`}
              >
                {fmt === "All" ? t("category.all") : fmt}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 sm:ml-auto">
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
