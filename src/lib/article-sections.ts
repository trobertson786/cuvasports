/**
 * Splits an MDX article body into named editorial sections.
 *
 * CUVA's match reports carry their structured data as `##` sections in the
 * body, not as frontmatter - see CLAUDE.md, "Article body structure". The
 * report template needs to place those sections in its own order (the
 * timeline belongs at the turn of the match, not in an appendix), which
 * styling them in place cannot do. So we split here and let the page
 * decide the order.
 *
 * This is deliberately additive and forgiving. Any heading that is not
 * recognised keeps its heading and its body and goes into `rest`, which
 * the template renders in source order. An article with no recognised
 * sections yields `hasStructure: false` and falls back to a single-pass
 * render, unchanged from before. That property is what keeps the other
 * 80-odd articles safe.
 */

export type TimelineKind = "goal" | "red" | "plain";

export interface TimelineEvent {
  minute: string;
  /** Bold lead-in, e.g. "Red card." / "Goal, Spain." Empty for routine events. */
  lead: string;
  text: string;
  kind: TimelineKind;
}

export interface DetailRow {
  label: string;
  value: string;
}

export interface StatRow {
  metric: string;
  home: string;
  away: string;
}

export interface StandoutPlayer {
  name: string;
  note: string;
}

export interface UnmatchedSection {
  heading: string;
  body: string;
}

export interface ArticleSections {
  /** True when at least one section was recognised. */
  hasStructure: boolean;
  /** Prose narrative, as raw MDX. */
  story: string;
  /** Story split into paragraphs, for interleaving the timeline. */
  storyParagraphs: string[];
  details: DetailRow[];
  stats: { home: string; away: string; rows: StatRow[] } | null;
  timeline: TimelineEvent[];
  standout: StandoutPlayer[];
  /** Cricket innings scores, raw MDX (shape varies too much to parse). */
  scores: string;
  /** Unrecognised sections, in source order. Always rendered. */
  rest: UnmatchedSection[];
}

const EMPTY: ArticleSections = {
  hasStructure: false,
  story: "",
  storyParagraphs: [],
  details: [],
  stats: null,
  timeline: [],
  standout: [],
  scores: "",
  rest: [],
};

type SectionKey = "story" | "details" | "stats" | "timeline" | "standout" | "scores";

/**
 * Heading aliases. Matched case-insensitively against the trimmed heading.
 * Patterns cover the variants documented in CLAUDE.md: cricket season
 * reviews use "The Story of the Season So Far", and the standout-players
 * block appears as "Author's Standout Players", "Author's Seaxe Stars"
 * and "Author's Stars of the <period>".
 */
const HEADING_ALIASES: Array<{ key: SectionKey; test: RegExp }> = [
  { key: "details", test: /^(the )?match details$/ },
  { key: "stats", test: /^match (stats?|statistics)\b/ },
  { key: "stats", test: /^key metrics$/ },
  { key: "story", test: /^the story of\b/ },
  { key: "timeline", test: /^timeline\b/ },
  { key: "standout", test: /^author'?s\b/ },
  { key: "scores", test: /^match scores$/ },
];

function classify(heading: string): SectionKey | null {
  const h = heading.trim().toLowerCase();
  for (const { key, test } of HEADING_ALIASES) {
    if (test.test(h)) return key;
  }
  return null;
}

/** Strips markdown bold/italic markers for use in plain-text fields. */
function stripEmphasis(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").trim();
}

/** `- **Competition:** FIFA World Cup 2026, Final` -> { label, value } */
function parseDetails(body: string): DetailRow[] {
  const rows: DetailRow[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*[-*]\s+\*\*(.+?):?\*\*:?\s*(.*)$/);
    if (m) rows.push({ label: stripEmphasis(m[1]), value: stripEmphasis(m[2]) });
  }
  return rows;
}

/**
 * Parses the GFM stats table. The convention is an empty first header cell
 * then the two team names, so the header row gives us the column labels.
 */
function parseStats(body: string): ArticleSections["stats"] {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|"));
  if (lines.length < 3) return null;

  const cells = (line: string) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  const header = cells(lines[0]);
  // lines[1] is the alignment row; skip it.
  const rows: StatRow[] = [];
  for (const line of lines.slice(2)) {
    const c = cells(line);
    if (c.length < 3) continue;
    rows.push({
      metric: stripEmphasis(c[0]),
      home: stripEmphasis(c[1]),
      away: stripEmphasis(c[2]),
    });
  }
  if (!rows.length) return null;

  return {
    home: stripEmphasis(header[1] ?? "Home"),
    away: stripEmphasis(header[2] ?? "Away"),
    rows,
  };
}

/**
 * `- **106'** - **GOAL SPAIN:** Nico Williams heads the ball back...`
 *
 * Decisive moments carry visual weight, so they need to be identified
 * rather than styled uniformly. Detection is on the bold lead-in only,
 * never on the prose, so a paragraph that merely mentions a red card
 * does not get flagged.
 */
