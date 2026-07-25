# CUVA Sports - Project Notes for Codex

## Name and Live Site

- The publication is **CUVA Sports**. Do not use alternate spellings.
- Live site: `https://cuvasports.com`
- Main routes: `/`, `/reports`, `/football`, `/cricket`, `/about`, `/contact`
- Article URLs use `/reports/{slug}`.
- Article source files live in `content/articles/`.
- The filename without `.mdx` is the article slug.
- RSS is generated at `/feed.xml`.
- Sitemap is generated at `/sitemap.xml`.

## Technical Publishing Rules

- Framework: Next.js app router.
- Package manager: npm with `package-lock.json`.
- Article loader: `src/lib/articles.ts` using `gray-matter`.
- Article route: `src/app/reports/[slug]/page.tsx`.
- Article index: `src/app/reports/page.tsx`.
- Category pages: `src/app/football/page.tsx` and `src/app/cricket/page.tsx`.
- SEO helpers: `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/feed.xml/route.ts`, `src/app/opengraph-image.tsx`.
- Deployment: GitHub repo `trobertson786/cuvasports`; push to `main` triggers Vercel.
- Vercel cron: `vercel.json` calls `/api/update-standings` daily.
- Validation before publication: run `npm run lint`, run `npm run build`, and review `git diff`.

## Current Frontmatter Schema

The app type schema supports `category: football` and `category: cricket`. Do not use `analysis` as a category unless the app code is changed first.

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
author: William Powell
image: /images/example.jpg
standfirst: "Longer standfirst where applicable."
---
```

Optional football match fields:
- `homeTeam`, `awayTeam`, `homeScore`, `awayScore`, `homeScorers`, `awayScorers`
- `competition`, `venue`, `gameweek`

Optional general fields:
- `featured`, `tags`, `image`, `competition`, `venue`, `standfirst`

`featured: true` makes an article eligible for the homepage and reports-page lead. If multiple articles are featured, the newest featured article is selected first.

## Cricket Article Format

Cricket articles must NOT use football-style formatting. The ScoreBox component is suppressed for `category: cricket` at the page level, but cricket articles should still avoid football score fields.

### Frontmatter fields for cricket articles

**Required:**
- `title`, `date`, `category: cricket`, `subcategory`, `excerpt`, `author`, `standfirst`

**Optional (where applicable):**
- `featured`, `tags`, `image`, `competition`, `venue`

**Never include for cricket:**
- `homeTeam`, `awayTeam`, `homeScore`, `awayScore`, `homeScorers`, `awayScorers`, `gameweek`

### Article body structure

**Test match day reports:**
```
## The Story of the Match
[Prose narrative - drop cap CAPS on first word, full chronological account]

## Author's Standout Players
- **Player (Team)** - one sentence explanation

## Match Scores
[Innings-by-innings scores where applicable]
```

**Season/county reviews:**
```
## The Story of the Season So Far
[Prose intro paragraph, then bold match sub-headers]
**Opposition (Venue) - Result**
[Match narrative paragraph]

## Author's Seaxe Stars / Author's Stars of the [Period]
- **Best Batter - Name** - stats
- **Centuries** - who scored them
- **Best All-Rounder - Name** - stats
- **Best Bowler - Name** - stats
```

**Squad announcements:**
```
[Intro paragraph - no section header]

## [Team Name] Squad
- Player (Club) - role/note
```

### Style rules (apply to ALL articles, cricket and football)

- NO em dashes or en dashes in article prose - use regular hyphens (-)
- Exception: `-` in table cells for "none" values is fine
- Hyphens in sub-headers use ` - ` (spaced)
- British spelling: "favourites", "organised", "colour" etc.
- Fix obvious name typos but preserve author's prose style
- No invented stats - if William's doc has an incomplete stat, leave it as written

## Football Article Format

Football match reports use the ScoreBox component automatically when `homeTeam`, `awayTeam`, `homeScore`, `awayScore` are all present in frontmatter.

### Standard football article structure
```
## Match Details
## Match Stats & Key Metrics
## The Story of the Match
## Timeline of Key Events
## Author's Standout Players
```

## Images

- Article images live in `/public/images/` or `/public/images/gallery/`
- Frontmatter image paths are public paths such as `/images/gallery/trent-bridge-test-day5.png`
- CC-licensed images: add attribution line at bottom of article `*Photo: Author, CC BY-SA X.X, via Wikimedia Commons*`
- WhatsApp photos from William: no attribution needed
- Fallback: Wembley (`/images/wembley-stadium-playoff.jpg`) for football finals; Lord's (`/images/lords-test-match-day1.jpeg`) for cricket

## Deployment

- GitHub: `trobertson786/cuvasports` - push to `main` triggers Vercel deploy
- Articles: `/content/articles/YYYY-MM-DD-slug.mdx`
- Matchday data (ticker, results, fixtures): `/content/matchday.json`
- Live article URL: `https://cuvasports.com/reports/YYYY-MM-DD-slug`
- Do not publish unless the user explicitly asks for publication.
