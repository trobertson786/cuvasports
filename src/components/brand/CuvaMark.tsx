import { useId } from "react";

/**
 * The CUVA Sports monogram.
 *
 * Geometry is measured pixel-exactly from the brand identity sheet
 * (assets/brand/logovariations.png) and rebuilt as vector on a 114 x 162 grid:
 *
 *   left arm      x 0-31,   full height
 *   top bar       y 0-29,   full width
 *   bottom bar    y 132-161, full width
 *   aperture      x 32-82,  y 30-131   (knocked out)
 *   accent panel  x 83-113, full height
 *   slit          y 65-76,  x 32-113   (knocked out)
 *
 * Both knockouts are transparent rather than white so the mark sits correctly
 * on photography, navy chrome, and paper without a visible bounding box.
 */

export type MarkTone = "navy" | "white" | "mono";

const TONES: Record<MarkTone, { body: string; accent: string }> = {
  // Two-tone brand navy. Accent panel lifts the right arm, as on the sheet.
  navy: { body: "#0B1A2B", accent: "#1C3550" },
  // Reversed lockups use a single solid fill so the mark stays legible at size.
  white: { body: "#FFFFFF", accent: "#FFFFFF" },
  mono: { body: "#000000", accent: "#000000" },
};

/** Outer silhouette plus the aperture-and-slit slot, as a single mask shape. */
const SLOT_PATH = "M32 30 H83 V65 H114 V77 H83 V132 H32 Z";

type Props = {
  tone?: MarkTone;
  className?: string;
  style?: React.CSSProperties;
  /** Rounded app-icon treatment: mark reversed out of a navy squircle. */
  rounded?: boolean;
};

export default function CuvaMark({ tone = "navy", className, style, rounded = false }: Props) {
  const maskId = useId();
  const { body, accent } = TONES[tone];

  if (rounded) {
    return (
      <svg viewBox="0 0 216 216" className={className} style={style} aria-hidden="true" focusable="false">
        <mask id={maskId}>
          <rect x="0" y="0" width="216" height="216" fill="#fff" />
          <path d={SLOT_PATH} transform="translate(51 27)" fill="#000" />
        </mask>
        <rect x="0" y="0" width="216" height="216" rx="48" fill="#0B1A2B" />
        <g mask={`url(#${maskId})`}>
          <rect x="51" y="27" width="114" height="162" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 114 162" className={className} style={style} aria-hidden="true" focusable="false">
      <mask id={maskId}>
        <rect x="0" y="0" width="114" height="162" fill="#fff" />
        <path d={SLOT_PATH} fill="#000" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="0" y="0" width="114" height="162" fill={body} />
        <rect x="83" y="0" width="31" height="162" fill={accent} />
      </g>
    </svg>
  );
}
