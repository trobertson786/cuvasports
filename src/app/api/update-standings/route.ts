import { NextResponse } from "next/server";

/**
 * Called by Vercel cron at 00:00 daily to warm the /api/get-standings cache.
 * Hitting get-standings with a fresh request causes Vercel's edge to re-fetch
 * from football-data.org and cache the result for the next 3600s.
 *
 * This avoids writing to the file system (serverless env is read-only) or
 * requiring Vercel KV/Blob for an MVP data pipeline.
 */
export async function GET(request: Request) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  try {
    // Force a fresh fetch by bypassing CDN cache
    const res = await fetch(`${protocol}://${host}/api/get-standings`, {
      headers: { "Cache-Control": "no-cache" },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) throw new Error(`get-standings returned ${res.status}`);

    return NextResponse.json({
      ok: true,
      updated: new Date().toISOString(),
      status: res.status,
    });
  } catch (err) {
    console.error("[update-standings] cache warm failed:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
