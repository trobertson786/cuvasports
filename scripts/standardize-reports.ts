import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");
const GALLERY_COUNT = 54;

// ============================================================
// Team Name Map
// ============================================================
const teamMap: Record<string, { name: string; slug: string }> = {
  chelsea: { name: "Chelsea", slug: "chelsea" },
  arsenal: { name: "Arsenal", slug: "arsenal" },
  "queens-park-rangers": { name: "QPR", slug: "qpr" },
  qpr: { name: "QPR", slug: "qpr" },
  "tottenham-hotspur": { name: "Tottenham Hotspur", slug: "tottenham" },
  tottenham: { name: "Tottenham Hotspur", slug: "tottenham" },
  "manchester-united": { name: "Manchester United", slug: "manchester-united" },
  "manchester-city": { name: "Manchester City", slug: "manchester-city" },
  "west-ham-united": { name: "West Ham United", slug: "west-ham" },
  "west-ham": { name: "West Ham United", slug: "west-ham" },
  "crystal-palace": { name: "Crystal Palace", slug: "crystal-palace" },
  brentford: { name: "Brentford", slug: "brentford" },
  "lincoln-city": { name: "Lincoln City", slug: "lincoln-city" },
  "luton-town": { name: "Luton Town", slug: "luton-town" },
  watford: { name: "Watford", slug: "watford" },
  fulham: { name: "Fulham", slug: "fulham" },
  "nottingham-forest": { name: "Nottingham Forest", slug: "nottingham-forest" },
  "aston-villa": { name: "Aston Villa", slug: "aston-villa" },
  liverpool: { name: "Liverpool", slug: "liverpool" },
  "leeds-united": { name: "Leeds United", slug: "leeds-united" },
  everton: { name: "Everton", slug: "everton" },
  sunderland: { name: "Sunderland", slug: "sunderland" },
  "brighton-hove-albion": { name: "Brighton", slug: "brighton" },
  brighton: { name: "Brighton", slug: "brighton" },
  "wolverhampton-wanderers": { name: "Wolves", slug: "wolves" },
  wolves: { name: "Wolves", slug: "wolves" },
  southampton: { name: "Southampton", slug: "southampton" },
  "peterborough-united": { name: "Peterborough United", slug: "peterborough" },
  peterborough: { name: "Peterborough United", slug: "peterborough" },
  barnsley: { name: "Barnsley", slug: "barnsley" },
  "oxford-united": { name: "Oxford United", slug: "oxford-united" },
  "grimsby-town": { name: "Grimsby Town", slug: "grimsby" },
  grimsby: { name: "Grimsby Town", slug: "grimsby" },
  "blackburn-rovers": { name: "Blackburn Rovers", slug: "blackburn" },
  blackburn: { name: "Blackburn Rovers", slug: "blackburn" },
  middlesbrough: { name: "Middlesbrough", slug: "middlesbrough" },
  "coventry-city": { name: "Coventry City", slug: "coventry" },
  coventry: { name: "Coventry City", slug: "coventry" },
  "hull-city": { name: "Hull City", slug: "hull" },
  hull: { name: "Hull City", slug: "hull" },
  "sheffield-wednesday": { name: "Sheffield Wednesday", slug: "sheffield-wednesday" },
  millwall: { name: "Millwall", slug: "millwall" },
  wrexham: { name: "Wrexham", slug: "wrexham" },
  "charlton-athletic": { name: "Charlton Athletic", slug: "charlton" },
  charlton: { name: "Charlton Athletic", slug: "charlton" },
  "wycombe-wanderers": { name: "Wycombe Wanderers", slug: "wycombe" },
  wycombe: { name: "Wycombe Wanderers", slug: "wycombe" },
  "bradford-city": { name: "Bradford City", slug: "bradford" },
  bradford: { name: "Bradford City", slug: "bradford" },
  "swindon-town": { name: "Swindon Town", slug: "swindon" },
  swindon: { name: "Swindon Town", slug: "swindon" },
  "rotherham-united": { name: "Rotherham United", slug: "rotherham" },
  rotherham: { name: "Rotherham United", slug: "rotherham" },
  "wigan-athletic": { name: "Wigan Athletic", slug: "wigan" },
  wigan: { name: "Wigan Athletic", slug: "wigan" },
  reading: { name: "Reading", slug: "reading" },
  barnet: { name: "Barnet", slug: "barnet" },
  blackpool: { name: "Blackpool", slug: "blackpool" },
  "ipswich-town": { name: "Ipswich Town", slug: "ipswich" },
  ipswich: { name: "Ipswich Town", slug: "ipswich" },
  "bristol-city": { name: "Bristol City", slug: "bristol-city" },
  "exeter-city": { name: "Exeter City", slug: "exeter" },
  exeter: { name: "Exeter City", slug: "exeter" },
  burnley: { name: "Burnley", slug: "burnley" },
  "norwich-city": { name: "Norwich City", slug: "norwich" },
  norwich: { name: "Norwich City", slug: "norwich" },
  "bournemouth": { name: "AFC Bournemouth", slug: "bournemouth" },
  "afc-bournemouth": { name: "AFC Bournemouth", slug: "bournemouth" },
  // European teams
  benfica: { name: "Benfica", slug: "benfica" },
  pafos: { name: "Pafos", slug: "pafos" },
  barcelona: { name: "Barcelona", slug: "barcelona" },
  ajax: { name: "Ajax", slug: "ajax" },
  villarreal: { name: "Villarreal", slug: "villarreal" },
  olympiacos: { name: "Olympiacos", slug: "olympiacos" },
  "kairat-almaty": { name: "Kairat Almaty", slug: "kairat-almaty" },
  kairat: { name: "Kairat Almaty", slug: "kairat-almaty" },
  "aek-larnaca": { name: "AEK Larnaca", slug: "aek-larnaca" },
  "ak-larneca": { name: "AEK Larnaca", slug: "aek-larnaca" },
  // Garbled/alternate names from import
  "north-city": { name: "Norwich City", slug: "norwich" },
  dons: { name: "MK Dons", slug: "mk-dons" },
  "mk-dons": { name: "MK Dons", slug: "mk-dons" },
  "milton-keynes-dons": { name: "MK Dons", slug: "mk-dons" },
  leicester: { name: "Leicester City", slug: "leicester" },
  "leicester-city": { name: "Leicester City", slug: "leicester" },
};

