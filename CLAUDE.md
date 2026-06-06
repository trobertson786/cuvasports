# CUVA Sports — Project Notes for Claude

## Cricket Article Format

Cricket articles must NOT use football-style formatting. The ScoreBox component is suppressed for `category: cricket` at the page level — do not add `homeTeam`, `awayTeam`, `homeScore`, or `awayScore` to cricket frontmatter.

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
[Prose narrative — drop cap CAPS on first word, full chronological account]

## Author's Standout Players
- **Player (Team)** - one sentence explanation
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
[Intro paragraph — no section header]

## [Team Name] Squad
- Player (Club) - role/note
```

### Style rules (apply to ALL articles, cricket and football)

- NO em dashes (—) or en dashes (–) in prose — use regular hyphens (-)
- Exception: `-` in table cells for "none" values is fine
- Hyphens in sub-headers use ` - ` (spaced)
- British spelling: "favourites", "organised", "colour" etc.
- Fix obvious name typos but preserve author's prose style
- No invented stats — if William's doc has an incomplete stat, leave it as written

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

- All article images in `/public/images/`
- CC-licensed images: add attribution line at bottom of article `*Photo: Author, CC BY-SA X.X, via Wikimedia Commons*`
- WhatsApp photos from William: no attribution needed
- Fallback: Wembley (`/images/wembley-stadium-playoff.jpg`) for football finals; Lord's (`/images/lords-test-match-day1.jpeg`) for cricket

## Deployment

- GitHub: `trobertson786/cuvasports` — push to `main` triggers Vercel deploy
- Articles: `/content/articles/YYYY-MM-DD-slug.mdx`
- Matchday data (ticker, results, fixtures): `/content/matchday.json`
