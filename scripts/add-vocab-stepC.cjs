// Step C: add 60 new vocab items (15 per level × 4 active levels: A2, B1, B2, C1).
// We skip A1 — it has plenty of basic vocab already.
// Each item: Oxford-anchored "deterministic" word, Turkish gloss prompt,
// key + acceptable (partial credit) + l1_trap, plus close_competitor.

const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "placement-questions-v2.js"));
const existing = window.NEKTAR_PLACEMENT_CONTENT_V2.items;

// Track existing vocab lemmas — must not collide (validator forbids cross-level reuse)
const existingVocabLemmas = new Set();
for (const i of existing) {
  if (i.type === "vocab") {
    (i.lexicon || []).forEach(l => existingVocabLemmas.add(String(l).toLowerCase()));
  }
}

// Find next available vocab ID per level prefix
function nextVocabId(prefix) {
  const used = existing.filter(i => i.id.startsWith("v2_" + prefix + "_vocab_")).map(i => i.id);
  let n = 1;
  while (used.includes(`v2_${prefix}_vocab_${String(n).padStart(3, "0")}`)) n++;
  return () => `v2_${prefix}_vocab_${String(n++).padStart(3, "0")}`;
}

// Word packs. Format per entry:
//   [tr_prompt, en_key, en_acceptable, en_l1_trap, en_close_competitor, cc_rationale, lexicon_word]
// "tr_prompt" is the Turkish gloss the learner sees.
// "en_key" is the target word.
// "en_acceptable" is a defensible-but-less-precise near-synonym (0.5 credit).
// "en_l1_trap" is a Turkish-learner overgeneralization that's wrong.
// "en_close_competitor" + rationale is the one-level-lower near synonym.

const A2 = [
  // 15 A2/B1 vocab — everyday concrete + concrete feelings + survival
  ["bahsetmek (bir konudan)", "Mention", "Talk about", "Say", "Bring up", "Defensible but lacks the brief-reference nuance of 'mention'.", "mention"],
  ["fark etmek (gözle görmek)", "Notice", "See", "Realize", "Spot", "Acceptable but more casual; 'notice' is the standard form.", "notice"],
  ["hak etmek", "Deserve", "Earn", "Want", "Merit", "More formal synonym; A2/B1 learner would naturally pick 'deserve'.", "deserve"],
  ["dahil etmek", "Include", "Add", "Put in", "Involve", "Means 'engage' more than 'include'; subtle distinction.", "include"],
  ["uzanmak (yataktan)", "Lie down", "Rest", "Sit", "Stretch out", "Captures the action but loses 'horizontal' nuance.", "lie"],
  ["seçmek", "Choose", "Pick", "Take", "Select", "More formal version of 'choose'; both work but register differs.", "choose"],
  ["kabul etmek (teklifi)", "Accept", "Agree", "Take", "Approve", "Slightly different action; 'accept' is the everyday answer.", "accept"],
  ["bağırmak", "Shout", "Yell", "Call", "Scream", "Stronger and more emotional than 'shout'.", "shout"],
  ["şaşırmak", "Be surprised", "Be amazed", "Be afraid", "Be shocked", "Stronger emotion than 'surprised'.", "surprise"],
  ["kaybolmak", "Get lost", "Lose the way", "Lose", "Be lost", "Stative rather than the action of becoming lost.", "lost"],
  ["alışmak (yeni şeye)", "Get used to", "Adapt to", "Learn", "Adjust to", "More formal but means the same thing.", "used"],
  ["hatırlatmak", "Remind", "Tell again", "Remember", "Refresh", "Suggests memory but loses the 'someone telling you' aspect.", "remind"],
  ["güvenmek", "Trust", "Believe", "Like", "Rely on", "Defensible — 'rely on' is close but more practical/functional.", "trust"],
  ["dinlenmek", "Rest", "Relax", "Sleep", "Take a break", "Acceptable but slightly different connotation.", "rest"],
  ["fark", "Difference", "Change", "Distance", "Gap", "Slightly different meaning — gap is spatial/temporal.", "difference"]
];

