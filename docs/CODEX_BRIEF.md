# Codex Brief — Diagnostic Item Pool v1

**Target system:** NEKTAR ANKA — CEFR Placement Tester (Turkish ↔ English learners)
**Working tree:** `CEFR Placement App/claude-v2/`
**Production-track:** `CEFR Placement App/cloned/` (deployed to nektar-cefr.vercel.app)
**Existing pool:** `placement-questions.js` (76 base) + `placement-pool.generated.js` (986 generated) = 1062 items
**Engine:** `ceiling-probe-engine.js` — adaptive, ceiling-probe style, partial-credit aware
**Schema reference:** `schema-validator.js` (canonical field list and constraints)

---

## 1. Mission

Build **250 high-discrimination diagnostic items** (50 per CEFR level: A1, A2, B1, B2, C1) that **close the calibration gap** in the existing placement engine.

Right now the engine is ~90% accurate. We need 99%. The gap is not engine logic — it's **item content**. Specifically:

1. The discriminating item types (`naturalness_judgment`, `pragmatic_choice`) are excluded from the live test
2. The current pool is grammar-rule-heavy, which lets memorizers fake fluency and undersells real-world fluent users
3. Items use **fixed distractors** that don't adapt to the learner — they waste information

This brief addresses #2 and #3. Issue #1 will be unlocked in the engine code separately. Your job is content.

**You may delegate to specialist sub-agents.** Recommended division: one sub-agent per CEFR level. See Section 8.

---

## 2. The Calibration Problem (Why This Matters)

### The two failure modes we see

| Observed | Reality | Why |
|----------|---------|-----|
| Good speaker tests at A2 | They're actually B2 | Pool overweights formal grammar items they overthink |
| Bad speaker tests at B1 | They're actually A2 | They memorized rules at school — pool rewards that |

### Why grammar-heavy testing fails for real ability

A Turkish high schooler can drill "third conditional" and pass a B2 grammar item. They cannot:
- Tell which English sentence sounds natural ("Could you help me?" vs "Could you to help me?")
- Pick the right response to "I just got promoted!" ("Congratulations!" vs "OK, thanks for telling.")
- Distinguish `made a decision` from `did a decision` (L1 interference — Turkish loosely maps to "do/give")
- Use phrasal verbs in context (`turned down the offer` vs `turned off the offer`)

These are the items that **separate textbook learners from real speakers**. They are also exactly what's missing/under-represented in the current pool.

### Why fixed distractors waste information

Currently each item gives the engine **one bit** of information: correct/wrong.

