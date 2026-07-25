import CuvaMark, { type MarkTone } from "./CuvaMark";

/**
 * CUVA Sports lockups, rebuilt from the brand identity sheet.
 *
 * The monogram is vector (CuvaMark); the wordmark is live text set in the
 * site's own UI face so it stays crisp at every size, scales with the user's
 * font settings, and is readable by assistive tech and by search engines.
 *
 * Every dimension derives from `size` (the monogram height in px), so the
 * proportions of the sheet hold at any scale.
 *
 *   horizontal  primary lockup, mark beside a two-line wordmark with rule
 *   compact     single line, CUVA | SPORTS, for tight horizontal chrome
 *   stacked     mark above wordmark, for footers and square-ish spaces
 */

export type LogoVariant = "horizontal" | "compact" | "stacked";

const MARK_ASPECT = 114 / 162;

type Props = {
  variant?: LogoVariant;
  tone?: MarkTone;
  /** Height of the monogram in px. Everything else scales from this. */
  size?: number;
  className?: string;
};

export default function CuvaLogo({
  variant = "horizontal",
  tone = "navy",
  size = 44,
  className,
}: Props) {
  const ink = tone === "white" ? "#FFFFFF" : tone === "mono" ? "#000000" : "#0B1A2B";
  const rule = tone === "white" ? "rgba(255,255,255,0.55)" : tone === "mono" ? "#000000" : "#D9DEE3";

  const markStyle = { height: size, width: size * MARK_ASPECT, flexShrink: 0 } as const;

  const wordmarkStyle = {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontWeight: 800,
    color: ink,
    lineHeight: 1,
  } as const;

  const sportsStyle = {
    ...wordmarkStyle,
    fontWeight: 600,
    letterSpacing: "0.42em",
    // The tracked-out SPORTS trails a full letter-space; pull it back so the
    // optical left edge aligns with the C above it.
    textIndent: "0.21em",
    marginRight: "-0.42em",
  } as const;

  /**
   * SPORTS is justified to the exact width of CUVA above it, as on the sheet.
   * Distributing the letters beats a fixed tracking value, which drifts as
   * soon as the wordmark is rendered at a different size or in a fallback face.
   */
  const sportsJustified = (fontSize: number) => (
    <span
      style={{
        ...wordmarkStyle,
        fontWeight: 600,
        fontSize,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {"SPORTS".split("").map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        role="img"
        aria-label="CUVA Sports"
        className={className}
        style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: size * 0.16 }}
      >
        <CuvaMark tone={tone} style={markStyle} />
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ ...wordmarkStyle, fontSize: size * 0.5, letterSpacing: "0.02em" }}>CUVA</span>
          <span style={{ width: "100%", height: Math.max(1, size * 0.02), background: rule, margin: `${size * 0.1}px 0` }} />
          {sportsJustified(size * 0.155)}
        </span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <span
        role="img"
        aria-label="CUVA Sports"
        className={className}
        style={{ display: "inline-flex", alignItems: "center", gap: size * 0.2 }}
      >
        <CuvaMark tone={tone} style={markStyle} />
        <span style={{ ...wordmarkStyle, fontSize: size * 0.52, letterSpacing: "0.02em" }}>CUVA</span>
        <span style={{ width: Math.max(1, size * 0.022), height: size * 0.52, background: rule }} />
        <span style={{ ...sportsStyle, fontSize: size * 0.17 }}>SPORTS</span>
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="CUVA Sports"
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.22 }}
    >
      <CuvaMark tone={tone} style={markStyle} />
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ ...wordmarkStyle, fontSize: size * 0.58, letterSpacing: "0.01em" }}>CUVA</span>
        <span style={{ width: "100%", height: Math.max(1, size * 0.018), background: rule, margin: `${size * 0.09}px 0` }} />
        {sportsJustified(size * 0.175)}
      </span>
    </span>
  );
}
