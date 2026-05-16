// GET /api/sessions?token=...
// Admin-only: lists all stored sessions and returns aggregated JSON.
// Requires env var ADMIN_TOKEN to match ?token=... or x-admin-token header.
import { list, head } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const token = (req.query?.token || req.headers["x-admin-token"] || "").toString();
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(500).json({ error: "admin_token_not_configured", hint: "Set ADMIN_TOKEN env var in Vercel project settings." });
    return;
  }
  if (!token || token !== expected) {
    res.status(403).json({ error: "forbidden" });
    return;
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(503).json({
      error: "blob_store_not_connected",
      hint: "Create a Vercel Blob store and connect it to this project. Go to vercel.com → nektar-cefr → Storage → Create Database → Blob → Connect to Project."
    });
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

    // Fetch each blob in parallel (capped). For private stores we must go
    // through head() to get a signed downloadUrl (b.url alone won't work).
    const concurrency = 8;
    const sessions = new Array(blobs.length);
    let i = 0;
    async function worker() {
      while (i < blobs.length) {
        const idx = i++;
        const b = blobs[idx];
        try {
          // Try the direct URL first (works for public blobs).
          let r = await fetch(b.url);
          if (!r.ok && b.downloadUrl) r = await fetch(b.downloadUrl);
          if (!r.ok) {
            // Last resort: ask the SDK for a fresh signed URL via head().
            const meta = await head(b.url).catch(() => null);
            if (meta?.downloadUrl) r = await fetch(meta.downloadUrl);
          }
          if (!r.ok) throw new Error("blob_fetch_failed_" + r.status);
          sessions[idx] = await r.json();
        } catch (e) {
          sessions[idx] = { __error: String(e?.message || e), __blob: b.pathname };
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
