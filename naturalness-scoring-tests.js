const assert = require("assert");

const Engine = require("./ceiling-probe-engine.js");
const Validator = require("./schema-validator.js");

function naturalnessItem(overrides = {}) {
  return {
    id: "gen_b1b2_function_901",
    boundary: "B1/B2",
    type: "function",
    format: "naturalness_judgment",
    scoring_style: "naturalness_judgment",
    prompt_lang: "en",
    instruction_tr: "Duruma en dogal cevabi secin.",
    prompt: "Your colleague asks for a deadline extension in a polite work chat.",
    focus: ["pragmatic_naturalness", "polite_requests"],
    skill_tags: ["function", "naturalness", "work_chat"],
    lexicon: ["deadline extension"],
    source_grounding: ["CEFR_B1_polite_requests"],
    signal: "Polite workplace requests can be acceptable without being the single most natural answer.",
    distractor_distance: "near",
    estimated_difficulty: 0.66,
    estimated_discrimination: 0.42,
    family_id: "nat_scoring_fixture",
    correctId: "o1",
    options: [
      { id: "o1", text: "Would it be possible to have a little more time?", role: "key", credit: 1, naturalness: "key" },
      { id: "o2", text: "Could I have more time, please?", role: "acceptable", credit: 0.7, naturalness: "acceptable" },
      { id: "o3", text: "I want you give me more time.", role: "weak_nonnative", credit: 0.3, naturalness: "weak_nonnative" }
    ],
    rationale: {
      o1: "Most natural and appropriately indirect.",
      o2: "Acceptable, but less naturally framed for a workplace chat.",
      o3: "Understandable intent, but the wording is nonnative and too direct."
    },
    ...overrides
  };
}

function roleBasedItem() {
  return {
    id: "gen_b1b2_grammar_901",
    boundary: "B1/B2",
    type: "grammar",
    format: "gap_fill",
    prompt_lang: "en",
    instruction_tr: "Bosluk icin dogru secenegi secin.",
    prompt: "If I had known, I _____ earlier.",
    focus: ["conditionals"],
    skill_tags: ["grammar", "conditionals"],
    lexicon: ["known"],
    source_grounding: ["EGP_B1_conditionals"],
    signal: "Third conditional form requires would have.",
    distractor_distance: "medium",
    estimated_difficulty: 0.64,
    estimated_discrimination: 0.39,
    family_id: "role_scoring_fixture",
    correctId: "o1",
    options: [
      { id: "o1", text: "would have called", role: "key" },
      { id: "o2", text: "will call", role: "l1_trap" },
      { id: "o3", text: "would called", role: "developmental_error" }
    ],
    trap: {
      o2: "Tense transfer trap.",
      o3: "Missing auxiliary have."
    }
  };
}

function createEngine(item) {
  return Engine.createEngine([item], {
    seed: `naturalness-${item.id}`,
    startBoundary: item.boundary,
    mode: "standard",
    standardMinItems: 6,
    maxItems: 6
  });
}

const validation = Validator.validatePayload([naturalnessItem(), roleBasedItem()], { sourceLabel: "inline-naturalness-tests" });
assert.equal(validation.summary.errorCount, 0, JSON.stringify(validation.issues.filter((issue) => issue.severity === "error"), null, 2));

const acceptable = createEngine(naturalnessItem());
const acceptableResult = acceptable.answer("o2", acceptable.thresholds(acceptable.currentItem).fast + 500);
assert.equal(acceptableResult.logEntry.selected_credit, 0.7);
assert.deepEqual(acceptableResult.logEntry.naturalness, {
  style: "naturalness_judgment",
  label: "acceptable",
  credit: 0.7
});
assert.equal(acceptableResult.logEntry.response_category, "partial_credit");
assert.equal(acceptableResult.logEntry.engine_action, "confirm_boundary");
assert.equal(acceptable.state.consecutive_wrong, 0);
assert.equal(acceptable.state.boundary_evidence["B1/B2"].partial_credit_count, 1);
assert.equal(acceptable.state.boundary_evidence["B1/B2"].l1_trap, 0);
assert.equal(acceptable.state.boundary_results["B1/B2"], "uncertain");
assert(acceptable.state.adaptive_difficulty_target <= acceptableResult.logEntry.adaptive_difficulty_target);

const weak = createEngine(naturalnessItem({ id: "gen_b1b2_function_902" }));
const weakResult = weak.answer("o3", weak.thresholds(weak.currentItem).fast + 500);
assert.equal(weakResult.logEntry.selected_credit, 0.3);
assert.equal(weakResult.logEntry.naturalness.label, "weak_nonnative");
assert.equal(weakResult.logEntry.response_category, "partial_credit");
assert.equal(weakResult.logEntry.engine_action, "retest_same_boundary");
assert.notEqual(weakResult.logEntry.engine_action, "probe_down");
assert.equal(weak.state.consecutive_wrong, 0);
assert.equal(weak.state.error_profile.partial_credit_count, 1);

const slowPartial = createEngine(naturalnessItem({ id: "gen_b1b2_function_903" }));
const slowResult = slowPartial.answer("o2", slowPartial.thresholds(slowPartial.currentItem).slow + 50);
assert.equal(slowResult.logEntry.response_category, "partial_credit_slow");
assert.equal(slowPartial.state.boundary_evidence["B1/B2"].uncertain, 1);
assert.equal(slowResult.logEntry.engine_action, "confirm_boundary");

const oldStyle = createEngine(roleBasedItem());
const oldResult = oldStyle.answer("o1", oldStyle.thresholds(oldStyle.currentItem).fast + 500);
assert.equal(oldResult.logEntry.selected_credit, 1);
assert.equal(oldResult.logEntry.naturalness, null);
assert.equal(oldResult.logEntry.selected_role, "key");
assert.equal(oldResult.logEntry.response_category, "correct_normal");

console.log("naturalness scoring tests passed");
