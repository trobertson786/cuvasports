# Publishing Guide — CUVA Sports

## Quick Match Report (fastest)

From the project folder, run:

```bash
npm run match-report -- "QPR" "Leicester" "2-1"
```

This creates a pre-filled match report MDX file and opens it in your editor. Fill in the sections, then publish:

```bash
git add .
git commit -m "New: QPR 2-1 Leicester: Match Report"
git push
```

Live on cuvasports.com in ~60 seconds (Vercel auto-deploys on push).

---

## New Article (any type)

```bash
npm run new-article -- "Your Article Title"
```

You'll be prompted for category and subcategory. Or pass them directly:

```bash
npm run new-article -- "Title Here" --category football --sub "Championship"
```

Then edit and publish:

```bash
git add .
git commit -m "New: Your Article Title"
git push
```

---

## Frontmatter Reference

Every article needs this at the top of the `.mdx` file:

```yaml
---
title: "Article Title"
date: "2026-03-14"
category: "football"          # football | cricket | analysis
subcategory: "Championship"   # Premier League, Championship, Champions League, Test, etc.
excerpt: "One-sentence summary shown on cards and in search."
featured: false               # set to true for homepage hero splash
tags: ["QPR", "Leicester"]
author: "William Powell"
---
```

- **featured: true** — makes the article the hero splash on the homepage (only one at a time)
- **category** — determines which section page the article appears on
- **date** — must be YYYY-MM-DD format

---

## Publishing Checklist

1. Run the script (`match-report` or `new-article`)
2. Edit the `.mdx` file — fill in all placeholder sections
3. Set `featured: true` if this should be the homepage splash
4. `git add . && git commit -m "New: title" && git push`
5. Check cuvasports.com after ~60 seconds

---

## File Location

All articles live in: `content/articles/`

The filename becomes the URL slug:
`qpr-2-1-leicester.mdx` → `cuvasports.com/blog/qpr-2-1-leicester`
