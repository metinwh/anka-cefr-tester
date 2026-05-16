# ANKA CEFR Placement Tester — Deployment & Integration Guide

**Audience:** the next engineer / agent who needs to embed this app into Nektar's main website (or take over Vercel hosting). Read this *before* touching anything.

**Current live URL:** `https://nektar-cefr.vercel.app`
**Repo:** `github.com/metinwh/anka-cefr-tester` (deploy root = `claude-v2/`)
**Last build tag shown in footer:** `v17-2026-05-16-layout-fixes` (`LOG_BUILD` constant in `index.html`)

---

## 1. What this thing is

A self-contained, mobile-first, **adaptive CEFR placement test** for Turkish speakers learning English. Single-page HTML app, no framework, no build step. The adaptive engine (`ceiling-probe-engine.js`) walks a learner through 18–28 items, swaps distractors based on prior answers, and locks a CEFR level (A1 → C1) with a confidence tag (low / medium / high).

It also includes:

- A **private logging pipeline** (Vercel Blob) — every session's full trajectory + final result + optional user-feedback rating gets stored as JSON.
- A **token-gated admin viewer** (`admin.html`) for reading those sessions.

The whole thing is plain static HTML/JS + three serverless API routes. It will deploy to **any** static-friendly host that supports Node serverless functions; Vercel is the path of least resistance.

---

## 2. Repository layout (deploy root = `claude-v2/`)

```
claude-v2/
├── index.html                      ← the student app (single page, ~2000 lines)
├── admin.html                      ← admin viewer for session logs (token-gated)
├── ceiling-probe-engine.js         ← adaptive engine (the brain)
├── placement-questions-v2.js       ← curated v2 item pool (328 items)
├── placement-questions.js          ← legacy item pool (do NOT edit)
├── placement-pool.generated.js     ← legacy generated pool (do NOT edit)
├── schema-validator.js             ← validates item shape at load time
├── legacy-retirement.js            ← 77 weak legacy IDs filtered out at runtime
├── legacy-retirement-list.json     ← human-readable catalog of retired items
├── loading_dark.png                ← Nektar logo (white-on-transparent PNG)
├── package.json                    ← only dep: @vercel/blob ^2.3.3
├── vercel.json                     ← cache-control no-cache for HTML
├── api/
│   ├── record.mjs                  ← POST+GET endpoint that writes session blobs
│   ├── sessions.mjs                ← admin-only list/merge endpoint
│   └── health.mjs                  ← env / blob diagnostic probe
├── scripts/
│   ├── add-idioms-stepA.cjs        ← one-off content generators (already run)
│   ├── add-partial-credit-stepB.cjs
│   ├── add-vocab-stepC.cjs
│   └── find-weak-distractors.cjs   ← re-runnable: refreshes legacy-retirement.js
├── diagnostic-v2-tests.js          ← validation test suite (Node, no deps)
├── placement-quality-tests.js
├── naturalness-scoring-tests.js
├── student-core-pool-tests.js
├── engine-floor-recovery-tests.js
├── engine-guardrail-tests.js
└── docs/
    ├── DEPLOYMENT_GUIDE.md         ← (this file)
    ├── CODEX_BRIEF.md              ← original 6.8k-word content-authoring spec
    ├── CODEX_DEPLOY_NOTES.md       ← safe-edit rules for future content work
    ├── CONTENT_REFINEMENT_NOTES.md ← May 2026 audit + status
    └── DIAGNOSTIC_V2_IMPLEMENTATION_REPORT.md
```

**Important:** `index.html` directly `<script src="">`-loads every JS file. There is **no bundler**. Paths are relative (`./placement-questions-v2.js`). If you embed this elsewhere, those paths must stay resolvable.

---

## 3. Hosting requirements

The app needs three things from its host:

| Capability | Used by | Notes |
|---|---|---|
| **Static file serving** | `index.html`, `admin.html`, `*.js`, `*.png` | Anywhere works. |
| **Node serverless functions** (ESM) | `api/record.mjs`, `api/sessions.mjs`, `api/health.mjs` | Vercel-native. Other hosts need adapters. |
| **Vercel Blob (or compatible object store)** | session logging | Currently hard-bound to Vercel Blob via `@vercel/blob`. |

If you move off Vercel, you'll need to:
1. Replace the three `api/*.mjs` files with whatever your platform's function format is (Cloudflare Workers, AWS Lambda, etc.).
2. Replace `@vercel/blob`'s `put` / `list` calls with your storage SDK.
3. Keep the **HTTP contract** the same so `index.html` doesn't change.

---

## 4. Environment variables (REQUIRED)

These live in Vercel Project Settings → Environment Variables. Without them, the log system silently fails (the app still works, but no data is recorded).

