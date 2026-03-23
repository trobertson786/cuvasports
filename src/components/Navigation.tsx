"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";
import matchday from "../../content/matchday.json";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/football", labelKey: "nav.football" },
  { href: "/cricket", labelKey: "nav.cricket" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`glass text-on-surface sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface-lowest/90" : ""}`}>
      {/* Ticker bar */}
      <div className="bg-surface-lowest py-2 overflow-hidden text-sm text-on-surface-muted">
        <div className="animate-ticker whitespace-nowrap inline-block">
          {matchday.ticker.map((item, i) => (
            <span key={i} className="mx-8">{item}</span>
          ))}
          {matchday.ticker.slice(0, 2).map((item, i) => (
            <span key={`dup-${i}`} className="mx-8">{item}</span>
          ))}
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/cuva-sports-logo.png"
              alt="CUVA Sports"
              width={220}
              height={64}
              className="h-14 w-auto mix-blend-lighten"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-medium text-on-surface-muted hover:text-apex transition-colors duration-200"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="font-ui text-sm text-on-surface-muted hover:text-apex transition-colors duration-200"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-on-surface p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
          <button
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="block py-2 font-ui text-sm text-on-surface-muted hover:text-apex transition-colors"
          >
            {lang === "en" ? "اردو" : "English"}
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 font-ui text-sm text-on-surface-muted hover:text-apex transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
