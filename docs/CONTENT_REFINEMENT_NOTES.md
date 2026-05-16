# Content Refinement Findings — May 2026

Programmatic audit of all **1129 active items** in the student pool (250 v2 + 879 legacy active). Each finding is backed by a count, and each fix is scoped concretely so Codex can pick one and ship it without breaking anything.

Read `CODEX_DEPLOY_NOTES.md` first for the safe-edit rules. **Only edit `placement-questions-v2.js`** — leave the legacy pool files alone.

---

## 1. The "half-correct option" is missing almost everywhere

**Finding:** Only 15% of active items (170/1129) have a partial-credit option. The breakdown:

| Type | Items | With partial-credit option |
|---|---|---|
| `naturalness_judgment` | 130 | **100%** ✓ |
| `pragmatic_choice` | 40 | **100%** ✓ |
| `vocab` | 250 | **0%** ❌ |
| `grammar` | 339 | **0%** ❌ |
| `idiom` | 84 | **0%** ❌ |
| `collocation` | 138 | **0%** ❌ |
| `phrasal_verb` | 100 | **0%** ❌ |
| `discourse_marker` | 48 | **0%** ❌ |

**Why this matters:** A learner who picks "B2-acceptable-but-not-optimal" should get partial credit so the engine reads them as B2-borderline, not as a hard fail. Right now, vocab/grammar/collocation items return only `key` or `wrong` — no middle ground. This is part of why borderline learners feel mis-placed.

**Codex task — adding partial credit to high-leverage v2 items:**

For each `vocab`, `collocation`, `phrasal_verb` item in `placement-questions-v2.js`, **add one option with `role: "acceptable"`, `credit: 0.5–0.7`** representing a defensible but suboptimal answer. Example:

```js
// vocab/B1: "ihtiyaç duymak"
options: [
  { id: "k",  text: "need",    role: "key" },          // credit 1.0 (default)
  { id: "a",  text: "want",    role: "acceptable", credit: 0.55 },  // ← NEW: defensible miss
  { id: "lt", text: "wish",    role: "l1_trap" }       // credit 0.0
]
```

**Don't add partial credit to all items at once.** Start with vocab v2 items at B1+ (where ambiguity is most diagnostic). Lower levels (A1/A2) can stay binary.

**Priority order:**
1. v2 vocab at B1/B2 + B2/C1 (~50 items)
2. v2 collocation (30 items) — L1 traps benefit hugely from partial credit
3. v2 phrasal_verb (30 items)

---

## 2. Daily-phrase / idiom void at lower levels

**Finding:** Idiom item counts per CEFR boundary:

| Boundary | Idiom items |
|---|---|
| A1/A2 | **0** |
| A2/B1 | **0** |
| B1/B2 | 28 |
| B2/C1 | 56 |

A beginner literally never encounters an everyday English phrase in this test. That undersells real-life-speaker ability.

**Real-life everyday phrases that are MISSING from the entire pool:**

| Phrase | Suggested level | Status |
|---|---|---|
| "Get fired / sacked" | A2/B1 | ❌ missing |
| "Jump to conclusions" | B1/B2 | ❌ missing |
| "You're the one to talk" | B2/C1 (irony) | ❌ missing |
| "The elephant in the room" | B2/C1 | ❌ missing |
| "No big deal" | A2/B1 | ❌ missing |
| "Hit the books" | B1/B2 | ❌ missing |
| "Ring a bell" | B1/B2 | ❌ missing |
| "Bite the bullet" | B2/C1 | ❌ missing |
| "Beat around the bush" | B2/C1 | ❌ missing |
| "Spill the beans" | B1/B2 | ❌ missing |
| "Pull someone's leg" | B1/B2 | ❌ missing |
| "Tip of the tongue" | B1/B2 | ❌ missing |
| "Call it a day" | B1/B2 | ✓ exists (1 item) |
| "Piece of cake" | A2/B1 | ✓ exists (1 item) |

