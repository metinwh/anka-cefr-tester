window.NEKTAR_PLACEMENT_CONTENT = {
  version: "ceiling_probe_v1",
  levels: ["A1", "A2", "B1", "B2", "C1"],
  boundaries: ["A1/A2", "A2/B1", "B1/B2", "B2/C1"],
  copy: {
    welcomeTitle: "K\u0131sa seviye tespiti",
    welcomeBody: "Yakla\u015f\u0131k iki dakika s\u00fcrer. Cevaplar yaln\u0131zca ba\u015flang\u0131\u00e7 seviyeni belirlemek i\u00e7in kullan\u0131l\u0131r.",
    startButton: "Ba\u015fla",
    notSure: "Bilmiyorum",
    resultHedge: "Bu test tan\u0131ma becerini \u00f6l\u00e7er. Konu\u015fma ve yazma ilk g\u00fcnlerde biraz daha d\u00fc\u015f\u00fck hissedebilir.",
    accept: "Bu seviyeden ba\u015fla",
    detailed: "Detayl\u0131 test yap",
    retry: "Tekrar dene",
    oxfordCue: "Oxford 3000/5000 kelime kontrol\u00fc"
  },
  items: [
    {
      id: "plc_a1a2_001",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["copula_be", "subject_verb_agreement"],
      skill_tags: ["be", "agreement", "turkish_zero_copula"],
      lexicon: ["brother", "home"],
      distractor_distance: "far",
      prompt: "My brother _____ at home now.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "is", role: "key" },
        { id: "o2", text: "be", role: "l1_trap" },
        { id: "o3", text: "are", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Singular third-person subjects take 'is' in this present be-verb sentence.",
      trap: {
        o2: "Turkish nominal predicates do not require an overt inflected copula in the same way English does; learners may under-mark the be-form.",
        o3: "A developmental agreement error: the learner has selected a be-form but has not matched it to the singular subject."
      },
      estimated_difficulty: 0.22,
      estimated_discrimination: 0.3,
      source_grounding: ["EGP_A1_be_present", "Turkish_L1_zero_copula"]
    },
    {
      id: "plc_a1a2_002",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["article", "a_an"],
      skill_tags: ["articles", "countable_nouns", "turkish_no_articles"],
      lexicon: ["umbrella"],
      distractor_distance: "far",
      prompt: "I have _____ umbrella in my bag.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "an", role: "key" },
        { id: "o2", text: "the", role: "l1_trap" },
        { id: "o3", text: "a", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Umbrella' begins with a vowel sound, so the indefinite article is 'an'.",
      trap: {
        o2: "Turkish has no article system, so learners often choose English articles by salience rather than definiteness.",
        o3: "A developmental phonology error: the learner knows an indefinite article is needed but has not applied the vowel-sound rule."
      },
      estimated_difficulty: 0.28,
      estimated_discrimination: 0.31,
      source_grounding: ["EGP_A1_articles", "Turkish_L1_article_absence"]
    },
    {
      id: "plc_a1a2_003",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["plural_after_number"],
      skill_tags: ["plural_s", "count_nouns", "turkish_number_singular"],
      lexicon: ["two", "brother"],
      distractor_distance: "far",
      prompt: "I have two _____.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "brothers", role: "key" },
        { id: "o2", text: "brother", role: "l1_trap" },
        { id: "o3", text: "brotheres", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "English count nouns usually take plural -s after numbers greater than one.",
      trap: {
        o2: "Turkish keeps nouns singular after numerals, so direct transfer produces 'two brother'.",
        o3: "A developmental overgeneralization of plural spelling."
      },
      estimated_difficulty: 0.26,
      estimated_discrimination: 0.32,
      source_grounding: ["EGP_A1_plural_nouns", "Turkish_L1_number_noun_transfer"]
    },
    {
      id: "plc_a1a2_004",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["simple_past_irregular"],
      skill_tags: ["past_simple", "irregular_verbs"],
      lexicon: ["yesterday", "home", "late"],
      distractor_distance: "far",
      prompt: "Yesterday, she _____ home late.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "went", role: "key" },
        { id: "o2", text: "go", role: "l1_trap" },
        { id: "o3", text: "goed", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Yesterday' requires past simple, and the past form of 'go' is 'went'.",
      trap: {
        o2: "Turkish tense marking does not require an auxiliary do-support system, so learners may leave the English verb uninflected.",
        o3: "A developmental overgeneralization of regular -ed to an irregular verb."
      },
      estimated_difficulty: 0.34,
      estimated_discrimination: 0.33,
      source_grounding: ["EGP_A2_past_simple_irregular", "Turkish_EFL_regularization_errors"]
    },
    {
      id: "plc_a1a2_005",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["comparative_short_adjective"],
      skill_tags: ["comparatives", "adjective_morphology"],
      lexicon: ["bag", "heavy"],
      distractor_distance: "medium",
      prompt: "This bag is _____ than mine.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "heavier", role: "key" },
        { id: "o2", text: "more heavy", role: "l1_trap" },
        { id: "o3", text: "heavyer", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Short adjectives normally form the comparative with -er, with spelling change from y to i.",
      trap: {
        o2: "Turkish uses 'daha' before adjectives for comparatives, so learners often overuse 'more + adjective'.",
        o3: "A developmental spelling error: the learner applies -er but misses the y-to-i change."
      },
      estimated_difficulty: 0.42,
      estimated_discrimination: 0.34,
      source_grounding: ["EGP_A2_comparatives", "Turkish_L1_daha_transfer"]
    },
    {
      id: "plc_a1a2_006",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["preposition_place"],
      skill_tags: ["prepositions", "place"],
      lexicon: ["keys", "table"],
      distractor_distance: "medium",
      prompt: "The keys are _____ the table.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "on", role: "key" },
        { id: "o2", text: "at", role: "l1_trap" },
        { id: "o3", text: "in", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "For contact with a surface, English uses 'on'.",
      trap: {
        o2: "Turkish locative marking covers several English prepositions, so learners often use a general place preposition.",
        o3: "A developmental category error between container and surface meanings."
      },
      estimated_difficulty: 0.36,
      estimated_discrimination: 0.32,
      source_grounding: ["METU_Turkish_EFL_preposition_errors", "EGP_A1_prepositions_place"]
    },
    {
      id: "plc_a1a2_007",
      boundary: "A1/A2",
      type: "function",
      format: "pragmatic_choice",
      scoring_style: "pragmatic_choice",
      focus: ["polite_request", "service_naturalness"],
      skill_tags: ["requests", "politeness", "naturalness"],
      lexicon: ["water", "cafe"],
      distractor_distance: "near",
      prompt: "You are at a cafe table. The waiter is near you, and you want water.",
      prompt_lang: "en",
      instruction_tr: "Bu durumda en do\u011fal ve uygun cevab\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "Can I have some water, please?", role: "key", credit: 1, naturalness: "best_fit" },
        { id: "o2", text: "Water, please.", role: "acceptable", credit: 0.8, naturalness: "acceptable" },
        { id: "o3", text: "I am want water please.", role: "weak_nonnative", credit: 0.25, naturalness: "weak_nonnative" }
      ],
      correctId: "o1",
      signal: "This item scores service-request naturalness: short real-life orders can be acceptable, while malformed request frames stay weak.",
      rationale: {
        o1: "Best controlled polite request.",
        o2: "Natural and acceptable in real service speech, but less complete as a placement signal.",
        o3: "The intent is clear, but the verb frame is nonnative."
      },
      estimated_difficulty: 0.3,
      estimated_discrimination: 0.3,
      source_grounding: ["CEFR_A1_service_requests", "Turkish_L1_pragmatic_directness"]
    },
    {
      id: "plc_a1a2_008",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["present_continuous_now"],
      skill_tags: ["present_continuous", "now_action"],
      lexicon: ["listen", "baby"],
      distractor_distance: "medium",
      prompt: "Listen. The baby _____.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "is crying", role: "key" },
        { id: "o2", text: "cries", role: "l1_trap" },
        { id: "o3", text: "is cry", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Listen' points to an action happening now, so present continuous is required.",
      trap: {
        o2: "Turkish present marking can cover habitual and current actions, so learners may choose simple present.",
        o3: "A developmental auxiliary error: the learner has selected 'is' but has not formed the -ing verb."
      },
      estimated_difficulty: 0.42,
      estimated_discrimination: 0.34,
      source_grounding: ["EGP_A2_present_continuous_now", "Turkish_L1_aspect_transfer"]
    },
    {
      id: "plc_a1a2_009",
      boundary: "A1/A2",
      type: "grammar",
      focus: ["gender_pronoun"],
      skill_tags: ["pronouns", "gender_reference"],
      lexicon: ["friend", "ayse"],
      distractor_distance: "far",
      prompt: "This is Ay\u015fe. _____ is my friend.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "She", role: "key" },
        { id: "o2", text: "He", role: "l1_trap" },
        { id: "o3", text: "It", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "English third-person pronouns mark gender for people.",
      trap: {
        o2: "Turkish 'o' is gender-neutral, so Turkish learners may not consistently mark he/she in English.",
        o3: "A developmental pronoun-category error, treating a person as a non-person referent."
      },
      estimated_difficulty: 0.24,
      estimated_discrimination: 0.29,
      source_grounding: ["EGP_A1_subject_pronouns", "Turkish_L1_gender_neutral_pronoun"]
    },
    {
      id: "plc_a1a2_010",
      boundary: "A1/A2",
      type: "vocab",
      focus: ["daily_action"],
      skill_tags: ["vocab_context", "daily_actions"],
      lexicon: ["window", "hot", "open"],
      distractor_distance: "far",
      prompt: "It is hot. Please _____ the window.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "open", role: "key" },
        { id: "o2", text: "close", role: "l1_trap" },
        { id: "o3", text: "clean", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "In this context, opening the window is the natural action when the room is hot.",
      trap: {
        o2: "Turkish learners sometimes anchor on the noun phrase rather than the situation and choose a familiar opposite action.",
        o3: "A developmental semantic error: the learner recognizes a verb that collocates with 'window' but not the intended situation."
      },
      estimated_difficulty: 0.25,
      estimated_discrimination: 0.28,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00650 open verb", "Oxford_3000_5000: oxford_A1_00171 close verb", "CEFR_A1_daily_actions"]
    },
    {
      id: "plc_a2b1_001",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["present_perfect_since"],
      skill_tags: ["present_perfect", "duration_marker", "stative_verbs"],
      lexicon: ["know", "since"],
      distractor_distance: "medium",
      prompt: "I _____ Mert since 2020.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "have known", role: "key" },
        { id: "o2", text: "knew", role: "l1_trap" },
        { id: "o3", text: "am knowing", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Since 2020' marks a state continuing from the past to now, so present perfect is needed.",
      trap: {
        o2: "Turkish lacks a dedicated present perfect form, so simple past is a common substitution.",
        o3: "A developmental stative-verb error: 'know' is not normally used in the continuous here."
      },
      estimated_difficulty: 0.48,
      estimated_discrimination: 0.36,
      source_grounding: ["EGP_B1_present_perfect_duration", "Bilkent_Turkish_EFL_present_perfect_errors"]
    },
    {
      id: "plc_a2b1_002",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["indirect_question_word_order"],
      skill_tags: ["indirect_questions", "word_order"],
      lexicon: ["station", "tell"],
      distractor_distance: "medium",
      prompt: "Can you tell me where _____?",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "the station is", role: "key" },
        { id: "o2", text: "is the station", role: "l1_trap" },
        { id: "o3", text: "the station be", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Indirect questions use statement word order: subject before verb.",
      trap: {
        o2: "Learners transfer direct-question order into an embedded question, a frequent Turkish EFL word-order problem.",
        o3: "A developmental be-form error in an embedded clause."
      },
      estimated_difficulty: 0.52,
      estimated_discrimination: 0.37,
      source_grounding: ["EGP_B1_indirect_questions", "Turkish_EFL_question_order_errors"]
    },
    {
      id: "plc_a2b1_003",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["first_conditional"],
      skill_tags: ["conditionals", "future_reference"],
      lexicon: ["rain", "home"],
      distractor_distance: "medium",
      prompt: "If it rains, we _____ at home.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "will stay", role: "key" },
        { id: "o2", text: "stay", role: "l1_trap" },
        { id: "o3", text: "would stay", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "A real future condition uses present simple in the if-clause and 'will' in the result clause.",
      trap: {
        o2: "Turkish conditional meaning can be carried without an English-style will auxiliary in the result clause.",
        o3: "A developmental conditional-mixing error, using the second conditional form for a real future condition."
      },
      estimated_difficulty: 0.5,
      estimated_discrimination: 0.34,
      source_grounding: ["EGP_B1_first_conditional", "Turkish_L1_conditional_transfer"]
    },
    {
      id: "plc_a2b1_004",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["zero_conditional"],
      skill_tags: ["conditionals", "general_truth"],
      lexicon: ["heat", "ice", "melt"],
      distractor_distance: "medium",
      prompt: "If you heat ice, it _____.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "melts", role: "key" },
        { id: "o2", text: "will melt", role: "l1_trap" },
        { id: "o3", text: "is melting", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "A general scientific truth uses present simple in both clauses.",
      trap: {
        o2: "Turkish learners may over-mark future meaning in English conditionals where English uses present simple.",
        o3: "A developmental aspect error: present continuous is not used for general truths."
      },
      estimated_difficulty: 0.46,
      estimated_discrimination: 0.33,
      source_grounding: ["EGP_B1_zero_conditional", "Turkish_EFL_conditional_errors"]
    },
    {
      id: "plc_a2b1_005",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["used_to"],
      skill_tags: ["past_habit", "used_to"],
      lexicon: ["child", "football"],
      distractor_distance: "medium",
      prompt: "I _____ play football every day when I was a child.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "used to", role: "key" },
        { id: "o2", text: "was playing", role: "l1_trap" },
        { id: "o3", text: "use to", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Used to' expresses a past habit that is no longer true.",
      trap: {
        o2: "Turkish learners may express past background or habit with a past progressive-like frame.",
        o3: "A developmental spelling/form error in the fixed expression 'used to'."
      },
      estimated_difficulty: 0.54,
      estimated_discrimination: 0.35,
      source_grounding: ["EGP_B1_used_to", "Turkish_EFL_past_habit_errors"]
    },
    {
      id: "plc_a2b1_006",
      boundary: "A2/B1",
      type: "grammar",
      focus: ["gerund_after_enjoy"],
      skill_tags: ["verb_patterns", "gerund"],
      lexicon: ["enjoy", "meet"],
      distractor_distance: "medium",
      prompt: "I enjoy _____ new people.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "meeting", role: "key" },
        { id: "o2", text: "to meet", role: "l1_trap" },
        { id: "o3", text: "meet", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Enjoy' is followed by an -ing form.",
      trap: {
        o2: "Turkish verbal nouns often map naturally to English infinitive-like forms, leading to 'enjoy to'.",
        o3: "A developmental bare-verb error after a verb that requires a gerund."
      },
      estimated_difficulty: 0.5,
      estimated_discrimination: 0.34,
      source_grounding: ["EGP_B1_gerund_after_verbs", "Turkish_EFL_verb_pattern_errors"]
    },
    {
      id: "plc_a2b1_007",
      boundary: "A2/B1",
      type: "collocation",
      focus: ["make_mistake"],
      skill_tags: ["collocation", "do_make"],
      lexicon: ["mistake", "make"],
      distractor_distance: "medium",
      prompt: "She _____ a mistake in the test.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "made", role: "key" },
        { id: "o2", text: "did", role: "l1_trap" },
        { id: "o3", text: "make", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The natural collocation is 'make a mistake', and the sentence is in the past.",
      trap: {
        o2: "Both 'do' and 'make' can translate to Turkish 'yapmak', causing collocation confusion.",
        o3: "A developmental tense error: the collocation is known but not marked for past time."
      },
      estimated_difficulty: 0.48,
      estimated_discrimination: 0.34,
      source_grounding: ["EVP_B1_make_mistake", "Turkish_L1_yapmak_do_make_confusion"]
    },
    {
      id: "plc_a2b1_008",
      boundary: "A2/B1",
      type: "phrasal_verb",
      focus: ["fill_in_form"],
      skill_tags: ["phrasal_verbs", "forms"],
      lexicon: ["form", "fill in"],
      distractor_distance: "medium",
      prompt: "Please _____ this form before Friday.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "fill in", role: "key" },
        { id: "o2", text: "write", role: "l1_trap" },
        { id: "o3", text: "fill", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The normal expression for completing a form is 'fill in a form'.",
      trap: {
        o2: "Turkish 'formu doldurmak' may lead learners toward a general writing verb rather than the English phrasal verb.",
        o3: "A developmental phrasal-verb error: the learner knows the base verb but omits the particle."
      },
      estimated_difficulty: 0.52,
      estimated_discrimination: 0.33,
      source_grounding: ["EVP_B1_fill_in", "Turkish_EFL_phrasal_verb_particle_errors"]
    },
    {
      id: "plc_a2b1_009",
      boundary: "A2/B1",
      type: "vocab",
      focus: ["lend_borrow_direction"],
      skill_tags: ["vocab_context", "verb_direction"],
      lexicon: ["lend", "borrow", "pen"],
      distractor_distance: "near",
      prompt: "You want to use your friend's pen for one minute.",
      prompt_lang: "en",
      instruction_tr: "Duruma en uygun c\u00fcmleyi se\u00e7in.",
      options: [
        { id: "o1", text: "Could I borrow your pen for a minute?", role: "key" },
        { id: "o2", text: "Could you borrow me your pen for a minute?", role: "l1_trap" },
        { id: "o3", text: "Could I lend your pen for a minute?", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The receiver borrows; the owner lends.",
      trap: {
        o2: "Turkish learners often collapse directionality when translating exchange verbs in context.",
        o3: "A developmental direction error: the learner knows the lend/borrow pair exists but assigns the action to the wrong person."
      },
      estimated_difficulty: 0.55,
      estimated_discrimination: 0.35,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00502 lend verb", "Oxford_3000_5000: oxford_A2_00114 borrow verb", "Turkish_EFL_directional_verb_confusion"]
    },
    {
      id: "plc_a2b1_010",
      boundary: "A2/B1",
      type: "function",
      focus: ["soft_advice"],
      skill_tags: ["modal_should", "advice"],
      lexicon: ["doctor", "cough"],
      distractor_distance: "medium",
      prompt: "Your friend has had a bad cough for two weeks.",
      prompt_lang: "en",
      instruction_tr: "En do\u011fal c\u00fcmleyi se\u00e7in.",
      options: [
        { id: "o1", text: "You should see a doctor.", role: "key" },
        { id: "o2", text: "You must to see a doctor.", role: "l1_trap" },
        { id: "o3", text: "You can seeing a doctor.", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Should' gives natural advice, followed by the base verb.",
      trap: {
        o2: "Turkish obligation forms can push learners toward 'must', and Turkish infinitive patterns can produce 'must to'.",
        o3: "A developmental modal-complement error: modals take base verb, not -ing."
      },
      estimated_difficulty: 0.5,
      estimated_discrimination: 0.34,
      source_grounding: ["CEFR_B1_giving_advice", "Turkish_EFL_modal_complement_errors"]
    },
    {
      id: "plc_b1b2_001",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["passive_past"],
      skill_tags: ["passive_voice", "past_simple"],
      lexicon: ["email", "yesterday"],
      distractor_distance: "medium",
      prompt: "The emails _____ yesterday.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "were sent", role: "key" },
        { id: "o2", text: "sent", role: "l1_trap" },
        { id: "o3", text: "were send", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Passive past requires be in the past plus past participle.",
      trap: {
        o2: "Turkish passive is marked inside the verb, so learners may omit English auxiliary 'be'.",
        o3: "A developmental passive error: the auxiliary is present but the participle form is not."
      },
      estimated_difficulty: 0.62,
      estimated_discrimination: 0.38,
      source_grounding: ["EGP_B2_passive_past", "Turkish_L1_passive_auxiliary_omission"]
    },
    {
      id: "plc_b1b2_002",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["second_conditional"],
      skill_tags: ["conditionals", "hypothetical"],
      lexicon: ["time", "study"],
      distractor_distance: "medium",
      prompt: "If I had more time, I _____ more.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "would study", role: "key" },
        { id: "o2", text: "study", role: "l1_trap" },
        { id: "o3", text: "will study", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "A hypothetical present condition uses would + base verb in the result clause.",
      trap: {
        o2: "Turkish conditional marking can carry the hypothetical meaning without an English modal auxiliary.",
        o3: "A developmental conditional error using real future form for hypothetical meaning."
      },
      estimated_difficulty: 0.6,
      estimated_discrimination: 0.36,
      source_grounding: ["EGP_B2_second_conditional", "Turkish_EFL_conditional_transfer"]
    },
    {
      id: "plc_b1b2_003",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["third_conditional"],
      skill_tags: ["conditionals", "past_unreal"],
      lexicon: ["leave", "train"],
      distractor_distance: "near",
      prompt: "If we had left earlier, we _____ the train.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "would have caught", role: "key" },
        { id: "o2", text: "caught", role: "l1_trap" },
        { id: "o3", text: "would catch", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Unreal past conditions use would have + past participle in the result clause.",
      trap: {
        o2: "Turkish can express counterfactual meaning with suffixes and context, so learners may under-mark the English perfect modal form.",
        o3: "A developmental error mixing second conditional result form with a third conditional if-clause."
      },
      estimated_difficulty: 0.68,
      estimated_discrimination: 0.39,
      source_grounding: ["EGP_B2_third_conditional", "Turkish_EFL_counterfactual_errors"]
    },
    {
      id: "plc_b1b2_004",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["relative_whose"],
      skill_tags: ["relative_clauses", "possession"],
      lexicon: ["woman", "car", "stolen"],
      distractor_distance: "near",
      prompt: "The woman _____ car was stolen called the police.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "whose", role: "key" },
        { id: "o2", text: "her", role: "l1_trap" },
        { id: "o3", text: "who", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Whose' introduces possession in a relative clause.",
      trap: {
        o2: "Turkish genitive possession can be expressed without an English relative pronoun, prompting a possessive adjective transfer.",
        o3: "A developmental relative-pronoun error: 'who' marks people but not possession."
      },
      estimated_difficulty: 0.66,
      estimated_discrimination: 0.38,
      source_grounding: ["EGP_B2_relative_whose", "Turkish_L1_possessive_transfer"]
    },
    {
      id: "plc_b1b2_005",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["reported_speech_backshift"],
      skill_tags: ["reported_speech", "tense_backshift"],
      lexicon: ["busy", "said"],
      distractor_distance: "medium",
      prompt: "He said he _____ busy.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "was", role: "key" },
        { id: "o2", text: "is", role: "l1_trap" },
        { id: "o3", text: "be", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Reported speech after a past reporting verb usually backshifts present to past.",
      trap: {
        o2: "Turkish reported speech does not require the same tense backshift pattern, so learners often keep the original tense.",
        o3: "A developmental be-form error."
      },
      estimated_difficulty: 0.6,
      estimated_discrimination: 0.36,
      source_grounding: ["EGP_B2_reported_speech", "Turkish_EFL_tense_backshift_errors"]
    },
    {
      id: "plc_b1b2_006",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["avoid_gerund"],
      skill_tags: ["verb_patterns", "gerund"],
      lexicon: ["avoid", "mistake"],
      distractor_distance: "near",
      prompt: "You should avoid _____ the same mistake again.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "making", role: "key" },
        { id: "o2", text: "to make", role: "l1_trap" },
        { id: "o3", text: "make", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Avoid' is followed by an -ing form.",
      trap: {
        o2: "Turkish infinitive-like complements can encourage 'to + verb' after English verbs that require gerunds.",
        o3: "A developmental bare-verb error after a verb pattern requiring -ing."
      },
      estimated_difficulty: 0.64,
      estimated_discrimination: 0.37,
      source_grounding: ["EGP_B2_gerund_after_avoid", "Turkish_EFL_verb_pattern_errors"]
    },
    {
      id: "plc_b1b2_007",
      boundary: "B1/B2",
      type: "grammar",
      focus: ["dependent_preposition_accuse"],
      skill_tags: ["dependent_prepositions", "abstract_verbs"],
      lexicon: ["accuse", "lying"],
      distractor_distance: "near",
      prompt: "They accused him _____ lying.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "of", role: "key" },
        { id: "o2", text: "with", role: "l1_trap" },
        { id: "o3", text: "for", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The verb 'accuse' is followed by 'of'.",
      trap: {
        o2: "Turkish case and postposition patterns do not map one-to-one to English dependent prepositions, causing transfer errors.",
        o3: "A developmental overgeneralization of common reason/cause preposition 'for'."
      },
      estimated_difficulty: 0.7,
      estimated_discrimination: 0.39,
      source_grounding: ["METU_Turkish_EFL_preposition_errors", "EGP_B2_dependent_prepositions"]
    },
    {
      id: "plc_b1b2_008",
      boundary: "B1/B2",
      type: "collocation",
      focus: ["pose_problem"],
      skill_tags: ["collocation", "academic_verbs"],
      lexicon: ["policy", "problem", "pose"],
      distractor_distance: "near",
      prompt: "The new policy _____ a serious problem.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "poses", role: "key" },
        { id: "o2", text: "makes", role: "l1_trap" },
        { id: "o3", text: "does", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "In formal English, problems, risks, or challenges are often 'posed'.",
      trap: {
        o2: "Turkish 'yapmak' can push learners toward 'make' in abstract collocations.",
        o3: "A developmental do/make overgeneralization without recognizing the academic collocation."
      },
      estimated_difficulty: 0.72,
      estimated_discrimination: 0.4,
      source_grounding: ["OPAL_pose_problem", "Turkish_L1_yapmak_do_make_confusion"]
    },
    {
      id: "plc_b1b2_009",
      boundary: "B1/B2",
      type: "function",
      focus: ["formal_request"],
      skill_tags: ["formal_email", "polite_request"],
      lexicon: ["report", "send"],
      distractor_distance: "medium",
      prompt: "You are writing a formal email to an external colleague you do not know well, and you need them to send the report before Friday.",
      prompt_lang: "en",
      instruction_tr: "En do\u011fal c\u00fcmleyi se\u00e7in.",
      options: [
        { id: "o1", text: "I would appreciate it if you could send the report.", role: "key" },
        { id: "o2", text: "Send me the report before Friday.", role: "l1_trap" },
        { id: "o3", text: "I want that you send the report.", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "A formal request uses a softened conditional structure.",
      trap: {
        o2: "A bare imperative is too abrupt for a formal email to an external colleague.",
        o3: "A developmental complement-clause error after 'want'."
      },
      estimated_difficulty: 0.62,
      estimated_discrimination: 0.36,
      source_grounding: ["CEFR_B2_formal_requests", "Turkish_L1_pragmatic_directness"]
    },
    {
      id: "plc_b1b2_010",
      boundary: "B1/B2",
      type: "vocab",
      focus: ["support_claim"],
      skill_tags: ["academic_vocabulary", "argumentation"],
      lexicon: ["evidence", "support", "claim"],
      distractor_distance: "near",
      prompt: "The evidence does not _____ his claim.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "support", role: "key" },
        { id: "o2", text: "carry", role: "l1_trap" },
        { id: "o3", text: "explain", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Evidence supports a claim when it gives reasons to believe it.",
      trap: {
        o2: "Turkish argument expressions can encourage a physical-transfer verb where English uses an abstract support verb.",
        o3: "A developmental semantic error: explaining a claim is not the same as supporting it."
      },
      estimated_difficulty: 0.66,
      estimated_discrimination: 0.38,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00876 support verb", "Oxford_3000_5000: oxford_B1_00129 claim noun", "OPAL_argumentation_verbs"]
    },
    {
      id: "plc_b2c1_001",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["modal_perfect_deduction"],
      skill_tags: ["modal_perfect", "deduction"],
      lexicon: ["forgotten", "lights"],
      distractor_distance: "near",
      prompt: "She _____ forgotten; the lights are still on.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "can't have", role: "key" },
        { id: "o2", text: "mustn't have", role: "l1_trap" },
        { id: "o3", text: "doesn't have", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Can't have + past participle' expresses a negative deduction about the past.",
      trap: {
        o2: "Turkish modal meanings do not map cleanly to English modal-perfect forms, so prohibition and deduction are often confused.",
        o3: "A developmental error using present auxiliary structure instead of modal perfect."
      },
      estimated_difficulty: 0.78,
      estimated_discrimination: 0.42,
      source_grounding: ["EGP_C1_modal_perfect_deduction", "Turkish_EFL_modal_transfer"]
    },
    {
      id: "plc_b2c1_002",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["not_only_inversion"],
      skill_tags: ["inversion", "emphasis"],
      lexicon: ["late", "files"],
      distractor_distance: "near",
      prompt: "Not only _____ late, but he also forgot the files.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "was he", role: "key" },
        { id: "o2", text: "he was", role: "l1_trap" },
        { id: "o3", text: "did he be", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "Fronted negative or restrictive expressions such as 'not only' trigger inversion.",
      trap: {
        o2: "Turkish does not require auxiliary inversion after fronted emphasis, so learners keep normal statement order.",
        o3: "A developmental do-support error with the verb 'be'."
      },
      estimated_difficulty: 0.82,
      estimated_discrimination: 0.43,
      source_grounding: ["EGP_C1_negative_inversion", "Turkish_L1_word_order_transfer"]
    },
    {
      id: "plc_b2c1_003",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["what_cleft"],
      skill_tags: ["cleft_sentence", "focus"],
      lexicon: ["need", "time"],
      distractor_distance: "near",
      prompt: "What I need _____ more time.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "is", role: "key" },
        { id: "o2", text: "it is", role: "l1_trap" },
        { id: "o3", text: "are", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The whole 'what' clause functions as a singular subject, so the verb is 'is'.",
      trap: {
        o2: "Turkish focus structures can lead learners to add an extra dummy subject where English cleft syntax does not need one.",
        o3: "A developmental agreement error, matching the verb to the complement 'time' rather than the clause subject."
      },
      estimated_difficulty: 0.76,
      estimated_discrimination: 0.4,
      source_grounding: ["EGP_C1_cleft_sentences", "Turkish_L1_focus_structure_transfer"]
    },
    {
      id: "plc_b2c1_004",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["subjunctive_formal"],
      skill_tags: ["subjunctive", "formal_grammar"],
      lexicon: ["essential", "time"],
      distractor_distance: "near",
      prompt: "It is essential that he _____ on time.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "be", role: "key" },
        { id: "o2", text: "is", role: "l1_trap" },
        { id: "o3", text: "will be", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "After formal expressions such as 'it is essential that', the mandative subjunctive uses the base verb.",
      trap: {
        o2: "Turkish does not have an equivalent English subjunctive agreement contrast, so learners default to normal present agreement.",
        o3: "A developmental future-marking error after a demand or requirement."
      },
      estimated_difficulty: 0.86,
      estimated_discrimination: 0.42,
      source_grounding: ["EGP_C1_mandative_subjunctive", "Turkish_EFL_subjunctive_absence"]
    },
    {
      id: "plc_b2c1_005",
      boundary: "B2/C1",
      type: "collocation",
      focus: ["make_decision"],
      skill_tags: ["deep_collocation", "do_make"],
      lexicon: ["decision", "make"],
      distractor_distance: "near",
      prompt: "We need to _____ a decision soon.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "make", role: "key" },
        { id: "o2", text: "do", role: "l1_trap" },
        { id: "o3", text: "take", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The natural collocation is 'make a decision'.",
      trap: {
        o2: "Both 'do' and 'make' often translate to Turkish 'yapmak', causing persistent L1-based collocation errors.",
        o3: "A developmental near-collocation error influenced by phrases like 'take action' or 'take a step'."
      },
      estimated_difficulty: 0.74,
      estimated_discrimination: 0.39,
      source_grounding: ["EVP_B2_make_decision", "Turkish_L1_yapmak_do_make_confusion"]
    },
    {
      id: "plc_b2c1_006",
      boundary: "B2/C1",
      type: "phrasal_verb",
      focus: ["keep_at_it"],
      skill_tags: ["idiomatic_phrasal_verb", "persistence"],
      lexicon: ["keep at it", "give up"],
      distractor_distance: "near",
      prompt: "Don't give up. Keep _____ it.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "at", role: "key" },
        { id: "o2", text: "on", role: "l1_trap" },
        { id: "o3", text: "in", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Keep at it' means continue trying.",
      trap: {
        o2: "Turkish learners may map continuation meaning to the more transparent English particle 'on'.",
        o3: "A developmental particle-selection error in an idiomatic phrasal verb."
      },
      estimated_difficulty: 0.78,
      estimated_discrimination: 0.4,
      source_grounding: ["EVP_C1_keep_at_it", "Turkish_EFL_phrasal_verb_particle_errors"]
    },
    {
      id: "plc_b2c1_007",
      boundary: "B2/C1",
      type: "idiom",
      focus: ["keep_an_eye_on"],
      skill_tags: ["idiom", "polysemy_keep"],
      lexicon: ["keep", "eye", "bag"],
      distractor_distance: "near",
      prompt: "Can you keep an eye _____ my bag?",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "on", role: "key" },
        { id: "o2", text: "to", role: "l1_trap" },
        { id: "o3", text: "at", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The idiom is 'keep an eye on' something, meaning watch it.",
      trap: {
        o2: "Turkish 'g\u00f6z kulak olmak' can push learners toward a dative-like 'to' relation.",
        o3: "A developmental preposition choice based on literal 'look at'."
      },
      estimated_difficulty: 0.8,
      estimated_discrimination: 0.42,
      source_grounding: ["EVP_C1_keep_an_eye_on", "METU_Turkish_EFL_preposition_errors"]
    },
    {
      id: "plc_b2c1_008",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["should_have_reproach"],
      skill_tags: ["modal_perfect", "past_regret"],
      lexicon: ["earlier", "late"],
      distractor_distance: "near",
      prompt: "You _____ told me earlier; now it is too late.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "should have", role: "key" },
        { id: "o2", text: "must have", role: "l1_trap" },
        { id: "o3", text: "should", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Should have + past participle' expresses a past action that was expected but did not happen.",
      trap: {
        o2: "Turkish necessity markers can blur obligation, certainty, and reproach in English modal-perfect choices.",
        o3: "A developmental error missing the perfect auxiliary for past reference."
      },
      estimated_difficulty: 0.78,
      estimated_discrimination: 0.41,
      source_grounding: ["EGP_C1_modal_perfect_regret", "Turkish_EFL_modal_transfer"]
    },
    {
      id: "plc_b2c1_009",
      boundary: "B2/C1",
      type: "grammar",
      focus: ["hardly_inversion"],
      skill_tags: ["inversion", "sequence"],
      lexicon: ["arrive", "phone"],
      distractor_distance: "near",
      prompt: "Hardly _____ when the phone rang.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "had I arrived", role: "key" },
        { id: "o2", text: "I had arrived", role: "l1_trap" },
        { id: "o3", text: "did I arrive", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Hardly' at the front triggers inversion with past perfect in this sequence structure.",
      trap: {
        o2: "Turkish fronting does not trigger English auxiliary inversion, so learners keep statement order.",
        o3: "A developmental inversion error using do-support instead of the required perfect auxiliary."
      },
      estimated_difficulty: 0.88,
      estimated_discrimination: 0.43,
      source_grounding: ["EGP_C1_hardly_inversion", "Turkish_L1_word_order_transfer"]
    },
    {
      id: "plc_b2c1_010",
      boundary: "B2/C1",
      type: "idiom",
      focus: ["grain_of_salt"],
      skill_tags: ["idiom", "stance"],
      lexicon: ["claim", "evidence"],
      distractor_distance: "near",
      prompt: "The claim sounds impressive, but I would take it _____.",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmleyi en do\u011fal \u015fekilde tamamlayan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "with a grain of salt", role: "key" },
        { id: "o2", text: "with salt", role: "l1_trap" },
        { id: "o3", text: "by a grain", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Take it with a grain of salt' means treat the claim skeptically.",
      trap: {
        o2: "A direct lexical translation can preserve only the concrete noun 'salt' and lose the idiomatic frame.",
        o3: "A developmental idiom-shape error where the learner recognizes one lexical element but not the fixed expression."
      },
      estimated_difficulty: 0.86,
      estimated_discrimination: 0.42,
      source_grounding: ["EVP_C1_idiom_grain_of_salt", "Turkish_EFL_idiom_literal_transfer"]
    },
    {
      id: "plc_a1a2_011",
      boundary: "A1/A2",
      type: "vocab",
      focus: ["hear_listen"],
      skill_tags: ["basic_vocabulary", "sense_discrimination", "perception_verbs"],
      lexicon: ["hear", "listen", "music"],
      distractor_distance: "medium",
      prompt: "The music is very loud. I can _____ it from my room.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "hear", role: "key" },
        { id: "o2", text: "listen", role: "l1_trap" },
        { id: "o3", text: "watch", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Hear' means sound reaches you without effort; 'listen' means paying attention on purpose.",
      trap: {
        o2: "Turkish learners often overuse the intentional listening verb when English needs passive perception.",
        o3: "A developmental modality error, choosing a visual-perception verb for sound."
      },
      estimated_difficulty: 0.28,
      estimated_discrimination: 0.3,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00412 hear verb", "Oxford_3000_5000: oxford_A1_00513 listen verb"]
    },
    {
      id: "plc_a1a2_012",
      boundary: "A1/A2",
      type: "vocab",
      focus: ["meet_know"],
      skill_tags: ["basic_vocabulary", "social_verbs", "turkish_tanimak_transfer"],
      lexicon: ["meet", "know", "teacher"],
      distractor_distance: "medium",
      prompt: "This is my first day at school. I will _____ my new teacher today.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "meet", role: "key" },
        { id: "o2", text: "know", role: "l1_trap" },
        { id: "o3", text: "see", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Meet' is used when you encounter someone for the first time.",
      trap: {
        o2: "Turkish 'tan\u0131mak' can push learners toward 'know' where English needs first-meeting meaning.",
        o3: "A developmental broad-verb choice: seeing someone is not the same as meeting them."
      },
      estimated_difficulty: 0.32,
      estimated_discrimination: 0.31,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00549 meet verb", "Oxford_3000_5000: oxford_A1_00483 know verb", "Turkish_L1_tanimak_transfer"]
    },
    {
      id: "plc_a1a2_013",
      boundary: "A1/A2",
      type: "vocab",
      focus: ["bring_take_direction"],
      skill_tags: ["basic_vocabulary", "verb_direction", "turkish_getir_gotur"],
      lexicon: ["bring", "take", "notebook"],
      distractor_distance: "medium",
      prompt: "Please _____ your notebook to class tomorrow.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "bring", role: "key" },
        { id: "o2", text: "take", role: "l1_trap" },
        { id: "o3", text: "carry", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "From the teacher's point of view, the notebook moves toward the class, so 'bring' is natural.",
      trap: {
        o2: "Direction verbs are frequently transferred from Turkish viewpoint choices, causing bring/take confusion.",
        o3: "A developmental broad-verb error: carrying is physical movement, not the requested direction."
      },
      estimated_difficulty: 0.34,
      estimated_discrimination: 0.32,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00119 bring verb", "Oxford_3000_5000: oxford_A1_00896 take verb", "Turkish_EFL_directional_verb_confusion"]
    },
    {
      id: "plc_a1a2_014",
      boundary: "A1/A2",
      type: "collocation",
      focus: ["take_photo"],
      skill_tags: ["basic_collocation", "do_make_take"],
      lexicon: ["take", "photo"],
      distractor_distance: "medium",
      prompt: "Can you _____ a photo of us?",
      prompt_lang: "en",
      instruction_tr: "C\u00fcmlede en do\u011fal kullan\u0131lan se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "take", role: "key" },
        { id: "o2", text: "make", role: "l1_trap" },
        { id: "o3", text: "do", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "The natural English collocation is 'take a photo'.",
      trap: {
        o2: "Turkish 'foto\u011fraf \u00e7ekmek' can invite a production verb, but English uses 'take'.",
        o3: "A developmental do/make/take overgeneralization."
      },
      estimated_difficulty: 0.36,
      estimated_discrimination: 0.32,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00896 take verb", "Oxford_3000_5000: oxford_A1_00699 photo noun", "Turkish_L1_collocation_transfer"]
    },
    {
      id: "plc_a2b1_011",
      boundary: "A2/B1",
      type: "vocab",
      focus: ["miss_transport"],
      skill_tags: ["vocab_context", "polysemy_miss", "transport"],
      lexicon: ["miss", "bus"],
      distractor_distance: "medium",
      prompt: "I left home late, so I _____ the bus.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "missed", role: "key" },
        { id: "o2", text: "lost", role: "l1_trap" },
        { id: "o3", text: "forgot", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "When you are too late for transport, English says you 'miss' it.",
      trap: {
        o2: "Turkish 'ka\u00e7\u0131rmak' can push learners toward a loss meaning instead of the transport collocation.",
        o3: "A developmental semantic error: forgetting is memory failure, not arriving too late."
      },
      estimated_difficulty: 0.46,
      estimated_discrimination: 0.34,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00560 miss verb", "Turkish_L1_kacirmak_polysemy"]
    },
    {
      id: "plc_a2b1_012",
      boundary: "A2/B1",
      type: "vocab",
      focus: ["attend_join_enter"],
      skill_tags: ["vocab_context", "event_verbs", "turkish_katilmak_transfer"],
      lexicon: ["attend", "join", "meeting"],
      distractor_distance: "near",
      prompt: "She couldn't _____ the meeting because she was ill.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "attend", role: "key" },
        { id: "o2", text: "join", role: "l1_trap" },
        { id: "o3", text: "enter", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Attend a meeting' means be present at the event.",
      trap: {
        o2: "Turkish 'kat\u0131lmak' maps to both attend and join, but formal event attendance normally takes 'attend'.",
        o3: "A developmental broad-place verb error: entering a room is not the same as attending an event."
      },
      estimated_difficulty: 0.5,
      estimated_discrimination: 0.35,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00066 attend verb", "Oxford_3000_5000: oxford_A1_00471 join verb", "Turkish_L1_katilmak_transfer"]
    },
    {
      id: "plc_a2b1_013",
      boundary: "A2/B1",
      type: "vocab",
      focus: ["embarrassed_ashamed_shy"],
      skill_tags: ["vocab_context", "emotion_words", "near_synonyms"],
      lexicon: ["embarrassed", "ashamed", "shy"],
      distractor_distance: "near",
      prompt: "I forgot his name and felt really _____.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "embarrassed", role: "key" },
        { id: "o2", text: "ashamed", role: "l1_trap" },
        { id: "o3", text: "shy", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Embarrassed' fits a socially awkward moment; 'ashamed' is stronger and more moral.",
      trap: {
        o2: "Turkish 'utanmak' often covers both embarrassed and ashamed, so learners may overselect the stronger word.",
        o3: "A developmental near-word error: shy is a personality or social tendency, not the feeling caused by this event."
      },
      estimated_difficulty: 0.54,
      estimated_discrimination: 0.36,
      source_grounding: ["Oxford_3000_5000: oxford_B1_00253 embarrassed adjective", "Oxford_3000_5000: oxford_B2_00085 ashamed adjective", "Turkish_L1_utanmak_polysemy"]
    },
    {
      id: "plc_a2b1_014",
      boundary: "A2/B1",
      type: "vocab",
      focus: ["avoid_escape_protect"],
      skill_tags: ["vocab_context", "verb_patterns", "near_synonyms"],
      lexicon: ["avoid", "escape", "protect"],
      distractor_distance: "near",
      prompt: "Take an umbrella to _____ getting wet.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "avoid", role: "key" },
        { id: "o2", text: "escape", role: "l1_trap" },
        { id: "o3", text: "protect", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Avoid + -ing' means prevent an unwanted situation from happening to you.",
      trap: {
        o2: "Turkish can express getting away from an unwanted situation with a verb like 'ka\u00e7mak', but English does not use 'escape getting wet' here.",
        o3: "A developmental semantic-pattern error: 'protect' normally needs an object such as 'yourself'."
      },
      estimated_difficulty: 0.56,
      estimated_discrimination: 0.35,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00075 avoid verb", "EGP_B1_avoid_gerund"]
    },
    {
      id: "plc_b1b2_011",
      boundary: "B1/B2",
      type: "vocab",
      focus: ["affect_effect"],
      skill_tags: ["academic_vocabulary", "word_family", "verb_noun_confusion"],
      lexicon: ["affect", "effect", "rules"],
      distractor_distance: "near",
      prompt: "The new rules will _____ everyone in the company.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "affect", role: "key" },
        { id: "o2", text: "effect", role: "l1_trap" },
        { id: "o3", text: "impact on", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Affect' is the verb meaning influence or change something.",
      trap: {
        o2: "Learners often transfer a single Turkish meaning into the English affect/effect word family and choose the noun-like form.",
        o3: "A developmental pattern error: 'impact' as a verb does not take 'on' in this sentence frame."
      },
      estimated_difficulty: 0.62,
      estimated_discrimination: 0.37,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00017 affect verb", "Oxford_3000_5000: oxford_A2_00279 effect noun", "OPAL_academic_word_families"]
    },
    {
      id: "plc_b1b2_012",
      boundary: "B1/B2",
      type: "vocab",
      focus: ["recover_return_collect"],
      skill_tags: ["vocab_context", "health_verbs", "near_synonyms"],
      lexicon: ["recover", "illness"],
      distractor_distance: "near",
      prompt: "It took him months to _____ from the illness.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "recover", role: "key" },
        { id: "o2", text: "collect", role: "l1_trap" },
        { id: "o3", text: "return", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Recover from an illness' means become healthy again.",
      trap: {
        o2: "Turkish 'toparlanmak' can be translated as collect oneself in some contexts, but illness takes 'recover'.",
        o3: "A developmental broad-meaning error: returning is coming back to a place or state, but the health collocation is recover from."
      },
      estimated_difficulty: 0.6,
      estimated_discrimination: 0.36,
      source_grounding: ["Oxford_3000_5000: oxford_B2_01153 recover verb", "Oxford_3000_5000: oxford_A1_00771 return verb", "Turkish_L1_toparlanmak_polysemy"]
    },
    {
      id: "plc_b1b2_013",
      boundary: "B1/B2",
      type: "vocab",
      focus: ["convincing_convinced"],
      skill_tags: ["vocab_context", "adjective_forms", "ed_ing_adjectives"],
      lexicon: ["convincing", "convinced"],
      distractor_distance: "near",
      prompt: "Her explanation was clear, but not very _____.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "convincing", role: "key" },
        { id: "o2", text: "persuaded", role: "l1_trap" },
        { id: "o3", text: "convinced", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "An explanation can be convincing; a person is convinced.",
      trap: {
        o2: "Turkish 'ikna edici' can push learners toward another persuasion verb form that does not modify 'explanation' naturally here.",
        o3: "A developmental -ed/-ing adjective error."
      },
      estimated_difficulty: 0.66,
      estimated_discrimination: 0.38,
      source_grounding: ["Oxford_3000_5000: oxford_B2_00305 convincing adjective", "EGP_B2_ed_ing_adjectives"]
    },
    {
      id: "plc_b1b2_014",
      boundary: "B1/B2",
      type: "vocab",
      focus: ["issue_subject_problem"],
      skill_tags: ["academic_vocabulary", "near_synonyms", "abstract_nouns"],
      lexicon: ["issue", "subject", "problem"],
      distractor_distance: "near",
      prompt: "Data privacy is an important _____ for schools.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "issue", role: "key" },
        { id: "o2", text: "subject", role: "l1_trap" },
        { id: "o3", text: "problem", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Issue' means an important topic or matter for discussion.",
      trap: {
        o2: "Turkish 'konu' can map to subject, topic, or issue; this formal context needs 'issue'.",
        o3: "A developmental near-word error: an issue may be important without necessarily being a concrete problem."
      },
      estimated_difficulty: 0.64,
      estimated_discrimination: 0.37,
      source_grounding: ["Oxford_3000_5000: oxford_B1_00423 issue noun", "OPAL_academic_nouns", "Turkish_L1_konu_polysemy"]
    },
    {
      id: "plc_b2c1_011",
      boundary: "B2/C1",
      type: "vocab",
      focus: ["subtle_difference"],
      skill_tags: ["advanced_vocabulary", "near_synonyms", "polysemy"],
      lexicon: ["subtle", "difference"],
      distractor_distance: "near",
      prompt: "There is a _____ difference between the two proposals.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "subtle", role: "key" },
        { id: "o2", text: "thin", role: "l1_trap" },
        { id: "o3", text: "weak", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Subtle' means small and not immediately obvious, which fits a fine difference.",
      trap: {
        o2: "Turkish 'ince fark' can be translated literally as thin difference, but English uses 'subtle' or 'slight'.",
        o3: "A developmental approximation: weak means lacking strength, not hard to notice."
      },
      estimated_difficulty: 0.74,
      estimated_discrimination: 0.4,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01221 subtle adjective", "Turkish_L1_ince_fark_literal_transfer"]
    },
    {
      id: "plc_b2c1_012",
      boundary: "B2/C1",
      type: "vocab",
      focus: ["undermine_argument"],
      skill_tags: ["advanced_vocabulary", "argumentation", "figurative_verbs"],
      lexicon: ["undermine", "argument", "evidence"],
      distractor_distance: "near",
      prompt: "The new evidence may _____ his argument.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "undermine", role: "key" },
        { id: "o2", text: "dig", role: "l1_trap" },
        { id: "o3", text: "understate", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Undermine an argument' means make it weaker or less credible.",
      trap: {
        o2: "A literal transfer of the physical image behind Turkish expressions like 'alt\u0131n\u0131 oymak' produces a concrete verb instead of the English figurative verb.",
        o3: "A developmental prefix-family error: understate means present as less important, not weaken an argument."
      },
      estimated_difficulty: 0.8,
      estimated_discrimination: 0.42,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01331 undermine verb", "OPAL_argumentation_verbs"]
    },
    {
      id: "plc_b2c1_013",
      boundary: "B2/C1",
      type: "vocab",
      focus: ["reluctant_unwilling"],
      skill_tags: ["advanced_vocabulary", "adjective_choice", "near_synonyms"],
      lexicon: ["reluctant", "agree"],
      distractor_distance: "near",
      prompt: "She was _____ to agree at first.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "reluctant", role: "key" },
        { id: "o2", text: "unwillingly", role: "l1_trap" },
        { id: "o3", text: "slow", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Reluctant' means not really wanting to do something.",
      trap: {
        o2: "Turkish learners may choose the adverb form because the idea is tied to agreeing, but this sentence needs an adjective after 'was'.",
        o3: "A developmental meaning error: slow describes speed, not attitude."
      },
      estimated_difficulty: 0.76,
      estimated_discrimination: 0.4,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01049 reluctant adjective", "EGP_B2_adjective_after_be"]
    },
    {
      id: "plc_b2c1_014",
      boundary: "B2/C1",
      type: "vocab",
      focus: ["foster_innovation"],
      skill_tags: ["advanced_vocabulary", "academic_collocation", "abstract_verbs"],
      lexicon: ["foster", "innovation"],
      distractor_distance: "near",
      prompt: "The policy is intended to _____ innovation.",
      prompt_lang: "en",
      instruction_tr: "Anlama en uygun se\u00e7ene\u011fi se\u00e7in.",
      options: [
        { id: "o1", text: "foster", role: "key" },
        { id: "o2", text: "feed", role: "l1_trap" },
        { id: "o3", text: "force", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Foster innovation' means encourage it to develop.",
      trap: {
        o2: "Turkish 'beslemek' can be used figuratively, but English academic style uses 'foster' for encouraging development.",
        o3: "A developmental semantic error: forcing innovation contradicts the intended supportive meaning."
      },
      estimated_difficulty: 0.82,
      estimated_discrimination: 0.42,
      source_grounding: ["Oxford_3000_5000: oxford_C1_00554 foster verb", "OPAL_academic_collocations"]
    },
            {
      id: "plc_a1a2_101",
      boundary: "A1/A2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_bring"],
      skill_tags: ["oxford_3000","meaning_recognition","verb_direction"],
      lexicon: ["bring"],
      distractor_distance: "medium",
      prompt: "getirmek",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "bring", role: "key" },
        { id: "o2", text: "take", role: "l1_trap" },
        { id: "o3", text: "carry", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Bring' means getirmek: move something toward the speaker or target place.",
      trap: {
        o2: "Bring/take viewpoint confusion is common.",
        o3: "Carry is related movement, but it does not encode direction toward the target."
      },
      estimated_difficulty: 0.22,
      estimated_discrimination: 0.3,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00119 bring verb"]
    },
            {
      id: "plc_a1a2_102",
      boundary: "A1/A2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_hear"],
      skill_tags: ["oxford_3000","meaning_recognition","perception_verbs"],
      lexicon: ["hear"],
      distractor_distance: "medium",
      prompt: "duymak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "hear", role: "key" },
        { id: "o2", text: "listen", role: "l1_trap" },
        { id: "o3", text: "watch", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Hear' means duymak, passive sound perception.",
      trap: {
        o2: "Listen is intentional listening, not passive hearing.",
        o3: "Watch belongs to visual perception."
      },
      estimated_difficulty: 0.2,
      estimated_discrimination: 0.29,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00412 hear verb"]
    },
            {
      id: "plc_a1a2_103",
      boundary: "A1/A2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_meet"],
      skill_tags: ["oxford_3000","meaning_recognition","social_verbs"],
      lexicon: ["meet"],
      distractor_distance: "medium",
      prompt: "tan\u0131\u015fmak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "meet", role: "key" },
        { id: "o2", text: "know", role: "l1_trap" },
        { id: "o3", text: "see", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Meet' means tan\u0131\u015fmak or meet someone.",
      trap: {
        o2: "Turkish 'tan\u0131mak' can blur meet and know.",
        o3: "See is broader and weaker than meet."
      },
      estimated_difficulty: 0.24,
      estimated_discrimination: 0.3,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00549 meet verb"]
    },
            {
      id: "plc_a1a2_104",
      boundary: "A1/A2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_open"],
      skill_tags: ["oxford_3000","meaning_recognition","pos_sense"],
      lexicon: ["open"],
      distractor_distance: "medium",
      prompt: "a\u00e7mak (kap\u0131 / pencere)",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "open", role: "key" },
        { id: "o2", text: "turn on", role: "l1_trap" },
        { id: "o3", text: "close", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Open' is the verb for opening a door, window, box, or file.",
      trap: {
        o2: "Turkish 'a\u00e7mak' can also mean turn on, but not for door/window opening.",
        o3: "Close is the opposite action."
      },
      estimated_difficulty: 0.24,
      estimated_discrimination: 0.29,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00650 open verb"]
    },
            {
      id: "plc_a1a2_105",
      boundary: "A1/A2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_photo"],
      skill_tags: ["oxford_3000","meaning_recognition","daily_nouns"],
      lexicon: ["photo"],
      distractor_distance: "far",
      prompt: "foto\u011fraf",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "photo", role: "key" },
        { id: "o2", text: "camera", role: "l1_trap" },
        { id: "o3", text: "drawing", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Photo' means foto\u011fraf.",
      trap: {
        o2: "Camera is the device, not the image.",
        o3: "Drawing is another kind of image, not a photo."
      },
      estimated_difficulty: 0.18,
      estimated_discrimination: 0.27,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00699 photo noun"]
    },
            {
      id: "plc_a2b1_101",
      boundary: "A2/B1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_borrow"],
      skill_tags: ["oxford_3000","meaning_recognition","verb_direction"],
      lexicon: ["borrow"],
      distractor_distance: "near",
      prompt: "\u00f6d\u00fcn\u00e7 almak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "borrow", role: "key" },
        { id: "o2", text: "lend", role: "l1_trap" },
        { id: "o3", text: "owe", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Borrow' means \u00f6d\u00fcn\u00e7 almak.",
      trap: {
        o2: "Lend is the opposite direction: \u00f6d\u00fcn\u00e7 vermek.",
        o3: "Owe belongs to debt, not temporary use."
      },
      estimated_difficulty: 0.38,
      estimated_discrimination: 0.33,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00114 borrow verb"]
    },
            {
      id: "plc_a2b1_102",
      boundary: "A2/B1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_avoid"],
      skill_tags: ["oxford_3000","meaning_recognition","near_synonyms"],
      lexicon: ["avoid"],
      distractor_distance: "near",
      prompt: "ka\u00e7\u0131nmak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "avoid", role: "key" },
        { id: "o2", text: "escape", role: "l1_trap" },
        { id: "o3", text: "protect", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Avoid' means ka\u00e7\u0131nmak.",
      trap: {
        o2: "Escape is physical or situational escape, not avoiding beforehand.",
        o3: "Protect is related to prevention but takes a different object pattern."
      },
      estimated_difficulty: 0.42,
      estimated_discrimination: 0.34,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00075 avoid verb"]
    },
            {
      id: "plc_a2b1_103",
      boundary: "A2/B1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_miss_transport"],
      skill_tags: ["oxford_3000","meaning_recognition","polysemy"],
      lexicon: ["miss"],
      distractor_distance: "near",
      prompt: "otob\u00fcs\u00fc ka\u00e7\u0131rmak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "miss the bus", role: "key" },
        { id: "o2", text: "catch the bus", role: "l1_trap" },
        { id: "o3", text: "free the bus", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Miss the bus' means otob\u00fcs\u00fc ka\u00e7\u0131rmak.",
      trap: {
        o2: "Catch the bus is the successful opposite: otob\u00fcse yeti\u015fmek/binmek.",
        o3: "Free the bus is a lexical misread of ka\u00e7\u0131rmak as release/free."
      },
      estimated_difficulty: 0.4,
      estimated_discrimination: 0.33,
      source_grounding: ["Oxford_3000_5000: oxford_A1_00560 miss verb"]
    },
            {
      id: "plc_a2b1_104",
      boundary: "A2/B1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_affect"],
      skill_tags: ["oxford_3000","meaning_recognition","word_family"],
      lexicon: ["affect"],
      distractor_distance: "near",
      prompt: "etkilemek",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "affect", role: "key" },
        { id: "o2", text: "effect", role: "l1_trap" },
        { id: "o3", text: "infect", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Affect' is the verb meaning etkilemek.",
      trap: {
        o2: "Effect is usually the noun etki, not the verb etkilemek.",
        o3: "Infect is a near-looking verb but means hastal\u0131k bula\u015ft\u0131rmak."
      },
      estimated_difficulty: 0.46,
      estimated_discrimination: 0.35,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00017 affect verb"]
    },
            {
      id: "plc_a2b1_105",
      boundary: "A2/B1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_attend"],
      skill_tags: ["oxford_3000","meaning_recognition","event_verbs"],
      lexicon: ["attend"],
      distractor_distance: "near",
      prompt: "kat\u0131lmak (ders / toplant\u0131)",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "attend", role: "key" },
        { id: "o2", text: "attention", role: "l1_trap" },
        { id: "o3", text: "enter", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Attend' means kat\u0131lmak or be present at an event/class.",
      trap: {
        o2: "Attention is a related-looking noun, not the verb.",
        o3: "Enter means go in, not attend an event."
      },
      estimated_difficulty: 0.44,
      estimated_discrimination: 0.34,
      source_grounding: ["Oxford_3000_5000: oxford_A2_00066 attend verb"]
    },
            {
      id: "plc_b1b2_101",
      boundary: "B1/B2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_embarrassed"],
      skill_tags: ["oxford_3000","meaning_recognition","emotion_words"],
      lexicon: ["embarrassed"],
      distractor_distance: "near",
      prompt: "mahcup, utanm\u0131\u015f",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "embarrassed", role: "key" },
        { id: "o2", text: "ashamed", role: "l1_trap" },
        { id: "o3", text: "shy", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Embarrassed' means mahcup or socially uncomfortable.",
      trap: {
        o2: "Ashamed is stronger and more moral.",
        o3: "Shy is a personality tendency."
      },
      estimated_difficulty: 0.54,
      estimated_discrimination: 0.36,
      source_grounding: ["Oxford_3000_5000: oxford_B1_00253 embarrassed adjective"]
    },
            {
      id: "plc_b1b2_102",
      boundary: "B1/B2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_claim"],
      skill_tags: ["oxford_3000","meaning_recognition","argumentation"],
      lexicon: ["claim"],
      distractor_distance: "near",
      prompt: "iddia",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "claim", role: "key" },
        { id: "o2", text: "complaint", role: "l1_trap" },
        { id: "o3", text: "aim", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "As a noun, 'claim' means iddia.",
      trap: {
        o2: "Complaint is \u015fikayet, a common formal-register confusion.",
        o3: "Aim is hedef/ama\u00e7, not iddia."
      },
      estimated_difficulty: 0.56,
      estimated_discrimination: 0.36,
      source_grounding: ["Oxford_3000_5000: oxford_B1_00129 claim noun"]
    },
            {
      id: "plc_b1b2_103",
      boundary: "B1/B2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_issue"],
      skill_tags: ["oxford_3000","meaning_recognition","abstract_nouns"],
      lexicon: ["issue"],
      distractor_distance: "near",
      prompt: "mesele, tart\u0131\u015fma konusu",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "issue", role: "key" },
        { id: "o2", text: "subject", role: "l1_trap" },
        { id: "o3", text: "edition", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Issue' can mean a matter or important topic.",
      trap: {
        o2: "Subject is konu in a lesson/topic sense, but issue is a matter under discussion.",
        o3: "Edition is another sense of issue, but not this Turkish cue."
      },
      estimated_difficulty: 0.58,
      estimated_discrimination: 0.36,
      source_grounding: ["Oxford_3000_5000: oxford_B1_00423 issue noun"]
    },
            {
      id: "plc_b1b2_104",
      boundary: "B1/B2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_recover"],
      skill_tags: ["oxford_3000_5000","meaning_recognition","health_verbs"],
      lexicon: ["recover"],
      distractor_distance: "near",
      prompt: "iyile\u015fmek",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "recover", role: "key" },
        { id: "o2", text: "return", role: "l1_trap" },
        { id: "o3", text: "collect", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Recover' means iyile\u015fmek after illness or difficulty.",
      trap: {
        o2: "Return is related to coming back, but not the health verb.",
        o3: "Collect is another recover-like meaning with objects, not health."
      },
      estimated_difficulty: 0.62,
      estimated_discrimination: 0.37,
      source_grounding: ["Oxford_3000_5000: oxford_B2_01153 recover verb"]
    },
            {
      id: "plc_b1b2_105",
      boundary: "B1/B2",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_convincing"],
      skill_tags: ["oxford_3000_5000","meaning_recognition","adjective_forms"],
      lexicon: ["convincing"],
      distractor_distance: "near",
      prompt: "ikna edici",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "convincing", role: "key" },
        { id: "o2", text: "convinced", role: "l1_trap" },
        { id: "o3", text: "confused", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Convincing' means ikna edici.",
      trap: {
        o2: "Convinced describes the person who believes it.",
        o3: "Confused is a near-looking adjective with a different meaning."
      },
      estimated_difficulty: 0.64,
      estimated_discrimination: 0.38,
      source_grounding: ["Oxford_3000_5000: oxford_B2_00305 convincing adjective"]
    },
            {
      id: "plc_b2c1_101",
      boundary: "B2/C1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_subtle"],
      skill_tags: ["oxford_5000","meaning_recognition","near_synonyms"],
      lexicon: ["subtle"],
      distractor_distance: "near",
      prompt: "ince, fark edilmesi zor",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "subtle", role: "key" },
        { id: "o2", text: "weak", role: "l1_trap" },
        { id: "o3", text: "obvious", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Subtle' means ince or hard to notice.",
      trap: {
        o2: "Weak is a literal misread of ince as lacking strength.",
        o3: "Obvious is the opposite."
      },
      estimated_difficulty: 0.74,
      estimated_discrimination: 0.4,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01221 subtle adjective"]
    },
            {
      id: "plc_b2c1_102",
      boundary: "B2/C1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_undermine"],
      skill_tags: ["oxford_5000","meaning_recognition","figurative_verbs"],
      lexicon: ["undermine"],
      distractor_distance: "near",
      prompt: "zay\u0131flatmak, baltalamak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "undermine", role: "key" },
        { id: "o2", text: "dig under", role: "l1_trap" },
        { id: "o3", text: "understate", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Undermine' means weaken or damage gradually.",
      trap: {
        o2: "A literal reading of the image under + mine/dig.",
        o3: "Understate means make something seem less important."
      },
      estimated_difficulty: 0.8,
      estimated_discrimination: 0.42,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01331 undermine verb"]
    },
            {
      id: "plc_b2c1_103",
      boundary: "B2/C1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_foster"],
      skill_tags: ["oxford_5000","meaning_recognition","abstract_verbs"],
      lexicon: ["foster"],
      distractor_distance: "near",
      prompt: "te\u015fvik etmek, geli\u015fmesini sa\u011flamak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "foster", role: "key" },
        { id: "o2", text: "feed", role: "l1_trap" },
        { id: "o3", text: "force", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Foster' means encourage the development of something.",
      trap: {
        o2: "Feed is a literal pull from beslemek-like Turkish figurative use.",
        o3: "Force is stronger and opposite in tone."
      },
      estimated_difficulty: 0.82,
      estimated_discrimination: 0.42,
      source_grounding: ["Oxford_3000_5000: oxford_C1_00554 foster verb"]
    },
            {
      id: "plc_b2c1_104",
      boundary: "B2/C1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_reluctant"],
      skill_tags: ["oxford_5000","meaning_recognition","attitude_adjectives"],
      lexicon: ["reluctant"],
      distractor_distance: "near",
      prompt: "isteksiz",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "reluctant", role: "key" },
        { id: "o2", text: "slow", role: "l1_trap" },
        { id: "o3", text: "willing", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Reluctant' means unwilling or not eager.",
      trap: {
        o2: "Hesitation may be misread as speed.",
        o3: "Willing is the opposite attitude."
      },
      estimated_difficulty: 0.78,
      estimated_discrimination: 0.41,
      source_grounding: ["Oxford_3000_5000: oxford_C1_01049 reluctant adjective"]
    },
            {
      id: "plc_b2c1_105",
      boundary: "B2/C1",
      type: "vocab",
      format: "meaning_tr_en",
      focus: ["oxford_meaning_abolish"],
      skill_tags: ["oxford_5000","meaning_recognition","formal_verbs"],
      lexicon: ["abolish"],
      distractor_distance: "near",
      prompt: "y\u00fcr\u00fcrl\u00fckten kald\u0131rmak",
      prompt_lang: "tr",
      option_lang: "en",
      instruction_tr: "T\u00fcrk\u00e7e ifadenin \u0130ngilizce kar\u015f\u0131l\u0131\u011f\u0131n\u0131 se\u00e7in.",
      options: [
        { id: "o1", text: "abolish", role: "key" },
        { id: "o2", text: "establish", role: "l1_trap" },
        { id: "o3", text: "reduce", role: "developmental_error" }
      ],
      correctId: "o1",
      signal: "'Abolish' means officially end a law, system, or practice.",
      trap: {
        o2: "Establish is a formal-policy opposite.",
        o3: "Reduce is weaker than abolish."
      },
      estimated_difficulty: 0.84,
      estimated_discrimination: 0.42,
      source_grounding: ["Oxford_3000_5000: oxford_C1_00001 abolish verb"]
    }
  ]
};

