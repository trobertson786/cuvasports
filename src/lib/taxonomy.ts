export function formatCategoryLabel(category: string, subcategory?: string): string {
  if (subcategory) return subcategory.toUpperCase();
  return category.toUpperCase();
}

export const TAXONOMY = {
  football: {
    competitions: [
      "Premier League",
      "Championship",
      "League One",
      "League Two",
      "FA Cup",
      "Champions League",
      "Europa League",
      "International",
    ],
  },
  cricket: {
    competitions: [
      "Test Cricket",
      "County Championship",
      "ODI",
      "T20",
      "The Hundred",
      "International",
    ],
  },
} as const;

export const ALL_FORMATS = [
  "Match Report",
  "Preview",
  "Analysis",
  "Column",
  "Predictions",
] as const;

export function getCompetitionsForSport(sport: "football" | "cricket"): string[] {
  return [...TAXONOMY[sport].competitions];
}
