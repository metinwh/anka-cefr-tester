const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "placement-questions-v2.js");

const LEVELS = ["a1", "a2", "b1", "b2", "c1"];
const LEVEL_META = {
  a1: { cefr: "A1", boundary: "A1/A2", diff: 0.18, source: "CEFR_A1" },
  a2: { cefr: "A2", boundary: "A1/A2", diff: 0.30, source: "CEFR_A2" },
  b1: { cefr: "B1", boundary: "A2/B1", diff: 0.43, source: "CEFR_B1" },
  b2: { cefr: "B2", boundary: "B1/B2", diff: 0.58, source: "CEFR_B2" },
  c1: { cefr: "C1", boundary: "B2/C1", diff: 0.76, source: "CEFR_C1" }
};

const TYPE_ORDER = ["vocab", "naturalness_judgment", "pragmatic_choice", "collocation", "phrasal_verb"];
const TYPE_ID = {
  vocab: "vocab",
  naturalness_judgment: "nat",
  pragmatic_choice: "prag",
  collocation: "coll",
  phrasal_verb: "phr"
};
const INSTRUCTION = {
  vocab: "Anlamı seç.",
  naturalness_judgment: "En doğal cümleyi seç.",
  pragmatic_choice: "Duruma en uygun cevabı seç.",
  collocation: "Cümleyi doğal tamamlayan ifadeyi seç.",
  phrasal_verb: "Cümleyi doğal tamamlayan parçacığı seç."
};
const FORMAT = {
  vocab: "meaning_tr_en",
  naturalness_judgment: "choose_natural_sentence",
  pragmatic_choice: "pragmatic_choice",
  collocation: "gap_fill",
  phrasal_verb: "complete_sentence"
};
const SKILLS = {
  vocab: ["recognition"],
  naturalness_judgment: ["pragmatic", "production"],
  pragmatic_choice: ["pragmatic", "register"],
  collocation: ["collocation"],
  phrasal_verb: ["recognition"]
};

function round(n) {
  return Math.round(n * 100) / 100;
}

function source(level, area) {
  return [`${LEVEL_META[level].source}: ${area}`];
}

function idFor(level, type, index) {
  return `v2_${level}_${TYPE_ID[type]}_${String(index).padStart(3, "0")}`;
}

function base(level, type, index, seed) {
  const meta = LEVEL_META[level];
  return {
    id: idFor(level, type, index),
    source_collection: "diagnostic_v2",
    cefr_level: meta.cefr,
    boundary: meta.boundary,
    type,
    format: seed.format || FORMAT[type],
    focus: seed.focus,
    skill_tags: seed.skill_tags || SKILLS[type],
    prompt: seed.prompt,
    prompt_lang: seed.prompt_lang || (type === "vocab" && seed.format !== "gap_fill" ? "tr" : "en"),
    instruction_tr: seed.instruction_tr || INSTRUCTION[type],
    options: seed.options,
    correctId: "k",
    close_competitor: seed.close_competitor,
    estimated_difficulty: round(seed.difficulty ?? meta.diff),
    estimated_discrimination: round(seed.discrimination ?? 0.78),
    lexicon: seed.lexicon,
    distractor_distance: seed.distance || "medium",
    source_grounding: seed.source_grounding || source(level, seed.focus[0] || type),
    signal: seed.signal
  };
}

function roleBased(level, type, index, seed) {
  const item = base(level, type, index, {
    ...seed,
    options: [
      { id: "k", text: seed.key, role: "key" },
      { id: "lt", text: seed.trap, role: "l1_trap" },
      { id: "d", text: seed.distractor, role: "distractor" }
    ],
    close_competitor: {
      id: "cc",
      text: seed.close,
      role: "distractor",
      tier: "close",
      rationale: seed.close_rationale
    },
    signal: seed.signal || `${seed.key} is the target form; the wrong answers are designed to separate transfer from broad misunderstanding.`
  });
  item.trap = {
    lt: seed.trap_explanation || "A Turkish learner may over-map a familiar Turkish meaning or phrase frame onto this English choice.",
    d: seed.distractor_explanation || "This is a broader wrong answer that tests whether the learner knows the target area at all."
  };
  return item;
}

function naturalness(level, index, seed) {
  const item = base(level, "naturalness_judgment", index, {
    ...seed,
    prompt_lang: "tr",
    options: [
      { id: "k", text: seed.key, role: "key", credit: 1, naturalness: "key" },
      { id: "w", text: seed.weak, role: seed.weakRole || "weak", credit: seed.weakCredit ?? 0.25, naturalness: seed.weakRole || "weak" },
      { id: "nn", text: seed.nonnative, role: "nonnative", credit: 0, naturalness: "nonnative" }
    ],
    close_competitor: {
      id: "cc",
      text: seed.close,
      role: seed.closeRole || "weak",
      credit: seed.closeCredit ?? 0.25,
      tier: "close",
      rationale: seed.close_rationale
    },
    scoring_style: "naturalness_judgment",
    signal: seed.signal || "The item checks whether the learner recognizes the sentence that sounds natural in everyday English."
  });
  item.scoring_style = "naturalness_judgment";
  item.rationale = {
    k: seed.key_rationale || "Most natural and idiomatic in this context.",
    w: seed.weak_rationale || "Understandable, but less natural or less idiomatic.",
    nn: seed.nonnative_rationale || "Clearly non-native wording or structure.",
    cc: seed.close_rationale
  };
  return item;
}

function pragmatic(level, index, seed) {
  const item = base(level, "pragmatic_choice", index, {
    ...seed,
    prompt_lang: "tr",
    options: [
      { id: "k", text: seed.key, role: "key", credit: 1, naturalness: "key" },
      { id: "w", text: seed.weak, role: seed.weakRole || "weak", credit: seed.weakCredit ?? 0.3, naturalness: seed.weakRole || "weak" },
      { id: "nn", text: seed.nonnative, role: "nonnative", credit: 0, naturalness: "nonnative" }
    ],
    close_competitor: {
      id: "cc",
      text: seed.close,
      role: seed.closeRole || "weak",
      credit: seed.closeCredit ?? 0.3,
      tier: "close",
      rationale: seed.close_rationale
    },
    scoring_style: "pragmatic_choice",
    signal: seed.signal || "The item checks whether the learner chooses the socially appropriate English response."
  });
  item.scoring_style = "pragmatic_choice";
  item.rationale = {
    k: seed.key_rationale || "Best match for the situation, tone, and register.",
    w: seed.weak_rationale || "Communicatively possible, but less natural or less well-matched.",
    nn: seed.nonnative_rationale || "Wrong communicative act, tone, or wording.",
    cc: seed.close_rationale
  };
  return item;
}

