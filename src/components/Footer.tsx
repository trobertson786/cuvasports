"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";

const footerLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/football", labelKey: "nav.football" },
  { href: "/cricket", labelKey: "nav.cricket" },
  { href: "/analysis", labelKey: "nav.analysis" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

const socialLinks = [
  { label: "X", abbr: "X", href: "https://x.com/WillsSportMedia" },
  { label: "RSS Feed", abbr: "RSS", href: "/feed.xml" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/cuva-sports-logo.png"
              alt="CUVA Sports"
              width={160}
              height={48}
              className="h-10 w-auto mb-3 mix-blend-lighten"
            />
            <p className="text-sm text-silver-dark leading-relaxed max-w-md">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-col sm:flex-row gap-8 md:justify-end">
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                {t("footer.navigation")}
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative text-sm text-silver-dark hover:text-gold transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                {t("footer.connect")}
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.abbr}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="text-xs font-bold text-silver-dark hover:text-gold transition-colors uppercase bg-navy-light px-3 py-1.5 rounded-full"
                  >
                    {social.abbr}
                  </a>
                ))}
              </div>
              <p className="text-sm text-silver-dark">
                {t("footer.press")}
                <br />
                <Link
                  href="/contact"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  {t("footer.getInTouch")} &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center text-xs text-silver-dark">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
