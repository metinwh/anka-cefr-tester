// POST /api/log
// Receives a completed-session payload from the student app and stores it
// in Vercel Blob as one JSON file per session. Adds server-observed IP and
// receive-timestamp. Never returns blob URLs to the client.
import { put } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  // Accept POST (preferred) AND GET (fallback when POST is blocked by mobile
  // content filters / Private Relay). GET payload comes via ?d=<urlEncodedJson>.
  const isGet = req.method === "GET";
  if (req.method !== "POST" && !isGet) {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    let body;
    if (isGet) {
      // Vercel already URL-decodes req.query. Do NOT decode again.
      const raw = req.query?.d || "";
      try { body = raw ? JSON.parse(raw) : {}; }
      catch (e) {
        // If parse failed, try ONCE more with explicit decode (in case client
        // sent raw URL-encoded string somehow).
        try { body = JSON.parse(decodeURIComponent(raw)); }
        catch (e2) { body = { _parse_error: String(e.message), _raw_preview: String(raw).slice(0, 200) }; }
      }
    } else {
      // POST path: handle Buffer / string / parsed object
      body = req.body;
      if (Buffer.isBuffer(body)) body = body.toString("utf8");
      if (typeof body === "string") {
        const s = body.trim();
        if (!s) body = {};
        else {
          try { body = JSON.parse(s); }
          catch (parseErr) {
            const stripped = s.replace(/^﻿/, "").trim();
            try { body = JSON.parse(stripped); }
            catch { body = { _parse_error: String(parseErr.message), _raw_preview: s.slice(0, 200) }; }
          }
        }
      }
    }
    if (!body || typeof body !== "object") body = {};

    const fwd = req.headers["x-forwarded-for"] || "";
    const ip = (typeof fwd === "string" ? fwd.split(",")[0] : "").trim()
      || req.headers["x-real-ip"]
      || req.socket?.remoteAddress
      || "unknown";

    const country = req.headers["x-vercel-ip-country"] || null;
    const region  = req.headers["x-vercel-ip-country-region"] || null;
    const city    = req.headers["x-vercel-ip-city"] || null;

    const record = {
      schema: "nektar.session.v1",
      server_received_at: new Date().toISOString(),
      ip,
      geo: { country, region, city },
      ...body
    };

    const sid = (body.session_id || `sess-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`)
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 100);

    const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    // Different payload shapes go to different blob paths so they never
    // race-overwrite each other. /api/sessions merges them on read.
    const isChunk    = typeof body.chunk_index === "number" && Array.isArray(body.turns);
    const isFeedback = body.feedback && typeof body.feedback === "object";
    const pathname = isChunk
      ? `sessions/${day}/${sid}.chunk-${String(body.chunk_index).padStart(3, "0")}.json`
      : isFeedback
      ? `sessions/${day}/${sid}.feedback.json`
      : `sessions/${day}/${sid}.json`;

    // Try multiple shapes for compatibility with the private store.
    // v2 SDK + private store: omit access; v2 SDK + public store: access:"public".
    const tryWrite = async (opts) => put(pathname, JSON.stringify(record, null, 2), opts);
    try {
      await tryWrite({ access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
    } catch (e1) {
      const msg = String(e1?.message || "");
      if (/access must be|access.*public/i.test(msg)) {
        // SDK insists on "public" — store may still reject. Caught below.
        try { await tryWrite({ access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true }); }
        catch (e2) { throw e2; }
      } else if (/private store|public access/i.test(msg)) {
        // Store rejects public — try with no access flag at all
        await tryWrite({ contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
      } else {
        throw e1;
      }
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("log failed:", e);
    res.status(500).json({ error: "log_failed", message: String(e?.message || e) });
  }
}
