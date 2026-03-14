import Link from "next/link";
import { Article } from "@/lib/types";

interface HeroSectionProps {
  featuredArticle?: Article;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Editorial headline */}
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Since 1987
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Expert Football &amp; Cricket Journalism
            </h1>
            <p className="text-silver-light text-lg leading-relaxed mb-8 max-w-lg">
              Authoritative match reports, tactical analysis, and insider
              commentary from William Powell — FWA Life Member and one of
              Britain&apos;s most experienced sports journalists.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="bg-gold text-navy font-semibold px-6 py-3 rounded hover:bg-gold-light transition-colors"
              >
                Read Latest Articles
              </Link>
              <Link
                href="/about"
                className="border border-silver text-silver-light px-6 py-3 rounded hover:border-gold hover:text-gold transition-colors"
              >
                About William
              </Link>
            </div>
          </div>

          {/* Right: Featured article or testimonial */}
          <div className="relative">
            {featuredArticle ? (
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="block group"
              >
                <div className="bg-navy-light rounded-lg p-8 border border-navy-light hover:border-gold/30 transition-colors">
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                    Featured
                  </span>
                  <h2 className="font-heading text-2xl font-bold mt-2 mb-3 group-hover:text-gold transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-silver leading-relaxed mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="text-gold text-sm font-medium">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            ) : (
              <div className="bg-navy-light rounded-lg p-8 border border-navy-light">
                <blockquote className="text-silver-light italic text-lg leading-relaxed">
                  &ldquo;William Powell brings decades of insight and authority
                  to every piece he writes. A true craftsman of sports
                  journalism.&rdquo;
                </blockquote>
                <p className="text-gold text-sm mt-4 font-semibold">
                  — Football Writers&apos; Association
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
