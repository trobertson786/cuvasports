import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { matchdayResults } from "@/lib/matchday";
import type { Article } from "@/lib/types";
import LeadStory from "@/components/LeadStory";
import DeskBriefs from "@/components/DeskBriefs";
import ArticleCard from "@/components/ArticleCard";
import LeagueTable from "@/components/LeagueTable";
import NewsletterSignup from "@/components/NewsletterSignup";
import RecentResults, { type ResultRow } from "@/components/editorial/RecentResults";
import CredibilityBlock from "@/components/editorial/CredibilityBlock";

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
      url: "https://cuvasports.com/brand/cuva-logo-schema.png",
      width: 512,
      height: 512,
    },
  },
};

/**
 * Links a matchday result to the report that covers it, by teams and score.
 * The sport label and the "Read" link are both derived from that match, so
 * neither is asserted where no report exists.
 */
function matchReport(
  result: (typeof matchdayResults)[number],
  articles: Article[]
): Article | undefined {
  return articles.find(
    (a) =>
      a.homeTeam === result.home &&
      a.awayTeam === result.away &&
      a.homeScore === result.homeScore &&
      a.awayScore === result.awayScore
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
  sport,
}: {
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
  sport: "football" | "cricket";
}) {
  const colour = sport === "cricket" ? "text-cuva-cricket" : "text-cuva-football";
  const rule = sport === "cricket" ? "border-cuva-cricket" : "border-cuva-football";

  // Below sm the link drops under the subtitle rather than sharing a baseline
  // row with the h2, which was forcing "54 reports" to break onto a line of
  // its own. At sm and above the grid puts it back on the h2's baseline, which
  // is where the desktop design has it.
  return (
    <div
      className={`grid gap-x-4 border-t-[3px] pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline ${rule}`}
    >
      <h2
        className={`font-heading text-balance text-[1.625rem] font-bold leading-tight sm:text-[1.875rem] ${colour}`}
      >
        {title}
      </h2>
      <Link
        href={href}
        className="font-ui target-44 order-3 inline-flex items-center text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px] sm:order-2 sm:col-start-2 sm:row-start-1"
      >
        {linkLabel} &rarr;
      </Link>
      <p className="font-ui order-2 mt-1 text-balance text-[0.875rem] text-cuva-muted sm:order-3 sm:col-start-1 sm:row-start-2">
        {subtitle}
      </p>
    </div>
  );
}

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const featuredSlug = featured[0]?.slug;

  const nonFeatured = allArticles.filter((a) => a.slug !== featuredSlug);
  const deskArticles = nonFeatured.slice(0, 5);

  const football = nonFeatured.filter((a) => a.category === "football");
  const cricket = nonFeatured.filter((a) => a.category === "cricket");
  const groundsArticles = nonFeatured.slice(0, 4);

  const resultRows: ResultRow[] = matchdayResults.map((r) => {
    const report = matchReport(r, allArticles);
    return { ...r, sport: report?.category, slug: report?.slug };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="mx-auto max-w-[1320px] px-4 min-[390px]:px-5 sm:px-6 lg:px-8">
        {/* ── Lead: 8 columns of story, 4 of latest ── */}
        <section className="border-b-2 border-cuva-ink py-8">
          <div className="grid gap-8 min-[1000px]:grid-cols-12">
            <div className="min-[1000px]:col-span-8">
              {featured[0] ? (
                <LeadStory article={featured[0]} />
              ) : (
                <p className="font-ui py-8 text-sm text-cuva-muted">
                  No featured article yet.
                </p>
              )}
            </div>

            <div className="min-[1000px]:col-span-4 min-[1000px]:border-l min-[1000px]:border-cuva-rule min-[1000px]:pl-8">
              <DeskBriefs articles={deskArticles} />
            </div>
          </div>
        </section>

        {/* ── Football ── */}
        {football.length > 0 && (
          <section className="py-12">
            <SectionHeader
              sport="football"
              title="Football"
              subtitle={`Premier League, EFL and international coverage · ${football.length} reports`}
              href="/football"
              linkLabel="All football"
            />
            <div className="mt-6 grid gap-8 min-[1000px]:grid-cols-12">
              <div className="min-[1000px]:col-span-7">
                {football[0] ? <ArticleCard article={football[0]} /> : null}
              </div>
              <div className="min-[1000px]:col-span-5">
                <div className="grid gap-6 sm:grid-cols-2 min-[1000px]:grid-cols-1">
                  {football.slice(1, 4).map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Cricket ── */}
        {cricket.length > 0 && (
          <section className="py-12">
            <SectionHeader
              sport="cricket"
              title="Cricket"
              subtitle={`Test, county and white-ball coverage · ${cricket.length} reports`}
              href="/cricket"
              linkLabel="All cricket"
            />
            <div className="mt-6 grid gap-8 min-[1000px]:grid-cols-12">
              <div className="min-[1000px]:col-span-6">
                {cricket[0] ? <ArticleCard article={cricket[0]} /> : null}
              </div>
              <div className="min-[1000px]:col-span-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {cricket.slice(1, 3).map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Recent Results: the single merged module ── */}
        <RecentResults rows={resultRows} />

        {/* ── League Table ──
            Kept, and kept under that name, because it is wired to real
            standings via /api/get-standings and does show positions and
            points. It was the invented table that got cut, not this one.

            LeagueTable styles its rows for a dark surface (it was built to
            live inside DataRail's bg-ink container), so it keeps that
            surface here rather than being restyled. */}
        <section className="border-t border-cuva-rule py-12">
          <h2 className="font-heading mb-5 text-[1.625rem] font-bold leading-tight text-cuva-ink sm:text-[1.875rem]">
            League Table
          </h2>
          <div className="on-navy bg-cuva-ink p-4 text-white sm:p-6">
            <LeagueTable />
          </div>
        </section>

        {/* ── Across the Grounds ── */}
        {groundsArticles.length > 0 && (
          <section className="border-t border-cuva-rule py-12">
            <div className="mb-6 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div>
                <h2 className="font-heading text-balance text-[1.625rem] font-bold leading-tight text-cuva-ink sm:text-[1.875rem]">
                  Across the Grounds
                </h2>
                <p className="font-ui mt-1 text-[0.875rem] text-cuva-muted">
                  All photography by William Powell.
                </p>
              </div>
              <Link
                href="/reports"
                className="font-ui target-44 inline-flex items-center text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
              >
                All match reports &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {groundsArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>

      <CredibilityBlock />
      <NewsletterSignup variant="section" />
    </>
  );
}
