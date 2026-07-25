/**
 * Generates the static CUVA Sports brand assets from the vector monogram.
 *
 * The monogram geometry here is the single source of truth shared with
 * src/components/brand/CuvaMark.tsx — keep the two in step if it ever changes.
 *
 *   node scripts/build-brand-assets.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND = path.join(ROOT, "public", "brand");
const APP = path.join(ROOT, "src", "app");

const NAVY = "#0B1A2B";
const NAVY_ACCENT = "#1C3550";

// Aperture + slit, as one slot cut out of the 114 x 162 silhouette.
const SLOT = "M32 30 H83 V65 H114 V77 H83 V132 H32 Z";

/** Bare monogram, transparent knockouts, transparent background. */
function markSvg({ body, accent }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 162" width="114" height="162">
  <mask id="cuva-slot">
    <rect x="0" y="0" width="114" height="162" fill="#fff"/>
    <path d="${SLOT}" fill="#000"/>
  </mask>
  <g mask="url(#cuva-slot)">
    <rect x="0" y="0" width="114" height="162" fill="${body}"/>
    <rect x="83" y="0" width="31" height="162" fill="${accent}"/>
  </g>
</svg>
`;
}

/**
 * Squircle app icon: mark reversed out of navy on a 216 grid.
 * The mark is scaled to 80% so it keeps clear space inside the rounded corners.
 */
const ICON_SCALE = 0.8;
const ICON_TX = (216 - 114 * ICON_SCALE) / 2;
const ICON_TY = (216 - 162 * ICON_SCALE) / 2;
const ICON_TRANSFORM = `translate(${ICON_TX} ${ICON_TY}) scale(${ICON_SCALE})`;

function appIconSvg({ radius = 48, background = NAVY } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" width="216" height="216">
  <mask id="cuva-slot">
    <rect x="0" y="0" width="216" height="216" fill="#fff"/>
    <path d="${SLOT}" transform="${ICON_TRANSFORM}" fill="#000"/>
  </mask>
  <rect x="0" y="0" width="216" height="216" rx="${radius}" fill="${background}"/>
  <g mask="url(#cuva-slot)">
    <rect x="0" y="0" width="114" height="162" transform="${ICON_TRANSFORM}" fill="#FFFFFF"/>
  </g>
</svg>
`;
}

const svgFiles = {
  "cuva-mark.svg": markSvg({ body: NAVY, accent: NAVY_ACCENT }),
  "cuva-mark-white.svg": markSvg({ body: "#FFFFFF", accent: "#FFFFFF" }),
  "cuva-mark-mono.svg": markSvg({ body: "#000000", accent: "#000000" }),
  "cuva-app-icon.svg": appIconSvg(),
};

// Favicons need a tighter radius so the shape still reads at 16px.
const faviconSvg = appIconSvg({ radius: 24 });

const pngTargets = [
  { file: path.join(APP, "icon.png"), size: 32, svg: faviconSvg },
  { file: path.join(APP, "apple-icon.png"), size: 180, svg: appIconSvg({ radius: 0 }) },
  { file: path.join(BRAND, "icon-192.png"), size: 192, svg: faviconSvg },
  { file: path.join(BRAND, "icon-512.png"), size: 512, svg: faviconSvg },
  { file: path.join(BRAND, "cuva-logo-schema.png"), size: 512, svg: appIconSvg({ radius: 0 }) },
];

await mkdir(BRAND, { recursive: true });

for (const [name, svg] of Object.entries(svgFiles)) {
  await writeFile(path.join(BRAND, name), svg, "utf8");
  console.log("wrote", path.relative(ROOT, path.join(BRAND, name)));
}

await writeFile(path.join(BRAND, "favicon.svg"), faviconSvg, "utf8");
console.log("wrote", path.relative(ROOT, path.join(BRAND, "favicon.svg")));

for (const { file, size, svg } of pngTargets) {
  await sharp(Buffer.from(svg), { density: 600 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(file);
  console.log("wrote", path.relative(ROOT, file), `${size}x${size}`);
}
