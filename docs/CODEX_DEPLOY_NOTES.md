# Codex Handover — Content Refinement & Safe Deploys

This document is for the **next Codex (or any AI agent) session** that will:
1. Refine question content (prompts, distractors, close_competitors).
2. Push the changes to production at https://nektar-cefr.vercel.app — **without breaking the rest of the system**.

Read this **before** touching anything.

---

## 1. The working tree

```
CEFR Placement App/
├── cloned/              ← OLD deployed copy. DO NOT TOUCH.
├── claude-v2/           ← THE LIVE PRODUCTION FORK. Edit here.
│   ├── index.html               ← student app (engine + UI + logging client)
│   ├── admin.html               ← admin viewer for session logs
│   ├── ceiling-probe-engine.js  ← adaptive test engine
│   ├── placement-questions.js          ← legacy base items (76)
│   ├── placement-pool.generated.js     ← legacy generated items (986)
│   ├── placement-questions-v2.js       ← ★ Codex-authored items — EDIT HERE
│   ├── schema-validator.js
│   ├── loading_dark.png
│   ├── package.json             ← Vercel install pins @vercel/blob v2.x — do not downgrade
│   ├── vercel.json              ← cache-control headers
│   ├── api/
│   │   ├── record.mjs           ← POST/GET endpoint that writes session logs to Vercel Blob
│   │   ├── sessions.mjs         ← admin-only read endpoint
│   │   └── health.mjs           ← diagnostic probe
│   ├── docs/                    ← Codex briefs, this file
│   └── scripts/
│       └── build-v2-pool.js
└── docs/                ← legacy project docs (read-only)
```

`claude-v2/` is its own git repo with origin `https://github.com/metinwh/anka-cefr-tester`. Every push to `master` triggers a Vercel auto-deploy. The live URL is `nektar-cefr.vercel.app`.

---

## 2. Where the content lives — only edit this file

**`claude-v2/placement-questions-v2.js`** is the **only** content file you should edit during content refinement.

It contains exactly 250 v2 items in this shape (every item has `source_collection: "diagnostic_v2"`, which is what makes them bypass the legacy `LEGACY_CORE_EXCLUDED` filter in `index.html`):

```js
{
  id: "v2_b2_prag_004",
  boundary: "B1/B2",
  type: "pragmatic_choice",
  format: "pragmatic_choice",
  prompt: "Bir müşteri ürünle ilgili öfkeli bir mesaj yazdı. ...",
  prompt_lang: "tr",
  focus: ["customer_service", "register"],
  skill_tags: ["pragmatic", "register"],
  options: [
    { id: "k",  text: "I understand how frustrating this must be.", role: "key", credit: 1 },
    { id: "a",  text: "I can see why you're upset.",                role: "acceptable", credit: 0.65 },
    { id: "w",  text: "Please calm down before we continue.",       role: "weak", credit: 0.2 }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "I can see why you're frustrated.",
    role: "acceptable",
    tier: "close",
    rationale: "Defensible near-paraphrase of the key — one level lower."
  },
  estimated_difficulty: 0.62,
  estimated_discrimination: 0.81,
  lexicon: ["frustrating", "understand"],
  distractor_distance: "tight",
  source_grounding: [],
  source_collection: "diagnostic_v2"  // ← required, never remove
}
```

### Editing rules

1. **Never change `id`.** Keys (`session_id`s in logs, scoring caches) reference IDs.
2. **Always keep `source_collection: "diagnostic_v2"`** — if you remove it, the item silently falls back into the legacy-filtered pool.
3. **Every item must have exactly one option with `role: "key"`** and `correctId` must match that option's id.
4. **For naturalness/pragmatic items**: keep three roles — `key` (credit 1.0), `acceptable` or `weak` (credit 0.5–0.85), and `weak` or `nonnative` (credit 0–0.25).
5. **Don't remove `close_competitor`.** The adaptive distractor system reads this field to swap in a harder distractor when learner confidence is high.
6. **Item types currently active** in the student app:
   - `vocab`, `naturalness_judgment`, `pragmatic_choice`, `collocation`, `phrasal_verb` (v2)
   - `grammar`, `vocab`, `idiom`, `collocation`, `phrasal_verb`, `discourse_marker` (legacy active)
   - **Don't introduce a brand-new `type` value** without also updating `instrFor()` in `index.html` so the instruction text matches.

### Items you should NOT touch

- `placement-questions.js` and `placement-pool.generated.js` are the legacy base + machine-generated pool. They were audited and frozen. If you find a bad legacy item, **document it in a comment in this file, don't edit the legacy files.**

---

## 3. The system around the content (don't touch)

| File | Do not touch unless… |
|---|---|
| `ceiling-probe-engine.js` | …you are fixing an engine bug. Has the accuracy ceiling, rapid_confirm, force-lock, generic probe_down. Hand-tuned. |
| `index.html` (engine wiring + logging client) | …you are fixing logging or UI. The multi-transport logging (sendBeacon + POST + GET-chunks) is fragile — don't simplify it. Mobile networks block POSTs. |
| `api/record.mjs` | …you are adding a new payload shape. Chunked uploads (`chunk_index`) and feedback (`feedback`) write to separate blob paths so they don't race-overwrite. |
| `api/sessions.mjs` | …you are changing the admin view. Has the chunk merge + feedback merge. |
| `admin.html` | …you are improving the admin viewer. Token in URL is the auth — `ADMIN_TOKEN` env var on Vercel. |
| `vercel.json` | …you are changing cache headers. The HTML files are no-cache because mobile Safari caches aggressively. |

---

## 4. Critical Vercel state

These are configured in the Vercel dashboard (NOT in code). If somebody recreates the project from git, they need to set these up:

