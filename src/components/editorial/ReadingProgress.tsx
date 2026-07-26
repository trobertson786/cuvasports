"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  /**
   * "bar" is the 3px line fixed to the top of the window; "track" is the
   * rail's 2px version. They are separate instances because the rail is
   * display:none below 1180px, which would take a nested bar with it -
   * and the bar is precisely the fallback for that breakpoint.
   */
  variant?: "bar" | "track";
}

/**
 * Thin and quiet by design. No percentage counter, no floating badge:
 * the rail must never compete with the story.
 */
export default function ReadingProgress({ variant = "bar" }: ReadingProgressProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setPct(scrollable > 0 ? Math.round((el.scrollTop / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (variant === "track") {
    return (
      <div aria-hidden="true">
        <p className="mono-label">Reading</p>
        <div className="mt-2 h-[2px] w-full bg-cuva-rule">
          <div
            className="h-full bg-cuva-football transition-[width] duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        className="h-full bg-cuva-football transition-[width] duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
