"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { href: "/blog", label: "All" },
  { href: "/football", label: "Football" },
  { href: "/cricket", label: "Cricket" },
  { href: "/analysis", label: "Analysis" },
];

export default function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {categories.map((cat) => {
        const isActive = pathname === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-navy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
