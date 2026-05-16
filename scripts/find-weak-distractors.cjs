// Identifies legacy items whose distractors are too dramatically shorter or
// longer than the key (easy to eliminate). Writes:
//   • legacy-retirement-list.json — human-readable catalog with prompts/options
//   • legacy-retirement.js        — runtime module exposing window.NEKTAR_LEGACY_RETIRED_IDS
// Re-run any time the legacy pool changes. v2 items are exempt.
//
// Usage: node scripts/find-weak-distractors.cjs

const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "placement-questions.js"));
require(path.join(__dirname, "..", "placement-pool.generated.js"));
require(path.join(__dirname, "..", "placement-questions-v2.js"));

const ALL = (window.NEKTAR_PLACEMENT_CONTENT.items || []).concat(
  (window.NEKTAR_PLACEMENT_CONTENT_V2.items || []).map((i) => ({ ...i, source_collection: "diagnostic_v2" }))
);
const LEGACY_EXCLUDED_TYPES = new Set(["function", "pragmatic_choice", "natural_speech", "spoken_chunk"]);

const flagged = [];
for (const item of ALL) {
  if (item.source_collection === "diagnostic_v2") continue;          // v2 is fresh authoring
  if (LEGACY_EXCLUDED_TYPES.has(item.type)) continue;                 // already off the table

  const opts = item.options || [];
  const key = opts.find((o) => o.role === "key");
  const distractors = opts.filter((o) => o !== key);
  if (!key || distractors.length < 2) continue;

  const keyLen = (key.text || "").length;
  const allWeak = distractors.every((d) => {
    const text = (d.text || "");
    return text.length < 3 || Math.abs(text.length - keyLen) > 12;
  });
  if (allWeak) {
    flagged.push({
      id: item.id,
      boundary: item.boundary,
      type: item.type,
      prompt: (item.prompt || "").slice(0, 60),
      key: key.text,
      distractors: distractors.map((d) => d.text)
    });
  }
}

const ROOT = path.join(__dirname, "..");
fs.writeFileSync(
  path.join(ROOT, "legacy-retirement-list.json"),
  JSON.stringify({
    generated_at: new Date().toISOString(),
    rationale: "Legacy plc_*/gen_* items whose distractors are too dramatically shorter than the key or fall under 3 chars — easy to eliminate by length. Filtered out of the student-core pool. Legacy files unchanged.",
    count: flagged.length,
    items: flagged
  }, null, 2)
);

const idList = flagged.map((i) => i.id);
fs.writeFileSync(
  path.join(ROOT, "legacy-retirement.js"),
  `// Auto-generated retirement list (re-run scripts/find-weak-distractors.cjs to refresh).\n` +
  `// Items flagged for weak/easy-to-eliminate distractors. Filtered out of\n` +
  `// the student-facing core pool but kept in the legacy files for history.\n` +
  `window.NEKTAR_LEGACY_RETIRED_IDS = ${JSON.stringify(idList, null, 2)};\n`
);

console.log("Flagged", flagged.length, "legacy items.");
console.log("Wrote legacy-retirement-list.json + legacy-retirement.js");
