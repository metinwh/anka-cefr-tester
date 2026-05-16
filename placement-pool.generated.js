(function () {
  const content = window.NEKTAR_PLACEMENT_CONTENT;
  if (!content || content.generated_pool_loaded) return;

  const generated = [];
  const seenIds = new Set(content.items.map((item) => item.id));
  const serials = { "A1/A2": 200, "A2/B1": 200, "B1/B2": 200, "B2/C1": 200 };
  const compact = { "A1/A2": "a1a2", "A2/B1": "a2b1", "B1/B2": "b1b2", "B2/C1": "b2c1" };
  const boundaryTarget = { "A1/A2": "A1-A2", "A2/B1": "A2-B1", "B1/B2": "B1-B2", "B2/C1": "B2-C1" };

  function nextId(boundary, type) {
    serials[boundary] += 1;
    return `gen_${compact[boundary]}_${type}_${String(serials[boundary]).padStart(3, "0")}`;
  }

  function opt(id, text, role) {
    return { id, text, role };
  }

  function defaultFormatForType(type) {
    return {
      vocab: "meaning_tr_en",
      grammar: "gap_fill",
      idiom: "idiom_meaning",
      collocation: "collocation_choice",
      function: "function_choice",
      phrasal_verb: "complete_sentence",
      natural_speech: "dialogue_response",
      spoken_chunk: "dialogue_response",
      discourse_marker: "situation_choice",
      sentence_building: "sentence_rebuild",
      naturalness_judgment: "naturalness_judgment",
      pragmatic_choice: "pragmatic_choice"
    }[type] || "complete_sentence";
  }

  function add(item) {
    if (seenIds.has(item.id)) return;
    seenIds.add(item.id);
    generated.push(item);
  }

  function addVocab(seed) {
    const id = nextId(seed.boundary, "vocab");
    add({
      id,
      family_id: `oxford_${seed.level}_${seed.focus}`,
      stem_variant_id: `tr_prompt_${seed.word.replace(/\W+/g, "_")}`,
      option_variant_id: `dynamic_${seed.distance}`,
      rendered_item_id: id,
      boundary: seed.boundary,
      type: "vocab",
      format: "meaning_tr_en",
      dynamic_distractors: true,
      segment: "oxford_vocabulary",
      focus: [`oxford_${seed.word.replace(/\W+/g, "_")}`, seed.focus],
      skill_tags: ["oxford_3000_5000", "meaning_recognition", seed.focus],
      lexicon: [seed.word],
      target_word: seed.word,
      target_level: seed.level,
      target_pos: seed.pos,
      source_word_id: seed.sourceId,
      distractor_distance: seed.distance,
      prompt: seed.tr,
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      answer: seed.word,
      options: [
        opt("o1", seed.word, "key"),
        opt("o2", seed.l1[0], "l1_trap"),
        opt("o3", seed.dev[0], "developmental_error")
      ],
      correctId: "o1",
      signal: seed.signal,
      trap: {
        o2: seed.l1Trap,
        o3: seed.devTrap
      },
      distractor_pools: {
        easy_l1_trap: seed.easyL1 || seed.l1,
        l1_trap: seed.l1,
        hard_l1_trap: seed.hardL1 || seed.l1,
        easy_developmental_error: seed.easyDev || seed.dev,
        developmental_error: seed.dev,
        hard_developmental_error: seed.hardDev || seed.dev
      },
      estimated_difficulty: seed.difficulty,
      estimated_discrimination: seed.discrimination,
      source_grounding: [`Oxford_3000_5000: ${seed.sourceId} ${seed.word} ${seed.pos}`]
    });
  }

  function inferredLexicon(variant, family) {
    const seed = [variant.lexicon, family.lexicon].flat().filter(Boolean);
    if (seed.length) return seed;
    const text = [variant.prompt, variant.key].join(" ").toLowerCase();
    const stop = new Set(["the", "and", "you", "your", "are", "is", "was", "were", "with", "that", "this", "for", "from", "have", "has", "had", "will", "would", "could", "should", "can", "one", "some", "they", "them", "their", "there", "then", "than"]);
    return [...new Set((text.match(/[a-z']{3,}/g) || []).filter((word) => !stop.has(word)).slice(0, 8))];
  }

  function asPool(value, fallback) {
    const raw = value === undefined ? fallback : value;
    return (Array.isArray(raw) ? raw : [raw]).map((entry) => String(entry || "").trim()).filter(Boolean);
  }

  function buildDistractorPools(variant) {
    const l1Pool = asPool(variant.l1Pool, variant.l1);
    const devPool = asPool(variant.devPool, variant.dev);
    return {
      easy_l1_trap: asPool(variant.easyL1Pool, l1Pool.slice(0, 2)),
      l1_trap: l1Pool,
      hard_l1_trap: asPool(variant.hardL1Pool, l1Pool),
      easy_developmental_error: asPool(variant.easyDevPool, devPool.slice(0, 2)),
      developmental_error: devPool,
      hard_developmental_error: asPool(variant.hardDevPool, devPool)
    };
  }

  function simplifyGeneratedPrompt(prompt, family) {
    const text = String(prompt || "").replace(/\s+/g, " ").trim();
    if (!text) return text;
    if (text.length <= 110 && wordCount(text) <= 16) return text;
    if (!["function", "natural_speech", "spoken_chunk", "discourse_marker", "pragmatic_choice", "naturalness_judgment"].includes(family.type)) return text;
    if (family.type === "function") return compactFunctionPrompt(text);

    const directSentence = text.match(/^(?:You are|You|Your|A|The|Someone)[^.]+\.\s+(.+)$/);
    if (directSentence && wordCount(directSentence[1]) <= 18 && !/^(?:Choose the best|What is the most natural)/i.test(directSentence[1])) return cleanupPrompt(directSentence[1]);

    const wantMatch = text.match(/^(?:You are|You|Your|A|The|Someone).+?\b(?:and|, and)\s+you\s+(?:want|need)\s+to\s+([^.]+)\.?$/i);
    if (wantMatch) return cleanupPrompt(`Choose the best way to ${wantMatch[1]}.`);

    const chooseMatch = text.match(/^(?:You are|You|Your|A|The|Someone).+?\b(Choose the best [^.]+\.?)$/i);
    if (chooseMatch) return cleanupPrompt(text);

    const naturalMatch = text.match(/^(?:You are|You|Your|A|The|Someone).+?\b(What is the most natural [^?]+\?)$/i);
    if (naturalMatch) return cleanupPrompt(text);

    const stripped = cleanupPrompt(text
      .replace(/^You are writing [^.]+\.?\s*/i, "")
      .replace(/^You are preparing [^.]+\.?\s*/i, "")
      .replace(/^You are presenting [^.]+\.?\s*/i, "")
      .replace(/^You are giving [^.]+\.?\s*/i, "")
      .replace(/^You are editing [^.]+\.?\s*/i, "")
      .replace(/^You are replying to [^.]+\.?\s*/i, "")
      .replace(/^You are reviewing [^.]+\.?\s*/i, "")
      .replace(/^You are comparing [^.]+\.?\s*/i, "")
      .replace(/^You are explaining [^.]+\.?\s*/i, "")
      .replace(/^You are summarizing [^.]+\.?\s*/i, ""));
    return stripped || text;
  }

  function compactFunctionPrompt(text) {
    const known = compactKnownFunctionPrompt(text);
    if (known) return known;
    const context = functionContext(text);
    const task = functionTask(text);
    const core = functionCoreSentence(text);
    const prompt = task ? `${context} ${task}` : `${context} ${core}`;
    return cleanupPrompt(prompt) || text;
  }

  function compactKnownFunctionPrompt(text) {
    const lower = text.toLowerCase();
    if (/cannot attend tomorrow morning's meeting/.test(lower)) return "You are writing to your team leader. Say you cannot attend tomorrow's meeting.";
    if (/sending a file to a colleague/.test(lower)) return "You are writing to a colleague. Ask them to check a file quickly.";
    if (/summarizing a likely effect/.test(lower)) return "You are writing to a manager. Summarize the likely effect.";
    if (/bad cough/.test(lower)) return "You are talking to a friend who asks for advice about a bad cough.";
    if (/planning meeting to delay a decision/.test(lower)) return "You are speaking to your manager. Suggest waiting for more data.";
    if (/senior colleague and need one more document/.test(lower)) return "You are emailing a senior colleague. Ask for one more document.";
    if (/homework problem/.test(lower)) return "You are talking to a friend. Suggest a sensible homework step.";
    if (/exhausted after work/.test(lower)) return "You are talking to a friend. Give simple advice for tonight.";
    if (/improve their english/.test(lower)) return "You are talking to a friend. Suggest a realistic English routine.";
    if (/budget forecast/.test(lower)) return "You are speaking to managers in a budget meeting. Avoid sounding certain about future costs.";
    if (/safety policy/.test(lower)) return "You are speaking to staff about a work policy. Say the rule usually applies, not always.";
    if (/less absolute/.test(lower)) return "You are speaking in a seminar. Choose the best way to make it less absolute.";
    return "";
  }

  function functionContext(text) {
    const lower = text.toLowerCase();
    if (/friend|classmate/.test(lower)) return "You are talking to a friend.";
    if (/teacher|tutor|supervisor|student/.test(lower)) return "You are writing for a teacher.";
    if (/client/.test(lower)) return "You are writing to a client.";
    if (/colleague|email|work project/.test(lower)) return "You are writing a work message to a colleague.";
    if (/manager|meeting|staff|quarterly|budget|sales|project/.test(lower)) return "You are speaking to a manager in a work setting.";
    if (/research|report|study|method|evidence|sample|data|policy/.test(lower)) return "You are writing a short report for a reader.";
    return "You are choosing the best sentence for a reader.";
  }

  function functionTask(text) {
    const patterns = [
      { re: /\band need them to ([^.]+)\.?/i, prefix: "Ask the reader to " },
      { re: /\band want them to ([^.]+)\.?/i, prefix: "Ask the reader to " },
      { re: /\band need to ([^.]+)\.?/i, prefix: "Choose the best way to " },
      { re: /\band want to ([^.]+)\.?/i, prefix: "Choose the best way to " },
      { re: /\byou need them to ([^.]+)\.?/i, prefix: "Ask the reader to " },
      { re: /\byou want them to ([^.]+)\.?/i, prefix: "Ask the reader to " },
      { re: /\byou need to ([^.]+)\.?/i, prefix: "Choose the best way to " },
      { re: /\byou want to ([^.]+)\.?/i, prefix: "Choose the best way to " },
      { re: /\bneed a ([^.]+)\.?/i, prefix: "Choose the best " },
      { re: /\bwant a ([^.]+)\.?/i, prefix: "Choose the best " }
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern.re);
      if (match) return cleanupPrompt(`${pattern.prefix}${match[1]}.`);
    }
    return "";
  }

  function functionCoreSentence(text) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    const withBlank = sentences.find((sentence) => sentence.includes("_____"));
    if (withBlank) return cleanupPrompt(withBlank);
    return cleanupPrompt(sentences.at(-1) || text);
  }

  function cleanupPrompt(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\s+\./g, ".")
      .trim();
  }

  function wordCount(text) {
    return String(text || "").split(/\s+/).filter(Boolean).length;
  }

  function itemTrapExplanation(kind, variant, family) {
    const focusText = `${family.focus || ""} ${(family.skill_tags || []).join(" ")}`.toLowerCase();
    const wrong = kind === "l1_trap" ? variant.l1 : variant.dev;
    const key = variant.key;
    const roleIntro = kind === "l1_trap"
      ? `In this item, "${wrong}" is the transfer trap against "${key}".`
      : `In this item, "${wrong}" is the form-control trap against "${key}".`;

    if (/article|a_an|the\b/.test(focusText)) return `${roleIntro} Turkish does not mark a/an/the, so the learner may choose by literal noun meaning rather than English countability and reference.`;
    if (/plural|count_noun/.test(focusText)) return `${roleIntro} Turkish keeps nouns singular after numbers, so this option checks number transfer in this exact noun phrase.`;
    if (/preposition|postposition|case/.test(focusText)) return `${roleIntro} Turkish case/postposition meanings are broader, so the wrong option tests this sentence's specific English preposition frame.`;
    if (/present_continuous|aspect/.test(focusText)) return `${roleIntro} Turkish present marking can cover habitual and current actions, but this prompt needs the English now-action form.`;
    if (/perfect|duration|since|for/.test(focusText)) return `${roleIntro} Turkish does not map neatly to English present-perfect duration, so this option checks the continuing-to-now reading.`;
    if (/condition/.test(focusText)) return `${roleIntro} The option follows a translated tense pattern, but this condition frame needs the English clause pattern shown by the key.`;
    if (/indirect_question|word_order/.test(focusText)) return `${roleIntro} The option keeps direct-question order, while this embedded question requires statement word order.`;
    if (/collocation|make_do|verb_noun/.test(focusText)) return `${roleIntro} The wrong verb is semantically nearby, but this noun takes the fixed English collocation "${key}".`;
    if (/phrasal/.test(focusText)) return `${roleIntro} The verb/particle combination is close in surface form but does not carry the phrasal meaning required here.`;
    if (/idiom|phrase|chunk|fixed/.test(focusText)) return `${roleIntro} The words look related, but the fixed expression in this context is "${key}".`;
    if (/concession|contrast|discourse|marker/.test(focusText)) return `${roleIntro} The option gives a nearby discourse relation, but this sentence needs the exact contrast/concession frame "${key}".`;
    if (/function|request|polite|register|email|meeting/.test(focusText)) return `${roleIntro} The message may communicate something, but it misses the relationship, register, or action required by this situation.`;

    return `${roleIntro} It is item-specific: the distractor competes with the key in meaning or surface form, but breaks the focus "${family.focus}".`;
  }

  function addFamily(family) {
    let variantIndex = 0;
    for (const variant of family.variants) {
      variantIndex += 1;
      const id = nextId(family.boundary, family.type);
      const prompt = simplifyGeneratedPrompt(variant.prompt, family);
      add({
        id,
        family_id: family.family_id || `${family.boundary.toLowerCase().replace(/\W+/g, "_")}_${family.type}_${family.focus}`,
        stem_variant_id: variant.stem_variant_id || `stem_${String(variantIndex).padStart(2, "0")}`,
        option_variant_id: variant.option_variant_id || `option_${String(variantIndex).padStart(2, "0")}`,
        rendered_item_id: id,
        boundary: family.boundary,
        type: family.type,
        format: family.format || defaultFormatForType(family.type),
        dynamic_distractors: true,
        segment: family.segment || family.type,
        focus: [family.focus],
        skill_tags: family.skill_tags,
        lexicon: inferredLexicon(variant, family),
        distractor_distance: family.distance,
        prompt,
        prompt_lang: "en",
        instruction_tr: family.instruction || "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
        options: [
          opt("o1", variant.key, "key"),
          opt("o2", variant.l1, "l1_trap"),
          opt("o3", variant.dev, "developmental_error")
        ],
        correctId: "o1",
        signal: variant.signal || family.signal,
        trap: {
          o2: variant.l1Trap || itemTrapExplanation("l1_trap", variant, family) || family.l1Trap,
          o3: variant.devTrap || itemTrapExplanation("developmental_error", variant, family) || family.devTrap
        },
        distractor_pools: variant.distractor_pools || buildDistractorPools(variant),
        estimated_difficulty: family.difficulty,
        estimated_discrimination: family.discrimination,
        source_grounding: family.source_grounding
      });
    }
  }

  function naturalOption(id, text, role, credit, naturalness) {
    return { id, text, role, credit, naturalness: naturalness || role };
  }

  function addNaturalnessFamily(family) {
    let variantIndex = 0;
    for (const variant of family.variants) {
      variantIndex += 1;
      const type = family.type || "pragmatic_choice";
      const id = nextId(family.boundary, type);
      const best = variant.best;
      const acceptable = variant.acceptable;
      const weak = variant.weak;
      const prompt = simplifyGeneratedPrompt(variant.prompt, { ...family, type });
      add({
        id,
        family_id: family.family_id || `${family.boundary.toLowerCase().replace(/\W+/g, "_")}_${type}_${family.focus}`,
        stem_variant_id: variant.stem_variant_id || `stem_${String(variantIndex).padStart(2, "0")}`,
        option_variant_id: variant.option_variant_id || `naturalness_${String(variantIndex).padStart(2, "0")}`,
        rendered_item_id: id,
        boundary: family.boundary,
        type,
        format: "pragmatic_choice",
        scoring_style: "pragmatic_choice",
        dynamic_distractors: true,
        segment: family.segment || "pragmatic_naturalness",
        focus: [family.focus],
        skill_tags: family.skill_tags,
        lexicon: inferredLexicon({ prompt: variant.prompt, key: best, lexicon: variant.lexicon }, family),
        distractor_distance: family.distance || "near",
        prompt,
        prompt_lang: "en",
        instruction_tr: family.instruction || "Duruma g\u00f6re en do\u011fal ve uygun cevab\u0131 se\u00e7in.",
        options: [
          naturalOption("o1", best, "key", 1, "best_fit"),
          naturalOption("o2", acceptable, variant.acceptableRole || "acceptable", variant.acceptableCredit ?? 0.75, variant.acceptableLabel || "acceptable"),
          naturalOption("o3", weak, variant.weakRole || "weak_nonnative", variant.weakCredit ?? 0.35, variant.weakLabel || "weak_nonnative")
        ],
        correctId: "o1",
        signal: variant.signal || family.signal || "This item scores communicative fit, naturalness, register, and grammar as separate signals.",
        rationale: {
          o1: variant.bestRationale || "Best fit for the context, tone, and level.",
          o2: variant.acceptableRationale || "Communicatively acceptable, but less natural, less precise, or less context-sensitive.",
          o3: variant.weakRationale || "Understandable or related, but weaker because of tone, register, phrasing, or control."
        },
        naturalness_option_pools: {
          best: asPool(variant.bestPool, best),
          acceptable: asPool(variant.acceptablePool, acceptable),
          weak: asPool(variant.weakPool, weak)
        },
        estimated_difficulty: family.difficulty,
        estimated_discrimination: family.discrimination,
        source_grounding: family.source_grounding
      });
    }
  }

  const vocabSeeds = [
    ["A1/A2", "ask", "sormak", "verb", "A1", "oxford_A1_00056", "basic_verbs", "answer,tell,say", "speak,learn,reply"],
    ["A1/A2", "answer", "soruya cevap vermek", "verb", "A1", "oxford_A1_00040", "basic_verbs", "ask,solve,write", "say,tell,explain"],
    ["A1/A2", "buy", "sat\u0131n almak", "verb", "A1", "oxford_A1_00128", "daily_actions", "sell,pay,bring", "take,get,borrow"],
    ["A1/A2", "sell", "satmak", "verb", "A1", "oxford_A1_00802", "daily_actions", "buy,pay,give", "take,send,show"],
    ["A1/A2", "find", "bulmak", "verb", "A1", "oxford_A1_00336", "basic_verbs", "look for,lose,search", "see,know,get"],
    ["A1/A2", "lose", "kaybetmek", "verb", "A1", "oxford_A1_00522", "basic_verbs", "miss,find,leave", "forget,fail,drop"],
    ["A1/A2", "leave", "ayr\u0131lmak / b\u0131rakmak", "verb", "A1", "oxford_A1_00501", "polysemy_light", "live,let,stay", "go,forget,lose"],
    ["A1/A2", "arrive", "bir yere varmak", "verb", "A1", "oxford_A1_00053", "movement_verbs", "leave,depart,return", "go,travel,visit"],
    ["A1/A2", "cheap", "ucuz", "adjective", "A1", "oxford_A1_00156", "basic_adjectives", "expensive,low,free", "small,bad,poor"],
    ["A1/A2", "expensive", "pahal\u0131", "adjective", "A1", "oxford_A1_00298", "basic_adjectives", "cheap,valuable,rich", "big,high,strong"],
    ["A1/A2", "before", "\u00f6nce", "preposition", "A1", "oxford_A1_00086", "time_words", "after,ago,early", "first,soon,until"],
    ["A1/A2", "after", "sonra", "preposition", "A1", "oxford_A1_00019", "time_words", "before,later,ago", "then,until,over"],
    ["A2/B1", "accept", "bir teklif ya da daveti kabul etmek", "verb", "A2", "oxford_A2_00003", "abstract_verbs", "except,receive,refuse", "take,allow,admit"],
    ["A2/B1", "allow", "birine bir \u015feyi yapma izni vermek", "verb", "A2", "oxford_A2_00030", "modal_meaning", "afford,accept,avoid", "agree,enable,approve"],
    ["A2/B1", "improve", "geli\u015ftirmek / iyile\u015fmek", "verb", "A2", "oxford_A2_00443", "change_verbs", "develop,repair,increase", "grow,change,learn"],
    ["A2/B1", "increase", "artmak / miktar\u0131 y\u00fckselmek", "verb", "A2", "oxford_A2_00451", "change_verbs", "decrease,improve,include", "grow,add,upgrade"],
    ["A2/B1", "remain", "ayn\u0131 durumda kalmak", "verb", "B1", "oxford_B1_00640", "state_verbs", "remind,leave,return", "wait,keep,stand"],
    ["A2/B1", "suggest", "\u00f6nermek", "verb", "A2", "oxford_A2_00869", "communication_verbs", "offer,advise,say", "show,tell,request"],
    ["A2/B1", "advice", "tavsiye", "noun", "A2", "oxford_A2_00012", "noun_verb_family", "advise,idea,warning", "help,tip,rule"],
    ["A2/B1", "purpose", "ama\u00e7", "noun", "B1", "oxford_B1_00604", "abstract_nouns", "reason,aim,cause", "plan,point,goal"],
    ["A2/B1", "condition", "ko\u015ful / durum", "noun", "A2", "oxford_A2_00194", "polysemy", "situation,rule,health", "state,case,requirement"],
    ["A2/B1", "available", "kullan\u0131labilir / m\u00fcsait", "adjective", "A2", "oxford_A2_00073", "adjectives", "possible,empty,ready", "open,able,visible"],
    ["A2/B1", "common", "yayg\u0131n / ortak", "adjective", "A2", "oxford_A2_00185", "adjectives", "general,ordinary,shared", "popular,usual,same"],
    ["A2/B1", "several", "birka\u00e7", "determiner", "A2", "oxford_A2_00811", "quantifiers", "some,many,few", "various,number,single"],
    ["B1/B2", "accurate", "hatas\u0131z ve do\u011fru", "adjective", "B2", "oxford_B2_00012", "precision_words", "actual,clear,proper", "true,careful,close"],
    ["B1/B2", "actual", "ger\u00e7ek / asl\u0131nda olan", "adjective", "B2", "oxford_B2_00018", "precision_words", "current,accurate,main", "present,proper,clear"],
    ["B1/B2", "assume", "varsaymak", "verb", "B2", "oxford_B2_00092", "academic_verbs", "suppose,consume,accept", "guess,think,claim"],
    ["B1/B2", "aware", "fark\u0131nda", "adjective", "B1", "oxford_B1_00051", "state_adjectives", "conscious,known,awake", "sure,clear,careful"],
    ["B1/B2", "challenge", "zorluk / meydan okumak", "noun", "B1", "oxford_B1_00118", "polysemy", "problem,competition,change", "difficulty,test,task"],
    ["B1/B2", "consider", "d\u00fc\u015f\u00fcnmek / de\u011ferlendirmek", "verb", "B1", "oxford_B1_00174", "thinking_verbs", "think about,regard,include", "decide,believe,check"],
    ["B1/B2", "evidence", "bir iddiay\u0131 destekleyen kan\u0131t", "noun", "B2", "oxford_B2_00482", "argumentation", "claim,example,sign", "reason,data,argument"],
    ["B1/B2", "maintain", "s\u00fcrd\u00fcrmek / korumak", "verb", "B2", "oxford_B2_00872", "academic_verbs", "keep,repair,claim", "continue,protect,hold"],
    ["B1/B2", "significant", "kayda de\u011fer \u00f6l\u00e7\u00fcde \u00f6nemli", "adjective", "B2", "oxford_B2_01283", "academic_adjectives", "symbolic,serious,special", "big,strong,noticeable"],
    ["B1/B2", "tend", "e\u011filiminde olmak", "verb", "B2", "oxford_B2_01432", "academic_verbs", "intend,look after,usually", "prefer,try,care"],
    ["B1/B2", "approach", "bir konuya yakla\u015f\u0131m", "noun", "B2", "oxford_B2_00069", "academic_nouns", "arrival,access,route", "plan,entry,attitude"],
    ["B1/B2", "impact", "bir \u015feyin yaratt\u0131\u011f\u0131 etki", "noun", "B1", "oxford_B1_00387", "academic_nouns", "crash,importance,contact", "result,change,force"],
    ["B2/C1", "ambiguous", "iki anlama gelebilen", "adjective", "C1", "oxford_C1_00042", "advanced_adjectives", "ambitious,obvious,complex", "general,confusing,uncertain"],
    ["B2/C1", "convey", "duygu ya da d\u00fc\u015f\u00fcnceyi ifade ederek iletmek", "verb", "B2", "oxford_B2_00308", "communication_verbs", "carry,transfer,convince", "contact,contain,deliver"],
    ["B2/C1", "crucial", "\u00e7ok \u00f6nemli", "adjective", "B2", "oxford_B2_00342", "advanced_adjectives", "critical,central,serious", "important,urgent,basic"],
    ["B2/C1", "distinguish", "ay\u0131rt etmek", "verb", "B2", "oxford_B2_00420", "cognitive_verbs", "separate,recognize,divide", "compare,notice,choose"],
    ["B2/C1", "enhance", "kalitesini ya da etkisini art\u0131rmak", "verb", "C1", "oxford_C1_00428", "academic_verbs", "enlarge,enable,enforce", "support,raise,encourage"],
    ["B2/C1", "notion", "kavram / fikir", "noun", "B2", "oxford_B2_00949", "abstract_nouns", "idea,concept,motion", "belief,thought,term"],
    ["B2/C1", "precise", "ayr\u0131nt\u0131l\u0131 ve tam olarak kesin", "adjective", "B2", "oxford_B2_01071", "precision_words", "specific,strict,proper", "clear,careful,true"],
    ["B2/C1", "substantial", "hat\u0131r\u0131 say\u0131l\u0131r miktarda", "adjective", "C1", "oxford_C1_01225", "academic_adjectives", "solid,actual,symbolic", "serious,visible,formal"],
    ["B2/C1", "undergo", "ge\u00e7irmek / maruz kalmak", "verb", "C1", "oxford_C1_01332", "advanced_verbs", "experience,go under,undertake", "suffer,receive,face"],
    ["B2/C1", "virtually", "neredeyse, fiilen", "adverb", "B2", "oxford_B2_01521", "stance_adverbs", "actually,online,physically", "really,visually,formally"],
    ["B2/C1", "whereas", "iki fikri kar\u015f\u0131la\u015ft\u0131r\u0131rken: oysa / halbuki", "conjunction", "B2", "oxford_B2_01552", "discourse_markers", "whereby,therefore,unless", "because,besides,where"],
    ["B2/C1", "thereby", "bu yolla / bunun arac\u0131l\u0131\u011f\u0131yla", "adverb", "C1", "oxford_C1_01266", "discourse_markers", "therefore,there,thereafter", "so,thus,whereby"]
  ].map(([boundary, word, tr, pos, level, sourceId, focus, l1, dev]) => ({
    boundary, word, tr, pos, level, sourceId, focus,
    distance: boundary === "A1/A2" ? "far" : boundary === "A2/B1" ? "medium" : "near",
    l1: l1.split(","),
    dev: dev.split(","),
    easyL1: l1.split(",").slice(0, 2),
    hardL1: l1.split(","),
    easyDev: dev.split(",").slice(0, 2),
    hardDev: dev.split(","),
    signal: `'${word}' matches the Turkish cue '${tr}' in this Oxford ${level} sense.`,
    l1Trap: "This distractor is a close translation, word-family, or Turkish-transfer trap.",
    devTrap: "This distractor is semantically related but not the target sense.",
    difficulty: boundary === "A1/A2" ? 0.25 : boundary === "A2/B1" ? 0.45 : boundary === "B1/B2" ? 0.65 : 0.8,
    discrimination: boundary === "A1/A2" ? 0.3 : boundary === "A2/B1" ? 0.34 : boundary === "B1/B2" ? 0.38 : 0.42
  }));

  vocabSeeds.forEach(addVocab);

  const extraVocabSeeds = [
    ["A1/A2", "need", "ihtiyac\u0131 olmak", "verb", "A1", "oxford_extra_A1_need", "basic_verbs", "want,ask,wait", "take,use,have"],
    ["A1/A2", "choose", "se\u00e7mek", "verb", "A1", "oxford_extra_A1_choose", "basic_verbs", "change,check,pick up", "take,find,decide"],
    ["A1/A2", "carry", "ta\u015f\u0131mak", "verb", "A1", "oxford_extra_A1_carry", "daily_actions", "bring,take,hold", "move,wear,keep"],
    ["A1/A2", "borrow", "\u00f6d\u00fcn\u00e7 almak", "verb", "A2", "oxford_extra_A2_borrow", "daily_actions", "lend,owe,buy", "take,bring,receive"],
    ["A1/A2", "return", "geri d\u00f6nmek / geri vermek", "verb", "A2", "oxford_extra_A2_return", "polysemy_light", "repeat,reply,remain", "come back,give back,go"],
    ["A1/A2", "early", "erken", "adjective", "A1", "oxford_extra_A1_early", "time_words", "late,soon,first", "before,fast,young"],
    ["A1/A2", "busy", "me\u015fgul / yo\u011fun", "adjective", "A1", "oxford_extra_A1_busy", "basic_adjectives", "full,crowded,working", "hard,active,fast"],
    ["A1/A2", "enough", "yeterli", "determiner", "A2", "oxford_extra_A2_enough", "quantifiers", "many,much,plenty", "some,full,ready"],
    ["A2/B1", "arrange", "d\u00fczenlemek / ayarlamak", "verb", "B1", "oxford_extra_B1_arrange", "planning_verbs", "organize,prepare,order", "plan,put,fix"],
    ["A2/B1", "avoid", "ka\u00e7\u0131nmak", "verb", "B1", "oxford_extra_B1_avoid", "verb_patterns", "prevent,escape,miss", "stop,leave,refuse"],
    ["A2/B1", "cause", "sebep olmak", "verb", "A2", "oxford_extra_A2_cause", "cause_effect", "reason,make,lead", "create,do,affect"],
    ["A2/B1", "compare", "kar\u015f\u0131la\u015ft\u0131rmak", "verb", "A2", "oxford_extra_A2_compare", "academic_verbs", "contrast,compete,check", "look,match,measure"],
    ["A2/B1", "expect", "beklemek / ummak", "verb", "A2", "oxford_extra_A2_expect", "thinking_verbs", "wait,hope,accept", "think,want,guess"],
    ["A2/B1", "include", "i\u00e7ermek / dahil etmek", "verb", "A2", "oxford_extra_A2_include", "academic_verbs", "involve,contain,inside", "add,cover,enter"],
    ["A2/B1", "notice", "fark etmek", "verb", "A2", "oxford_extra_A2_notice", "perception_verbs", "realize,watch,note", "see,find,know"],
    ["A2/B1", "opportunity", "f\u0131rsat", "noun", "B1", "oxford_extra_B1_opportunity", "abstract_nouns", "chance,possibility,option", "time,offer,choice"],
    ["A2/B1", "require", "gerektirmek", "verb", "B1", "oxford_extra_B1_require", "formal_verbs", "need,request,ask", "want,depend,demand"],
    ["A2/B1", "suitable", "uygun", "adjective", "B1", "oxford_extra_B1_suitable", "adjectives", "proper,available,comfortable", "right,useful,good"],
    ["B1/B2", "assess", "de\u011ferlendirmek", "verb", "B2", "oxford_extra_B2_assess", "academic_verbs", "evaluate,access,estimate", "check,judge,measure"],
    ["B1/B2", "conduct", "y\u00fcr\u00fctmek / ger\u00e7ekle\u015ftirmek", "verb", "B2", "oxford_extra_B2_conduct", "research_verbs", "carry out,behave,lead", "do,manage,perform"],
    ["B1/B2", "decline", "azalmak / reddetmek", "verb", "B2", "oxford_extra_B2_decline", "polysemy", "decrease,refuse,fall", "drop,deny,reduce"],
    ["B1/B2", "establish", "kurmak / ortaya koymak", "verb", "B2", "oxford_extra_B2_establish", "academic_verbs", "set up,prove,settle", "build,show,create"],
    ["B1/B2", "feature", "\u00f6zellik", "noun", "B1", "oxford_extra_B1_feature", "academic_nouns", "characteristic,part,face", "detail,quality,point"],
    ["B1/B2", "indicate", "g\u00f6stermek / i\u015faret etmek", "verb", "B2", "oxford_extra_B2_indicate", "academic_verbs", "show,suggest,point", "tell,mean,mark"],
    ["B1/B2", "overall", "genel olarak / genel", "adjective", "B2", "oxford_extra_B2_overall", "discourse_markers", "general,total,finally", "whole,main,usually"],
    ["B1/B2", "relevant", "ilgili / konuyla ba\u011flant\u0131l\u0131", "adjective", "B2", "oxford_extra_B2_relevant", "academic_adjectives", "related,relative,important", "suitable,useful,connected"],
    ["B1/B2", "shift", "de\u011fi\u015fim / de\u011fi\u015ftirmek", "noun", "B2", "oxford_extra_B2_shift", "change_nouns", "change,move,turn", "switch,trend,period"],
    ["B1/B2", "widespread", "yayg\u0131n", "adjective", "B2", "oxford_extra_B2_widespread", "academic_adjectives", "common,wide,distributed", "popular,general,large"],
    ["B2/C1", "constraint", "k\u0131s\u0131tlama", "noun", "C1", "oxford_extra_C1_constraint", "academic_nouns", "limit,restraint,condition", "problem,barrier,rule"],
    ["B2/C1", "contradict", "\u00e7eli\u015fmek / kar\u015f\u0131 \u00e7\u0131kmak", "verb", "C1", "oxford_extra_C1_contradict", "argumentation", "deny,oppose,contrast", "disagree,conflict,answer"],
    ["B2/C1", "hence", "bu nedenle", "adverb", "C1", "oxford_extra_C1_hence", "discourse_markers", "therefore,thus,afterwards", "so,then,because"],
    ["B2/C1", "inherent", "do\u011fas\u0131nda bulunan", "adjective", "C1", "oxford_extra_C1_inherent", "academic_adjectives", "intrinsic,natural,internal", "built-in,basic,own"],
    ["B2/C1", "likewise", "benzer \u015fekilde", "adverb", "C1", "oxford_extra_C1_likewise", "discourse_markers", "similarly,also,otherwise", "too,same,therefore"],
    ["B2/C1", "nevertheless", "buna ra\u011fmen", "adverb", "C1", "oxford_extra_C1_nevertheless", "discourse_markers", "however,nonetheless,therefore", "still,but,although"],
    ["B2/C1", "plausible", "makul / akla yatk\u0131n", "adjective", "C1", "oxford_extra_C1_plausible", "stance_adjectives", "possible,believable,probable", "logical,realistic,likely"],
    ["B2/C1", "prior", "\u00f6nceki / daha \u00f6nce", "adjective", "C1", "oxford_extra_C1_prior", "academic_adjectives", "previous,before,former", "earlier,past,initial"],
    ["B2/C1", "reluctant", "isteksiz", "adjective", "C1", "oxford_extra_C1_reluctant", "stance_adjectives", "unwilling,hesitant,resistant", "not ready,slow,careful"],
    ["B2/C1", "solely", "yaln\u0131zca", "adverb", "C1", "oxford_extra_C1_solely", "precision_adverbs", "only,merely,alone", "just,simply,entirely"],
    ["B2/C1", "subtle", "ince / fark edilmesi zor", "adjective", "C1", "oxford_extra_C1_subtle", "advanced_adjectives", "slight,delicate,hidden", "small,quiet,indirect"],
    ["B2/C1", "undermine", "zay\u0131flatmak / sarsmak", "verb", "C1", "oxford_extra_C1_undermine", "argumentation", "weaken,damage,understate", "hurt,reduce,threaten"]
  ].map(([boundary, word, tr, pos, level, sourceId, focus, l1, dev]) => ({
    boundary, word, tr, pos, level, sourceId, focus,
    distance: boundary === "A1/A2" ? "far" : boundary === "A2/B1" ? "medium" : "near",
    l1: l1.split(","),
    dev: dev.split(","),
    easyL1: l1.split(",").slice(0, 2),
    hardL1: l1.split(","),
    easyDev: dev.split(",").slice(0, 2),
    hardDev: dev.split(","),
    signal: `'${word}' matches the Turkish cue '${tr}' in this Oxford ${level} sense.`,
    l1Trap: "This distractor is a close translation, synonym-neighbour, word-family, or Turkish-transfer trap.",
    devTrap: "This distractor is semantically related but misses the target sense or register.",
    difficulty: boundary === "A1/A2" ? 0.27 : boundary === "A2/B1" ? 0.47 : boundary === "B1/B2" ? 0.67 : 0.82,
    discrimination: boundary === "A1/A2" ? 0.31 : boundary === "A2/B1" ? 0.35 : boundary === "B1/B2" ? 0.39 : 0.43
  }));

  extraVocabSeeds.forEach(addVocab);

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "articles", skill_tags: ["articles", "countable_nouns", "turkish_no_articles"],
    distance: "far", difficulty: 0.28, discrimination: 0.31, source_grounding: ["EGP_A1_articles", "Turkish_L1_article_absence"],
    signal: "English singular countable nouns normally need an article.",
    l1Trap: "Turkish has no article system, so learners often omit the article.",
    devTrap: "A developmental article-choice error.",
    variants: [
      ["My aunt works at the city hospital. She is _____ doctor.", "a", "no article", "the", "doctor"],
      ["Cem is _____ engineer at a small technology company.", "an", "no article", "the", "engineer"],
      ["Mina paints portraits. She is _____ artist.", "an", "no article", "the", "artist"],
      ["There is _____ old book on the desk in my room.", "an", "no article", "the", "old book"],
      ["There is _____ umbrella by the door.", "an", "no article", "the", "umbrella"],
      ["Our new teacher is _____ English teacher from Izmir.", "an", "no article", "the", "English teacher"],
      ["They live in _____ small flat near the station.", "a", "no article", "the", "small flat"],
      ["I have _____ interesting idea for our class project.", "an", "no article", "the", "interesting idea"]
    ].map(([prompt, key, l1, dev, lexicon]) => ({ prompt, key, l1, dev, lexicon: [lexicon] }))
  });

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "plural_after_number", skill_tags: ["plural_s", "count_nouns", "turkish_number_singular"],
    distance: "far", difficulty: 0.27, discrimination: 0.31, source_grounding: ["EGP_A1_plural_nouns", "Turkish_L1_number_noun_transfer"],
    signal: "English count nouns normally become plural after numbers greater than one.",
    l1Trap: "Turkish keeps nouns singular after numerals.",
    devTrap: "A developmental spelling overgeneralization.",
    variants: [
      ["two _____", "brothers", "brother", "brotheres"], ["three _____", "sisters", "sister", "sisteres"],
      ["four _____", "chairs", "chair", "chaires"], ["five _____", "students", "student", "studentes"],
      ["six _____", "boxes", "box", "boxs"], ["two _____", "children", "child", "childs"],
      ["three _____", "photos", "photo", "photoes"], ["four _____", "cities", "city", "citys"]
    ].map(([stem, key, l1, dev]) => ({ prompt: `I can see ${stem}.`, key, l1, dev, lexicon: [key] }))
  });

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "present_continuous_now", skill_tags: ["present_continuous", "now_action"],
    distance: "medium", difficulty: 0.36, discrimination: 0.33, source_grounding: ["EGP_A2_present_continuous_now", "Turkish_L1_aspect_transfer"],
    signal: "A current action uses am/is/are + -ing.",
    l1Trap: "Turkish present marking can cover current and habitual actions.",
    devTrap: "The learner has chosen the auxiliary but not the -ing form.",
    variants: [
      ["Look. The children _____.", "are playing", "play", "are play"],
      ["Listen. The baby _____.", "is crying", "cries", "is cry"],
      ["Be quiet. I _____.", "am studying", "study", "am study"],
      ["Right now, she _____.", "is cooking", "cooks", "is cook"],
      ["They _____ TV now.", "are watching", "watch", "are watch"],
      ["He _____ his homework now.", "is doing", "does", "is do"],
      ["We _____ for the bus.", "are waiting", "wait", "are wait"],
      ["The phone _____.", "is ringing", "rings", "is ring"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addNaturalnessFamily({
    boundary: "A1/A2", type: "pragmatic_choice", focus: "a1_service_and_basic_requests", skill_tags: ["requests", "politeness", "naturalness", "turkish_pragmatic_directness"],
    distance: "near", difficulty: 0.32, discrimination: 0.34, source_grounding: ["CEFR_Companion_2020_pragmatic_competence", "Cambridge_polite_requests", "British_Council_requests_offers"],
    instruction: "Duruma en do\u011fal cevab\u0131 se\u00e7in.",
    signal: "These prompts score communicative fit: short real-life answers can be acceptable, while malformed frames are weak rather than simply rude distractors.",
    l1Trap: "Direct Turkish-style imperatives can sound too blunt when translated directly.",
    devTrap: "The learner attempts a request frame, but the grammar or verb pattern is not usable English.",
    variants: [
      { prompt: "You are at a small cafe. The waiter is taking your order, and you want tea.", best: "Can I have some tea, please?", acceptable: "Tea, please.", weak: "I am want tea please.", acceptableCredit: 0.8, weakCredit: 0.25 },
      { prompt: "You are in class. The teacher is nearby, and you need help with the exercise.", best: "Can you help me, please?", acceptable: "Help, please.", weak: "Can you helping me?", acceptableCredit: 0.72, weakCredit: 0.25 },
      { prompt: "You are on a busy train and see an empty seat. You ask the passenger beside it.", best: "Can I sit here, please?", acceptable: "Is this seat free?", weak: "I sit here now?", acceptableCredit: 0.82, weakCredit: 0.32 },
      { prompt: "You are in class and forgot your pen. You ask the student next to you.", best: "Can I borrow a pen, please?", acceptable: "A pen, please?", weak: "Can I borrowing a pen?", acceptableCredit: 0.75, weakCredit: 0.25 },
      { prompt: "You are in class and cannot hear the teacher clearly. You ask them to say it again.", best: "Can you repeat that, please?", acceptable: "Again, please?", weak: "Can you repeating that?", acceptableCredit: 0.78, weakCredit: 0.25 },
      { prompt: "You are at a cafe. The waiter is taking your order, and you want water.", best: "Can I have some water, please?", acceptable: "Water, please.", weak: "I am want water please.", acceptableCredit: 0.82, weakCredit: 0.25 },
      { prompt: "You are at a shop counter. The cashier is waiting, and you want to ask about card payment.", best: "Can I pay by card?", acceptable: "Card is OK?", weak: "Can I paying card?", acceptableCredit: 0.68, weakCredit: 0.25 },
      { prompt: "You are at a restaurant table. The waiter comes to take your order, and you want to see the menu first.", best: "Can I see the menu, please?", acceptable: "The menu, please.", weak: "Can I seeing the menu?", acceptableCredit: 0.8, weakCredit: 0.25 }
    ]
  });

  addFamily({
    boundary: "A2/B1", type: "grammar", focus: "present_perfect_duration", skill_tags: ["present_perfect", "duration_marker", "turkish_perfect_transfer"],
    distance: "medium", difficulty: 0.52, discrimination: 0.36, source_grounding: ["EGP_B1_present_perfect_duration", "Bilkent_Turkish_EFL_present_perfect_errors"],
    signal: "For/since with a state continuing to now uses present perfect.",
    l1Trap: "Turkish often maps this meaning to a simple past-like form.",
    devTrap: "A stative or aspect-pattern error.",
    variants: [
      ["I _____ here since Monday.", "have lived", "lived", "am living"],
      ["She _____ English for three years.", "has studied", "studied", "is studying"],
      ["We _____ each other since school.", "have known", "knew", "are knowing"],
      ["He _____ in Ankara for ten years.", "has worked", "worked", "is working"],
      ["They _____ married since 2019.", "have been", "were", "are being"],
      ["I _____ this car for two months.", "have had", "had", "am having"],
      ["Mina _____ sick since Friday.", "has been", "was", "is being"],
      ["The shop _____ open for an hour.", "has been", "was", "is being"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "grammar", focus: "indirect_questions", skill_tags: ["indirect_questions", "word_order"],
    distance: "medium", difficulty: 0.54, discrimination: 0.37, source_grounding: ["EGP_B1_indirect_questions", "Turkish_EFL_question_order_errors"],
    signal: "Indirect questions use statement word order.",
    l1Trap: "Learners transfer direct-question order into the embedded question.",
    devTrap: "A developmental verb-form or missing-auxiliary error.",
    variants: [
      ["Can you tell me where _____?", "the station is", "is the station", "the station be"],
      ["Do you know what time _____?", "the film starts", "does the film start", "the film start"],
      ["I wonder why _____.", "she left early", "did she leave early", "she did left early"],
      ["Could you explain how _____?", "this machine works", "does this machine work", "this machine work"],
      ["Do you remember where _____?", "we parked", "did we park", "we did park"],
      ["Tell me when _____.", "the meeting begins", "does the meeting begin", "the meeting begin"],
      ["I don't know who _____.", "he invited", "did he invite", "he did invite"],
      ["Can you see where _____?", "the road ends", "does the road end", "the road end"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "grammar", focus: "conditionals_real", skill_tags: ["conditionals", "future_reference", "general_truth"],
    distance: "medium", difficulty: 0.5, discrimination: 0.34, source_grounding: ["EGP_B1_zero_first_conditionals", "Turkish_EFL_conditional_transfer"],
    signal: "Real future conditions use present in the if-clause and will in the result; general truths use present in both clauses.",
    l1Trap: "Turkish conditional meaning can be carried without the same English auxiliary pattern.",
    devTrap: "A developmental mixing of conditional types.",
    variants: [
      ["If it rains, we _____ at home.", "will stay", "stay", "would stay"],
      ["If I finish early, I _____ you.", "will call", "call", "would call"],
      ["If you heat ice, it _____.", "melts", "will melt", "is melting"],
      ["If water boils, it _____ steam.", "produces", "will produce", "is producing"],
      ["If she studies, she _____ the exam.", "will pass", "passes", "would pass"],
      ["If I see him, I _____ him.", "will tell", "tell", "would tell"],
      ["If you mix red and blue, you _____ purple.", "get", "will get", "are getting"],
      ["If the shop is closed, we _____ tomorrow.", "will come back", "come back", "would come back"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "collocation", focus: "do_make_take_common", skill_tags: ["collocation", "do_make_take"],
    distance: "medium", difficulty: 0.5, discrimination: 0.34, source_grounding: ["EVP_B1_common_collocations", "Turkish_L1_yapmak_transfer"],
    signal: "The key is the natural English collocation.",
    l1Trap: "Turkish 'yapmak' encourages do/make transfer.",
    devTrap: "The learner knows a related light verb but not this collocation.",
    variants: [
      ["She _____ a mistake.", "made", "did", "took"],
      ["Can you _____ a photo?", "take", "make", "do"],
      ["I need to _____ a decision.", "make", "do", "take"],
      ["He _____ his homework after dinner.", "did", "made", "took"],
      ["Let's _____ a break.", "take", "make", "do"],
      ["They _____ business together.", "do", "make", "take"],
      ["Please _____ attention.", "pay", "give", "make"],
      ["She _____ progress quickly.", "made", "did", "took"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "function", focus: "advice_and_suggestions", skill_tags: ["modal_should", "suggestions", "verb_patterns"],
    distance: "medium", difficulty: 0.5, discrimination: 0.34, source_grounding: ["CEFR_B1_advice_suggestions", "Turkish_EFL_modal_complement_errors"],
    instruction: "Duruma en do\u011fal cevab\u0131 se\u00e7in.",
    signal: "Natural advice and suggestions use fixed modal or verb-pattern frames.",
    l1Trap: "Turkish infinitive and obligation patterns can produce 'must to' or direct forms.",
    devTrap: "A developmental modal-complement error.",
    variants: [
      ["Your friend has had a bad cough for several days and asks what you think they should do before it gets worse.", "You should see a doctor.", "You must to see a doctor.", "You can seeing a doctor."],
      ["Your friend says they are exhausted after work and asks for simple advice about what to do tonight.", "You should get some rest.", "You must to rest.", "You can resting."],
      ["It is raining after class and your group is already late for the cinema. One friend asks what you should do now.", "Why don't we take a taxi?", "Why we don't take taxi?", "Why taking taxi?"],
      ["You and a classmate finish class at noon and both have no plans. You want to suggest eating together.", "Let's have lunch together.", "Let's to have lunch.", "We having lunch."],
      ["A friend is worried about a homework problem and asks for a sensible next step before tomorrow's English lesson.", "You could talk to your teacher.", "You can to talk teacher.", "You talking teacher."],
      ["Your friend wants to improve their English and asks for a small routine they can realistically follow.", "You should study a little every day.", "You should to study every day.", "You should studying every day."],
      ["You and your friend are choosing something relaxed to do tonight after dinner at your friend's home. You want to suggest a film.", "How about watching a film?", "How about to watch a film?", "How about watch a film?"],
      ["A friend has finished their book and asks what to read next during the holiday. You want to recommend one specific book.", "You should read this book.", "You must to read this book.", "You should reading this book."]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "passive_voice", skill_tags: ["passive_voice", "auxiliary_be", "past_participle"],
    distance: "medium", difficulty: 0.62, discrimination: 0.38, source_grounding: ["EGP_B2_passives", "Turkish_L1_passive_auxiliary_omission"],
    signal: "English passives need be + past participle.",
    l1Trap: "Turkish passive is marked inside the verb, so learners may omit English 'be'.",
    devTrap: "A developmental participle or auxiliary error.",
    variants: [
      ["The emails _____ yesterday.", "were sent", "sent", "were send"],
      ["The window _____ last night.", "was broken", "broke", "was break"],
      ["The documents _____ by the manager.", "were signed", "signed", "were sign"],
      ["The road _____ next week.", "will be closed", "will close", "will be close"],
      ["The problem _____ quickly.", "was solved", "solved", "was solve"],
      ["The tickets _____ online.", "were bought", "bought", "were buy"],
      ["The house _____ in 1990.", "was built", "built", "was build"],
      ["The classroom rules _____ by the teachers every year.", "are changed", "change", "are change"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "relative_clauses", skill_tags: ["relative_clauses", "reference", "possession"],
    distance: "near", difficulty: 0.66, discrimination: 0.38, source_grounding: ["EGP_B2_relative_clauses", "Turkish_L1_relative_clause_transfer"],
    signal: "The relative pronoun must match the relation inside the clause.",
    l1Trap: "Turkish relative structures do not map directly to English relative-pronoun choice.",
    devTrap: "A developmental relative-pronoun overgeneralization.",
    variants: [
      ["The woman _____ car was stolen called the police.", "whose", "her", "who"],
      ["The book _____ I bought yesterday is excellent.", "that", "what", "who"],
      ["The man _____ lives next door is a doctor.", "who", "which", "where"],
      ["This is the cafe _____ we met.", "where", "which", "who"],
      ["The reason _____ she left was unclear.", "why", "that", "where"],
      ["The company _____ products we use is closing.", "whose", "which", "who"],
      ["The film _____ won the prize was French.", "that", "who", "where"],
      ["The day _____ we arrived was very hot.", "when", "where", "which"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "hypothetical_conditionals", skill_tags: ["second_conditional", "third_conditional", "modal_perfect"],
    distance: "near", difficulty: 0.68, discrimination: 0.39, source_grounding: ["EGP_B2_conditionals", "Turkish_EFL_counterfactual_errors"],
    signal: "Hypothetical and unreal-past meanings need the correct modal pattern.",
    l1Trap: "Turkish can mark conditionality without the same auxiliary sequence.",
    devTrap: "A developmental mixing of second and third conditional forms.",
    variants: [
      ["If I had more time, I _____ Spanish.", "would learn", "will learn", "learned"],
      ["If we had left earlier, we _____ the train.", "would have caught", "caught", "would catch"],
      ["If she knew the answer, she _____ us.", "would tell", "will tell", "told"],
      ["If he had listened, he _____ the mistake.", "would have avoided", "avoided", "would avoid"],
      ["If I were you, I _____ the offer.", "would accept", "will accept", "accepted"],
      ["If they had called, we _____ them.", "would have helped", "helped", "would help"],
      ["If this were cheaper, I _____ it.", "would buy", "will buy", "bought"],
      ["If I had known, I _____ earlier.", "would have arrived", "arrived", "would arrive"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "dependent_prepositions", skill_tags: ["dependent_prepositions", "abstract_verbs"],
    distance: "near", difficulty: 0.7, discrimination: 0.39, source_grounding: ["METU_Turkish_EFL_preposition_errors", "EGP_B2_dependent_prepositions"],
    signal: "The verb or adjective selects a fixed English preposition.",
    l1Trap: "Turkish case/postposition systems do not map one-to-one to English prepositions.",
    devTrap: "A developmental overuse of a common English preposition.",
    variants: [
      ["She insisted _____ paying.", "on", "to", "for"],
      ["They accused him _____ lying.", "of", "with", "for"],
      ["I am responsible _____ the project.", "for", "from", "about"],
      ["He apologized _____ being late.", "for", "from", "about"],
      ["This depends _____ the weather.", "on", "from", "to"],
      ["She is interested _____ politics.", "in", "to", "about"],
      ["We are aware _____ the problem.", "of", "from", "about"],
      ["He succeeded _____ solving it.", "in", "to", "for"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "function", focus: "formal_requests", skill_tags: ["formal_email", "polite_request", "register"],
    distance: "medium", difficulty: 0.62, discrimination: 0.36, source_grounding: ["CEFR_B2_formal_requests", "Turkish_L1_pragmatic_directness"],
    instruction: "Duruma en do\u011fal cevab\u0131 se\u00e7in.",
    signal: "Formal requests use softened conditional and polite frames.",
    l1Trap: "A direct imperative translated from Turkish can sound abrupt.",
    devTrap: "A developmental complement or register error.",
    variants: [
      ["You are emailing an external colleague you do not know well. You need them to send a report before Friday.", "I would appreciate it if you could send the report.", "Send me the report before Friday.", "I want that you send the report."],
      ["You are writing to a manager and want to ask for a short meeting next week.", "Would it be possible to arrange a meeting?", "Arrange a meeting for me.", "I want to make meeting."],
      ["You are replying to a formal email and need extra details before you can decide.", "Could you provide further information?", "Send more details now.", "Can you give informations?"],
      ["You need to write a polite message to your team leader because you cannot attend tomorrow morning's meeting.", "Unfortunately, I will not be able to attend.", "I don't come tomorrow morning.", "I am not able coming."],
      ["You are writing to your instructor and need a few more days for an assignment.", "Would it be possible to extend the deadline?", "Extend the deadline for me.", "Can you making deadline longer?"],
      ["A colleague you do not know very well offers to include you in a work project by email, and you want to accept politely.", "Thank you, I would be happy to.", "Yes, do it.", "I am happy for do."],
      ["You are in a meeting. You disagree, but you want to keep the tone professional.", "I see your point, but I am not sure I agree.", "I think you are wrong.", "I don't agree your idea."],
      ["You are sending a file to a colleague you do not know well and want them to check it quickly.", "Could you have a look at the file?", "Look at the file now.", "Could you look to file?"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "grammar", focus: "modal_perfect_nuance", skill_tags: ["modal_perfect", "deduction", "regret", "criticism"],
    distance: "near", difficulty: 0.8, discrimination: 0.42, source_grounding: ["EGP_C1_modal_perfect", "Turkish_EFL_modal_transfer"],
    signal: "Advanced modal-perfect choices express deduction, regret, criticism, or missed possibility.",
    l1Trap: "Turkish modal meanings do not map cleanly to English modal-perfect forms.",
    devTrap: "A developmental error missing the perfect auxiliary or choosing the wrong modal force.",
    variants: [
      ["He looks exhausted. He _____ all night.", "must have worked", "must worked", "should have worked"],
      ["You _____ me earlier; I could have helped.", "should have told", "should told", "had to tell"],
      ["She _____ forgotten; the lights are still on.", "can't have", "mustn't have", "doesn't have"],
      ["They _____ arrived by now; their flight landed an hour ago.", "should have", "should", "mustn't have"],
      ["He _____ taken the wrong road.", "may have", "may", "can have"],
      ["You _____ bought milk; we already had some.", "needn't have", "didn't need", "mustn't have"],
      ["She _____ seen the message yet.", "can't have", "can't", "mustn't have"],
      ["I _____ called, but I forgot.", "should have", "should", "must have"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "grammar", focus: "inversion_and_clefts", skill_tags: ["inversion", "cleft_sentences", "emphasis"],
    distance: "near", difficulty: 0.82, discrimination: 0.43, source_grounding: ["EGP_C1_inversion", "EGP_C1_cleft_sentences"],
    signal: "Fronted negative/restrictive expressions trigger inversion; clefts focus one part of a sentence.",
    l1Trap: "Turkish fronting does not trigger English auxiliary inversion.",
    devTrap: "A developmental do-support, agreement, or cleft-frame error.",
    variants: [
      ["Not only _____ late, but he also forgot the files.", "was he", "he was", "did he was"],
      ["Hardly _____ when the phone rang.", "had I arrived", "I had arrived", "did I arrive"],
      ["Rarely _____ such a clear explanation.", "have I heard", "I have heard", "did I heard"],
      ["No sooner _____ than it started raining.", "had we left", "we had left", "did we left"],
      ["What I need _____ more time.", "is", "it is", "are"],
      ["_____ matters is the result.", "What", "That", "It"],
      ["It was Sara _____ solved the problem.", "who", "which", "what"],
      ["Only then _____ the mistake.", "did I understand", "I understood", "I did understand"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "grammar", focus: "subjunctive_and_formal_that", skill_tags: ["subjunctive", "formal_grammar"],
    distance: "near", difficulty: 0.84, discrimination: 0.42, source_grounding: ["EGP_C1_mandative_subjunctive", "Turkish_EFL_subjunctive_absence"],
    signal: "Formal mandative clauses can use the base verb after that.",
    l1Trap: "Turkish does not have the same English subjunctive contrast.",
    devTrap: "A developmental future or agreement form replaces the base verb.",
    variants: [
      ["The manager insisted that he _____ present.", "be", "is", "was"],
      ["It is essential that she _____ on time.", "be", "is", "will be"],
      ["They recommended that the plan _____ revised.", "be", "is", "will be"],
      ["The law requires that every form _____ signed.", "be", "is", "was"],
      ["I suggest that he _____ immediately.", "leave", "leaves", "will leave"],
      ["It is vital that the data _____ accurate.", "be", "is", "are"],
      ["The committee requested that she _____ the report.", "submit", "submits", "submitted"],
      ["They demanded that the rule _____ changed.", "be", "is", "will be"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "collocation", focus: "deep_academic_collocations", skill_tags: ["deep_collocation", "academic_vocabulary"],
    distance: "near", difficulty: 0.78, discrimination: 0.41, source_grounding: ["OPAL_academic_collocations", "EVP_C1_collocation"],
    signal: "The key is the natural academic or formal collocation.",
    l1Trap: "Turkish broad verbs can encourage literal or general English choices.",
    devTrap: "A near-collocation that sounds possible but is not the standard phrase.",
    variants: [
      ["The new policy _____ a serious problem.", "poses", "makes", "does"],
      ["The evidence _____ his claim.", "undermines", "damages", "understates"],
      ["This approach _____ significant benefits.", "offers", "gives", "makes"],
      ["The report _____ attention to a hidden issue.", "draws", "pulls", "takes"],
      ["The findings _____ doubt on the theory.", "cast", "throw", "put"],
      ["The proposal _____ concerns about cost.", "raises", "lifts", "makes"],
      ["The argument _____ on two assumptions.", "rests", "sits", "stays"],
      ["The policy is intended to _____ innovation.", "foster", "feed", "force"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "function", focus: "hedging_and_stance", skill_tags: ["hedging", "stance", "discourse"],
    distance: "near", difficulty: 0.76, discrimination: 0.4, source_grounding: ["CEFR_C1_hedging_stance", "Academic_discourse_markers"],
    instruction: "Duruma en do\u011fal cevab\u0131 se\u00e7in.",
    signal: "Advanced English often softens claims with hedging and stance markers.",
    l1Trap: "Direct translated certainty can sound too strong in English academic/professional style.",
    devTrap: "A developmental discourse marker or register mismatch.",
    variants: [
      ["You are writing a research report for your supervisor. The data points in one direction, but you are not fully certain.", "This may suggest a wider trend.", "This proves a wider trend.", "This maybe suggest a wider trend."],
      ["In a planning meeting, a colleague proposes cutting the budget. You partly agree, but you still have reservations.", "I agree up to a point.", "I agree until a point.", "I agree in a point."],
      ["You are comparing two research methods in an essay for your course tutor and need a formal contrast between cost and speed.", "Whereas the first method is cheap, the second is faster.", "Where the first method is cheap, the second is faster.", "Because the first method is cheap, the second is faster."],
      ["You are presenting a budget forecast in a work meeting with managers and want to avoid sounding too certain about future costs.", "It seems likely that costs will rise.", "Costs will rise surely.", "It seems that costs rise likely."],
      ["You are responding to a strong claim in a seminar discussion and want to make it less absolute.", "This is not necessarily the case.", "This is not necessary the case.", "This is not needed case."],
      ["You are giving feedback on a colleague's draft and want the criticism to sound cautious.", "There may be some room for improvement.", "There is room, improve it.", "There may have room improvement."],
      ["You are summarizing a likely effect in a short sales report for your manager after a change in price.", "The change may therefore affect demand.", "The change may however affect demand.", "The change may because affect demand."],
      ["You are explaining a safety policy to staff and need to say that a rule usually applies, but not in every situation.", "This applies in most cases, except where safety is at risk.", "This applies in most cases, besides where safety is at risk.", "This applies most cases, except safety risk."]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "basic_prepositions", skill_tags: ["prepositions", "place_time", "a1_a2_core"],
    distance: "medium", difficulty: 0.27, discrimination: 0.31, source_grounding: ["Oxford_3000_A1_prepositions", "English_Profile_A1_place_time"],
    signal: "Early learners often confuse in, on, at, to and from because Turkish case endings cover several meanings.",
    l1Trap: "The option follows a Turkish case-ending logic rather than the English preposition pattern.",
    devTrap: "The option is a common early-development preposition overgeneralization.",
    variants: [
      ["The keys are _____ the table.", "on", "in", "at"],
      ["I usually get up _____ seven.", "at", "in", "on"],
      ["She lives _____ Ankara.", "in", "at", "on"],
      ["We go _____ school by bus.", "to", "at", "in"],
      ["This letter is _____ my teacher.", "from", "of", "by"],
      ["The meeting is _____ Monday.", "on", "in", "at"],
      ["There is a picture _____ the wall.", "on", "in", "at"],
      ["He is waiting _____ the bus stop.", "at", "on", "in"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "simple_past_irregular", skill_tags: ["past_simple", "irregular_verbs", "a1_a2_core"],
    distance: "medium", difficulty: 0.3, discrimination: 0.33, source_grounding: ["Oxford_3000_A1_A2_irregular_verbs", "English_Profile_A2_past_simple"],
    signal: "The key checks basic past forms without asking the learner to name the rule.",
    l1Trap: "Turkish has no irregular past equivalent, so learners may regularize the verb.",
    devTrap: "The option uses a present or base form where English needs past.",
    variants: [
      ["Yesterday I _____ a new phone.", "bought", "buyed", "buy"],
      ["She _____ home late last night.", "came", "comed", "come"],
      ["We _____ the answer quickly.", "found", "finded", "find"],
      ["He _____ his bag on the train.", "left", "leaved", "leave"],
      ["They _____ a film after dinner.", "saw", "seed", "see"],
      ["I _____ an email this morning.", "sent", "sended", "send"],
      ["The lesson _____ at nine.", "began", "beginned", "begin"],
      ["She _____ very tired after the trip.", "felt", "feeled", "feel"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A1/A2", type: "grammar", focus: "comparatives_basic", skill_tags: ["comparatives", "adjectives", "a2_core"],
    distance: "medium", difficulty: 0.32, discrimination: 0.33, source_grounding: ["Oxford_3000_A2_comparatives", "English_Profile_A2_comparison"],
    signal: "The key checks everyday comparative forms and the than pattern.",
    l1Trap: "The option uses a Turkish-style direct comparison without the English comparative structure.",
    devTrap: "The option mixes more and -er or drops the comparative marker.",
    variants: [
      ["This bag is _____ than that one.", "cheaper", "more cheap", "cheap"],
      ["My room is _____ than my brother's room.", "smaller", "more small", "small"],
      ["Today is _____ than yesterday.", "colder", "more cold", "cold"],
      ["This exercise is _____ than the first one.", "easier", "more easy", "easy"],
      ["The train is _____ than the bus.", "faster", "more fast", "fast"],
      ["This book is _____ than the film.", "better", "more good", "gooder"],
      ["Her English is _____ than last year.", "better", "more better", "good"],
      ["This question is _____ than it looks.", "harder", "more hard", "hard"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "grammar", focus: "used_to_past_habit", skill_tags: ["used_to", "past_habit", "b1_entry"],
    distance: "near", difficulty: 0.46, discrimination: 0.36, source_grounding: ["English_Profile_B1_used_to", "Turkish_EFL_past_habit"],
    signal: "The key separates past habit from present habit and simple past narration.",
    l1Trap: "The option translates a Turkish past habit idea too directly.",
    devTrap: "The option drops the fixed used to form or confuses it with be used to.",
    variants: [
      ["I _____ play football every day when I was a child.", "used to", "am used to", "use to"],
      ["She _____ live in Izmir, but now she lives in Ankara.", "used to", "uses to", "is used to"],
      ["We _____ go camping every summer.", "used to", "were used", "use to"],
      ["He didn't _____ like coffee.", "use to", "used to", "was used to"],
      ["Did you _____ have long hair?", "use to", "used to", "are used to"],
      ["They _____ be close friends at university.", "used to", "were used to", "use to"],
      ["My father _____ drive an old blue car.", "used to", "was used to", "uses to"],
      ["There _____ be a cinema here.", "used to", "was used to", "use to"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "grammar", focus: "gerund_infinitive_patterns", skill_tags: ["verb_patterns", "gerund", "infinitive"],
    distance: "near", difficulty: 0.5, discrimination: 0.37, source_grounding: ["English_Profile_B1_verb_patterns", "Oxford_3000_A2_B1_common_verbs"],
    signal: "The key checks common verb pattern memory with everyday verbs.",
    l1Trap: "The option follows a Turkish verbal noun pattern too broadly.",
    devTrap: "The option is a frequent overgeneralized infinitive or gerund form.",
    variants: [
      ["I decided _____ a new course.", "to take", "taking", "take"],
      ["She enjoys _____ in the morning.", "running", "to run", "run"],
      ["They agreed _____ us at six.", "to meet", "meeting", "meet"],
      ["He avoided _____ about the problem.", "talking", "to talk", "talk"],
      ["We hope _____ you soon.", "to see", "seeing", "see"],
      ["I finished _____ the report.", "writing", "to write", "write"],
      ["She offered _____ me with the bags.", "to help", "helping", "help"],
      ["They suggested _____ a taxi.", "taking", "to take", "take"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "phrasal_verb", focus: "basic_phrasal_verbs", skill_tags: ["phrasal_verbs", "daily_english", "meaning_in_context"],
    distance: "near", difficulty: 0.48, discrimination: 0.36, source_grounding: ["Oxford_3000_A2_B1_phrasal_verbs", "English_Profile_B1_phrasal_verbs"],
    signal: "The key checks natural high-frequency phrasal verbs in a clear context.",
    l1Trap: "The option chooses a literal verb that misses the phrasal meaning.",
    devTrap: "The option is a plausible but wrong particle or nearby phrasal verb.",
    variants: [
      ["Please _____ your shoes before you come in.", "take off", "take out", "put off"],
      ["Can you _____ the lights? I can't see.", "turn on", "open on", "turn up"],
      ["I need to _____ this word in the dictionary.", "look up", "look for", "look after"],
      ["The meeting was _____ until Friday.", "put off", "put out", "put away"],
      ["She _____ the children while I was at work.", "looked after", "looked for", "looked up"],
      ["We _____ milk, so I bought some.", "ran out of", "ran from", "ran away"],
      ["He _____ smoking last year.", "gave up", "gave out", "gave away"],
      ["The plane _____ at 8:30.", "took off", "took out", "put off"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "reported_speech", skill_tags: ["reported_speech", "tense_shift", "b2_entry"],
    distance: "near", difficulty: 0.62, discrimination: 0.39, source_grounding: ["English_Profile_B2_reported_speech", "Turkish_EFL_tense_shift"],
    signal: "The key checks whether the learner can manage tense and pronoun shifts in reported speech.",
    l1Trap: "Turkish reported speech does not require the same tense backshift.",
    devTrap: "The option shifts part of the sentence but leaves another part unadjusted.",
    variants: [
      ["She said, 'I am tired.' -> She said that she _____ tired.", "was", "is", "has been"],
      ["He said, 'I saw Ali.' -> He said that he _____ Ali.", "had seen", "saw", "has seen"],
      ["They said, 'We will call you.' -> They said that they _____ me.", "would call", "will call", "called"],
      ["Mina said, 'I can't come.' -> Mina said that she _____ come.", "couldn't", "can't", "doesn't"],
      ["He asked, 'Where do you live?' -> He asked where I _____.", "lived", "do live", "live"],
      ["She asked, 'Did you finish it?' -> She asked if I _____ it.", "had finished", "finished", "have finished"],
      ["They said, 'We are waiting.' -> They said that they _____ waiting.", "were", "are", "had"],
      ["He told me, 'Don't be late.' -> He told me _____ late.", "not to be", "to not be", "don't be"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "grammar", focus: "advanced_verb_patterns", skill_tags: ["verb_patterns", "object_infinitive", "b2_control"],
    distance: "near", difficulty: 0.64, discrimination: 0.39, source_grounding: ["English_Profile_B2_verb_patterns", "Oxford_3000_B1_B2_reporting_verbs"],
    signal: "The key checks control patterns after persuade, prevent, recommend, admit and deny.",
    l1Trap: "The option translates Turkish clause structure too directly.",
    devTrap: "The option uses a nearby verb pattern that belongs to another verb.",
    variants: [
      ["They persuaded him _____ the offer.", "to accept", "accepting", "accept"],
      ["The rain prevented us _____ outside.", "from going", "to go", "go"],
      ["She admitted _____ the mistake.", "making", "to make", "make"],
      ["He denied _____ the message.", "sending", "to send", "send"],
      ["The teacher reminded us _____ our homework.", "to bring", "bringing", "bring"],
      ["They warned me _____ alone.", "not to go", "to not going", "don't go"],
      ["I recommend _____ early.", "leaving", "to leave", "leave"],
      ["This allows users _____ files quickly.", "to share", "sharing", "share"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "collocation", focus: "academic_verb_noun_collocations", skill_tags: ["collocation", "academic_english", "b2_vocabulary"],
    distance: "near", difficulty: 0.6, discrimination: 0.38, source_grounding: ["Oxford_5000_B2_academic_collocations", "OPAL_written_collocations"],
    signal: "The key checks formal verb-noun pairings common in B2 writing and reading.",
    l1Trap: "The option uses a broad Turkish verb translated into English too literally.",
    devTrap: "The option is semantically close but not the established English collocation.",
    variants: [
      ["The article _____ several examples.", "provides", "gives", "makes"],
      ["The study _____ the importance of sleep.", "highlights", "lights", "shows up"],
      ["The new rule _____ pressure on small businesses.", "puts", "makes", "gives"],
      ["The data _____ a clear pattern.", "reveals", "opens", "tells"],
      ["The decision _____ a debate.", "sparked", "burned", "opened"],
      ["The results _____ our expectations.", "exceeded", "passed", "rose"],
      ["The company _____ a major role in the project.", "played", "made", "took"],
      ["This evidence _____ the argument.", "supports", "carries", "helps to"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "idiom", focus: "natural_idioms_and_register", skill_tags: ["idioms", "register", "advanced_discourse"],
    distance: "near", difficulty: 0.74, discrimination: 0.4, source_grounding: ["Oxford_5000_C1_common_idioms", "CEFR_C1_idiomatic_language"],
    signal: "The key checks common idiomatic meaning without using obscure idioms.",
    l1Trap: "The option is a literal translation or too direct for the idiom.",
    devTrap: "The option uses a nearby expression with a different meaning or register.",
    variants: [
      ["At the monthly staff meeting, after months of silence about complaints, the manager finally _____ the issue.", "addressed", "spoke", "made"],
      ["The plan looks good on paper, but without enough funding it may _____ in practice.", "fall apart", "fall down", "drop out"],
      ["After Sara explained why the figures changed, her explanation still didn't really _____.", "make sense", "make meaning", "give sense"],
      ["The team is under time pressure, but quality still matters. We need to _____ a balance between speed and quality.", "strike", "hit", "make"],
      ["The deadline was moved twice, but the project is still _____ track for a June launch.", "on", "in", "at"],
      ["During the discussion about costs, his comment about office furniture missed _____ point.", "the", "a", "one"],
      ["The first numbers look worrying, but I don't want to _____ conclusions too quickly.", "jump to", "jump at", "jump for"],
      ["The two reports use different examples, but their main findings are broadly _____ line with each other.", "in", "on", "at"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "grammar", focus: "advanced_preposition_patterns", skill_tags: ["dependent_prepositions", "formal_patterns", "c1_entry"],
    distance: "near", difficulty: 0.78, discrimination: 0.41, source_grounding: ["Oxford_5000_B2_C1_dependent_prepositions", "English_Profile_C1_patterns"],
    signal: "The key checks advanced preposition control after adjectives, nouns and verbs.",
    l1Trap: "The option mirrors Turkish postposition/case logic.",
    devTrap: "The option is a frequent English preposition but wrong for this pattern.",
    variants: [
      ["This approach is consistent _____ our previous findings.", "with", "to", "for"],
      ["The report is based _____ interviews with students.", "on", "from", "in"],
      ["Her argument relies _____ two weak assumptions.", "on", "to", "from"],
      ["The town is known _____ its old houses.", "for", "with", "by"],
      ["The results differ _____ earlier studies.", "from", "than", "with"],
      ["The discussion focused _____ three main issues.", "on", "to", "at"],
      ["The problem is associated _____ poor planning.", "with", "to", "by"],
      ["This has contributed _____ a rise in costs.", "to", "for", "on"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "function", focus: "concession_discourse", skill_tags: ["concession", "linking", "academic_discourse"],
    distance: "near", difficulty: 0.8, discrimination: 0.41, source_grounding: ["CEFR_C1_discourse_markers", "English_Profile_C1_concession"],
    instruction: "Anlam ak\u0131\u015f\u0131n\u0131 en do\u011fal tamamlayan se\u00e7ene\u011fi se\u00e7in.",
    signal: "The key checks contrast and concession markers used in polished written English.",
    l1Trap: "The option follows Turkish contrast sequencing too directly.",
    devTrap: "The option has the right general area but the wrong clause pattern.",
    variants: [
      ["You are writing a research methods paragraph for your supervisor. _____ the method is expensive, it is highly reliable.", "Although", "Despite", "However"],
      ["You are writing a research methods paragraph for your supervisor. The method is expensive. _____, it is highly reliable.", "However", "Although", "Despite"],
      ["You are preparing a lab report for your course tutor. _____ its high cost, the method is reliable.", "Despite", "Although", "However"],
      ["You are writing a pilot-study summary for a research team. The sample was small; _____, the results are useful for planning the next phase.", "nevertheless", "although", "despite"],
      ["You are giving a project update to your manager in a work meeting. The task required new software and extra training. _____, the team finished on time.", "Even so", "Even though", "Despite"],
      ["You are editing a final report for your manager. _____ there were some errors, the overall result was strong.", "While", "Despite", "Nevertheless"],
      ["You are writing a market summary for your manager. The product sells well among students, _____ it remains expensive for many families.", "although", "despite", "because"],
      ["You are presenting quarterly results to managers. In the last quarter, production costs increased sharply, _____ customer demand remained stable.", "whereas", "because", "despite"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A1/A2", type: "natural_speech", focus: "everyday_short_replies", skill_tags: ["natural_reply", "a1_a2_spoken_chunks", "service_english"],
    distance: "medium", difficulty: 0.29, discrimination: 0.32, source_grounding: ["CEFR_A1_A2_spoken_interaction", "Oxford_3000_A1_A2_everyday_phrases"],
    instruction: "K\u0131sa konu\u015fmada en do\u011fal cevab\u0131 se\u00e7in.",
    signal: "Everyday spoken English often uses short fixed replies rather than literal full-sentence translations.",
    l1Trap: "The option is understandable but too literal or direct in this setting.",
    devTrap: "The option uses a broken short-reply frame.",
    variants: [
      ["In a clothes shop, a shop assistant says, 'Can I help you?' You only want to look around for now.", "I'm just looking, thanks.", "I only look.", "I am looking only."],
      ["At a shop checkout, the cashier smiles and says, 'Have a nice day.' You answer naturally.", "Thanks, you too.", "Thanks, same.", "I wish also."],
      ["Your friend arrives five minutes late to meet you outside the cinema and says, 'Sorry I'm late.' You are not angry.", "No problem.", "It is not problem.", "There isn't problem."],
      ["You are visiting a friend's house. They offer you tea, but you do not want any.", "No, thanks.", "I no want tea.", "No, I am not tea."],
      ["You meet someone new at a noisy party, but you did not hear their name clearly.", "Sorry, can you say that again?", "You say name again.", "What you said?"],
      ["A friend is waiting at the door so you can leave together and asks, 'Are you ready?' You need one more minute to get your bag.", "Just a minute.", "One minute more.", "Wait me a minute."],
      ["A classmate thanks you for helping them understand a short exercise before class starts.", "You're welcome.", "Please.", "It is nothing welcome."],
      ["On a crowded bus, you accidentally step on another passenger's foot while moving toward the door.", "Sorry about that.", "Sorry for this foot.", "I make sorry."]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "spoken_chunk", focus: "softening_and_checking", skill_tags: ["spoken_chunks", "repair", "checking_understanding"],
    distance: "medium", difficulty: 0.49, discrimination: 0.36, source_grounding: ["CEFR_B1_spoken_interaction", "English_Profile_B1_conversation_strategies"],
    instruction: "Konu\u015fmada kula\u011fa en do\u011fal gelen se\u00e7ene\u011fi se\u00e7in.",
    signal: "B1 learners need flexible chunks for checking, softening, and keeping conversation moving.",
    l1Trap: "The option follows Turkish conversational logic too directly.",
    devTrap: "The option has a partial chunk but an unnatural English frame.",
    variants: [
      ["You are not sure you understood the plan. You ask your friend to check.", "Do you mean we should leave at six?", "You mean we leave six?", "Are you meaning leave at six?"],
      ["A friend tells you a long story about missing their flight at the airport. You want to show you are listening and invite them to continue.", "Really? What happened next?", "Really? What next happened?", "Is it? What happened after?"],
      ["In a group discussion, two classmates are talking, but you need to add one important point politely.", "Sorry to interrupt, but can I add something?", "I interrupt you, I add something.", "Sorry for interrupt, can I say?"],
      ["Your friend suggests leaving the party at midnight, but you think it is too late and want to sound gentle.", "I'm not sure that's the best idea.", "I don't sure it is best.", "This idea is not good."],
      ["You give your address on the phone and want to check that the other person wrote it correctly.", "Did you get all that?", "Did you take all?", "You got all things?"],
      ["Your friend is choosing between two hotels for a weekend trip, and both are acceptable. You slightly prefer the first one.", "I'd probably go with the first one.", "I probably go with first.", "I would choose with first one."],
      ["A friend says they won two tickets to a concert tonight and invites you to come. You are surprised and respond naturally.", "No way, really?", "No possibility, really?", "No way, is serious?"],
      ["A teacher asks a difficult question in class, and you need a few seconds before answering.", "Let me think for a second.", "Let me to think one second.", "I think a second."]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B1/B2", type: "idiom", focus: "common_natural_idioms", skill_tags: ["idiom", "natural_expression", "b1_b2_lexical_chunks"],
    distance: "near", difficulty: 0.64, discrimination: 0.39, source_grounding: ["Oxford_3000_5000_common_expressions", "CEFR_B2_idiomatic_language"],
    instruction: "Duruma en do\u011fal uyan ifadeyi se\u00e7in.",
    signal: "The key is a common idiomatic expression used naturally in context.",
    l1Trap: "The option is a literal translation or a close but wrong collocation.",
    devTrap: "The option uses a familiar word but not the fixed expression.",
    variants: [
      ["You arrive at the bus station five minutes too late, and the bus has already left.", "I missed the bus.", "I lost the bus.", "I caught the bus."],
      ["Your friend is very busy studying for an exam, so you tell them not to worry about a small task.", "Don't worry, it's not a big deal.", "Don't worry, it is not a serious deal.", "Don't worry, it is not a big matter."],
      ["Some people make the online form sound complicated, but you finish it in two minutes.", "It's a piece of cake.", "It's a cake piece.", "It's one piece of cake."],
      ["At a birthday dinner, one person accidentally reveals the surprise party plan too early.", "She let the cat out of the bag.", "She let the cat out from the bag.", "She put the cat out of the bag."],
      ["Two universities have accepted you, and you still cannot decide which one to choose.", "I'm on the fence.", "I'm over the wall.", "I'm at the border."],
      ["A friend is packing too quickly. Tell them to relax and stop rushing.", "Take your time.", "Use your time.", "Spend your time."],
      ["Your company may move the meeting to Friday, but nobody has confirmed the date yet.", "It's up in the air.", "It's still in the air.", "It's on the air."],
      ["After five hours of study, the speaker wants to stop working for tonight.", "I'm going to call it a day.", "I'm going to finish it a day.", "I'm going to close the day."]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "B2/C1", type: "discourse_marker", focus: "stance_and_discourse_flow", skill_tags: ["discourse_markers", "stance", "academic_spoken_flow"],
    distance: "near", difficulty: 0.79, discrimination: 0.42, source_grounding: ["CEFR_C1_discourse_markers", "Academic_phrasebank_discourse_flow"],
    instruction: "Anlam ak\u0131\u015f\u0131n\u0131 en do\u011fal kuran se\u00e7ene\u011fi se\u00e7in.",
    signal: "Advanced learners need discourse markers that match contrast, concession, reformulation, and stance.",
    l1Trap: "The option is a literal connective choice that weakens the discourse relation.",
    devTrap: "The option uses a known marker in the wrong relation.",
    variants: [
      ["In a policy review, the new policy may reduce costs. _____, it could also lower service quality.", "At the same time", "In the same way", "At the same point"],
      ["In a data analysis section, the first explanation seems plausible. _____, it does not account for all the data.", "Nevertheless", "Moreover", "Namely"],
      ["In the second survey, the numbers improved slightly. _____, the overall pattern remained unchanged.", "Even so", "For instance", "In other words"],
      ["During a budget meeting, the proposal is attractive in theory. _____, implementation would be expensive.", "That said", "In other words", "That means"],
      ["The term is often misunderstood. _____, it refers to long-term change, not temporary variation.", "In this context", "In this occasion", "In this reason"],
      ["In a short research report, the evidence is limited. _____, we should avoid strong conclusions.", "Accordingly", "Besides", "For example"],
      ["In the test results, the two groups performed differently. _____, the gap was smaller than expected.", "However", "Therefore", "In particular"],
      ["The result was not statistically significant. _____, it is worth reporting as a trend.", "Nonetheless", "Likewise", "Consequently"]
    ].map(([prompt, key, l1, dev]) => ({ prompt, key, l1, dev }))
  });

  addFamily({
    boundary: "A2/B1", type: "collocation", focus: "everyday_fixed_phrases", skill_tags: ["fixed_phrases", "daily_english", "a2_b1_chunks"],
    distance: "medium", difficulty: 0.44, discrimination: 0.35, source_grounding: ["Oxford_Phrase_List_A2_B1_common_phrases", "CEFR_B1_repertoire"],
    instruction: "C\u00fcmleyi en do\u011fal tamamlayan ifadeyi se\u00e7in.",
    signal: "The key is a common everyday fixed phrase rather than a word-by-word translation.",
    l1Trap: "The option is understandable Turkish transfer but not the normal English chunk.",
    devTrap: "The option uses a nearby English word but breaks the fixed phrase.",
    variants: [
      ["A short message before class: Sorry, I am running _____.", "late", "slow", "behind"],
      ["Your friend asks how your new course is going. You answer: So _____, it is interesting.", "far", "long", "much"],
      ["At the station, your friend wants to buy tickets before the trip. You say: Let's buy them in _____.", "advance", "front", "before"],
      ["You find your lost keys under the sofa. You tell your friend: I found them by _____.", "accident", "chance", "mistake"],
      ["Your classmate asks when the homework is due. You say: As _____ as possible.", "soon", "fast", "early"],
      ["A friend is worried about forgetting the address. You say: Write it down just in _____.", "case", "condition", "chance"],
      ["Your colleague asks why you deleted the file. You say: I did it by mistake, not on _____.", "purpose", "reason", "plan"],
      ["Your friend asks if you have finished the form. You say: Not yet, but I am nearly _____.", "done", "ready", "finished it"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "before", "chance", "reason"],
      devPool: [dev, "complete", "ended", "close"]
    }))
  });

  addFamily({
    boundary: "A2/B1", type: "phrasal_verb", focus: "core_phrasal_verbs_extended", skill_tags: ["phrasal_verbs", "daily_english", "particle_meaning"],
    distance: "medium", difficulty: 0.5, discrimination: 0.36, source_grounding: ["Oxford_Phrase_List_phrasal_verbs", "English_Profile_B1_phrasal_verbs"],
    instruction: "Ba\u011flama en do\u011fal uyan fiili se\u00e7in.",
    signal: "The key checks high-frequency phrasal verbs in context.",
    l1Trap: "The option is a literal single-word translation.",
    devTrap: "The option uses a plausible but wrong particle.",
    variants: [
      ["Your phone battery is low. You need to _____ it before you leave home.", "charge up", "fill up", "turn up"],
      ["You do not know the meaning of a word, so you _____ it in a dictionary.", "look up", "look at", "look for"],
      ["The meeting is too long, so the manager asks everyone to _____ the main point.", "get to", "go to", "come to"],
      ["Your friend is sad after failing an exam. You try to _____ them up.", "cheer", "lift", "raise"],
      ["The bus was full, so we had to _____ at the next stop.", "get off", "go off", "take off"],
      ["There is a mistake on a form. You _____ the wrong word.", "cross out", "close out", "cut out"],
      ["Your friend speaks too quietly on the phone. You say: Could you _____ up?", "speak", "talk", "say"],
      ["The class starts at nine. Please do not _____ late.", "show up", "appear up", "come out"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "take", "make", "do"],
      devPool: [dev, "put up", "get up", "turn out"]
    }))
  });

  addFamily({
    boundary: "B1/B2", type: "collocation", focus: "verb_noun_academic_bridge", skill_tags: ["collocation", "academic_bridge", "b2_vocabulary"],
    distance: "near", difficulty: 0.62, discrimination: 0.39, source_grounding: ["Oxford_5000_B2_academic_collocations", "OPAL_written_collocations"],
    signal: "The key is the normal verb-noun collocation used in academic and formal contexts.",
    l1Trap: "The option follows a Turkish light-verb pattern too directly.",
    devTrap: "The option is semantically close but not the established English collocation.",
    variants: [
      ["The survey _____ evidence that the problem is getting worse.", "provides", "makes", "gives"],
      ["The article _____ attention to a rarely discussed issue.", "draws", "pulls", "takes"],
      ["The teacher asked us to _____ a distinction between fact and opinion.", "draw", "make", "do"],
      ["The new policy may _____ a risk to smaller companies.", "pose", "put", "make"],
      ["The findings _____ concerns about the safety of the product.", "raise", "lift", "make"],
      ["The report _____ light on the causes of the delay.", "sheds", "holds", "opens"],
      ["The evidence _____ into question the original explanation.", "calls", "puts", "brings"],
      ["The committee finally _____ an agreement after three hours.", "reached", "arrived", "made"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "does", "gets", "puts"],
      devPool: [dev, "creates", "shows", "opens"]
    }))
  });

  addFamily({
    boundary: "B1/B2", type: "idiom", focus: "practical_b2_idioms", skill_tags: ["idiom", "natural_expression", "b2_phrases"],
    distance: "near", difficulty: 0.66, discrimination: 0.4, source_grounding: ["Oxford_Phrase_List_B1_B2_idioms", "Cambridge_Learner_Corpus_idiom_errors"],
    instruction: "Duruma en do\u011fal uyan ifadeyi se\u00e7in.",
    signal: "The key is a common phrase used in a realistic situation.",
    l1Trap: "The option is a literal image translation.",
    devTrap: "The option is close in form but not the fixed expression.",
    variants: [
      ["The presentation is tomorrow, but preparation has not started. It is being left until _____.", "the last minute", "the final minute", "the last time"],
      ["Your manager is away and asks you to watch the project carefully. She asks you to _____ it.", "keep an eye on", "keep an eye over", "keep watch on"],
      ["You used the last coffee in the office, so now the office has _____ coffee.", "run out of", "run short of", "got rid of"],
      ["You cannot decide between two courses. Your friend says: You need to _____ your mind.", "make up", "make out", "do up"],
      ["You have a good relationship with your new colleagues. You _____ well with them.", "get along", "go along", "come along"],
      ["In the meeting, Sara suggested a clever solution. She _____ a good idea.", "came up with", "came out with", "brought up to"],
      ["You have only one week in London, so you want to _____ your time there.", "make the most of", "make the best from", "take the most from"],
      ["Leyla manages the whole design team. She is _____ charge of it.", "in", "on", "at"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "the end minute", "look on", "finish from"],
      devPool: [dev, "take up", "make from", "be responsible on"]
    }))
  });

  addFamily({
    boundary: "B1/B2", type: "spoken_chunk", focus: "b2_conversation_management", skill_tags: ["spoken_chunks", "conversation_management", "b2_interaction"],
    distance: "near", difficulty: 0.63, discrimination: 0.38, source_grounding: ["CEFR_B2_spoken_interaction", "Cambridge_spoken_chunks"],
    instruction: "Konu\u0219mada kula\u011fa en do\u011fal gelen se\u00e7ene\u011fi se\u00e7in.",
    signal: "The key checks flexible chunks for managing conversation politely.",
    l1Trap: "The option follows Turkish conversation structure too directly.",
    devTrap: "The option is grammatical-looking but not idiomatic in this interaction.",
    variants: [
      ["A colleague explains a long plan. You understood the general idea but need one detail repeated.", "Could you go over that last part again?", "Could you pass from that part again?", "Could you repeat over that last part?"],
      ["Your friend is upset, and you want to show you understand their feelings before giving advice.", "I can see why that would be frustrating.", "I see why it makes frustration.", "I can understand your frustrated."],
      ["In a meeting, you disagree but want to sound polite.", "I take your point, but I see it differently.", "I take your idea, but I see different.", "I get your point, but I am opposite."],
      ["Someone asks whether the deadline is realistic. You are not completely sure.", "It depends on how much support we get.", "It depends from how much support.", "It is depending to the support."],
      ["You want to return to the main topic after a side discussion.", "Anyway, getting back to the main point...", "Anyway, turning to the old point...", "Anyway, going back main point..."],
      ["You are unsure whether you understood correctly.", "If I understand you correctly, you mean the first option.", "If I understand true, you mean first option.", "If I got correct, you mean option one."],
      ["A friend says something surprising, and you want them to explain more.", "What makes you say that?", "What makes you to say?", "Why you say like that?"],
      ["You want to add a small extra point without interrupting the flow.", "Just to add to that...", "Just for adding that...", "Only to add on that..."]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "I understand your idea", "I am seeing different", "returning main subject"],
      devPool: [dev, "I get your opinion", "it depends to", "to add on that"]
    }))
  });

  addFamily({
    boundary: "B1/B2", type: "discourse_marker", focus: "b2_argument_flow", skill_tags: ["discourse_markers", "argumentation", "b2_writing"],
    distance: "near", difficulty: 0.65, discrimination: 0.39, source_grounding: ["Cambridge_Learner_Corpus_error_prone_fixed_expressions", "CEFR_B2_cohesion"],
    instruction: "Yaz\u0131daki anlam ili\u015fkisini en do\u011fal kuran ifadeyi se\u00e7in.",
    signal: "The key checks fixed discourse phrases that are often misproduced by learners.",
    l1Trap: "The option mirrors Turkish or learner-corpus errors in fixed expressions.",
    devTrap: "The option is a nearby connector with a different relation.",
    variants: [
      ["You are writing an essay. First you mention benefits, then you introduce a limitation. _____, the plan is expensive.", "On the other hand", "In the other hand", "On the contrary"],
      ["You want to state your own view in an essay without sounding too informal.", "In my view", "According to me", "From my opinion"],
      ["You have discussed two advantages and now want to add a final one.", "Last but not least", "At last but not least", "The last but not the least"],
      ["You want to end an essay by summarizing your main point.", "In conclusion", "As a conclusion", "Concluding"],
      ["Introduce the first side of a two-sided comparison.", "On the one hand", "In one hand", "On one side"],
      ["You mention a similar problem in another city.", "Similarly", "Same way", "In same manner"],
      ["You have made a claim and now want to support it with an example.", "For instance", "By instance", "For an instance"],
      ["You have given details and now want to state the main result.", "As a result", "As result", "With result"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "according to me", "in the other side", "as conclusion"],
      devPool: [dev, "however", "therefore", "moreover"]
    }))
  });

  addFamily({
    boundary: "B1/B2", type: "phrasal_verb", focus: "b2_pv_meaning_in_context", skill_tags: ["phrasal_verbs", "meaning_in_context", "b2_vocabulary"],
    distance: "near", difficulty: 0.67, discrimination: 0.39, source_grounding: ["Oxford_Phrase_List_B2_phrasal_verbs", "English_Profile_B2_phrasal_verbs"],
    signal: "The key checks phrasal verbs where the particle changes the meaning.",
    l1Trap: "The option uses a literal verb or wrong particle.",
    devTrap: "The option is a nearby phrasal verb with a different meaning.",
    variants: [
      ["The event was cancelled, so the organizers had to _____ everyone's tickets.", "give back", "give away", "give out"],
      ["The problem was difficult, but the team managed to _____ a solution.", "work out", "work up", "work on"],
      ["Please _____ the form before you sign it.", "go through", "go over", "go across"],
      ["The company will _____ a new payment system next month.", "bring in", "bring up", "bring out"],
      ["We need to _____ the meeting until Monday because two people are ill.", "put off", "put out", "put away"],
      ["The speaker's point was hard to understand, so the chair asked him to _____ it.", "clear up", "clean up", "open up"],
      ["The old policy no longer works, so the school will _____ it.", "phase out", "fade out", "put out"],
      ["The committee decided to _____ the proposal after new evidence appeared.", "look into", "look after", "look over"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "return", "solve", "delay"],
      devPool: [dev, "carry out", "bring about", "look up"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "collocation", focus: "c1_academic_collocation_precision", skill_tags: ["academic_collocation", "c1_precision", "OPAL"],
    distance: "near", difficulty: 0.8, discrimination: 0.43, source_grounding: ["OPAL_written_phrases", "Oxford_5000_C1_academic_vocabulary", "Thesaurus_close_synonym_screening"],
    signal: "The key is a precise academic collocation, not just a related synonym.",
    l1Trap: "The option is a close synonym that does not collocate naturally here.",
    devTrap: "The option is semantically related but weakens or changes the academic meaning.",
    variants: [
      ["The new data _____ the assumption that all students prefer online classes.", "undermines", "weakens", "damages"],
      ["The study _____ a distinction between short-term memory and long-term learning.", "draws", "makes", "does"],
      ["The results _____ the need for further research.", "highlight", "lighten", "show up"],
      ["The policy may _____ unintended consequences for smaller schools.", "have", "make", "produce"],
      ["The report _____ substantial evidence of improvement.", "presents", "shows", "gives"],
      ["The authors _____ a causal link between sleep and concentration.", "establish", "install", "build"],
      ["These findings _____ a plausible explanation for the trend.", "provide", "give", "make"],
      ["The evidence _____ the original claim into question.", "calls", "throws", "puts"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "weakens", "builds", "throws"],
      devPool: [dev, "supports", "mentions", "opens"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "idiom", focus: "c1_argumentation_fixed_expressions", skill_tags: ["fixed_expressions", "argumentation", "c1_writing"],
    distance: "near", difficulty: 0.81, discrimination: 0.43, source_grounding: ["Cambridge_Learner_Corpus_idiom_errors", "CEFR_C1_cohesion"],
    instruction: "Yaz\u0131da en do\u011fal ve do\u011fru sabit ifadeyi se\u00e7in.",
    signal: "The key checks fixed expressions that advanced learners often misform or overuse.",
    l1Trap: "The option is a known learner-corpus style form error.",
    devTrap: "The option is a nearby expression with a different rhetorical effect.",
    variants: [
      ["You want to introduce a contrasting point, not a direct contradiction. _____, the approach is cheaper.", "On the other hand", "On the contrary", "In the other hand"],
      ["You want to present your opinion in formal writing.", "In my view", "According to me", "For my side"],
      ["Introduce the first of two contrasting arguments.", "On the one hand", "In one hand", "From one side"],
      ["End a paragraph by briefly restating the main point.", "To sum up", "To add up", "For summing"],
      ["You want to make a cautious generalization in a presentation.", "Broadly speaking", "Generally saying", "Broadly said"],
      ["You want to limit a claim because exceptions exist.", "To a certain extent", "At a certain extent", "For a certain level"],
      ["You want to add an important caveat after agreeing partly.", "That being said", "That being told", "This being said so"],
      ["You want to say the important point is not the surface detail.", "What matters is whether the plan works.", "What is matter is whether the plan works.", "What matters that the plan works."]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "according to me", "in one hand", "at a certain extent"],
      devPool: [dev, "however", "moreover", "in conclusion"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "idiom", focus: "c1_natural_workplace_phrases", skill_tags: ["idiom", "workplace_english", "c1_spoken_written"],
    distance: "near", difficulty: 0.79, discrimination: 0.42, source_grounding: ["Oxford_Phrase_List_C1_common_phrases", "Cambridge_appropriate_idiom_use"],
    instruction: "Duruma en do\u011fal uyan ifadeyi se\u00e7in.",
    signal: "The key is a common higher-level phrase in professional or academic contexts.",
    l1Trap: "The option translates the image too literally.",
    devTrap: "The option uses a related phrase but not the target meaning.",
    variants: [
      ["The team expected stronger results, but the pilot project did not meet expectations. It _____ expectations.", "fell short of", "fell under from", "dropped short to"],
      ["The deadline is strict, so delay is not possible. We are _____ to submit it tomorrow.", "bound", "tied", "obligated"],
      ["Before choosing a supplier, we need to compare the risks and benefits carefully. We need to _____ the options.", "weigh up", "weight up", "measure out"],
      ["The evidence is weak, so the lawyer cannot completely remove that possibility. She cannot _____ it out.", "rule", "throw", "cancel"],
      ["After the merger, employees slowly accepted the new system. They came to _____ with it.", "terms", "words", "conditions"],
      ["The manager assumed everyone knew the process, but that was a mistake. She took it for _____.", "granted", "given", "allowed"],
      ["When planning the course, we should remember that students have different goals. We should _____ this in mind.", "bear", "carry", "hold"],
      ["The researcher wanted to explain the idea in a simpler way. He tried to _____ it down.", "break", "cut", "split"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "under", "carry", "conditions"],
      devPool: [dev, "leave out", "put away", "make simple"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "phrasal_verb", focus: "c1_formal_phrasal_verbs", skill_tags: ["phrasal_verbs", "formal_register", "c1_vocabulary"],
    distance: "near", difficulty: 0.8, discrimination: 0.42, source_grounding: ["Oxford_Phrase_List_B2_C1_phrasal_verbs", "English_Profile_C1_verb_patterns"],
    signal: "The key checks higher-level phrasal verbs in formal or semi-formal contexts.",
    l1Trap: "The option uses a literal or overly general verb.",
    devTrap: "The option uses a nearby particle with a different meaning.",
    variants: [
      ["The committee will _____ the new evidence before making a decision.", "take into account", "take in account", "take on account"],
      ["The report _____ to explain why costs increased.", "sets out", "sets up", "sets off"],
      ["The speaker did not answer the question directly; she _____ the main issue.", "skirted around", "walked around", "passed around"],
      ["The new evidence may _____ a complete change in policy.", "bring about", "bring up", "bring out"],
      ["The company decided to _____ the old software gradually.", "phase out", "phase away", "phase off"],
      ["The manager tried to _____ the conflict before it became serious.", "smooth over", "smooth out", "smooth away"],
      ["The researchers could not _____ the possibility of measurement error.", "rule out", "rule off", "rule away"],
      ["The article _____ the reasons behind the decision.", "goes into", "goes in", "goes through"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "consider", "explain", "avoid"],
      devPool: [dev, "look into", "bring in", "carry out"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "spoken_chunk", focus: "c1_spoken_stance_chunks", skill_tags: ["spoken_chunks", "stance", "c1_interaction"],
    distance: "near", difficulty: 0.78, discrimination: 0.42, source_grounding: ["OPAL_spoken_phrases", "CEFR_C1_fluent_interaction"],
    instruction: "Konu\u0219mada en do\u011fal ileri seviye ifadeyi se\u00e7in.",
    signal: "The key checks compact spoken chunks for stance, repair, and nuance.",
    l1Trap: "The option follows Turkish word order or a literal structure.",
    devTrap: "The option is a common word sequence but not natural in this function.",
    variants: [
      ["A colleague makes a fair point, but you still disagree with the conclusion.", "I take your point, but I am not convinced.", "I take your idea, but I am not persuaded.", "I get your point, but I do not convince."],
      ["You want to make a correction without sounding harsh.", "Strictly speaking, that is not quite accurate.", "Strict speaking, that is not exactly correct.", "Speaking strict, it is not full true."],
      ["You want to say the second problem is even more important.", "If anything, the second issue is more serious.", "If something, the second issue is serious.", "If there is anything, second issue more serious."],
      ["You want to explain the same idea in simpler words.", "To put it another way, we need more evidence.", "To say it another form, we need evidence.", "Putting another way, we need more evidence."],
      ["You are giving an opinion, but you know it may not be central.", "For what it's worth, I think the first option is safer.", "For what it values, I think first is safer.", "For its worth, I think the first safe."],
      ["You want to acknowledge a problem before moving on.", "That said, the results are still useful.", "In addition, the results are still useful.", "Saying that, the results are still useful."],
      ["You want to avoid sounding too certain in a discussion.", "I would be inclined to wait for more data.", "I would incline waiting for more data.", "I am inclined that wait for data."],
      ["You want to say the main problem is different from what people think.", "The real issue is not cost, but timing.", "The actual issue it is not cost but timing.", "Real issue is not cost, timing."]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "from my side", "speaking strict", "that told"],
      devPool: [dev, "I think so but", "another saying", "real issue it is"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "discourse_marker", focus: "c1_precision_discourse_markers", skill_tags: ["discourse_markers", "academic_writing", "c1_cohesion"],
    distance: "near", difficulty: 0.82, discrimination: 0.43, source_grounding: ["Academic_Phrasebank_connection_phrases", "Warwick_academic_discourse_markers"],
    instruction: "Anlam ak\u0131\u015f\u0131n\u0131 en do\u011fru kuran ba\u011flac\u0131 se\u00e7in.",
    signal: "The key checks precise discourse relations: contrast, result, concession, and reformulation.",
    l1Trap: "The option is a formal-looking marker with the wrong relation.",
    devTrap: "The option has the right broad area but wrong grammar or register.",
    variants: [
      ["The first study measured speed. _____, the second focused on accuracy.", "By contrast", "By the contrary", "In contrast of"],
      ["The sample was small. _____, the findings should be interpreted cautiously.", "Consequently", "Nevertheless", "In addition"],
      ["The costs are high. _____, the benefits may justify the investment.", "Nonetheless", "Therefore", "For example"],
      ["The policy improved access. _____, it created new administrative work.", "At the same time", "In the same way", "In the same case"],
      ["The definition is broad. _____, it includes both formal and informal learning.", "In other words", "In another words", "With other words"],
      ["The evidence is mixed. _____, no firm conclusion can be drawn.", "As such", "Such as", "As so"],
      ["The method is reliable. _____, it is too expensive for small schools.", "That said", "In other words", "That means"],
      ["The results support the hypothesis. _____, further research is needed.", "Even so", "Even though", "Despite"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "by the contrary", "on other words", "that told"],
      devPool: [dev, "moreover", "accordingly", "for instance"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "function", focus: "c1_hedged_evaluation", skill_tags: ["hedging", "evaluation", "academic_register"],
    distance: "near", difficulty: 0.81, discrimination: 0.43, source_grounding: ["Academic_Phrasebank_hedging", "CEFR_C1_nuanced_expression"],
    instruction: "Akademik/profesyonel ba\u011flamda en do\u011fal ifadeyi se\u00e7in.",
    signal: "The key checks cautious evaluation and nuanced stance.",
    l1Trap: "The option makes the claim too absolute or direct.",
    devTrap: "The option contains a partial hedge but the grammar is unnatural.",
    variants: [
      ["You are reviewing a research report for your supervisor. The evidence supports the idea, but not completely.", "The findings appear to support this interpretation.", "The findings prove this interpretation.", "The findings seem that support this interpretation."],
      ["You are writing feedback to a colleague in a formal project review. A proposal is promising but still incomplete.", "The proposal is promising, although further detail is needed.", "The proposal is good, but you left out details.", "The proposal is promising despite it needs detail."],
      ["You are presenting survey results to managers in a work meeting. The trend is visible but not strong.", "There is some evidence of a gradual shift.", "There is clear proof of a big shift.", "There is an evidence of gradual shifting."],
      ["You are comparing two explanations in an academic essay for your tutor. One is possible, but the data is not enough.", "This explanation is plausible, but not conclusive.", "This explanation is true, but not finished.", "This explanation is plausible but not conclusion."],
      ["You are responding to an overconfident statement in a meeting.", "That may be true to some extent.", "That is true in some level.", "That can be true until a point."],
      ["You are describing a project risk to your manager without sounding alarmist.", "This could have significant implications.", "This will make very bad results.", "This could make significant implications."],
      ["You are summarizing a limitation in a study for your tutor in a research methods report.", "The sample size limits the extent to which we can generalize.", "The sample size blocks generalization totally.", "The sample size limits how much can we generalize."],
      ["You are recommending caution to a committee before a policy decision.", "It would be premature to draw firm conclusions.", "It is early to make exact conclusions.", "It would be premature drawing firm conclusions."]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "this proves", "it is certain", "this is definitely"],
      devPool: [dev, "seems that", "despite it", "limits how much can we"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "collocation", focus: "c1_research_phrase_frames", skill_tags: ["academic_phrases", "research_writing", "OPAL"],
    distance: "near", difficulty: 0.83, discrimination: 0.43, source_grounding: ["OPAL_written_phrases", "Academic_Phrasebank_research_phrases"],
    signal: "The key is a research-writing phrase frame common in advanced English.",
    l1Trap: "The option is a literal phrase frame that sounds possible but is not standard.",
    devTrap: "The option has the right content word but wrong preposition or frame.",
    variants: [
      ["The study examines motivation _____ relation to exam performance.", "in", "with", "by"],
      ["The findings should be interpreted _____ caution.", "with", "by", "in"],
      ["This issue is discussed _____ detail in the next section.", "in", "with", "at"],
      ["The results are consistent _____ previous research.", "with", "to", "for"],
      ["The analysis focuses _____ three main variables.", "on", "to", "in"],
      ["The argument rests _____ two assumptions.", "on", "in", "at"],
      ["The intervention led _____ a measurable improvement.", "to", "for", "with"],
      ["The data point _____ a need for further investigation.", "to", "for", "on"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "with", "by", "for"],
      devPool: [dev, "at", "from", "about"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "idiom", focus: "c1_high_frequency_metaphorical_phrases", skill_tags: ["idiom", "metaphorical_phrases", "c1_register"],
    distance: "near", difficulty: 0.8, discrimination: 0.42, source_grounding: ["Oxford_Phrase_List_C1_idiomatic_phrases", "Cambridge_appropriate_idiom_use"],
    instruction: "Metaforik ifadeyi ba\u011flama g\u00f6re en do\u011fal tamamlayan se\u00e7ene\u011fi se\u00e7in.",
    signal: "The key checks common metaphorical phrases that are useful but not cartoonish.",
    l1Trap: "The option translates the metaphor literally.",
    devTrap: "The option is related but not the fixed phrase.",
    variants: [
      ["The first experiment failed, but it helped the team improve the design. It was a useful learning _____.", "curve", "bend", "turn"],
      ["The company is still new, so it is too early to judge its long-term success. It is early _____.", "days", "times", "period"],
      ["The proposal has several hidden risks. We need to look beyond the _____.", "surface", "face", "top"],
      ["The manager does not want to change everything at once. She prefers a step-by-step _____.", "approach", "walk", "movement"],
      ["The new results changed the whole discussion. They shifted the _____.", "focus", "centre", "eye"],
      ["The two departments rarely communicate, so important details fall through the _____.", "cracks", "holes", "gaps"],
      ["The plan is ambitious, but the team has limited time and money. It may be a stretch _____.", "too far", "too long", "too much"],
      ["After months of debate, the committee finally reached common _____.", "ground", "land", "floor"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "face", "floor", "land"],
      devPool: [dev, "area", "point", "place"]
    }))
  });

  addFamily({
    boundary: "B2/C1", type: "function", focus: "c1_formal_request_softening", skill_tags: ["formal_request", "softening", "professional_english"],
    distance: "near", difficulty: 0.78, discrimination: 0.42, source_grounding: ["CEFR_C1_formal_interaction", "Cambridge_business_english_register"],
    instruction: "Profesyonel ba\u011flamda en do\u011fal ve kibar ifadeyi se\u00e7in.",
    signal: "The key checks professional softening without sounding vague or over-direct.",
    l1Trap: "The option is too direct for the professional relationship.",
    devTrap: "The option attempts formality but has an unnatural frame.",
    variants: [
      ["You are emailing a senior colleague and need one more document before you can finish the report.", "Would you be able to send me the final document?", "Send me the final document.", "Would you be able sending me the final document?"],
      ["You need to disagree with a manager's suggestion in a meeting.", "I wonder whether we might consider another option.", "We should not do that option.", "I wonder we might to consider another option."],
      ["You are asking a client in a project email to clarify a requirement.", "Could you clarify what you mean by 'urgent'?", "Explain what urgent means.", "Could you make clear what you mean urgent?"],
      ["You are reminding a colleague about a deadline without sounding angry.", "Just a gentle reminder that the draft is due tomorrow.", "You forgot the draft is tomorrow.", "I gently remind for the draft tomorrow."],
      ["You are emailing a senior colleague to ask for feedback on a proposal.", "I would be grateful for any feedback you may have.", "Send your feedback today.", "I would be grateful for any feedbacks you may have."],
      ["You are replying to a client's request in a formal project email because you lack the information.", "I'm afraid I do not have enough information to confirm that.", "I cannot confirm because I don't know.", "I am afraid I have not enough informations to confirm."],
      ["You are advising your manager in a planning meeting to delay a decision until more data arrives.", "It may be better to wait until we have the full data.", "Better wait until full data.", "It may better to wait until we have full datas."],
      ["You want to suggest a small change to a colleague's text.", "You might want to make this point a little clearer.", "Make this point clearer.", "You might want making this point clearer."]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "send it", "explain this", "make it clearer"],
      devPool: [dev, "would you able", "feedbacks", "informations"]
    }))
  });

  const pragmaticGrounding = ["CEFR_Companion_2020_pragmatic_competence", "ACTFL_proficiency_functions_contexts", "Cambridge_polite_requests", "British_Council_functional_language"];

  addNaturalnessFamily({
    boundary: "A1/A2", type: "pragmatic_choice", focus: "a1_service_short_orders", skill_tags: ["service_english", "requests", "natural_short_answers"],
    distance: "near", difficulty: 0.28, discrimination: 0.34, source_grounding: pragmaticGrounding,
    signal: "A1/A2 service items reward real-life short answers, but the full polite request gives stronger placement evidence.",
    variants: [
      { prompt: "You are at a cafe counter. The worker asks what you want, and you want coffee.", best: "Can I have a coffee, please?", acceptable: "Coffee, please.", weak: "I want coffee.", acceptableCredit: 0.84, weakCredit: 0.46, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "You are in a bakery. The worker is ready, and you want one sandwich.", best: "Can I have a sandwich, please?", acceptable: "One sandwich, please.", weak: "I want sandwich.", acceptableCredit: 0.84, weakCredit: 0.34 },
      { prompt: "You are at a ticket desk. You want a ticket to Izmir.", best: "Can I have a ticket to Izmir, please?", acceptable: "One ticket to Izmir, please.", weak: "I want go Izmir ticket.", acceptableCredit: 0.82, weakCredit: 0.3 },
      { prompt: "You are at a small shop. The worker asks if you need help, and you need a bag.", best: "Can I have a bag, please?", acceptable: "A bag, please.", weak: "I need bag.", acceptableCredit: 0.82, weakCredit: 0.4, weakRole: "weak", weakLabel: "clear_but_missing_article" },
      { prompt: "You are at a restaurant table. The waiter asks what you want to drink, and you want water.", best: "Can I have some water, please?", acceptable: "Water, please.", weak: "I want water.", acceptableCredit: 0.85, weakCredit: 0.48, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "You are at a hotel desk. You want the Wi-Fi password.", best: "Can I have the Wi-Fi password, please?", acceptable: "The Wi-Fi password, please?", weak: "I want Wi-Fi password.", acceptableCredit: 0.78, weakCredit: 0.4, weakRole: "weak", weakLabel: "clear_but_direct" },
      { prompt: "You are on a bus. You want to get off at the next stop.", best: "Can you stop here, please?", acceptable: "Here, please.", weak: "I get off here.", acceptableCredit: 0.7, weakCredit: 0.44, weakRole: "weak", weakLabel: "clear_but_not_request" },
      { prompt: "You are in class. You want to ask for the page number.", best: "What page are we on, please?", acceptable: "Which page, please?", weak: "What page now?", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "clear_but_blunt" }
    ]
  });

  addNaturalnessFamily({
    boundary: "A1/A2", type: "pragmatic_choice", focus: "a1_everyday_replies_and_repair", skill_tags: ["repair", "basic_replies", "classroom_english"],
    distance: "near", difficulty: 0.3, discrimination: 0.34, source_grounding: pragmaticGrounding,
    signal: "These items check whether the learner can keep a simple exchange going without needing perfect grammar.",
    variants: [
      { prompt: "Your teacher says a word you do not know. You need to ask for help.", best: "What does it mean?", acceptable: "Meaning, please?", weak: "What meaning?", acceptableCredit: 0.68, weakCredit: 0.42, weakRole: "weak", weakLabel: "clear_but_rough" },
      { prompt: "A classmate speaks too fast. You need them to speak more slowly.", best: "Can you speak more slowly, please?", acceptable: "Slowly, please.", weak: "You speak slow.", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "clear_but_blunt" },
      { prompt: "Someone thanks you for holding the door.", best: "You're welcome.", acceptable: "No problem.", weak: "Nothing.", acceptableCredit: 0.86, weakCredit: 0.28, weakRole: "weak", weakLabel: "literal_transfer" },
      { prompt: "You accidentally step on someone's foot.", best: "Sorry, are you OK?", acceptable: "Sorry.", weak: "It is not important.", acceptableCredit: 0.72, weakCredit: 0.2, weakRole: "weak", weakLabel: "wrong_tone" },
      { prompt: "You meet a new student and want to ask their name.", best: "What's your name?", acceptable: "Your name?", weak: "How is your name?", acceptableCredit: 0.66, weakCredit: 0.32 },
      { prompt: "A friend asks if you want tea. You do not want any.", best: "No, thanks.", acceptable: "No, thank you.", weak: "I don't want.", acceptableCredit: 0.9, weakCredit: 0.42, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "A teacher asks if you understand. You do not understand.", best: "Sorry, I don't understand.", acceptable: "I don't understand.", weak: "I no understand.", acceptableCredit: 0.82, weakCredit: 0.28 },
      { prompt: "A friend asks if you are free today. You are busy.", best: "Sorry, I'm busy today.", acceptable: "I'm busy today.", weak: "Today no.", acceptableCredit: 0.78, weakCredit: 0.25 }
    ]
  });

  addNaturalnessFamily({
    boundary: "A1/A2", type: "pragmatic_choice", focus: "a1_basic_plans_and_needs", skill_tags: ["plans", "needs", "simple_interaction"],
    distance: "near", difficulty: 0.34, discrimination: 0.35, source_grounding: pragmaticGrounding,
    signal: "Simple plans and needs should be scored for successful communication, not only full sentence grammar.",
    variants: [
      { prompt: "Your friend asks when you want to meet. You want to meet at six.", best: "Let's meet at six.", acceptable: "Six is good.", weak: "At six meet.", acceptableCredit: 0.78, weakCredit: 0.3 },
      { prompt: "Your friend asks where you want to eat. You want pizza.", best: "Let's have pizza.", acceptable: "Pizza is good.", weak: "I want eat pizza.", acceptableCredit: 0.76, weakCredit: 0.34 },
      { prompt: "You are lost in a building and need the toilet.", best: "Where is the bathroom?", acceptable: "Bathroom?", weak: "Where bathroom is?", acceptableCredit: 0.62, weakCredit: 0.34 },
      { prompt: "Your friend asks if you like the film. You think it is good.", best: "Yes, I like it.", acceptable: "It's good.", weak: "It is like me.", acceptableCredit: 0.76, weakCredit: 0.24 },
      { prompt: "You need a taxi at the hotel desk.", best: "Can you call a taxi, please?", acceptable: "Taxi, please.", weak: "I need taxi call.", acceptableCredit: 0.78, weakCredit: 0.3 },
      { prompt: "Your class starts at nine, and a friend asks the time.", best: "It starts at nine.", acceptable: "At nine.", weak: "It start nine.", acceptableCredit: 0.74, weakCredit: 0.36 },
      { prompt: "A friend offers cake, but you are full.", best: "No, thanks. I'm full.", acceptable: "No, I'm full.", weak: "I am full, no cake.", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "clear_but_rough" },
      { prompt: "You are buying a shirt and want to know the price.", best: "How much is this?", acceptable: "How much?", weak: "What money this?", acceptableCredit: 0.7, weakCredit: 0.22 }
    ]
  });

  addNaturalnessFamily({
    boundary: "A2/B1", type: "pragmatic_choice", focus: "b1_polite_requests_with_pressure", skill_tags: ["requests", "softening", "school_work"],
    distance: "near", difficulty: 0.48, discrimination: 0.38, source_grounding: pragmaticGrounding,
    signal: "These items separate usable direct requests from better softened requests.",
    variants: [
      { prompt: "You message a classmate because you missed the homework page.", best: "Could you send me the homework page?", acceptable: "Can you send me the homework page?", weak: "Send me the homework page.", acceptableCredit: 0.84, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_direct_but_clear" },
      { prompt: "You are working with a colleague and need the file before lunch.", best: "Could you send me the file before lunch?", acceptable: "Can you send me the file before lunch?", weak: "I need the file before lunch.", acceptableCredit: 0.82, weakCredit: 0.55, weakRole: "weak", weakLabel: "clear_but_not_request" },
      { prompt: "You are in a library and need someone to move their bag from a chair.", best: "Could you move your bag, please?", acceptable: "Can you move your bag, please?", weak: "Move your bag.", acceptableCredit: 0.84, weakCredit: 0.34, weakRole: "weak", weakLabel: "too_direct" },
      { prompt: "You ask a hotel receptionist to print one page for you.", best: "Could you print this for me, please?", acceptable: "Can you print this, please?", weak: "Print this for me.", acceptableCredit: 0.82, weakCredit: 0.42, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "You ask your teacher for one more minute to finish an answer.", best: "Could I have one more minute, please?", acceptable: "Can I have one more minute?", weak: "I need one more minute.", acceptableCredit: 0.82, weakCredit: 0.55, weakRole: "weak", weakLabel: "clear_but_not_request" },
      { prompt: "You ask a friend to wait while you buy water.", best: "Can you wait a minute?", acceptable: "Wait a minute, please.", weak: "You wait me.", acceptableCredit: 0.76, weakCredit: 0.25 },
      { prompt: "You ask a waiter to bring the bill.", best: "Could we have the bill, please?", acceptable: "Can we have the bill?", weak: "We want the bill.", acceptableCredit: 0.82, weakCredit: 0.48, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "You ask a classmate to repeat a phone number.", best: "Could you say the number again?", acceptable: "Can you repeat the number?", weak: "Say again number.", acceptableCredit: 0.82, weakCredit: 0.3 }
    ]
  });

  addNaturalnessFamily({
    boundary: "A2/B1", type: "pragmatic_choice", focus: "b1_problem_explanations", skill_tags: ["explaining_problems", "service_english", "sense"],
    distance: "near", difficulty: 0.5, discrimination: 0.39, source_grounding: pragmaticGrounding,
    signal: "These items check whether the learner can explain a problem in a way that would actually work.",
    variants: [
      { prompt: "Your food is cold at a restaurant. You need to tell the waiter politely.", best: "Excuse me, this is a bit cold.", acceptable: "This food is cold.", weak: "The food has cold.", acceptableCredit: 0.72, weakCredit: 0.3 },
      { prompt: "Your hotel key card does not work. You are at reception.", best: "My key card isn't working.", acceptable: "The card doesn't work.", weak: "My card is not opening.", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "literal_but_understandable" },
      { prompt: "You bought headphones yesterday, but one side has no sound.", best: "One side isn't working.", acceptable: "One side has no sound.", weak: "One side doesn't hear.", acceptableCredit: 0.84, weakCredit: 0.36 },
      { prompt: "You are late because the bus did not come.", best: "Sorry, the bus didn't come.", acceptable: "The bus was late.", weak: "The bus made me late.", acceptableCredit: 0.76, weakCredit: 0.52, weakRole: "weak", weakLabel: "clear_but_less_natural" },
      { prompt: "You cannot join an online lesson because your internet is bad.", best: "My internet connection is unstable.", acceptable: "My internet is bad.", weak: "My internet is broken.", acceptableCredit: 0.72, weakCredit: 0.5, weakRole: "weak", weakLabel: "clear_but_imprecise" },
      { prompt: "You need to return a shirt because it is too small.", best: "I'd like to return this because it's too small.", acceptable: "This is too small. I want to return it.", weak: "It is small for me, return.", acceptableCredit: 0.74, weakCredit: 0.32 },
      { prompt: "A friend asks why you cannot come tonight. You are sick.", best: "Sorry, I can't come tonight. I'm not feeling well.", acceptable: "I can't come because I'm sick.", weak: "I am sick, I don't come.", acceptableCredit: 0.82, weakCredit: 0.38 },
      { prompt: "You need to tell a teacher you forgot your notebook at home.", best: "Sorry, I left my notebook at home.", acceptable: "I forgot my notebook at home.", weak: "My notebook stayed at home.", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "literal_but_clear" }
    ]
  });

  addNaturalnessFamily({
    boundary: "A2/B1", type: "pragmatic_choice", focus: "b1_turn_taking_repair", skill_tags: ["conversation_repair", "clarifying", "turn_taking"],
    distance: "near", difficulty: 0.52, discrimination: 0.39, source_grounding: pragmaticGrounding,
    signal: "Conversation repair rewards keeping the exchange smooth and socially safe.",
    variants: [
      { prompt: "A friend explains something, but you missed the last part.", best: "Sorry, what was the last part?", acceptable: "Can you say the last part again?", weak: "What did you talk?", acceptableCredit: 0.8, weakCredit: 0.24 },
      { prompt: "You said Tuesday, but your friend thinks you said Thursday.", best: "Sorry, I meant Tuesday, not Thursday.", acceptable: "No, Tuesday.", weak: "You heard wrong.", acceptableCredit: 0.7, weakCredit: 0.28, weakRole: "weak", weakLabel: "too_blunt" },
      { prompt: "You do not know a word in a conversation and want the other person to explain.", best: "What do you mean by that word?", acceptable: "What does that word mean?", weak: "What is that word's meaning?", acceptableCredit: 0.84, weakCredit: 0.5, weakRole: "weak", weakLabel: "understandable_but_wordy" },
      { prompt: "Someone asks a question, and you need a few seconds to think.", best: "Let me think for a second.", acceptable: "One second.", weak: "Wait, I think.", acceptableCredit: 0.74, weakCredit: 0.38 },
      { prompt: "You want to check you understood the meeting time correctly.", best: "So, we meet at ten, right?", acceptable: "We meet at ten?", weak: "Ten meeting, yes?", acceptableCredit: 0.76, weakCredit: 0.28 },
      { prompt: "You disagree with a friend but want to keep the tone friendly.", best: "I'm not sure about that.", acceptable: "I don't think so.", weak: "No, you are wrong.", acceptableCredit: 0.76, weakCredit: 0.25, weakRole: "weak", weakLabel: "too_blunt" },
      { prompt: "You want to add one more point before the topic changes.", best: "Can I add something?", acceptable: "One more thing.", weak: "I will say more.", acceptableCredit: 0.76, weakCredit: 0.38 },
      { prompt: "You did not hear the person's name clearly.", best: "Sorry, could you say your name again?", acceptable: "Your name again, please?", weak: "What is your name again you say?", acceptableCredit: 0.72, weakCredit: 0.24 }
    ]
  });

  addNaturalnessFamily({
    boundary: "A2/B1", type: "pragmatic_choice", focus: "b1_plans_suggestions_advice", skill_tags: ["suggestions", "advice", "planning"],
    distance: "near", difficulty: 0.54, discrimination: 0.4, source_grounding: pragmaticGrounding,
    signal: "These items distinguish natural suggestion frames from direct or translated advice.",
    variants: [
      { prompt: "Your friend is tired before an exam. You want to suggest a break.", best: "Maybe you should take a short break.", acceptable: "You can take a short break.", weak: "You must take a break now.", acceptableCredit: 0.78, weakCredit: 0.32, weakRole: "weak", weakLabel: "too_forceful" },
      { prompt: "A classmate cannot find a book. You suggest asking the librarian.", best: "Why don't you ask the librarian?", acceptable: "You can ask the librarian.", weak: "Ask the librarian now.", acceptableCredit: 0.78, weakCredit: 0.38, weakRole: "weak", weakLabel: "direct_but_clear" },
      { prompt: "Your team needs a quiet place to study.", best: "Let's study in the library.", acceptable: "The library is a good place.", weak: "We study library.", acceptableCredit: 0.72, weakCredit: 0.28 },
      { prompt: "A friend asks what to eat after class. You suggest soup.", best: "How about getting soup?", acceptable: "Let's get soup.", weak: "We can eating soup.", acceptableCredit: 0.82, weakCredit: 0.25 },
      { prompt: "You want to invite a friend to a movie but keep it casual.", best: "Do you want to see a movie tonight?", acceptable: "Let's see a movie tonight.", weak: "You come movie tonight?", acceptableCredit: 0.8, weakCredit: 0.26 },
      { prompt: "A friend suggests meeting at five, but six is better for you.", best: "Can we make it six instead?", acceptable: "Six is better for me.", weak: "Five is not good. Six.", acceptableCredit: 0.78, weakCredit: 0.42, weakRole: "weak", weakLabel: "clear_but_abrupt" },
      { prompt: "You need to cancel a plan because of family reasons.", best: "Sorry, I can't make it tonight.", acceptable: "Sorry, I can't come tonight.", weak: "Tonight I don't come.", acceptableCredit: 0.84, weakCredit: 0.32 },
      { prompt: "Your friend asks if the cafe is expensive. It is not cheap but OK.", best: "It's a little expensive, but it's OK.", acceptable: "It is not very cheap.", weak: "It is expensive but normal.", acceptableCredit: 0.7, weakCredit: 0.48, weakRole: "weak", weakLabel: "clear_but_less_natural" }
    ]
  });

  addNaturalnessFamily({
    boundary: "B1/B2", type: "naturalness_judgment", focus: "b2_work_chat_softening", skill_tags: ["work_chat", "softening", "register"],
    distance: "near", difficulty: 0.64, discrimination: 0.42, source_grounding: pragmaticGrounding,
    signal: "B1/B2 work-chat items score tone, purpose, and relationship management, not only grammar.",
    variants: [
      { prompt: "Bir iş arkadaşın bugün göndereceği dosyayı hâlâ göndermedi; sert olmayan ama net bir mesaj seç.", best: "Hi, just checking whether the file is ready.", acceptable: "Is the file ready?", weak: "Where is the file?", acceptableCredit: 0.7, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_abrupt" },
      { prompt: "Bir arkadaşının taslağında ikinci paragrafta küçük bir sorun fark ettin; suçlamadan belirt.", best: "I noticed a small issue in the second paragraph.", acceptable: "There is a mistake in the second paragraph.", weak: "You made a mistake in the second paragraph.", acceptableCredit: 0.72, weakCredit: 0.38, weakRole: "weak", weakLabel: "personal_blame" },
      { prompt: "Your manager asks if the report is finished. It is almost finished.", best: "It's almost done; I just need to check one section.", acceptable: "It is nearly finished.", weak: "It is not finished but soon.", acceptableCredit: 0.76, weakCredit: 0.48, weakRole: "weak", weakLabel: "clear_but_rough" },
      { prompt: "A teammate suggests a plan. You see a possible problem but want to stay constructive.", best: "That could work, but we may need more time.", acceptable: "It can work, but we need more time.", weak: "It will not work because time.", acceptableCredit: 0.76, weakCredit: 0.36 },
      { prompt: "You need to ask a busy colleague for a quick answer.", best: "When you have a minute, could you check this?", acceptable: "Can you check this when you have time?", weak: "Check this when you can.", acceptableCredit: 0.8, weakCredit: 0.5, weakRole: "weak", weakLabel: "clear_but_less_warm" },
      { prompt: "A colleague thanks you for extra help on a task.", best: "No problem. Happy to help.", acceptable: "You're welcome.", weak: "It was nothing important.", acceptableCredit: 0.78, weakCredit: 0.28, weakRole: "weak", weakLabel: "odd_tone" },
      { prompt: "You need to say you cannot join a meeting at the proposed time.", best: "I'm afraid I can't make that time.", acceptable: "I can't join at that time.", weak: "That time is impossible for me.", acceptableCredit: 0.74, weakCredit: 0.45, weakRole: "weak", weakLabel: "too_strong" },
      { prompt: "You want to ask a teammate to explain a decision without sounding critical.", best: "Can you walk me through your thinking here?", acceptable: "Can you explain why you chose this?", weak: "Why did you do this?", acceptableCredit: 0.78, weakCredit: 0.4, weakRole: "weak", weakLabel: "sounds_accusatory" }
    ]
  });

  addNaturalnessFamily({
    boundary: "B1/B2", type: "naturalness_judgment", focus: "b2_email_followup_register", skill_tags: ["email", "follow_up", "register"],
    distance: "near", difficulty: 0.66, discrimination: 0.42, source_grounding: pragmaticGrounding,
    signal: "These items test email register and follow-up pressure without rewarding stiff dictionary English.",
    variants: [
      { prompt: "You emailed a teacher three days ago and need a polite follow-up.", best: "I just wanted to follow up on my previous email.", acceptable: "I'm writing again about my email.", weak: "Why didn't you answer my email?", acceptableCredit: 0.68, weakCredit: 0.22, weakRole: "weak", weakLabel: "too_confrontational" },
      { prompt: "You attach a document in an email to a colleague.", best: "I've attached the document for your review.", acceptable: "The document is attached.", weak: "Here is attached the document.", acceptableCredit: 0.76, weakCredit: 0.36 },
      { prompt: "You need to ask a school office for information about course dates.", best: "Could you let me know when the course starts?", acceptable: "Can you tell me when the course starts?", weak: "Tell me when the course starts.", acceptableCredit: 0.82, weakCredit: 0.34, weakRole: "weak", weakLabel: "too_direct" },
      { prompt: "You need to apologize for sending a form late.", best: "I'm sorry for sending the form late.", acceptable: "Sorry, I sent the form late.", weak: "Sorry for late form.", acceptableCredit: 0.78, weakCredit: 0.34 },
      { prompt: "You reply to a colleague and want to say you understand the situation.", best: "Thanks for explaining. That makes sense.", acceptable: "Thanks, I understand now.", weak: "I understood your situation.", acceptableCredit: 0.8, weakCredit: 0.48, weakRole: "weak", weakLabel: "clear_but_less_natural" },
      { prompt: "You need to ask a client for a missing address.", best: "Could you send me the missing address?", acceptable: "Can you send the address?", weak: "You forgot the address.", acceptableCredit: 0.78, weakCredit: 0.34, weakRole: "weak", weakLabel: "blame_focus" },
      { prompt: "You want to end a semi-formal email after answering a simple question.", best: "Please let me know if you need anything else.", acceptable: "Tell me if you need more help.", weak: "If you need anything, say it.", acceptableCredit: 0.68, weakCredit: 0.35, weakRole: "weak", weakLabel: "too_blunt" },
      { prompt: "You need to tell a teacher you cannot attend the lesson tomorrow.", best: "Unfortunately, I won't be able to attend tomorrow's lesson.", acceptable: "Sorry, I can't come to tomorrow's lesson.", weak: "Tomorrow I won't come lesson.", acceptableCredit: 0.72, weakCredit: 0.28 }
    ]
  });

  addNaturalnessFamily({
    boundary: "B1/B2", type: "naturalness_judgment", focus: "b2_meeting_disagreement", skill_tags: ["disagreement", "meetings", "tone"],
    distance: "near", difficulty: 0.68, discrimination: 0.43, source_grounding: pragmaticGrounding,
    signal: "Meeting items reward disagreement that stays clear, useful, and socially controlled.",
    variants: [
      { prompt: "A teammate suggests launching tomorrow. You think it is too early.", best: "I'm not sure we're ready to launch tomorrow.", acceptable: "I think tomorrow is too early.", weak: "Tomorrow is a bad idea.", acceptableCredit: 0.74, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_absolute" },
      { prompt: "Someone says the problem is price, but you think delivery time matters more.", best: "I think the bigger issue is delivery time.", acceptable: "For me, delivery time is more important.", weak: "You forgot delivery time.", acceptableCredit: 0.76, weakCredit: 0.36, weakRole: "weak", weakLabel: "blame_focus" },
      { prompt: "You partly agree with a colleague but want to add a concern.", best: "I see your point, but I'm worried about the timeline.", acceptable: "I agree, but the timeline is a problem.", weak: "Your point is wrong because timeline.", acceptableCredit: 0.78, weakCredit: 0.3 },
      { prompt: "You want to move a discussion back to the main topic.", best: "Can we come back to the main question?", acceptable: "Let's return to the main topic.", weak: "This is not the topic.", acceptableCredit: 0.78, weakCredit: 0.44, weakRole: "weak", weakLabel: "clear_but_abrupt" },
      { prompt: "A plan sounds good, but you need one detail before agreeing.", best: "That sounds good, but I'd like to clarify one detail.", acceptable: "It sounds good, but I have one question.", weak: "I cannot agree because one detail.", acceptableCredit: 0.8, weakCredit: 0.42 },
      { prompt: "You need to say a proposal is unrealistic without attacking the person.", best: "I'm concerned that the timeline may not be realistic.", acceptable: "The timeline is not realistic.", weak: "Your timeline is impossible.", acceptableCredit: 0.68, weakCredit: 0.32, weakRole: "weak", weakLabel: "personalized" },
      { prompt: "You want to ask for evidence behind a claim.", best: "What are we basing that on?", acceptable: "Do we have data for that?", weak: "Where is your proof?", acceptableCredit: 0.78, weakCredit: 0.4, weakRole: "weak", weakLabel: "too_challenging" },
      { prompt: "You want to support an idea but mention a risk.", best: "I like the idea, but we should think about the cost.", acceptable: "The idea is good, but cost is a problem.", weak: "Good idea, bad cost.", acceptableCredit: 0.74, weakCredit: 0.28 }
    ]
  });

  addNaturalnessFamily({
    boundary: "B1/B2", type: "naturalness_judgment", focus: "b2_discourse_sense_cause_contrast", skill_tags: ["discourse", "meaning_flow", "sense"],
    distance: "near", difficulty: 0.67, discrimination: 0.42, source_grounding: pragmaticGrounding,
    signal: "These items test the sense relation between sentences more than isolated connector grammar.",
    variants: [
      { prompt: "Daha ucuz bir otel seçtin, ama konumu merkeze uzak çıktı; bu ödünleşimi doğal anlat.", best: "It was cheap, but the location wasn't great.", acceptable: "It was cheap, but far from the center.", weak: "It was cheap because it was far from the center.", acceptableCredit: 0.8, weakCredit: 0.42, weakRole: "weak", weakLabel: "wrong_relation" },
      { prompt: "You liked the teacher and the lessons, but the course was too fast.", best: "I liked the course overall, but it moved too quickly.", acceptable: "The course was good, but too fast.", weak: "The course was good because it was too fast.", acceptableCredit: 0.78, weakCredit: 0.36, weakRole: "weak", weakLabel: "wrong_relation" },
      { prompt: "A phone is expensive but very reliable. You want to summarize the value.", best: "It's expensive, but it may be worth it.", acceptable: "It costs a lot, but it is reliable.", weak: "It is expensive, so it is reliable.", acceptableCredit: 0.78, weakCredit: 0.4, weakRole: "weak", weakLabel: "false_cause" },
      { prompt: "The first plan saves money. The second plan saves time. You want to contrast them.", best: "The first saves money, while the second saves time.", acceptable: "One saves money, and one saves time.", weak: "The first saves money, so the second saves time.", acceptableCredit: 0.72, weakCredit: 0.34, weakRole: "weak", weakLabel: "wrong_relation" },
      { prompt: "You arrived late because traffic was heavy. You need a natural explanation.", best: "I was late because the traffic was heavy.", acceptable: "The traffic was heavy, so I was late.", weak: "I was late, but the traffic was heavy.", acceptableCredit: 0.86, weakCredit: 0.42, weakRole: "weak", weakLabel: "wrong_connector" },
      { prompt: "The app is easy to use. Still, it crashes often. You want to express both.", best: "It's easy to use, but it crashes a lot.", acceptable: "It is simple, but it often crashes.", weak: "It is easy to use, so it crashes a lot.", acceptableCredit: 0.82, weakCredit: 0.34, weakRole: "weak", weakLabel: "false_cause" },
      { prompt: "You did not study much. You passed the quiz. You want the surprise relation.", best: "I didn't study much, but I passed.", acceptable: "I passed even though I didn't study much.", weak: "I passed because I didn't study much.", acceptableCredit: 0.84, weakCredit: 0.3, weakRole: "weak", weakLabel: "wrong_relation" },
      { prompt: "The train was delayed. As a result, you missed the meeting.", best: "The train was delayed, so I missed the meeting.", acceptable: "I missed the meeting because the train was delayed.", weak: "The train was delayed, but I missed the meeting.", acceptableCredit: 0.86, weakCredit: 0.36, weakRole: "weak", weakLabel: "wrong_connector" }
    ]
  });

  addNaturalnessFamily({
    boundary: "B2/C1", type: "naturalness_judgment", focus: "c1_hedged_claims_and_limits", skill_tags: ["hedging", "stance", "precision"],
    distance: "near", difficulty: 0.78, discrimination: 0.44, source_grounding: pragmaticGrounding,
    signal: "C1 stance items reward precision, restraint, and evidence-sensitive language.",
    variants: [
      { prompt: "A small pilot showed positive results, but the sample was limited. Choose the best report wording.", best: "The pilot suggests a positive trend, though the sample is limited.", acceptable: "The pilot shows good results, but the sample is small.", weak: "The pilot proves that the idea works.", acceptableCredit: 0.72, weakCredit: 0.22, weakRole: "weak", weakLabel: "overclaims" },
      { prompt: "You are giving cautious advice about a risky plan in a meeting.", best: "We may want to consider the risks before moving ahead.", acceptable: "We should think about the risks first.", weak: "This plan is risky and we should not do it.", acceptableCredit: 0.76, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_absolute" },
      { prompt: "Bir çalışma bir açıklamayı destekliyor, ama kanıt kesin değil; sonucu temkinli ifade et.", best: "This explanation is plausible, but not conclusive.", acceptable: "This explanation could be right, but we need more data.", weak: "This explanation is probably correct.", acceptableCredit: 0.78, weakCredit: 0.45, weakRole: "weak", weakLabel: "underhedged" },
      { prompt: "You are discussing a change that may affect many users, but details are unclear.", best: "This could have wider implications, depending on how it is implemented.", acceptable: "This might affect many users.", weak: "This will affect everyone.", acceptableCredit: 0.72, weakCredit: 0.24, weakRole: "weak", weakLabel: "overstates" },
      { prompt: "A manager asks whether one complaint means the product is bad.", best: "One complaint doesn't necessarily mean there is a general problem.", acceptable: "One complaint may not mean the product is bad.", weak: "One complaint means nothing.", acceptableCredit: 0.76, weakCredit: 0.32, weakRole: "weak", weakLabel: "dismissive" },
      { prompt: "Kullanıcı geri bildirimleri karışık, ama birkaç kişi aynı sorunu dile getirdi; bunu özetle.", best: "The feedback is mixed, but several users raised the same concern.", acceptable: "Some people liked it and some did not.", weak: "Users have many different opinions.", acceptableCredit: 0.66, weakCredit: 0.48, weakRole: "weak", weakLabel: "too_vague" },
      { prompt: "You need to say a result is important but not final.", best: "The result is meaningful, but it should be interpreted cautiously.", acceptable: "The result is important, but we need to be careful.", weak: "The result is important and true.", acceptableCredit: 0.78, weakCredit: 0.35, weakRole: "weak", weakLabel: "overcertain" },
      { prompt: "A colleague says one solution is clearly best. You want to soften the claim.", best: "It may be the strongest option, but I wouldn't rule out the others yet.", acceptable: "It may be best, but other options could work.", weak: "It is the best option, but others exist.", acceptableCredit: 0.78, weakCredit: 0.46, weakRole: "weak", weakLabel: "less_nuanced" }
    ]
  });

  addNaturalnessFamily({
    boundary: "B2/C1", type: "naturalness_judgment", focus: "c1_diplomatic_feedback", skill_tags: ["feedback", "diplomacy", "professional_register"],
    distance: "near", difficulty: 0.8, discrimination: 0.44, source_grounding: pragmaticGrounding,
    signal: "Diplomatic feedback items check whether the speaker can be honest without sounding evasive or harsh.",
    variants: [
      { prompt: "A colleague's presentation is clear, but the ending needs a stronger point.", best: "The presentation is clear; the ending could be a little stronger.", acceptable: "The presentation is good, but the ending needs work.", weak: "The ending is weak.", acceptableCredit: 0.74, weakCredit: 0.38, weakRole: "weak", weakLabel: "too_blunt" },
      { prompt: "A student's essay has good ideas but lacks organization.", best: "There are some strong ideas here, but the structure needs more work.", acceptable: "The ideas are good, but the structure is not clear.", weak: "Your essay is disorganized.", acceptableCredit: 0.76, weakCredit: 0.34, weakRole: "weak", weakLabel: "harsh" },
      { prompt: "A teammate's draft is too long for the client email.", best: "We may need to make this a bit more concise for the client.", acceptable: "This is too long for the client.", weak: "You wrote too much.", acceptableCredit: 0.72, weakCredit: 0.3, weakRole: "weak", weakLabel: "personal_blame" },
      { prompt: "You need to reject a suggestion while preserving the relationship.", best: "I'm not sure that approach would work for this audience.", acceptable: "I don't think that approach will work.", weak: "That approach is wrong.", acceptableCredit: 0.72, weakCredit: 0.28, weakRole: "weak", weakLabel: "too_absolute" },
      { prompt: "A colleague asks for feedback on a design that is visually busy.", best: "It might be clearer if we reduced the number of elements.", acceptable: "There are too many elements.", weak: "The design is messy.", acceptableCredit: 0.68, weakCredit: 0.32, weakRole: "weak", weakLabel: "harsh" },
      { prompt: "You need to tell a senior colleague that one figure may be wrong.", best: "I may be missing something, but this figure looks different from the source.", acceptable: "This figure may be wrong.", weak: "This number is wrong.", acceptableCredit: 0.66, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_direct_for_context" },
      { prompt: "A team member's solution works but creates extra steps.", best: "This works, though it may add a bit of extra complexity.", acceptable: "It works, but it is more complicated.", weak: "This is too complicated.", acceptableCredit: 0.78, weakCredit: 0.4, weakRole: "weak", weakLabel: "unsoftened" },
      { prompt: "You need to ask for a revision without sounding annoyed.", best: "Could we revise this section before sending it?", acceptable: "We need to revise this section.", weak: "Fix this section before sending it.", acceptableCredit: 0.74, weakCredit: 0.34, weakRole: "weak", weakLabel: "commanding" }
    ]
  });

  addNaturalnessFamily({
    boundary: "B2/C1", type: "naturalness_judgment", focus: "c1_discourse_nuance_and_implication", skill_tags: ["discourse", "implication", "nuance"],
    distance: "near", difficulty: 0.82, discrimination: 0.45, source_grounding: pragmaticGrounding,
    signal: "These items check whether the learner reads the implied relation, priority, and stance in discourse.",
    variants: [
      { prompt: "A report says costs fell, but customer complaints rose. Choose the best summary.", best: "The savings came at a possible cost to customer satisfaction.", acceptable: "Costs fell, but customers complained more.", weak: "The report is both good and bad.", acceptableCredit: 0.74, weakCredit: 0.42, weakRole: "weak", weakLabel: "too_general" },
      { prompt: "Toplantıda biri “Mükemmel değil, ama iş görür” diyor; bu tutumu doğru anladığını göster.", best: "So you think it is acceptable, even if it has drawbacks.", acceptable: "So it can work, but it is not perfect.", weak: "So it is a bad idea.", acceptableCredit: 0.78, weakCredit: 0.28, weakRole: "weak", weakLabel: "misreads_stance" },
      { prompt: "A client says, 'I was hoping for something a bit simpler.' Choose the best internal summary.", best: "The client is asking us to simplify the design.", acceptable: "The client wants a simpler design.", weak: "The client liked the design.", acceptableCredit: 0.84, weakCredit: 0.12, weakRole: "weak", weakLabel: "wrong_implication" },
      { prompt: "Yöneticin “Bunu aklımızda tutalım, ama şimdilik aksiyon almayalım” diyor; beklenen eylemi seç.", best: "We should remember it, but no decision is needed now.", acceptable: "We should think about it later.", weak: "We should start it immediately.", acceptableCredit: 0.74, weakCredit: 0.12, weakRole: "weak", weakLabel: "wrong_action" },
      { prompt: "Bir ekip arkadaşı “Tam başarısızlık demezdim, ama hedefe de ulaşmadı” diyor; bu sonucu doğru özetle.", best: "The result was disappointing, though not a complete failure.", acceptable: "It was not a full failure, but it was not successful.", weak: "It was successful.", acceptableCredit: 0.78, weakCredit: 0.1, weakRole: "weak", weakLabel: "wrong_stance" },
      { prompt: "Hakem, argümanın ilginç ama kanıtın zayıf olduğunu söylüyor; en uygun revizyon notunu seç.", best: "Keep the argument, but strengthen the evidence.", acceptable: "Add more evidence to support the argument.", weak: "Change the whole topic.", acceptableCredit: 0.82, weakCredit: 0.24, weakRole: "weak", weakLabel: "overreacts" },
      { prompt: "A meeting note says, 'Priority should be given to stability over speed.' Choose the best action.", best: "Focus first on making the system reliable.", acceptable: "Make it stable before making it faster.", weak: "Make it as fast as possible.", acceptableCredit: 0.82, weakCredit: 0.12, weakRole: "weak", weakLabel: "reverses_priority" },
      { prompt: "Öğretmen cevabının doğru yönde olduğunu ama daha fazla destek gerektiğini söylüyor; sonraki adımı seç.", best: "Keep the main idea and add more support.", acceptable: "Add more details to the answer.", weak: "Delete the answer and start again.", acceptableCredit: 0.8, weakCredit: 0.22, weakRole: "weak", weakLabel: "overcorrects" }
    ]
  });

  addFamily({
    boundary: "B2/C1", type: "idiom", focus: "c1_high_value_discourse_phrases", skill_tags: ["idiom", "spoken_chunks", "discourse_sense", "c1_phrases"],
    distance: "near", difficulty: 0.79, discrimination: 0.43, source_grounding: ["Oxford_Phrase_List_C1_idiomatic_phrases", "OPAL_spoken_phrases", "CEFR_C1_nuanced_expression"],
    instruction: "Baglama gore en dogal ifade parcasini secin.",
    signal: "These are common high-value phrases for stance, summary, and implication, not decorative idioms.",
    l1Trap: "The option sounds related but changes the fixed phrase or discourse meaning.",
    devTrap: "The option is understandable vocabulary but not the natural phrase frame.",
    variants: [
      ["The claim sounds convincing, but we should not accept it without checking the data. We should not take it at _____.", "face value", "front value", "surface price"],
      ["Both teams want different things, but they agree on the main goal. They have some common _____.", "ground", "area", "basis"],
      ["The details are complicated, but the main message is simple. The _____ is that costs must come down.", "bottom line", "final line", "last point"],
      ["The change looks small now, but it will matter over time. In the _____, it could make a big difference.", "long run", "far time", "future road"],
      ["The first option is cheaper, but the second is safer. On _____, the second option is better.", "balance", "average", "middle"],
      ["The team needs to decide how much risk is acceptable. We need to draw the _____ somewhere.", "line", "limit", "border"],
      ["Looking back, the warning signs were clear. In _____, we should have acted sooner.", "hindsight", "back view", "late sight"],
      ["The two problems are closely connected. They go hand in _____.", "hand", "side", "pair"],
      ["The speaker avoided the central problem. He missed the _____.", "point", "target", "matter"],
      ["The first version failed, so the team built the system again from _____.", "scratch", "zero", "beginning"]
    ].map(([prompt, key, l1, dev]) => ({
      prompt, key, l1, dev,
      l1Pool: [l1, "main side", "final idea", "true ground"],
      devPool: [dev, "basic point", "far result", "direct meaning"]
    }))
  });

  const expansionGrounding = [
    "Oxford_3000_5000_general_english",
    "English_Profile_grammar_vocabulary",
    "CEFR_Companion_2020_mediation_and_interaction",
    "Turkish_EFL_transfer_patterns"
  ];

  function expansionVariant(row) {
    const [prompt, key, l1, dev, l1Pool, devPool] = row;
    return {
      prompt,
      key,
      l1,
      dev,
      l1Pool: l1Pool || [l1],
      devPool: devPool || [dev],
      hardL1Pool: l1Pool || [l1],
      hardDevPool: devPool || [dev]
    };
  }

  function naturalnessVariant(row) {
    const [prompt, best, acceptable, weak, acceptableCredit, weakCredit, weakRole, weakLabel] = row;
    return {
      prompt,
      best,
      acceptable,
      weak,
      acceptableCredit: acceptableCredit ?? 0.76,
      weakCredit: weakCredit ?? 0.34,
      weakRole: weakRole || "weak_nonnative",
      weakLabel: weakLabel || "weak_nonnative"
    };
  }

  const expansionFamilies = [
    {
      boundary: "A1/A2", type: "grammar", focus: "be_present_identity_and_place", skill_tags: ["a1", "be", "identity", "place"],
      distance: "medium", difficulty: 0.2, discrimination: 0.36, source_grounding: expansionGrounding,
      signal: "Checks control of be for simple identity, place, and basic descriptions.",
      variants: [
        ["My name _____ Deniz.", "is", "am", "are", ["am", "be"], ["are", "has"]],
        ["I _____ from Ankara.", "am", "is", "are", ["is", "come"], ["are", "be"]],
        ["They _____ at home now.", "are", "is", "am", ["is", "be"], ["am", "has"]],
        ["This bag _____ heavy.", "is", "has", "are", ["has", "be"], ["are", "am"]],
        ["We _____ ready.", "are", "is", "am", ["is", "be"], ["am", "was"]],
        ["The book _____ on the table.", "is", "has", "are", ["has", "be"], ["are", "am"]],
        ["You _____ late.", "are", "is", "am", ["is", "be"], ["am", "was"]],
        ["My parents _____ in Izmir.", "are", "is", "am", ["is", "live"], ["am", "be"]],
        ["The shop _____ open.", "is", "has", "are", ["has", "be"], ["are", "am"]],
        ["These shoes _____ new.", "are", "is", "has", ["is", "be"], ["has", "am"]],
        ["I _____ tired today.", "am", "is", "are", ["is", "feel"], ["are", "be"]],
        ["The children _____ in the garden.", "are", "is", "am", ["is", "be"], ["am", "has"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "grammar", focus: "simple_present_daily_actions", skill_tags: ["a1", "simple_present", "daily_routines"],
      distance: "medium", difficulty: 0.24, discrimination: 0.38, source_grounding: expansionGrounding,
      signal: "Checks simple present agreement and everyday verb control.",
      variants: [
        ["She _____ coffee every morning.", "drinks", "drink", "drinking", ["drink", "takes"], ["drinking", "drinkes"]],
        ["They _____ near the station.", "live", "lives", "living", ["lives", "stay"], ["living", "liveing"]],
        ["My brother _____ football on Sundays.", "plays", "play", "playing", ["play", "does"], ["playing", "plaies"]],
        ["We _____ English after school.", "study", "studies", "studying", ["studies", "learns"], ["studying", "studyies"]],
        ["He _____ to work by bus.", "goes", "go", "going", ["go", "comes"], ["going", "gos"]],
        ["I _____ music in the evening.", "listen to", "listen", "listening", ["listen", "hear"], ["listening", "listen at"]],
        ["The class _____ at nine.", "starts", "start", "starting", ["start", "opens"], ["starting", "startes"]],
        ["My mother _____ in a hospital.", "works", "work", "working", ["work", "makes"], ["working", "workes"]],
        ["We _____ dinner at seven.", "have", "has", "having", ["has", "eat"], ["having", "haves"]],
        ["The train _____ at six.", "leaves", "leave", "leaving", ["leave", "goes"], ["leaving", "leavees"]],
        ["He _____ Turkish at home.", "speaks", "speak", "speaking", ["speak", "talks"], ["speaking", "speakes"]],
        ["I _____ my phone every day.", "use", "uses", "using", ["uses", "work"], ["using", "useing"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "grammar", focus: "basic_questions_do_be", skill_tags: ["a1", "questions", "auxiliary_choice"],
      distance: "medium", difficulty: 0.27, discrimination: 0.4, source_grounding: expansionGrounding,
      signal: "Separates be-questions from do-questions in very short everyday stems.",
      variants: [
        ["_____ you like tea?", "Do", "Are", "Does", ["Are", "Is"], ["Does", "Did"]],
        ["_____ she your teacher?", "Is", "Does", "Do", ["Does", "Has"], ["Do", "Are"]],
        ["Where _____ you live?", "do", "are", "does", ["are", "is"], ["does", "did"]],
        ["_____ your father work here?", "Does", "Is", "Do", ["Is", "Has"], ["Do", "Are"]],
        ["_____ they at school now?", "Are", "Do", "Does", ["Do", "Is"], ["Does", "Am"]],
        ["What time _____ the shop open?", "does", "is", "do", ["is", "has"], ["do", "are"]],
        ["_____ this your bag?", "Is", "Does", "Do", ["Does", "Has"], ["Do", "Are"]],
        ["How often _____ you play tennis?", "do", "are", "does", ["are", "is"], ["does", "did"]],
        ["_____ he tired?", "Is", "Does", "Do", ["Does", "Has"], ["Do", "Are"]],
        ["Why _____ she call you?", "does", "is", "do", ["is", "has"], ["do", "are"]],
        ["_____ the children hungry?", "Are", "Do", "Is", ["Do", "Has"], ["Is", "Does"]],
        ["Where _____ the keys?", "are", "do", "is", ["do", "has"], ["is", "am"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "grammar", focus: "there_is_are_and_basic_quantity", skill_tags: ["a1", "there_is_are", "quantity"],
      distance: "medium", difficulty: 0.28, discrimination: 0.39, source_grounding: expansionGrounding,
      signal: "Checks count and quantity without hiding the target in long sentences.",
      variants: [
        ["There _____ two chairs in the room.", "are", "is", "be", ["is", "has"], ["be", "am"]],
        ["There _____ a bank near here.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ some milk in the fridge.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ three people outside.", "are", "is", "has", ["is", "has"], ["be", "am"]],
        ["There _____ a problem with my phone.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ no buses after midnight.", "are", "is", "has", ["is", "has"], ["be", "am"]],
        ["There _____ a lot of traffic today.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ many students in this class.", "are", "is", "has", ["is", "has"], ["be", "am"]],
        ["There _____ one ticket left.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ some nice cafes here.", "are", "is", "has", ["is", "has"], ["be", "am"]],
        ["There _____ a message for you.", "is", "are", "has", ["are", "has"], ["be", "am"]],
        ["There _____ four windows in the room.", "are", "is", "has", ["is", "has"], ["be", "am"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "grammar", focus: "pronouns_and_possessives", skill_tags: ["a1", "pronouns", "possessives"],
      distance: "near", difficulty: 0.3, discrimination: 0.42, source_grounding: expansionGrounding,
      signal: "Checks short pronoun and possessive choices where Turkish suffix transfer is common.",
      variants: [
        ["This is Ali. _____ bag is black.", "His", "He", "Him", ["He", "Her"], ["Him", "He's"]],
        ["This is Ayse. _____ phone is new.", "Her", "She", "Him", ["She", "His"], ["Him", "She's"]],
        ["I live with my parents. _____ house is small.", "Our", "We", "Us", ["We", "Their"], ["Us", "Ours"]],
        ["Can you help _____?", "me", "my", "I", ["my", "mine"], ["I", "me my"]],
        ["We like this city. _____ is beautiful.", "It", "He", "There", ["He", "She"], ["There", "This"]],
        ["My sister is here. I can see _____.", "her", "she", "his", ["she", "he"], ["his", "hers"]],
        ["These are my keys. They are _____.", "mine", "my", "me", ["my", "me"], ["I", "myself"]],
        ["That is our teacher. We like _____.", "him", "his", "he", ["his", "her"], ["he", "himself"]],
        ["The cat is hungry. Give _____ some food.", "it", "its", "he", ["its", "he"], ["there", "this"]],
        ["I know Mark and Anna. _____ are from London.", "They", "Them", "Their", ["Them", "Their"], ["Theirs", "Those"]],
        ["Is this _____ book?", "your", "you", "yours", ["you", "yours"], ["you're", "yourself"]],
        ["The children are tired. Let _____ rest.", "them", "they", "their", ["they", "their"], ["theirs", "these"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "vocab", format: "complete_sentence", focus: "oxford_basic_words_in_context", skill_tags: ["a1", "oxford_3000", "context_vocabulary"],
      distance: "medium", difficulty: 0.25, discrimination: 0.37, source_grounding: expansionGrounding,
      signal: "Uses Oxford basic words as opening cues, but keeps the item sentence-based.",
      variants: [
        ["I cannot hear you. Please _____ louder.", "speak", "listen", "say", ["listen", "hear"], ["say", "tell"]],
        ["This bag is not cheap. It is _____.", "expensive", "rich", "valuable", ["rich", "high"], ["valuable", "strong"]],
        ["I am hungry. I want to _____ something.", "eat", "drink", "cook", ["drink", "buy"], ["cook", "take"]],
        ["The lesson starts at eight. Do not be _____.", "late", "after", "slow", ["after", "last"], ["slow", "old"]],
        ["My room is not clean. It is _____.", "dirty", "bad", "wrong", ["bad", "poor"], ["wrong", "dark"]],
        ["Please _____ the door. It is cold.", "close", "finish", "turn off", ["finish", "shut down"], ["turn off", "end"]],
        ["I cannot find my keys. I think I _____ them.", "lost", "missed", "left", ["missed", "forgot"], ["left", "dropped"]],
        ["The coffee is too hot. Wait a _____.", "minute", "time", "second time", ["time", "clock"], ["second time", "momently"]],
        ["We need bread, milk, and eggs from the _____.", "shop", "school", "office", ["school", "market place"], ["office", "station"]],
        ["My phone is old. I want a _____ one.", "new", "young", "fresh", ["young", "small"], ["fresh", "modernly"]],
        ["I go to bed early because I am _____.", "tired", "sleep", "sleeping", ["sleep", "lazy"], ["sleeping", "asleep"]],
        ["The answer is not wrong. It is _____.", "right", "true", "real", ["true", "correctly"], ["real", "actual"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A1/A2", type: "collocation", focus: "everyday_verb_noun_collocations", skill_tags: ["a1", "collocation", "daily_actions"],
      distance: "near", difficulty: 0.32, discrimination: 0.43, source_grounding: expansionGrounding,
      signal: "Checks common verb-noun pairings that Turkish learners often translate through do/make/take.",
      variants: [
        ["Please _____ a photo of us.", "take", "make", "do", ["make", "shoot"], ["do", "get"]],
        ["I usually _____ breakfast at home.", "have", "make", "eat a", ["make", "do"], ["eat a", "take"]],
        ["Can I _____ a question?", "ask", "make", "say", ["make", "do"], ["say", "tell"]],
        ["I need to _____ my homework now.", "do", "make", "write to", ["make", "study"], ["write to", "finish to"]],
        ["Let's _____ a walk after dinner.", "go for", "make", "do", ["make", "go to"], ["do", "walk to"]],
        ["I want to _____ a shower before work.", "take", "make", "do", ["make", "have to"], ["do", "wash"]],
        ["Please _____ attention to the teacher.", "pay", "give", "make", ["give", "show"], ["make", "do"]],
        ["We often _____ lunch together.", "have", "make", "take", ["make", "eat to"], ["take", "do"]],
        ["I have to _____ the bus at seven.", "catch", "take", "go", ["take", "hold"], ["go", "arrive"]],
        ["Please _____ your name here.", "write", "say", "make", ["say", "tell"], ["make", "put to"]],
        ["I need to _____ my room.", "clean", "make clean", "do clean", ["make clean", "fix"], ["do clean", "clear to"]],
        ["We _____ a good time at the party.", "had", "made", "did", ["made", "took"], ["did", "went"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "grammar", focus: "past_simple_irregular_and_regular", skill_tags: ["a2", "past_simple", "irregular_verbs"],
      distance: "medium", difficulty: 0.38, discrimination: 0.42, source_grounding: expansionGrounding,
      signal: "Checks past-time control without adding complex clauses.",
      variants: [
        ["Yesterday I _____ my wallet at home.", "left", "leave", "leaved", ["leave", "let"], ["leaved", "lefted"]],
        ["She _____ a new phone last week.", "bought", "buy", "buyed", ["buy", "took"], ["buyed", "brought"]],
        ["We _____ the film on Friday.", "saw", "see", "seed", ["see", "watched"], ["seed", "sawed"]],
        ["He _____ to Paris in 2022.", "went", "go", "goed", ["go", "came"], ["goed", "gone"]],
        ["They _____ dinner at eight.", "had", "have", "haved", ["have", "ate"], ["haved", "has"]],
        ["I _____ her at the station.", "met", "meet", "meeted", ["meet", "saw"], ["meeted", "meted"]],
        ["The class _____ ten minutes late.", "started", "start", "was start", ["start", "opened"], ["was start", "startted"]],
        ["My friend _____ me a message.", "sent", "send", "sended", ["send", "wrote"], ["sended", "sent to"]],
        ["We _____ at home because it rained.", "stayed", "stay", "were stay", ["stay", "sat"], ["were stay", "staied"]],
        ["The train _____ on time.", "arrived", "arrive", "was arrive", ["arrive", "came"], ["was arrive", "arriveed"]],
        ["I _____ the answer after the lesson.", "understood", "understand", "understanded", ["understand", "knew"], ["understanded", "understooded"]],
        ["She _____ her old car in March.", "sold", "sell", "selled", ["sell", "gave"], ["selled", "solded"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "grammar", focus: "present_perfect_experience_and_duration", skill_tags: ["a2", "b1", "present_perfect", "since_for"],
      distance: "near", difficulty: 0.47, discrimination: 0.46, source_grounding: expansionGrounding,
      signal: "Checks the first real boundary between past simple and present-perfect meaning.",
      variants: [
        ["I have lived here _____ 2020.", "since", "from", "for", ["from", "after"], ["for", "during"]],
        ["We have worked together _____ three years.", "for", "since", "during", ["since", "from"], ["during", "in"]],
        ["She has just _____ the room.", "left", "leaved", "leave", ["leaved", "went out"], ["leave", "leaving"]],
        ["Have you _____ this film before?", "seen", "saw", "see", ["saw", "watched"], ["see", "seed"]],
        ["They have not finished the report _____.", "yet", "still", "already", ["still", "now"], ["already", "ever"]],
        ["I have _____ eaten sushi.", "never", "ever", "already not", ["ever", "always"], ["already not", "not ever"]],
        ["She has worked here _____ Monday.", "since", "for", "from", ["for", "after"], ["from", "during"]],
        ["We have known each other _____ a long time.", "for", "since", "during", ["since", "from"], ["during", "in"]],
        ["He has already _____ the email.", "sent", "send", "sended", ["send", "wrote"], ["sended", "sent to"]],
        ["I have not _____ my keys.", "found", "find", "founded", ["find", "seen"], ["founded", "finded"]],
        ["How long have you _____ English?", "studied", "study", "studying", ["study", "learn"], ["studying", "studyed"]],
        ["This is the first time I have _____ Thai food.", "tried", "try", "tryed", ["try", "eaten"], ["tryed", "trying"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "grammar", focus: "comparatives_superlatives_and_modifiers", skill_tags: ["a2", "comparatives", "degree"],
      distance: "medium", difficulty: 0.4, discrimination: 0.42, source_grounding: expansionGrounding,
      signal: "Checks comparative form and basic degree meaning.",
      variants: [
        ["This road is _____ than the old one.", "wider", "more wide", "wide more", ["more wide", "big"], ["wide more", "wider than"]],
        ["Today is _____ than yesterday.", "colder", "more cold", "coldest", ["more cold", "cold"], ["coldest", "coldly"]],
        ["This is the _____ restaurant in town.", "best", "better", "goodest", ["better", "most good"], ["goodest", "gooder"]],
        ["My bag is not _____ as yours.", "as heavy", "heavier", "so heavy than", ["heavier", "same heavy"], ["so heavy than", "heavy as"]],
        ["The exam was _____ easier than I expected.", "much", "many", "more", ["many", "very"], ["more", "too"]],
        ["This room is too small. We need a _____ one.", "bigger", "biggest", "more big", ["biggest", "large"], ["more big", "big one"]],
        ["She is the _____ person in the team.", "youngest", "younger", "most young", ["younger", "young"], ["most young", "youngly"]],
        ["The second answer is _____ clear.", "less", "fewer", "lower", ["fewer", "not many"], ["lower", "down"]],
        ["This ticket is _____ expensive than that one.", "more", "most", "much", ["most", "very"], ["much", "many"]],
        ["It is the _____ day of the year.", "hottest", "hotter", "most hot", ["hotter", "hot"], ["most hot", "hotly"]],
        ["The blue shirt is _____ cheaper.", "a little", "a few", "few", ["a few", "some"], ["few", "little of"]],
        ["This book is _____ interesting than the film.", "more", "most", "many", ["most", "very"], ["many", "much"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "grammar", focus: "modal_advice_obligation_permission", skill_tags: ["a2", "b1", "modals", "advice", "obligation"],
      distance: "near", difficulty: 0.46, discrimination: 0.46, source_grounding: expansionGrounding,
      signal: "Checks meaning differences between advice, obligation, permission, and lack of obligation.",
      variants: [
        ["You _____ smoke here. It is not allowed.", "must not", "do not have to", "must", ["do not have to", "cannot need"], ["must", "must to"]],
        ["You look tired. You _____ go to bed early.", "should", "must not", "can to", ["must not", "have to not"], ["can to", "should to"]],
        ["Students _____ wear a uniform at this school.", "have to", "must not", "can to", ["must not", "need not"], ["can to", "have"]],
        ["We _____ bring food; the hotel has breakfast.", "do not have to", "must not", "must", ["must not", "cannot"], ["must", "have not to"]],
        ["_____ I use your phone for a minute?", "Can", "Must", "Do", ["Must", "Need"], ["Do", "Am"]],
        ["You _____ tell anyone. It is a secret.", "must not", "do not have to", "should", ["do not have to", "need not"], ["should", "must to not"]],
        ["The road is dangerous. Drivers _____ slow down.", "should", "can not to", "do not have to", ["do not have to", "may not"], ["can not to", "should to"]],
        ["We _____ book a table; the restaurant is always full.", "should", "must not", "can to", ["must not", "need not"], ["can to", "should to"]],
        ["You _____ pay now; you can pay tomorrow.", "do not have to", "must not", "should not to", ["must not", "cannot"], ["should not to", "have not to"]],
        ["Children _____ swim here without an adult.", "must not", "do not have to", "should", ["do not have to", "need not"], ["should", "must to not"]],
        ["If you feel sick, you _____ see a doctor.", "should", "can not", "must not", ["can not", "need not"], ["must not", "should to"]],
        ["Visitors _____ show their tickets at the door.", "have to", "must not", "can to", ["must not", "need not"], ["can to", "have"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "collocation", focus: "travel_study_work_collocations", skill_tags: ["a2", "b1", "collocation", "everyday_work_study"],
      distance: "near", difficulty: 0.42, discrimination: 0.43, source_grounding: expansionGrounding,
      signal: "Checks practical collocations instead of isolated vocabulary translation.",
      variants: [
        ["I need to _____ a reservation for tonight.", "make", "do", "take", ["do", "open"], ["take", "get"]],
        ["The meeting will _____ place at ten.", "take", "make", "do", ["make", "happen"], ["do", "become"]],
        ["Please _____ the form before Friday.", "fill in", "write", "make", ["write", "fill"], ["make", "do"]],
        ["She _____ an exam next week.", "is taking", "is making", "is doing to", ["is making", "has"], ["is doing to", "takes to"]],
        ["We need to _____ a decision today.", "make", "do", "take", ["do", "give"], ["take", "choose"]],
        ["He _____ a mistake in the email.", "made", "did", "took", ["did", "wrote"], ["took", "put"]],
        ["I usually _____ notes during class.", "take", "make", "write to", ["make", "hold"], ["write to", "do"]],
        ["The company will _____ a new product next month.", "launch", "throw", "open", ["throw", "start"], ["open", "make out"]],
        ["We _____ a short break after lunch.", "took", "made", "did", ["made", "gave"], ["did", "went"]],
        ["Please _____ the instructions carefully.", "follow", "go after", "listen", ["go after", "watch"], ["listen", "do"]],
        ["I want to _____ my English this year.", "improve", "increase", "grow", ["increase", "develop"], ["grow", "make better"]],
        ["They _____ a lot of progress this month.", "made", "did", "took", ["did", "went"], ["took", "had"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "phrasal_verb", focus: "basic_phrasal_verbs_in_context", skill_tags: ["a2", "b1", "phrasal_verbs", "context"],
      distance: "near", difficulty: 0.48, discrimination: 0.47, source_grounding: expansionGrounding,
      signal: "Checks common phrasal verbs with close but wrong particles and literal-translation alternatives.",
      variants: [
        ["It is dark. Please _____ the light.", "turn on", "open", "turn in", ["open", "light on"], ["turn in", "turn up"]],
        ["I need to _____ my keys before I leave.", "look for", "look at", "search to", ["look at", "find for"], ["search to", "look after"]],
        ["Please _____ your shoes before you come in.", "take off", "take out", "put out", ["take out", "remove out"], ["put out", "take away"]],
        ["The plane will _____ at six.", "take off", "go out", "take out", ["go out", "leave from"], ["take out", "fly out"]],
        ["Can you _____ the radio? It is too loud.", "turn down", "close", "turn off down", ["close", "make low"], ["turn off down", "turn less"]],
        ["I _____ an old friend at the market.", "ran into", "ran to", "met with", ["met with", "saw into"], ["ran to", "ran on"]],
        ["We need to _____ the hotel before noon.", "check out of", "control out", "check from", ["control out", "leave from"], ["check from", "check off"]],
        ["Please _____ this word in the dictionary.", "look up", "look for", "search up", ["look for", "find up"], ["search up", "look at"]],
        ["The children _____ very fast.", "grew up", "grew out", "got up", ["got up", "became big"], ["grew out", "grew in"]],
        ["My car _____ on the way to work.", "broke down", "broke up", "stopped down", ["broke up", "got broken"], ["stopped down", "broke off"]],
        ["We have to _____ the meeting until Monday.", "put off", "put out", "delay to", ["delay to", "move after"], ["put out", "put away"]],
        ["Please _____ your coat. It is cold outside.", "put on", "wear on", "put in", ["wear on", "take"], ["put in", "put up"]]
      ].map(expansionVariant)
    },
    {
      boundary: "A2/B1", type: "vocab", format: "complete_sentence", focus: "oxford_a2_b1_meaning_in_sentence", skill_tags: ["a2", "b1", "oxford_3000", "meaning_in_context"],
      distance: "near", difficulty: 0.44, discrimination: 0.44, source_grounding: expansionGrounding,
      signal: "Uses A2/B1 Oxford vocabulary in short contexts with semantically nearby distractors.",
      variants: [
        ["The _____ of this meeting is to choose a date.", "purpose", "reason", "target", ["reason", "cause"], ["target", "aim place"]],
        ["There are _____ reasons why people move to big cities.", "several", "different", "separate", ["different", "some"], ["separate", "alone"]],
        ["Tickets are still _____ online.", "available", "possible", "ready", ["possible", "open"], ["ready", "free"]],
        ["Her answer was polite, but it was not very _____.", "clear", "clean", "certain", ["clean", "open"], ["certain", "surely"]],
        ["Prices usually _____ in summer.", "increase", "improve", "grow up", ["improve", "rise"], ["grow up", "upgrade"]],
        ["The weather may _____ the match tomorrow.", "affect", "effect", "touch", ["effect", "change"], ["touch", "hit"]],
        ["I cannot _____ your invitation because I am busy.", "accept", "except", "receive", ["except", "take"], ["receive", "allow"]],
        ["The rules do not _____ students to use phones.", "allow", "accept", "let to", ["accept", "permit"], ["let to", "make"]],
        ["Please _____ me to call Anna after lunch.", "remind", "remember", "say again", ["remember", "make remember"], ["say again", "warn"]],
        ["The hotel is in a very _____ location.", "convenient", "comfortable", "available", ["comfortable", "easy"], ["available", "possible"]],
        ["I need more _____ before I choose.", "information", "news", "knowledge", ["news", "data"], ["knowledge", "notice"]],
        ["This problem is _____; we can solve it today.", "simple", "plain", "basicly", ["plain", "easy"], ["basicly", "small"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "grammar", focus: "passive_relative_and_reduced_clauses", skill_tags: ["b1", "b2", "passive", "relative_clauses"],
      distance: "near", difficulty: 0.58, discrimination: 0.48, source_grounding: expansionGrounding,
      signal: "Checks whether the learner can process compact English noun phrases without over-reading Turkish structure.",
      variants: [
        ["The email _____ yesterday explains the change.", "sent", "was sent", "sending", ["was sent", "that sent"], ["sending", "sent by"]],
        ["The man _____ lives next door is a doctor.", "who", "which", "what", ["which", "that person"], ["what", "he"]],
        ["The book _____ I borrowed was excellent.", "that", "what", "which it", ["what", "which"], ["which it", "that it"]],
        ["The town _____ by the river is very old.", "located", "was located", "locating", ["was located", "that located"], ["locating", "place"]],
        ["The woman _____ car was stolen called the police.", "whose", "who", "which", ["who", "her"], ["which", "that"]],
        ["The report _____ last week was inaccurate.", "published", "was published", "publishing", ["was published", "that published"], ["publishing", "published it"]],
        ["The people _____ at the door are our guests.", "waiting", "waited", "who waits", ["who waits", "that wait"], ["waited", "are waited"]],
        ["The song _____ on the radio is from the 1990s.", "being played", "playing", "was playing", ["playing", "that plays"], ["was playing", "played it"]],
        ["The students _____ names are on the list can enter first.", "whose", "who", "which", ["who", "their"], ["which", "that"]],
        ["The house _____ in the storm needs repairs.", "damaged", "was damaged", "damaging", ["was damaged", "that damaged"], ["damaging", "damaged it"]],
        ["The reason _____ he left is still unclear.", "why", "which", "what", ["which", "that"], ["what", "for why"]],
        ["The files _____ on the desktop are old.", "stored", "were stored", "storing", ["were stored", "that stored"], ["storing", "stored them"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "grammar", focus: "conditionals_reported_speech_and_embedded_questions", skill_tags: ["b1", "b2", "conditionals", "reported_speech", "word_order"],
      distance: "near", difficulty: 0.6, discrimination: 0.5, source_grounding: expansionGrounding,
      signal: "Checks boundary-level clause control in compact, realistic stems.",
      variants: [
        ["If I _____ more time, I would join you.", "had", "have", "would have", ["have", "was"], ["would have", "had had"]],
        ["She asked me where I _____.", "lived", "did live", "live", ["did live", "was living"], ["live", "am live"]],
        ["If it rains, we _____ inside.", "will stay", "would stay", "stayed", ["would stay", "stay"], ["stayed", "will stayed"]],
        ["He said he _____ busy the next day.", "was", "is", "will be", ["is", "would be"], ["will be", "be"]],
        ["I wonder what time the train _____.", "leaves", "does leave", "leave", ["does leave", "is leave"], ["leave", "left"]],
        ["If she knew the answer, she _____ tell us.", "would", "will", "did", ["will", "can"], ["did", "would to"]],
        ["They told us that the shop _____ closed.", "was", "is", "has", ["is", "will be"], ["has", "be"]],
        ["Can you tell me where the office _____?", "is", "is it", "does it", ["is it", "it is"], ["does it", "be"]],
        ["If we leave now, we _____ the train.", "will catch", "would catch", "caught", ["would catch", "catch"], ["caught", "will caught"]],
        ["She wanted to know why he _____ late.", "was", "is he", "did be", ["is he", "he is"], ["did be", "was he"]],
        ["If I were you, I _____ apologise.", "would", "will", "did", ["will", "can"], ["did", "would to"]],
        ["He asked whether I _____ the message.", "had received", "did receive", "receive", ["did receive", "received"], ["receive", "have receive"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "collocation", focus: "academic_work_bridge_collocations", skill_tags: ["b1", "b2", "collocation", "argument", "work"],
      distance: "near", difficulty: 0.57, discrimination: 0.47, source_grounding: expansionGrounding,
      signal: "Checks high-frequency bridge collocations used in study and work contexts.",
      variants: [
        ["The team needs to _____ a conclusion soon.", "reach", "arrive", "touch", ["arrive", "come"], ["touch", "make to"]],
        ["Sleep can _____ an important role in learning.", "play", "make", "do", ["make", "have"], ["do", "take"]],
        ["The campaign helped _____ awareness of the issue.", "raise", "rise", "lift", ["rise", "increase"], ["lift", "make up"]],
        ["We need to _____ attention to the safety problem.", "draw", "take", "pull", ["take", "give"], ["pull", "make"]],
        ["She _____ responsibility for the mistake.", "took", "made", "carried", ["made", "accepted"], ["carried", "did"]],
        ["The results _____ a clear pattern.", "show", "make", "give", ["make", "say"], ["give", "put"]],
        ["The company tried to _____ costs without reducing quality.", "cut", "break", "drop down", ["drop", "lower"], ["break", "cut down out"]],
        ["The article _____ an important question.", "raises", "rises", "opens", ["rises", "asks"], ["opens", "brings"]],
        ["The evidence _____ the main claim.", "supports", "proves to", "holds", ["proves to", "shows"], ["holds", "helps to"]],
        ["We need to _____ the problem from a new angle.", "approach", "arrive", "access", ["arrive", "come near"], ["access", "go to"]],
        ["The report _____ several possible causes.", "identifies", "knows", "finds out", ["knows", "shows"], ["finds out", "names"]],
        ["A lack of time can _____ progress.", "limit", "border", "finish", ["border", "reduce"], ["finish", "stop to"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "phrasal_verb", focus: "b2_common_phrasal_verbs", skill_tags: ["b1", "b2", "phrasal_verbs", "work_study"],
      distance: "near", difficulty: 0.62, discrimination: 0.49, source_grounding: expansionGrounding,
      signal: "Checks phrasal-verb meaning through context, with close particles as distractors.",
      variants: [
        ["We need to _____ a solution by Friday.", "come up with", "come over with", "find up", ["find up", "think to"], ["come over with", "come out by"]],
        ["The manager will _____ the complaint tomorrow.", "look into", "look at", "search into", ["look at", "check to"], ["search into", "look inside"]],
        ["She _____ an important detail in the report.", "pointed out", "showed out", "pointed to", ["pointed to", "said out"], ["showed out", "pointed away"]],
        ["The team will _____ the survey next month.", "carry out", "carry on", "make out", ["make out", "do"], ["carry on", "carry away"]],
        ["They decided to _____ the launch until June.", "put off", "put out", "delay to", ["delay to", "move after"], ["put out", "put away"]],
        ["The meeting _____ because the manager was sick.", "was called off", "was called out", "called away", ["called away", "was cancelled to"], ["was called out", "called offed"]],
        ["Can you _____ these figures before I send them?", "check over", "check in", "control over", ["control over", "look"], ["check in", "check out of"]],
        ["The new rule _____ many small businesses.", "affects", "effects on", "touches to", ["effects on", "has effect"], ["touches to", "hits"]],
        ["The problem _____ from a misunderstanding.", "stems", "comes up", "starts out of", ["comes up", "comes"], ["starts out of", "stems from out"]],
        ["The speaker tried to _____ the main idea.", "get across", "get over", "pass across", ["pass across", "explain to"], ["get over", "get out"]],
        ["The company will _____ two departments next year.", "merge", "mix up", "join to", ["join to", "combine"], ["mix up", "merge in"]],
        ["Please _____ this issue with the finance team.", "follow up on", "follow after", "continue on", ["continue on", "ask again"], ["follow after", "follow up to"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "idiom", focus: "b2_common_idioms_and_fixed_phrases", skill_tags: ["b1", "b2", "idiom", "fixed_phrase"],
      distance: "near", difficulty: 0.6, discrimination: 0.48, source_grounding: expansionGrounding,
      signal: "Checks transparent but fixed phrases that occur often in natural English.",
      variants: [
        ["At _____ glance, the plan looks simple.", "first", "one", "early", ["one", "initial"], ["early", "front"]],
        ["In the long _____, this will save money.", "run", "time", "road", ["time", "future"], ["road", "way"]],
        ["The project is still on _____.", "track", "road", "way", ["road", "line"], ["way", "path"]],
        ["The software is out of _____.", "date", "time", "day", ["time", "old"], ["day", "calendar"]],
        ["Who is in _____ of the budget?", "charge", "control", "responsible", ["control", "head"], ["responsible", "duty"]],
        ["Your explanation makes _____.", "sense", "meaning", "mind", ["meaning", "logic"], ["mind", "reason"]],
        ["The decision is only a matter of _____.", "time", "day", "clock", ["day", "period"], ["clock", "hour"]],
        ["She is under a lot of _____ at work.", "pressure", "stressful", "weight", ["stress", "force"], ["stressful", "weight"]],
        ["The two ideas go hand in _____.", "hand", "side", "pair", ["side", "together"], ["pair", "arm"]],
        ["By _____, I sent the file to the wrong person.", "accident", "mistake", "chance", ["mistake", "error"], ["chance", "luck"]],
        ["On the other _____, the cheaper option is slower.", "hand", "side", "part", ["side", "direction"], ["part", "way"]],
        ["I see your _____, but I disagree.", "point", "idea", "target", ["idea", "opinion"], ["target", "place"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B1/B2", type: "discourse_marker", focus: "b2_discourse_flow_cause_contrast_addition", skill_tags: ["b1", "b2", "discourse", "connectors"],
      distance: "near", difficulty: 0.59, discrimination: 0.48, source_grounding: expansionGrounding,
      signal: "Checks whether the learner tracks the relation between two short clauses.",
      variants: [
        ["The weather was bad. _____, the event was not cancelled.", "However", "Therefore", "For example", ["Therefore", "So"], ["For example", "Also"]],
        ["The road was closed. _____, we arrived late.", "As a result", "However", "For instance", ["However", "But"], ["For instance", "Also"]],
        ["The hotel is cheap. _____, it is very clean.", "In addition", "Therefore", "Although", ["Therefore", "So"], ["Although", "Despite"]],
        ["She studies a lot. _____, she still finds speaking difficult.", "However", "Because", "For example", ["Because", "So"], ["For example", "Also"]],
        ["The app is useful _____ it is sometimes slow.", "although", "because", "therefore", ["because", "so"], ["therefore", "despite"]],
        ["We stayed home _____ the heavy rain.", "because of", "because", "therefore", ["because", "as"], ["therefore", "although"]],
        ["Many people liked the idea. _____, some were worried about cost.", "On the other hand", "As a result", "For example", ["As a result", "So"], ["For example", "In sample"]],
        ["The first plan is fast. _____, the second plan is safer.", "By contrast", "Because", "For instance", ["Because", "So"], ["For instance", "Such as"]],
        ["He missed the bus. _____, he took a taxi.", "Therefore", "However", "Although", ["However", "But"], ["Although", "Despite"]],
        ["This method is simple. _____, it is not always accurate.", "However", "Therefore", "In addition", ["Therefore", "So"], ["In addition", "Also"]],
        ["You need a passport. _____, you need a visa.", "In addition", "However", "Because", ["However", "But"], ["Because", "So"]],
        ["The price is high. _____, demand remains strong.", "Nevertheless", "Therefore", "For example", ["Therefore", "So"], ["For example", "Also"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "grammar", focus: "advanced_clause_control_and_inversion", skill_tags: ["b2", "c1", "inversion", "advanced_clauses"],
      distance: "near", difficulty: 0.75, discrimination: 0.5, source_grounding: expansionGrounding,
      signal: "Checks advanced grammar forms that are common in formal written and spoken English.",
      variants: [
        ["Not only _____ the costs fall, but quality improved.", "did", "the costs did", "were", ["the costs did", "costs"], ["were", "had"]],
        ["Had I known earlier, I _____ have changed the plan.", "would", "will", "had", ["will", "could"], ["had", "did"]],
        ["Rarely _____ a small change such a big effect.", "does", "it does", "has", ["it does", "is"], ["has", "did"]],
        ["The sooner we act, the _____ the risk will be.", "lower", "less", "least", ["less", "low"], ["least", "lower than"]],
        ["What matters most _____ whether the data is reliable.", "is", "it is", "that is", ["it is", "is that"], ["that is", "being"]],
        ["No sooner had the meeting started _____ the alarm went off.", "than", "when", "then", ["when", "as"], ["then", "that"]],
        ["Only after the test _____ we notice the error.", "did", "we did", "were", ["we did", "then"], ["were", "had"]],
        ["The proposal, _____ ambitious, is realistic.", "while", "despite", "whereas", ["despite", "although"], ["whereas", "while of"]],
        ["Were the data more complete, the conclusion _____ stronger.", "would be", "will be", "had been", ["will be", "is"], ["had been", "would have"]],
        ["It is essential that every result _____ checked twice.", "be", "is", "will be", ["is", "gets"], ["will be", "to be"]],
        ["Little _____ about the long-term effects.", "is known", "knows", "it is known", ["it is known", "people know"], ["knows", "known"]],
        ["The issue is not whether we can do it, _____ whether we should.", "but", "and", "whereas", ["and", "but also"], ["whereas", "however"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "collocation", focus: "c1_academic_business_collocations", skill_tags: ["b2", "c1", "collocation", "academic_business"],
      distance: "near", difficulty: 0.73, discrimination: 0.49, source_grounding: expansionGrounding,
      signal: "Checks precise high-frequency collocations for argument, data, policy, and workplace English.",
      variants: [
        ["The new regulation may _____ a challenge for smaller firms.", "pose", "put", "make", ["put", "create"], ["make", "give"]],
        ["We need to _____ a distinction between cost and value.", "draw", "make", "pull", ["make", "show"], ["pull", "take"]],
        ["The applicant does not _____ the criteria.", "meet", "fit", "answer", ["fit", "match"], ["answer", "complete"]],
        ["The company took steps to _____ risk.", "mitigate", "decrease", "soften", ["decrease", "reduce"], ["soften", "make less"]],
        ["The argument depends on a questionable _____.", "assumption", "prediction", "guess", ["prediction", "idea"], ["guess", "thought"]],
        ["The study provides _____ evidence for the claim.", "robust", "strongly", "hard", ["strong", "solid"], ["strongly", "hard"]],
        ["The report falls outside the _____ of this project.", "scope", "scale", "range", ["range", "area"], ["scale", "size"]],
        ["We should _____ local conditions into account.", "take", "make", "put", ["make", "consider"], ["put", "give"]],
        ["Several staff members _____ concerns about the plan.", "raised", "rose", "lifted", ["rose", "expressed"], ["lifted", "opened"]],
        ["The committee failed to _____ consensus.", "reach", "arrive", "touch", ["arrive", "come to"], ["touch", "make"]],
        ["The decision may have serious _____.", "implications", "effects to", "meanings", ["effects", "results"], ["effects to", "meanings"]],
        ["The findings are _____; they do not all point in one direction.", "mixed", "confused", "differented", ["confused", "varied"], ["differented", "separate"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "phrasal_verb", focus: "c1_formal_phrasal_verbs_and_multiword_verbs", skill_tags: ["b2", "c1", "phrasal_verbs", "formal_register"],
      distance: "near", difficulty: 0.76, discrimination: 0.5, source_grounding: expansionGrounding,
      signal: "Checks high-value multiword verbs through precise context rather than isolated memorization.",
      variants: [
        ["The company plans to _____ the old system gradually.", "phase out", "fade out", "finish out", ["fade out", "remove"], ["finish out", "phase away"]],
        ["The pilot was successful, so they will _____ the project.", "scale up", "grow up", "increase up", ["grow up", "expand"], ["increase up", "scale on"]],
        ["The data does not _____ that explanation.", "rule out", "rule off", "cancel out", ["cancel out", "exclude"], ["rule off", "rule away"]],
        ["How do you _____ the sudden rise in sales?", "account for", "count for", "explain for", ["explain", "count"], ["count for", "account to"]],
        ["The document _____ the main principles of the policy.", "sets out", "sets up", "puts out", ["sets up", "presents"], ["puts out", "sets away"]],
        ["The team promised a review but did not _____ it.", "follow through on", "follow up to", "continue through", ["continue with", "follow"], ["follow up to", "follow after"]],
        ["Looking back, several warnings _____ the prediction.", "bear out", "carry out", "hold out", ["carry out", "support"], ["hold out", "bear up"]],
        ["We need to _____ the pros and cons before deciding.", "weigh up", "measure up", "weight up", ["measure up", "compare"], ["weight up", "weigh out"]],
        ["The reforms helped _____ major changes in the sector.", "bring about", "bring around", "make about", ["make", "cause"], ["bring around", "bring out"]],
        ["The shortlist was _____ to three candidates.", "narrowed down", "made narrow", "narrowed out", ["made narrow", "reduced"], ["narrowed out", "closed down"]],
        ["The manager asked us to _____ the risks clearly.", "spell out", "write out", "say out", ["write out", "explain"], ["say out", "spell away"]],
        ["The new findings _____ earlier doubts about the model.", "cast doubt on", "throw doubt to", "make doubt on", ["raise doubts about", "question"], ["throw doubt to", "doubt at"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "idiom", focus: "c1_argument_idioms_and_discourse_phrases", skill_tags: ["b2", "c1", "idiom", "argument_phrases"],
      distance: "near", difficulty: 0.74, discrimination: 0.49, source_grounding: expansionGrounding,
      signal: "Checks idiomatic discourse phrases that carry stance, implication, or argument structure.",
      variants: [
        ["With _____, the warning signs were obvious.", "hindsight", "back view", "late sight", ["back view", "after thought"], ["late sight", "behind look"]],
        ["By and _____, the system works well.", "large", "big", "wide", ["big", "generally"], ["wide", "much"]],
        ["There is a lot at _____ in this decision.", "stake", "risk", "hand", ["risk", "danger"], ["hand", "table"]],
        ["In _____ of the new evidence, we should revise the plan.", "light", "view", "front", ["view", "according"], ["front", "sight"]],
        ["The transport strike is a case in _____.", "point", "example", "place", ["example", "case"], ["place", "target"]],
        ["To some _____, the criticism is fair.", "extent", "degree", "level", ["degree", "point"], ["level", "amount"]],
        ["The former option is cheaper; the _____ is safer.", "latter", "later", "last", ["later", "second"], ["last", "late"]],
        ["On _____, the evidence supports the claim.", "balance", "average", "middle", ["average", "overall"], ["middle", "weigh"]],
        ["As a rule of _____, allow ten minutes per speaker.", "thumb", "hand", "finger", ["hand", "roughly"], ["finger", "rule hand"]],
        ["The plan is risky, not _____ because the budget is unclear.", "least", "last", "less", ["last", "only"], ["less", "low"]],
        ["Why did we change the system in the first _____?", "place", "time", "point", ["time", "start"], ["point", "area"]],
        ["We accepted the delay for the _____ of quality.", "sake", "reason", "purpose", ["reason", "benefit"], ["purpose", "need"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "discourse_marker", focus: "c1_argument_flow_and_hedging", skill_tags: ["b2", "c1", "discourse", "hedging", "argument"],
      distance: "near", difficulty: 0.78, discrimination: 0.51, source_grounding: expansionGrounding,
      signal: "Checks fine-grained relations such as concession, condition, scope, and qualification.",
      variants: [
        ["The first model is cheaper, _____ the second is more reliable.", "whereas", "therefore", "despite", ["therefore", "but"], ["despite", "although"]],
        ["The sample was small; _____, the pattern is worth investigating.", "nevertheless", "therefore", "because", ["therefore", "so"], ["because", "although"]],
        ["We can approve the plan _____ the risks are documented.", "provided that", "despite", "whereas", ["if", "as long as"], ["despite", "whereas"]],
        ["The findings are useful _____ they apply to adult learners.", "insofar as", "whereas", "despite", ["whereas", "because"], ["despite", "as far"]],
        ["The policy is popular. _____, it may be expensive to implement.", "That said", "For this reason", "For example", ["For this reason", "So"], ["For example", "Such as"]],
        ["The approach is efficient, _____ somewhat inflexible.", "albeit", "despite", "whereas", ["although", "but"], ["despite", "however of"]],
        ["The survey suggests a trend; _____, it cannot prove causation.", "however", "therefore", "because", ["therefore", "so"], ["because", "as"]],
        ["The product failed, _____ heavy marketing.", "despite", "although", "whereas", ["although", "even though"], ["whereas", "because of"]],
        ["The claim is plausible, _____ not conclusive.", "though", "therefore", "because", ["although", "but"], ["therefore", "so"]],
        ["The data is incomplete. _____, we should avoid strong claims.", "Accordingly", "Nevertheless", "For instance", ["Therefore", "So"], ["For instance", "Example"]],
        ["The plan saves money, _____ at the expense of service quality.", "but only", "therefore", "because", ["but", "although"], ["therefore", "so"]],
        ["This is not a rejection; _____, it is a request for more detail.", "rather", "therefore", "despite", ["instead", "actually"], ["therefore", "although"]]
      ].map(expansionVariant)
    },
    {
      boundary: "B2/C1", type: "spoken_chunk", focus: "c1_stance_and_discourse_chunks", skill_tags: ["b2", "c1", "spoken_chunks", "stance"],
      distance: "near", difficulty: 0.75, discrimination: 0.49, source_grounding: expansionGrounding,
      signal: "Checks natural high-level response chunks for disagreement, relevance, caution, and summary.",
      variants: [
        ["A colleague says the plan is perfect. You partly disagree: _____", "I see the appeal, but I have some concerns.", "I see your perfect, but no.", "I am not agree with all.", ["I understand the appeal, but", "I take your point, but"], ["I am not agree with all", "I see your perfect"]],
        ["Someone gives a long explanation that misses the main issue. You say: _____", "That's beside the point.", "That's next to the point.", "That is outside from point.", ["That is not really the point", "That misses the point"], ["That's next to the point", "outside from point"]],
        ["You want to avoid overclaiming in a meeting: _____", "It's too early to say for sure.", "It is early to tell certain.", "We cannot know nothing.", ["I would be careful about saying that", "It is not certain yet"], ["early to tell certain", "cannot know nothing"]],
        ["You agree with the general idea but need detail: _____", "In principle, yes, but the details matter.", "In principle yes but details are matter.", "Generally yes and detail important.", ["Broadly, yes, but", "The idea makes sense, but"], ["details are matter", "detail important"]],
        ["You want to return to the main issue: _____", "Let's get back to the main question.", "Let's return back to main question.", "Let's go the question again.", ["Let's return to the main question", "Back to the main issue"], ["return back", "go the question"]],
        ["You think a claim is possible but uncertain: _____", "That may be true, but we need evidence.", "That can be true but need evidence.", "Maybe true but evidence need.", ["That could be true, but", "It is possible, but"], ["can be true but need", "evidence need"]],
        ["You want to summarize both sides: _____", "On balance, the benefits outweigh the risks.", "In average, benefits pass risks.", "Benefits are more from risks.", ["Overall, benefits outweigh risks", "On the whole"], ["in average", "more from risks"]],
        ["You want to soften criticism in writing: _____", "This section would benefit from more evidence.", "This section needs more evidence badly.", "Evidence is missing and weak.", ["This could use more evidence", "More evidence would strengthen this"], ["badly", "missing and weak"]],
        ["You want to challenge a conclusion politely: _____", "I'm not sure the evidence supports that conclusion.", "I don't sure evidence supports it.", "The evidence does not carry this.", ["I'm not convinced the evidence supports it", "I would question that conclusion"], ["I don't sure", "carry this"]],
        ["You want to keep options open: _____", "Let's not rule that out yet.", "Let's not make it outside.", "Do not cancel from mind.", ["Let's keep that option open", "We should not exclude it yet"], ["make it outside", "cancel from mind"]],
        ["You want to introduce a practical limit: _____", "That sounds good in theory, but it may be hard in practice.", "In theory good but in practice hard maybe.", "It is theory good, practice hard.", ["The idea is good, but implementation may be hard", "In practice, it may be difficult"], ["theory good", "practice hard"]],
        ["You want to say the result is mixed: _____", "It's a step forward, but not a complete solution.", "It is forward step but not whole solution.", "It went front but solution no.", ["It is progress, but not enough", "It helps, but it does not solve everything"], ["forward step", "solution no"]]
      ].map(expansionVariant)
    }
  ];

  expansionFamilies.forEach(addFamily);

  const expansionNaturalnessFamilies = [
    {
      boundary: "A1/A2", type: "pragmatic_choice", focus: "a1_survival_short_responses", skill_tags: ["a1", "natural_speech", "short_responses", "survival"],
      distance: "medium", difficulty: 0.25, discrimination: 0.38, source_grounding: expansionGrounding,
      signal: "Checks simple communicative fit without rewarding grammar-heavy guessing.",
      variants: [
        ["A friend says, 'Thank you.' What is the best reply?", "You're welcome.", "No problem.", "I am welcome.", 0.82, 0.18, "developmental_error", "form_error"],
        ["A cashier asks, 'Do you need a bag?' You do not need one.", "No, thanks.", "No, please.", "I don't want bag.", 0.72, 0.28, "weak_nonnative", "missing_article"],
        ["You want water in a cafe.", "Can I have some water, please?", "Water, please.", "Give water to me.", 0.78, 0.34, "l1_trap", "too_direct"],
        ["Someone says, 'How are you?' You are fine.", "I'm fine, thanks.", "Good, thanks.", "I am goodly.", 0.8, 0.12, "developmental_error", "word_form"],
        ["You did not hear the question.", "Sorry, can you repeat that?", "Again, please?", "Repeat me.", 0.72, 0.22, "l1_trap", "direct_transfer"],
        ["You arrive five minutes late.", "Sorry I'm late.", "Sorry for being late.", "I came late sorry.", 0.78, 0.22, "l1_trap", "word_order"],
        ["Someone offers coffee. You want tea.", "Tea, please.", "I'd like tea, please.", "I want tea instead coffee.", 0.82, 0.32, "developmental_error", "preposition_article"],
        ["You want to ask the price.", "How much is it?", "What is the price?", "How many money?", 0.78, 0.16, "l1_trap", "quantity_transfer"],
        ["A friend asks, 'See you tomorrow?' You agree.", "Yes, see you tomorrow.", "Okay, see you.", "I see you tomorrow.", 0.76, 0.3, "developmental_error", "future_form"],
        ["You need help in a shop.", "Can you help me, please?", "Excuse me, can you help?", "Help me.", 0.78, 0.35, "weak_nonnative", "too_direct"],
        ["Someone says, 'Sorry.' You accept it.", "That's okay.", "No worries.", "It is no problem for me.", 0.8, 0.3, "weak_nonnative", "unnatural_long"],
        ["You want to leave a room politely.", "Excuse me.", "I need to go.", "I go now.", 0.72, 0.28, "weak_nonnative", "blunt_but_clear"]
      ].map(naturalnessVariant)
    },
    {
      boundary: "A2/B1", type: "pragmatic_choice", focus: "b1_everyday_problem_solving", skill_tags: ["a2", "b1", "pragmatic_choice", "everyday_problems"],
      distance: "near", difficulty: 0.46, discrimination: 0.44, source_grounding: expansionGrounding,
      signal: "Checks everyday sense, not only formal grammar.",
      variants: [
        ["Your food is cold in a restaurant. What do you say?", "Excuse me, this is a bit cold.", "This food is cold.", "You gave me cold food.", 0.72, 0.38, "weak_nonnative", "too_blunt"],
        ["You cannot attend a class. Message the teacher.", "I'm sorry, I can't come to class today.", "I don't come class today.", "Today class no.", 0.72, 0.16, "developmental_error", "missing_structure"],
        ["A friend looks upset. Choose a natural question.", "Are you okay?", "What happened?", "Why are you like this?", 0.78, 0.3, "weak_nonnative", "too_direct"],
        ["You want a colleague to wait two minutes.", "Can you give me two minutes?", "Wait two minutes.", "Give me two minutes waiting.", 0.7, 0.24, "l1_trap", "direct_transfer"],
        ["You forgot a meeting time. Ask politely.", "Sorry, what time is the meeting?", "When was meeting?", "Tell meeting time.", 0.72, 0.22, "developmental_error", "missing_article_aux"],
        ["You are not sure about an answer.", "I'm not sure, but I think it's B.", "Maybe B.", "I don't know but B maybe is.", 0.76, 0.3, "developmental_error", "word_order"],
        ["Your friend invites you out, but you are tired.", "Thanks, but I think I'll stay home tonight.", "No, I am tired.", "I don't come because tired.", 0.74, 0.22, "developmental_error", "missing_be"],
        ["You want to suggest another day.", "How about Friday?", "Let's do Friday.", "Let's make it Friday.", 0.8, 0.66, "acceptable", "informal_but_ok"],
        ["A colleague helped you. Reply naturally.", "Thanks, that really helped.", "Thanks, it helped me.", "Thanks for your helping me.", 0.78, 0.3, "developmental_error", "gerund_frame"],
        ["You need someone to speak more slowly.", "Can you speak a little more slowly?", "Speak slow, please.", "Can you speak slower little?", 0.72, 0.34, "developmental_error", "word_order"],
        ["You disagree with a friend gently.", "I'm not sure I agree.", "I don't agree.", "You are wrong.", 0.76, 0.32, "weak_nonnative", "too_blunt"],
        ["You want to check you understood.", "So, the meeting is at three, right?", "Meeting at three, yes?", "I understood meeting three?", 0.76, 0.34, "developmental_error", "elliptical_but_weak"]
      ].map(naturalnessVariant)
    },
    {
      boundary: "B1/B2", type: "naturalness_judgment", focus: "b2_register_and_inference", skill_tags: ["b1", "b2", "naturalness", "register", "inference"],
      distance: "near", difficulty: 0.6, discrimination: 0.48, source_grounding: expansionGrounding,
      signal: "Checks whether the learner chooses a sentence that fits meaning and situation, not just grammar.",
      variants: [
        ["A teacher asks why your work is late. Choose the best reply.", "I'm sorry; I needed more time to check my sources.", "I was busy, but I did it.", "My homework came late because time was not enough.", 0.72, 0.28, "developmental_error", "unnatural_reason"],
        ["A manager asks for a short update. Choose the best sentence.", "We're on schedule, but one task may need extra support.", "Everything is good except one thing.", "We are going normally but one job has support need.", 0.72, 0.3, "developmental_error", "translation_frame"],
        ["A friend says, 'This plan might be too expensive.' Choose the best response.", "That's a fair point; let's compare the costs.", "Maybe, but it is good.", "You always think money.", 0.72, 0.24, "weak_nonnative", "tone_problem"],
        ["You are emailing a colleague about a mistake.", "I noticed one small error in the file.", "There is a mistake in your file.", "Your file has wrong.", 0.7, 0.22, "developmental_error", "missing_noun_frame"],
        ["A customer says the app is confusing. Choose the best summary.", "The customer is having trouble understanding the app.", "The customer does not like the app.", "The customer is confused person.", 0.74, 0.2, "developmental_error", "wrong_characterization"],
        ["You want to postpone a meeting politely.", "Would it be possible to move the meeting to Friday?", "Move the meeting to Friday.", "Can we make meeting Friday?", 0.72, 0.34, "developmental_error", "article_frame"],
        ["A report says sales rose but profit fell. Choose the best summary.", "Sales increased, but costs probably rose too.", "The company did well.", "Sales and profit are opposite things.", 0.72, 0.28, "weak_nonnative", "too_general"],
        ["You want to say the evidence is weak.", "The claim needs stronger evidence.", "The claim is wrong.", "Evidence is not enough strong.", 0.7, 0.26, "developmental_error", "adjective_order"],
        ["A colleague says, 'It is not urgent, but keep it in mind.' What should you do?", "Remember it, but do not treat it as urgent.", "Do it now if possible.", "Forget it until later.", 0.74, 0.18, "weak", "wrong_action"],
        ["You are giving feedback on an essay.", "Your main idea is clear, but the examples need more detail.", "Your essay is good but examples bad.", "Idea clear, examples need detail.", 0.72, 0.36, "weak_nonnative", "telegraphic"],
        ["A speaker says, 'I'm not against it, but I have reservations.' What does this mean?", "The speaker has concerns but is not fully opposed.", "The speaker supports it completely.", "The speaker wants to reserve it.", 0.74, 0.12, "l1_trap", "literal_reading"],
        ["You want to make a cautious prediction.", "It is likely to improve, but not immediately.", "It will improve soon.", "It improves but not fastly.", 0.72, 0.28, "developmental_error", "adverb_form"]
      ].map(naturalnessVariant)
    },
    {
      boundary: "B2/C1", type: "naturalness_judgment", focus: "c1_pragmatic_nuance_and_argument_sense", skill_tags: ["b2", "c1", "pragmatic_nuance", "argument_sense"],
      distance: "near", difficulty: 0.76, discrimination: 0.51, source_grounding: expansionGrounding,
      signal: "Checks nuanced sense: the best answer is often the one with the right caution, implication, and register.",
      variants: [
        ["Küçük bir örneklemde ilginç bir örüntü görüyorsun, ama kanıt henüz güçlü değil; sonucu abartmadan yaz.", "The pattern is worth exploring, but stronger evidence is needed.", "The result proves the theory.", "The sample is small, so the result is useless.", 0.74, 0.18, "weak", "overstates_or_dismisses"],
        ["Müşteri revizyonun daha iyi olduğunu ama hâlâ tamamlanmadığını söylüyor; ekip içi notu seç.", "The revision is an improvement, but further work is needed.", "The client is satisfied.", "The client says it is close but not there.", 0.72, 0.42, "weak_nonnative", "literal_summary"],
        ["Bir fikir ileride işe yarayabilir, ama şu an başka iş daha öncelikli; doğru aksiyonu seç.", "Keep the option open while focusing elsewhere.", "Start working on it immediately.", "Remove it from the plan.", 0.72, 0.14, "weak", "wrong_action"],
        ["Bir rapor, politikanın maliyetleri düşürdüğünü ama hizmet kalitesini zayıflattığını söylüyor; dengeyi doğru özetleyen cümleyi seç.", "Costs fell, but service quality suffered.", "The policy was successful.", "Service quality and cost were both reduced well.", 0.78, 0.16, "weak", "misreads_tradeoff"],
        ["Taslakta iyi bir fikir var, ama iddia fazla kesin duruyor; revizyon hedefini seç.", "Keep the idea but soften the claim.", "Delete the argument.", "Make the wording stronger.", 0.76, 0.12, "weak", "reverses_goal"],
        ["You are reviewing a proposal with unclear data. Choose the best feedback.", "The proposal is promising, but the evidence needs to be clearer.", "The proposal is bad because data unclear.", "The data is unclear, so nothing can be said.", 0.72, 0.28, "weak_nonnative", "overdismisses"],
        ["A speaker says, 'That is a separate issue.' What do they mean?", "It should not be mixed with the current point.", "It is not important at all.", "It is a problem from another person.", 0.74, 0.2, "weak", "wrong_implication"],
        ["You want to disagree with a senior colleague without sounding dismissive.", "I see the rationale, but I wonder if the timing is right.", "I disagree with your timing.", "Your timing is not correct.", 0.74, 0.3, "weak_nonnative", "too_direct"],
        ["A text says the model is elegant but hard to apply. Choose the best interpretation.", "It is conceptually attractive but practically difficult.", "It is beautiful and difficult.", "It cannot be used.", 0.74, 0.22, "weak", "overliteral_or_overabsolute"],
        ["You want to acknowledge a limitation in a presentation.", "This does not cover every case, but it captures the main trend.", "This is not perfect but okay.", "It does not include all, but trend is main.", 0.7, 0.34, "weak_nonnative", "imprecise"],
        ["A reviewer says, 'The claim is not wrong, but it needs qualification.' Choose the best response.", "Add a condition or limit to the claim.", "Correct the claim completely.", "Make the claim longer.", 0.76, 0.16, "weak", "wrong_revision"],
        ["Ekip hızlı çıkış yapabilir, ama bu güvenilirliği riske atıyor; önceliği doğru ifade et.", "Reliability should be protected even if progress is slower.", "Speed is more important than reliability.", "Reliability and speed are the same.", 0.78, 0.1, "weak", "reverses_priority"]
      ].map(naturalnessVariant)
    }
  ];

  expansionNaturalnessFamilies.forEach(addNaturalnessFamily);

  function normalizeVocabDistractors() {
    for (const item of content.items.concat(generated)) {
      if (item.type !== "vocab" || item.dynamic_distractors) continue;
      const key = item.options.find((option) => option.role === "key");
      const l1 = item.options.find((option) => option.role === "l1_trap");
      const dev = item.options.find((option) => option.role === "developmental_error");
      if (!key || !l1 || !dev) continue;
      item.answer = key.text;
      item.dynamic_distractors = true;
      item.distractor_pools = {
        easy_l1_trap: [l1.text],
        l1_trap: [l1.text],
        hard_l1_trap: [l1.text],
        easy_developmental_error: [dev.text],
        developmental_error: [dev.text],
        hard_developmental_error: [dev.text]
      };
    }
  }

  function normalizeLegacyFormats() {
    for (const item of content.items.concat(generated)) {
      if (!item.format) item.format = defaultFormatForType(item.type);
    }
  }

  content.items.push(...generated);
  normalizeLegacyFormats();
  normalizeVocabDistractors();
  content.pool_index = content.items.reduce((index, item) => {
    const boundary = item.boundary || "unknown";
    const type = item.format || item.type || "unknown";
    index[boundary] ||= {};
    index[boundary][type] ||= [];
    index[boundary][type].push(item.id);
    return index;
  }, {});
  content.generated_pool_summary = {
    generated_items: generated.length,
    total_items: content.items.length,
    boundaries: content.boundaries,
    note: "Generated placement pool: Oxford vocabulary with dynamic distractors plus grammar, phrase, discourse, and partial-credit pragmatic/naturalness families."
  };
  content.pool_version = "nektar_cefr_placement_pragmatic_naturalness_2026_05_14";
  content.generated_pool_loaded = true;
})();
