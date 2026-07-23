/**
 * Branded static placeholder shown inside a match-card image container when an
 * article has no image, or when its image fails to load. Replaces the old
 * Lincoln-stadium fallback photo. Fills its (relatively positioned, 16:9)
 * parent via `absolute inset-0`.
 */
export default function MatchReportFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-[#1B2A44] via-[#16233B] to-[#0F1A2E] px-4 text-center"
    >
      {/* top amber accent rule, echoing the card design system */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber/80 via-amber/25 to-transparent" />

      {/* article / document icon in a subtle amber badge */}
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/40 bg-amber/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-amber"
        >
          <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v6h6" />
          <path d="M8.5 13h7M8.5 17h5" />
        </svg>
      </span>

      <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
        Match Report
      </span>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3.5 py-1 font-ui text-[11px] font-bold uppercase tracking-wide text-[#1B2A44]">
        Read Article <span aria-hidden>&rarr;</span>
      </span>
    </div>
  );
}
