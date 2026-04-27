const GALLERY_COUNT = 54;

const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/images/gallery/cuva-sports-${num}.jpg`;
});

const categoryFallbacks: Record<string, string> = {
  football: "/images/fallback-football.jpg",
  cricket: "/images/fallback-cricket.jpg",
};

export function getImageForArticle(
  slug: string,
  category: string,
  articleImage?: string
): string {
  if (articleImage) return articleImage;
  return getCategoryFallback(category);
}

export function getCategoryFallback(category: string): string {
  return categoryFallbacks[category] || categoryFallbacks.football;
}

export { galleryImages };
