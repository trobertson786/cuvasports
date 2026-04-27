import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import TranslatedHeading from "@/components/TranslatedHeading";

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
  const nonFeatured = allArticles.filter((a) => a.slug !== featured[0]?.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection featuredArticle={featured[0]} />

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <TranslatedHeading titleKey="latest" as="h2" />
        <div className="mt-4">
          <ArticleGrid articles={nonFeatured} />
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
