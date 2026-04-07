/**
 * One-off migration script: auto-generate standfirst fields for existing articles.
 * Strips the redundant "TeamA X-X TeamB - " scoreline prefix from excerpts.
 *
 * Usage: npx tsx scripts/generate-standfirsts.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content", "articles");

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Skip if standfirst already exists
  if (data.standfirst) {
    skipped++;
    continue;
  }

  const excerpt: string = data.excerpt || "";

  // Pattern: "Team A X-X Team B - narrative..." or "Team A X-X Team B (X-X on pens/agg) - narrative..."
  const scorelinePattern = /^.+?\d+-\d+.+?\s-\s/;
  const match = excerpt.match(scorelinePattern);

  if (match) {
    const standfirst = excerpt.slice(match[0].length).trim();
    if (standfirst.length > 20) {
      data.standfirst = standfirst.charAt(0).toUpperCase() + standfirst.slice(1);
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newContent);
      console.log(`✓ ${file}: "${data.standfirst.slice(0, 60)}..."`);
      updated++;
    } else {
      console.log(`⊘ ${file}: standfirst too short after stripping, skipped`);
      skipped++;
    }
  } else {
    console.log(`⊘ ${file}: no scoreline pattern found in excerpt, skipped`);
    skipped++;
  }
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
