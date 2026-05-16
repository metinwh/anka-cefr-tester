// One-shot generator: appends 30 new daily-idiom items to placement-questions-v2.js
// Run: node scripts/add-idioms-stepA.cjs
// After: run validator + commit

const fs = require("fs");
const path = require("path");

// Each entry produces one item. Format:
//   [id_suffix, prompt_tr, key_en, acceptable_en, weak_en, close_competitor_en, close_rationale, lexicon[]]
const A2B1 = [
  ["001", "Birinden özür duydun, çok büyük bir mesele değil. Ne dersin?", "It's no big deal.", "Don't worry about it.", "It is not a big problem for me.", "No problem at all.", "Defensible but flattens the idiomatic 'no big deal' nuance.", ["deal", "big"]],
  ["002", "Konuşurken bir konu değiştiriyor ya da yan bilgi ekliyorsun.", "By the way, did you call her?", "Anyway, did you call her?", "From the way, did you call her?", "Speaking of which, did you call her?", "Similar transition but slightly more formal — a B1 learner often confuses the two.", ["way"]],
  ["003", "Bir teklife kesinlikle evet diyorsun.", "I'll be there for sure.", "I'll definitely be there.", "I'm coming for sure of it.", "I'll be there for certain.", "Acceptable but stiffer; 'for sure' is the natural spoken form.", ["sure"]],
  ["004", "Biraz yorgun olduğunu söylüyorsun, çok değil.", "I'm kind of tired.", "I'm a little tired.", "I am tired of a kind.", "I'm sort of tired.", "Synonymous hedge; both work, but 'kind of' is the more common spoken form.", ["kind"]],
  ["005", "Karşındaki bir açıklama yaptı ve mantıklı geldi.", "That makes sense.", "I understand now.", "It makes the sense.", "That sounds reasonable.", "Acceptable, but 'makes sense' is the natural collocation.", ["sense"]],
  ["006", "Beklemediğin bir şey aniden oldu.", "He showed up out of nowhere.", "He came suddenly without warning.", "He came from no place.", "He turned up out of the blue.", "A near-synonymous idiom that's slightly stronger; learners often mix them.", ["nowhere"]],
  ["007", "Acelen var, biri seni durdurmaya çalışıyor.", "Sorry, I'm in a hurry.", "Sorry, I'm rushing right now.", "Sorry, I am at a hurry.", "Sorry, I'm in a rush.", "Synonym but slightly less common; both natural.", ["hurry"]],
  ["008", "Az önce verdiğin kararı yeniden düşündün ve değiştirdin.", "On second thought, I'll have tea instead.", "Actually, I'll have tea instead.", "With second thought, I'll have tea instead.", "Come to think of it, I'll have tea instead.", "Acceptable paraphrase; lacks the precise 'reconsidering' nuance.", ["second", "thought"]],
  ["009", "Bir arkadaşına samimi bir şekilde 'ne haber' diyorsun.", "Hey, what's up?", "Hi, how are you?", "Hey, what is upper?", "Hey, how's it going?", "Both casual greetings; 'what's up' is the more informal one.", ["up"]],
  ["010", "Birisi işten çıkarıldı; doğal cümleyi seç.", "He got fired last month.", "He lost his job last month.", "He was got from his job.", "He got sacked last month.", "British-informal synonym; correct but register-specific.", ["fired", "job"]]
];

