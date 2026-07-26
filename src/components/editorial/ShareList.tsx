"use client";

import { useState } from "react";

interface ShareListProps {
  title: string;
  slug: string;
  className?: string;
}

/**
 * A plain link list with 1px rules, not a row of coloured buttons.
 * Share controls are a utility, not a call to action, and styling them
 * as one is what makes a rail shout over the story it sits beside.
 */
export default function ShareList({ title, slug, className = "" }: ShareListProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://cuvasports.com/reports/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const item =
    "target-44 flex items-center w-full border-b border-cuva-rule text-[0.9375rem] text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]";

  return (
    <nav className={className} aria-label="Share this report">
      <p className="mono-label mb-1">Share</p>
      <ul>
        <li>
          <button type="button" onClick={copy} className={`${item} text-left`}>
            {copied ? "Link copied" : "Copy link"}
          </button>
          <span role="status" className="sr-only">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </li>
        <li>
          <a
            className={item}
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on X
          </a>
        </li>
        <li>
          <a
            className={item}
            href={`mailto:?subject=${encodeURIComponent(
              title
            )}&body=${encodeURIComponent(url)}`}
          >
            Email this report
          </a>
        </li>
        <li>
          <a className={`${item} border-b-0`} href="/contact?subject=correction">
            Report a correction
          </a>
        </li>
      </ul>
    </nav>
  );
}
