const GALLERY_COUNT = 54;

const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/images/gallery/cuva-sports-${num}.jpg`;
});

const categoryFallbacks: Record<string, string> = {
  football: "/images/fallback-football.jpg",
  cricket: "/images/fallback-cricket.jpg",
};

/**
 * Returns the article's own image, or `undefined` when it has none. Cards pass
 * the result to <MatchCardImage/>, which renders the branded
 * <MatchReportFallback/> UI in place of a stock/Lincoln fallback photo.
 */
export function getImageForArticle(
  slug: string,
  category: string,
  articleImage?: string
): string | undefined {
  return articleImage || undefined;
}

export function getCategoryFallback(category: string): string {
  return categoryFallbacks[category] || categoryFallbacks.football;
}

export { galleryImages };
