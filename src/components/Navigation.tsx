"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/football", labelKey: "nav.football" },
  { href: "/cricket", labelKey: "nav.cricket" },
  { href: "/analysis", labelKey: "nav.analysis" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      {/* Ticker bar */}
      <div className="bg-navy-dark py-1 overflow-hidden text-xs text-silver-light">
        <div className="animate-ticker whitespace-nowrap inline-block">
          <span className="mx-8">Leicester 1-3 QPR — R&apos;s strike back with stunning away win at the King Power</span>
          <span className="mx-8">Chelsea face PSG at Stamford Bridge Tuesday — trailing 5-2 from first leg</span>
          <span className="mx-8">Arsenal lead Premier League with 67 points from 30 matches</span>
          <span className="mx-8">Sheffield Wednesday relegated after 18-point deduction</span>
          <span className="mx-8">Leicester 1-3 QPR — R&apos;s strike back with stunning away win at the King Power</span>
          <span className="mx-8">Chelsea face PSG at Stamford Bridge Tuesday — trailing 5-2 from first leg</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold tracking-wide text-gold">
              CUVA SPORTS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-silver-light hover:text-gold transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="text-sm text-silver-light hover:text-gold transition-colors"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
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
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-navy-light">
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="block py-2 text-sm text-silver-light hover:text-gold transition-colors"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-silver-light hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
