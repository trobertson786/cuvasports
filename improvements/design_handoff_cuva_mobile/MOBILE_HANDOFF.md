# Claude Code prompt: CUVA Sports mobile implementation

Paste everything below the line into Claude Code, with the three design files attached
or copied into the repo: `CUVA Mobile.dc.html`, `CUVA Mobile Home.dc.html`,
`CUVA Mobile Report.dc.html`.

---

## Task

Implement the mobile behaviour of the existing CUVA Sports homepage and match report
templates, for 320px to 767px. This is not a redesign. The desktop design, tokens,
typography and component set are settled and must not change at 1024px and above.

You have three reference files:

- `CUVA Mobile Home.dc.html` - the mobile homepage, a real page, open it in a browser
  at 390px and 430px
- `CUVA Mobile Report.dc.html` - the mobile match report, same
- `CUVA Mobile.dc.html` - the board: both screens at both widths, the four components
  that change shape shown desktop beside mobile, and the breakpoint spec in section 3

The reference files are static HTML written with inline styles so the design reads
directly from the markup. Do not port them as-is. Read the values out of them and
implement against the existing components as Tailwind breakpoints.

## Breakpoints

| Range | Tailwind | What changes |
| --- | --- | --- |
| 320-389 | base | 16px gutters, otherwise as 390 |
| 390-429 | base | Design target. 20px gutters, h1 32px, body 18px, single column |
| 430-639 | `min-[430px]` | h1 34px only. Extra width goes to the measure |
| 640-767 | `sm` | Gutters 24px. Cricket thumbnails may pair two up. Results stay stacked |
| 768-1023 | `md` | Results table becomes a grid again. Utility strip and full masthead return. Section grids two column. Menu still collapsed |
| 1024-1179 | `lg` | Desktop nav bar, 12 column homepage grid, 32px gutters. Report still single column, no rail |
| 1180+ | `min-[1180px]` | Report rail appears. The inline contents disclosure and the end-of-article share block are removed at the same width, never both present |

## The ten defects and what each fix is

1. **Recent Results** - collapse to stacked rows below `md`. Keep real `<table>` markup
   with `scope` on every header cell; visually hide the `<thead>` (clip, not
   `display:none`); put `data-label` on every `<td>`; set `tr` to
   `flex flex-wrap` with the scoreline at `flex-basis:100%` in IBM Plex Mono at 19px as
   the dominant element, and the report link on its own line as a 44px target. No
   horizontal scroll. **The League Table is the exception and must be left exactly as
   it is** - it is genuinely comparative and already works at 430px.
2. **Identity** - remove `hidden md:block` from the utility strip and masthead. Below
   768px: compact logo lockup at 38px inside a 44px-tall link, the descriptor line, a
   44px search button that expands a field in place, and a Menu button. The navy bar
   below shows Football, Cricket and Results as three equal visible entry points. The
   opened menu repeats every section and carries a search field at its top.
3. **Duplicate CTA on the lead** - delete the CTA inside the image block. One call to
   action per card, and the whole card is the target.
4. **Image-less reports** - do not stretch the branded fallback to 16:9 at full width.
   Use the text-forward card: kicker, headline, date, and the scoreline in mono as the
   visual anchor, right-aligned and vertically centred against the text. Do not invent
   photographs and do not imply one exists.
5. **Stray vertical rule** - suppress `.col-rule` below `lg`.
6. **Credibility block** - text before portrait. Portrait becomes a 132px 3:4 image
   beside a two-column definition list of the three mono figures, so nothing wraps
   ragged.
7. **Section subheads** - `text-wrap: balance` and a 4px stack under the h2 rather than
   a baseline row.
8. **iOS bottom chrome** - footer pads to `calc(28px + env(safe-area-inset-bottom))`.
   The inset returns 0 when the toolbar is hidden, so it must always be additive to
   real padding.
9. **Old card styling** - no rounded corners, no white card fills anywhere on mobile.
   0 radii, 1px rules, 2px and 3px section rules, no shadows. Any surviving rounded
   corner on mobile is a bug.
10. **Headline steps** - report and lead h1 at Playfair Display 700, 32px from 320,
    34px from 430, 44px from 1024. Playfair never goes below 20px.

## Report page specifics

The rail already disappears below 1180px and that behaviour is correct. Two things move
inline and must only exist below 1180px:

