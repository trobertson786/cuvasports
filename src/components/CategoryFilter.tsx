"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";

const categories: { href: string; labelKey: TranslationKey }[] = [
  { href: "/blog", labelKey: "category.all" },
  { href: "/football", labelKey: "category.football" },
  { href: "/cricket", labelKey: "category.cricket" },
];

export default function CategoryFilter() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div className="flex gap-2">
      {categories.map((cat) => {
        const isActive = pathname === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`font-ui text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-apex text-surface"
                : "bg-surface-high text-on-surface-muted hover:bg-surface-highest hover:text-on-surface"
            }`}
          >
            {t(cat.labelKey)}
          </Link>
        );
      })}
    </div>
  );
}
