# Handoff: CUVA Sports - homepage and match report page

## Overview

CUVA Sports (cuvasports.com) is a live independent football and cricket journalism site, built in Next.js, written and photographed by William Powell (sports journalist since 1987; FWA Life Member; Full Member and Archivist of the Cricket Media Club since 1989; BSJA, AIPS, BAJ).

This is **not a rebrand**. It is an editorial upgrade of two templates:

1. **Desktop homepage** - replaces competition-names-as-headings with a real editorial hierarchy, merges two duplicate score modules into one "Recent Results" module, replaces the fake newsletter link with a working signup, and replaces scattered "FWA" badges with one substantial credibility block.
2. **Desktop match report page** - a reading-first article template with a scorecard, statistics, timeline, standout players and the trust components that make a byline mean something.

Both fix a real accessibility defect in the current site: competition labels (`.kicker`) and the FWA badge (`.fwa-micro`) were gold `#D4A843` on `#F9F7F2`, which measures 2.07:1 against a WCAG 2.2 AA requirement of 4.5:1.

Scope of this handoff: **desktop only**. Mobile is deliberately not designed - it is cheaper and more accurate written as Tailwind breakpoints against real content. See "Responsive behaviour" for the rules that must be decided during the build.

## About the design files

The files in this bundle are **design references created in HTML**. They are prototypes showing intended look, structure and behaviour. They are **not production code to copy**.

The task is to **recreate these designs in the existing Next.js codebase**, using its established patterns (React components, Tailwind, MDX content pipeline, existing routing). Do not port the inline styles. Translate the values in this README into the project's Tailwind theme and component library.

Each HTML file is a self-contained "Design Component": one `.dc.html` file with an inline template plus a small logic class. Inline styles are an artefact of that authoring format, not a recommendation.

## Fidelity

**High fidelity.** Colours, typography, spacing, rules and states are final and intended to be matched precisely. Two caveats:

- **Photography is unresolved.** Every image is an empty drop slot (`<image-slot>`). Real press-box photographs and captions must be supplied. Do not ship grey placeholder boxes; where a report has no photograph there is a designed empty state (see below).
- **Logos are screenshot bitmaps.** `assets/logo-*.png` were cut from the supplied brand identity sheet so the review could proceed. Replace with the real `cuva-mark.svg` / `cuva-mark-white.svg` before launch.

## Design tokens

Ratios are measured against the page background `#F9F7F2` unless stated.

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `--cuva-ink` | `#0B1A2B` | Brand navy, editorial ink, body text | 16.39:1 AAA |
| `--cuva-navy-950` | `#071320` | Footer, deepest surface | - |
| `--cuva-navy-800` | `#14273D` | Primary navy surface, nav, scorecard, buttons | 14.14:1 AAA |
| `--cuva-navy-600` | `#1C3550` | Nav hover, selected | 11.71:1 AAA |
| `--cuva-link` | `#23507F` | Links on light surfaces, focus ring | 7.77:1 AAA |
| `--cuva-newsprint` | `#F9F7F2` | Page background | - |
| `--cuva-paper` | `#FFFFFF` | Article/input reading surface | - |
| `--cuva-tint` | `#F3F1EC` | Section tints, hover fills, pull-out panels | - |
| `--cuva-rule` | `#D9DEE3` | 1px editorial divider, input borders | - |
| `--cuva-muted` | `#5C6672` | Secondary metadata | 5.45:1 AA |
| `--cuva-football` | `#7A2E1E` | Football section colour | 8.77:1 AAA |
| `--cuva-cricket` | `#1E5741` | Cricket section colour | 7.86:1 AAA |
| `--cuva-gold` | `#D4A843` | **Dark surfaces only** | 7.92:1 on `#0B1A2B` |
| `--cuva-gold-ink` | `#8A6410` | Light-surface substitute for gold | 5.02:1 AA |
| `--cuva-live` | `#B3261E` | Red card, corrections, validation errors only | 6.11:1 AA |

