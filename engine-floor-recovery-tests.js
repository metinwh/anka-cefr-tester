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

function run(name, startBoundary, pattern, settings = {}) {
  const engine = Engine.createEngine(items, {
    seed: `floor-recovery-${name}`,
    startBoundary,
    mode: "standard",
    standardMinItems: 6,
    maxItems: 14,
    ...settings
  });
  Engine.runAnswerPattern(engine, pattern);
  return engine;
}

function actions(engine) {
  return engine.state.response_log.map((entry) => entry.engine_action);
}

const recovered = run(
  "recover-after-downprobe",
  "A2/B1",
  "wrong_l1, wrong_l1, correct, correct, correct, wrong_l1"
);

assert(actions(recovered).includes("recover_up"), "A1/A2 should recover upward after three independent pass signals");
assert.notEqual(recovered.state.result?.estimated_level, "A1", "floor recovery must not produce an A1 result");
assert.equal(recovered.state.boundary_results["A1/A2"], "passed_with_weaknesses");
assert.equal(recovered.state.result?.estimated_level, "A2");
assert.notEqual(recovered.state.result?.confidence, "high", "floor-recovered A2 should stay conservative");

const recoveredExport = recovered.exportSession();
assert(recoveredExport.recover_up_events.length > 0, "recover_up events should be exported");
assert(recoveredExport.passed_with_weaknesses_boundaries.includes("A1/A2"), "passed-with-weaknesses floor should be exported");
assert(recoveredExport.boundary_item_counts["A1/A2"] >= 3, "boundary item counts should be exported");

const floorFail = run(
  "true-floor-fail",
  "A1/A2",
  "wrong_l1, wrong_l1, wrong_dev, wrong_dev, unknown, unknown"
);

assert.equal(floorFail.state.result?.estimated_level, "A1", "clear A1/A2 resistance with few passes may still return A1");
assert.equal(floorFail.state.boundary_results["A1/A2"], "failed");
assert.equal(floorFail.state.recover_up_events.length, 0, "true floor resistance should not recover upward");

const floorPassOnly = run(
  "floor-pass-only",
  "A1/A2",
  "correct, correct, correct, wrong_l1, wrong_l1"
);

assert.notEqual(floorPassOnly.state.result?.estimated_level, "A1", "basic pass evidence should not be overwritten by later probing");
assert(floorPassOnly.state.boundary_item_counts["A1/A2"] <= 7, "standard floor checks should stay within the floor cap range");

console.log("engine floor recovery acceptance tests passed");
