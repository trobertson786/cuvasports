# Publishing Guide - CUVA Sports

## Current Live Website

The live site is `https://cuvasports.com`.

- Homepage: `https://cuvasports.com`
- Article index: `https://cuvasports.com/reports`
- Category pages: `https://cuvasports.com/football` and `https://cuvasports.com/cricket`
- Article URLs: `https://cuvasports.com/reports/{filename-without-mdx}`
- RSS: `https://cuvasports.com/feed.xml`
- Sitemap: `https://cuvasports.com/sitemap.xml`

Use **CUVA Sports** everywhere. Do not use alternate spellings.

## Repository Workflow

Articles are committed as MDX files in `content/articles/`. The filename becomes the live slug.

Example:

- Source file: `content/articles/2026-07-06-england-vs-mexico-world-cup-round-of-16.mdx`
- Live URL: `https://cuvasports.com/reports/2026-07-06-england-vs-mexico-world-cup-round-of-16`

The live site is a Next.js app deployed on Vercel. Pushes to `main` deploy the current repository state. The site also has a Vercel cron configured in `vercel.json` for `/api/update-standings`.

## Creating Articles

Preferred filename format:

```text
content/articles/YYYY-MM-DD-slug.mdx
```

The helper scripts are available, but check their output before publishing because the current archive and guide rules are more specific than the generic templates.

Quick football match report:

```bash
npm run match-report -- "QPR" "Leicester" "2-1"
```

General article:

```bash
npm run new-article -- "Your Article Title"
```

With explicit category and subcategory:

```bash
npm run new-article -- "Title Here" --category football --sub "Championship"
```

## Frontmatter Reference

Every article needs valid YAML frontmatter. The application reads frontmatter with `gray-matter` in `src/lib/articles.ts`.

Common fields:

```yaml
---
title: "Article Title"
date: "2026-07-06"
category: football
subcategory: Championship
excerpt: "One-sentence summary shown on cards, search, RSS, and metadata."
featured: false
tags:
  - QPR
  - Leicester
  - Championship
author: William Powell
image: /images/example.jpg
standfirst: "Longer standfirst used by current article pages and cards where present."
---
```

Supported categories in the app type schema are `football` and `cricket`. Do not use `analysis` as a category unless the application code is changed first.

`featured: true` makes the article eligible for the homepage and reports-page lead slot. If several articles are featured, the newest featured article is shown first.

## Football Match Reports

Football match reports should include score metadata so the article page can render `ScoreBox`.

```yaml
homeTeam: Queens Park Rangers
awayTeam: Bristol City
homeScore: 0
awayScore: 0
competition: SkyBet Championship
venue: Matrade Loftus Road
```

Standard body structure:

```md
## Match Details

## Match Stats & Key Metrics

## The Story of the Match

## Timeline of Key Events

## Author's Standout Players
```

## Cricket Articles

Cricket articles must not use football score metadata. The article route suppresses `ScoreBox` for `category: cricket`, and cricket frontmatter should not include `homeTeam`, `awayTeam`, `homeScore`, or `awayScore`.

Test match day reports usually use:

```md
## The Story of the Match

## Author's Standout Players

## Match Scores
```

Squad announcements usually open with prose, then use a squad heading and bullet list.

Season or county reviews usually use a season-summary heading, match sub-headings in bold, and an author picks/stars section.

## Images

Article images live under `public/images/` or `public/images/gallery/` and are referenced from frontmatter with a public path such as:

```yaml
image: /images/gallery/trent-bridge-test-day5.png
```

The current components use the article title as image alt text. Add in-article image captions or credit lines when needed, especially for CC-licensed or third-party imagery.

Fallback images are handled by `src/lib/gallery-images.ts` when no frontmatter image is present.

## Checks Before Publishing

Run:

```bash
npm run lint
npm run build
```

Then review:

```bash
git diff
```

Check that:

- The article URL will be under `/reports/`.
- `category` is only `football` or `cricket`.
- Cricket articles do not include football score fields.
- Football match reports include score fields when a ScoreBox is desired.
- The image path exists in `public/images/` or `public/images/gallery/`.
- The excerpt is concise and suitable for cards, RSS, and metadata.
- No unrelated files are changed.
- British spelling and CUVA Sports naming are preserved.

## Publishing

Only publish when explicitly instructed.

```bash
git add .
git commit -m "New: Your Article Title"
git push
```

After deployment, verify the production URL, the homepage lead if `featured: true`, the relevant category page, RSS, and sitemap.
