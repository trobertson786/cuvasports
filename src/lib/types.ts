export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: "football" | "cricket" | "analysis";
  subcategory?: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  author?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
