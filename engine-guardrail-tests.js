const assert = require("assert");

global.window = {
  NEKTAR_PLACEMENT_CONTENT: {
    items: [],
    boundaries: ["A1/A2", "A2/B1", "B1/B2", "B2/C1"]
  }
};

const Engine = require("./ceiling-probe-engine.js");
require("./placement-pool.generated.js");

const items = global.window.NEKTAR_PLACEMENT_CONTENT.items;
const boundaryIndex = (boundary) => Engine.BOUNDARIES.indexOf(boundary);

function run(name, startBoundary, pattern, settings = {}) {
  const engine = Engine.createEngine(items, {
    seed: `guardrail-${name}`,
    startBoundary,
    mode: "standard",
    standardMinItems: 8,
    maxItems: 20,
    ...settings
  });
  Engine.runAnswerPattern(engine, pattern);
  return engine;
}

function last(engine) {
  return engine.state.response_log.at(-1);
}

function actions(engine) {
  return engine.state.response_log.map((entry) => entry.engine_action);
}

function boundariesAfter(engine) {
  return engine.state.response_log.map((entry) => entry.state_after.current_boundary);
}

const t1 = run("no-single-wrong-collapse", "A2/B1", "correct, wrong_l1");
assert(boundaryIndex(t1.state.current_boundary) >= boundaryIndex("A2/B1"), "single B1/B2 L1 trap must not collapse below A2/B1");
assert.equal(last(t1).engine_action, "retest_same_boundary");

const t2 = run("a2b1-mixed-stays", "A2/B1", "wrong_l1, correct, wrong_l1, correct");
assert.equal(t2.state.boundary_results["A2/B1"], "mixed");
assert(!boundariesAfter(t2).includes("A1/A2"), "mixed A2/B1 evidence must not hard-collapse to A1/A2");

const t3 = run("b1b2-mixed-stays", "B1/B2", "wrong_l1, correct, correct");
assert.equal(t3.state.boundary_results["B1/B2"], "mixed");
assert(boundaryIndex(t3.state.current_boundary) >= boundaryIndex("B1/B2"), "mixed B1/B2 evidence must not collapse below B1/B2");

const t4 = run("slow-correct-not-pass", "B2/C1", "correct_slow");
assert.notEqual(t4.state.boundary_results["B2/C1"], "passed");
assert.equal(last(t4).engine_action, "confirm_boundary");

const t5 = run("independent-resistance-downprobe", "A2/B1", "wrong_l1, wrong_l1, wrong_l1");
assert(actions(t5).includes("probe_down"), "repeated independent resistance should allow a down-probe");
assert.equal(t5.state.boundary_results["A2/B1"], "failed");

const t6 = Engine.createEngine(items, {
  seed: "guardrail-ping-pong",
  startBoundary: "B1/B2",
  mode: "standard",
  standardMinItems: 8,
  maxItems: 20
});
t6.state.response_log = [
  { engine_action: "step_up", boundary: "A2/B1", state_after: { current_boundary: "B1/B2" } },
  { engine_action: "probe_down", boundary: "B1/B2", state_after: { current_boundary: "A2/B1" } },
  { engine_action: "step_up", boundary: "A2/B1", state_after: { current_boundary: "B1/B2" } }
];
t6.state.boundary_evidence["B1/B2"].l1_trap = 1;
t6.state.boundary_evidence["B1/B2"].resistance_focuses = ["seed_resistance"];
const l1 = t6.currentItem.options.find((option) => option.role === "l1_trap");
t6.answer(l1.id, t6.thresholds(t6.currentItem).fast + 600);
assert.equal(last(t6).engine_action, "retest_same_boundary");
assert.equal(last(t6).ping_pong_guardrail_active, true);

const t7 = run("confidence-needs-independent-evidence", "A1/A2", "correct, wrong_l1, wrong_l1");
assert.notEqual(t7.state.confidence, "high");

const t8 = run("all-correct-slow-does-not-floor-lock-a2", "A1/A2", "correct_slow, correct_slow, correct_slow, correct_slow, correct_slow, correct_slow", {
  standardMinItems: 6,
  maxItems: 20
});
assert.notEqual(t8.state.result?.estimated_level, "A2", "all-correct slow path must not terminate as A2 immediately after upward pass evidence");
assert(boundaryIndex(t8.state.current_boundary) >= boundaryIndex("B1/B2"), "repeated correct answers should continue probing above A2/B1, even when timing is slow");
assert.equal(t8.state.result, null, "all-correct slow path should keep testing instead of finalizing at the first conservative lock");

const t9 = run("user-like-correct-path-does-not-end-a2", "A1/A2", "correct_slow, correct_slow, correct_slow, correct_slow, correct_normal, correct_normal", {
  standardMinItems: 6,
  maxItems: 20
});
assert.notEqual(t9.state.result?.estimated_level, "A2", "user-like all-correct path must not end at A2 after stepping upward");
assert(boundaryIndex(t9.state.current_boundary) >= boundaryIndex("B1/B2"), "user-like all-correct path should be probing B1/B2 or higher");

console.log("engine guardrail acceptance tests passed");
