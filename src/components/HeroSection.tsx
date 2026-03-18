"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";

interface HeroSectionProps {
  featuredArticle?: Article;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  const { t } = useLanguage();

  if (!featuredArticle) {
    return (
      <section className="relative bg-navy text-white overflow-hidden">
        <Image
          src="/images/hero-default.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            {t("hero.since")}
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {t("hero.headline")}
          </h1>
          <p className="text-silver-light text-lg leading-relaxed max-w-2xl mx-auto">
            {t("hero.subheadline")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <Image
        src="/images/hero-default.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy/65" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center animate-fade-in-up">
        <div className="mb-6">
          <span className="inline-block bg-gold/20 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {featuredArticle.subcategory
              ? `${featuredArticle.category} — ${featuredArticle.subcategory}`
              : featuredArticle.category}
          </span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
          {featuredArticle.title}
        </h1>
        <p className="text-silver-light text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
          {featuredArticle.excerpt}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-silver">
          <span>{featuredArticle.author ?? "William Powell"}</span>
          <span className="hidden sm:inline text-silver-dark">&middot;</span>
          <time dateTime={featuredArticle.date}>
            {new Date(featuredArticle.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span className="hidden sm:inline text-silver-dark">&middot;</span>
          <span>{featuredArticle.readingTime}</span>
        </div>
        <div className="mt-8">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group inline-block bg-gold text-navy font-semibold px-8 py-3 rounded hover:bg-gold-light hover:shadow-lg hover:scale-[1.03] transition-all duration-200"
          >
            {t("hero.cta")} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
