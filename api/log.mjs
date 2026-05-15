// POST /api/log
// Receives a completed-session payload from the student app and stores it
// in Vercel Blob as one JSON file per session. Adds server-observed IP and
// receive-timestamp. Never returns blob URLs to the client.
import { put } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

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
    const pathname = `sessions/${day}/${sid}.json`;

    await put(pathname, JSON.stringify(record, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("log failed:", e);
    res.status(500).json({ error: "log_failed", message: String(e?.message || e) });
  }
}