**Colour rules, enforced:**

- Colour encodes editorial section (Guardian model). Football and cricket each own a colour. Colour is never decoration.
- Gold appears only on navy: the active nav underline, the scorecard figure, the credibility block, footer section headings, the author block CTA.
- On light surfaces, competition labels use the section colour (football/cricket) or navy. Never gold.
- `--cuva-live` is reserved. It marks the red card in the timeline, the corrections notice, and form validation. It is never used for emphasis or urgency.
- No meaning is carried by colour alone: the red card also says "Red card", the corrections notice also says "Correction".

**Spacing:** 8px base unit. Used steps: 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 44, 48, 56, 64.

**Grid:** 12 columns, max canvas 1320px, page gutter 32px, column gap 32px (24px inside dense sections). Must hold at 1280, 1440 and 1600 without large empty areas. Every 12-column grid uses `minmax(0, 1fr)` columns, not `1fr` - `1fr` resolves to `minmax(auto, 1fr)` and an image's min-content width will blow the column out.

**Radii:** 0px everywhere. The only exception is the app-icon logo variant (20px), which is artwork. No pills, no rounded cards.

**Shadows:** none. Hierarchy is made with 1px rules, 2px/3px section rules, and tint fills.

## Typography

Three roles, strictly separated. No fourth role.

| Role | Family | Notes |
| --- | --- | --- |
| Display and headlines | **Playfair Display** 700 | Locked by the client after an A/B against Source Serif 4. Do not use below 20px - it gets fragile. |
| Editorial body, standfirsts, card headlines | **Source Serif 4** 400/600/700, italic 400 | Optical sizing; safe down to 15px. |
| UI: navigation, metadata, forms, labels, buttons | **Inter** 400/500/600/700 | |
| Scores, times, statistics, dates, source labels | **IBM Plex Mono** 400/500/600 | Any figure a reader might compare. |
| Logo wordmark | supplied artwork | Not set in a webfont; use the SVG. |

**Type scale in use**

Homepage: lead h1 60/1.04, -0.02em - standfirst 21/1.5 - section h2 30/1.1, -0.01em - feature h3 27-30/1.15 - card h3 18-19/1.28 - rail item 19/1.28 - body 16-17/1.5 - metadata 12-13 - kicker 11/0.12em uppercase 700.

Report page: h1 52/1.06, -0.015em - standfirst 21/1.5 - section h2 24-28 - body 19/1.65 - timeline 16-18/1.55 - table figures 15 - captions and metadata 12-13 - source note 12.

**Typed metadata components** (first-class, defined styles - not leftover small text):

- **Kicker**: Inter 700, 11px, `letter-spacing: 0.12em`, uppercase. Colour = section colour on light, gold on navy. Format `Football / World Cup Final`, separator `#D9DEE3`.
- **Byline row**: Inter. Author name 13px/600 in `--cuva-ink`; date 13px IBM Plex Mono uppercase; read time 13px/400 `--cuva-muted`; separators `·` in `--cuva-rule`; provenance flag `Reported from the ground` 11px/700, `0.1em`, uppercase, `--cuva-gold-ink`. On the report page the row is bracketed by 1px rules, 12px padding.
- **Score**: IBM Plex Mono 600. Hyphen, never an en dash. Always accompanied by screen-reader text (see accessibility).

**House style:** British English. **No em dashes or en dashes anywhere in UI copy or content** - hyphens only. This includes scorelines (`1-0`, not `1–0`).

## Screens

### 1. Homepage (`CUVA Homepage.dc.html`)

Purpose: within five seconds a reader knows what CUVA Sports is, what the lead story is, what was published most recently, why the publication is trustworthy, and how to reach football or cricket coverage.

Order and layout, all inside the 1320px canvas:

