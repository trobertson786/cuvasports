"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UtilityStrip from "@/components/chrome/UtilityStrip";
import Masthead from "@/components/chrome/Masthead";
import MobileMasthead from "@/components/chrome/MobileMasthead";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/reports", labelKey: "nav.matchReports" },
  { href: "/football", labelKey: "nav.football" },
  { href: "/cricket", labelKey: "nav.cricket" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

/**
 * The three visible entries in the mobile navy bar. Football and cricket are
 * the two beats this publication exists for, and results are the thing a
 * reader most often arrives wanting, so none of the three is hidden behind
 * the menu. The menu still repeats everything.
 */
const mobileBeats: { href: string; label: string }[] = [
  { href: "/football", label: "Football" },
  { href: "/cricket", label: "Cricket" },
  // The design labels this third entry "Results". There is no results route:
  // the results module lives on the homepage, and /reports is the archive of
  // match reports. Labelling the tab "Results" would send a reader somewhere
  // other than where the word promises, so it says what it is.
  { href: "/reports", label: "Reports" },
];

/**
 * Site chrome: utility strip, masthead, primary nav.
 *
 * Only the nav band is sticky. Three sticky bands would cost roughly 150px
 * of every viewport, which on an article page is 150px not spent on the
 * story.
 */
export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  // The menu closes when a link inside it is tapped, rather than in an
  // effect watching `pathname`. Setting state synchronously in an effect
  // triggers a cascading render, and the only way this menu can be open is
  // that the user opened it here, so the click is the honest trigger.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header>
      <UtilityStrip />

      <div className="hidden md:block">
        <Masthead />
      </div>

      <MobileMasthead
        menuOpen={mobileOpen}
        onToggleMenu={() => setMobileOpen(!mobileOpen)}
      />

      <nav className="sticky top-0 z-50 bg-cuva-navy-800" aria-label="Primary">
        {/* Below md the bar carries the three visible beats instead of a
            wordmark and a hamburger; identity and the menu button both live in
            <MobileMasthead/> above. */}
        <ul className="flex md:hidden">
          {mobileBeats.map((beat) => {
            const active = isActive(beat.href);
            return (
              <li
                key={beat.href}
                className="flex-1 border-l border-white/15 first:border-l-0"
              >
                <Link
                  href={beat.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-ui flex min-h-[48px] items-center justify-center border-b-[3px] text-[0.875rem] font-semibold text-white ${
                    active ? "border-cuva-gold" : "border-transparent"
                  }`}
                >
                  {beat.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 max-md:hidden">
          <ul className="hidden md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-ui flex h-[52px] items-center border-b-[3px] px-[18px] text-[0.9375rem] transition-colors ${
                      active
                        ? "border-cuva-gold font-semibold text-white"
                        : "border-transparent text-white/85 hover:border-cuva-gold/50 hover:bg-cuva-navy-600 hover:text-white"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {process.env.NEXT_PUBLIC_ENABLE_LANG_TOGGLE === "true" && (
              <button
                onClick={() => setLang(lang === "en" ? "ur" : "en")}
                className="target-44 flex items-center px-2 text-white/60 transition-colors hover:text-white"
                aria-label={lang === "en" ? "Switch to Urdu" : "Switch to English"}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.567.732-3.558"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileOpen ? "max-h-[32rem] pb-4" : "max-h-0"
          }`}
        >
          {/* Search sits at the top of the menu as well as outside it. A
              reader who has already opened the menu should not have to close
              it again to reach the field. */}
          <form
            action="/reports"
            method="get"
            role="search"
            className="mx-auto flex max-w-[1320px] border-t border-white/10 px-4 pt-3 min-[390px]:px-5 sm:px-6"
          >
            <label htmlFor="menu-search" className="sr-only">
              Search reports and archive
            </label>
            <input
              id="menu-search"
              name="q"
              type="search"
              placeholder="Search reports and archive"
              className="font-ui h-11 min-w-0 flex-1 border border-r-0 border-white/25 bg-white/10 px-3 text-base text-white placeholder:text-white/55"
            />
            <button
              type="submit"
              className="font-ui h-11 shrink-0 bg-cuva-gold px-4 text-sm font-semibold text-cuva-ink"
            >
              Search
            </button>
          </form>

          <ul className="mx-auto max-w-[1320px] px-4 pt-2 min-[390px]:px-5 sm:px-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`font-ui flex min-h-[48px] w-full items-center border-b border-white/10 text-[0.9375rem] ${
                      active ? "font-semibold text-cuva-gold" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