const B1B2 = [
  ["001", "Birisi yeterli bilgi olmadan hızlıca yargıya varıyor; uyarıyorsun.", "Don't jump to conclusions yet.", "Don't decide too quickly.", "Don't jump on conclusions yet.", "Don't rush to judgment yet.", "Near-synonym but more formal-sounding; B1 learners often pick it.", ["jump", "conclusion"]],
  ["002", "Birisi bir isim söyledi, tanıdık geliyor ama tam hatırlayamıyorsun.", "The name rings a bell.", "The name sounds familiar.", "The name rings the bell.", "The name is familiar to me.", "Defensible but loses the idiomatic 'half-remembered' nuance.", ["ring", "bell"]],
  ["003", "Yarın sınavın var, sıkı ders çalışmalısın.", "I need to hit the books tonight.", "I need to study hard tonight.", "I need to hit on books tonight.", "I need to crack the books tonight.", "Synonym but rarer; both idiomatic, 'hit the books' is the standard.", ["book"]],
  ["004", "Birisi sürpriz planın sırrını yanlışlıkla açıkladı.", "He spilled the beans about the party.", "He told everyone about the party.", "He spilled the beans of the party.", "He let the cat out of the bag about the party.", "Near-synonymous idiom; a B1 learner might confuse the two.", ["beans"]],
  ["005", "Arkadaşın şaka yapıyor, ciddi söylemiyor.", "Relax, I'm just pulling your leg.", "Relax, I'm only joking.", "Relax, I'm pulling your leg only.", "Relax, I'm just kidding you.", "Acceptable but less idiomatic; loses the playful tease nuance.", ["leg", "pull"]],
  ["006", "Bir kelime aklında ama hatırlayamıyorsun.", "It's on the tip of my tongue.", "I almost remember it, but not quite.", "It's at the top of my tongue.", "It's on the edge of my tongue.", "Non-standard variant; the established idiom is 'tip of the tongue'.", ["tip", "tongue"]],
  ["007", "İlk tanışmada ortamı yumuşatıyorsun.", "A small joke can break the ice.", "A small joke can make people relax.", "A small joke can break the iceberg.", "A small joke can warm up the room.", "Defensible but doesn't capture the formal-introduction context.", ["ice", "break"]],
  ["008", "Yaptırdığın tamir çok pahalıydı.", "The repair cost an arm and a leg.", "The repair was very expensive.", "The repair cost arm and leg.", "The repair cost a fortune.", "Synonym idiom; both convey 'expensive' but use different metaphors.", ["arm", "leg"]],
  ["009", "Biraz hasta hissediyorsun, halsizsin.", "I'm feeling under the weather today.", "I'm not feeling well today.", "I'm feeling under weather today.", "I'm feeling a bit off today.", "Acceptable but vaguer; lacks the gentle 'mildly unwell' tone.", ["weather"]],
  ["010", "Bir şey çok nadiren olur.", "She visits once in a blue moon.", "She rarely visits.", "She visits one time in a blue moon.", "She visits every now and then.", "Acceptable but suggests more frequency than 'once in a blue moon'.", ["moon", "blue"]]
];

const B2C1 = [
  ["001", "Toplantıda kimsenin dile getirmediği bariz bir mesele var.", "We need to address the elephant in the room.", "We need to discuss the obvious problem nobody's mentioning.", "We need to talk about the elephant.", "We need to confront the obvious issue here.", "Acceptable paraphrase but loses the cultural-idiomatic punch.", ["elephant", "room"]],
  ["002", "Birisi konuya direkt girmiyor, lafı dolandırıyor; uyarıyorsun.", "Stop beating around the bush and tell me.", "Stop avoiding the point and just tell me.", "Stop beating the bush and tell me.", "Stop dancing around the topic and tell me.", "Near-synonymous idiom but slightly different register.", ["bush", "beat"]],
  ["003", "Hoş olmayan ama gerekli bir şeyi yapmaya karar veriyorsun.", "I just had to bite the bullet and apologize.", "I just had to do the unpleasant thing and apologize.", "I had to bite a bullet and apologize.", "I just had to grin and bear it and apologize.", "Different idiom; conveys endurance rather than decisive unpleasant action.", ["bullet", "bite"]],
  ["004", "Karşındaki seni eleştirdi ama o da aynı şeyi yapıyor; alaycı cevap.", "You're one to talk!", "That's rich coming from you.", "You are the talker!", "Look who's talking!", "Synonymous retort; a B2 learner often picks the latter as it's more familiar.", ["talk"]],
  ["005", "Çok geç saatlere kadar çalıştığını söylüyorsun.", "I've been burning the midnight oil all week.", "I've been working very late all week.", "I've been burning oil at midnight all week.", "I've been pulling all-nighters all week.", "Synonymous casual idiom; slightly different formality register.", ["midnight", "oil"]],
  ["006", "Karar veya sıradaki hamle artık karşı tarafa kalmış.", "We've made our offer; the ball is in your court.", "We've made our offer; now it's up to you.", "We've made our offer; the ball is on your court.", "We've made our offer; the decision is yours now.", "Acceptable, but lacks the negotiation-handoff metaphor.", ["ball", "court"]],
  ["007", "Az önce bahsettiğin kişi tam o anda yanına geldi.", "Speak of the devil — there she is!", "What a coincidence — there she is!", "Speak the devil — there she is!", "Talk of the devil — there she is!", "British-variant of the same idiom; both acceptable, regional split.", ["devil", "speak"]],
  ["008", "Uzun süre denedikten sonra pes ediyorsun.", "After years of trying, he threw in the towel.", "After years of trying, he gave up.", "After years of trying, he threw the towel.", "After years of trying, he called it quits.", "Synonymous; equally idiomatic with different metaphor.", ["towel", "throw"]],
  ["009", "Lafı uzatmadan asıl konuya geçiyorsun.", "Let's cut to the chase: what's the price?", "Let's get to the point: what's the price?", "Let's cut at the chase: what's the price?", "Let's get down to brass tacks: what's the price?", "Synonym but more business-formal; subtle register shift.", ["chase", "cut"]],
  ["010", "Önceki argümanı destekleyen başka bir nokta ekliyorsun.", "By the same token, the new policy will help interns.", "Similarly, the new policy will help interns.", "By the same coin, the new policy will help interns.", "In the same vein, the new policy will help interns.", "Synonymous discourse connector; both natural in formal writing.", ["token"]]
];

