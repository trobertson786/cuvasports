import Link from "next/link";

const footerLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/football", label: "Football" },
  { href: "/cricket", label: "Cricket" },
  { href: "/analysis", label: "Analysis" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { label: "Facebook", abbr: "FB" },
  { label: "X", abbr: "X" },
  { label: "LinkedIn", abbr: "LI" },
  { label: "Instagram", abbr: "IG" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-silver-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-gold mb-3">
              CUVA SPORTS
            </h3>
            <p className="text-sm text-silver-dark leading-relaxed max-w-md">
              Expert football and cricket journalism by William Powell, FWA Life
              Member and sports writer since 1987.
            </p>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-col sm:flex-row gap-8 md:justify-end">
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-silver-dark hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.abbr}
                    href="#"
                    aria-label={social.label}
                    className="text-xs font-bold text-silver-dark hover:text-gold transition-colors uppercase bg-navy-light px-3 py-1.5 rounded-full"
                  >
                    {social.abbr}
                  </a>
                ))}
              </div>
              <p className="text-sm text-silver-dark">
                Press enquiries welcome.
                <br />
                <Link
                  href="/contact"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Get in touch &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center text-xs text-silver-dark">
          &copy; {new Date().getFullYear()} CUVA Sports. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
