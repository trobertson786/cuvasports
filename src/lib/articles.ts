import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article, ArticleFrontmatter } from "./types";

const articlesDirectory = path.join(process.cwd(), "content/articles");

function ensureDirectory() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
  }
}

export function getAllArticles(): Article[] {
  ensureDirectory();
  const files = fs.readdirSync(articlesDirectory).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as ArticleFrontmatter;
    const stats = readingTime(content);

    return {
      ...frontmatter,
      slug,
      content,
      readingTime: stats.text,
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  ensureDirectory();
  const filePath = path.join(articlesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  return [...new Set(articles.map((a) => a.category))];
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tags = articles.flatMap((a) => a.tags || []);
  return [...new Set(tags)];
}