**Codex task — author 30 idiom items:**

Add to `placement-questions-v2.js` with `type: "idiom"`:

- **10 at A2/B1** — everyday survival phrases: "no big deal," "piece of cake," "by the way," "for sure," "kind of," "make sense," "out of nowhere," "in a hurry," "on second thought," "what's up"
- **10 at B1/B2** — common idioms: "jump to conclusions," "ring a bell," "hit the books," "spill the beans," "pull someone's leg," "tip of the tongue," "break the ice," "cost an arm and a leg," "under the weather," "once in a blue moon"
- **10 at B2/C1** — register-rich/sophisticated: "elephant in the room," "beat around the bush," "bite the bullet," "you're the one to talk," "burning the midnight oil," "the ball is in your court," "speak of the devil," "throw in the towel," "cut to the chase," "by the same token"

Use this shape per item:

```js
{
  id: "v2_b1_idiom_001",
  boundary: "A2/B1",
  type: "idiom",
  format: "idiom_meaning",
  focus: ["daily_idioms", "natural_speech"],
  skill_tags: ["recognition", "register"],
  prompt: "Arkadaşın sana çok kolay bir görev verdi. Sen ne dersin?",
  prompt_lang: "tr",
  options: [
    { id: "k",  text: "It's a piece of cake.",      role: "key" },
    { id: "a",  text: "It's really easy for me.",   role: "acceptable", credit: 0.55 },
    { id: "w",  text: "It's a piece of food.",      role: "weak", credit: 0.1 }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "No problem at all.",
    role: "acceptable",
    tier: "close",
    rationale: "Conveys ease but isn't the idiomatic equivalent — a B1 learner would pick it confidently."
  },
  estimated_difficulty: 0.35,
  estimated_discrimination: 0.78,
  lexicon: ["cake", "piece"],
  distractor_distance: "medium",
  source_grounding: [],
  source_collection: "diagnostic_v2"
}
```

---

## 3. Vocab is undertested for breadth

**Finding:** Vocab is **22%** of the pool (250/1129). For a placement test, lexical breadth is the strongest predictor of level. Vocab should be **~30–35%** for accurate placement.

**Codex task — add 60 more vocab items:**

