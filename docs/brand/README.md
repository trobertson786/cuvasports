# CUVA Sports brand system

Everything derives from [`logovariations.png`](logovariations.png), the identity sheet.

The monogram in that sheet is a low-resolution raster, so it was measured pixel by pixel and
rebuilt as vector on a **114 x 162** grid. Cropping the sheet would have produced soft assets
that fail at retina and at favicon sizes.

```
left arm      x 0-31,    full height
top bar       y 0-29,    full width
bottom bar    y 132-161, full width
aperture      x 32-82,   y 30-131    knocked out
accent panel  x 83-113,  full height
slit          y 65-76,   x 32-113    knocked out
```

Both knockouts are **transparent**, not white, so the mark sits on photography, navy chrome
and paper without a visible bounding box.

## Palette

| Token | Hex | Use |
|---|---|---|
| Navy | `#0B1A2B` | Monogram body, app-icon background |
| Navy accent | `#1C3550` | Right panel of the two-tone monogram |
| Silver | `#D9DEE3` | Rule between CUVA and SPORTS |
| White | `#FFFFFF` | Reversed lockups |

## Lockups

Use `src/components/brand/CuvaLogo.tsx`. Every dimension scales from `size`, the monogram
height in px, so the sheet's proportions hold at any scale.

| Variant | Sheet reference | Where it is used |
|---|---|---|
| `horizontal` | 1, 7, 9 | Site header. White on the navy bar; 40px desktop, 30px below `sm`. |
| `compact` | 2, 8 | Single-line contexts where height is tight. Currently the 404 page. |
| `stacked` | 3 | Footer, at 48px, white. |

Tones: `navy` (two-tone, for light backgrounds), `white` (solid, for navy and photography),
`mono` (solid black, for print and fax-grade reproduction).

The monogram alone is `src/components/brand/CuvaMark.tsx`, with a `rounded` prop for the
app-icon treatment.

## Wordmark

CUVA and SPORTS are **live text**, not traced paths — set in Inter, the site's own UI face,
at weight 800. That keeps the wordmark crisp at every size, selectable, translatable, and
readable by assistive tech and search engines. SPORTS is justified letter by letter to the
exact width of CUVA above it, as on the sheet, rather than relying on a fixed tracking value
that would drift at other sizes.

## Generated assets

```bash
node scripts/build-brand-assets.mjs
```

| Output | Purpose |
|---|---|
| `public/brand/cuva-mark.svg` | Two-tone monogram, transparent background |
| `public/brand/cuva-mark-white.svg` | Reversed monogram |
| `public/brand/cuva-mark-mono.svg` | Black monogram for print |
| `public/brand/cuva-app-icon.svg` | Squircle app icon |
| `public/brand/favicon.svg` | Modern browsers, declared first in `layout.tsx` |
| `public/brand/icon-192.png`, `icon-512.png` | Web manifest (`src/app/manifest.ts`) |
| `public/brand/cuva-logo-schema.png` | `Organization.logo` in the JSON-LD on the home and article pages |
| `src/app/icon.png` | 32px favicon fallback |
| `src/app/apple-icon.png` | 180px iOS home screen |

The geometry constants in `scripts/build-brand-assets.mjs` and in `CuvaMark.tsx` are the same
numbers. If the mark ever changes, change both.

## Social card

`src/app/opengraph-image.tsx` rebuilds the monogram from five rectangles, because Satori (the
renderer behind `ImageResponse`) does not rasterise masks or arbitrary SVG. The rectilinear
geometry reproduces exactly.

**Known limitation:** the OG card uses Satori's default font, so CUVA renders at regular weight
rather than the brand's heavy geometric sans. Fixing it means shipping an Inter font file and
loading it in that route.
