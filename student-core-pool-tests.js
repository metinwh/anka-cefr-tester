const assert = require("assert");

global.window = {};

const Engine = require("./ceiling-probe-engine.js");
require("./placement-questions.js");
require("./placement-pool.generated.js");

const content = global.window.NEKTAR_PLACEMENT_CONTENT;
const excludedTypes = new Set(["function", "pragmatic_choice", "naturalness_judgment", "natural_speech", "spoken_chunk"]);
const coreItems = content.items.filter((item) => !excludedTypes.has(item.type));

assert(coreItems.length >= 750, "student core pool should remain large after excluding pragmatic/naturalness items");
assert.equal(coreItems.some((item) => excludedTypes.has(item.type)), false, "student core pool must not include pragmatic/naturalness/function types");

const bannedPromptFragments = [
  "Someone says, 'How are you?' You are fine.",
  "Choose the best summary."
];
const bannedActivePrompts = coreItems.filter((item) =>
  bannedPromptFragments.some((fragment) => String(item.prompt || "").includes(fragment))
);
assert.deepEqual(
  bannedActivePrompts.map((item) => ({ id: item.id, type: item.type, prompt: item.prompt })),
  [],
  "student core pool must not serve the exposed naturalness prompts"
);

const engine = Engine.createEngine(coreItems, {
  seed: "student-core-smoke",
  startBoundary: "A1/A2",
  standardMinItems: 8,
  maxItems: 24
});

const servedTypes = [];
for (let i = 0; i < 24 && engine.currentItem && !engine.state.result; i += 1) {
  servedTypes.push(engine.currentItem.type);
  const key = engine.currentItem.options.find((option) => option.role === "key") || engine.currentItem.options[0];
  engine.answer(key.id, 2400);
}

assert.equal(
  servedTypes.some((type) => excludedTypes.has(type)),
  false,
  `student engine served excluded type(s): ${servedTypes.join(", ")}`
);

console.log("student core pool tests passed");
