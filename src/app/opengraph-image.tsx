import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CUVA Sports — Football & Cricket Journalism";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          CUVA Sports
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c8a951",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Football &amp; Cricket Journalism
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#8a9bb5",
            marginTop: 24,
          }}
        >
          By William Powell — FWA Life Member
        </div>
      </div>
    ),
    { ...size }
  );
}