1. **Blob store connected** — store is **Private**. Env var `BLOB_READ_WRITE_TOKEN` is auto-provided when the store is linked.
2. **Admin token** — env var `ADMIN_TOKEN` is required. Current value is in `claude-v2/.admin-token.txt` (gitignored).

If `/api/health` returns `has_blob_token: false` → re-link the Blob store. If it returns `has_admin_token: false` → set the env var.

---

## 5. Safe content-edit + deploy procedure

### Step 1 — Edit `placement-questions-v2.js`

Make your changes. Keep the file structure intact (top-level `window.NEKTAR_PLACEMENT_CONTENT_V2 = { ..., items: [...] };`).

### Step 2 — Validate locally

```bash
cd "CEFR Placement App/claude-v2"

# Pure syntax check
node --check placement-questions-v2.js

# Full validation suite — must all pass
node diagnostic-v2-tests.js
node placement-quality-tests.js
node student-core-pool-tests.js
node naturalness-scoring-tests.js
node engine-guardrail-tests.js
node engine-floor-recovery-tests.js
```

If **any test fails**, do not push. Read the test output, fix the offending item, re-run.

### Step 3 — Optional: load locally and dry-run a session

```bash
node -e "
global.window = {};
require('./placement-questions.js');
require('./placement-pool.generated.js');
require('./placement-questions-v2.js');
const Engine = require('./ceiling-probe-engine.js');
const v2 = window.NEKTAR_PLACEMENT_CONTENT_V2.items;
console.log('v2 items:', v2.length);
console.log('with close_competitor:', v2.filter(i => i.close_competitor).length);
console.log('per type:', Object.entries(v2.reduce((a,i)=>(a[i.type]=(a[i.type]||0)+1,a),{})));"
```

Expected output: `v2 items: 250`, `with close_competitor: 250` (or matching counts after your edits).

### Step 4 — Commit + push

```bash
cd "CEFR Placement App/claude-v2"
git add placement-questions-v2.js
git commit -m "content: <what you changed, in 1 line>"
git push origin master
```

Vercel auto-deploys within ~30–60 seconds.

### Step 5 — Verify the live deploy

```bash
# Force a fresh prod build if cache is being weird
npx vercel --prod --yes

# Re-alias only if Vercel didn't auto-promote
# (look at the deployment URL it just printed)
npx vercel alias set <new-deployment-host> nektar-cefr.vercel.app
```

Open https://nektar-cefr.vercel.app/admin.html?token=<ADMIN_TOKEN> and confirm the admin still loads. Then take a test on a phone and confirm a fresh session appears in admin within a minute.

---

## 6. How to roll back if you break something

Every commit has a deploy. Vercel keeps history.

```bash
# See the last 10 commits + their auto-deploys
git log --oneline -10
npx vercel ls nektar-cefr --yes

# Roll back: either revert the bad commit
git revert <bad-sha>
git push origin master

# OR promote an older deployment via Vercel CLI:
npx vercel alias set <previous-deployment-host> nektar-cefr.vercel.app
```

The `cloned/` folder is the very first Gemini-built version, frozen as a fallback — but it doesn't have v2 content, the engine fixes, or the logging. **Only use it as a last-resort "the new system is totally broken, give us the old UI back" rollback.**

---

## 7. Things that have specifically bitten us

| Bug | Symptom | Fix in code |
|---|---|---|
| Empty `ADMIN_TOKEN` | Admin panel returns 500 with `admin_token_not_configured` | Set the env var in Vercel dashboard. **Never default the token in code.** |
| Old SDK + private Blob store | All POSTs to `/api/record` fail with `access must be public` | Use `@vercel/blob ^2.3.3` (package.json), and put with `access: "private"` |
| Mobile network blocks POST | Session never lands but admin works | The client has POST + GET + sendBeacon fallback chain. **Don't simplify** the logging code. |
| Mobile URL filter blocks long URLs | Trajectory chunks don't arrive | Chunked GETs (2 turns each). **Don't make chunks bigger.** |
| Browser cache holds stale HTML | User sees old `LOG_BUILD` tag | `vercel.json` sets `no-cache` on `/`, `/index.html`, `/admin.html`. Bump `LOG_BUILD` constant on any change to logging logic. |
| iOS Safari "sending…" stuck | Fetch resolved while still on transition screen, status update missed | `lastLogStatus` is a module-level variable, applied on every `htmlResult` render. Don't change this. |
| Vercel CLI `env add` hanging | env var stays empty | Use `--value <VAL>` flag or the REST API. **Never assume CLI piping works.** |

---

## 8. Schema validator

`schema-validator.js` is the source of truth for item shape. If you introduce a new field, update it there. If you remove a field, check what the engine references it as (`grep -r "\.field_name" *.js`).

The validator is also bundled in `diagnostic-v2-tests.js` — that test catches most schema drift early.

---

## 9. Quick contact map (file → owner concept)

- **Content quality** (prompts, distractors, level calibration) → `placement-questions-v2.js`
- **Engine math** (when to step up/down, lock, force-lock, accuracy ceiling) → `ceiling-probe-engine.js`
- **Student UX** (welcome, transition, result, feedback) → `index.html`
- **Logging transport** (POST/GET fallback, chunked trajectory) → `index.html` + `api/record.mjs`
- **Admin viewer** → `admin.html` + `api/sessions.mjs`

If your refinement touches more than `placement-questions-v2.js`, you are doing more than "content refinement" — re-read the rules above and proceed carefully.

---

## 10. The one rule I cannot repeat enough

**Don't change endpoints, file names, blob paths, env-var names, or the chunked-upload protocol.** A lot of fragile mobile-network workarounds depend on them. If you must change them, also bump `LOG_BUILD` and document the change in this file.

Good hunting.
