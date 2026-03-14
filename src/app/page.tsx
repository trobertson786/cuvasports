import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import HeroSection from "@/components/HeroSection";
import MatchdayBar from "@/components/MatchdayBar";
import ArticleGrid from "@/components/ArticleGrid";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const nonFeatured = allArticles.filter((a) => a.slug !== featured[0]?.slug);

  return (
    <>
      <MatchdayBar />
      <HeroSection featuredArticle={featured[0]} />

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-3xl font-bold text-navy mb-8">
          Latest Articles
        </h2>
        <ArticleGrid articles={nonFeatured} />
      </section>

      <NewsletterSignup />
    </>
  );
}
