// GET /api/health?token=...
// Admin-only health probe. Confirms env vars are wired and lists the blob count.
import { list } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const token = (req.query?.token || req.headers["x-admin-token"] || "").toString();
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !token || token !== expected) {
    res.status(403).json({ error: "forbidden" });
    return;
  }

  const report = {
    timestamp: new Date().toISOString(),
    env: {
      has_admin_token: Boolean(process.env.ADMIN_TOKEN),
      has_blob_token:  Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      node:            process.version,
      vercel_region:   process.env.VERCEL_REGION || null
    },
    blob: { count: null, sample: [], error: null }
  };

  try {
    let cursor;
    let total = 0;
    const sample = [];
    do {
      const page = await list({ prefix: "sessions/", cursor, limit: 1000 });
      total += page.blobs.length;
      if (sample.length < 5) {
        for (const b of page.blobs) {
          if (sample.length >= 5) break;
          sample.push({ pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt });
        }
      }
      cursor = page.cursor;
    } while (cursor);
    report.blob.count = total;
    report.blob.sample = sample;
  } catch (e) {
    report.blob.error = String(e?.message || e);
  }

  res.status(200).json(report);
}
