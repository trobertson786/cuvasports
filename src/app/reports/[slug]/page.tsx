import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { generateArticleMetadata } from "@/lib/metadata";
import { parseArticleSections, timelineSplitIndex } from "@/lib/article-sections";
import AuthorBio from "@/components/AuthorBio";
import ArticleGrid from "@/components/ArticleGrid";
import TranslatedHeading from "@/components/TranslatedHeading";
import MatchCardImage from "@/components/MatchCardImage";
import NewsletterSignup from "@/components/NewsletterSignup";
import Kicker from "@/components/editorial/Kicker";
import BylineRow from "@/components/editorial/BylineRow";
import MatchScorecard from "@/components/editorial/MatchScorecard";
import MatchStatsTable from "@/components/editorial/MatchStatsTable";
import MatchTimeline from "@/components/editorial/MatchTimeline";
import MatchDetailsList from "@/components/editorial/MatchDetailsList";
import StandoutPlayers from "@/components/editorial/StandoutPlayers";
import ProvenanceNote from "@/components/editorial/ProvenanceNote";
import CorrectionsNotice from "@/components/editorial/CorrectionsNotice";
import ReportRail, { type RailSection } from "@/components/editorial/ReportRail";
import ReadingProgress from "@/components/editorial/ReadingProgress";
import ShareList from "@/components/editorial/ShareList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

