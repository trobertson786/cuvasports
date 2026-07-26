import { formatCategoryLabel } from "@/lib/taxonomy";

type Surface = "light" | "navy";

interface KickerProps {
  category?: string;
  /** Competition or beat, e.g. "FIFA World Cup 2026, Final". */
  detail?: string;
  /** Gold is legal on navy only; on light the kicker takes the section colour. */
  surface?: Surface;
  className?: string;
}

/**
 * Typed metadata component, not leftover small text.
 * Inter 700, 11px, 0.12em, uppercase. Colour encodes the section.
 */
export default function Kicker({
  category,
  detail,
  surface = "light",
  className = "",
}: KickerProps) {
  const tone =
    surface === "navy"
      ? "text-cuva-gold"
      : category === "cricket"
        ? "text-cuva-cricket"
        : category === "football"
          ? "text-cuva-football"
          : "text-cuva-gold-ink";

  const label = category ? formatCategoryLabel(category) : null;

  return (
    <p
      className={`font-ui text-[0.6875rem] font-bold uppercase tracking-[0.12em] ${tone} ${className}`}
    >
      {label}
      {label && detail ? (
        <span className="mx-2 text-cuva-rule" aria-hidden="true">
          /
        </span>
      ) : null}
      {detail}
    </p>
  );
}
