const assert = require("assert");

global.window = {};

const Validator = require("./schema-validator.js");
const Engine = require("./ceiling-probe-engine.js");
require("./placement-questions.js");
require("./placement-pool.generated.js");
require("./placement-questions-v2.js");

const legacy = global.window.NEKTAR_PLACEMENT_CONTENT;
const contentV2 = global.window.NEKTAR_PLACEMENT_CONTENT_V2;
const items = contentV2.items;

// Per-level expected mix. May 2026 update — idiom items added at B1+ via daily-phrase pack.
const expectedMix = {
  A1: { vocab: 20, naturalness_judgment: 10, pragmatic_choice: 8, collocation: 6, phrasal_verb: 6, idiom: 0 },
  A2: { vocab: 20, naturalness_judgment: 10, pragmatic_choice: 8, collocation: 6, phrasal_verb: 6, idiom: 0 },
  B1: { vocab: 20, naturalness_judgment: 10, pragmatic_choice: 8, collocation: 6, phrasal_verb: 6, idiom: 10 },
  B2: { vocab: 20, naturalness_judgment: 10, pragmatic_choice: 8, collocation: 6, phrasal_verb: 6, idiom: 10 },
  C1: { vocab: 20, naturalness_judgment: 10, pragmatic_choice: 8, collocation: 6, phrasal_verb: 6, idiom: 10 }
};
const expectedLevelTotals = { A1: 50, A2: 50, B1: 60, B2: 60, C1: 60 };
const expectedTotal = Object.values(expectedLevelTotals).reduce((a, b) => a + b, 0); // 280

const report = Validator.validatePayload(contentV2, { sourceLabel: "diagnostic-v2-tests" });
assert.equal(report.summary.errorCount, 0, JSON.stringify(report.issues.filter((issue) => issue.severity === "error"), null, 2));
assert.equal(items.length, expectedTotal, `diagnostic v2 pool must contain exactly ${expectedTotal} items`);

const seenIds = new Set();
const vocabLemmasByLevel = new Map();
for (const item of items) {
  assert(!seenIds.has(item.id), `duplicate item id: ${item.id}`);
  seenIds.add(item.id);

  assert.equal(item.source_collection, "diagnostic_v2", `${item.id} should be marked diagnostic_v2`);
  assert(item.close_competitor, `${item.id} missing close_competitor`);
  assert(item.close_competitor.rationale, `${item.id} missing close_competitor rationale`);
  assert.notEqual(item.close_competitor.role, "key", `${item.id} close_competitor cannot be key`);
  assert(item.estimated_discrimination >= 0.7, `${item.id} discrimination below 0.70`);

  const key = item.options.find((option) => option.id === item.correctId);
  assert(key, `${item.id} correctId does not point to an option`);
  assert.equal(key.role, "key", `${item.id} correct option must have key role`);

  const visible = item.options.map((option) => option.text.trim().toLowerCase());
  assert.equal(new Set(visible).size, visible.length, `${item.id} has duplicate visible options`);
  assert(!visible.includes(item.close_competitor.text.trim().toLowerCase()), `${item.id} close_competitor duplicates an option`);

  if (item.type === "vocab") {
    assert((item.source_grounding || []).some((entry) => /^Oxford_(3000|5000):/.test(entry)), `${item.id} vocab item lacks Oxford grounding`);
    for (const lemma of item.lexicon || []) {
      const lower = String(lemma).toLowerCase();
      if (!vocabLemmasByLevel.has(lower)) vocabLemmasByLevel.set(lower, item.cefr_level);
      assert.equal(vocabLemmasByLevel.get(lower), item.cefr_level, `vocab lemma reused across levels: ${lower}`);
    }
  }

  const engine = Engine.createEngine([item], { seed: `swap-${item.id}`, startBoundary: item.boundary, standardMinItems: 1, maxItems: 2 });
  engine.state.confidence = "high";
  engine.state.items_seen_ids = [];
  engine.selectNextItem("close_swap_test");
  assert.equal(engine.currentItem._distractor_tier_used, "close_swapped", `${item.id} did not render with close swap at high confidence`);
  assert(engine.currentItem.options.some((option) => option.tier === "close"), `${item.id} close option missing after swap`);
}

const byLevelType = {};
for (const item of items) {
  const key = `${item.cefr_level}|${item.type}`;
  byLevelType[key] = (byLevelType[key] || 0) + 1;
}

for (const level of contentV2.levels) {
  const levelTotal = items.filter((item) => item.cefr_level === level).length;
  assert.equal(levelTotal, expectedLevelTotals[level], `${level} must contain exactly ${expectedLevelTotals[level]} items`);
  const mixForLevel = expectedMix[level] || {};
  for (const [type, expected] of Object.entries(mixForLevel)) {
    assert.equal(byLevelType[`${level}|${type}`] || 0, expected, `${level} ${type} count mismatch (expected ${expected})`);
  }
}

const legacyExcluded = new Set(["function", "pragmatic_choice", "naturalness_judgment", "natural_speech", "spoken_chunk"]);
const mergedStudentCore = (legacy.items || []).concat(items).filter((item) =>
  item.source_collection === "diagnostic_v2" || !legacyExcluded.has(item.type)
);
assert(mergedStudentCore.some((item) => item.source_collection === "diagnostic_v2" && item.type === "naturalness_judgment"), "student core should include v2 naturalness items");
assert(mergedStudentCore.some((item) => item.source_collection === "diagnostic_v2" && item.type === "pragmatic_choice"), "student core should include v2 pragmatic items");
assert.equal(mergedStudentCore.length, 799 + expectedTotal, `student core should be 799 legacy active + ${expectedTotal} diagnostic v2 items`);

console.log("diagnostic v2 tests passed");
