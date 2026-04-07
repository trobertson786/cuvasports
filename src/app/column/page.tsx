import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import { generatePageMetadata } from "@/lib/metadata";
import ArticleGrid from "@/components/ArticleGrid";
import FWABadge from "@/components/FWABadge";

export const metadata = generatePageMetadata(
  "From the Press Box",
  "William Powell's weekly column on the state of the game — four decades of insight from the press box."
);

export default function ColumnPage() {
  const columns = getAllArticles().filter((a) => a.format === "Column");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Column header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            src="/images/william-powell.jpg"
            alt="William Powell"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <p className="font-ui text-xs font-semibold uppercase tracking-widest text-apex mb-3">
          Weekly Column
        </p>
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-on-surface mb-4">
          From the Press Box
        </h1>
        <p className="text-on-surface-muted text-lg leading-relaxed max-w-2xl mx-auto mb-4">
          William Powell&apos;s weekly column on the state of the game — four decades of insight from the press box.
        </p>
        <FWABadge />
      </div>

      {columns.length === 0 ? (
        <p className="text-center text-on-surface-muted py-12">
          The first column is coming soon. Check back next week.
        </p>
      ) : (
        <ArticleGrid articles={columns} columns={2} />
      )}
    </div>
  );
}