| Name | Scope | Purpose |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Production, Preview, Development | Auth token for Vercel Blob. Auto-injected when you create a Blob store and connect it to the project — **do not** copy-paste it manually. |
| `ADMIN_TOKEN` | Production | A random string you choose. Required to view admin panel & sessions endpoint. Currently rotated; the active value is the one set on the project (check Vercel dashboard). |

**Rotating `ADMIN_TOKEN`:**
```bash
# Easiest path: Vercel dashboard → Settings → Environment Variables → edit → redeploy
# CLI path:
vercel env rm ADMIN_TOKEN production
vercel env add ADMIN_TOKEN production   # paste new value when prompted
vercel --prod   # redeploy so the function picks up the new env
```

**Landmine:** changing env vars does NOT auto-redeploy. You must trigger a new deployment for serverless functions to pick up the new value.

---

## 5. Dependencies

`package.json` is intentionally minimal:

```json
{
  "name": "nektar-cefr-tester",
  "version": "2.0.0",
  "private": true,
  "dependencies": {
    "@vercel/blob": "^2.3.3"
  }
}
```

That's the only runtime dependency. Locked to `^2.3.3` because earlier versions (0.27.x) didn't support private-blob `access: "public"` semantics correctly and threw "access must be public" errors against private stores.

No bundler, no build step, no Tailwind, no React. `npm install` only exists to make `@vercel/blob` available to the serverless functions.

---

## 6. The logging pipeline (read this carefully)

This is the part most likely to surprise you. The app talks to **three endpoints**, with **four transports**, to defeat mobile-network filtering.

### 6a. Endpoints

| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/record` | POST | Full session payload (preferred). | None — public write. |
| `/api/record` | GET `?d=<urlEncodedJson>` | Tiny meta + chunked trajectories (fallback). | None — public write. |
| `/api/sessions` | GET | List & merge all sessions. | `Authorization: Bearer <ADMIN_TOKEN>` |
| `/api/health` | GET | Env-var sanity check, blob test. | `?token=<ADMIN_TOKEN>` |

### 6b. Client-side write strategy (in `index.html`, `submitLog()`)

For each completed session, the client fires **all of these in parallel** so at least one succeeds:

1. **Tiny GET** with meta only (~300-char URL): build, session ID, level, confidence, turns, duration. Survives even when carriers strip POST traffic.
2. **`navigator.sendBeacon`** with full payload — fire-and-forget, works during page unload.
3. **`fetch` POST** with full payload — the preferred fat path.
4. **Chunked trajectory GETs** — 2 turns per chunk, sequential with small delays, URL-encoded. Each chunk lands as `<sessionId>.chunk-NNN.json`.

The server-side `api/record.mjs` accepts all of these, distinguishes them by `payload.kind` (`tiny`, `chunk`, `feedback`, or full session), and writes to one of these blob paths:

```
sessions/YYYY-MM-DD/<sessionId>.json              ← meta (from POST or tiny GET)
sessions/YYYY-MM-DD/<sessionId>.chunk-NNN.json    ← trajectory chunks
sessions/YYYY-MM-DD/<sessionId>.feedback.json     ← user rating
```

### 6c. Server-side merge (in `api/sessions.mjs`)

The admin endpoint lists all blobs, groups them by `<sessionId>`, and merges meta + chunks + feedback back into a single object per session. Chunks arrive out of order — that's fine, the merger sorts by chunk index.

### 6d. The build tag (`LOG_BUILD`)

Every payload includes `"log_build": "vN-YYYY-MM-DD-shortdesc"` from a constant at the top of `index.html`'s main script. When you ship a real change, **bump this string**. It shows up in:
- Footer status line ("build: v17-... · log: sent")
- Every blob entry (so admin viewer can filter by build)
- Mobile testing — if a user reports a bug, ask them what build their footer shows.

### 6e. Known landmines

- **Mobile carrier filters** strip `/api/log` (looks like a tracker). We renamed to `/api/record`. Don't rename it to `/api/log`, `/api/track`, or `/api/analytics` again.
- **URL length limit** on some carriers ≈ 2KB. That's why trajectories are chunked at 2 turns each.
- **Vercel auto-decodes `req.query`** — do NOT call `decodeURIComponent` on `req.query.d` in `record.mjs`. There's a fallback that handles double-encoded inputs anyway.
- **Blob `access: "public"`** is required by the SDK signature even though our store is private. The store's privacy is controlled at the store level, not per-put.

---

## 7. Admin viewer

URL: `https://<your-domain>/admin.html?token=<ADMIN_TOKEN>`

- Dark themed, table-of-sessions UI.
- Per-row JSON inspector.
- Markdown export for individual sessions (includes per-turn `<details>` blocks for the trajectory).
- No write capability — read-only.