const B1 = [
  // 15 B1/B2 vocab — workplace + mild abstract
  ["başvurmak (işe)", "Apply", "Ask for", "Request", "Submit", "Slightly more formal; means 'send in' which is close.", "apply"],
  ["önermek (bir fikri)", "Suggest", "Say", "Offer", "Propose", "More formal version of 'suggest'; both fit.", "suggest"],
  ["belirtmek", "Indicate", "Say", "Show", "State", "Defensible — direct verbal expression, slightly different angle.", "indicate"],
  ["dikkat çekmek", "Stand out", "Be different", "Be seen", "Catch attention", "Means 'attract attention' but uses different metaphor.", "stand"],
  ["ortaya çıkmak", "Come up", "Appear", "Happen", "Emerge", "More formal synonym; B1 learner picks it confidently.", "come"],
  ["güvenilir", "Reliable", "Honest", "Strong", "Trustworthy", "Closely related but emphasizes personal trust vs. consistent performance.", "reliable"],
  ["sürdürmek (faaliyeti)", "Keep up", "Continue", "Keep", "Maintain", "More formal; B1 learner often picks it but loses informal everyday register.", "keep"],
  ["belirlemek", "Identify", "Find", "Mark", "Determine", "More formal — used in technical/scientific writing.", "identify"],
  ["değişmek", "Change", "Become different", "Turn", "Alter", "More formal/abstract synonym.", "change"],
  ["sağlamak", "Provide", "Give", "Make", "Supply", "Defensible — 'supply' implies regular delivery vs. one-time providing.", "provide"],
  ["azaltmak", "Reduce", "Make smaller", "Lose", "Decrease", "Roughly equivalent — 'decrease' is slightly more formal.", "reduce"],
  ["yaklaşmak", "Approach", "Come near", "Reach", "Get close", "Defensible casual paraphrase.", "approach"],
  ["başarmak", "Achieve", "Get", "Win", "Accomplish", "Slightly stronger and more formal.", "achieve"],
  ["ihtiyaç duymak", "Need", "Want", "Use", "Require", "More formal version of 'need'.", "need"],
  ["yapı (bina/kuruluş)", "Structure", "Building", "System", "Framework", "More abstract; means the organizing skeleton rather than the building.", "structure"]
];

const B2 = [
  // 15 B2/C1 vocab — academic + abstract + register-specific
  ["öne çıkarmak", "Emphasize", "Show", "Tell", "Stress", "Synonym but slightly different register.", "emphasize"],
  ["temel almak", "Be based on", "Use", "Start from", "Rely on", "Acceptable but suggests dependency more than foundation.", "base"],
  ["ima etmek", "Imply", "Mean", "Say", "Hint at", "More casual; loses the formal indirect-meaning nuance.", "imply"],
  ["üzerinde durmak", "Focus on", "Look at", "Think about", "Concentrate on", "Means the same thing but slightly more formal.", "focus"],
  ["sınırlamak", "Restrict", "Stop", "Limit", "Constrain", "Closely related — both convey limitation.", "restrict"],
  ["uygulamak (yasayı)", "Enforce", "Use", "Apply", "Implement", "Defensible — 'implement' is broader, less coercive.", "enforce"],
  ["dayanak", "Basis", "Reason", "Start", "Foundation", "More architectural metaphor; basis is more abstract.", "basis"],
  ["belirli", "Particular", "Special", "One", "Specific", "Both work; 'specific' is slightly less precise here.", "particular"],
  ["öneri sunmak (resmi)", "Propose", "Say", "Suggest", "Recommend", "Acceptable but suggests advice rather than formal proposal.", "propose"],
  ["değerlendirmek (eleştirel)", "Evaluate", "Look at", "Judge", "Appraise", "More formal synonym.", "evaluate"],
  ["geçerli", "Valid", "True", "Right", "Legitimate", "Closely related but legal/social rather than logical.", "valid"],
  ["kapsamlı", "Comprehensive", "Big", "Full", "Thorough", "Covers detail rather than breadth.", "comprehensive"],
  ["aşmak (engeli)", "Overcome", "Pass", "Beat", "Surpass", "Implies going beyond rather than defeating an obstacle.", "overcome"],
  ["belirsiz", "Vague", "Unclear", "Not sure", "Ambiguous", "Suggests two-interpretations vs. just unclear.", "vague"],
  ["sürdürülebilir", "Sustainable", "Long", "Strong", "Lasting", "Loses environmental/systemic nuance.", "sustainable"]
];

const C1 = [
  // 15 B2/C1 vocab — sophisticated academic + register-rich + idiomatic verbs
  ["geri çekilmek (görüş ya da iddia)", "Retract", "Take back", "Refuse", "Withdraw", "Closely related — 'withdraw' is broader and slightly less formal.", "retract"],
  ["zedelemek", "Tarnish", "Hurt", "Spoil", "Damage", "Broader synonym; 'tarnish' specifically applies to reputation.", "tarnish"],
  ["ima yoluyla anlatmak", "Insinuate", "Suggest", "Say", "Hint", "Less formal; 'insinuate' carries a negative connotation 'hint' doesn't.", "insinuate"],
  ["öne çıkıp baskın olmak", "Predominate", "Be common", "Win", "Prevail", "Closely related — prevail is more dynamic/contested.", "predominate"],
  ["incelemek (sıkı sıkıya)", "Scrutinize", "Check", "Look", "Examine", "Less intense — 'examine' lacks the rigorous-inspection nuance.", "scrutinize"],
  ["değişen koşullara uyum sağlamak", "Adapt", "Change", "Use", "Adjust", "Closely related but suggests fine-tuning rather than full adaptation.", "adapt"],
  ["doğrulamak (kanıtla)", "Corroborate", "Show", "Tell", "Confirm", "Less specific to evidence-based confirmation.", "corroborate"],
  ["dolaylı yoldan etkilemek", "Influence", "Change", "Push", "Sway", "Slightly more emotional/manipulative connotation.", "influence"],
  ["belirsiz hale getirmek", "Obscure", "Hide", "Cover", "Blur", "Visual metaphor; 'obscure' is conceptual.", "obscure"],
  ["aşırıya kaçmak", "Exaggerate", "Lie", "Make big", "Overstate", "Closely related but 'overstate' is more formal/quantitative.", "exaggerate"],
  ["yaymak (söylenti)", "Disseminate", "Spread", "Tell", "Circulate", "Slightly less formal/technical.", "disseminate"],
  ["belirgin", "Conspicuous", "Big", "Clear", "Noticeable", "Slightly less strong; conspicuous suggests stands out dramatically.", "conspicuous"],
  ["sözünü etmemek", "Omit", "Forget", "Skip", "Leave out", "Synonym but less formal/deliberate.", "omit"],
  ["azalan ivmeyle düşmek", "Dwindle", "Get less", "Lose", "Diminish", "Closely related but 'diminish' is more general.", "dwindle"],
  ["bağdaşık olmak", "Coincide", "Match", "Happen", "Overlap", "Defensible but emphasizes overlap rather than simultaneous occurrence.", "coincide"]
];

