import fs from "fs";
import path from "path";

const title = process.argv[2];

if (!title) {
  console.error("Usage: npx tsx scripts/new-article.ts \"Article Title\"");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const today = new Date().toISOString().split("T")[0];
const filename = `${slug}.mdx`;
const filepath = path.join(process.cwd(), "content/articles", filename);

if (fs.existsSync(filepath)) {
  console.error(`File already exists: ${filepath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
date: "${today}"
category: "football"
subcategory: "Premier League"
excerpt: "Add a brief excerpt here."
image: "/images/${slug}.jpg"
featured: false
tags: []
author: "William Powell"
---

Write your article here.
`;

fs.mkdirSync(path.dirname(filepath), { recursive: true });
fs.writeFileSync(filepath, template);
console.log(`Created: content/articles/${filename}`);
