import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CUVA Sports — Football & Cricket Journalism";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0B1A2B";
const AMBER = "#D4A843";
const SILVER = "#D9DEE3";

/**
 * The CUVA monogram, rebuilt from five rectangles.
 *
 * Satori does not rasterise masks or arbitrary SVG, but the mark is entirely
 * rectilinear, so the same 114 x 162 geometry used by CuvaMark reproduces
 * exactly as absolutely-positioned blocks.
 */
function Mark({ scale }: { scale: number }) {
  const u = (n: number) => n * scale;
  const bar = (left: number, top: number, width: number, height: number) => (
    <div
      key={`${left}-${top}`}
      style={{
        position: "absolute",
        left: u(left),
        top: u(top),
        width: u(width),
        height: u(height),
        background: "#FFFFFF",
      }}
    />
  );

  return (
    <div style={{ position: "relative", display: "flex", width: u(114), height: u(162) }}>
      {bar(0, 0, 32, 162)}
      {bar(32, 0, 82, 30)}
      {bar(32, 132, 82, 30)}
      {bar(83, 30, 31, 35)}
      {bar(83, 77, 31, 55)}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: NAVY,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: AMBER }} />

        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          <Mark scale={0.95} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "1px",
                lineHeight: 1,
              }}
            >
              CUVA
            </div>
            <div style={{ height: 3, background: SILVER, margin: "14px 0" }} />
            <div
              style={{
                fontSize: 30,
                color: "#FFFFFF",
                letterSpacing: "13px",
                lineHeight: 1,
              }}
            >
              SPORTS
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 26,
            color: AMBER,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: 52,
          }}
        >
          Football &amp; Cricket Journalism
        </div>

        <div style={{ fontSize: 20, color: "#8A9BB5", marginTop: 20 }}>
          William Powell · FWA Life Member since 1987
        </div>
      </div>
    ),
    { ...size }
  );
}
