// GET /api/sessions?token=...
// Admin-only: lists all stored sessions and returns aggregated JSON.
// Requires env var ADMIN_TOKEN to match ?token=... or x-admin-token header.
import { list } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const token = (req.query?.token || req.headers["x-admin-token"] || "").toString();
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(500).json({ error: "admin_token_not_configured" });
    return;
  }
  if (!token || token !== expected) {
    res.status(403).json({ error: "forbidden" });
    return;
  }

  try {
    const blobs = [];
    let cursor = undefined;
    do {
      const page = await list({ prefix: "sessions/", cursor, limit: 1000 });
      blobs.push(...page.blobs);
      cursor = page.cursor;
    } while (cursor);

    // Sort newest-first
    blobs.sort((a, b) => (b.uploadedAt || "").localeCompare(a.uploadedAt || ""));

    // Fetch each blob in parallel (capped)
    const concurrency = 16;
    const sessions = new Array(blobs.length);
    let i = 0;
    async function worker() {
      while (i < blobs.length) {
        const idx = i++;
        try {
          const r = await fetch(blobs[idx].url);
          sessions[idx] = await r.json();
        } catch (e) {
          sessions[idx] = { __error: String(e?.message || e), __blob: blobs[idx].pathname };
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, blobs.length) }, worker));

    res.status(200).json({
      count: sessions.length,
      fetched_at: new Date().toISOString(),
      sessions: sessions.filter(Boolean)
    });
  } catch (e) {
    console.error("sessions failed:", e);
    res.status(500).json({ error: "fetch_failed", message: String(e?.message || e) });
  }
}