If you embed the app elsewhere, you can leave `admin.html` accessible at the original Vercel URL (just keep it deployed there) and use the iframe/redirect approach for the student app on the new site.

---

## 8. Integration options for the main Nektar website

You have three reasonable ways to put this on the production site. Pick based on your stack.

### Option A — iframe embed (simplest, recommended for fastest ship)

Keep the app deployed at `nektar-cefr.vercel.app`. On the Nektar marketing site, drop:

```html
<iframe
  src="https://nektar-cefr.vercel.app/"
  style="width:100%; max-width:540px; height:100dvh; border:0; display:block; margin:0 auto;"
  allow="clipboard-write"
  title="ANKA CEFR Placement Test"></iframe>
```

**Pros:** Zero coupling. Updates ship via `git push origin master` to the cefr repo, no main-site redeploy needed. Admin viewer keeps working unchanged.

**Cons:** iframe height on mobile can be finicky; the test is full-screen so it should fill viewport.

**Mobile-specific:** the app uses `100dvh` internally. On iOS Safari inside an iframe this *usually* works, but test it. If you see scroll-within-iframe issues, set the iframe to `height: 100svh` (or measure with JS and resize).

### Option B — subdomain reverse proxy

Point `placement.nektar.com` (or similar) at the Vercel deployment via DNS or Cloudflare proxy. Then your main site links out to `placement.nektar.com`. Slightly cleaner branding than option A, same operational benefits.

### Option C — full fork into the main repo

Copy the `claude-v2/` folder into the Nektar main repo. You must:

1. Keep all relative `./script.js` paths intact, or rewrite them with a base path.
2. Wire up the three `api/*.mjs` functions on the new host. If main site is also on Vercel, no work needed beyond co-deploying. If it's on a different platform, port them.
3. Set `BLOB_READ_WRITE_TOKEN` and `ADMIN_TOKEN` on the new host's project.
4. Update `index.html`'s `LOG_ENDPOINT` constant if the routes live at a non-root path (e.g. `/cefr/api/record`).

**Use this only if** you need the test to be 1st-party for SEO/analytics reasons. Otherwise option A is cheaper to maintain.

---

## 9. Required pre-deploy validation

**Before every deploy** (especially after any content change), run:

```bash
cd "CEFR Placement App/claude-v2"

# Syntax-check
node --check ceiling-probe-engine.js
node --check placement-questions-v2.js
node --check schema-validator.js

# Test suites (all must pass)
node diagnostic-v2-tests.js
node placement-quality-tests.js
node naturalness-scoring-tests.js
node student-core-pool-tests.js
node engine-floor-recovery-tests.js
node engine-guardrail-tests.js
```

Expected output of each: `<name> tests passed`. If any fail, **do not deploy** — read the failure message and fix the underlying issue. The tests cover:
- Item schema validity (every item has key, no duplicate option texts, valid boundary, etc.)
- Partial-credit math correctness
- The engine's ceiling-probe & force-lock behavior
- That the student-core pool has enough items at every level

---

## 10. Deployment procedure (current Vercel flow)

The repo auto-deploys to Vercel on any push to `master`. So:

```bash
# from claude-v2/ or repo root
git add <files>
git commit -m "<one-line summary>"
git push origin master

# Vercel will pick it up within ~60s. Watch:
#   https://vercel.com/<user>/nektar-cefr/deployments
```

After deploy, smoke-test:

1. Open `https://nektar-cefr.vercel.app/` in mobile Safari + desktop Chrome.
2. Complete a quick test (3–4 questions, then `vazgeç`).
3. Check footer status line says `build: v<N>-... · log: sent`.
4. Open `https://nektar-cefr.vercel.app/admin.html?token=<ADMIN_TOKEN>`.
5. Confirm your just-completed session appears at the top.

If step 3 says `log: error` or `log: sending…` and never resolves, hit `/api/health?token=<ADMIN_TOKEN>` and check whether `BLOB_READ_WRITE_TOKEN` is present.

---

## 11. The adaptive engine (high-level mental model)

You don't need to touch this to deploy, but worth understanding for support.

`ceiling-probe-engine.js` runs a stateful walk through the item pool:

- **Start:** A2/B1 boundary, expects rapid mastery.
- **Rapid-confirm mode:** if learner streaks ≥3 correct on vocab at A1–B1, fast-forward through obvious lower levels.
- **Probe up / down:** wrong answers → step down a boundary; correct + fast → step up.
- **Force-lock:** after enough turns at the same boundary with ≥5/5 or 5/6 (83%+) accuracy, lock there. With 5/5 → confidence "high", 5/6 → "medium".
- **Ping-pong detection:** if the engine alternates boundaries up-down-up or down-up-down in last 3 *real* movements (confirms filtered), force a lock at the lower boundary to prevent infinite loops.
- **Adaptive distractor swap:** items with a `close_competitor` field swap that option in when the learner is at the upper edge of the boundary, increasing discrimination.
- **Accuracy ceiling:** prevents "random clicker → C1". A learner whose overall accuracy is bad cannot lock above ~A2 regardless of which questions they happen to get right.

