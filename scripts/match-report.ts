import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const homeTeam = process.argv[2];
const awayTeam = process.argv[3];
const score = process.argv[4];

if (!homeTeam || !awayTeam || !score) {
  console.error('Usage: npx tsx scripts/match-report.ts "QPR" "Leicester" "2-1"');
  console.error("       npm run match-report -- QPR Leicester 2-1");
  process.exit(1);
}

// Simple team-to-subcategory lookup
const teamSubcategory: Record<string, string> = {
  arsenal: "Premier League",
  "aston villa": "Premier League",
  bournemouth: "Premier League",
  brentford: "Premier League",
  brighton: "Premier League",
  burnley: "Premier League",
  chelsea: "Champions League",
  "crystal palace": "Premier League",
  everton: "Premier League",
  fulham: "Premier League",
  leeds: "Premier League",
  liverpool: "Premier League",
  "man city": "Premier League",
  "manchester city": "Premier League",
  "man utd": "Premier League",
  "manchester united": "Premier League",
  newcastle: "Premier League",
  "nottingham forest": "Premier League",
  sunderland: "Premier League",
  spurs: "Premier League",
  tottenham: "Premier League",
  "west ham": "Premier League",
  wolves: "Premier League",
  qpr: "Championship",
  leicester: "Championship",
  sheffield: "Championship",
  "sheffield wednesday": "Championship",
  "sheffield united": "Championship",
  coventry: "Championship",
  middlesbrough: "Championship",
  watford: "Championship",
  norwich: "Championship",
  "stoke city": "Championship",
  sunderland_ch: "Championship",
};

const subcategoryFlag = process.argv[5];
const subcategory =
  subcategoryFlag ||
  teamSubcategory[homeTeam.toLowerCase()] ||
  teamSubcategory[awayTeam.toLowerCase()] ||
  "Premier League";

const title = `${homeTeam} ${score} ${awayTeam}: Match Report`;
const slug = `${homeTeam}-${score.replace(/[^0-9]/g, "-")}-${awayTeam}`
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
subcategory: "${subcategory}"
excerpt: "${homeTeam} ${score.split("-")[0]?.trim()}-${score.split("-")[1]?.trim()} ${awayTeam} — match report from [VENUE]."
featured: false
tags: ["${homeTeam}", "${awayTeam}", "${subcategory}", "Match Report"]
author: "William Powell"
---

**${homeTeam} ${score} ${awayTeam}**
${subcategory} | ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} | [VENUE]

---

## First Half

How did the match begin? Who controlled the opening exchanges? Describe the key moments and goals in the first 45 minutes.

## Second Half

What changed after the break? Substitutions, tactical shifts, and the decisive moments.

## Key Moments

- **[TIME]'** — [DESCRIPTION]
- **[TIME]'** — [DESCRIPTION]
- **[TIME]'** — [DESCRIPTION]

## Man of the Match

**[PLAYER NAME]** — Why they stood out.

## What This Means

Where does this result leave both sides in the table? What are the implications for the weeks ahead?
`;

fs.mkdirSync(path.dirname(filepath), { recursive: true });
fs.writeFileSync(filepath, template);
console.log(`\nCreated: content/articles/${filename}\n`);

// Try to open in default editor
try {
  const platform = process.platform;
  if (platform === "darwin") {
    execSync(`open "${filepath}"`);
  } else if (platform === "linux") {
    execSync(`xdg-open "${filepath}"`);
  } else if (platform === "win32") {
    execSync(`start "" "${filepath}"`);
  }
  console.log("Opened in your default editor.\n");
} catch {
  console.log(`Open the file manually: ${filepath}\n`);
}

console.log("Next steps:");
console.log("  1. Fill in the match report sections");
console.log(`  2. git add . && git commit -m "New: ${title}" && git push`);
console.log("  3. Live on cuvasports.com in ~60 seconds\n");
