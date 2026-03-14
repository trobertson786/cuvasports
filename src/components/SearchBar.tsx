"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
        placeholder="Search articles..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <span className="text-xs font-semibold uppercase text-gold-dark">
                {item.category}
              </span>
              <p className="text-sm font-medium text-navy">{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