// Map proper team names (from excerpts/body) to our canonical names
const properNameMap: Record<string, { name: string; slug: string }> = {
  CHELSEA: { name: "Chelsea", slug: "chelsea" },
  ARSENAL: { name: "Arsenal", slug: "arsenal" },
  "QUEENS PARK RANGERS": { name: "QPR", slug: "qpr" },
  QPR: { name: "QPR", slug: "qpr" },
  "TOTTENHAM HOTSPUR": { name: "Tottenham Hotspur", slug: "tottenham" },
  "TOTTENHAM HOTSUR": { name: "Tottenham Hotspur", slug: "tottenham" },
  TOTTENHAM: { name: "Tottenham Hotspur", slug: "tottenham" },
  "MANCHESTER UNITED": { name: "Manchester United", slug: "manchester-united" },
  "MANCHESTER CITY": { name: "Manchester City", slug: "manchester-city" },
  "WEST HAM UNITED": { name: "West Ham United", slug: "west-ham" },
  "CRYSTAL PALACE": { name: "Crystal Palace", slug: "crystal-palace" },
  BRENTFORD: { name: "Brentford", slug: "brentford" },
  "LINCOLN CITY": { name: "Lincoln City", slug: "lincoln-city" },
  "LUTON TOWN": { name: "Luton Town", slug: "luton-town" },
  WATFORD: { name: "Watford", slug: "watford" },
  FULHAM: { name: "Fulham", slug: "fulham" },
  "NOTTINGHAM FOREST": { name: "Nottingham Forest", slug: "nottingham-forest" },
  "ASTON VILLA": { name: "Aston Villa", slug: "aston-villa" },
  LIVERPOOL: { name: "Liverpool", slug: "liverpool" },
  "LEEDS UNITED": { name: "Leeds United", slug: "leeds-united" },
  EVERTON: { name: "Everton", slug: "everton" },
  SUNDERLAND: { name: "Sunderland", slug: "sunderland" },
  "BRIGHTON & HOVE ALBION": { name: "Brighton", slug: "brighton" },
  "BRIGHTON HOVE ALBION": { name: "Brighton", slug: "brighton" },
  BRIGHTON: { name: "Brighton", slug: "brighton" },
  "WOLVERHAMPTON WANDERERS": { name: "Wolves", slug: "wolves" },
  WOLVES: { name: "Wolves", slug: "wolves" },
  SOUTHAMPTON: { name: "Southampton", slug: "southampton" },
  "PETERBOROUGH UNITED": { name: "Peterborough United", slug: "peterborough" },
  BARNSLEY: { name: "Barnsley", slug: "barnsley" },
  "OXFORD UNITED": { name: "Oxford United", slug: "oxford-united" },
  "GRIMSBY TOWN": { name: "Grimsby Town", slug: "grimsby" },
  "BLACKBURN ROVERS": { name: "Blackburn Rovers", slug: "blackburn" },
  MIDDLESBROUGH: { name: "Middlesbrough", slug: "middlesbrough" },
  "COVENTRY CITY": { name: "Coventry City", slug: "coventry" },
  "HULL CITY": { name: "Hull City", slug: "hull" },
  "SHEFFIELD WEDNESDAY": { name: "Sheffield Wednesday", slug: "sheffield-wednesday" },
  MILLWALL: { name: "Millwall", slug: "millwall" },
  WREXHAM: { name: "Wrexham", slug: "wrexham" },
  "CHARLTON ATHLETIC": { name: "Charlton Athletic", slug: "charlton" },
  "WYCOMBE WANDERERS": { name: "Wycombe Wanderers", slug: "wycombe" },
  "BRADFORD CITY": { name: "Bradford City", slug: "bradford" },
  "SWINDON TOWN": { name: "Swindon Town", slug: "swindon" },
  "ROTHERHAM UNITED": { name: "Rotherham United", slug: "rotherham" },
  "WIGAN ATHLETIC": { name: "Wigan Athletic", slug: "wigan" },
  READING: { name: "Reading", slug: "reading" },
  BARNET: { name: "Barnet", slug: "barnet" },
  BLACKPOOL: { name: "Blackpool", slug: "blackpool" },
  "IPSWICH TOWN": { name: "Ipswich Town", slug: "ipswich" },
  "BRISTOL CITY": { name: "Bristol City", slug: "bristol-city" },
  "EXETER CITY": { name: "Exeter City", slug: "exeter" },
  BURNLEY: { name: "Burnley", slug: "burnley" },
  "NORWICH CITY": { name: "Norwich City", slug: "norwich" },
  "NORTH CITY": { name: "Norwich City", slug: "norwich" },
  "AFC BOURNEMOUTH": { name: "AFC Bournemouth", slug: "bournemouth" },
  BOURNEMOUTH: { name: "AFC Bournemouth", slug: "bournemouth" },
  "MK DONS": { name: "MK Dons", slug: "mk-dons" },
  "MILTON KEYNES DONS": { name: "MK Dons", slug: "mk-dons" },
  BENFICA: { name: "Benfica", slug: "benfica" },
  PAFOS: { name: "Pafos", slug: "pafos" },
  BARCELONA: { name: "Barcelona", slug: "barcelona" },
  AJAX: { name: "Ajax", slug: "ajax" },
  VILLARREAL: { name: "Villarreal", slug: "villarreal" },
  OLYMPIACOS: { name: "Olympiacos", slug: "olympiacos" },
  "KAIRAT ALMATY": { name: "Kairat Almaty", slug: "kairat-almaty" },
  "AEK LARNACA": { name: "AEK Larnaca", slug: "aek-larnaca" },
  "AK LARNECA": { name: "AEK Larnaca", slug: "aek-larnaca" },
  "LEICESTER CITY": { name: "Leicester City", slug: "leicester" },
  LEICESTER: { name: "Leicester City", slug: "leicester" },
};

