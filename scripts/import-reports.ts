import fs from "fs";
import path from "path";

const raw = fs.readFileSync("/tmp/match-reports.txt", "utf-8");
const lines = raw.split("\n");

// Split into individual reports by finding "MATCH REPORT N" boundaries
interface RawReport {
  num: number;
  lines: string[];
  lineStart: number;
}

const reports: RawReport[] = [];
let current: RawReport | null = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const match = line.match(/^MATCH REPORT\s+(\d+)\s*$/i);
  if (match) {
    if (current) reports.push(current);
    current = { num: parseInt(match[1]), lines: [], lineStart: i };
  } else if (current) {
    current.lines.push(lines[i]);
  }
}
if (current) reports.push(current);

// Date mapping based on contextual clues in the reports
const dateMap: Record<number, string> = {
  1: "2025-08-16",   // PL opener Chelsea vs Crystal Palace
  2: "2025-08-19",   // Luton vs Wigan midweek
  3: "2025-08-23",   // Watford vs Southampton
  4: "2025-08-26",   // Luton vs Barnet EFL Trophy
  5: "2025-09-06",   // MK Dons vs Grimsby
  6: "2025-09-13",   // Arsenal vs Forest
  7: "2025-09-13",   // West Ham vs Spurs
  8: "2025-09-16",   // Spurs vs Villarreal CL
  9: "2025-09-20",   // Lincoln vs Luton
  10: "2025-09-23",  // Lincoln vs Chelsea Carabao Cup
  11: "2025-09-27",  // Brentford vs Man Utd
  12: "2025-09-27",  // Chelsea vs Brighton
  13: "2025-10-04",  // Spurs vs Wolves
  14: "2025-10-01",  // Chelsea vs Benfica CL
  15: "2025-10-01",  // Arsenal vs Olympiacos CL
  16: "2025-10-04",  // Chelsea vs Liverpool
  17: "2025-10-18",  // Brentford vs Man City
  18: "2025-10-18",  // QPR vs Millwall
  19: "2025-10-21",  // West Ham vs Brentford
  20: "2025-10-22",  // Chelsea vs Ajax CL
  21: "2025-10-23",  // Crystal Palace vs AEK Larnaca
  22: "2025-10-25",  // Chelsea vs Sunderland (first), Brentford vs Liverpool (second)
  23: "2025-11-01",  // Arsenal vs Crystal Palace
  24: "2025-10-28",  // Grimsby vs Brentford (first), Forest vs Man Utd (second)
  25: "2025-11-04",  // Watford vs Bristol City
  26: "2025-11-08",  // Spurs vs Man Utd
  27: "2025-11-08",  // West Ham vs Burnley
  28: "2025-11-08",  // Chelsea vs Wolves
  29: "2025-11-22",  // Luton vs Rotherham
  30: "2025-11-22",  // QPR vs Hull City
  31: "2025-11-25",  // Chelsea vs Barcelona CL
  32: "2025-11-29",  // Norwich vs QPR
  33: "2025-11-29",  // Blackburn vs QPR
  34: "2025-12-03",  // West Ham vs Ipswich
  35: "2025-12-06",  // Chelsea vs Arsenal PL
  36: "2025-12-09",  // Chelsea vs Girona CL
  37: "2025-12-13",  // Liverpool vs Man City
  38: "2025-12-13",  // QPR vs Coventry
  39: "2025-12-20",  // Arsenal vs Aston Villa
  40: "2025-12-21",  // Crystal Palace vs Brentford
  41: "2025-12-26",  // Spurs vs Bournemouth Boxing Day
  42: "2025-12-26",  // Burnley vs Arsenal Boxing Day
  43: "2025-12-28",  // Chelsea vs Fulham
  44: "2025-12-29",  // Sunderland vs West Ham
  45: "2026-01-01",  // Man City vs Chelsea New Year
  46: "2026-01-04",  // Luton vs Burton FA Cup
  47: "2026-01-04",  // QPR vs Stoke
  48: "2026-01-11",  // QPR vs Derby
  49: "2026-01-14",  // Chelsea vs PSG CL
  50: "2026-01-18",  // QPR vs Southampton
  51: "2026-01-21",  // Arsenal vs Dinamo Zagreb CL
  52: "2026-01-25",  // Arsenal vs Man City
  53: "2026-01-25",  // Spurs vs Everton
  54: "2026-01-28",  // Brentford vs Chelsea Carabao Cup
  55: "2026-02-01",  // QPR vs Sheffield United
  56: "2026-02-01",  // Arsenal vs Leeds
  57: "2026-02-04",  // Chelsea vs Atletico CL
  58: "2026-02-08",  // Chelsea vs Newcastle
  59: "2026-02-08",  // Burnley vs Liverpool
  60: "2026-02-14",  // Crystal Palace vs Man City
  61: "2026-02-15",  // Arsenal vs Sunderland
  62: "2026-02-18",  // PSG vs Chelsea CL
  63: "2026-02-22",  // Crystal Palace vs Arsenal
  64: "2026-02-22",  // QPR vs Birmingham
  65: "2026-02-25",  // Luton vs Peterborough
  66: "2026-03-01",  // Middlesbrough vs QPR
  67: "2026-03-04",  // Southampton vs QPR
  68: "2026-03-08",  // Chelsea vs Man Utd
  69: "2026-03-11",  // PSG vs Chelsea CL (first leg mentioned in existing article)
};