function parseTimeline(body: string): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*[-*]\s+\*\*(.+?)\*\*\s*[-–—:]?\s*(.*)$/);
    if (!m) continue;

    const minute = stripEmphasis(m[1]);
    let remainder = m[2].trim();
    let lead = "";
    let kind: TimelineKind = "plain";

    const leadMatch = remainder.match(/^\*\*(.+?):?\*\*:?\s*(.*)$/);
    if (leadMatch) {
      const rawLead = leadMatch[1].trim();
      remainder = leadMatch[2].trim();
      if (/^red card/i.test(rawLead)) {
        kind = "red";
        lead = "Red card.";
      } else if (/^goal/i.test(rawLead)) {
        kind = "goal";
        // "GOAL SPAIN" -> "Goal, Spain."
        const team = rawLead.replace(/^goal\s*/i, "").trim();
        lead = team ? `Goal, ${toTitle(team)}.` : "Goal.";
      } else {
        lead = `${rawLead}.`;
      }
    }

    events.push({ minute, lead, text: remainder, kind });
  }
  return events;
}

function toTitle(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** `- **Ferran Torres (Spain)** - Came off the bench to score...` */
function parseStandout(body: string): StandoutPlayer[] {
  const players: StandoutPlayer[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*[-*]\s+\*\*(.+?)\*\*\s*[-–—:]?\s*(.*)$/);
    if (m) players.push({ name: stripEmphasis(m[1]), note: m[2].trim() });
  }
  return players;
}

/** Splits prose into paragraphs on blank lines, dropping empties. */
function toParagraphs(prose: string): string[] {
  return prose
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function parseArticleSections(content: string): ArticleSections {
  if (!content?.trim()) return EMPTY;

  // Split on level-2 headings, keeping the heading text.
  const parts = content.split(/^##\s+(.+)$/m);
  // parts[0] is anything before the first heading; then [heading, body] pairs.
  const preamble = parts[0]?.trim() ?? "";

  const result: ArticleSections = {
    ...EMPTY,
    details: [],
    timeline: [],
    standout: [],
    rest: [],
    storyParagraphs: [],
  };

  const storyChunks: string[] = [];
  if (preamble) storyChunks.push(preamble);

  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i]?.trim() ?? "";
    const body = parts[i + 1] ?? "";
    const key = classify(heading);

    switch (key) {
      case "story":
        result.hasStructure = true;
        storyChunks.push(body.trim());
        break;
      case "details": {
        const rows = parseDetails(body);
        if (rows.length) {
          result.hasStructure = true;
          result.details.push(...rows);
        } else {
          result.rest.push({ heading, body });
        }
        break;
      }
      case "stats": {
        const stats = parseStats(body);
        if (stats) {
          result.hasStructure = true;
          result.stats = stats;
        } else {
          result.rest.push({ heading, body });
        }
        break;
      }
      case "timeline": {
        const events = parseTimeline(body);
        if (events.length) {
          result.hasStructure = true;
          result.timeline.push(...events);
        } else {
          result.rest.push({ heading, body });
        }
        break;
      }
      case "standout": {
        const players = parseStandout(body);
        if (players.length) {
          result.hasStructure = true;
          result.standout.push(...players);
        } else {
          result.rest.push({ heading, body });
        }
        break;
      }
      case "scores":
        result.hasStructure = true;
        result.scores = body.trim();
        break;
      default:
        // Unrecognised. Keep heading and body, render in source order.
        if (heading || body.trim()) result.rest.push({ heading, body });
    }
  }

  // A preamble on its own is not "structure" - that is just a plain article.
  if (!result.hasStructure) return { ...EMPTY, story: content, storyParagraphs: [] };

  result.story = storyChunks.filter(Boolean).join("\n\n");
  result.storyParagraphs = toParagraphs(result.story);
  return result;
}

/**
 * Where the timeline should interrupt the story.
 *
 * Returns the number of leading paragraphs to render before the timeline.
 * We look for the first paragraph that narrates the decisive event, using
 * the minute from the timeline itself (so "106" finds "after 106 minutes"),
 * and place the timeline immediately before it: the reader gets the shape
 * of the match, then the prose account of how it turned.
 *
 * Falls back to three paragraphs when nothing matches, and never returns a
 * split that would leave the timeline at the very start or very end.
 */
export function timelineSplitIndex(sections: ArticleSections): number {
  const paras = sections.storyParagraphs;
  if (paras.length < 4 || !sections.timeline.length) return paras.length;

  const decisive =
    sections.timeline.find((e) => e.kind === "goal") ??
    sections.timeline.find((e) => e.kind === "red");

  let index = -1;
  if (decisive) {
    // "90+3'" -> "90", "106'" -> "106"
    const minute = decisive.minute.match(/\d+/)?.[0];
    if (minute) {
      index = paras.findIndex((p) => new RegExp(`\\b${minute}\\b`).test(p));
    }
  }

  if (index < 1) index = 3;
  // Keep at least one paragraph on each side of the timeline.
  return Math.min(Math.max(index, 1), paras.length - 1);
}
