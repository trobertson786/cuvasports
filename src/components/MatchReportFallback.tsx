/**
 * Branded static placeholder shown inside a match-card image container when an
 * article has no image, or when its image fails to load. Fills its
 * (relatively positioned, 16:9) parent via `absolute inset-0`.
 *
 * It used to carry a gold "READ ARTICLE" pill. That was a second call to
 * action to the same article as the card's own headline link, and on the lead
 * story the page's real button sat about 200px below it. One call to action
 * per card, and the whole card is the target.
 *
 * Where a card can degrade to a text-forward row instead, it should: 240px of
 * navy at full mobile width says nothing the reader wanted. This is the
 * fallback for the case where the layout genuinely needs a filled image slot.
 */
export default function MatchReportFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-cuva-navy-800 px-4 text-center"
    >
      {/* Gold is legal here: this surface is navy. */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-cuva-gold" />

      <span className="flex h-11 w-11 items-center justify-center border border-cuva-gold/40">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-cuva-gold"
        >
          <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v6h6" />
          <path d="M8.5 13h7M8.5 17h5" />
        </svg>
      </span>

      <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
        Match Report
      </span>
    </div>
  );
}
