export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: "football" | "cricket" | "analysis";
  subcategory?: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
  gameweek?: number;
  tags?: string[];
  author?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
