import matchday from "../../content/matchday.json";

const today = new Date();
today.setHours(0, 0, 0, 0);

const monthLookup: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDateLabel(label: string): Date | null {
  const match = label.match(/(\d{1,2})\s+([A-Za-z]{3})/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = monthLookup[match[2]];
  if (Number.isNaN(day) || month === undefined) return null;
  const date = new Date(today.getFullYear(), month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export const matchdayResults = matchday.results ?? [];

export const matchdayFixtures = (matchday.fixtures ?? []).filter((fixture) => {
  const date = parseDateLabel(fixture.dateLabel ?? "");
  if (!date) return true;
  return date >= today;
});

export const matchdayTicker = matchday.ticker ?? [];
