export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: "football" | "cricket";
  subcategory?: string;
  standfirst?: string;
  excerpt: string;
  format?: "Match Report" | "Preview" | "Analysis" | "Column" | "Predictions";
  image?: string;
  featured?: boolean;
  gameweek?: number;
  tags?: string[];
  author?: string;
  homeTeam?: string;
  awayTeam?: string;
  homeScore?: number;
  awayScore?: number;
  homeScorers?: string[];
  awayScorers?: string[];
  competition?: string;
  venue?: string;

  /* ── Trust components ──
     All opt-in. A provenance or accreditation claim printed automatically
     on every report would be false on the reports where it does not hold,
     so nothing here renders unless the field is set. */

  /** "How this report was made" note, e.g. attended, filed from the press box. */
  provenance?: string;
  /** Shows the "Reported from the ground" flag in the byline row. */
  fromTheGround?: boolean;
  /** ISO timestamp of a substantive update, plus what changed. */
  updatedAt?: string;
  updateNote?: string;
  /** A published correction, shown on the report it affects. */
  correction?: string;
  correctedAt?: string;
  /** Overrides the default source-attribution note under the stats table. */
  statsSource?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
