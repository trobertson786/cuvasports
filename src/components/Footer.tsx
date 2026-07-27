"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import CuvaLogo from "@/components/brand/CuvaLogo";
import FWABadge from "@/components/FWABadge";
import { TranslationKey } from "@/lib/translations";

const footerLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/reports",  labelKey: "nav.matchReports" },
  { href: "/football", labelKey: "nav.football" },
  { href: "/cricket",  labelKey: "nav.cricket" },
  { href: "/about",    labelKey: "nav.about" },
  { href: "/contact",  labelKey: "nav.contact" },
];

const socialLinks = [
  { label: "X / Twitter", abbr: "X", href: "https://x.com/WillsSportMedia" },
  { label: "RSS Feed", abbr: "RSS", href: "/feed.xml" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cuva-navy-950 text-on-primary">
      <div className="mx-auto max-w-7xl px-4 py-10 min-[390px]:px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <CuvaLogo variant="stacked" tone="white" size={48} />
            </div>
            <p className="text-sm text-on-primary/60 leading-relaxed max-w-xs mb-4">
              {t("footer.tagline")}
            </p>
            <FWABadge size="sm" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-ui text-xs font-bold uppercase tracking-widest text-on-primary/40 mb-3">
              {t("footer.navigation")}
            </h4>
            {/* 48px full-width rows with a hairline between, so the boundary
                between two adjacent targets is unambiguous rather than
                inferred from 17px of text. */}
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui flex min-h-[48px] w-full items-center border-b border-white/10 text-sm text-on-primary/85 transition-colors hover:text-cuva-gold"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-ui text-xs font-bold uppercase tracking-widest text-on-primary/40 mb-3">
              {t("footer.connect")}
            </h4>
            <div className="flex gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.abbr}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="target-44 font-ui inline-flex min-w-[44px] items-center justify-center bg-white/5 px-3 text-xs font-bold uppercase text-on-primary/75 transition-colors hover:bg-white/10 hover:text-cuva-gold"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
            <p className="text-sm text-on-primary/50">{t("footer.press")}</p>
            {/* On its own line after the press note, so it is a standalone
                target rather than a link inside a sentence, and takes 44px. */}
            <Link
              href="/contact"
              className="target-44 inline-flex items-center text-sm text-cuva-gold transition-colors hover:text-white"
            >
              {t("footer.getInTouch")} &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* iOS Safari's bottom chrome was sitting over the end of the page.
            env(safe-area-inset-bottom) returns 0 when the toolbar is hidden,
            so it is added to a real 28px rather than used on its own. */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pb-[calc(28px_+_env(safe-area-inset-bottom))] pt-4 text-xs text-on-primary/40 min-[390px]:px-5 sm:flex-row sm:px-6 lg:px-8">
          <span>&copy; {new Date().getFullYear()} {t("footer.copyright")}</span>
          <span className="font-ui uppercase tracking-wider">Football Writers&apos; Association</span>
        </div>
      </div>
    </footer>
  );
}
