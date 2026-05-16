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

    // Sort newest-first. v2 SDK returns uploadedAt as Date; coerce to number.
    const asTime = (v) => (v instanceof Date ? v.getTime() : (v ? new Date(v).getTime() : 0));
    blobs.sort((a, b) => asTime(b.uploadedAt) - asTime(a.uploadedAt));

    // Fetch each blob's content. For private stores, the URL requires the
    // BLOB_READ_WRITE_TOKEN as a Bearer Authorization header.
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN || "";
    const authHeader = blobToken ? { Authorization: `Bearer ${blobToken}` } : {};
    const concurrency = 12;
    const fetched = new Array(blobs.length);
    let i = 0;
    async function worker() {
      while (i < blobs.length) {
        const idx = i++;
        const b = blobs[idx];
        try {
          let r = await fetch(b.url, { headers: authHeader });
          if (!r.ok && b.downloadUrl) r = await fetch(b.downloadUrl, { headers: authHeader });
          if (!r.ok) throw new Error("blob_fetch_failed_" + r.status);
          const data = await r.json();
          fetched[idx] = { pathname: b.pathname, data };
        } catch (e) {
          fetched[idx] = { pathname: b.pathname, data: { __error: String(e?.message || e) } };
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, blobs.length) }, worker));

    // Group by base session id. Chunks have ".chunk-NNN.json" suffix.
    const groups = {};
    for (const item of fetched) {
      if (!item) continue;
      const filename = item.pathname.split("/").pop() || "";
      const isChunk = /\.chunk-\d+\.json$/.test(filename);
      const baseId = filename.replace(/\.chunk-\d+\.json$/, "").replace(/\.json$/, "");
      if (!groups[baseId]) groups[baseId] = { meta: null, chunks: [], pathname: item.pathname };
      if (isChunk) groups[baseId].chunks.push(item.data);
      else groups[baseId].meta = item.data;
    }

    // Merge chunks into trajectory for sessions that don't have one yet.
    // Chunked turns use a slimmer shape — expand to the full schema admin expects.
    const expandTurn = (e) => ({
      turn: e.turn ?? e.t ?? 0,
      item_id: e.item_id || "",
      boundary: e.boundary || "",
      type: e.type || "",
      focus: e.focus || [],
      prompt: e.prompt || "",
      selected_option_id: e.selected_option_id || "",
      selected_text: e.selected_text || "",
      selected_role: e.selected_role || "",
      correct: !!e.correct,
      response_ms: e.response_ms ?? 0,
      engine_action: e.engine_action || "",
      movement_reason: e.movement_reason || "",
      state_before: { current_boundary: e.boundary || "" },
      state_after: {
        current_boundary: e.state_after_boundary || e.boundary || "",
        confidence: e.state_after_confidence || ""
      }
    });

    const sessions = Object.values(groups).map((g) => {
      const session = g.meta || { __chunks_only: true, session_id: g.pathname };
      if (g.chunks.length > 0) {
        const haveFullTrajectory = Array.isArray(session.trajectory) && session.trajectory.length > 0;
        if (!haveFullTrajectory) {
          const sortedChunks = g.chunks
            .filter((c) => c && Array.isArray(c.turns))
            .sort((a, b) => (a.chunk_index || 0) - (b.chunk_index || 0));
          session.trajectory = sortedChunks.flatMap((c) => c.turns.map(expandTurn));
          session._trajectory_from_chunks = sortedChunks.length;
          if (!session.items_asked) session.items_asked = session.trajectory.length;
        }
      }
      return session;
    });

    // Sort newest-first by ended_at or server_received_at
    sessions.sort((a, b) => {
      const ta = new Date(a.server_received_at || a.ended_at || 0).getTime();
      const tb = new Date(b.server_received_at || b.ended_at || 0).getTime();
      return tb - ta;
    });

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
