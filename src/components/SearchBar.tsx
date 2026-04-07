"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

interface SearchItem {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export default function SearchBar({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.excerpt.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query, items]);

  return (
    <div className="relative">
      <input
        type="search"
        placeholder={t("blog.search")}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="w-full px-4 py-2.5 rounded-lg bg-surface-highest text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder-on-surface-muted"
        style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-high rounded-lg z-50 overflow-hidden">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/reports/${item.slug}`}
              className="block px-4 py-3 hover:bg-surface-highest"
            >
              <span className="font-ui text-xs font-semibold uppercase text-apex">
                {item.category}
              </span>
              <p className="text-sm font-medium text-on-surface">{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
