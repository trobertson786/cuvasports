import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Lora,
  Source_Serif_4,
  IBM_Plex_Mono,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Retained for the RTL fallback chain; --font-prose now points at Source Serif 4.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// Editorial body, standfirsts, card headlines. Optical sizing, safe down to 15px.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Any figure a reader might compare: scores, times, statistics, dates.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CUVA Sports - Football & Cricket Journalism",
  description:
    "Expert football and cricket journalism by William Powell, FWA Life Member and sports writer since 1987. Match reports, analysis, and commentary.",
  metadataBase: new URL("https://cuvasports.com"),
  icons: {
    // SVG first for browsers that support it, PNG as the universal fallback.
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    siteName: "CUVA Sports",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WillsSportMedia",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lora.variable} ${sourceSerif.variable} ${plexMono.variable} ${inter.variable} ${notoNastaliq.variable} antialiased`}
      >
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
