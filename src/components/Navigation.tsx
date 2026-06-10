"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";
import { matchdayTicker } from "@/lib/matchday";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/",        labelKey: "nav.home" },
  { href: "/reports", labelKey: "nav.matchReports" },
  { href: "/football",labelKey: "nav.football" },
  { href: "/cricket", labelKey: "nav.cricket" },
  { href: "/about",   labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="bg-surface-lowest text-on-primary sticky top-0 z-50">
      {/* Scrolling ticker */}
      <div className="border-b border-white/10 py-1.5 overflow-hidden text-xs text-on-primary/60">
        <div className="animate-ticker whitespace-nowrap inline-block">
          {matchdayTicker.map((item, i) => (
            <span key={i} className="mx-8">{item}</span>
          ))}
          {matchdayTicker.slice(0, 3).map((item, i) => (
            <span key={`dup-${i}`} className="mx-8">{item}</span>
          ))}
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/cuva-sports-logo.png"
              alt="CUVA Sports"
              width={180}
              height={52}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-ui text-sm font-medium transition-colors relative pb-0.5 ${
                    isActive
                      ? "text-amber after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber after:rounded"
                      : "text-on-primary/70 hover:text-on-primary"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          {/* Author credential (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="font-ui text-xs font-semibold text-on-primary leading-tight">
                William Powell
              </div>
              <div className="font-ui text-[10px] text-amber uppercase tracking-wider leading-tight">
                FWA Life Member · Since 1987
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center shrink-0">
              <span className="font-ui text-xs font-bold text-amber">WP</span>
            </div>

            {process.env.NEXT_PUBLIC_ENABLE_LANG_TOGGLE === "true" && (
              <button
                onClick={() => setLang(lang === "en" ? "ur" : "en")}
                className="text-on-primary/50 hover:text-on-primary transition-colors ml-1"
                aria-label={lang === "en" ? "Switch to Urdu" : "Switch to English"}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.567.732-3.558" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {process.env.NEXT_PUBLIC_ENABLE_LANG_TOGGLE === "true" && (
              <button
                onClick={() => setLang(lang === "en" ? "ur" : "en")}
                className="text-on-primary/60 hover:text-on-primary transition-colors p-1.5"
                aria-label={lang === "en" ? "Switch to Urdu" : "Switch to English"}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.567.732-3.558" />
                </svg>
              </button>
            )}
            <button
              className="text-on-primary p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
          <div className="border-t border-white/10 pt-3 space-y-0.5">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 font-ui text-sm transition-colors ${
                    isActive ? "text-amber font-semibold" : "text-on-primary/70 hover:text-on-primary"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 mt-2">
              <div className="font-ui text-xs font-semibold text-on-primary">William Powell</div>
              <div className="font-ui text-[10px] text-amber uppercase tracking-wider">FWA Life Member · Since 1987</div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