// Track duplicate report numbers - use second occurrence with adjusted date
const seenNums = new Set<number>();
const dupeDates: Record<string, string> = {};

function getCompetition(text: string): { category: string; subcategory: string } {
  const upper = text.toUpperCase();
  if (upper.includes("PREMIER LEAGUE")) return { category: "football", subcategory: "Premier League" };
  if (upper.includes("CHAMPIONS LEAGUE")) return { category: "football", subcategory: "Champions League" };
  if (upper.includes("EUROPA CONFERENCE")) return { category: "football", subcategory: "Conference League" };
  if (upper.includes("EUROPA LEAGUE")) return { category: "football", subcategory: "Europa League" };
  if (upper.includes("CARABAO CUP")) return { category: "football", subcategory: "Carabao Cup" };
  if (upper.includes("EFL TROPHY")) return { category: "football", subcategory: "EFL Trophy" };
  if (upper.includes("FA CUP")) return { category: "football", subcategory: "FA Cup" };
  if (upper.includes("CHAMPIONSHIP")) return { category: "football", subcategory: "Championship" };
  if (upper.includes("LEAGUE 1") || upper.includes("LEAGUE DIVISION 1")) return { category: "football", subcategory: "League One" };
  if (upper.includes("LEAGUE 2")) return { category: "football", subcategory: "League Two" };
  return { category: "football", subcategory: "" };
}

function extractTeamsAndScore(reportLines: string[]): { homeTeam: string; awayTeam: string; homeGoals: string; awayGoals: string; headline: string } {
  // Find the headline (usually line 2-3, first line that's ALL CAPS and not a venue/lineup)
  let headline = "";
  let homeTeam = "";
  let awayTeam = "";
  let homeGoals = "0";
  let awayGoals = "0";

  // Look for "Full Time" or score line
  for (const line of reportLines) {
    const trimmed = line.trim();
    const ftMatch = trimmed.match(/Full Time\s+(\d+)-(\d+)/i) || trimmed.match(/Full Time\s+.+?\s+(\d+)\s+.+?\s+(\d+)/i);
    if (ftMatch) {
      homeGoals = ftMatch[1];
      awayGoals = ftMatch[2];
    }
    // Look for venue line with "v" to get teams
    const venueMatch = trimmed.match(/(?:LONDON|LUTON|WATFORD|LINCOLN|BLETCHLEY|NOTTINGHAM|CLEETHORPES|NORWICH|BLACKBURN|BURNLEY|SOUTHAMPTON|MIDDLESBROUGH|SHEFFIELD|BIRMINGHAM|PETERBOROUGH|PARIS|MANCHESTER)\s*[-–]\s*.+?\s+(.+?)\s+v\s+(.+?)\s+(?:PREMIER|SKYBET|CHAMPIONS|CARABAO|EFL|FA CUP|EUROPA)/i);
    if (venueMatch && !homeTeam) {
      homeTeam = venueMatch[1].trim();
      awayTeam = venueMatch[2].trim();
    }
  }

  // Get headline - usually line index 1 or 2 (the short punchy ALL CAPS line)
  for (let i = 0; i < Math.min(5, reportLines.length); i++) {
    const t = reportLines[i].trim();
    if (t.length > 10 && t.length < 120 && !t.includes("(") && !t.includes("Yellow") && !t.includes("Red") && !t.includes("Goals") && !t.match(/LONDON|LUTON|WATFORD|LINCOLN|BLETCHLEY|NOTTINGHAM|CLEETHORPES|NORWICH|BLACKBURN|BURNLEY|SOUTHAMPTON|MIDDLESBROUGH|SHEFFIELD|BIRMINGHAM|PETERBOROUGH|PARIS|MANCHESTER/i)) {
      // Check if it looks like a headline
      if (!t.match(/^\d/) && !t.match(/^Half Time/i) && !t.match(/^Full Time/i) && !t.match(/^Crowd/i) && !t.match(/^Referee/i)) {
        headline = t;
        break;
      }
    }
  }

  return { homeTeam, awayTeam, homeGoals, awayGoals, headline };
}

