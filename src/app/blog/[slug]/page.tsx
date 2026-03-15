import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { generateArticleMetadata } from "@/lib/metadata";
import AuthorBio from "@/components/AuthorBio";
import ShareButtons from "@/components/ShareButtons";
import ArticleGrid from "@/components/ArticleGrid";
import TranslatedHeading from "@/components/TranslatedHeading";
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-navy">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${article.category}`}
            className="hover:text-navy capitalize"
          >
            {article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{article.title}</span>
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
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded">
              {article.category}
            </span>
            {article.subcategory && (
              <span className="text-xs text-gray-400">
                {article.subcategory}
              </span>
            )}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
          </div>
        </header>

        {/* Article body */}
        <div className="prose-article mb-10">
          <MDXRemote source={article.content} />
        </div>

        {/* Share */}
        <div className="border-t border-gray-200 pt-6 mb-10">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
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

        {/* Related Articles */}
        {related.length > 0 && (
          <section>
            <TranslatedHeading titleKey="related" as="h2" />
            <ArticleGrid articles={related} columns={3} />
          </section>
        )}
      </article>
    </>
  );
}
