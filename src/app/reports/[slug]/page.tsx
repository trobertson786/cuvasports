import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { generateArticleMetadata } from "@/lib/metadata";
import AuthorBio from "@/components/AuthorBio";
import ShareButtons from "@/components/ShareButtons";
import ArticleGrid from "@/components/ArticleGrid";
import TranslatedHeading from "@/components/TranslatedHeading";
import ScoreBox from "@/components/ScoreBox";
import FWABadge from "@/components/FWABadge";
import { formatCategoryLabel } from "@/lib/taxonomy";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author || "William Powell",
    },
    description: article.excerpt,
    image: article.image
      ? `https://cuvasports.com${article.image}`
      : "https://cuvasports.com/opengraph-image",
    publisher: {
      "@type": "Organization",
      name: "CUVA Sports",
      logo: {
        "@type": "ImageObject",
        url: "https://cuvasports.com/images/cuva-sports-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cuvasports.com/reports/${article.slug}`,
    },
    wordCount: article.content.split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Dark header area */}
        <div className="bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            {/* Breadcrumb */}
            <nav className="font-ui text-sm text-on-surface-muted mb-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/reports" className="hover:text-primary transition-colors">
                Match Reports
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/${article.category}`}
                className="hover:text-primary capitalize transition-colors"
              >
                {article.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-on-surface">{article.title}</span>
            </nav>

            {/* Hero image */}
            {article.image && (
              <div className="mb-8 max-w-4xl mx-auto">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1200}
                  height={630}
                  priority
                  className="w-full rounded-lg object-cover"
                />
              </div>
            )}

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-ui text-xs font-semibold uppercase tracking-wider text-apex bg-apex/10 px-2 py-0.5 rounded-full">
                  {formatCategoryLabel(article.category, article.subcategory)}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 font-ui text-sm text-on-surface-muted">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{article.readingTime}</span>
                <span>&middot;</span>
                <span>{article.author || "William Powell"}</span>
                <span>&middot;</span>
                <FWABadge />
              </div>
            </header>

            {/* ScoreBox for match reports */}
            {article.homeTeam && article.awayTeam && article.homeScore != null && article.awayScore != null && (
              <ScoreBox
                homeTeam={article.homeTeam}
                awayTeam={article.awayTeam}
                homeScore={article.homeScore}
                awayScore={article.awayScore}
                competition={article.competition}
                venue={article.venue}
                date={article.date}
              />
            )}
          </div>
        </div>

        {/* Hybrid lighter reading surface for article body */}
        <div className="bg-reading-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Article body */}
            <div className="prose-article mb-10">
              <MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>

            {/* Share */}
            <div className="pt-6 mb-10" style={{ borderTop: '1px solid rgba(183, 200, 225, 0.15)' }}>
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-10">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-ui text-xs bg-surface-highest text-on-surface-muted px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mb-12">
              <AuthorBio />
            </div>
          </div>
        </div>

        {/* Related articles on dark surface */}
        {related.length > 0 && (
          <div className="bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <TranslatedHeading titleKey="related" as="h2" />
              <ArticleGrid articles={related} columns={3} />
            </div>
          </div>
        )}
      </article>
    </>
  );
}
