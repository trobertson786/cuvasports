import { getAllArticles, getFeaturedArticles, getArticlesByCategory } from "@/lib/articles";
import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const footballArticles = getArticlesByCategory("football").slice(0, 3);
  const cricketArticles = getArticlesByCategory("cricket").slice(0, 3);
  const latestArticles = allArticles.slice(0, 6);

  return (
    <>
      <HeroSection featuredArticle={featured[0]} />

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-3xl font-bold text-navy mb-8">
          Latest Articles
        </h2>
        <ArticleGrid articles={latestArticles} />
      </section>

      {/* Football & Cricket side by side */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Football */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                Football
                <span className="text-xs font-body text-gray-400 uppercase tracking-wider">
                  Latest
                </span>
              </h2>
              <div className="space-y-4">
                {footballArticles.length > 0 ? (
                  footballArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))
                ) : (
                  <p className="text-gray-500">Football articles coming soon.</p>
                )}
              </div>
            </div>

            {/* Cricket */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                Cricket
                <span className="text-xs font-body text-gray-400 uppercase tracking-wider">
                  Latest
                </span>
              </h2>
              <div className="space-y-4">
                {cricketArticles.length > 0 ? (
                  cricketArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))
                ) : (
                  <p className="text-gray-500">Cricket articles coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