const vocab = {
  a1: [
    ["aç", "Hungry", "Angry", "Heavy", "Thirsty", "basic_states", "hungry", "Oxford_3000: hungry", 0.14, "loose"],
    ["yorgun", "Tired", "Bored", "Ready", "Sleepy", "basic_states", "tired", "Oxford_3000: tired", 0.15, "medium"],
    ["susamış", "Thirsty", "Hungry", "Dirty", "Dry", "basic_states", "thirsty", "Oxford_3000: thirsty", 0.16, "medium"],
    ["boş", "Empty", "Open", "Clean", "Free", "basic_adjectives", "empty", "Oxford_3000: empty", 0.17, "medium"],
    ["ucuz", "Cheap", "Small", "Easy", "Low-cost", "basic_adjectives", "cheap", "Oxford_3000: cheap", 0.18, "tight"],
    ["arkasında", "Behind", "Before", "Beside", "At the back of", "basic_prepositions", "behind", "Oxford_3000: behind", 0.19, "tight"],
    ["önce", "Before", "After", "Already", "Earlier than", "time_words", "before", "Oxford_3000: before", 0.19, "tight"],
    ["sonra", "After", "Again", "Later", "Later than", "time_words", "after", "Oxford_3000: after", 0.18, "tight"],
    ["her zaman", "Always", "Every day", "Everywhere", "Usually", "frequency_adverbs", "always", "Oxford_3000: always", 0.17, "medium"],
    ["asla", "Never", "Ever", "Often", "Not ever", "frequency_adverbs", "never", "Oxford_3000: never", 0.19, "tight"],
    ["bazen", "Sometimes", "Soon", "Several", "Often", "frequency_adverbs", "sometimes", "Oxford_3000: sometimes", 0.18, "medium"],
    ["genç", "Young", "New", "Small", "Teenage", "people_adjectives", "young", "Oxford_3000: young", 0.16, "medium"],
    ["yaşlı", "Old", "Long", "Big", "Elderly", "people_adjectives", "old", "Oxford_3000: old", 0.17, "tight"],
    ["yakın", "Near", "Next", "Here", "Close", "place_words", "near", "Oxford_3000: near", 0.16, "tight"],
    ["uzak", "Far", "Long", "Late", "Distant", "place_words", "far", "Oxford_3000: far", 0.16, "tight"],
    ["erken", "Early", "Fast", "First", "Soon", "time_words", "early", "Oxford_3000: early", 0.18, "tight"],
    ["geç", "Late", "Last", "Slow", "Delayed", "time_words", "late", "Oxford_3000: late", 0.18, "tight"],
    ["tekrar", "Again", "Also", "More", "Once more", "basic_adverbs", "again", "Oxford_3000: again", 0.17, "medium"],
    ["birlikte", "Together", "Between", "Both", "With each other", "social_words", "together", "Oxford_3000: together", 0.20, "tight"],
    ["yalnız", "Alone", "Only", "Single", "By yourself", "social_words", "alone", "Oxford_3000: alone", 0.20, "tight"]
  ],
  a2: [
    ["kabul etmek", "Accept", "Receive", "Take", "Agree", "common_verbs", "accept", "Oxford_3000: accept", 0.28, "tight"],
    ["reddetmek", "Refuse", "Reject", "Return", "Decline", "common_verbs", "refuse", "Oxford_3000: refuse", 0.30, "tight"],
    ["ödünç almak", "Borrow", "Buy", "Lend", "Take temporarily", "common_verbs", "borrow", "Oxford_3000: borrow", 0.31, "tight"],
    ["ödünç vermek", "Lend", "Send", "Borrow", "Loan", "common_verbs", "lend", "Oxford_3000: lend", 0.32, "tight"],
    ["geliştirmek", "Improve", "Grow", "Repair", "Make better", "change_verbs", "improve", "Oxford_3000: improve", 0.32, "tight"],
    ["tercih etmek", "Prefer", "Like", "Choose", "Would rather have", "choice_verbs", "prefer", "Oxford_3000: prefer", 0.31, "tight"],
    ["hazırlamak", "Prepare", "Plan", "Produce", "Get ready", "work_verbs", "prepare", "Oxford_3000: prepare", 0.30, "medium"],
    ["tamir etmek", "Repair", "Change", "Clean", "Fix", "work_verbs", "repair", "Oxford_3000: repair", 0.31, "tight"],
    ["paylaşmak", "Share", "Show", "Divide", "Use together", "social_verbs", "share", "Oxford_3000: share", 0.29, "medium"],
    ["davet etmek", "Invite", "Visit", "Meet", "Ask to come", "social_verbs", "invite", "Oxford_3000: invite", 0.30, "tight"],
    ["karar vermek", "Decide", "Think", "Choose", "Make up your mind", "thinking_verbs", "decide", "Oxford_3000: decide", 0.31, "tight"],
    ["açıklamak", "Explain", "Tell", "Describe", "Make clear", "communication", "explain", "Oxford_3000: explain", 0.33, "tight"],
    ["tanımlamak", "Describe", "Draw", "Explain", "Say what it is like", "communication", "describe", "Oxford_3000: describe", 0.33, "tight"],
    ["seçmek", "Choose", "Chase", "Want", "Pick", "choice_verbs", "choose", "Oxford_3000: choose", 0.29, "medium"],
    ["varmak", "Arrive", "Leave", "Reach", "Get there", "travel_verbs", "arrive", "Oxford_3000: arrive", 0.30, "tight"],
    ["ayrılmak", "Leave", "Live", "Arrive", "Go away", "travel_verbs", "leave", "Oxford_3000: leave", 0.30, "tight"],
    ["geri dönmek", "Return", "Reply", "Repeat", "Come back", "travel_verbs", "return", "Oxford_3000: return", 0.32, "tight"],
    ["devam etmek", "Continue", "Start", "Complete", "Keep going", "process_verbs", "continue", "Oxford_3000: continue", 0.33, "tight"],
    ["karşılaştırmak", "Compare", "Compete", "Connect", "Look at differences", "thinking_verbs", "compare", "Oxford_3000: compare", 0.34, "tight"],
    ["kaçınmak", "Avoid", "Forget", "Escape", "Stay away from", "choice_verbs", "avoid", "Oxford_3000: avoid", 0.35, "tight"]
  ],
  b1: [
    ["azaltmak", "Reduce", "Lower", "Remove", "Decrease", "change_verbs", "reduce", "Oxford_3000: reduce", 0.39, "tight"],
    ["artırmak", "Increase", "Improve", "Rise", "Raise", "change_verbs", "increase", "Oxford_3000: increase", 0.39, "tight"],
    ["gerektirmek", "Require", "Need", "Request", "Demand", "formal_verbs", "require", "Oxford_3000: require", 0.41, "tight"],
    ["önermek", "Suggest", "Offer", "Say", "Recommend", "communication", "suggest", "Oxford_3000: suggest", 0.40, "tight"],
    ["sağlamak", "Provide", "Give", "Protect", "Supply", "formal_verbs", "provide", "Oxford_3000: provide", 0.42, "tight"],
    ["başarmak", "Achieve", "Win", "Reach", "Accomplish", "success_verbs", "achieve", "Oxford_3000: achieve", 0.42, "tight"],
    ["neden olmak", "Cause", "Make", "Reason", "Lead to", "cause_effect", "cause", "Oxford_3000: cause", 0.40, "tight"],
    ["önlemek", "Prevent", "Protect", "Stop", "Keep from happening", "cause_effect", "prevent", "Oxford_3000: prevent", 0.43, "tight"],
    ["katılmak", "Attend", "Join", "Go", "Be present at", "social_verbs", "attend", "Oxford_3000: attend", 0.41, "tight"],
    ["düzenlemek", "Arrange", "Order", "Organize", "Set up", "planning", "arrange", "Oxford_3000: arrange", 0.42, "tight"],
    ["şikayet etmek", "Complain", "Explain", "Argue", "Say you are unhappy", "communication", "complain", "Oxford_3000: complain", 0.40, "tight"],
    ["desteklemek", "Support", "Carry", "Help", "Back", "social_verbs", "support", "Oxford_3000: support", 0.41, "tight"],
    ["bağlı olmak", "Depend", "Need", "Wait", "Rely", "relationship_verbs", "depend", "Oxford_3000: depend", 0.43, "tight"],
    ["içermek", "Include", "Contain", "Add", "Have as part", "academic_bridge", "include", "Oxford_3000: include", 0.42, "tight"],
    ["izin vermek", "Allow", "Let", "Accept", "Permit", "permission_verbs", "allow", "Oxford_3000: allow", 0.41, "tight"],
    ["düşünmek/değerlendirmek", "Consider", "Think", "Decide", "Think carefully about", "thinking_verbs", "consider", "Oxford_3000: consider", 0.44, "tight"],
    ["beklemek/tahmin etmek", "Expect", "Wait", "Hope", "Think will happen", "thinking_verbs", "expect", "Oxford_3000: expect", 0.43, "tight"],
    ["üstesinden gelmek", "Manage", "Control", "Succeed", "Cope with", "success_verbs", "manage", "Oxford_3000: manage", 0.44, "tight"],
    ["fark etmek", "Notice", "Know", "Watch", "Become aware of", "perception", "notice", "Oxford_3000: notice", 0.40, "tight"],
    ["kanıtlamak", "Prove", "Show", "Test", "Demonstrate", "argumentation", "prove", "Oxford_3000: prove", 0.45, "tight"]
  ],
  b2: [
    ["ifşa etmek", "Disclose", "Tell", "Discuss", "Reveal", "formal_register", "disclose", "Oxford_5000: disclose", 0.56, "tight"],
    ["sürdürmek", "Sustain", "Keep", "Support", "Maintain", "formal_verbs", "sustain", "Oxford_5000: sustain", 0.57, "tight"],
    ["geri çekmek", "Withdraw", "Remove", "Return", "Pull back", "formal_verbs", "withdraw", "Oxford_5000: withdraw", 0.58, "tight"],
    ["geliştirmek/artırmak", "Enhance", "Increase", "Enlarge", "Improve", "formal_register", "enhance", "Oxford_5000: enhance", 0.57, "tight"],
    ["edinmek", "Acquire", "Get", "Ask", "Obtain", "formal_verbs", "acquire", "Oxford_5000: acquire", 0.58, "tight"],
    ["değerlendirmek", "Assess", "Guess", "Value", "Evaluate", "academic_bridge", "assess", "Oxford_5000: assess", 0.56, "tight"],
    ["ima etmek", "Imply", "Say", "Mean", "Suggest indirectly", "communication", "imply", "Oxford_5000: imply", 0.59, "tight"],
    ["haklı göstermek", "Justify", "Explain", "Judge", "Defend", "argumentation", "justify", "Oxford_5000: justify", 0.60, "tight"],
    ["elinde tutmak", "Retain", "Keep", "Remain", "Keep hold of", "formal_verbs", "retain", "Oxford_5000: retain", 0.58, "tight"],
    ["elde etmek", "Obtain", "Get", "Hold", "Acquire", "formal_verbs", "obtain", "Oxford_5000: obtain", 0.57, "tight"],
    ["zayıflatmak", "Undermine", "Damage", "Understate", "Weaken", "argumentation", "undermine", "Oxford_5000: undermine", 0.61, "tight"],
    ["göstermek/kanıtlamak", "Demonstrate", "Show", "Describe", "Prove by showing", "academic_bridge", "demonstrate", "Oxford_5000: demonstrate", 0.59, "tight"],
    ["çözmek", "Resolve", "Solve", "Decide", "Settle", "problem_solving", "resolve", "Oxford_5000: resolve", 0.58, "tight"],
    ["ortaya çıkmak", "Emerge", "Appear", "Leave", "Come out", "change_verbs", "emerge", "Oxford_5000: emerge", 0.59, "tight"],
    ["kurmak/oluşturmak", "Establish", "Build", "Start", "Set up", "formal_verbs", "establish", "Oxford_5000: establish", 0.58, "tight"],
    ["azalmak/reddetmek", "Decline", "Refuse", "Fall", "Decrease", "formal_verbs", "decline", "Oxford_5000: decline", 0.60, "tight"],
    ["sürdürmek/korumak", "Maintain", "Keep", "Repair", "Sustain", "formal_verbs", "maintain", "Oxford_5000: maintain", 0.57, "tight"],
    ["peşinden gitmek", "Pursue", "Follow", "Push", "Seek", "formal_verbs", "pursue", "Oxford_5000: pursue", 0.61, "tight"],
    ["kabul etmek/onaylamak", "Acknowledge", "Accept", "Know", "Admit", "communication", "acknowledge", "Oxford_5000: acknowledge", 0.60, "tight"],
    ["dağıtmak", "Distribute", "Give", "Destroy", "Share out", "formal_verbs", "distribute", "Oxford_5000: distribute", 0.59, "tight"]
  ],
  c1: [
    ["The policy may ___ the worst effects.", "mitigate", "reduce", "imitate", "lessen", "precision_verbs", "mitigate", "Oxford_5000: mitigate", 0.72, "tight"],
    ["The committee will ___ the proposal.", "scrutinize", "scan", "criticize", "examine closely", "academic_verbs", "scrutinize", "Oxford_5000: scrutinize", 0.75, "tight"],
    ["The data does not ___ that claim.", "substantiate", "support", "substitute", "prove with evidence", "argumentation", "substantiate", "Oxford_5000: substantiate", 0.77, "tight"],
    ["They tried to ___ the new rule.", "circumvent", "avoid", "circle", "get around", "formal_verbs", "circumvent", "Oxford_5000: circumvent", 0.78, "tight"],
    ["The merger will ___ three teams.", "consolidate", "combine", "confirm", "bring together", "formal_verbs", "consolidate", "Oxford_5000: consolidate", 0.76, "tight"],
    ["We can ___ the author's position.", "infer", "guess", "refer", "deduce", "academic_verbs", "infer", "Oxford_5000: infer", 0.73, "tight"],
    ["The budget will ___ funds differently.", "allocate", "give", "locate", "assign", "formal_verbs", "allocate", "Oxford_5000: allocate", 0.75, "tight"],
    ["The situation may ___ without action.", "deteriorate", "worsen", "determine", "get worse", "change_verbs", "deteriorate", "Oxford_5000: deteriorate", 0.76, "tight"],
    ["The team will ___ the design.", "refine", "improve", "define", "make more precise", "precision_verbs", "refine", "Oxford_5000: refine", 0.74, "tight"],
    ["The benefits may ___ the risks.", "outweigh", "beat", "overweight", "be greater than", "argumentation", "outweigh", "Oxford_5000: outweigh", 0.77, "tight"],
    ["The report may ___ key details.", "omit", "miss", "admit", "leave out", "academic_verbs", "omit", "Oxford_5000: omit", 0.72, "tight"],
    ["Firms must ___ with the law.", "comply", "agree", "complete", "follow", "formal_verbs", "comply", "Oxford_5000: comply", 0.74, "tight"],
    ["The estimate is ___ from old data.", "derived", "taken", "driven", "obtained", "academic_verbs", "derive", "Oxford_5000: derive", 0.76, "tight"],
    ["High costs may ___ future growth.", "constrain", "limit", "complain", "restrict", "formal_verbs", "constrain", "Oxford_5000: constrain", 0.77, "tight"],
    ["The tool will ___ collaboration.", "facilitate", "help", "facility", "make easier", "formal_verbs", "facilitate", "Oxford_5000: facilitate", 0.75, "tight"],
    ["The article will ___ stricter rules.", "advocate", "support", "advertise", "argue for", "argumentation", "advocate", "Oxford_5000: advocate", 0.78, "tight"],
    ["The dates appear to ___.", "coincide", "match", "connect", "happen together", "formal_verbs", "coincide", "Oxford_5000: coincide", 0.75, "tight"],
    ["Savings may ___ the extra cost.", "offset", "balance", "upset", "counterbalance", "formal_verbs", "offset", "Oxford_5000: offset", 0.76, "tight"],
    ["Could you ___ on that point?", "elaborate", "explain", "decorate", "explain further", "communication", "elaborate", "Oxford_5000: elaborate", 0.73, "tight"],
    ["We should ___ possible objections.", "anticipate", "expect", "participate", "foresee", "planning", "anticipate", "Oxford_5000: anticipate", 0.74, "tight"]
  ]
};

