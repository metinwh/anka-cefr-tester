const assert = require("assert");

global.window = {};

const Validator = require("./schema-validator.js");
require("./placement-questions.js");
require("./placement-pool.generated.js");

const content = global.window.NEKTAR_PLACEMENT_CONTENT;
const items = content.items;

const allowedStrategicWarnings = new Set([
  "SINGLE_ITEM_NO_VARIANTS",
  "LEXICAL_POOL_MIN_100_PER_BAND",
  "IDIOM_POOL_TOO_SMALL",
  "NATURAL_SPEECH_POOL_TOO_SMALL"
]);

const report = Validator.validatePayload(content, { sourceLabel: "placement-quality-tests" });
assert.equal(report.summary.errorCount, 0, "placement pool must have zero schema errors");
const qualityWarnings = report.issues.filter((issue) => issue.severity === "warning" && !allowedStrategicWarnings.has(issue.code));
assert.deepEqual(qualityWarnings, [], "placement pool must have zero item-quality warnings");

const a1A2HigherLevelPattern = /\b(might|may|could|would|should|must|although|whereas|nevertheless|despite|however|therefore|nonetheless|consequently|prior|substantial|significant|plausible|conclusive|implications|policy|research|survey|committee|proposal|evidence|hypothesis|method|reliable|interpretation|generalize|premature)\b|\bbrought\b|had \w+ed|have \w+ed/i;
const a1A2Hits = items.filter((item) =>
  item.boundary === "A1/A2" &&
  a1A2HigherLevelPattern.test([item.prompt, ...item.options.map((option) => option.text)].join(" "))
);
assert.deepEqual(a1A2Hits.map((item) => ({ id: item.id, prompt: item.prompt })), [], "A1/A2 items must not contain higher-level grammar or academic lexis");

const cartoonDistractorPattern = /has _____ (doctor|engineer|artist)|Can is|freed|take your clock|no road|high in the sky|flying in air|secret bag|slice of bread|easy cake|finished out|ended away|keep an ear|hold an eye|the end time|the final second|that told|at the same reason|at the same result/i;
const cartoonHits = items.filter((item) =>
  cartoonDistractorPattern.test([item.prompt, ...item.options.map((option) => option.text)].join(" "))
);
assert.deepEqual(cartoonHits.map((item) => ({ id: item.id, prompt: item.prompt, options: item.options.map((option) => option.text) })), [], "pool must not contain known cartoon stems or distractors");

const duplicateOptionHits = items.filter((item) => {
  const visible = (item.options || []).map((option) => String(option.text || "").trim().toLowerCase());
  return new Set(visible).size !== visible.length;
});
assert.deepEqual(duplicateOptionHits.map((item) => ({ id: item.id, prompt: item.prompt, options: item.options.map((option) => option.text) })), [], "pool must not contain duplicate visible options");

const knownAcceptableDistractors = [
  { prompt: "The report _____ light on the causes of the delay.", option: "throws" },
  { prompt: "The rules _____ every year.", option: "change" }
];
const acceptableDistractorHits = items.filter((item) =>
  knownAcceptableDistractors.some((entry) =>
    item.prompt === entry.prompt &&
    (item.options || []).some((option) => String(option.text || "").trim().toLowerCase() === entry.option)
  )
);
assert.deepEqual(acceptableDistractorHits.map((item) => ({ id: item.id, prompt: item.prompt, options: item.options.map((option) => option.text) })), [], "pool must not use known acceptable English as a wrong distractor");

console.log("placement quality acceptance tests passed");