1. **Utility strip** - 40px tall, `border-bottom: 1px solid --cuva-rule`. Left: live date `Saturday, 25 July 2026 · London Edition`, 12px `--cuva-muted`. Right: `RSS`, `Contact the desk`, 12px/500 `--cuva-link`, 24px gap, each `min-height: 44px`.
2. **Masthead** - 26px/22px padding. Grid `auto 1fr auto`, 32px gap. Left: primary logo lockup, 64px tall. Centre: descriptor `Football and cricket journalism, written from the press box.` Source Serif 4 17px italic `--cuva-muted`, `border-left: 1px solid --cuva-rule`, 24px padding-left. Right: search - 44px tall input (`#FFFFFF`, 1px `--cuva-rule`, no right border, 246px wide) butted against a 44px navy `#14273D` submit button, 88px min width, 0 radius. Visually hidden label.
3. **Primary nav** - `#14273D`, 52px tall items, 18px horizontal padding, Inter 15px. Active: 600 weight + `border-bottom: 3px solid --cuva-gold`. Hover: background `#1C3550` + `border-bottom: 3px solid rgba(212,168,67,.5)`. Items: Home, Match Reports, Football, Cricket, About, Contact.
4. **Lead** - 12-col grid; article spans 8, rail spans 4 with `border-left: 1px solid --cuva-rule` and 32px padding-left. Section closes with `border-bottom: 2px solid --cuva-ink`.
   - Article: kicker row (kicker + 1px flexible rule + `TODAY'S LEAD` in mono 11px) - h1 Playfair 60px, `max-width: 21ch` - standfirst 21px Source Serif 4, `max-width: 62ch` - byline row - hero image 440px tall with `border-top: 3px solid --cuva-football` - credit line + `Read the full report ->` (44px target) separated by a 1px rule - navy scorecard band.
   - Scorecard band: `#14273D`, 22px/26px padding. Team names Source Serif 4 22px/700 (loser at 75% white), score IBM Plex Mono 26px/600 gold, `AET` chip mono 11px with `1px solid rgba(212,168,67,.5)`. Right: scorer/red card/keeper detail 13px at 72% white.
   - Rail: heading `Latest` Source Serif 4 20px/700 + `UPDATED 25 JUL` mono 11px, over `border-bottom: 2px solid --cuva-ink`. Five items, each 18px vertical padding, `border-bottom: 1px solid --cuva-rule`, hover fill `--cuva-tint`: kicker, Source Serif 4 19px/600 headline, mono date + read time. Closes with `All match reports ->`.