- **In this report** - a native `<details>` disclosure, closed by default, sitting
  between the hero figure and the first paragraph. No JavaScript.
- **Share** - a four-item list at the end of the article, after the tags.

The 3px reading progress bar stays fixed to the top of the window at every width.

## Type on mobile

- Body: Source Serif 4, 18px, line-height 1.6. About 38 characters at 390 with 20px
  gutters, 42 at 430.
- Card headlines: Source Serif 4, 17-24px.
- Metadata: Inter, 13px floor. Mono dates 12px. Kickers 11px at 0.12em tracking, which
  is the only sub-13px case and is short uppercase.
- Form inputs: 16px, so iOS does not zoom on focus.

## Targets

44px minimum on the smallest dimension for every target except links inside a sentence.
Utility strip, tags and footer keep 24px between adjacent targets; breadcrumb links use
14px either side of the divider, giving 28px clear. Footer links are 48px full-width
rows separated by a hairline.

## Performance

LCP under 2.5s, INP under 200ms, CLS under 0.1 at p75.

- Every image and fallback slot declares an aspect ratio: 16:9 lead and feature, 3:2
  hero and picture desk, 4:3 thumbnails, 3:4 portrait. Nothing shifts as pictures load.
- The lead photograph is the LCP element on the homepage: the only eager image, with
  `fetchpriority="high"`. Everything below it is lazy.
- No carousels, no scroll-driven animation, no polling. The only interactive JS on
  mobile is the menu toggle, the search toggle and newsletter validation.
- Use `svh` for any full-height treatment. Never `dvh`, never `vh`.

## House rules, non-negotiable

- British English.
- Hyphens only. No em dashes or en dashes anywhere, in UI copy or content, including
  scorelines: `1-0`, never `1–0`.
- Never invent results, quotations, accreditation, sponsors, awards, partnerships,
  subscriber numbers or live-data features. All copy comes from the real site.
- Gold `#D4A843` only on navy. On light surfaces use `#8A6410` or the section colours.
- No meaning carried by colour alone.
- No scrolling tickers, live-score polling, modal newsletter capture or fake urgency.
- Scores: the visual block is `aria-hidden` and paired with a visually hidden sentence,
  for example "Spain 1, Argentina 0, after extra time. Scorer: Torres, 106 minutes."

## Tokens, already fixed, use exactly

```
--cuva-ink       #0B1A2B   editorial ink, body text, brand navy
--cuva-navy-950  #071320   footer
--cuva-navy-800  #14273D   nav, scorecard, buttons
--cuva-navy-600  #1C3550   nav hover
--cuva-link      #23507F   links on light, focus ring
--cuva-newsprint #F9F7F2   page background
--cuva-paper     #FFFFFF   reading and input surface
--cuva-tint      #F3F1EC   section tints, hover fills
--cuva-rule      #D9DEE3   1px divider
--cuva-muted     #5C6672   secondary metadata
--cuva-football  #7A2E1E   football section colour
--cuva-cricket   #1E5741   cricket section colour
--cuva-gold      #D4A843   dark surfaces only
--cuva-gold-ink  #8A6410   light-surface substitute for gold
--cuva-live      #B3261E   red card, corrections, validation only
```

Four type roles, no fifth: Playfair Display 700 for display and headlines, Source Serif
4 for editorial body and card headlines, Inter for nav, metadata, forms and labels, IBM
Plex Mono for scores, times, statistics, dates and source labels.

No new tokens, no new type roles, no new colours.

## Known content issues, not layout problems

- Twelve of eighty-one reports have no photograph. The text-forward card makes that
  degrade honestly, but Football will keep looking thinner than Cricket until there are
  real pictures.
- The logos in the reference files are screenshot PNGs. Replace with `cuva-mark.svg`
  and `cuva-mark-white.svg` before launch; the compact lockup runs at 38px on mobile,
  where a bitmap softens most.
- The MDX source records eleven goalkeeper saves. The prose and both designs say ten.
  Correct the source, do not change the designs.

## Definition of done

- Both templates verified at 320, 360, 390, 430, 640, 768, 1024 and 1180.
- Recent Results readable at 430 with no horizontal scroll and no clipped column.
- Every target audited at 44px on its smallest dimension.
- No rounded corner or card fill below 768px.
- Lighthouse mobile: CLS under 0.1, LCP element is the lead photograph.
- Desktop at 1024 and above pixel-identical to before your change.
