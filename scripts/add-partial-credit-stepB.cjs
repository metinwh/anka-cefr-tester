// Step B: add a partial-credit "acceptable" option to every v2 vocab (B1+)
// and v2 collocation item. Strategy: REPLACE the existing plain `distractor`
// option (keeping the diagnostic l1_trap option intact) with a near-synonym
// at credit 0.5. Stays at 3 options, validator-compliant.

const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "placement-questions-v2.js"));

const items = window.NEKTAR_PLACEMENT_CONTENT_V2.items;

// Per-key near-synonyms (one register-lower or one precision-lower).
// Covers every vocab key in the v2 B1+ pool. Keys are case-insensitive lookups.
const SYNS = {
  // Vocab B1/B2 (capitalized in items)
  "acknowledge": "Admit",
  "acquire":     "Get",
  "assess":      "Judge",
  "decline":     "Refuse",
  "demonstrate": "Show",
  "disclose":    "Reveal",
  "distribute":  "Share",
  "emerge":      "Appear",
  "enhance":     "Improve",
  "establish":   "Set up",
  "imply":       "Suggest",
  "justify":     "Defend",
  "maintain":    "Keep",
  "obtain":      "Get",
  "pursue":      "Follow",
  "resolve":     "Fix",
  "retain":      "Keep",
  "sustain":     "Keep going",
  "undermine":   "Weaken",
  "withdraw":    "Pull out",
  // Vocab B2/C1 (lowercase in items)
  "advocate":     "Support",
  "allocate":     "Give",
  "anticipate":   "Expect",
  "circumvent":   "Go around",
  "coincide":     "Match",
  "comply":       "Follow rules",
  "consolidate":  "Combine",
  "constrain":    "Limit",
  "deteriorate":  "Get worse",
  "elaborate":    "Explain more",
  "facilitate":   "Help",
  "highlight":    "Show clearly",
  "infer":        "Guess",
  "mitigate":     "Reduce",
  "offset":       "Balance",
  "omit":         "Leave out",
  "outweigh":     "Beat",
  "refine":       "Improve",
  "scrutinize":   "Check closely",
  "substantiate": "Back up",
  "warrants":     "Deserves"
};

// Collocation verbs: the "looser" near-synonym that almost-fits but isn't standard.
// We replace just the first word of the key collocation.
const COLL_LOOSE = {
  "casts":   "shines",
  "caught":  "got",
  "cause":   "create",
  "derived": "came",
  "does":    "makes",
  "draws":   "makes",
  "entails": "involves",
  "gave":    "did",
  "has":     "eats",
  "have":    "eat",
  "hold":    "have",
  "keep":    "hold",
  "made":    "did",
  "make":    "do",
  "meet":    "reach",
  "pay":     "give",
  "poses":   "creates",
  "raises":  "brings up",
  "reached": "got",
  "save":    "keep",
  "sheds":   "throws",
  "spend":   "use",
  "strike":  "find",
  "supports": "backs",
  "take":    "get",
  "takes":   "needs",
  "took":    "got"
};

let modVocab = 0;
let modColl = 0;
let skipped = 0;

for (const item of items) {
  if (item.source_collection !== "diagnostic_v2") continue;

  const targetVocab = item.type === "vocab" && (item.boundary === "B1/B2" || item.boundary === "B2/C1");
  const targetColl  = item.type === "collocation";
  if (!targetVocab && !targetColl) continue;

  // Skip if already has any partial-credit option (idempotent)
  const hasPartial = (item.options || []).some(o =>
    o.role === "acceptable" || o.role === "weak" ||
    (typeof o.credit === "number" && o.credit > 0 && o.credit < 1)
  );
  if (hasPartial) { skipped++; continue; }

  const key = (item.options || []).find(o => o.role === "key");
  if (!key) { skipped++; continue; }
  const keyText = (key.text || "").trim();

  // Find the plain "distractor" (NOT l1_trap, NOT developmental_error). That's
  // what we'll replace with the partial-credit "acceptable" option.
  const plainIdx = item.options.findIndex(o => o.role === "distractor" && o.id !== item.correctId);
  if (plainIdx < 0) { skipped++; continue; }

  // Pick the near-synonym text
  let acceptableText = null;
  if (targetVocab) {
    acceptableText = SYNS[keyText.toLowerCase()] || null;
    // Match capitalization style of the key
    if (acceptableText && keyText === keyText.toUpperCase()) acceptableText = acceptableText.toUpperCase();
    else if (acceptableText && keyText[0] === keyText[0].toLowerCase()) acceptableText = acceptableText.charAt(0).toLowerCase() + acceptableText.slice(1);
  } else if (targetColl) {
    const firstWord = keyText.split(/\s+/)[0]?.toLowerCase();
    if (COLL_LOOSE[firstWord]) {
      acceptableText = keyText.replace(new RegExp("^" + firstWord, "i"), COLL_LOOSE[firstWord]);
    }
  }
  if (!acceptableText) { skipped++; continue; }

  // Collision check against ALL existing options and close_competitor
  const visible = new Set(item.options.map(o => (o.text || "").trim().toLowerCase()));
  if (item.close_competitor?.text) visible.add(item.close_competitor.text.trim().toLowerCase());
  if (visible.has(acceptableText.trim().toLowerCase())) { skipped++; continue; }

  // REPLACE the plain distractor's text and add credit:0.5
  const origId = item.options[plainIdx].id;
  item.options[plainIdx] = {
    id: origId,
    text: acceptableText,
    role: "distractor",
    credit: 0.5
  };
  // Update trap explanation for this option since meaning shifted
  if (item.trap && item.trap[origId]) {
    item.trap[origId] = "Defensible near-synonym at a slightly lower precision level; awarded partial credit because it conveys the broad meaning without the target's precision.";
  }

  if (targetVocab) modVocab++;
  else modColl++;
}

console.log("Modified vocab (B1+):", modVocab, "/ 40 candidates");
console.log("Modified collocations:", modColl, "/ 30 candidates");
console.log("Skipped:", skipped);

// Re-serialize via bracket-balanced splice (preserves wrapper)
const filePath = path.join(__dirname, "..", "placement-questions-v2.js");
const original = fs.readFileSync(filePath, "utf8");
const startMarker = "\"items\": [";
const startIdx = original.indexOf(startMarker);
if (startIdx < 0) { console.error("Cannot find items array start."); process.exit(1); }
let depth = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < original.length; i++) {
  if (original[i] === "[") depth++;
  else if (original[i] === "]") {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}
if (endIdx < 0) { console.error("Cannot find items array end."); process.exit(1); }
const before = original.slice(0, startIdx + startMarker.length - 1);
const after  = original.slice(endIdx + 1);
const arrayLiteral = JSON.stringify(items, null, 2).replace(/\n/g, "\n  ");
fs.writeFileSync(filePath, before + arrayLiteral + after, "utf8");
console.log("File written.");