5. **Football section** - header rule `3px solid --cuva-football`, h2 in football colour, subtitle `Premier League, EFL and international coverage · 55 reports`, right-aligned `All football ->`. Body: 7-col feature (2-up grid: 270px image with football top rule, then kicker/h3 27px/standfirst/byline) + 5-col list of three **match-report cards** - `grid-template-columns: 1fr auto`, kicker + Source Serif 4 18px headline, score right-aligned in mono 15px/600, 15px padding, 1px rules, hover `--cuva-tint`.
6. **Cricket section** - same skeleton in `--cuva-cricket`. 6-col feature (300px image, kicker, h3 30px, standfirst, byline) + 6-col right column holding two **standard cards** (150px image, kicker, 19px headline, mono date) and, spanning both, the **analysis column** - visually distinct: `border-left: 3px solid --cuva-cricket`, `--cuva-tint` fill, italic Source Serif 4 22px/700 headline, labelled `Analysis / From the desk`, byline says `Column`.
7. **Recent Results** - the single merged module. Real `<table>`, `border-bottom: 2px solid --cuva-ink` under the header row. Columns: Sport (98px), Competition (25%), Result, Date (112px), Status (140px), Report (104px, right aligned). Header cells 10px/600 `0.12em` uppercase `--cuva-muted` with `scope="col"`. Rows: 1px top rule, 13px vertical padding, hover `--cuva-tint`. Sport cell is a kicker with a 3px left border in the section colour. Result cell is IBM Plex Mono 15px with venue/AET detail in 12px `--cuva-muted`. Status is 12px/600 `0.06em` uppercase. Footnote: `This module lists results only. The words "League Table" are used solely where actual positions and points are shown.`
8. **Across the Grounds** - 12-col: one 6-col figure (320px) and two 3-col figures (320px). Captions 13px, lead clause in `--cuva-ink`, context in `--cuva-muted`. Subtitle credits all photography to William Powell.
9. **William Powell credibility block** - full-bleed `#14273D`, 56px vertical padding. 3-col portrait (300px, `border-top: 3px solid --cuva-gold`) + 5-col text + 4-col credentials list with `border-left: 1px solid rgba(217,222,227,.25)`.
   - Text: gold mono eyebrow `WHO WRITES CUVA SPORTS`, Playfair/Source Serif 40px name, 19px Source Serif paragraph on reporting from the ground rather than a desk, then three mono figures in gold (1987 reporting since / 39 years active / 1989 Cricket Media Club member since), then a gold CTA button (`#D4A843` on `#0B1A2B`, hover `#FFFFFF`, 44px).
   - Credentials: gold 11px heading, five 15px rows separated by `rgba(217,222,227,.2)` rules - FWA Life Member; Cricket Media Club Full Member and Archivist since 1989; BSJA; AIPS; BAJ - then a 13px coverage line.
10. **Newsletter** - `--cuva-tint`, 48px padding, 6+6 split with a 1px left rule. Left: gold-ink mono eyebrow `NEWSLETTER`, Source Serif 34px `Weekly from the Press Box`, 18px promise. Right: real form - visible label, 48px email input + 132px navy Subscribe button, inline validation/success region, help line `Sent every Monday. No advertising, no sharing of your address, unsubscribe in one click.`, then an RSS alternative above a 1px rule.
11. **Footer** - `#071320`. 12-col: 4-col reversed logo (58px) + description, two 2-col link lists (gold 11px headings, 44px link targets at 85% white), 4-col corrections/enquiries note with a 1px left rule. Bottom bar: `border-top: 1px solid rgba(217,222,227,.18)`, copyright left, `FWA LIFE MEMBER · EST. 1987` in mono right.

Appendix (design reference only, hidden by the `showAppendix` prop): logo system, colour tokens with ratios, typed metadata components, interactive states, and the Playfair vs Source Serif 4 comparison. Do not build the appendix.

### 2. Match report page (`CUVA Match Report.dc.html`)

Purpose: read the story; be able to check the facts; be able to see who filed it and how.

Reading system: single column, `minmax(0, 720px)`, centred; optional 300px rail at 64px gap. Article body Source Serif 4 19px/1.65, 22px paragraph spacing. Body copy never runs full canvas width.

1. **Utility strip, masthead, nav** - identical to the homepage, `Match Reports` active.
2. **Breadcrumbs** - 13px, `Home / Match Reports / Football / World Cup`, `aria-current="page"` on the last item, `aria-label="Breadcrumb"` on the nav, 44px link targets.
3. **Kicker** - `Football / FIFA World Cup 2026, Final` in `--cuva-football`.
4. **Headline** - Playfair 52px/1.06, `margin-right: -56px` so it overhangs the measure into the gutter without colliding with the rail.
5. **Standfirst** - 21px Source Serif 4 `--cuva-navy-800`.
6. **Byline row** - typed component, bracketed by 1px rules.
7. **Scorecard** - navy band, `1fr auto 1fr` grid. Team names Source Serif 28px/700 with the scorer and the red card under the relevant side; score IBM Plex Mono 40px gold; `AET` chip. Sub-strip separated by `rgba(217,222,227,.2)`: `HT 0-0`, `90 MIN 0-0`, venue, date.
8. **Hero photograph** - 430px, `border-top: 3px solid --cuva-football`, caption 13px with `Photograph: William Powell` in `--cuva-muted`.
9. **Corrections and updates notice** - sits inside the article, immediately under the hero. Two states, driven by `correctionState`:
   - `updated`: 13px `--cuva-muted`, `border-left: 3px solid --cuva-rule`, mono `UPDATED` label, timestamp and what changed.
   - `correction`: `border-left: 3px solid --cuva-live`, `#FFFFFF` fill, mono `CORRECTION · <timestamp>` in `--cuva-live`/600, then the correction text at 14px. `role="note"`.
   - `none`: nothing renders.