/** Pulls a value out of the parsed Match Details rows by label. */
function detail(
  rows: { label: string; value: string }[],
  pattern: RegExp
): string | undefined {
  return rows.find((r) => pattern.test(r.label))?.value;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const sections = parseArticleSections(article.content);
  const isCricket = article.category === "cricket";
  const author = article.author || "William Powell";

  const allArticles = getAllArticles();
  const articleTags = new Set(article.tags ?? []);
  const related = allArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const candidateTags = candidate.tags ?? [];
      const overlap = candidateTags.filter((tag) => articleTags.has(tag)).length;
      const sameSubcategory =
        candidate.subcategory && candidate.subcategory === article.subcategory ? 1 : 0;
      const sameCategory = candidate.category === article.category ? 0.5 : 0;
      return { article: candidate, score: overlap * 3 + sameSubcategory + sameCategory };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: { "@type": "Person", name: author },
    description: article.excerpt,
    image: article.image
      ? `https://cuvasports.com${article.image}`
      : "https://cuvasports.com/opengraph-image",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cuvasports.com/reports/${article.slug}`,
    },
    wordCount: article.content.split(/\s+/).length,
  };

  // ── Story is split so the timeline can interrupt it at the turn of the
  //    match, rather than sitting in an appendix behind three other
  //    modules. See the plan: this is the one deliberate departure from
  //    the design handoff's order.
  const splitAt = timelineSplitIndex(sections);
  const storyBefore = sections.storyParagraphs.slice(0, splitAt).join("\n\n");
  const storyAfter = sections.storyParagraphs.slice(splitAt).join("\n\n");

  const hasScore =
    !isCricket &&
    article.homeTeam &&
    article.awayTeam &&
    article.homeScore != null &&
    article.awayScore != null;

  const aet = /after extra time|\bAET\b/i.test(
    `${article.title} ${article.standfirst ?? ""}`
  );

  const railSections: RailSection[] = [
    sections.timeline.length ? { id: "timeline", label: "Timeline of key events" } : null,
    sections.stats ? { id: "match-statistics", label: "Match statistics" } : null,
    sections.details.length ? { id: "match-details", label: "Match details" } : null,
    sections.standout.length
      ? { id: "standout-players", label: "Standout players" }
      : null,
  ].filter(Boolean) as RailSection[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Always present; it is the fallback for the breakpoint at which
          the rail's own track is hidden. */}
      <ReadingProgress />

      <div className="bg-cuva-newsprint">
        <div className="mx-auto max-w-[1320px] px-4 py-8 min-[390px]:px-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="font-ui mb-8 text-[0.8125rem]">
            <ol className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-cuva-muted">
              <li>
                <Link href="/" className="target-44 inline-flex items-center text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-cuva-rule">/</li>
              <li>
                <Link href="/reports" className="target-44 inline-flex items-center text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]">
                  Match Reports
                </Link>
              </li>
              <li aria-hidden="true" className="text-cuva-rule">/</li>
              <li>
                <Link
                  href={`/${article.category}`}
                  className="target-44 inline-flex items-center capitalize text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
                >
                  {article.category}
                </Link>
              </li>
              {article.subcategory ? (
                <>
                  <li aria-hidden="true" className="text-cuva-rule">/</li>
                  <li aria-current="page" className="text-cuva-muted">
                    {article.subcategory}
                  </li>
                </>
              ) : null}
            </ol>
          </nav>

          <div
            className={
              railSections.length
                ? "grid gap-16 min-[1180px]:grid-cols-[minmax(0,720px)_300px] min-[1180px]:justify-center"
                : "mx-auto max-w-[720px]"
            }
          >
            <article className="min-w-0 max-w-[720px]">
              <Kicker category={article.category} detail={article.competition} />

              {/* 32px at 320, 34px at 430, 44px at 1024. Overhangs the measure
                  into the gutter at the width where the rail appears. */}
              <h1 className="font-heading mt-3 text-balance text-[2rem] font-bold leading-[1.1] tracking-[-0.015em] text-cuva-ink min-[430px]:text-[2.125rem] lg:text-[2.75rem] lg:leading-[1.06] min-[1180px]:-mr-14 min-[1180px]:text-[3.25rem]">
                {article.title}
              </h1>

              {article.standfirst ? (
                <p className="font-prose mt-5 text-[1.1875rem] leading-[1.5] text-cuva-navy-800 sm:text-[1.3125rem]">
                  {article.standfirst}
                </p>
              ) : null}

              <BylineRow
                className="mt-6"
                author={author}
                date={article.date}
                readingTime={article.readingTime}
                fromTheGround={article.fromTheGround}
                bracketed
              />

              {hasScore ? (
                <div className="mt-8">
                  <MatchScorecard
                    homeTeam={article.homeTeam!}
                    awayTeam={article.awayTeam!}
                    homeScore={article.homeScore!}
                    awayScore={article.awayScore!}
                    homeScorers={article.homeScorers}
                    awayScorers={article.awayScorers}
                    sentOff={detail(sections.details, /sent off/i)}
                    competition={article.competition}
                    venue={article.venue}
                    date={article.date}
                    halfTime={detail(sections.details, /half.?time/i)?.replace(
                      /^.*?(\d+\s*-\s*\d+).*$/,
                      "$1"
                    )}
                    afterNinety={detail(sections.details, /after 90/i)?.replace(
                      /^.*?(\d+\s*-\s*\d+).*$/,
                      "$1"
                    )}
                    aet={aet}
                  />
                </div>
              ) : null}

              {/* No placeholder box when there is no photograph. The
                  scorecard carries the top of the page instead. */}
              {article.image ? (
                <figure className="mt-8">
                  <div
                    className={`relative aspect-[16/9] w-full border-t-[3px] ${
                      isCricket ? "border-cuva-cricket" : "border-cuva-football"
                    }`}
                  >
                    <MatchCardImage
                      src={article.image}
                      alt={article.title}
                      priority
                      sizes="(min-width: 1180px) 720px, 100vw"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.8125rem] text-cuva-ink">
                    {article.excerpt}{" "}
                    <span className="text-cuva-muted">Photograph: {author}</span>
                  </figcaption>
                </figure>
              ) : null}

              <CorrectionsNotice
                updatedAt={article.updatedAt}
                updateNote={article.updateNote}
                correction={article.correction}
                correctedAt={article.correctedAt}
              />

              {/* The rail's contents list, moved inline below the width at
                  which the rail exists. A native <details> costs nothing
                  against INP, and closed by default it never interrupts the
                  read. Never present at the same time as the rail. */}
              {railSections.length ? (
                <details className="mt-8 border-y border-cuva-rule min-[1180px]:hidden">
                  <summary className="mono-label flex min-h-[48px] cursor-pointer items-center justify-between text-cuva-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    In this report
                    <span aria-hidden="true" className="text-[0.8125rem] text-cuva-muted">
                      +
                    </span>
                  </summary>
                  <nav aria-label="In this report" className="pb-2">
                    <ul>
                      {railSections.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="font-ui flex min-h-[44px] w-full items-center border-t border-cuva-rule text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </details>
              ) : null}

              {sections.hasStructure ? (
                <>
                  <div className="prose-article story-body mt-8">
                    <MDXRemote source={storyBefore} options={mdxOptions} />
                  </div>

                  {sections.timeline.length ? (
                    <div id="timeline" className="scroll-mt-8">
                      <MatchTimeline
                        events={sections.timeline}
                        category={article.category}
                        inline
                      />
                    </div>
                  ) : null}

                  {storyAfter ? (
                    <div className="prose-article story-body">
                      <MDXRemote source={storyAfter} options={mdxOptions} />
                    </div>
                  ) : null}

                  {sections.scores ? (
                    <div className="prose-article mt-8">
                      <h2>Match scores</h2>
                      <MDXRemote source={sections.scores} options={mdxOptions} />
                    </div>
                  ) : null}

                  {sections.stats ? (
                    <div id="match-statistics" className="scroll-mt-8">
                      <MatchStatsTable
                        home={sections.stats.home}
                        away={sections.stats.away}
                        rows={sections.stats.rows}
                        category={article.category}
                        sourceNote={article.statsSource}
                      />
                    </div>
                  ) : null}

                  <ProvenanceNote note={article.provenance} />

                  {sections.details.length ? (
                    <div id="match-details" className="scroll-mt-8">
                      <MatchDetailsList rows={sections.details} />
                    </div>
                  ) : null}

                  {sections.standout.length ? (
                    <div id="standout-players" className="scroll-mt-8">
                      <StandoutPlayers players={sections.standout} author={author} />
                    </div>
                  ) : null}

                  {/* Anything the parser did not recognise still gets
                      rendered, in source order. */}
                  {sections.rest.map((s) => (
                    <div key={s.heading} className="prose-article mt-8">
                      {s.heading ? <h2>{s.heading}</h2> : null}
                      <MDXRemote source={s.body} options={mdxOptions} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="prose-article mt-8">
                  <MDXRemote source={article.content} options={mdxOptions} />
                </div>
              )}

              {article.tags?.length ? (
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <span className="mono-label">Tags</span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`target-44 inline-flex items-center border border-cuva-rule bg-white px-4 text-[0.8125rem] font-medium text-cuva-ink transition-colors ${
                        isCricket
                          ? "hover:border-cuva-cricket hover:text-cuva-cricket"
                          : "hover:border-cuva-football hover:text-cuva-football"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Below the rail's breakpoint the share controls move to the
                  end of the article. */}
              <div className="mt-10 min-[1180px]:hidden">
                <ShareList title={article.title} slug={article.slug} />
              </div>

              <div className="mt-12">
                <AuthorBio />
              </div>
            </article>

            {railSections.length ? (
              <ReportRail
                title={article.title}
                slug={article.slug}
                sections={railSections}
              />
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-cuva-newsprint">
          <div className="mx-auto max-w-[1320px] px-4 pb-16 min-[390px]:px-5 sm:px-6 lg:px-8">
            <TranslatedHeading titleKey="related" as="h2" />
            <ArticleGrid articles={related} columns={3} />
          </div>
        </div>
      )}

      <NewsletterSignup variant="section" />
    </>
  );
}
