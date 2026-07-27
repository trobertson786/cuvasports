"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CuvaLogo from "@/components/brand/CuvaLogo";

interface MobileMastheadProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

/**
 * The masthead below 768px.
 *
 * The site used to collapse to a navy bar carrying the word "CUVA" and a
 * hamburger. That gave a phone reader no logo lockup, no descriptor telling
 * them what the publication is, and no search outside the menu. Nielsen
 * Norman's work on hidden navigation is consistent that burying content
 * behind a menu roughly halves its discoverability, so search and both beats
 * come back out into the open here.
 *
 * This is a client component because the search field expands in place, which
 * needs state. The desktop <Masthead/> stays a server component and is
 * untouched.
 */
export default function MobileMasthead({
  menuOpen,
  onToggleMenu,
}: MobileMastheadProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setSearchOpen(true);
    // Focus after the field exists. The field is the whole point of the tap,
    // so landing the caret in it saves a second tap.
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="bg-cuva-newsprint md:hidden">
      <div className="flex items-center gap-2 px-4 py-3 min-[360px]:gap-3 min-[390px]:px-5 sm:px-6">
        <Link
          href="/"
          aria-label="CUVA Sports home"
          className="target-44 flex min-w-0 flex-1 items-center overflow-hidden"
        >
          <CuvaLogo variant="compact" tone="navy" size={38} />
        </Link>

        {!searchOpen ? (
          <button
            type="button"
            onClick={openSearch}
            aria-expanded={false}
            aria-label="Search reports and archive"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-cuva-rule bg-white"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="6"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-cuva-navy-800"
              />
              <path
                d="M13 13l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="text-cuva-navy-800"
              />
            </svg>
          </button>
        ) : null}

        {/* The lockup, the search button and a labelled Menu button together
            exceed 320px, so below 360px the button is the icon alone. The
            accessible name comes from aria-label either way. */}
        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="font-ui target-44 flex w-11 shrink-0 items-center justify-center gap-2 bg-cuva-navy-800 text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-white min-[360px]:w-auto min-[360px]:px-3"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
            <path
              d={menuOpen ? "M1 1l14 10M15 1L1 11" : "M0 1h16M0 6h16M0 11h16"}
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          <span className="hidden min-[360px]:inline">
            {menuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {searchOpen ? (
        <form
          action="/reports"
          method="get"
          role="search"
          className="flex px-4 pb-3 min-[390px]:px-5 sm:px-6"
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search reports and archive
          </label>
          {/* 16px, so iOS Safari does not zoom the viewport on focus. */}
          <input
            ref={inputRef}
            id="mobile-search"
            name="q"
            type="search"
            placeholder="Search reports and archive"
            className="font-ui h-11 min-w-0 flex-1 border border-r-0 border-cuva-rule bg-white px-3 text-base text-cuva-ink placeholder:text-cuva-muted"
          />
          <button
            type="submit"
            className="font-ui h-11 shrink-0 bg-cuva-navy-800 px-4 text-sm font-semibold text-white"
          >
            Search
          </button>
        </form>
      ) : null}

      <p className="font-prose px-4 pb-3 text-[0.875rem] italic text-cuva-muted min-[390px]:px-5 sm:px-6">
        Football and cricket journalism, written from the press box.
      </p>
    </div>
  );
}
