import { Metadata } from "next";
import { Article } from "./types";

const siteUrl = "https://cuvasports.com";
const siteName = "CUVA Sports";

export function generateArticleMetadata(article: Article): Metadata {
  const ogImage = article.image
    ? `${siteUrl}${article.image}`
    : `${siteUrl}/opengraph-image`;

  return {
    title: `${article.title} | ${siteName}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "William Powell"],
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export function generatePageMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
