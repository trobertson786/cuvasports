# Plan — 3 new articles + WC card go-live + freshness fixes

## Context
William has supplied three new pieces: (1) the Premier League 2026-27 fixtures release, and the Oval 2nd Test (2) Day 3 and (3) Day 4 reports. Day 1 and Day 2 are already live; Day 3/Day 4 do **not** exist yet (the only `day-3`/`day-4` files are from the *1st* Test). At the same time the homepage data is stale (matchday.json still says "Day 2 stumps"; a ticker line still reads "England drawn in group with [TBC]") and the verified England World Cup card is built but not yet merged to production. This plan adds the three articles with correctly-licensed images, fixes the out-of-date data, and merges the WC card — all in one push.

Research (Claude WebSearch) confirmed the site already follows best practice: NewsArticle JSON-LD is present (`reports/[slug]/page.tsx`), William's reports already lead with the result (inverted-pyramid), and the image-credit method (author + licence + source) matches Creative Commons/Wikimedia guidance. The one actionable best-practice gap is **content freshness** — addressed below. Build check of the WC branch (`dpl_G9Nd…`) is clean: compiled in 11.5s, TypeScript passed, `/api/wc-england` registered; the only warning ("edge runtime disables static generation") is pre-existing and unrelated.

## Conventions (per project CLAUDE.md)
- Cricket articles: `category: cricket`, `subcategory: Test Match`; body = `## The Story of the Match` + `## Author's Standout Players`; **no** ScoreBox frontmatter fields.
- Football articles: `category: football`. A fixtures-release is news, **not** a match report → no ScoreBox fields.
- All prose: British spelling, **no em/en dashes** (hyphens only), fix obvious typos, preserve William's wording, no invented stats.
- William's own match photos: no credit needed. Online images: credit line at foot.

## Task 1 — Premier League 2026-27 fixtures article
- **File:** `content/articles/2026-06-20-premier-league-fixtures-2026-27.mdx`
- **Title:** "Premier League Fixtures Released for 2026-27: Arsenal Host Coventry City on Opening Night"
- **Frontmatter:** `category: football`, `subcategory: Premier League`, `author: William Powell`, `competition: Premier League`, no ScoreBox fields, `image: /images/emirates-stadium-cc.jpg`.
- **Image:** download a modern CC-licensed Emirates Stadium photo from Wikimedia Commons (candidate: *File:London Emirates Stadium arsenal.jpg*, aerial, CC BY-SA 3.0 DE, Arne Müseler — verify author/licence/URL on the file page before use), save to `public/images/`, add foot credit `*Photo: Arne Müseler, CC BY-SA 3.0, via Wikimedia Commons*`.
- **Body:** William's text reformatted into clean prose (opening drop-cap line, then the matchday breakdown). Fix dashes/typos only.
- **Flag (no change without your OK):** William's text lists "Fulham host Chelsea … on Monday 30 August 2026" as the final Match Day 1 game — but opening weekend is 21-23 Aug, so this looks like it should be Monday 24 Aug. I will **keep William's wording as written** and note it, unless you tell me to correct it.

## Task 2 — Oval 2nd Test, Day 3
- **File:** `content/articles/2026-06-15-england-vs-new-zealand-2nd-test-day-3.mdx`
- Cricket format; `competition: 2nd Rothesay Men's Test Match`, `venue: KIA Oval, London SE11`.
- **Image:** `/images/oval-test-2026-day3.png` (already saved — William's photo, no credit).
- Map William's "Authors Players of the Day" (4 bullets) → `## Author's Standout Players`. Typo fixes: `Nicolls`→`Nicholls`, `Harvey Nicolls`→`Henry Nicholls`, `fro`→`for`. No em dashes. No standalone Match Scores block (house format).

## Task 3 — Oval 2nd Test, Day 4
- **File:** `content/articles/2026-06-16-england-vs-new-zealand-2nd-test-day-4.mdx`
- Cricket format, same competition/venue.
- **Image:** `/images/oval-test-2026-day4.png` (already saved — William's photo, no credit).
- Map "Author's Standout Players" bullets across. Typo fixes: `Dyuckett`→`Duckett`, `Matt henry`→`Matt Henry`, `deliver`→`delivery`. No em dashes.

## Freshness fixes — `content/matchday.json` (out-of-date data found)
- **Result entry:** update the 2nd-Test line from "Eng 222/6 … Day 2 stumps" to the Day 4 position: `NZ 391 & 362, Eng 291 & 182/6` style — Eng 182/5 needing 281, NZ need 5 wickets (latest from William; we have **no Day 5 / final result** from him — see Open Questions).
- **Ticker:** replace the two stale Day-2 cricket lines with Day-3/Day-4 lines; **fix the out-of-date line** "England drawn in group with [TBC]" → England in Group L, opened with a 4-2 win over Croatia.

## World Cup card go-live
- Merge branch `wc-england-card` into `main` (verified: live API returns England top of Group L; build clean). Combined into the same push as above.

## Execution order
1. Source + download the Emirates image (verify licence on the Commons file page first).
2. Write the three `.mdx` articles.
3. Update `matchday.json` (result + ticker).
4. Validate: js-yaml on each frontmatter, grep for em/en dashes (expect 0), confirm every `image:` path resolves on disk.
5. `git checkout main`, merge `wc-england-card`, add the new articles/images/matchday, commit, push `main`.

## Verification
- Local: `npx js-yaml` each new article's frontmatter parses; `grep -P '[—–]'` returns nothing in prose; `test -f` each referenced image.
- Post-push: poll the production Vercel deployment to `READY` (via Vercel MCP), confirm no new build warnings, then fetch the public site to confirm the three articles render and the England WC card shows on the homepage.

## Open questions for you
1. Fulham v Chelsea "Monday 30 August" — leave as William wrote it (default), or correct to Mon 24 Aug?
2. We have **no Day 5 / final result** for the 2nd Test from William. Update matchday.json only to the Day-4 position (default), or do you have the final scoreline to include?