10. **Body** - seven paragraphs. First word set as small caps (22px/700, `0.04em`) - existing house convention.
11. **"How this report was made"** - between rules, mono gold-ink label `HOW THIS REPORT WAS MADE` beside a 14px factual note: attended the match, filed from the press box, photographs his own, no part written from television coverage. Quiet, not a boast.
12. **Match details** - `<dl>`, `170px minmax(0,1fr)` grid, rows separated by 1px rules. Competition, Date, Venue, Score (mono, with HT and 90-minute scores), Goalscorer, Sent off, Referee.
13. **Match statistics** - real `<table>` with a visible `<caption>`, `scope="col"` on team headers (Spain in football colour, Argentina in navy - distinguished by colour *and* position and label), `scope="row"` on each metric. Figures IBM Plex Mono 15px, right aligned. Followed by a **source attribution row**: mono `SOURCE` label + 12px note distinguishing official press-box data, third-party expected goals, and figures counted at the ground. Any figure not from William's notebook must be attributable here.
14. **Timeline** - ordered list, `76px minmax(0,1fr)` grid, mono minute + 16px event. Decisive moments carry weight: the red card gets `border-left: 3px solid --cuva-live`, `#FFFFFF` fill, red mono minute and a bold `Red card.` lead-in; the goal gets `border-left: 3px solid --cuva-football`, `--cuva-tint` fill, 17px minute, 18px text and a bold `Goal, Spain.` lead-in. Routine events stay plain.
15. **Standout players** - editorial judgement, styled as such: `--cuva-tint` panel, `border-left: 3px solid --cuva-navy-800`, mono eyebrow `EDITORIAL JUDGEMENT, NOT A STATISTIC`, heading `William Powell's standout players`, five 16px rows with the player name in 600, closing attribution `Selected by William Powell at the ground.`
16. **Tags** - 44px chips, 1px `--cuva-rule`, `#FFFFFF`, 13px/500; hover switches border and text to the section colour.
17. **Author biography** - navy panel, `120px minmax(0,1fr)`: 150px portrait with gold top rule; gold mono eyebrow, Playfair 28px name, 15px bio, full accreditation list as inline items, then a gold primary CTA and a ghost secondary CTA (both 44px).
18. **Related reporting** - three cards, `repeat(3, minmax(0,1fr))`, 1px top rule, kicker + 18px Source Serif headline + mono date, hover `--cuva-tint`.
19. **Newsletter, inline variant** - `--cuva-tint`, `border-top: 3px solid --cuva-navy-800`, same form and states as the homepage at a narrower measure.
20. **Footer** - condensed single row: reversed logo, corrections/contact note, mono accreditation line.

**Rail (optional, `showRail`)** - 300px, sticky at 24px, `border-left: 1px solid --cuva-rule`, 28px padding-left. Contains: reading progress (mono `READING` label over a 2px track, football-colour fill), `AT A GLANCE` navy score card (gold competition line, team/score rows, scorer and red card note), `SHARE` as a plain 44px link list with 1px rules (Copy link, Share on X, Email this report, Report a correction) - not a coloured button row - and `IN THIS REPORT` section links. The rail must never compete with the story: no percentage counters, no floating badges, no colour fills beyond the score card.