- 15 per level × 4 levels = 60
- Focus areas: workplace / academic / hedging-adjectives / emotional-state / cause-and-effect / measurement-and-quantity (these are testably distinct per level)
- Mandatory: every new vocab item must have a `close_competitor` AND an `acceptable`-role option (per Finding #1)

Target end-state: ~310 vocab items (≈27% of pool).

---

## 4. Distractor weakness — 87 items have "obviously easier" distractors

**Finding:** In 87 active items, all distractors are dramatically different from the key in length or are very short. These items are too easy to pass via elimination.

Examples (from real audit):

| ID | Prompt | Key | Distractors | Why weak |
|---|---|---|---|---|
| `plc_a1a2_006` | "The keys are _____ the table." | on | at, in | "in" is too obviously wrong on a table; "at" doesn't fit prepositional sense |
| `plc_a1a2_009` | "This is Ayşe. _____ is my friend." | She | He, It | "He" is clearly wrong because of Ayşe; "It" insultingly wrong |
| `plc_b1b2_005` | "He said he _____ busy." | was | is, be | "be" is grammatically impossible; "is" tense-fail |

**These are LEGACY items** (`plc_*` prefix) — per the rules, **do NOT edit them**. Instead, **flag them for retirement** (don't include in future student-core re-builds).

**Codex task:**

Add a comment-block at the top of `placement-questions-v2.js` listing these IDs as "preferred-replacement candidates" so future v3 work knows what to overwrite.

I can supply the full 87-item list as a separate `.json` artifact on request.

---

## 5. Some items are under-contextualized

**Finding:** 74 non-vocab items have prompts under 25 characters. Some need richer setup for higher-level discrimination.

Worst offenders:

- `plc_a1a2_003`: "I have two _____." (could mean almost anything)
- `plc_a1a2_008`: "Listen. The baby _____." (which tense? present continuous? simple?)
- `plc_b1b2_005`: "He said he _____ busy." (no context — could be reported speech OR present tense)

**Codex task — under-context audit (smaller priority):**

For each `placement-questions-v2.js` item with prompt under 25 chars AND type ≠ `vocab`, add 1–2 sentences of natural context. Example:

```js
// Before:
prompt: "She _____ to the store every day."
// After:
prompt: "Ela starts work at 6 a.m. and is always tired by lunchtime. She _____ to the store every day before her shift."
```

(More context = higher-level discrimination because B2+ readers can still parse it but the inferential load filters A2 from B1.)

---

## 6. Quick structural-health summary (no action needed)

These are all green:

- **Items with no `key` option:** 0
- **Items with duplicate option texts:** 0
- **Items with fewer than 3 options:** 0
- **v2 items missing `close_competitor`:** 0/250
- **Naturalness/pragmatic items missing partial credit:** 0

---

## Recommended Codex work order

1. **Author the 30 missing daily-idiom items** (Section 2) → biggest UX win, takes ~2 hours
2. **Add partial-credit `acceptable` option to all v2 vocab items at B1+ and v2 collocations** (Section 1) → biggest accuracy win, takes ~1 hour
3. **Add 60 new vocab items** (Section 3) → improves placement precision, takes ~3 hours
4. **Context audit for short v2 prompts** (Section 5) → polish, takes ~1 hour

---

## Status as of May 16, 2026 — Steps 1, 2, 3 DONE. Steps 4 & 5 DEFERRED.

| Step | Status | Notes |
|---|---|---|
| 1 — Idioms | ✅ Shipped | 30 idiom items at A2/B1, B1/B2, B2/C1 levels. Includes all user-requested phrases (sacked, jump to conclusions, elephant in the room, etc.) |
| 2 — Partial credit | ✅ Shipped | 24 items got explicit `acceptable` (credit 0.5). Engine also defaults swapped-in `close_competitor` to credit 0.5 — so all 280+ v2 items now have partial credit one way or another. |
| 3 — Vocab breadth | ✅ Shipped | +48 vocab items (12 lemmas collided with existing words and were skipped). Vocab now 25% of pool. |
| **4 — Legacy distractor cleanup** | ✅ Shipped | 77 legacy `plc_*` / `gen_*` items flagged by `scripts/find-weak-distractors.cjs`. List persisted in `legacy-retirement-list.json` + `legacy-retirement.js`. Student-core `coreItems()` now filters these IDs out at runtime. Legacy files unchanged (rule honored). |
| **5 — Short-prompt context audit** | ⏸ **Deferred** | 74 non-vocab items have prompts <25 chars (e.g., "He said he ___ busy"). Adding 1–2 sentences of context would tighten level discrimination. Skipping for now since v2 idioms + new vocab already added substantial context-rich items. |

When picking up Steps 4 & 5: see Sections 4 and 5 above for the specific items and approach. Validate with the standard test suite after each change.

After Steps 1–2 ship, expect noticeable improvement in the "feels accurate" metric on real users.

---

## How to validate after each pass

```bash
cd "CEFR Placement App/claude-v2"

# Sanity
node --check placement-questions-v2.js
node diagnostic-v2-tests.js
node placement-quality-tests.js
node naturalness-scoring-tests.js
node student-core-pool-tests.js

# Then push (auto-deploys to Vercel)
git add placement-questions-v2.js
git commit -m "content: <one-line summary>"
git push origin master
```

All five tests must pass. If `naturalness-scoring-tests.js` fails after you added `acceptable` roles to vocab/collocation items, that means the test was hardcoded to expect those roles only on naturalness items — open it and broaden the assertion.