// Venue map: home team slug -> venue name
const venueMap: Record<string, string> = {
  chelsea: "Stamford Bridge",
  arsenal: "Emirates Stadium",
  tottenham: "Tottenham Hotspur Stadium",
  "west-ham": "London Stadium",
  "crystal-palace": "Selhurst Park",
  brentford: "Gtech Community Stadium",
  fulham: "Craven Cottage",
  "luton-town": "Kenilworth Road",
  watford: "Vicarage Road",
  "lincoln-city": "LNER Stadium",
  "nottingham-forest": "City Ground",
  "mk-dons": "Stadium MK",
  grimsby: "Blundell Park",
  qpr: "Loftus Road",
  charlton: "The Valley",
  peterborough: "Weston Homes Stadium",
  norwich: "Carrow Road",
  leicester: "King Power Stadium",
  "oxford-united": "Kassam Stadium",
  blackburn: "Ewood Park",
  middlesbrough: "Riverside Stadium",
  coventry: "Coventry Building Society Arena",
  hull: "MKM Stadium",
  "sheffield-wednesday": "Hillsborough",
  millwall: "The Den",
  wrexham: "STōK Cae Ras",
  liverpool: "Anfield",
  "manchester-united": "Old Trafford",
  "manchester-city": "Etihad Stadium",
  "aston-villa": "Villa Park",
  "leeds-united": "Elland Road",
  everton: "Goodison Park",
  sunderland: "Stadium of Light",
  brighton: "Amex Stadium",
  wolves: "Molineux",
  southampton: "St Mary's Stadium",
  barnsley: "Oakwell",
  wycombe: "Adams Park",
  bradford: "Valley Parade",
  swindon: "County Ground",
  rotherham: "New York Stadium",
  wigan: "Brick Community Stadium",
  reading: "Select Car Leasing Stadium",
  barnet: "The Hive",
  blackpool: "Bloomfield Road",
  ipswich: "Portman Road",
  "bristol-city": "Ashton Gate",
  exeter: "St James Park",
  burnley: "Turf Moor",
  bournemouth: "Vitality Stadium",
  benfica: "Estádio da Luz",
  pafos: "Stelios Kyriakides Stadium",
  barcelona: "Camp Nou",
  ajax: "Johan Cruyff Arena",
  villarreal: "Estadio de la Cerámica",
  olympiacos: "Karaiskakis Stadium",
  "kairat-almaty": "Almaty Central Stadium",
  "aek-larnaca": "AEK Arena",
};

// ============================================================
// Stadium prefixes to strip from filenames (longest first)
// ============================================================
const stadiumPrefixes = [
  "homes-stadium-london-road-",
  "stadium-sincil-bank-",
  "loftus-road-stadium-",
  "community-stadium-",
  "hotspur-stadium-",
  "loftus-road-",
  "stadium-",
  "bridge-",
  "cottage-",
  "ground-",
  "valley-",
  "keynes-",
  "park-",
  "road-",
];

// ============================================================
// Helpers
// ============================================================

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getImageForSlug(slug: string): string {
  const idx = hashSlug(slug) % GALLERY_COUNT;
  return `/images/gallery/cuva-sports-${String(idx + 1).padStart(3, "0")}.jpg`;
}