function makeVocab(level, row, index) {
  const [prompt, key, trap, distractor, close, focus, lemma, oxford, difficulty, distance] = row;
  return roleBased(level, "vocab", index, {
    prompt,
    prompt_lang: level === "c1" ? "en" : "tr",
    format: level === "c1" ? "gap_fill" : "meaning_tr_en",
    key,
    trap,
    distractor,
    close,
    focus: [focus],
    lexicon: [lemma],
    source_grounding: [oxford],
    difficulty,
    discrimination: level === "a1" ? 0.74 : level === "a2" ? 0.76 : level === "b1" ? 0.79 : level === "b2" ? 0.82 : 0.86,
    distance,
    signal: `${key} targets ${lemma} as a level-specific lexical signal.`,
    trap_explanation: "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
    distractor_explanation: "This option is outside the target meaning area and checks broad recognition.",
    close_rationale: `${close} is a one-level-lower near answer; it is plausible but less precise than ${key}.`
  });
}

const naturalnessRows = {
  a1: [
    ["Hangi cümle doğal?", "I am hungry.", "I have hunger.", "I am hunger.", "I feel hungry.", "basic_states", ["hungry"]],
    ["Hangi soru doğal?", "Where are you from?", "Where do you come?", "From where you are?", "Where do you come from?", "basic_questions", ["from"]],
    ["Hangi cümle doğal?", "She is my sister.", "She my sister is.", "She is sister me.", "She is sister of me.", "family_identity", ["sister"]],
    ["Hangi cümle doğal?", "I go to school.", "I go school.", "I school go.", "I go to the school.", "basic_routines", ["school"]],
    ["Hangi cümle doğal?", "This is my bag.", "This my bag.", "This bag is me.", "This bag is mine.", "possessives", ["bag"]],
    ["Hangi cümle doğal?", "I don't like tea.", "I no like tea.", "I am not like tea.", "I do not drink tea.", "basic_negation", ["tea"]],
    ["Hangi cümle doğal?", "Can I sit here?", "Can I sitting here?", "I can sit here?", "May I sit here?", "basic_permission", ["sit"]],
    ["Hangi cümle doğal?", "It is very cold.", "It has very cold.", "It very cold is.", "It feels very cold.", "weather", ["cold"]],
    ["Hangi cümle doğal?", "I have two brothers.", "I have two brother.", "I two brothers have.", "I have two siblings.", "plural_after_number", ["brother"]],
    ["Hangi cümle doğal?", "See you tomorrow.", "See you in tomorrow.", "Tomorrow see you.", "I'll see you tomorrow.", "farewells", ["tomorrow"]]
  ],
  a2: [
    ["Arkadaşına plan soruyorsun. Hangisi doğal?", "What are you doing later?", "What do you do later?", "What you do later?", "What will you do later?", "plans", ["later"]],
    ["Restoranda söylüyorsun. Hangisi doğal?", "Could I have some water?", "Can I take some water?", "Give me some water.", "Can I have water?", "restaurant_requests", ["water"]],
    ["Geç kaldığını söylüyorsun. Hangisi doğal?", "Sorry I'm late.", "Sorry for I am late.", "I am sorry to late.", "Sorry for being late.", "apology", ["late"]],
    ["Yardım teklif ediyorsun. Hangisi doğal?", "Do you need any help?", "Do you need some helps?", "You need help?", "Can I help you?", "offers", ["help"]],
    ["Bir yeri tarif ediyorsun. Hangisi doğal?", "It's next to the bank.", "It's near of the bank.", "It is next the bank.", "It is beside the bank.", "place_description", ["next"]],
    ["Bir alışkanlığı anlatıyorsun. Hangisi doğal?", "I usually walk to work.", "I walk usually to work.", "Usually I am walk work.", "I normally walk to work.", "frequency", ["usually"]],
    ["Telefonla cevap veriyorsun. Hangisi doğal?", "Could you repeat that?", "Can you say again that?", "Repeat this to me.", "Could you say that again?", "clarification", ["repeat"]],
    ["Bir şey seçiyorsun. Hangisi doğal?", "I prefer the blue one.", "I prefer more blue one.", "I am prefer the blue.", "I'd rather take the blue one.", "preferences", ["prefer"]],
    ["Arkadaşına öneri veriyorsun. Hangisi doğal?", "You should see a doctor.", "You must to see doctor.", "You should see doctor.", "You ought to see a doctor.", "advice", ["doctor"]],
    ["Deneyim anlatıyorsun. Hangisi doğal?", "I've been there once.", "I went there one time ago.", "I have there been once.", "I have visited once.", "experience", ["once"]]
  ],
  b1: [
    ["İş yerinde hangisi doğal?", "I need to check the details.", "I need check the details.", "I need checking details.", "I need to look into the details.", "work_tasks", ["details"]],
    ["E-posta cümlesi. Hangisi doğal?", "Thanks for getting back to me.", "Thanks to turn back to me.", "Thanks for return me.", "Thanks for replying to me.", "email_response", ["reply"]],
    ["Kibar rica. Hangisi doğal?", "Would you mind opening the window?", "Would you mind to open the window?", "Would you mind open window?", "Could you open the window?", "polite_requests", ["mind"]],
    ["Bir problemi açıklıyorsun. Hangisi doğal?", "The file seems to be missing.", "The file seems missing itself.", "The file looks like not there.", "It looks like the file is missing.", "problem_explanation", ["missing"]],
    ["Toplantıda söz alıyorsun. Hangisi doğal?", "Can I add something here?", "Can I add a thing in here?", "I add something here?", "Could I add something here?", "turn_taking", ["add"]],
    ["Sebep veriyorsun. Hangisi doğal?", "I couldn't come because I was ill.", "I couldn't come because of I was ill.", "I didn't come for I was ill.", "I was ill, so I couldn't come.", "cause", ["because"]],
    ["Bir deneyimi anlatıyorsun. Hangisi doğal?", "I've never tried sushi.", "I never tried sushi in my life.", "I didn't never try sushi.", "I haven't tried sushi before.", "experience", ["try"]],
    ["Karşılaştırma yapıyorsun. Hangisi doğal?", "This option is slightly cheaper.", "This option is more cheap.", "This option cheaper is.", "This option costs a little less.", "comparison", ["cheaper"]],
    ["Plan değiştiriyorsun. Hangisi doğal?", "Let's put the meeting off.", "Let's delay the meeting to later.", "Let's make meeting later.", "Let's postpone the meeting.", "plans", ["postpone"]],
    ["Açıklama istiyorsun. Hangisi doğal?", "Could you clarify what you mean?", "Could you make clear what mean?", "What you mean clarify?", "Could you explain what you mean?", "clarification", ["clarify"]]
  ],
  b2: [
    ["Yoğun bir iş gününde iş arkadaşından kısa bir yardım istiyorsun; nazik ama fazla resmi olmayan bir ton kullanıyorsun.", "Would you mind giving me a hand?", "Could you give me a hand?", "Would you have wanting to help?", "Could you help me with this?", "polite_requests", ["mind", "hand"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["İş arkadaşın sana gecikmeyi haber verdi. Profesyonel ama sıcak bir e-posta cevabı yazıyorsun.", "I appreciate you letting me know.", "Thank you for letting me know.", "I appreciate for your information.", "Thanks for letting me know.", "email_register", ["appreciate"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Toplantıda bir öneriye henüz tam ikna olmadığını, karşı tarafı doğrudan reddetmeden söylüyorsun.", "I'm not entirely convinced yet.", "I'm not fully convinced yet.", "I don't convinced yet.", "I'm not completely convinced yet.", "stance", ["convinced"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Raporun kısa özetinde sonuçların önceki verilerle büyük ölçüde uyumlu olduğunu söylüyorsun.", "The results are broadly consistent.", "The results are mostly consistent.", "The results are generally same.", "The results are largely consistent.", "academic_register", ["consistent"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Toplantıda bir fikre kibarca karşı çıkıyorsun; karşı tarafı küçümsemeden çekinceni belirtiyorsun.", "I see your point, but I'm not sure.", "I understand your point, but I have concerns.", "Your point is wrong.", "I understand, but I'm not sure.", "diplomatic_disagreement", ["point"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["İki veri kaynağı arasında açıklanması gereken küçük bir tutarsızlık olduğunu resmi bir tonda belirtiyorsun.", "There seems to be a discrepancy.", "There appears to be a discrepancy.", "There seems a discrepancy exists.", "There seems to be some inconsistency.", "formal_problem", ["discrepancy"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir metin taslağına nazik geri bildirim veriyorsun; sorun içerikte değil, ifadenin açıklığında.", "The wording could be a bit clearer.", "The wording could be clearer.", "The words must clear more.", "This could be worded a little more clearly.", "feedback", ["wording"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir gecikmenin olası nedenini resmi bir tonda açıklıyorsun.", "That may account for the delay.", "That might explain the delay.", "That can be delay reason.", "That could explain the delay.", "cause_effect", ["account"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir karar vermeden önce seçeneklerin artılarını ve eksilerini değerlendirmek gerektiğini söylüyorsun.", "We need to weigh the options.", "We need to consider the options.", "We need to weight the options.", "We need to look at the options carefully.", "decision_language", ["weigh"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Resmi bir sunumda anlattığın bulgunun daha geniş bir tartışma başlattığını söylüyorsun.", "This raises a broader question.", "This brings up a broader question.", "This makes a wider question.", "This opens up a broader question.", "presentation_language", ["raise"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }]
  ],
  c1: [
    ["Akademik tartışmada bir iddianın çok genel kaldığını ve daha dikkatli sınırlandırılması gerektiğini söylüyorsun.", "The claim requires further qualification.", "The claim needs to be qualified.", "The claim wants qualification more.", "The claim needs further qualification.", "academic_argument", ["qualification"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Yöneticinin varsayımlarından emin değilsin; doğrudan karşı çıkmadan onları yeniden değerlendirmeyi öneriyorsun.", "Could we revisit those assumptions?", "Might we revisit those assumptions?", "Your assumptions are not good.", "Could we look again at those assumptions?", "diplomatic_register", ["assumptions"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir raporda mevcut kanıtların kesin bir sonuca varmak için yeterince güçlü olmadığını temkinli biçimde ifade ediyorsun.", "The evidence remains somewhat inconclusive.", "The evidence is still inconclusive.", "Evidence stays a little not conclusive.", "The evidence is not yet conclusive.", "hedging", ["inconclusive"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Strateji toplantısında önerilen yaklaşımın beklenenin tersine zarar verebileceğini diplomatik biçimde söylüyorsun.", "That approach may prove counterproductive.", "That approach might backfire.", "That way can make opposite productivity.", "That approach could end up being counterproductive.", "precision_register", ["counterproductive"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Akademik bir özetin sonunda bulguların aşırı kesin yorumlanmaması gerektiğini belirtiyorsun.", "The findings should be interpreted cautiously.", "The findings need cautious interpretation.", "Findings must be interpreted with cautionly.", "The findings should be treated with caution.", "academic_register", ["interpret"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Toplantıda bir öneriyi tamamen reddetmediğini, ama henüz net biçimde kabul de etmediğini söylüyorsun.", "I wouldn't rule it out entirely.", "I wouldn't dismiss it completely.", "I don't throw it out total.", "I wouldn't rule it out completely.", "nuanced_stance", ["rule out"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir makale eleştirisinde argümanın ikna edici olduğunu, fakat bazı iddiaların fazla ileri götürüldüğünü söylüyorsun.", "The argument is persuasive but overstated.", "The argument is strong but exaggerated.", "The argument persuades but over-says.", "The argument is convincing, but it goes too far.", "critical_review", ["overstated"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir politika kararında iki fayda arasında yapılan fedakarlığın savunulmasının zor olduğunu açıklıyorsun.", "The trade-off is difficult to justify.", "The trade-off is hard to defend.", "The trade-off is hard for justify.", "It is difficult to justify that trade-off.", "policy_language", ["trade-off"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir araştırma toplantısında, çalışmanın küçük örneklem yüzünden daha geniş gruplara genellenemeyeceğini söylüyorsun.", "The sample size limits generalizability.", "The sample size limits the conclusions.", "Sample size limits to generalize.", "The small sample limits how far we can generalize.", "research_register", ["generalizability"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Üst düzey bir danışmandan aldığın geri bildirime cevap veriyorsun ve sonraki adım için ek yönlendirme istemeye açık olduğunu kibarca belirtiyorsun.", "I would welcome any further guidance.", "Any further guidance would be welcome.", "I would be happy for guidance.", "I would appreciate any further guidance.", "formal_email", ["guidance"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }]
  ]
};

function makeNaturalness(level, row, index) {
  const [prompt, key, weak, nonnative, close, focus, lexicon, tuning = {}] = row;
  return naturalness(level, index, {
    prompt,
    key,
    weak,
    nonnative,
    close,
    weakRole: tuning.weakRole,
    weakCredit: tuning.weakCredit,
    closeRole: tuning.closeRole,
    closeCredit: tuning.closeCredit,
    focus: [focus],
    lexicon,
    difficulty: LEVEL_META[level].diff + (index % 5) * 0.01,
    discrimination: level === "c1" ? 0.88 : level === "b2" ? 0.86 : level === "b1" ? 0.82 : level === "a2" ? 0.77 : 0.73,
    distance: level === "a1" ? "medium" : "tight",
    source_grounding: source(level, `naturalness_${focus}`),
    close_rationale: "This is understandable and near the target, but it is less idiomatic or less precise than the key."
  });
}

const pragmaticRows = {
  a1: [
    ["Biri sana “Hello” diyor. Ne dersin?", "Hello.", "Yes.", "Why hello?", "Hi.", "greetings", ["hello"]],
    ["Biri teşekkür ediyor. Ne dersin?", "You're welcome.", "Yes, please.", "Welcome to you.", "No problem.", "thanks_response", ["welcome"]],
    ["Biri “How are you?” diyor. Ne dersin?", "I'm fine, thanks.", "I am good person.", "My age is fine.", "Good, thanks.", "small_talk", ["fine"]],
    ["Birinden su istiyorsun. Ne dersin?", "Water, please.", "Give water.", "I want water now.", "Can I have water?", "basic_request", ["water"]],
    ["Yanlışlıkla çarptın. Ne dersin?", "Sorry.", "I am mistake.", "You are sorry.", "I'm sorry.", "apology", ["sorry"]],
    ["Vedalaşıyorsun. Ne dersin?", "Goodbye.", "Go good.", "I go bye.", "See you.", "farewells", ["goodbye"]],
    ["Birini ilk kez görüyorsun. Ne dersin?", "Nice to meet you.", "Nice to see your meet.", "Why you meet?", "Good to meet you.", "meeting", ["meet"]],
    ["Bir şeyi anlamadın. Ne dersin?", "I don't understand.", "I no understand.", "Understand not.", "I didn't understand.", "clarification", ["understand"]]
  ],
  a2: [
    ["Biri “Nice to meet you” diyor. Ne dersin?", "Nice to meet you too.", "Thanks, you too.", "Why are you happy?", "You too.", "meeting_response", ["meet"]],
    ["Kafede sipariş veriyorsun. Ne dersin?", "Could I have a coffee?", "Give me coffee.", "I take coffee to me.", "Can I get a coffee?", "service_request", ["coffee"]],
    ["Arkadaşın hasta. Ne dersin?", "I hope you feel better soon.", "Get better.", "Be healthy now.", "Hope you get better soon.", "sympathy", ["better"]],
    ["Bir teklif sana uymuyor. Ne dersin?", "Sorry, I can't make it.", "No, I don't come.", "I cannot exist there.", "I can't come, sorry.", "declining", ["make it"]],
    ["Birinden tekrar etmesini istiyorsun.", "Could you say that again?", "Say again.", "Repeat me.", "Can you repeat that?", "clarification", ["repeat"]],
    ["Arkadaşın iyi haber verdi. Ne dersin?", "That's great news!", "Very good for you.", "I accept your news.", "Great, congratulations!", "congratulations", ["news"]],
    ["Yol tarifi istiyorsun. Ne dersin?", "How do I get to the station?", "Where station goes?", "How can station find me?", "How can I get to the station?", "directions", ["station"]],
    ["Bir daveti kibarca reddediyorsun.", "Thanks, but I already have plans.", "No, I am busy.", "I don't want your plan.", "Thanks, but I'm busy.", "polite_refusal", ["plans"]]
  ],
  b1: [
    ["İş arkadaşından yardım istiyorsun.", "Could you help me with this?", "Help me with this.", "You must help this.", "Can you help me with this?", "work_request", ["help"]],
    ["Toplantıya geç kalacaksın.", "I'm running a few minutes late.", "I am late some minutes.", "I come late, wait.", "I'll be a few minutes late.", "delay_notice", ["late"]],
    ["Bir öneriye kısmen katılıyorsun.", "That could work, but I'm not sure.", "Maybe yes but no.", "It works or not.", "That might work.", "agreement_nuance", ["work"]],
    ["Müşteriye problemi anlatıyorsun.", "We're looking into the issue.", "We are looking the problem.", "Problem is being looked by us.", "We're checking the issue.", "customer_support", ["issue"]],
    ["Birinden açıklama istiyorsun.", "Could you clarify the last point?", "Explain last point again.", "Make clear last point.", "Could you explain the last point?", "clarification", ["clarify"]],
    ["Nazikçe aynı fikirde değilsin.", "I'm not sure I agree.", "I don't agree with you.", "Your idea is wrong.", "I'm not sure about that.", "soft_disagreement", ["agree"]],
    ["Bir hatayı kibarca söylüyorsun.", "There may be a small mistake here.", "There is mistake here.", "You made wrong here.", "This might be a mistake.", "feedback", ["mistake"]],
    ["Geri bildirim için teşekkür ediyorsun.", "Thanks for the feedback.", "Thanks for your criticize.", "Your feedback is accepted.", "Thanks, that's helpful.", "feedback_response", ["feedback"]]
  ],
  b2: [
    ["Toplantıda yöneticin yanlış bir veri paylaştı. Onu doğrudan utandırmadan düzeltmek istiyorsun.", "Could we double-check those figures?", "Those figures may need another look.", "Those figures are wrong.", "Maybe we should revisit the figures.", "diplomatic_correction", ["figures"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir önerinin riskli olduğunu düşünüyorsun ama kişiyi kırmadan söylemek istiyorsun.", "I have some reservations about that.", "I'm not fully convinced by that yet.", "I don't like that idea.", "I'm not fully convinced by that.", "hedged_disagreement", ["reservations"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["E-postada gecikmeyi açıklıyorsun.", "Apologies for the delay in replying.", "Sorry, I answer late.", "I was late to reply you.", "Sorry for the late reply.", "email_apology", ["delay"]],
    ["Bir müşteri ürünle ilgili öfkeli bir mesaj yazdı. Empati kurup konuşmayı sakinleştirmek istiyorsun.", "I understand how frustrating this must be.", "I can see why you're upset.", "Please calm down before we continue.", "I can see why you're frustrated.", "customer_empathy", ["frustration"], { weakRole: "acceptable", weakCredit: 0.65, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Toplantıda sözü toparlıyorsun.", "To sum up, we have two options.", "At sum, two options exist.", "The end is two options.", "In short, we have two options.", "discourse_management", ["sum up"]],
    ["Bir riskten kibarca bahsediyorsun.", "That might create some issues later.", "That will make problems.", "This is risky thing.", "That could cause issues later.", "risk_language", ["issues"]],
    ["Meslektaşının önerisini geliştiriyorsun.", "Could we build on that idea?", "Can we add over that idea?", "Your idea needs more.", "Maybe we can develop that idea.", "collaboration", ["build on"]],
    ["Resmi bir e-postayı bitirirken karşı tarafın soru sorabileceğini nazikçe belirtmek istiyorsun.", "Please let me know if anything is unclear.", "Let me know if you have any questions.", "Tell me if you don't understand.", "Let me know if anything is unclear.", "formal_email", ["unclear"], { weakRole: "acceptable", weakCredit: 0.65, closeRole: "acceptable", closeCredit: 0.6 }]
  ],
  c1: [
    ["Üst düzey toplantıda veride sorun fark ettin; hem saygılı hem net olmalısın.", "Might we double-check those figures?", "Those figures look slightly off to me.", "Your figures are wrong.", "Could we revisit those figures?", "executive_diplomacy", ["figures"], { weakRole: "acceptable", weakCredit: 0.6, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Bir öneriyi tamamen reddetmeden şu an öncelik olmadığını belirtmek istiyorsun.", "I wouldn't rule it out entirely.", "It may be worth revisiting later.", "This is not relevant to us.", "I wouldn't dismiss it outright.", "nuanced_response", ["rule out"], { weakRole: "acceptable", weakCredit: 0.65, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Akademik sunumda sınırlılık söylüyorsun.", "This does not capture every case.", "This is not perfect.", "It doesn't include all things.", "This only captures the main trend.", "limitations", ["capture"]],
    ["Bir iddiayı yumuşatmak istiyorsun.", "That may be putting it too strongly.", "That is too strong.", "You say it too much.", "That wording may be too strong.", "hedging", ["strongly"]],
    ["Kıdemli bir kişinin fikrine alternatif bir çerçeve sunuyorsun.", "Another way to frame it might be...", "We might frame it slightly differently.", "Your framing is wrong.", "We might frame it differently.", "senior_register", ["frame"], { weakRole: "acceptable", weakCredit: 0.65, closeRole: "acceptable", closeCredit: 0.6 }],
    ["Belirsiz sonucu raporluyorsun.", "The evidence points in that direction.", "The evidence says yes.", "Evidence tells this way.", "The evidence seems to suggest that.", "evidence_language", ["evidence"]],
    ["Eleştiriyi diplomatik veriyorsun.", "The reasoning is sound, but incomplete.", "Your reason is not enough.", "This logic misses parts.", "The reasoning is solid but limited.", "diplomatic_feedback", ["reasoning"]],
    ["Kararın aceleye gelmemesi gerektiğini profesyonelce söylüyorsun.", "It may be premature to decide today.", "It might be too early to decide today.", "We should not decide because it is early.", "It might be too early to decide.", "strategic_delay", ["premature"], { weakRole: "acceptable", weakCredit: 0.65, closeRole: "acceptable", closeCredit: 0.6 }]
  ]
};

function makePragmatic(level, row, index) {
  const [prompt, key, weak, nonnative, close, focus, lexicon, tuning = {}] = row;
  return pragmatic(level, index, {
    prompt,
    key,
    weak,
    nonnative,
    close,
    weakRole: tuning.weakRole,
    weakCredit: tuning.weakCredit,
    closeRole: tuning.closeRole,
    closeCredit: tuning.closeCredit,
    focus: [focus],
    lexicon,
    difficulty: LEVEL_META[level].diff + 0.02 + (index % 4) * 0.01,
    discrimination: level === "c1" ? 0.89 : level === "b2" ? 0.86 : level === "b1" ? 0.82 : level === "a2" ? 0.77 : 0.73,
    distance: level === "a1" ? "medium" : "tight",
    source_grounding: source(level, `pragmatic_${focus}`),
    close_rationale: "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
  });
}

const collocationRows = {
  a1: [
    ["I ___ breakfast at 8.", "have", "do", "make", "eat", "everyday_meals", ["breakfast", "have"]],
    ["Please ___ attention.", "pay", "give", "make", "take", "classroom_collocations", ["attention", "pay"]],
    ["I ___ a shower every morning.", "take", "do", "make", "have", "daily_routines", ["shower", "take"]],
    ["She ___ her homework after dinner.", "does", "makes", "takes", "finishes", "school_collocations", ["homework", "do"]],
    ["We ___ a photo together.", "take", "make", "do", "snap", "everyday_actions", ["photo", "take"]],
    ["He ___ the bus at 7.", "takes", "uses", "rides", "catches", "transport_collocations", ["bus", "take"]]
  ],
  a2: [
    ["I need to ___ a decision today.", "make", "do", "take", "choose", "decision_collocations", ["decision", "make"]],
    ["She ___ a mistake in the form.", "made", "did", "wrote", "made a small", "error_collocations", ["mistake", "make"]],
    ["They ___ time together on Sundays.", "spend", "pass", "make", "hang out", "time_collocations", ["time", "spend"]],
    ["Please ___ your promise.", "keep", "hold", "make", "honor", "promise_collocations", ["promise", "keep"]],
    ["He ___ a cold last week.", "caught", "took", "had", "got", "health_collocations", ["cold", "catch"]],
    ["We should ___ money for the trip.", "save", "win", "keep", "put aside", "money_collocations", ["money", "save"]]
  ],
  b1: [
    ["The company will ___ a meeting tomorrow.", "hold", "make", "do", "arrange", "work_collocations", ["meeting", "hold"]],
    ["This change could ___ problems later.", "cause", "make", "give", "lead to", "cause_effect", ["problem", "cause"]],
    ["The teacher ___ feedback on my essay.", "gave", "made", "did", "provided", "feedback_collocations", ["feedback", "give"]],
    ["We need to ___ the deadline.", "meet", "catch", "reach", "stick to", "deadline_collocations", ["deadline", "meet"]],
    ["She ___ responsibility for the mistake.", "took", "made", "held", "accepted", "responsibility", ["responsibility", "take"]],
    ["The new rule will ___ effect next week.", "take", "make", "do", "come into", "formal_collocations", ["effect", "take"]]
  ],
  b2: [
    ["The report ___ light on the delay.", "sheds", "throws", "opens", "casts", "formal_collocations", ["light", "shed"]],
    ["The evidence ___ doubt on the claim.", "casts", "makes", "throws", "raises", "argument_collocations", ["doubt", "cast"]],
    ["We need to ___ a balance.", "strike", "hit", "make", "find", "abstract_collocations", ["balance", "strike"]],
    ["The policy ___ a risk to growth.", "poses", "puts", "makes", "creates", "risk_collocations", ["risk", "pose"]],
    ["The team ___ an agreement yesterday.", "reached", "arrived", "made", "came to", "agreement_collocations", ["agreement", "reach"]],
    ["The findings ___ the need for reform.", "highlight", "show", "light", "emphasize", "academic_collocations", ["need", "highlight"]]
  ],
  c1: [
    ["The proposal ___ considerable merit.", "has", "carries", "owns", "holds", "evaluation_collocations", ["merit", "have"]],
    ["The evidence ___ close scrutiny.", "warrants", "wants", "needs", "deserves", "academic_collocations", ["scrutiny", "warrant"]],
    ["The policy ___ unintended consequences.", "entails", "includes", "makes", "involves", "policy_collocations", ["consequences", "entail"]],
    ["The report ___ a distinction between them.", "draws", "makes", "does", "establishes", "argument_collocations", ["distinction", "draw"]],
    ["The plan ___ serious reservations.", "raises", "lifts", "makes", "prompts", "stance_collocations", ["reservations", "raise"]],
    ["The data ___ a different interpretation.", "supports", "holds", "gives", "lends support to", "evidence_collocations", ["interpretation", "support"]]
  ]
};

function makeCollocation(level, row, index) {
  const [prompt, key, trap, distractor, close, focus, lexicon] = row;
  return roleBased(level, "collocation", index, {
    prompt,
    key,
    trap,
    distractor,
    close,
    focus: [focus, "L1_trap_turkish"],
    lexicon,
    difficulty: LEVEL_META[level].diff + 0.04 + index * 0.01,
    discrimination: level === "c1" ? 0.88 : level === "b2" ? 0.86 : level === "b1" ? 0.83 : level === "a2" ? 0.79 : 0.75,
    distance: level === "a1" ? "medium" : "tight",
    source_grounding: source(level, `collocation_${focus}`),
    signal: `${key} is the natural collocation in this sentence.`,
    trap_explanation: "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
    distractor_explanation: "This word does not naturally collocate with the noun in this context.",
    close_rationale: `${close} is semantically close and may work in related contexts, but it is not the best collocation here.`
  });
}

const phrasalRows = {
  a1: [
    ["Please sit ___.", "down", "to", "under", "here", "basic_particles", ["sit"]],
    ["Stand ___, please.", "up", "on", "out", "straight", "basic_particles", ["stand"]],
    ["Come ___, please.", "in", "at", "to", "inside", "basic_particles", ["come"]],
    ["Wake ___ at seven.", "up", "on", "out", "early", "daily_routines", ["wake"]],
    ["Turn ___ the light.", "on", "open", "up", "on the lamp", "basic_actions", ["turn", "light"]],
    ["Put ___ your coat.", "on", "wear", "in", "on your jacket", "clothes", ["put", "coat"]]
  ],
  a2: [
    ["Please fill ___ this form.", "in", "inside", "on", "out", "forms", ["fill", "form"]],
    ["I grew ___ in Ankara.", "up", "on", "out", "up in", "life_story", ["grow"]],
    ["Can you look ___ my bag?", "after", "behind", "for", "take care of", "care", ["look", "bag"]],
    ["We ran ___ of milk.", "out", "away", "off", "out of", "supplies", ["run", "milk"]],
    ["Take ___ your shoes.", "off", "out", "down", "off your boots", "clothes", ["take", "shoes"]],
    ["Please write ___ your name.", "down", "under", "off", "write it down", "classroom", ["write", "name"]]
  ],
  b1: [
    ["He turned ___ the offer.", "down", "off", "out", "away", "rejection", ["turn", "offer"]],
    ["The meeting was put ___.", "off", "out", "away", "back", "scheduling", ["put", "meeting"]],
    ["I need to look ___ the issue.", "into", "inside", "at", "investigate", "problem_solving", ["look", "issue"]],
    ["She brought ___ an important point.", "up", "out", "on", "raised", "discussion", ["bring", "point"]],
    ["We carried ___ working late.", "on", "over", "out", "continued", "continuation", ["carry", "work"]],
    ["They set ___ a small business.", "up", "on", "out", "started", "business", ["set", "business"]]
  ],
  b2: [
    ["We need to follow ___ on this.", "up", "after", "out", "through", "work_process", ["follow"]],
    ["The plan fell ___.", "through", "down", "off", "apart", "failure", ["fall", "plan"]],
    ["She came ___ as very confident.", "across", "over", "out", "across to us", "impression", ["come", "confident"]],
    ["The company backed ___ of the deal.", "out", "off", "away", "away from", "negotiation", ["back", "deal"]],
    ["We need to sort ___ the problem.", "out", "off", "away", "resolve", "problem_solving", ["sort", "problem"]],
    ["The result bears ___ his theory.", "out", "on", "up", "supports", "argumentation", ["bear", "theory"]]
  ],
  c1: [
    ["The new facts call ___ a review.", "for", "to", "up", "require", "formal_phrasals", ["call", "review"]],
    ["The argument hinges ___ one assumption.", "on", "in", "at", "depends on", "argumentation", ["hinge", "assumption"]],
    ["The proposal runs ___ the guidelines.", "counter to", "opposite", "over", "against", "formal_phrasals", ["run", "guidelines"]],
    ["We need to factor ___ hidden costs.", "in", "inside", "up", "include", "analysis", ["factor", "costs"]],
    ["The report bears ___ closer inspection.", "on", "to", "over", "relates to", "formal_phrasals", ["bear", "inspection"]],
    ["Her account does not add ___.", "up", "on", "out", "make sense", "logic", ["add", "account"]]
  ]
};

function makePhrasal(level, row, index) {
  const [prompt, key, trap, distractor, close, focus, lexicon] = row;
  return roleBased(level, "phrasal_verb", index, {
    prompt,
    key,
    trap,
    distractor,
    close,
    focus: [focus, "phrasal_verbs"],
    lexicon,
    difficulty: LEVEL_META[level].diff + 0.05 + index * 0.01,
    discrimination: level === "c1" ? 0.88 : level === "b2" ? 0.86 : level === "b1" ? 0.82 : level === "a2" ? 0.78 : 0.74,
    distance: level === "a1" ? "medium" : "tight",
    source_grounding: source(level, `phrasal_${focus}`),
    signal: `${key} completes the phrasal verb naturally in context.`,
    trap_explanation: "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
    distractor_explanation: "This particle forms a different or impossible expression in this context.",
    close_rationale: `${close} is close in meaning or appears in a related expression, but it is not the target phrasal verb here.`
  });
}

const items = [];
for (const level of LEVELS) {
  vocab[level].forEach((row, i) => items.push(makeVocab(level, row, i + 1)));
  naturalnessRows[level].forEach((row, i) => items.push(makeNaturalness(level, row, i + 1)));
  pragmaticRows[level].forEach((row, i) => items.push(makePragmatic(level, row, i + 1)));
  collocationRows[level].forEach((row, i) => items.push(makeCollocation(level, row, i + 1)));
  phrasalRows[level].forEach((row, i) => items.push(makePhrasal(level, row, i + 1)));
}

const boundaryOrder = { "A1/A2": 0, "A2/B1": 1, "B1/B2": 2, "B2/C1": 3 };
const typeOrder = Object.fromEntries(TYPE_ORDER.map((type, i) => [type, i]));
items.sort((a, b) =>
  boundaryOrder[a.boundary] - boundaryOrder[b.boundary] ||
  LEVELS.indexOf(a.id.split("_")[1]) - LEVELS.indexOf(b.id.split("_")[1]) ||
  typeOrder[a.type] - typeOrder[b.type] ||
  a.id.localeCompare(b.id)
);

const content = {
  version: "diagnostic_v2",
  source: "codex_authored",
  generated_at: "2026-05-15T00:00:00.000Z",
  levels: ["A1", "A2", "B1", "B2", "C1"],
  boundaries: ["A1/A2", "A2/B1", "B1/B2", "B2/C1"],
  items
};

const header = "window.NEKTAR_PLACEMENT_CONTENT_V2 = ";
fs.writeFileSync(OUT, `${header}${JSON.stringify(content, null, 2)};\n`, "utf8");
console.log(`Wrote ${items.length} items to ${OUT}`);