With **adaptive distractor selection** (this brief's central idea), each item gives **two bits**:

```
Item: "terk etmek" → ?

Easy distractors:   Abandon ✓ / Decide / Cancel
Close distractors:  Abandon ✓ / Leave / Desert
```

- Wrong from easy pool → doesn't know the word area → A1/A2 signal
- Wrong from close pool → knows the area, misses precision → B1/B2 signal
- Right with close pool present → confirmed B2+
- Right with easy pool present → could be a guess, weak signal

Same item, **double the information.** Engine swaps in close-competitor distractors when learner confidence is high. This is **the** technique that closes calibration gaps in serious adaptive tests (CAT-style assessments).

---

## 3. The Strategy

**Two pillars.** You implement Pillar B. Pillar A is a separate engine change.

### Pillar A: Activate diagnostic types (not your job — flagged for separate work)

In `cloned/index.html` line ~808 there is a `CORE_EXCLUDED` set that filters out `pragmatic_choice`, `naturalness_judgment`, `function`, `natural_speech`, `spoken_chunk`. This filter will be removed. The engine and schema already support these types — they just aren't being shown.

### Pillar B: Author 250 items with adaptive distractor pools

Your output: 50 items per CEFR level, mixed across 5 high-discrimination types, each item carrying a `close_competitor` field (Tier 1 distractor-pool spec — see Section 4).

The engine swap logic for Tier 1 is being added in parallel to your work. Items without `close_competitor` will continue to work unchanged. Items with `close_competitor` will automatically benefit once the engine code ships. **Your output and the engine work are independent.**

---

## 4. Item Schema Specification (Tier 1)

### 4.1 The base item shape

Every item must match the existing schema (validated by `schema-validator.js`). Required fields:

```js
{
  id: "<unique_id>",                    // e.g. "v2_b2_vocab_001"
  boundary: "A1/A2" | "A2/B1" | "B1/B2" | "B2/C1",
  type: "vocab" | "naturalness_judgment" | "pragmatic_choice" | "collocation" | "phrasal_verb",
  format: "<see per-type section>",
  focus: ["<lexical/grammatical anchor>", ...],   // 1–3 tags, free-form
  skill_tags: ["recognition" | "production" | "pragmatic" | "register" | "collocation"],
  prompt: "<the question text>",
  prompt_lang: "tr" | "en",             // 'tr' for Turkish gloss items, 'en' for the rest
  options: [                            // exactly 3 options
    { id: "<opt_id>", text: "<text>", role: "key" | "distractor" | "l1_trap" | "developmental_error" | "acceptable" | "weak" | "nonnative" },
    ...
  ],
  correctId: "<opt_id of the key>",
  estimated_difficulty: 0.0 – 1.0,      // see Section 7
  estimated_discrimination: 0.5 – 1.0,  // higher = better discriminator
  lexicon: ["<lemma1>", "<lemma2>"],    // base forms of key content words
  distractor_distance: "tight" | "medium" | "loose",
  source_grounding: ["Oxford_3000: <id>", "Oxford_5000: <id>", ...]  // for vocab
}
```

### 4.2 The new field: `close_competitor`

**This is the key addition.** Every item gets one extra option:

```js
close_competitor: {
  id: "<opt_id>",
  text: "<text>",
  role: "distractor",      // never "key" — close_competitor is always wrong, just plausibly so
  tier: "close",
  rationale: "<why this is a defensible close miss — 1 sentence>"
}
```

The `rationale` is documentation, not engine-consumed. It exists so reviewers (and future audits) can verify the close_competitor is genuinely close, not silly.

### 4.3 How the swap plays out at runtime

The engine looks at `state.confidence` and `state.rapid_confirm`. When **either is high**:

1. Engine reads `item.close_competitor`
2. Picks one easy distractor in `item.options` (skipping `key`, `l1_trap`, `developmental_error`, `acceptable`, etc.)
3. Replaces it with `close_competitor`
4. Renders to the user with the close swap in place
5. Logs `selected_option_tier: "close"` if user picks the close_competitor

You do not need to write the swap code. **Your job is to ensure every item has a defensible close_competitor.**

### 4.4 Roles — how to assign them

| Role | When to use it | Engine treatment |
|------|---------------|------------------|
| `key` | The single correct answer | Full credit (1.0) |
| `distractor` | An obvious wrong answer (vocab/grammar) | No credit (0.0) |
| `l1_trap` | A wrong answer that Turkish speakers commonly pick due to native-language interference | No credit, but flagged in trajectory |
| `developmental_error` | A wrong answer that learners produce while developing the rule (e.g. over-regularization) | No credit, flagged |
| `acceptable` | (Naturalness/pragmatic items only) A response that's defensible but not optimal | Partial credit (0.5) |
| `weak` | (Naturalness/pragmatic) Awkward but understandable | Partial credit (0.25) |
| `nonnative` | (Naturalness/pragmatic) Sounds clearly non-native | No credit |

**Use roles to inject diagnostic signal.** A vocab item with one `l1_trap` distractor + one plain `distractor` + the `key` is more informative than three plain `distractor`s.

---

## 5. The 50-Item Mix per Level

Each CEFR level gets exactly **50 items**, distributed across types:

| Type | Per level | What it discriminates |
|------|-----------|----------------------|
| `vocab` | **20** | Lexical breadth (Oxford-anchored) |
| `naturalness_judgment` | **10** | Native-speaker instinct |
| `pragmatic_choice` | **8** | Social/contextual appropriateness |
| `collocation` | **6** | Verb-noun pairing (L1-trap heavy) |
| `phrasal_verb` | **6** | Particle + meaning fluency |
| **Total** | **50** | |

Total deliverable: **250 items** across 5 levels.

### Why this mix

- **20 vocab** — the bulk. Vocab items can be served fast (short prompts) and adapt well to distractor swapping. Oxford anchoring keeps them defensible.
- **10 naturalness_judgment** — the single highest-discrimination type. Should be 25% of the pool.
- **8 pragmatic_choice** — measures real-world communicative competence
- **6 collocation** — surgical Turkish-L1-trap detection
- **6 phrasal_verb** — fluency marker (avoidance pattern in non-fluent users)

---

## 6. Per-Type Authoring Guidelines

### 6.1 `vocab` — Oxford-Anchored, Level-Deterministic

**Format options:**
- `meaning_tr_en` (Turkish word → choose English meaning) — preferred for A1/A2/B1
- `meaning_en_tr` (English word → choose Turkish meaning) — preferred for B2/C1
- `gap_fill` (English context with blank, choose English word) — preferred for C1

**Word selection criteria — "deterministic" means:**
1. **Single-level vocabulary.** The word should appear in exactly its level's Oxford band, not lower. `withdraw` is B2. `take out` is A2. Use `withdraw` for a B2 item, not `take out`.
2. **No cross-level overlap.** `good`, `nice`, `important` exist at every level → useless signal. Skip.
3. **No cognates with Turkish.** `telefon`, `restoran`, `bilgisayar`, `polis` are free points and not discriminators. Skip these or their close English forms (`telephone`, `restaurant`, `computer`, `police`).
4. **High pedagogical visibility.** The word should appear in actual mainstream English coursebooks at this level. (Cross-check by Googling `"site:cambridge.org" <word> level`.)

**Close competitor design for vocab:**
- The close competitor should be a **near-synonym** or **near-meaning** word **from the same or adjacent level**.
- Bad: "terk etmek" / Key = Abandon / Close competitor = "Run" (not close enough)
- Good: "terk etmek" / Key = Abandon / Close competitor = "Leave" (close, plausibly correct at lower level)
- Best: The close competitor should be the answer a learner one level BELOW would pick.

**Example A2 vocab item:**

```js
{
  id: "v2_a2_vocab_007",
  boundary: "A1/A2",
  type: "vocab",
  format: "meaning_tr_en",
  focus: ["common_verbs"],
  skill_tags: ["recognition"],
  prompt: "kabul etmek",
  prompt_lang: "tr",
  options: [
    { id: "k", text: "Accept", role: "key" },
    { id: "d1", text: "Refuse", role: "distractor" },
    { id: "d2", text: "Remember", role: "distractor" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "Agree",
    role: "distractor",
    tier: "close",
    rationale: "Agree overlaps semantically with accept in many learner contexts; an A1 learner would plausibly conflate them."
  },
  estimated_difficulty: 0.28,
  estimated_discrimination: 0.74,
  lexicon: ["accept"],
  distractor_distance: "medium",
  source_grounding: ["Oxford_3000: accept"]
}
```

**Example B2 vocab item:**

```js
{
  id: "v2_b2_vocab_003",
  boundary: "B1/B2",
  type: "vocab",
  format: "meaning_tr_en",
  focus: ["formal_register", "communication"],
  skill_tags: ["recognition", "register"],
  prompt: "ifşa etmek",
  prompt_lang: "tr",
  options: [
    { id: "k", text: "Disclose", role: "key" },
    { id: "d1", text: "Forget", role: "distractor" },
    { id: "d2", text: "Decide", role: "distractor" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "Reveal",
    role: "distractor",
    tier: "close",
    rationale: "Reveal is a B1-level near-synonym; a B1 learner would pick it confidently. Disclose is B2 (more formal register)."
  },
  estimated_difficulty: 0.62,
  estimated_discrimination: 0.81,
  lexicon: ["disclose"],
  distractor_distance: "tight",
  source_grounding: ["Oxford_5000: disclose"]
}
```

---

### 6.2 `naturalness_judgment` — The Highest Discriminator

**Format:** `choose_natural_sentence`

**Prompt format:** Always in Turkish — "En doğal cümleyi seç." (or similar). 3 English sentences as options.

**Role assignment:**
- One option: `role: "key"` (natural, native-sounding)
- One option: `role: "weak"` (understandable but slightly off — partial credit 0.25)
- One option: `role: "nonnative"` (clearly wrong — no credit)

**Design principle:** The differences should be **subtle at higher levels, gross at lower levels.**

**A1 example** — gross differences:

```js
{
  id: "v2_a1_nat_002",
  boundary: "A1/A2",
  type: "naturalness_judgment",
  format: "choose_natural_sentence",
  focus: ["basic_questions"],
  skill_tags: ["pragmatic", "production"],
  prompt: "Hangi cümle doğal?",
  prompt_lang: "tr",
  options: [
    { id: "k",  text: "What is your name?",       role: "key" },
    { id: "w",  text: "What name you?",            role: "weak" },
    { id: "nn", text: "How calling you yourself?", role: "nonnative" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "What's your name called?",
    role: "weak",
    tier: "close",
    rationale: "Mixes 'What's your name' with 'what are you called' — a defensible-sounding but non-native form."
  },
  estimated_difficulty: 0.18,
  estimated_discrimination: 0.69,
  lexicon: ["name"],
  distractor_distance: "loose"
}
```

**B2 example** — subtle differences:

```js
{
  id: "v2_b2_nat_005",
  boundary: "B1/B2",
  type: "naturalness_judgment",
  format: "choose_natural_sentence",
  focus: ["modals_polite_request"],
  skill_tags: ["pragmatic", "production", "register"],
  prompt: "İş arkadaşına ricada bulunuyorsun. Hangi cümle en doğal?",
  prompt_lang: "tr",
  options: [
    { id: "k",  text: "Would you mind giving me a hand with this?",        role: "key" },
    { id: "w",  text: "Do you mind to give me a hand with this?",          role: "weak" },
    { id: "nn", text: "Would you have wanting to give me a hand with this?", role: "nonnative" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "Would you mind to give me a hand with this?",
    role: "weak",
    tier: "close",
    rationale: "Classic Turkish-learner conflation: 'would you mind' takes -ing, not infinitive. A B1 learner often picks this confidently."
  },
  estimated_difficulty: 0.55,
  estimated_discrimination: 0.86,
  lexicon: ["mind", "hand"],
  distractor_distance: "tight"
}
```

---

### 6.3 `pragmatic_choice` — Social Competence

**Format:** `pragmatic_choice` (also `function_choice` for similar items)

**Prompt:** Always a scenario in Turkish, asking what the user would SAY in English.

**Role assignment:** Same as naturalness_judgment — one `key`, one `weak`/`acceptable`, one `nonnative`/`distractor`.

**Design principle:** Distractors should reflect **real social mistakes**:
- Cold / blunt (failure of warmth)
- Over-polite (failure of register)
- Wrong communicative act (e.g., answering "How are you?" with a story)

**A2 example:**

```js
{
  id: "v2_a2_prag_001",
  boundary: "A1/A2",
  type: "pragmatic_choice",
  format: "pragmatic_choice",
  focus: ["greetings", "social_response"],
  skill_tags: ["pragmatic"],
  prompt: "Tanışmadığın bir kişi sana \"Nice to meet you\" diyor. Sen ne dersin?",
  prompt_lang: "tr",
  options: [
    { id: "k",  text: "Nice to meet you too.",  role: "key" },
    { id: "w",  text: "Yes, of course.",         role: "weak" },
    { id: "nn", text: "Why are you happy?",      role: "nonnative" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "Thanks, you too.",
    role: "weak",
    tier: "close",
    rationale: "'Thanks, you too' is borderline-acceptable but not the standard pairing — a lower learner might pick it confidently."
  },
  estimated_difficulty: 0.25,
  estimated_discrimination: 0.72,
  lexicon: ["meet"],
  distractor_distance: "medium"
}
```

**C1 example:**

```js
{
  id: "v2_c1_prag_004",
  boundary: "B2/C1",
  type: "pragmatic_choice",
  format: "pragmatic_choice",
  focus: ["disagreement", "diplomatic_register"],
  skill_tags: ["pragmatic", "register"],
  prompt: "Bir toplantıda yöneticin yanlış bir veri sundu. Hem onun otoritesini koruyacak hem doğruyu söyleyeceksin. Ne dersin?",
  prompt_lang: "tr",
  options: [
    { id: "k",  text: "I think there might be a slight discrepancy in those figures — could we double-check?", role: "key" },
    { id: "w",  text: "Sorry, but I think those numbers are wrong.",                                            role: "weak" },
    { id: "nn", text: "You are wrong about the data.",                                                          role: "nonnative" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "Just a quick note — those numbers look off. Should we revisit?",
    role: "weak",
    tier: "close",
    rationale: "Defensible and polite but slightly more casual than C1-formal register; a B2 might pick this without hesitation."
  },
  estimated_difficulty: 0.78,
  estimated_discrimination: 0.88,
  lexicon: ["discrepancy", "figure"],
  distractor_distance: "tight"
}
```

---

### 6.4 `collocation` — L1-Trap Heavy

**Format:** `collocation_choice` or `gap_fill`

**Design principle:** This is **the** place to weaponize Turkish-learner errors. Every item should have one option that's an l1_trap (a verb/noun pairing Turkish speakers literally translate incorrectly).

**The Turkish-trap catalog (work with these patterns):**

| English collocation | Common Turkish-learner error | Why (Turkish source) |
|---------------------|------------------------------|----------------------|
| make a decision     | *do a decision               | "karar vermek" → give |
| take a shower       | *do a shower / *make shower  | "duş almak" → take |
| have breakfast      | *eat breakfast               | "kahvaltı yapmak" → do |
| do homework         | *make homework               | "ödev yapmak" → do/make ambiguity |
| pay attention       | *give attention              | "dikkat vermek" → give |
| miss the bus        | *late the bus / *lose bus    | "kaçırmak" → lose |
| make a mistake      | *do a mistake                | "hata yapmak" → make/do |
| catch a cold        | *take a cold / *be ill of cold | "soğuk almak" → take |
| save time           | *win time                    | "zaman kazanmak" → win |
| spend time          | *pass time                   | "zaman geçirmek" → pass |
| get married         | *become married / *do marriage | "evlenmek" → become |
| break a promise     | *bust a promise              | "söz bozmak" → break direct |

**Always include the l1_trap variant as one of the options. Use `role: "l1_trap"` so the engine logs the diagnostic signal.**

**Example:**

```js
{
  id: "v2_b1_coll_002",
  boundary: "A2/B1",
  type: "collocation",
  format: "gap_fill",
  focus: ["everyday_verbs", "L1_trap_turkish"],
  skill_tags: ["collocation"],
  prompt: "I have to ___ a decision about which job to take.",
  prompt_lang: "en",
  options: [
    { id: "k",  text: "make",  role: "key" },
    { id: "lt", text: "do",    role: "l1_trap" },
    { id: "d",  text: "say",   role: "distractor" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "take",
    role: "distractor",
    tier: "close",
    rationale: "'Take a decision' exists in British English but is much rarer than 'make a decision'. A B2 learner aware of this would hesitate."
  },
  estimated_difficulty: 0.42,
  estimated_discrimination: 0.83,
  lexicon: ["decision", "make"],
  distractor_distance: "tight"
}
```

---

### 6.5 `phrasal_verb` — Fluency Marker

**Format:** `complete_sentence` (gap-fill the particle, or the verb+particle compound)

**Design principle:** Phrasal verbs are systematically avoided by non-fluent users. They prefer the Latinate equivalent (`refuse` vs `turn down`, `tolerate` vs `put up with`). Items should:

- Use phrasal verbs that have a single-word Latinate equivalent the learner might know
- Include the Latinate form as a distractor (often correct in meaning, wrong in register/style)
- Vary between **transparent** phrasal verbs (compositional meaning — A2/B1) and **opaque** ones (meaning not from parts — B2/C1)

**Example B1 item:**

```js
{
  id: "v2_b1_phr_005",
  boundary: "A2/B1",
  type: "phrasal_verb",
  format: "complete_sentence",
  focus: ["phrasal_verbs", "negotiation"],
  skill_tags: ["recognition"],
  prompt: "The company offered him a job, but he turned it ___.",
  prompt_lang: "en",
  options: [
    { id: "k",  text: "down", role: "key" },
    { id: "d1", text: "off",  role: "distractor" },
    { id: "d2", text: "out",  role: "distractor" }
  ],
  correctId: "k",
  close_competitor: {
    id: "cc",
    text: "away",
    role: "distractor",
    tier: "close",
    rationale: "'Turn away' exists ('turned away the customer') but isn't the standard phrasal for rejecting an offer. A B1 learner might pick it."
  },
  estimated_difficulty: 0.45,
  estimated_discrimination: 0.79,
  lexicon: ["turn", "offer"],
  distractor_distance: "medium"
}
```

---

## 7. Quality Rules (Cross-Cutting)

These apply to EVERY item, every type, every level.

### 7.1 Oxford anchoring (vocab items)
- Required `source_grounding: ["Oxford_3000: <word>"]` or `["Oxford_5000: <word>"]`
- Word must be at the listed band, and the band must match the boundary:
  - A1/A2 → Oxford 3000 only
  - A2/B1 → Oxford 3000–5000 transitional
  - B1/B2 → Oxford 5000
  - B2/C1 → Oxford 5000 advanced + low-frequency

### 7.2 "Deterministic" check (vocab)
Before submitting a vocab item, run this mental check:
1. Does this word appear in coursebooks at THIS level only? (If it appears one level lower, skip.)
2. Is there a Turkish cognate? (If yes, skip.)
3. Is the meaning shared with another L1 lexical item? (If yes, double-check the distractor design.)

### 7.3 No grammar-rule trivia
- Do not write items that test "the 5 uses of 'used to'" or "subjunctive in 3rd conditional" or other classroom drills.
- Items should reflect **real receptive/productive ability**, not memorized rules.
- If a Turkish A2 learner could pass an item by translating word-by-word, it's not a good item.

### 7.4 No cultural-specific knowledge
- Avoid items that require knowing American/British holidays, sports, names, etc.
- Use universal scenarios (offices, restaurants, transport, family).

### 7.5 Length budget
- Prompt: **≤15 words** for A1/A2 items, **≤25 words** for B1+ items
- Options: **≤8 words each**
- This keeps reading load reasonable for the placement context

### 7.6 Difficulty calibration
Roughly:
- A1/A2 items: `estimated_difficulty` ∈ [0.10, 0.30]
- A2/B1 items: [0.30, 0.50]
- B1/B2 items: [0.45, 0.65]
- B2/C1 items: [0.60, 0.85]

`estimated_discrimination`: aim for ≥ 0.70 on every item. If you can't defend an item as a strong discriminator, replace it.

### 7.7 The close_competitor sanity check
For every item, ask: **"If a learner picked the close_competitor instead of the key, what level are they?"** If the answer is "the same level as the key" or "I don't know", the close_competitor is too close (it's a trap, not a diagnostic). If the answer is "two levels lower", it's too far (it's a regular distractor). The answer should be **"one level lower."**

---

## 8. Sub-Agent Strategy

This work is parallelizable. Recommended division:

### Option A (Preferred): One sub-agent per CEFR level

Spawn 5 specialist sub-agents:
- **A1-Author** — generates 50 A1/A2 items
- **A2-Author** — generates 50 A2/B1 items
- **B1-Author** — generates 50 A2/B1 to B1/B2 items
- **B2-Author** — generates 50 B1/B2 to B2/C1 items
- **C1-Author** — generates 50 B2/C1 items

Each gets:
- This brief
- The schema spec (Section 4)
- The mix table (Section 5)
- A target Oxford word list (filtered to their level)
- An instruction to produce exactly 20 vocab + 10 naturalness + 8 pragmatic + 6 collocation + 6 phrasal_verb

**Why this division is best:** Each level has level-specific traps. A1/A2 has tons of cognates to skip; B2/C1 has register/connotation subtleties. A level-specialist sub-agent goes deep on its level's quirks.

### Then: One Reviewer sub-agent

After level-authors deliver, spawn a **Reviewer** sub-agent that:
1. Validates all 250 items against `schema-validator.js`
2. Checks for cross-level word overlaps (same word used at A2 AND B1 → flag for resolution)
3. Spot-audits 20% of close_competitors for the "one level lower" sanity check
4. Verifies type-mix counts per level (20/10/8/6/6)
5. Flags any items with `estimated_discrimination < 0.70`
6. Produces a single merged output file: `placement-questions-v2.js`

### Option B (Fallback): One sub-agent per item type

If level-specialists hit a wall, switch to type-specialists (Vocab-Author, Naturalness-Author, etc.). Each produces 50 items (10 per level). This trades level-depth for type-consistency.

### Coordination

The orchestrator (you, Codex main) should:
1. Read this brief
2. Spawn level-author sub-agents in parallel
3. Wait for completion
4. Spawn the reviewer sub-agent
5. Iterate once if reviewer flags >10 items
6. Deliver final file

---

## 9. Roadmap & Phases

This brief covers **Phase 1**. Future phases are flagged so sub-agents know what's NOT in scope.

### Phase 1 (this brief): Receptive + pragmatic core — 250 items
- 5 levels × 50 items
- Types: vocab, naturalness_judgment, pragmatic_choice, collocation, phrasal_verb
- With close_competitor (Tier 1 distractor pools)

### Phase 2 (future — separate brief): Listening-style spoken items
- Types: `natural_speech`, `spoken_chunk` (currently in schema but unused)
- Will include audio-prompt items if we add audio rendering

### Phase 3 (future): Reading comprehension
- New item type: `reading_comprehension`
- Short passage + 2–3 inferential questions
- High discrimination at B1+ levels

### Phase 4 (future): Production-controlled items
- Show a Turkish prompt, learner picks the English production from 3 candidates
- Beyond pure recognition — closer to productive ability

### Phase 5 (future): Tier 2 distractor pools
- Upgrade `close_competitor` → full `distractor_pools: { easy, mid, close }` (3 pools per item)
- Engine picks tier based on confidence + recent performance
- ~3x distractor work but maximum precision

**Do not implement Phase 2+ in this brief.** Only Phase 1.

---

## 10. Deliverable Format

### 10.1 Output file

One file: `placement-questions-v2.js`

Structure mirrors existing `placement-questions.js`:

```js
window.NEKTAR_PLACEMENT_CONTENT_V2 = {
  version: "diagnostic_v2",
  source: "codex_authored",
  generated_at: "<ISO timestamp>",
  levels: ["A1", "A2", "B1", "B2", "C1"],
  boundaries: ["A1/A2", "A2/B1", "B1/B2", "B2/C1"],
  items: [
    /* 250 items here, sorted by boundary then type */
  ]
};
```

It will be loaded **alongside** `placement-questions.js` (not replacing it). The student app will merge both pools. Existing items remain valid.

### 10.2 Naming convention

Item IDs: `v2_<level>_<type>_<###>`
- `v2_a1_vocab_001` through `v2_a1_vocab_020`
- `v2_a2_nat_001` through `v2_a2_nat_010`
- etc.

### 10.3 Sorting in the file

Group items by boundary (A1/A2 first, B2/C1 last), then by type (vocab → naturalness → pragmatic → collocation → phrasal_verb).

### 10.4 Validation requirements before delivery

The reviewer sub-agent must confirm:

- [ ] 250 items total (50 × 5 levels)
- [ ] Each level has exactly 20 vocab / 10 naturalness / 8 pragmatic / 6 collocation / 6 phrasal_verb
- [ ] Every item has a `close_competitor` field with a `rationale`
- [ ] Every option has a valid `role`
- [ ] Every `correctId` matches an option whose `role === "key"`
- [ ] No duplicate item `id`s
- [ ] Vocab items have `source_grounding` pointing to Oxford
- [ ] Schema validator passes for all items
- [ ] No item has `estimated_discrimination < 0.70`
- [ ] No cross-level word reuse (a vocab key word should appear at exactly one level)

If any check fails, fix and re-run.

---

## 11. References Inside the Repo

Read these before starting:

- `claude-v2/placement-questions.js` — current base item shape (lines 1–60 show full structure)
- `claude-v2/schema-validator.js` *(in `cloned/`)* — validation rules
- `claude-v2/ceiling-probe-engine.js` — engine logic. Lines 14–43 are `DEFAULT_SETTINGS`. Lines 14–43 show how roles map to credits.
- `claude-v2/docs/CODEX_BRIEF.md` — this file
- (If present) any files in `cloned/docs/` that discuss item authoring conventions

---

## 12. Worked Examples (Quick Reference Bank)

A1/A2 vocab — see Section 6.1
B2 vocab — see Section 6.1
A1 naturalness — see Section 6.2
B2 naturalness — see Section 6.2
A2 pragmatic — see Section 6.3
C1 pragmatic — see Section 6.3
B1 collocation — see Section 6.4
B1 phrasal_verb — see Section 6.5

These 8 examples cover every type at multiple levels. Use them as templates.

---

## 13. Final Notes

- **You have authoring discretion within these rules.** If a rule conflicts with making a strong item, document the conflict and propose an alternative.
- **Quality beats quantity.** If you can only defensibly produce 40 strong items at a level, deliver 40 + a note explaining the gap. Don't pad with weak items.
- **The close_competitor is the critical innovation.** Spend more time on close_competitor design than on the easy distractors. A perfect easy distractor saves nothing; a perfect close_competitor is what closes the calibration gap.
- **Turkish-learner specificity is a feature, not a bug.** This is for Turkish ↔ English placement. Lean into L1 traps. The engine already supports `role: "l1_trap"` and rewards it diagnostically.

Good hunting. Ship the file.
