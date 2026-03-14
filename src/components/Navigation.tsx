"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/football", label: "Football" },
  { href: "/cricket", label: "Cricket" },
  { href: "/analysis", label: "Analysis" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      {/* Ticker bar */}
      <div className="bg-navy-dark py-1 overflow-hidden text-xs text-silver-light">
        <div className="animate-ticker whitespace-nowrap inline-block">
          <span className="mx-8">LATEST: Follow CUVA Sports for expert football and cricket coverage</span>
          <span className="mx-8">William Powell — FWA Life Member, sports journalist since 1987</span>
          <span className="mx-8">LATEST: Follow CUVA Sports for expert football and cricket coverage</span>
          <span className="mx-8">William Powell — FWA Life Member, sports journalist since 1987</span>
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
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { label: "Facebook", icon: "fb" },
              { label: "X", icon: "x" },
              { label: "LinkedIn", icon: "li" },
              { label: "Instagram", icon: "ig" },
            ].map((social) => (
              <a
                key={social.icon}
                href="#"
                aria-label={social.label}
                className="text-silver-light hover:text-gold transition-colors text-xs font-bold uppercase"
              >
                {social.icon}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-silver-light hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-3 mt-3 border-t border-navy-light">
              {["FB", "X", "LI", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-bold text-silver-light hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