**Layout comparison:** with rail = `minmax(0,720px) 300px`, 64px gap, centred (story sits left of centre, costs 364px of canvas). Without rail = `minmax(0,720px)` centred; progress falls back to the 3px window-top bar and share controls move to the end of the article.

**Cricket scorecard variant** - cricket reports have no teams-and-score fields, so the football scorecard is not forced onto them. Navy band, gold mono competition/venue line, two innings rows (team Source Serif 22px/700, `342-7 (50 ov)` in mono with overs at 13px), then a Source Serif 17px result sentence: `England beat India by 27 runs. Series won 2-1.` Bottom strip carries `border-top: 3px solid --cuva-cricket`.

**Empty state, no hero photograph** - no placeholder image and no grey box. The scorecard carries the top of the page, and body copy starts immediately under a `border-top: 3px solid --cuva-football` tint block holding the headline.

## Interactions and behaviour

- **Links, default**: `--cuva-link`, no underline. **Hover**: `--cuva-ink`, underline at 3px offset. **Focus-visible**: `2px solid --cuva-link`, 3px offset (1px on inputs). Focus is never removed.
- **Headline links**: inherit ink; hover moves to the section colour; underline on hover only.
- **Card and row hover**: `--cuva-tint` fill on the whole row or card. No lift, no shadow, no scale.
- **Nav hover**: `#1C3550` fill plus a half-opacity gold underline; the active item keeps the full-opacity underline.
- **Primary button**: `#14273D` on `#FFFFFF` text, 0 radius; hover `#0B1A2B`; focus ring as above. Gold button on navy surfaces: `#D4A843` with `#0B1A2B` text, hover `#FFFFFF`.
- **Tags**: border and text move to the section colour on hover.
- **Newsletter form**: client-side validation only in the prototype. Empty submit -> `Enter your email address to subscribe.` Malformed -> `Enter an email address in the form name@domain.com.` Valid -> `Thank you. Check your inbox to confirm; the first email arrives on Monday.` Error uses `role="alert"` and `--cuva-live`; success uses `role="status"` and `--cuva-cricket`. Errors clear on input. Wire to the real list provider and add a server error state (`Something went wrong. Try again, or subscribe by RSS.`) plus a submitting state (button disabled, label `Subscribing...`).
- **Reading progress**: passive `scroll` listener, `scrollTop / (scrollHeight - clientHeight)` rounded to whole percent, applied as the width of a 3px fixed bar at the top of the window and the 2px rail track. Thin and quiet by design.
- **Search, filter, sort, pagination**: visual only in these prototypes. Behaviour is the existing site's.
- **No** scrolling tickers, live-score polling, modal or popup newsletter capture, or fake urgency.

## State management

Homepage: `email`, `error`, `success`. Props: `leadFont` (`Playfair Display` selected), `showAppendix`.

Report page: `email`, `error`, `success`, `pct` (scroll progress). Props: `showRail` (default true), `correctionState` (`none` | `updated` | `correction`), `showAppendix`.

In production, `correctionState` is derived from article front matter (`updatedAt`, `correction`), not a prop. `showRail` should be a template-level decision, not per-article, unless the desk wants it.

## Accessibility

Target: WCAG 2.2 AA or better.

- Every interactive element is at least 44px in its smallest dimension. Inline prose links are exempt.
- Visible keyboard focus everywhere: `2px solid --cuva-link` at 3px offset.
- Logical heading order: one `h1` per page, section `h2`s, card `h3`s. No level skipped.
- Real table markup with `scope` on every header cell; a visible `<caption>` on the statistics table.
- No meaning by colour alone: the red card, corrections, football/cricket sections and validation states all carry text labels.
- **Scores must read correctly to a screen reader.** The visual scorecard is `aria-hidden="true"` and is paired with a visually hidden sentence: `Spain 1, Argentina 0, after extra time. Scorer: Torres, 106 minutes.` Cricket: `England beat India by 27 runs. England 342 for 7 in 50 overs. India 315 all out in 48.2 overs. Series won 2-1.` Apply the same pattern to every scoreline, including the homepage results table.
- Search and email inputs have labels (visually hidden where the design has no room). The newsletter help text is wired with `aria-describedby`.