function mkItem(boundary, cefr_level, level_id_prefix, suffix, prompt, key, acceptable, weak, ccText, ccRationale, lexicon, difficulty, discrimination) {
  return {
    id: `v2_${level_id_prefix}_idiom_${suffix}`,
    source_collection: "diagnostic_v2",
    cefr_level,
    boundary,
    type: "idiom",
    format: "idiom_meaning",
    focus: cefr_level === "C1" ? ["sophisticated_idioms", "natural_speech"] : ["daily_idioms", "natural_speech"],
    skill_tags: ["recognition", "register"],
    prompt,
    prompt_lang: "tr",
    instruction_tr: "En doğal cevabı seç.",
    options: [
      { id: "k",  text: key,        role: "key" },
      { id: "a",  text: acceptable, role: "distractor", credit: 0.55 },
      { id: "w",  text: weak,       role: "distractor" }
    ],
    correctId: "k",
    close_competitor: {
      id: "cc",
      text: ccText,
      role: "distractor",
      tier: "close",
      rationale: ccRationale
    },
    estimated_difficulty: difficulty,
    estimated_discrimination: discrimination,
    lexicon,
    distractor_distance: "medium",
    source_grounding: [`CEFR_${cefr_level}: daily_idiom`],
    signal: `The idiom "${key.replace(/[!.?]$/, "").replace(/^.*?\b(.*)$/, "$1").slice(0, 50)}" tests recognition of natural everyday English.`,
    trap: {
      a: "Defensible non-idiomatic paraphrase; awarded partial credit because it conveys the meaning but loses the idiomatic register.",
      w: "This option is structurally or lexically wrong and reveals non-target recognition of the idiom."
    }
  };
}

const newItems = [];
// V2_LEVEL_BOUNDARY map: a1→A1/A2, a2→A1/A2, b1→A2/B1, b2→B1/B2, c1→B2/C1
A2B1.forEach((e) => newItems.push(mkItem("A2/B1", "B1", "b1", e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], 0.30, 0.78)));
B1B2.forEach((e) => newItems.push(mkItem("B1/B2", "B2", "b2", e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], 0.50, 0.80)));
B2C1.forEach((e) => newItems.push(mkItem("B2/C1", "C1", "c1", e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], 0.68, 0.83)));

console.log("Generated", newItems.length, "idiom items.");

const filePath = path.join(__dirname, "..", "placement-questions-v2.js");
const original = fs.readFileSync(filePath, "utf8");

// Splice before the final `]` of the items array. We find the closing pattern.
// The file ends with `    }\n  ]\n};`. We replace `    }\n  ]\n};` with:
// `    },\n    <new items joined by ,\n    >\n  ]\n};`
const tailPattern = /\s+}\s*\n\s*]\s*\n};\s*$/;
if (!tailPattern.test(original)) {
  console.error("Could not find expected file tail. Aborting.");
  process.exit(1);
}

const insertion = newItems.map((it) => "    " + JSON.stringify(it, null, 2).replace(/\n/g, "\n    ")).join(",\n");
const updated = original.replace(tailPattern, `\n    },\n${insertion}\n  ]\n};\n`);
fs.writeFileSync(filePath, updated, "utf8");
console.log("Wrote", filePath, "→ new file size:", updated.length, "bytes (was", original.length, ")");
