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
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
