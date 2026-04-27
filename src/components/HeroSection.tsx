"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";

interface HeroSectionProps {
  featuredArticle?: Article;
}

function getHeroCta(article: Article): string {
  switch (article.format) {
    case "Match Report": return "Read the match report";
    case "Preview": return "Read the preview";
    case "Analysis": return "Read the analysis";
    case "Column": return "Read William's column";
    case "Predictions": return "Read the predictions";
    default: return "Read the article";
  }
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  const { t } = useLanguage();

  if (!featuredArticle) {
    return (
      <section className="relative bg-surface text-on-surface overflow-hidden">
        <Image
          src="/images/hero-default.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-surface/75" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="font-ui text-apex text-sm font-semibold uppercase tracking-widest mb-4">
            {t("hero.since")}
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {t("hero.headline")}
          </h1>
          <p className="text-on-surface-muted text-lg leading-relaxed max-w-2xl mx-auto">
            {t("hero.subheadline")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-surface text-on-surface overflow-hidden">
      <Image
        src={featuredArticle.image || "/images/hero-default.jpg"}
        alt={featuredArticle.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/80 to-surface/40" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center animate-fade-in-up">
        <div className="mb-6">
          <span className="font-ui inline-block bg-apex/20 text-apex text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {featuredArticle.subcategory?.toUpperCase() || featuredArticle.category.toUpperCase()}
          </span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
          {featuredArticle.title}
        </h1>
        <p className="text-on-surface-muted text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
          {featuredArticle.standfirst || featuredArticle.excerpt}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-silver">
          <span>{featuredArticle.author ?? "William Powell"}</span>
          <span className="hidden sm:inline text-on-surface-muted">&middot;</span>
          <time dateTime={featuredArticle.date}>
            {new Date(featuredArticle.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span className="hidden sm:inline text-on-surface-muted">&middot;</span>
          <span>{featuredArticle.readingTime}</span>
        </div>
        <div className="mt-8">
          <Link
            href={`/reports/${featuredArticle.slug}`}
            className="btn-gradient group inline-block font-ui font-semibold px-8 py-3 rounded-lg"
          >
            {getHeroCta(featuredArticle)} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