## Responsive behaviour

Not designed. Decide during the build and document:

- Where the report page rail drops (recommendation: below 1180px, rail contents move inline - progress stays as the window-top bar, share moves to the end of the article, `AT A GLANCE` merges into the scorecard).
- How the Recent Results table collapses (recommendation: card rows below 900px - sport and competition on line one, result on line two in mono, date and status on line three).
- Lead 8+4 split and section 7+5 / 6+6 splits stack in source order.
- Masthead descriptor hides below 1100px; search collapses to an icon that expands.
- Body measure floors at 16px with 24px gutters.

## Content rules

- British English. No em or en dashes.
- All copy, headlines, dates, statistics and quotations in these files are real, taken from the live site and the source article. **Do not invent** results, quotations, accreditation, sponsors, awards, partnerships, subscriber numbers or live-data features.
- Standings and statistics must come from real data. The prototype's earlier Premier League table was invented and has been **removed**: only reintroduce a table module wired to the real `/api/update-standings` job, and only ever label it "League Table" when actual positions and points are displayed.
- **Known content defect to fix in the source MDX**: `content/articles/2026-07-19-spain-vs-argentina.mdx` gives goalkeeper saves as 11, while the prose, the standfirst and every scorebox say ten - and "record ten saves" is the story's hook. The design uses 10.

## Assets

| Asset | Status |
| --- | --- |
| `assets/logo-primary-t.png` | Masthead. Cut from the supplied brand identity sheet, background keyed out. **Replace with `cuva-mark.svg` lockup.** |
| `assets/logo-reversed-t.png` | Footer, white-on-dark. **Replace with the white SVG.** |
| `assets/logo-compact-t.png`, `-stacked-`, `-icon-`, `-appicon-`, `-mono-`, `-wide-`, `-small-` | The other six lockups from the sheet, for reference. |
| `image-slot.js` | Prototype-only drag-and-drop placeholder component. **Do not port.** Replace each slot with the real photograph or `next/image`. |
| Photographs | **Not supplied.** Lead, football feature, cricket feature, two cricket cards, three Across the Grounds figures, two portraits, report hero. All are William Powell's own press-box work and need captions plus alt text. |

Brand palette confirmed by the identity sheet: `#0B1A2B`, `#D9DEE3`, `#FFFFFF`.

## Files

| File | Contents |
| --- | --- |
| `CUVA Homepage.dc.html` | Desktop homepage, plus a hidden design appendix (logo system, tokens with ratios, typed metadata components, interactive states, headline serif A/B). |
| `CUVA Match Report.dc.html` | Desktop match report page, plus a hidden appendix (rail on/off comparison, cricket scorecard variant, corrections states, no-photograph empty state, interactive states). |
| `image-slot.js` | Placeholder component used by both prototypes. Not for production. |
| `assets/` | Logo lockups. |

Open either `.dc.html` directly in a browser. The appendices are the specification surface: read them alongside this README.

## Build order suggestion

1. Tokens and typography into the Tailwind theme; delete the failing gold-on-light kicker rules.
2. Shared chrome: utility strip, masthead, nav, footer.
3. Typed metadata components: kicker, byline, score (with the screen-reader sentence).
4. Card taxonomy: lead, feature, standard, compact score row, text-only headline, match-report card, analysis column.
5. Homepage sections in order; Recent Results as one module.
6. Report page: reading column, scorecard (football and cricket), stats table, timeline, standout players, trust components.
7. Newsletter wired to the real provider with server error and submitting states.
8. Mobile breakpoints against real content.
9. Swap in real logos and photography.
