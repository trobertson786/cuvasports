import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/reports",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/reports/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