function toTitleCase(str: string): string {
  const lowerWords = new Set([
    "a", "an", "the", "and", "but", "or", "for", "nor", "on",
    "at", "to", "from", "by", "in", "of", "with", "vs",
  ]);
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => {
      if (i === 0 || !lowerWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

function fixTypos(str: string): string {
  return str
    .replace(/\bLasp\b/gi, "Last")
    .replace(/\bThash\b/gi, "Thrash")
    .replace(/\bAfer\b/gi, "After")
    .replace(/\bAnoher\b/gi, "Another")
    .replace(/\bHOTSUR\b/gi, "HOTSPUR")
    .replace(/\bPREMOER\b/gi, "PREMIER")
    .replace(/\bCHAMPIOSHIP\b/gi, "CHAMPIONSHIP");
}

function detectCompetition(text: string): string | null {
  const upper = text.toUpperCase();
  if (upper.includes("CHAMPIONS LEAGUE")) return "Champions League";
  if (upper.includes("CONFERENCE LEAGUE")) return "Conference League";
  if (upper.includes("EUROPA LEAGUE")) return "Europa League";
  if (upper.includes("CARABAO CUP") || upper.includes("EFL CUP")) return "Carabao Cup";
  if (upper.includes("EFL TROPHY")) return "EFL Trophy";
  if (upper.includes("FA CUP") || upper.includes("EMIRATES FA")) return "FA Cup";
  if (upper.includes("PREMIER LEAGUE") || upper.includes("PREMOER LEAGUE")) return "Premier League";
  if (upper.includes("CHAMPIONSHIP") || upper.includes("CHAMPIOSHIP")) return "Championship";
  if (/LEAGUE\s*(1|ONE)\b/.test(upper) || upper.includes("LEAGUE DIVISION 1")) return "League One";
  if (/LEAGUE\s*(2|TWO)\b/.test(upper)) return "League Two";
  return null;
}

function resolveTeamSlug(slug: string): { name: string; slug: string } | null {
  // Direct lookup
  if (teamMap[slug]) return teamMap[slug];

  // Try removing common suffixes
  const withoutSuffixes = slug
    .replace(/-emirates$/, "")
    .replace(/-championship.*$/, "")
    .replace(/-match-report.*$/, "")
    .replace(/-premier.*$/, "")
    .replace(/-skybet.*$/, "");

  if (teamMap[withoutSuffixes]) return teamMap[withoutSuffixes];

  return null;
}

function resolveProperName(name: string): { name: string; slug: string } | null {
  const upper = name.trim().toUpperCase();
  if (properNameMap[upper]) return properNameMap[upper];

  // Try partial matches
  for (const [key, val] of Object.entries(properNameMap)) {
    if (upper.includes(key) || key.includes(upper)) return val;
  }
  return null;
}

// ============================================================
// Extract teams from excerpt dateline
// ============================================================
function extractTeamsFromExcerpt(excerpt: string): {
  home: { name: string; slug: string } | null;
  away: { name: string; slug: string } | null;
  competition: string | null;
} {
  const upper = excerpt.toUpperCase();

  // Pattern: "... HOMETEAM v AWAYTEAM ..."
  const vMatch = upper.match(/([A-Z\s&']+?)\s+v\s+([A-Z\s&']+?)(?:\s+(?:PREMIER|SKYBET|CHAMPIONS|CARABAO|EFL|FA CUP|EMIRATES|WILL POWELL|CONFERENCE|EUROPA))/);

  let home: { name: string; slug: string } | null = null;
  let away: { name: string; slug: string } | null = null;

  if (vMatch) {
    // Clean up team names - remove stadium/venue prefixes
    let homeRaw = vMatch[1].trim();
    let awayRaw = vMatch[2].trim();

    // Remove venue info that might be prepended
    // The venue is between the dash and team name
    const venueStadiums = [
      "STAMFORD BRIDGE", "LONDON STADIUM", "EMIRATES STADIUM", "TOTTENHAM HOTSPUR STADIUM",
      "GTECH COMMUNITY STADIUM", "CRAVEN COTTAGE", "KENILWORTH ROAD", "VICARAGE ROAD",
      "LNER STADIUM", "CITY GROUND", "STADIUM MK", "LOFTUS ROAD", "THE VALLEY",
      "SELHURST PARK", "KASSAM STADIUM", "BLUNDELL PARK", "CARROW ROAD",
      "WESTON HOMES LONDON ROAD STADIUM", "WESTON HOMES STADIUM", "WEST HOMES STADIUM LONDON ROAD",
      "WEST HOMES LONDON ROAD STADIUM", "SINCIL BANK", "KING POWER STADIUM",
      "EWOOD PARK", "RIVERSIDE STADIUM", "KASSAM STADIUM", "THE DEN",
      "GTECH COMMUNITY STADIUM", "LONDON ROAD STADIUM", "LONDON ROAD",
    ];
    for (const stadium of venueStadiums) {
      if (homeRaw.startsWith(stadium + " ")) {
        homeRaw = homeRaw.slice(stadium.length).trim();
      }
    }

    home = resolveProperName(homeRaw);
    away = resolveProperName(awayRaw);
  }

  const competition = detectCompetition(upper);

  return { home, away, competition };
}

// ============================================================
// Extract teams from "Capital Football" style body
// Pattern: TeamA (HT) FT  scorers...
// ============================================================
function extractFromCapitalFootballFormat(content: string): {
  home: { name: string; slug: string } | null;
  away: { name: string; slug: string } | null;
  homeScore: number | null;
  awayScore: number | null;
} {
  // Look for pattern like: "West Ham United (3) 3" or "Queens Park Rangers (1) 2"
  const lines = content.split("\n");
  let home: { name: string; slug: string } | null = null;
  let away: { name: string; slug: string } | null = null;
  let homeScore: number | null = null;
  let awayScore: number | null = null;

  for (let i = 0; i < Math.min(30, lines.length); i++) {
    const line = lines[i].replace(/\*\*/g, "").trim();
    const scoreLineMatch = line.match(/^([A-Za-z\s&']+?)\s*\((\d+)\)\s*(\d+)/);
    if (scoreLineMatch) {
      const teamName = scoreLineMatch[1].trim();
      const ftScore = parseInt(scoreLineMatch[3]);
      const resolved = resolveProperName(teamName);
      if (resolved) {
        if (!home) {
          home = resolved;
          homeScore = ftScore;
        } else if (!away) {
          away = resolved;
          awayScore = ftScore;
        }
      }
    }
  }

  return { home, away, homeScore, awayScore };
}

// ============================================================
// Parse raw match stats from body
// ============================================================
interface MatchStats {
  homeGoals: string[];
  awayGoals: string[];
  homeYellows: string[];
  awayYellows: string[];
  homeReds: string[];
  awayReds: string[];
  halfTimeHome: number | null;
  halfTimeAway: number | null;
  fullTimeHome: number | null;
  fullTimeAway: number | null;
  crowd: string | null;
  referee: string | null;
}

function parseMatchStats(content: string, homeTeamName: string, awayTeamName: string): MatchStats {
  const lines = content.split("\n");
  const stats: MatchStats = {
    homeGoals: [],
    awayGoals: [],
    homeYellows: [],
    awayYellows: [],
    homeReds: [],
    awayReds: [],
    halfTimeHome: null,
    halfTimeAway: null,
    fullTimeHome: null,
    fullTimeAway: null,
    crowd: null,
    referee: null,
  };

  let currentTeam: "home" | "away" | null = null;

  for (const line of lines) {
    const trimmed = line.replace(/\*\*/g, "").trim();

    // Detect which team section we're in based on lineup patterns
    const lineupMatch = trimmed.match(/^([A-Z][A-Z\s&']+?)\s*\(\d+-\d+-\d+/);
    if (lineupMatch) {
      const teamName = lineupMatch[1].trim();
      const resolved = resolveProperName(teamName);
      if (resolved) {
        if (resolved.slug === (resolveProperName(homeTeamName)?.slug || "___home")) {
          currentTeam = "home";
        } else {
          currentTeam = "away";
        }
      } else if (!currentTeam) {
        currentTeam = "home";
      } else if (currentTeam === "home") {
        currentTeam = "away";
      }
    }

    // Parse Goals line
    const goalsMatch = trimmed.match(/^Goals?\s*\((\d+)\)\s*(.*)/i);
    if (goalsMatch) {
      const goalCount = parseInt(goalsMatch[1]);
      if (goalCount > 0 && goalsMatch[2]) {
        const goalEntries = parseGoalEntries(goalsMatch[2]);
        if (currentTeam === "home") stats.homeGoals = goalEntries;
        else if (currentTeam === "away") stats.awayGoals = goalEntries;
      }
    }

    // Parse Yellow cards
    const yellowMatch = trimmed.match(/^Yellow\s*\((\d+)\)\s*(.*)/i);
    if (yellowMatch) {
      const count = parseInt(yellowMatch[1]);
      if (count > 0 && yellowMatch[2]) {
        const entries = parseCardEntries(yellowMatch[2]);
        if (currentTeam === "home") stats.homeYellows = entries;
        else if (currentTeam === "away") stats.awayYellows = entries;
      }
    }

    // Parse Red cards
    const redMatch = trimmed.match(/^Red\s*\((\d+)\)\s*(.*)/i);
    if (redMatch) {
      const count = parseInt(redMatch[1]);
      if (count > 0 && redMatch[2]) {
        const entries = parseCardEntries(redMatch[2]);
        if (currentTeam === "home") stats.homeReds = entries;
        else if (currentTeam === "away") stats.awayReds = entries;
      }
    }

    // Parse Half Time
    const htMatch = trimmed.match(/^Half Time\s+(\d+)-(\d+)/i);
    if (htMatch) {
      stats.halfTimeHome = parseInt(htMatch[1]);
      stats.halfTimeAway = parseInt(htMatch[2]);
    }

    // Parse Full Time
    const ftMatch = trimmed.match(/^Full Time\s+(\d+)-(\d+)/i);
    if (ftMatch) {
      stats.fullTimeHome = parseInt(ftMatch[1]);
      stats.fullTimeAway = parseInt(ftMatch[2]);
    }

    // Parse Crowd
    const crowdMatch = trimmed.match(/^Crowd\s+([\d,]+)/i);
    if (crowdMatch) {
      stats.crowd = crowdMatch[1];
    }

    // Parse Referee
    const refMatch = trimmed.match(/^Referee\s+(.+?)(?:\s+4th|$)/i);
    if (refMatch) {
      stats.referee = refMatch[1].trim();
    }
  }

  return stats;
}

function parseGoalEntries(raw: string): string[] {
  // Pattern: "1-1 (84, Tel) 2-1 (90+1, Richarlison)"
  const entries: string[] = [];
  const regex = /\d+-\d+\s*\((\d+(?:\+\d+)?),\s*([^)]+)\)/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    entries.push(`${m[2].trim()} ${m[1]}'`);
  }
  // Also try simpler format: "(84, Tel)"
  if (entries.length === 0) {
    const simpleRegex = /\((\d+(?:\+\d+)?),\s*([^)]+)\)/g;
    while ((m = simpleRegex.exec(raw)) !== null) {
      entries.push(`${m[2].trim()} ${m[1]}'`);
    }
  }
  return entries;
}

function parseCardEntries(raw: string): string[] {
  // Pattern: "29, Johnson 34, Romero 75, Paulinho 90+2, Richarlison"
  const entries: string[] = [];
  const regex = /(\d+(?:\+\d+)?),\s*([A-Za-z\s'-]+?)(?=\s+\d|$)/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    entries.push(`${m[2].trim()} ${m[1]}'`);
  }
  return entries;
}

function buildStatsTable(
  stats: MatchStats,
  homeName: string,
  awayName: string,
): string {
  const homeGoals = stats.homeGoals.length > 0 ? stats.homeGoals.join(", ") : "—";
  const awayGoals = stats.awayGoals.length > 0 ? stats.awayGoals.join(", ") : "—";
  const homeYellows = stats.homeYellows.length > 0 ? stats.homeYellows.join(", ") : "—";
  const awayYellows = stats.awayYellows.length > 0 ? stats.awayYellows.join(", ") : "—";
  const homeReds = stats.homeReds.length > 0 ? stats.homeReds.join(", ") : "—";
  const awayReds = stats.awayReds.length > 0 ? stats.awayReds.join(", ") : "—";

  let table = `| | ${homeName} | ${awayName} |\n`;
  table += `|---|---|---|\n`;

  if (stats.fullTimeHome !== null && stats.fullTimeAway !== null) {
    table += `| **Score** | ${stats.fullTimeHome} | ${stats.fullTimeAway} |\n`;
  }
  if (stats.halfTimeHome !== null && stats.halfTimeAway !== null) {
    table += `| **Half Time** | ${stats.halfTimeHome} | ${stats.halfTimeAway} |\n`;
  }
  table += `| **Goalscorers** | ${homeGoals} | ${awayGoals} |\n`;
  table += `| **Yellow Cards** | ${homeYellows} | ${awayYellows} |\n`;
  table += `| **Red Cards** | ${homeReds} | ${awayReds} |\n`;
  if (stats.crowd) {
    table += `| **Attendance** | ${stats.crowd} | |\n`;
  }
  if (stats.referee) {
    table += `| **Referee** | ${stats.referee} | |\n`;
  }

  return table;
}

// ============================================================
// Clean body content
// ============================================================
function cleanBody(content: string): { cleaned: string; statsRemoved: boolean } {
  let lines = content.split("\n");
  let statsRemoved = false;

  // Remove HYPERLINK junk
  lines = lines.map((line) =>
    line.replace(/HYPERLINK\s+"[^"]*"/g, "").replace(/\s{2,}/g, " ")
  );

  // Find and remove the raw stats block (between first lineup and "## Match Report")
  // The stats block contains: team lineup, Yellow, Red, Goals, Half Time, Full Time, Crowd, Referee
  let statsStart = -1;
  let statsEnd = -1;
  let matchReportHeaderIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].replace(/\*\*/g, "").trim();

    // Find "## Match Report" header
    if (trimmed.match(/^##\s*Match Report/i)) {
      matchReportHeaderIdx = i;
    }

    // Stats block starts at first lineup after the dateline header
    if (
      statsStart === -1 &&
      trimmed.match(/^[A-Z][A-Z\s&']+\s*\(\d+-\d+-\d+/) &&
      !trimmed.startsWith("##")
    ) {
      statsStart = i;
    }
  }

  // Stats block ends at the "---" or "## Match Report" before the prose
  if (statsStart >= 0) {
    for (let i = statsStart + 1; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed === "---" && i > statsStart + 3) {
        statsEnd = i;
        break;
      }
      if (trimmed.match(/^##\s*Match Report/i) && i > statsStart + 3) {
        statsEnd = i;
        break;
      }
    }
  }

  if (statsStart >= 0 && statsEnd >= 0) {
    // Remove lines from statsStart to statsEnd (exclusive of the Match Report header)
    const before = lines.slice(0, statsStart);
    const after = lines.slice(statsEnd);
    lines = [...before, ...after];
    statsRemoved = true;
  }

  // Remove the dateline bold line at the very start (first non-empty line after frontmatter)
  // Pattern: **CITY – STADIUM TEAM v TEAM COMPETITION WILL POWELL...**
  let firstContentIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      firstContentIdx = i;
      break;
    }
  }
  if (firstContentIdx >= 0) {
    const firstLine = lines[firstContentIdx].replace(/\*\*/g, "").trim();
    if (
      firstLine.match(/WILL POWELL/i) ||
      firstLine.match(/FOR CUVA SPORTS/i) ||
      firstLine.match(/FOR CAPITAL FOOTBALL/i) ||
      firstLine.match(/^CAPITAL FOOTBALL$/i) ||
      firstLine.match(/^CAPITAL SPORT$/i)
    ) {
      lines[firstContentIdx] = "";
    }
  }

  // Remove ALL-CAPS duplicate headline (## ALL CAPS HEADLINE)
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const trimmed = lines[i].trim();
    if (trimmed.match(/^##\s+[A-Z\s'–-]{10,}$/)) {
      lines[i] = "";
    }
  }

  // Remove duplicate content at the bottom (after the main Match Report section)
  // Many files have the report duplicated below with a different headline
  // Detect by finding a second occurrence of the main opening sentence
  const bodyLines = lines.join("\n");
  const matchReportMatch = bodyLines.match(/## Match Report\n+([A-Z][A-Z\s]+\w+)/);
  if (matchReportMatch) {
    const firstSentenceStart = matchReportMatch[1].slice(0, 40);
    const firstOccurrence = bodyLines.indexOf(firstSentenceStart);
    const secondOccurrence = bodyLines.indexOf(
      firstSentenceStart,
      firstOccurrence + firstSentenceStart.length + 100
    );
    if (secondOccurrence > firstOccurrence && secondOccurrence > bodyLines.length * 0.5) {
      // Truncate at the second occurrence
      const truncatedBody = bodyLines.slice(0, secondOccurrence).trimEnd();
      lines = truncatedBody.split("\n");
    }
  }

  // Remove trailing bold "Half Time" and "Full Time" recap lines
  while (lines.length > 0) {
    const lastLine = lines[lines.length - 1].trim();
    if (
      lastLine.match(/^\*\*(?:Half Time|Full Time|Extra Time)/i) ||
      lastLine === "" ||
      lastLine.match(/^LONDON\s/i) ||
      lastLine.match(/^WILL POWELL/i) ||
      lastLine.match(/FOR CUVA SPORTS/i) ||
      lastLine.match(/FOR CAPITAL FOOTBALL/i)
    ) {
      lines.pop();
    } else {
      break;
    }
  }

  return { cleaned: lines.join("\n").replace(/\n{4,}/g, "\n\n\n").trim(), statsRemoved };
}

// ============================================================
// Fix tags
// ============================================================
function fixTags(
  tags: string[],
  homeName: string,
  awayName: string,
  competition: string,
): string[] {
  // Build clean tag set
  const cleanTags = new Set<string>();
  cleanTags.add(homeName);
  cleanTags.add(awayName);
  cleanTags.add(competition);
  cleanTags.add("Match Report");

  // Add any non-stadium tags from original
  const stadiumWords = new Set([
    "BRIDGE", "STADIUM", "ROAD", "COTTAGE", "PARK", "GROUND", "VALLEY",
    "HOMES", "LONDON", "KEYNES", "SINCIL", "BANK", "LOFTUS", "COMMUNITY",
    "HOTSPUR", "EMIRATES",
  ]);

  for (const tag of tags) {
    const words = tag.toUpperCase().split(/\s+/);
    const isStadiumTag = words.some((w) => stadiumWords.has(w));
    if (!isStadiumTag && tag !== "Match Report" && tag !== competition) {
      // Clean to Title Case
      const cleaned = toTitleCase(tag);
      // Check if it's a team name we recognize
      const resolved = resolveProperName(tag);
      if (resolved) {
        cleanTags.add(resolved.name);
      } else if (cleaned.length > 2) {
        cleanTags.add(cleaned);
      }
    }
  }

  return Array.from(cleanTags).filter(Boolean);
}

// ============================================================
// Main processing
// ============================================================

function isMatchReport(content: string, data: Record<string, unknown>): boolean {
  if (data.category === "cricket" || data.category === "analysis") return false;

  // Check for match report indicators in body
  const hasFormation = /\(\d+-\d+-\d+-?\d?\)/.test(content);
  const hasHalfTime = /Half Time\s+\d+-\d+/i.test(content);
  const hasFullTime = /Full Time\s+\d+-\d+/i.test(content);
  const hasGoalsLine = /Goals?\s*\(\d+\)/i.test(content);
  const hasMatchReportTag =
    Array.isArray(data.tags) && data.tags.includes("Match Report");

  // Preview articles don't have lineups/stats
  if (!hasFormation && !hasHalfTime && !hasFullTime && !hasGoalsLine) return false;

  return true;
}

function processFile(filename: string): {
  newFilename: string | null;
  processed: boolean;
} {
  const filepath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  if (!isMatchReport(content, data)) {
    console.log(`SKIP (not match report): ${filename}`);
    return { newFilename: null, processed: false };
  }

  // A1: Detect competition from excerpt + body
  const excerptCompetition = detectCompetition(data.excerpt || "");
  const bodyCompetition = detectCompetition(content);
  const competition = excerptCompetition || bodyCompetition || data.subcategory || "Unknown";

  // A2: Extract teams and score
  let homeName = "";
  let awayName = "";
  let homeSlug = "";
  let awaySlug = "";
  let homeScore: number | null = null;
  let awayScore: number | null = null;

  // Method 1: Parse from filename
  const basename = filename.replace(/\.mdx$/, "");

  // Check if it's a match-report-N file
  const isGenericName = basename.match(/^match-report-\d+(-b)?$/);

  if (!isGenericName) {
    // Strip stadium prefix
    let stripped = basename;
    for (const prefix of stadiumPrefixes) {
      if (stripped.startsWith(prefix)) {
        stripped = stripped.slice(prefix.length);
        break;
      }
    }

    // Strip -emirates suffix
    stripped = stripped.replace(/-emirates$/, "");
    // Strip -championship-match-report suffix
    stripped = stripped.replace(/-championship-match-report$/, "");

    // Try to find score pattern
    const scoreMatch = stripped.match(/^(.+?)-(\d+)-(\d+)-(.+)$/);
    if (scoreMatch) {
      const homeSlugRaw = scoreMatch[1];
      homeScore = parseInt(scoreMatch[2]);
      awayScore = parseInt(scoreMatch[3]);
      const awaySlugRaw = scoreMatch[4];

      const homeTeam = resolveTeamSlug(homeSlugRaw);
      const awayTeam = resolveTeamSlug(awaySlugRaw);

      if (homeTeam) {
        homeName = homeTeam.name;
        homeSlug = homeTeam.slug;
      }
      if (awayTeam) {
        awayName = awayTeam.name;
        awaySlug = awayTeam.slug;
      }
    }
  }

  // Method 2: Parse from excerpt dateline
  if (!homeName || !awayName) {
    const excerptResult = extractTeamsFromExcerpt(data.excerpt || "");
    if (excerptResult.home && !homeName) {
      homeName = excerptResult.home.name;
      homeSlug = excerptResult.home.slug;
    }
    if (excerptResult.away && !awayName) {
      awayName = excerptResult.away.name;
      awaySlug = excerptResult.away.slug;
    }
  }

  // Method 3: Parse from Capital Football body format
  if (!homeName || !awayName) {
    const cfResult = extractFromCapitalFootballFormat(content);
    if (cfResult.home && !homeName) {
      homeName = cfResult.home.name;
      homeSlug = cfResult.home.slug;
    }
    if (cfResult.away && !awayName) {
      awayName = cfResult.away.name;
      awaySlug = cfResult.away.slug;
    }
    if (cfResult.homeScore !== null && homeScore === null) homeScore = cfResult.homeScore;
    if (cfResult.awayScore !== null && awayScore === null) awayScore = cfResult.awayScore;
  }

  // Method 4: Parse Full Time from body for scores
  const ftMatch = content.match(/Full Time\s+(\d+)-(\d+)/i);
  if (ftMatch) {
    if (homeScore === null) homeScore = parseInt(ftMatch[1]);
    if (awayScore === null) awayScore = parseInt(ftMatch[2]);
  }

  // Fallback: try to extract from body lineup
  if (!homeName || !awayName) {
    const lineupRegex = /^(?:\*\*)?([A-Z][A-Z\s&']+?)\s*\(\d+-\d+-\d+/gm;
    const lineupMatches = [...content.matchAll(lineupRegex)];
    if (lineupMatches.length >= 2) {
      if (!homeName) {
        const resolved = resolveProperName(lineupMatches[0][1].trim());
        if (resolved) {
          homeName = resolved.name;
          homeSlug = resolved.slug;
        }
      }
      if (!awayName) {
        const resolved = resolveProperName(lineupMatches[1][1].trim());
        if (resolved) {
          awayName = resolved.name;
          awaySlug = resolved.slug;
        }
      }
    }
  }

  if (!homeName || !awayName) {
    console.log(`WARN: Could not identify teams for ${filename}`);
    console.log(`  homeName=${homeName}, awayName=${awayName}`);
    return { newFilename: null, processed: false };
  }

  // Get venue
  const venue = venueMap[homeSlug] || "";

  // A7: Parse stats and build table
  const stats = parseMatchStats(content, homeName, awayName);

  // Use parsed scores if we didn't get them from filename
  if (homeScore === null && stats.fullTimeHome !== null) homeScore = stats.fullTimeHome;
  if (awayScore === null && stats.fullTimeAway !== null) awayScore = stats.fullTimeAway;

  // Default scores to 0 if still null
  if (homeScore === null) homeScore = 0;
  if (awayScore === null) awayScore = 0;

  const statsTable = buildStatsTable(stats, homeName, awayName);

  // A4: Fix excerpt
  let matchReportBody = "";
  const mrMatch = content.match(/## Match Report\n+([^\n]+)/i);
  if (mrMatch) {
    matchReportBody = mrMatch[1].replace(/\*\*/g, "").trim();
  }

  let newExcerpt = "";
  if (matchReportBody) {
    const firstSentence = matchReportBody.split(/\.\s/)[0] + ".";
    newExcerpt = `${homeName} ${homeScore}-${awayScore} ${awayName} — ${firstSentence}`;
  } else {
    // Fallback: first long paragraph
    const bodyLines = content.split("\n");
    for (const line of bodyLines) {
      const t = line.replace(/\*\*/g, "").trim();
      if (t.length > 80 && !t.match(/^(Yellow|Red|Goals|Half Time|Full Time|Crowd|Referee|Subs)/i) && !t.match(/^\(/)) {
        const firstSentence = t.split(/\.\s/)[0] + ".";
        newExcerpt = `${homeName} ${homeScore}-${awayScore} ${awayName} — ${firstSentence}`;
        break;
      }
    }
  }
  if (newExcerpt.length > 200) {
    newExcerpt = newExcerpt.slice(0, 197) + "...";
  }
  if (!newExcerpt) {
    newExcerpt = `${homeName} ${homeScore}-${awayScore} ${awayName} match report.`;
  }

  // A3: Fix title
  let newTitle = (data.title as string) || "";

  // Fix typos first
  newTitle = fixTypos(newTitle);

  // Remove dateline content from title
  if (
    newTitle.toUpperCase().includes("KASSAM STADIUM") ||
    newTitle.toUpperCase().includes("KING POWER") ||
    newTitle.toUpperCase().includes("CAPITAL FOOTBALL") ||
    newTitle.toUpperCase().includes("CAPITAL SPORT") ||
    newTitle.toUpperCase().includes("WILL POWELL")
  ) {
    // Use the headline from the body instead
    const headlineMatch = content.match(/^##\s+(.+)/m);
    if (headlineMatch) {
      newTitle = fixTypos(headlineMatch[1].trim());
    }
  }

  // Convert ALL-CAPS to Title Case
  if (newTitle === newTitle.toUpperCase() && newTitle.length > 5) {
    newTitle = toTitleCase(newTitle);
  }

  // Replace em dashes with colons
  newTitle = newTitle.replace(/\s*—\s*/g, ": ");

  // Prepend score if not already present
  const scorePrefix = `${homeName} ${homeScore}-${awayScore} ${awayName}:`;
  if (
    !newTitle.match(new RegExp(`${homeScore}\\s*-\\s*${awayScore}`)) &&
    !newTitle.startsWith(`${homeName} ${homeScore}`) &&
    !newTitle.startsWith(`${awayName} ${awayScore}`)
  ) {
    newTitle = `${scorePrefix} ${newTitle}`;
  } else if (newTitle.match(/^[A-Z][a-z]+ City \d+-\d+ [A-Z]/)) {
    // Already has score format like "Leicester City 1-3 QPR: ..."
    // Just ensure it uses our canonical team names
  }

  // A5: Fix tags
  const newTags = fixTags(
    (data.tags as string[]) || [],
    homeName,
    awayName,
    competition,
  );

  // A8: Image assignment
  const date = data.date as string;
  const newSlug = `${date}-${homeSlug}-vs-${awaySlug}`;
  const image = getImageForSlug(newSlug);

  // Clean body content
  const { cleaned: cleanedBody } = cleanBody(content);

  // Build new frontmatter
  const newData: Record<string, unknown> = {
    title: newTitle,
    date: data.date,
    category: data.category || "football",
    subcategory: competition,
    excerpt: newExcerpt,
    image,
    featured: data.featured || false,
    tags: newTags,
    author: data.author || "William Powell",
    homeTeam: homeName,
    awayTeam: awayName,
    homeScore,
    awayScore,
    competition,
    venue,
  };

  if (data.gameweek) newData.gameweek = data.gameweek;

  // Build new content: stats table + cleaned body
  let newContent = cleanedBody;

  // Insert stats table after any remaining header, before ## Match Report
  const matchReportIdx = newContent.indexOf("## Match Report");
  if (matchReportIdx >= 0) {
    const before = newContent.slice(0, matchReportIdx).trimEnd();
    const after = newContent.slice(matchReportIdx);
    newContent = `${before}\n\n${statsTable}\n\n${after}`;
  } else {
    // Insert at the beginning
    newContent = `${statsTable}\n\n${newContent}`;
  }

  // Build frontmatter manually (matter.stringify uses YAML block scalars that break re-parsing)
  const escYaml = (s: string) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  const tagsJson = JSON.stringify(newTags);

  const frontmatter = [
    "---",
    `title: ${escYaml(newTitle)}`,
    `date: "${data.date}"`,
    `category: "${data.category || "football"}"`,
    `subcategory: "${competition}"`,
    `excerpt: ${escYaml(newExcerpt)}`,
    `image: "${image}"`,
    `featured: ${data.featured || false}`,
    `tags: ${tagsJson}`,
    `author: "${data.author || "William Powell"}"`,
    `homeTeam: "${homeName}"`,
    `awayTeam: "${awayName}"`,
    `homeScore: ${homeScore}`,
    `awayScore: ${awayScore}`,
    `competition: "${competition}"`,
    `venue: "${venue}"`,
    ...(data.gameweek ? [`gameweek: ${data.gameweek}`] : []),
    "---",
    "",
  ].join("\n");

  const newFileContent = frontmatter + newContent + "\n";
  fs.writeFileSync(filepath, newFileContent);

  // A6: New filename
  const newFilename = `${newSlug}.mdx`;

  return { newFilename, processed: true };
}

// ============================================================
// Run
// ============================================================

const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
console.log(`Found ${files.length} MDX files in ${ARTICLES_DIR}\n`);

const renames: Array<{ oldName: string; newName: string }> = [];
const usedNames = new Set<string>();
let processedCount = 0;
let skippedCount = 0;

for (const file of files) {
  try {
    const result = processFile(file);

    if (result.processed && result.newFilename) {
      let finalName = result.newFilename;

      // Handle name collisions
      if (usedNames.has(finalName)) {
        const base = finalName.replace(/\.mdx$/, "");
        let suffix = 2;
        while (usedNames.has(`${base}-${suffix}.mdx`)) suffix++;
        finalName = `${base}-${suffix}.mdx`;
      }

      usedNames.add(finalName);
      renames.push({ oldName: file, newName: finalName });
      processedCount++;
      console.log(`OK: ${file} → ${finalName}`);
    } else if (!result.processed) {
      skippedCount++;
    }
  } catch (err) {
    console.error(`ERROR processing ${file}:`, err);
  }
}

// Perform renames (two-pass to avoid collisions)
console.log(`\nRenaming ${renames.length} files...`);

// First pass: rename to temp names
const tempRenames: Array<{ tempName: string; finalName: string }> = [];
for (const { oldName, newName } of renames) {
  if (oldName === newName) continue;
  const tempName = `_temp_${Date.now()}_${Math.random().toString(36).slice(2)}.mdx`;
  const oldPath = path.join(ARTICLES_DIR, oldName);
  const tempPath = path.join(ARTICLES_DIR, tempName);
  fs.renameSync(oldPath, tempPath);
  tempRenames.push({ tempName, finalName: newName });
}

// Second pass: rename to final names
for (const { tempName, finalName } of tempRenames) {
  const tempPath = path.join(ARTICLES_DIR, tempName);
  const finalPath = path.join(ARTICLES_DIR, finalName);
  fs.renameSync(tempPath, finalPath);
}

console.log(`\nDone!`);
console.log(`  Processed: ${processedCount}`);
console.log(`  Skipped: ${skippedCount}`);
console.log(`  Renamed: ${tempRenames.length}`);