function mkVocab(boundary, cefr_level, idPrefix, oxfordBand, [prompt_tr, key, acceptable, l1trap, ccText, ccRationale, lemma], idGenerator) {
  // Skip if lemma already used (cross-level reuse forbidden)
  if (existingVocabLemmas.has(lemma.toLowerCase())) {
    console.warn(`SKIP duplicate lemma: ${lemma}`);
    return null;
  }
  existingVocabLemmas.add(lemma.toLowerCase());

  return {
    id: idGenerator(),
    source_collection: "diagnostic_v2",
    cefr_level,
    boundary,
    type: "vocab",
    format: "meaning_tr_en",
    focus: ["lexical_breadth"],
    skill_tags: ["recognition"],
    prompt: prompt_tr,
    prompt_lang: "tr",
    instruction_tr: "Anlamı seç.",
    options: [
      { id: "k",  text: key,         role: "key" },
      { id: "a",  text: acceptable,  role: "distractor", credit: 0.5 },
      { id: "lt", text: l1trap,      role: "l1_trap" }
    ],
    correctId: "k",
    close_competitor: {
      id: "cc",
      text: ccText,
      role: "distractor",
      tier: "close",
      rationale: ccRationale
    },
    estimated_difficulty: cefr_level === "B1" ? 0.34 : cefr_level === "B2" ? 0.52 : cefr_level === "C1" ? 0.66 : 0.22,
    estimated_discrimination: 0.78,
    lexicon: [lemma],
    distractor_distance: "tight",
    source_grounding: [`${oxfordBand}: ${lemma}`],
    signal: `${key} targets ${lemma} as a level-specific lexical signal.`,
    trap: {
      lt: "Turkish-speaker overgeneralization; semantically adjacent but not the target.",
      a:  "Defensible near-synonym one level lower; partial credit because meaning is broadly conveyed without the target's precision."
    }
  };
}

const newItems = [];
// Mapping: pack -> (boundary, cefr_level, id_prefix). Per V2_LEVEL_BOUNDARY:
//   a1→A1/A2, a2→A1/A2, b1→A2/B1, b2→B1/B2, c1→B2/C1
// 15 items per cefr_level, 4 levels (skip A1 — already plenty there).
const genA2 = nextVocabId("a2"); // A1/A2 boundary, cefr_level "A2"
const genB1 = nextVocabId("b1"); // A2/B1 boundary, cefr_level "B1"
const genB2 = nextVocabId("b2"); // B1/B2 boundary, cefr_level "B2"
const genC1 = nextVocabId("c1"); // B2/C1 boundary, cefr_level "C1"

A2.forEach((e) => { const it = mkVocab("A1/A2", "A2", "a2", "Oxford_3000", e, genA2); if (it) newItems.push(it); });
B1.forEach((e) => { const it = mkVocab("A2/B1", "B1", "b1", "Oxford_3000", e, genB1); if (it) newItems.push(it); });
B2.forEach((e) => { const it = mkVocab("B1/B2", "B2", "b2", "Oxford_5000", e, genB2); if (it) newItems.push(it); });
C1.forEach((e) => { const it = mkVocab("B2/C1", "C1", "c1", "Oxford_5000", e, genC1); if (it) newItems.push(it); });

console.log("Generated", newItems.length, "new vocab items.");

// Splice into placement-questions-v2.js
const filePath = path.join(__dirname, "..", "placement-questions-v2.js");
const original = fs.readFileSync(filePath, "utf8");
const tailPattern = /\s+}\s*\n\s*]\s*\n};\s*$/;
if (!tailPattern.test(original)) { console.error("Cannot find file tail"); process.exit(1); }
const insertion = newItems.map((it) => "    " + JSON.stringify(it, null, 2).replace(/\n/g, "\n    ")).join(",\n");
const updated = original.replace(tailPattern, `\n    },\n${insertion}\n  ]\n};\n`);
fs.writeFileSync(filePath, updated, "utf8");
console.log("Wrote", filePath, "→", updated.length, "bytes (was", original.length, ")");
