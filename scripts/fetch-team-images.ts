/**
 * Fetch team-specific images from Unsplash.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=xxx npx tsx scripts/fetch-team-images.ts "Arsenal"
 *
 * Downloads the first search result for "{team} football stadium"
 * to public/images/teams/{team-slug}.jpg and outputs the photo credit.
 */

import fs from "fs";
import path from "path";
import https from "https";

const teamArg = process.argv[2];
if (!teamArg) {
  console.error("Usage: UNSPLASH_ACCESS_KEY=xxx npx tsx scripts/fetch-team-images.ts \"Team Name\"");
  process.exit(1);
}

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  console.error("Error: UNSPLASH_ACCESS_KEY environment variable is required.");
  process.exit(1);
}

const teamSlug = teamArg.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const outputDir = path.join(process.cwd(), "public/images/teams");
const outputPath = path.join(outputDir, `${teamSlug}.jpg`);

function fetchJSON(url: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "Accept-Version": "v1" } }, (res) => {
      let body = "";
      res.on("data", (chunk: string) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${body.slice(0, 200)}`));
        }
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          downloadFile(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const query = encodeURIComponent(`${teamArg} football stadium`);
  const searchUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${accessKey}`;

  console.log(`Searching Unsplash for "${teamArg} football stadium"...`);
  const data = await fetchJSON(searchUrl) as { results?: Array<{ urls?: { regular?: string }; user?: { name?: string; links?: { html?: string } }; links?: { html?: string } }> };

  if (!data.results || data.results.length === 0) {
    console.error("No results found on Unsplash.");
    process.exit(1);
  }

  const photo = data.results[0];
  const imageUrl = photo.urls?.regular;
  const photographerName = photo.user?.name || "Unknown";
  const photographerUrl = photo.user?.links?.html || "";
  const photoUrl = photo.links?.html || "";

  if (!imageUrl) {
    console.error("No image URL found in result.");
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Downloading to ${outputPath}...`);
  await downloadFile(imageUrl, outputPath);

  console.log(`\nSaved: ${outputPath}`);
  console.log(`\nPhoto credit (markdown):`);
  console.log(`Photo by [${photographerName}](${photographerUrl}) on [Unsplash](${photoUrl})`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
