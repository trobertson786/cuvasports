import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CUVA Sports — Football & Cricket Journalism",
    short_name: "CUVA Sports",
    description:
      "Match reports, analysis and commentary by William Powell, FWA Life Member and sports writer since 1987.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1A2B",
    theme_color: "#0B1A2B",
    icons: [
      { src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
