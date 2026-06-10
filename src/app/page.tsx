import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import Dateline from "@/components/Dateline";
import LeadStory from "@/components/LeadStory";
import DeskBriefs from "@/components/DeskBriefs";
import DataRail from "@/components/DataRail";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CUVA Sports",
  url: "https://cuvasports.com",
  description:
    "Expert football and cricket journalism by William Powell, FWA Life Member and sports writer since 1987.",
  publisher: {
    "@type": "Organization",
    name: "CUVA Sports",
    logo: {
      "@type": "ImageObject",
      url: "https://cuvasports.com/images/cuva-sports-logo.png",
    },
  },
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const featuredSlug = featured[0]?.slug;

  const nonFeatured = allArticles.filter((a) => a.slug !== featuredSlug);
  const deskArticles = nonFeatured.slice(0, 4);
  const groundsArticles = nonFeatured.slice(4, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Dateline />

      {/* ── Front page: 3-column newspaper layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_280px] gap-8 items-start">

          {/* Col 1 — Lead story */}
          {featured[0] ? (
            <LeadStory article={featured[0]} />
          ) : (
            <div className="col-rule pr-6 text-ink-mute font-ui text-sm py-8">
              No featured article yet.
            </div>
          )}

          {/* Col 2 — Desk briefs */}
          <div className="hidden lg:block">
            <DeskBriefs articles={deskArticles} />
          </div>

          {/* Col 3 — Data rail */}
          <div className="hidden lg:block">
            <DataRail />
          </div>
        </div>

        {/* Mobile: desk briefs and data rail stack below lead */}
        <div className="lg:hidden mt-8 space-y-8">
          <DeskBriefs articles={deskArticles} />
          <details className="group">
            <summary className="font-ui text-sm font-bold uppercase tracking-widest text-ink cursor-pointer list-none flex items-center justify-between py-3 border-t border-b border-surface-high">
              <span>League Table &amp; Scores</span>
              <span className="transition-transform group-open:rotate-180 text-amber">▾</span>
            </summary>
            <div className="mt-4">
              <DataRail />
            </div>
          </details>
        </div>
      </div>

      {/* ── Across the Grounds ── */}
      {groundsArticles.length > 0 && (
        <section className="border-t border-surface-high">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-ink">
                Across the Grounds
              </h2>
              <Link
                href="/reports"
                className="font-ui text-sm text-ink-mute hover:text-amber transition-colors"
              >
                All match reports &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groundsArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSignup />
    </>
  );
}