function formatBody(reportLines: string[]): string {
  // Find where the actual match report text begins
  let bodyStart = 0;
  let foundBody = false;

  for (let i = 0; i < reportLines.length; i++) {
    const t = reportLines[i].trim();
    if (t.match(/^(First 45 minutes|Match Report|Second 45 minutes)/i) && !foundBody) {
      bodyStart = i;
      foundBody = true;
      break;
    }
  }

  if (!foundBody) {
    // Try to find start of prose text (first long paragraph)
    for (let i = 3; i < reportLines.length; i++) {
      const t = reportLines[i].trim();
      if (t.length > 100 && !t.match(/^(CHELSEA|ARSENAL|TOTTENHAM|WEST HAM|CRYSTAL|BRENTFORD|MANCHESTER|NOTTINGHAM|WOLVERHAMPTON|QUEENS|QPR|NORWICH|WATFORD|LUTON|LINCOLN|MK DONS|GRIMSBY|BARNET|HULL|MILLWALL|SUNDERLAND|LIVERPOOL|BRIGHTON|BURNLEY|SOUTHAMPTON|MIDDLESBROUGH|SHEFFIELD|BIRMINGHAM|COVENTRY|BLACKBURN|DERBY|STOKE|ASTON|FULHAM|BOURNEMOUTH|OLYMPI|BENFICA|AJAX|BARCELONA|VILLARREAL|AK LARNAC|PSG|GIRONA|DINAMO|ATLETICO|IPSWICH|PETERBOROUGH|ROTHERHAM|BURTON|WIGAN|BRISTOL)\s*\(/)) {
        bodyStart = i;
        foundBody = true;
        break;
      }
    }
  }

  if (!foundBody) bodyStart = 5;

  // Find where body ends (before duplicate scoreline at bottom, or before lineup recap)
  let bodyEnd = reportLines.length;
  for (let i = reportLines.length - 1; i > bodyStart; i--) {
    const t = reportLines[i].trim();
    if (t.match(/^(Half Time|Full Time)/i) && i > bodyStart + 5) {
      // Check if this is the recap at the bottom
      bodyEnd = i;
      break;
    }
  }

  // Extract lineup section (before body)
  const lineupLines: string[] = [];
  for (let i = 0; i < bodyStart; i++) {
    const t = reportLines[i].trim();
    if (t && !t.match(/^MATCH REPORT/i) && !t.match(/^FOOTBALL MATCH/i)) {
      lineupLines.push(t);
    }
  }

  // Extract body paragraphs
  const bodyLines: string[] = [];
  for (let i = bodyStart; i < bodyEnd; i++) {
    const t = reportLines[i].trim();
    if (t) {
      bodyLines.push(t);
    }
  }

  // Build formatted content
  let content = "";

  // Add lineup info as a details section
  if (lineupLines.length > 0) {
    // Get venue line, headline, and team lineups
    const venue = lineupLines[0] || "";
    const hl = lineupLines[1] || "";

    content += `**${venue}**\n\n`;
    if (hl && hl !== venue) content += `## ${hl}\n\n`;

    // Add remaining lineup info
    for (let i = 2; i < lineupLines.length; i++) {
      const l = lineupLines[i];
      if (l.match(/^(CHELSEA|ARSENAL|TOTTENHAM|WEST HAM|CRYSTAL|BRENTFORD|MANCHESTER|NOTTINGHAM|WOLVERHAMPTON|QUEENS|QPR|MK DONS|NORWICH|WATFORD|LUTON|LINCOLN|GRIMSBY|BARNET|HULL|MILLWALL|SUNDERLAND|LIVERPOOL|BRIGHTON|BURNLEY|SOUTHAMPTON|MIDDLESBROUGH|SHEFFIELD|BIRMINGHAM|COVENTRY|BLACKBURN|DERBY|STOKE|ASTON|FULHAM|BOURNEMOUTH|OLYMP|BENFICA|AJAX|BARCELONA|VILLARREAL|AK LARNAC|AEK|PSG|GIRONA|DINAMO|ATLETICO|IPSWICH|PETERBOROUGH|ROTHERHAM|BURTON|WIGAN|BRISTOL|MARINERS|BEES|FOXES|RANGERS)\s*\(/i)) {
        content += `**${l}**\n\n`;
      } else if (l.match(/^(Yellow|Red|Goals|Half Time|Full Time|Crowd|Referee|Subs unused)/i)) {
        content += `${l}\n\n`;
      } else {
        content += `${l}\n\n`;
      }
    }

    content += "---\n\n";
  }

  // Add body
  for (const line of bodyLines) {
    if (line.match(/^(First 45 minutes|Second 45 minutes|Match Report)$/i)) {
      content += `## ${line}\n\n`;
    } else if (line.match(/^Half Time/i) || line.match(/^Full Time/i)) {
      content += `**${line}**\n\n`;
    } else {
      content += `${line}\n\n`;
    }
  }

  return content.trim();
}

const articlesDir = path.join(process.cwd(), "content/articles");

let created = 0;
let skipped = 0;
const dupeCounter: Record<number, number> = {};

for (const report of reports) {
  // Track duplicates
  if (!dupeCounter[report.num]) dupeCounter[report.num] = 0;
  dupeCounter[report.num]++;

  const isDupe = dupeCounter[report.num] > 1;

  const { category, subcategory } = getCompetition(report.lines.join("\n"));
  const { homeTeam, awayTeam, homeGoals, awayGoals, headline } = extractTeamsAndScore(report.lines);

  // Get date
  let date = dateMap[report.num] || "2025-09-01";

  // For duplicate report numbers, add a day to differentiate
  if (isDupe) {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    date = d.toISOString().split("T")[0];
  }

  // Create slug
  const teamSlug = (homeTeam && awayTeam)
    ? `${homeTeam}-${homeGoals}-${awayGoals}-${awayTeam}`
    : `match-report-${report.num}${isDupe ? "-b" : ""}`;

  const slug = teamSlug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const filepath = path.join(articlesDir, `${slug}.mdx`);

  // Skip if file exists
  if (fs.existsSync(filepath)) {
    console.log(`SKIP (exists): ${slug}`);
    skipped++;
    continue;
  }

  // Create title
  const title = headline
    ? headline.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
    : `${homeTeam} ${homeGoals}-${awayGoals} ${awayTeam}`;

  // Build excerpt from first paragraph of body
  let excerpt = "";
  for (const line of report.lines) {
    const t = line.trim();
    if (t.length > 80 && !t.match(/^\(/) && !t.match(/^Yellow/) && !t.match(/^Red/) && !t.match(/^Goals/) && !t.match(/^Half Time/) && !t.match(/^Full Time/) && !t.match(/^Crowd/) && !t.match(/^Referee/) && !t.match(/^Subs/)) {
      excerpt = t.slice(0, 200).replace(/"/g, '\\"');
      if (t.length > 200) excerpt += "...";
      break;
    }
  }

  const body = formatBody(report.lines);

  const tags = [homeTeam, awayTeam, subcategory, "Match Report"].filter(Boolean);

  const mdx = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
subcategory: "${subcategory}"
excerpt: "${excerpt}"
featured: false
tags: ${JSON.stringify(tags)}
author: "William Powell"
---

${body}
`;

  fs.writeFileSync(filepath, mdx);
  console.log(`CREATED: ${slug} (${date})`);
  created++;
}

console.log(`\nDone: ${created} created, ${skipped} skipped`);
