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
    <footer className="bg-surface-lowest text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

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
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="target-44 font-ui flex items-center text-sm text-on-primary/85 transition-colors hover:text-amber"
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
                  className="target-44 font-ui inline-flex min-w-[44px] items-center justify-center bg-white/5 px-3 text-xs font-bold uppercase text-on-primary/75 transition-colors hover:bg-white/10 hover:text-amber"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
            <p className="text-sm text-on-primary/50">
              {t("footer.press")}
              <br />
              <Link href="/contact" className="text-amber hover:text-amber-dark transition-colors">
                {t("footer.getInTouch")} &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-primary/40">
          <span>&copy; {new Date().getFullYear()} {t("footer.copyright")}</span>
          <span className="font-ui uppercase tracking-wider">Football Writers&apos; Association</span>
        </div>
      </div>
    </footer>
  );
}