Confidence is reported in three tiers (low / medium / high) and shown on the result screen with a caveat. The post-result feedback widget ("Sizce test ne kadar isabetli tahmin yaptı?") writes back to `<sessionId>.feedback.json` for offline calibration analysis.

---

## 12. Content pool overview

`placement-questions-v2.js` is the **only file you edit** for content. Legacy pools (`placement-questions.js`, `placement-pool.generated.js`) are frozen.

Current counts (post May 2026 refinement):
- ~328 v2 items
- 77 legacy items filtered out at runtime via `legacy-retirement.js`
- Item types: `vocab`, `grammar`, `idiom`, `collocation`, `phrasal_verb`, `discourse_marker`, `naturalness_judgment`, `pragmatic_choice`
- Every v2 item has a `close_competitor`; vocab + collocation at B1+ have an explicit `acceptable` role for partial credit.

If you need to author more items, read `docs/CODEX_BRIEF.md` for shape & rules, then `docs/CODEX_DEPLOY_NOTES.md` for safe-edit constraints.

To refresh the legacy-retirement list after a pool change:
```bash
node scripts/find-weak-distractors.cjs
```

---

## 13. Versioning & changelog protocol

There's no formal CHANGELOG. The signal is:
- **Git history** (`git log --oneline`) — keep messages prefixed like `content:`, `engine:`, `ui:`, `infra:`.
- **`LOG_BUILD`** constant in `index.html` — bump on every meaningful client change. Format: `vN-YYYY-MM-DD-shortdesc`.

When you bump `LOG_BUILD`, the new value flows into every recorded session payload automatically. The admin viewer doesn't currently filter by build but you can grep the JSON exports.

---

## 14. Things to *not* do (lessons learned the expensive way)

1. **Do NOT edit `placement-questions.js` or `placement-pool.generated.js`.** They're legacy. Retire items via `legacy-retirement.js` instead.
2. **Do NOT skip the test suite before deploying.** The engine has invariants that surface only via the test runner.
3. **Do NOT rename `/api/record` back to `/api/log`.** Mobile content blockers nuke it.
4. **Do NOT set `flex: 1` on `.app-area` again** — it re-introduces the "blank bottom half" + "background slides when dropdown opens" issues. The `margin-top: auto` on `.footer` already handles bottom-pinning.
5. **Do NOT `--amend` or `--force-push` to master.** Vercel deploys are tied to commit SHAs and `--amend` invalidates the cache.
6. **Do NOT manually copy the `BLOB_READ_WRITE_TOKEN`.** Always create / connect the Blob store via Vercel dashboard so the token is injected correctly.
7. **Do NOT use `naturalness-scoring-tests.js` as a template for new tests** — it has hardcoded assumptions about which item types carry the `acceptable` role; broaden the assertion if you add `acceptable` to vocab.

---

## 15. Quick reference — common commands

```bash
# Local dev (no server needed — pure static)
# Just open claude-v2/index.html in a browser.
# (Logging will fail since /api/* doesn't exist locally — that's fine.)

# Optional: run with Vercel's local emulator to test logging
vercel dev

# Validate before pushing
cd "CEFR Placement App/claude-v2"
node diagnostic-v2-tests.js && node placement-quality-tests.js && \
  node naturalness-scoring-tests.js && node student-core-pool-tests.js && \
  node engine-floor-recovery-tests.js && node engine-guardrail-tests.js

# Ship
git push origin master   # auto-deploys

# Inspect a live session
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://nektar-cefr.vercel.app/api/sessions | jq '.sessions[0]'

# Health probe
curl "https://nektar-cefr.vercel.app/api/health?token=$ADMIN_TOKEN"
```

---

## 16. Who to ask if something's on fire

- **Adaptive engine misbehaving** → read `ceiling-probe-engine.js` top-to-bottom; it's ~600 lines and densely commented. The state machine is in `step()`.
- **Item showing up wrong** → check `placement-questions-v2.js` for that ID; if it's a `plc_*` ID, check `legacy-retirement.js` to see if it's been retired.
- **Log not landing** → hit `/api/health?token=...` first. If env vars look fine, check Vercel function logs for the actual error.
- **Admin viewer empty** → 99% of the time it's a stale `ADMIN_TOKEN` in the URL after env rotation. Re-check the dashboard value.

---

**That's everything.** The app is intentionally simple — one HTML file, one engine file, one content file, three API routes. If something feels overcomplicated, you're probably looking at the wrong thing.
