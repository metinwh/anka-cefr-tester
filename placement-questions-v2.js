window.NEKTAR_PLACEMENT_CONTENT_V2 = {
  "version": "diagnostic_v2",
  "source": "codex_authored",
  "generated_at": "2026-05-15T00:00:00.000Z",
  "levels": [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1"
  ],
  "boundaries": [
    "A1/A2",
    "A2/B1",
    "B1/B2",
    "B2/C1"
  ],
  "items": [
    {
      "id": "v2_a1_vocab_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_states"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "aç",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Hungry",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Angry",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Heavy",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Thirsty",
        "role": "distractor",
        "tier": "close",
        "rationale": "Thirsty is a one-level-lower near answer; it is plausible but less precise than Hungry."
      },
      "estimated_difficulty": 0.14,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "hungry"
      ],
      "distractor_distance": "loose",
      "source_grounding": [
        "Oxford_3000: hungry"
      ],
      "signal": "Hungry targets hungry as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_states"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "yorgun",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Tired",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Bored",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Ready",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Sleepy",
        "role": "distractor",
        "tier": "close",
        "rationale": "Sleepy is a one-level-lower near answer; it is plausible but less precise than Tired."
      },
      "estimated_difficulty": 0.15,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "tired"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: tired"
      ],
      "signal": "Tired targets tired as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_states"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "susamış",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Thirsty",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Hungry",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Dirty",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Dry",
        "role": "distractor",
        "tier": "close",
        "rationale": "Dry is a one-level-lower near answer; it is plausible but less precise than Thirsty."
      },
      "estimated_difficulty": 0.16,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "thirsty"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: thirsty"
      ],
      "signal": "Thirsty targets thirsty as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_adjectives"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Cümledeki anlamı seç: “Kutunun içi <strong>boş</strong>.”",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Empty",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Open",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Clean",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Free",
        "role": "distractor",
        "tier": "close",
        "rationale": "Free is a one-level-lower near answer; it is plausible but less precise than Empty."
      },
      "estimated_difficulty": 0.17,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "empty"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: empty"
      ],
      "signal": "Empty targets empty as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_adjectives"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ucuz",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Cheap",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Small",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Easy",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Low-cost",
        "role": "distractor",
        "tier": "close",
        "rationale": "Low-cost is a one-level-lower near answer; it is plausible but less precise than Cheap."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "cheap"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: cheap"
      ],
      "signal": "Cheap targets cheap as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_prepositions"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "arkasında",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Behind",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Before",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Beside",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "At the back of",
        "role": "distractor",
        "tier": "close",
        "rationale": "At the back of is a one-level-lower near answer; it is plausible but less precise than Behind."
      },
      "estimated_difficulty": 0.19,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "behind"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: behind"
      ],
      "signal": "Behind targets behind as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "time_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "önce",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Before",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "After",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Already",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Earlier than",
        "role": "distractor",
        "tier": "close",
        "rationale": "Earlier than is a one-level-lower near answer; it is plausible but less precise than Before."
      },
      "estimated_difficulty": 0.19,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "before"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: before"
      ],
      "signal": "Before targets before as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "time_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Cümledeki anlamı seç: “Yemekten <strong>sonra</strong> yürüyüşe çıktık.”",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "After",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Again",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Later",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Later than",
        "role": "distractor",
        "tier": "close",
        "rationale": "Later than is a one-level-lower near answer; it is plausible but less precise than After."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "after"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: after"
      ],
      "signal": "After targets after as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "frequency_adverbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "her zaman",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Always",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Every day",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Everywhere",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Usually",
        "role": "distractor",
        "tier": "close",
        "rationale": "Usually is a one-level-lower near answer; it is plausible but less precise than Always."
      },
      "estimated_difficulty": 0.17,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "always"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: always"
      ],
      "signal": "Always targets always as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "frequency_adverbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "asla",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Never",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Ever",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Often",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Not ever",
        "role": "distractor",
        "tier": "close",
        "rationale": "Not ever is a one-level-lower near answer; it is plausible but less precise than Never."
      },
      "estimated_difficulty": 0.19,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "never"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: never"
      ],
      "signal": "Never targets never as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_011",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "frequency_adverbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "bazen",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Sometimes",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Soon",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Several",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Often",
        "role": "distractor",
        "tier": "close",
        "rationale": "Often is a one-level-lower near answer; it is plausible but less precise than Sometimes."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "sometimes"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: sometimes"
      ],
      "signal": "Sometimes targets sometimes as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_012",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "people_adjectives"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "genç",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Young",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "New",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Small",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Teenage",
        "role": "distractor",
        "tier": "close",
        "rationale": "Teenage is a one-level-lower near answer; it is plausible but less precise than Young."
      },
      "estimated_difficulty": 0.16,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "young"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: young"
      ],
      "signal": "Young targets young as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_013",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "people_adjectives"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "yaşlı",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Old",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Long",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Big",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Elderly",
        "role": "distractor",
        "tier": "close",
        "rationale": "Elderly is a one-level-lower near answer; it is plausible but less precise than Old."
      },
      "estimated_difficulty": 0.17,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "old"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: old"
      ],
      "signal": "Old targets old as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_014",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "place_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Cümledeki anlamı seç: “Okul eve çok <strong>yakın</strong>.”",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Near",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Next",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Here",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Close",
        "role": "distractor",
        "tier": "close",
        "rationale": "Close is a one-level-lower near answer; it is plausible but less precise than Near."
      },
      "estimated_difficulty": 0.16,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "near"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: near"
      ],
      "signal": "Near targets near as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_015",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "place_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "uzak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Far",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Long",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Late",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Distant",
        "role": "distractor",
        "tier": "close",
        "rationale": "Distant is a one-level-lower near answer; it is plausible but less precise than Far."
      },
      "estimated_difficulty": 0.16,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "far"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: far"
      ],
      "signal": "Far targets far as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_016",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "time_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "erken",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Early",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Fast",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "First",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Soon",
        "role": "distractor",
        "tier": "close",
        "rationale": "Soon is a one-level-lower near answer; it is plausible but less precise than Early."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "early"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: early"
      ],
      "signal": "Early targets early as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_017",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "time_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Cümledeki anlamı seç: “Toplantıya <strong>geç</strong> kaldım.”",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Late",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Last",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Slow",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Delayed",
        "role": "distractor",
        "tier": "close",
        "rationale": "Delayed is a one-level-lower near answer; it is plausible but less precise than Late."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "late"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: late"
      ],
      "signal": "Late targets late as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_018",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "basic_adverbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "tekrar",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Again",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Also",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "More",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Once more",
        "role": "distractor",
        "tier": "close",
        "rationale": "Once more is a one-level-lower near answer; it is plausible but less precise than Again."
      },
      "estimated_difficulty": 0.17,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "again"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: again"
      ],
      "signal": "Again targets again as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_019",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "birlikte",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Together",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Between",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Both",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "With each other",
        "role": "distractor",
        "tier": "close",
        "rationale": "With each other is a one-level-lower near answer; it is plausible but less precise than Together."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "together"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: together"
      ],
      "signal": "Together targets together as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_vocab_020",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_words"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Cümledeki anlamı seç: “Bu akşam evde <strong>yalnız</strong> kalacağım.”",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Alone",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Only",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Single",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "By yourself",
        "role": "distractor",
        "tier": "close",
        "rationale": "By yourself is a one-level-lower near answer; it is plausible but less precise than Alone."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "alone"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: alone"
      ],
      "signal": "Alone targets alone as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a1_nat_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "basic_states"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Aç olduğunu söylüyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I am hungry.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I have hunger.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I am hunger.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I feel hungry.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.19,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "hungry"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_basic_states"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "basic_questions"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Birine nereli olduğunu soruyorsun; doğal soruyu seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Where are you from?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Where do you come?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "From where you are?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Where do you come from?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "from"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_basic_questions"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "family_identity"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Birini kız kardeşin olarak tanıtıyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "She is my sister.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "She my sister is.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "She is sister me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "She is sister of me.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.21,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "sister"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_family_identity"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "basic_routines"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Okula gittiğini söylüyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I go to school.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I go school.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I school go.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I go to the school.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.22,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "school"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_basic_routines"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "possessives"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Çantanın sana ait olduğunu gösteriyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "This is my bag.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "This my bag.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "This bag is me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This bag is mine.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "bag"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_possessives"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "basic_negation"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Çayı sevmediğini söylüyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I don't like tea.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I no like tea.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I am not like tea.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I do not drink tea.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.19,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "tea"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_basic_negation"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "basic_permission"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir sandalyeye oturmak için izin istiyorsun; doğal soruyu seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Can I sit here?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Can I sitting here?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I can sit here?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "May I sit here?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "sit"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_basic_permission"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "weather"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Havanın çok soğuk olduğunu söylüyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "It is very cold.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "It has very cold.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "It very cold is.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "It feels very cold.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.21,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "cold"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_weather"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "plural_after_number"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İki erkek kardeşin olduğunu söylüyorsun; doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I have two brothers.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I have two brother.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I two brothers have.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I have two siblings.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.22,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "brother"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_plural_after_number"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_nat_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "farewells"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Yarın görüşeceğin birine veda ediyorsun; doğal ifadeyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "See you tomorrow.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "See you in tomorrow.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Tomorrow see you.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'll see you tomorrow.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.18,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "tomorrow"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: naturalness_farewells"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a1_prag_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "greetings"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Biri sana “Hello” diyor. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Hello.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Yes.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Why hello?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Hi.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.21,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "hello"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_greetings"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "thanks_response"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Biri teşekkür ediyor. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "You're welcome.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Yes, please.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Welcome to you.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "No problem.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.22,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "welcome"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_thanks_response"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "small_talk"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Biri “How are you?” diyor. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I'm fine, thanks.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I am good person.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "My age is fine.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Good, thanks.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.23,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "fine"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_small_talk"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "basic_request"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Birinden su istiyorsun. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Water, please.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Give water.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I want water now.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can I have water?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "water"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_basic_request"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "apology"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Yanlışlıkla çarptın. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Sorry.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I am mistake.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You are sorry.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'm sorry.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.21,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "sorry"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_apology"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "farewells"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Vedalaşıyorsun. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Goodbye.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Go good.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I go bye.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "See you.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.22,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "goodbye"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_farewells"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "meeting"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Birini ilk kez görüyorsun. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Nice to meet you.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Nice to see your meet.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Why you meet?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Good to meet you.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.23,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "meet"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_meeting"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_prag_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "clarification"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir şeyi anlamadın. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I don't understand.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I no understand.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Understand not.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I didn't understand.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.2,
      "estimated_discrimination": 0.73,
      "lexicon": [
        "understand"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: pragmatic_clarification"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a1_coll_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "everyday_meals",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "I ___ breakfast at 8.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "have",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "do",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "eat",
        "role": "distractor",
        "tier": "close",
        "rationale": "eat is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.23,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "breakfast",
        "have"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_everyday_meals"
      ],
      "signal": "have is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_coll_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "classroom_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "Please ___ attention.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "pay",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "give",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "take",
        "role": "distractor",
        "tier": "close",
        "rationale": "take is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.24,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "attention",
        "pay"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_classroom_collocations"
      ],
      "signal": "pay is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_coll_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "daily_routines",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "I ___ a shower every morning.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "take",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "do",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "have",
        "role": "distractor",
        "tier": "close",
        "rationale": "have is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.25,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "shower",
        "take"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_daily_routines"
      ],
      "signal": "take is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_coll_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "school_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "She ___ her homework after dinner.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "does",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "makes",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "takes",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "finishes",
        "role": "distractor",
        "tier": "close",
        "rationale": "finishes is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.26,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "homework",
        "do"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_school_collocations"
      ],
      "signal": "does is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_coll_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "everyday_actions",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "We ___ a photo together.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "take",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "make",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "do",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "snap",
        "role": "distractor",
        "tier": "close",
        "rationale": "snap is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.27,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "photo",
        "take"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_everyday_actions"
      ],
      "signal": "take is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_coll_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "transport_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "He ___ the bus at 7.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "takes",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "uses",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "rides",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "catches",
        "role": "distractor",
        "tier": "close",
        "rationale": "catches is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.28,
      "estimated_discrimination": 0.75,
      "lexicon": [
        "bus",
        "take"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: collocation_transport_collocations"
      ],
      "signal": "takes is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a1_phr_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "basic_particles",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Please sit ___.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "down",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "to",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "under",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "here",
        "role": "distractor",
        "tier": "close",
        "rationale": "here is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.24,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "sit"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_basic_particles"
      ],
      "signal": "down completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a1_phr_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "basic_particles",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Stand ___, please.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "straight",
        "role": "distractor",
        "tier": "close",
        "rationale": "straight is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.25,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "stand"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_basic_particles"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a1_phr_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "basic_particles",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Come ___, please.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "in",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "at",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "to",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "inside",
        "role": "distractor",
        "tier": "close",
        "rationale": "inside is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.26,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "come"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_basic_particles"
      ],
      "signal": "in completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a1_phr_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "daily_routines",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Wake ___ at seven.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "early",
        "role": "distractor",
        "tier": "close",
        "rationale": "early is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.27,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "wake"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_daily_routines"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a1_phr_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "basic_actions",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Turn ___ the light.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "on",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "open",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "up",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "on the lamp",
        "role": "distractor",
        "tier": "close",
        "rationale": "on the lamp is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.28,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "turn",
        "light"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_basic_actions"
      ],
      "signal": "on completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a1_phr_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A1",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "clothes",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Put ___ your coat.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "on",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "wear",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "in",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "on your jacket",
        "role": "distractor",
        "tier": "close",
        "rationale": "on your jacket is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.29,
      "estimated_discrimination": 0.74,
      "lexicon": [
        "put",
        "coat"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "CEFR_A1: phrasal_clothes"
      ],
      "signal": "on completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_vocab_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "common_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "kabul etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Accept",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Receive",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Take",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Agree",
        "role": "distractor",
        "tier": "close",
        "rationale": "Agree is a one-level-lower near answer; it is plausible but less precise than Accept."
      },
      "estimated_difficulty": 0.28,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "accept"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: accept"
      ],
      "signal": "Accept targets accept as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "common_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "reddetmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Refuse",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Reject",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Return",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Decline",
        "role": "distractor",
        "tier": "close",
        "rationale": "Decline is a one-level-lower near answer; it is plausible but less precise than Refuse."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "refuse"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: refuse"
      ],
      "signal": "Refuse targets refuse as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "common_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ödünç almak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Borrow",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Buy",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Lend",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Take temporarily",
        "role": "distractor",
        "tier": "close",
        "rationale": "Take temporarily is a one-level-lower near answer; it is plausible but less precise than Borrow."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "borrow"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: borrow"
      ],
      "signal": "Borrow targets borrow as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "common_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ödünç vermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Lend",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Send",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Borrow",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Loan",
        "role": "distractor",
        "tier": "close",
        "rationale": "Loan is a one-level-lower near answer; it is plausible but less precise than Lend."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "lend"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: lend"
      ],
      "signal": "Lend targets lend as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "change_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "geliştirmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Improve",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Grow",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Repair",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Make better",
        "role": "distractor",
        "tier": "close",
        "rationale": "Make better is a one-level-lower near answer; it is plausible but less precise than Improve."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "improve"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: improve"
      ],
      "signal": "Improve targets improve as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "choice_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "tercih etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Prefer",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Like",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Choose",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Would rather have",
        "role": "distractor",
        "tier": "close",
        "rationale": "Would rather have is a one-level-lower near answer; it is plausible but less precise than Prefer."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "prefer"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: prefer"
      ],
      "signal": "Prefer targets prefer as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "work_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "hazırlamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Prepare",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Plan",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Produce",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Get ready",
        "role": "distractor",
        "tier": "close",
        "rationale": "Get ready is a one-level-lower near answer; it is plausible but less precise than Prepare."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "prepare"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: prepare"
      ],
      "signal": "Prepare targets prepare as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "work_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "tamir etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Repair",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Change",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Clean",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Fix",
        "role": "distractor",
        "tier": "close",
        "rationale": "Fix is a one-level-lower near answer; it is plausible but less precise than Repair."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "repair"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: repair"
      ],
      "signal": "Repair targets repair as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "paylaşmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Share",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Show",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Divide",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Use together",
        "role": "distractor",
        "tier": "close",
        "rationale": "Use together is a one-level-lower near answer; it is plausible but less precise than Share."
      },
      "estimated_difficulty": 0.29,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "share"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: share"
      ],
      "signal": "Share targets share as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "davet etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Invite",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Visit",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Meet",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Ask to come",
        "role": "distractor",
        "tier": "close",
        "rationale": "Ask to come is a one-level-lower near answer; it is plausible but less precise than Invite."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "invite"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: invite"
      ],
      "signal": "Invite targets invite as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_011",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "thinking_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "karar vermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Decide",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Think",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Choose",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Make up your mind",
        "role": "distractor",
        "tier": "close",
        "rationale": "Make up your mind is a one-level-lower near answer; it is plausible but less precise than Decide."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "decide"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: decide"
      ],
      "signal": "Decide targets decide as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_012",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "açıklamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Explain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Tell",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Describe",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Make clear",
        "role": "distractor",
        "tier": "close",
        "rationale": "Make clear is a one-level-lower near answer; it is plausible but less precise than Explain."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "explain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: explain"
      ],
      "signal": "Explain targets explain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_013",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "tanımlamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Describe",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Draw",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Explain",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Say what it is like",
        "role": "distractor",
        "tier": "close",
        "rationale": "Say what it is like is a one-level-lower near answer; it is plausible but less precise than Describe."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "describe"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: describe"
      ],
      "signal": "Describe targets describe as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_014",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "choice_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "seçmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Choose",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Chase",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Want",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Pick",
        "role": "distractor",
        "tier": "close",
        "rationale": "Pick is a one-level-lower near answer; it is plausible but less precise than Choose."
      },
      "estimated_difficulty": 0.29,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "choose"
      ],
      "distractor_distance": "medium",
      "source_grounding": [
        "Oxford_3000: choose"
      ],
      "signal": "Choose targets choose as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_015",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "travel_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "varmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Arrive",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Leave",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Reach",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Get there",
        "role": "distractor",
        "tier": "close",
        "rationale": "Get there is a one-level-lower near answer; it is plausible but less precise than Arrive."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "arrive"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: arrive"
      ],
      "signal": "Arrive targets arrive as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_016",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "travel_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ayrılmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Leave",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Live",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Arrive",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Go away",
        "role": "distractor",
        "tier": "close",
        "rationale": "Go away is a one-level-lower near answer; it is plausible but less precise than Leave."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "leave"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: leave"
      ],
      "signal": "Leave targets leave as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_017",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "travel_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "geri dönmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Return",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Reply",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Repeat",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Come back",
        "role": "distractor",
        "tier": "close",
        "rationale": "Come back is a one-level-lower near answer; it is plausible but less precise than Return."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "return"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: return"
      ],
      "signal": "Return targets return as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_018",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "process_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "devam etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Continue",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Start",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Complete",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Keep going",
        "role": "distractor",
        "tier": "close",
        "rationale": "Keep going is a one-level-lower near answer; it is plausible but less precise than Continue."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "continue"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: continue"
      ],
      "signal": "Continue targets continue as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_019",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "thinking_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "karşılaştırmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Compare",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Compete",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Connect",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Look at differences",
        "role": "distractor",
        "tier": "close",
        "rationale": "Look at differences is a one-level-lower near answer; it is plausible but less precise than Compare."
      },
      "estimated_difficulty": 0.34,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "compare"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: compare"
      ],
      "signal": "Compare targets compare as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_vocab_020",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "choice_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "kaçınmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Avoid",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Forget",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Escape",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Stay away from",
        "role": "distractor",
        "tier": "close",
        "rationale": "Stay away from is a one-level-lower near answer; it is plausible but less precise than Avoid."
      },
      "estimated_difficulty": 0.35,
      "estimated_discrimination": 0.76,
      "lexicon": [
        "avoid"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: avoid"
      ],
      "signal": "Avoid targets avoid as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_a2_nat_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "plans"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Arkadaşına bugün daha sonra ne yapacağını soruyorsun; gündelik ve doğal bir soru seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "What are you doing later?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "What do you do later?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "What you do later?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "What will you do later?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "later"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_plans"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "restaurant_requests"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Restoranda garsona su istemek istiyorsun; kibar ama basit bir cümle seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Could I have some water?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Can I take some water?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Give me some water.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can I have water?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "water"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_restaurant_requests"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "apology"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Arkadaşınla buluşmaya birkaç dakika geç kaldın; doğal bir özür cümlesi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Sorry I'm late.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Sorry for I am late.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I am sorry to late.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Sorry for being late.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "late"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_apology"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "offers"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Birinin zorlandığını görüyorsun ve yardım teklif ediyorsun; doğal bir soru seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Do you need any help?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Do you need some helps?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You need help?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can I help you?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.34,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "help"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_offers"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "place_description"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Birine bankanın konumunu tarif ediyorsun; bankanın hemen yanında olduğunu söyleyen doğal cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "It's next to the bank.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "It's near of the bank.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "It is next the bank.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "It is beside the bank.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "next"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_place_description"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "frequency"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İşe çoğu gün yürüyerek gittiğini söylüyorsun; kelime sırası doğal olan cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I usually walk to work.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I walk usually to work.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Usually I am walk work.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I normally walk to work.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.31,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "usually"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_frequency"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "clarification"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Telefonda karşı tarafı iyi duymadın; tekrar etmesini kibarca istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Could you repeat that?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Can you say again that?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Repeat this to me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could you say that again?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "repeat"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_clarification"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "preferences"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İki renk arasında seçim yapıyorsun ve maviyi tercih ettiğini söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I prefer the blue one.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I prefer more blue one.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I am prefer the blue.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'd rather take the blue one.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "prefer"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_preferences"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "advice"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Arkadaşın kendini iyi hissetmiyor; doktora gitmesini doğal bir şekilde öneriyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "You should see a doctor.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "You must to see doctor.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You should see doctor.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "You ought to see a doctor.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.34,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "doctor"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_advice"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_nat_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "experience"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Daha önce o yere bir kez gittiğini söylüyorsun; deneyimi doğal anlatan cümleyi seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I've been there once.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I went there one time ago.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I have there been once.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I have visited once.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.3,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "once"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: naturalness_experience"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_a2_prag_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "meeting_response"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Biri “Nice to meet you” diyor. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Nice to meet you too.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Thanks, you too.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Why are you happy?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "You too.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "meet"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_meeting_response"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "service_request"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Kafede sipariş veriyorsun. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could I have a coffee?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Give me coffee.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I take coffee to me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can I get a coffee?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.34,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "coffee"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_service_request"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "sympathy"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Arkadaşın hasta. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I hope you feel better soon.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Get better.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Be healthy now.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Hope you get better soon.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.35,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "better"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_sympathy"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "declining"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir teklif sana uymuyor. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Sorry, I can't make it.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "No, I don't come.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I cannot exist there.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I can't come, sorry.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "make it"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_declining"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "clarification"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Birinden tekrar etmesini istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could you say that again?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Say again.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Repeat me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can you repeat that?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.33,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "repeat"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_clarification"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "congratulations"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Arkadaşın iyi haber verdi. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "That's great news!",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Very good for you.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I accept your news.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Great, congratulations!",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.34,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "news"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_congratulations"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "directions"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Yol tarifi istiyorsun. Ne dersin?",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "How do I get to the station?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Where station goes?",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "How can station find me?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "How can I get to the station?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.35,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "station"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_directions"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_prag_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "polite_refusal"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir daveti kibarca reddediyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Thanks, but I already have plans.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "No, I am busy.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I don't want your plan.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Thanks, but I'm busy.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.32,
      "estimated_discrimination": 0.77,
      "lexicon": [
        "plans"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: pragmatic_polite_refusal"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_a2_coll_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "decision_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "I need to ___ a decision today.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "make",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "do",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "take",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "choose",
        "role": "distractor",
        "tier": "close",
        "rationale": "choose is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.35,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "decision",
        "make"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_decision_collocations"
      ],
      "signal": "make is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_coll_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "error_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "She ___ a mistake in the form.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "made",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "did",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "wrote",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "made a small",
        "role": "distractor",
        "tier": "close",
        "rationale": "made a small is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.36,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "mistake",
        "make"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_error_collocations"
      ],
      "signal": "made is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_coll_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "time_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "They ___ time together on Sundays.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "spend",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "pass",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "hang out",
        "role": "distractor",
        "tier": "close",
        "rationale": "hang out is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.37,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "time",
        "spend"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_time_collocations"
      ],
      "signal": "spend is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_coll_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "promise_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "Please ___ your promise.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "keep",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "hold",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "honor",
        "role": "distractor",
        "tier": "close",
        "rationale": "honor is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.38,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "promise",
        "keep"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_promise_collocations"
      ],
      "signal": "keep is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_coll_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "health_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "He ___ a cold last week.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "caught",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "took",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "had",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "got",
        "role": "distractor",
        "tier": "close",
        "rationale": "got is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.39,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "cold",
        "catch"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_health_collocations"
      ],
      "signal": "caught is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_coll_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "money_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "We should ___ money for the trip.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "save",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "win",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "keep",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "put aside",
        "role": "distractor",
        "tier": "close",
        "rationale": "put aside is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "money",
        "save"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: collocation_money_collocations"
      ],
      "signal": "save is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_a2_phr_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "forms",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Please fill ___ this form.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "in",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "inside",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "on",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "out",
        "role": "distractor",
        "tier": "close",
        "rationale": "out is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.36,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "fill",
        "form"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_forms"
      ],
      "signal": "in completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_phr_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "life_story",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "I grew ___ in Ankara.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "up in",
        "role": "distractor",
        "tier": "close",
        "rationale": "up in is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.37,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "grow"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_life_story"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_phr_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "care",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Can you look ___ my bag?",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "after",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "behind",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "for",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "take care of",
        "role": "distractor",
        "tier": "close",
        "rationale": "take care of is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.38,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "look",
        "bag"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_care"
      ],
      "signal": "after completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_phr_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "supplies",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We ran ___ of milk.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "out",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "away",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "off",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "out of",
        "role": "distractor",
        "tier": "close",
        "rationale": "out of is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.39,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "run",
        "milk"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_supplies"
      ],
      "signal": "out completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_phr_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "clothes",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Take ___ your shoes.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "off",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "out",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "down",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "off your boots",
        "role": "distractor",
        "tier": "close",
        "rationale": "off your boots is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "take",
        "shoes"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_clothes"
      ],
      "signal": "off completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_a2_phr_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "A2",
      "boundary": "A1/A2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "classroom",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Please write ___ your name.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "down",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "under",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "off",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "write it down",
        "role": "distractor",
        "tier": "close",
        "rationale": "write it down is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.41,
      "estimated_discrimination": 0.78,
      "lexicon": [
        "write",
        "name"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_A2: phrasal_classroom"
      ],
      "signal": "down completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_vocab_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "change_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "azaltmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Reduce",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Lower",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Remove",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Decrease",
        "role": "distractor",
        "tier": "close",
        "rationale": "Decrease is a one-level-lower near answer; it is plausible but less precise than Reduce."
      },
      "estimated_difficulty": 0.39,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "reduce"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: reduce"
      ],
      "signal": "Reduce targets reduce as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "change_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "artırmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Increase",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Improve",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Rise",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Raise",
        "role": "distractor",
        "tier": "close",
        "rationale": "Raise is a one-level-lower near answer; it is plausible but less precise than Increase."
      },
      "estimated_difficulty": 0.39,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "increase"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: increase"
      ],
      "signal": "Increase targets increase as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "gerektirmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Require",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Need",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Request",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Demand",
        "role": "distractor",
        "tier": "close",
        "rationale": "Demand is a one-level-lower near answer; it is plausible but less precise than Require."
      },
      "estimated_difficulty": 0.41,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "require"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: require"
      ],
      "signal": "Require targets require as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "önermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Suggest",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Offer",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Say",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Recommend",
        "role": "distractor",
        "tier": "close",
        "rationale": "Recommend is a one-level-lower near answer; it is plausible but less precise than Suggest."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "suggest"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: suggest"
      ],
      "signal": "Suggest targets suggest as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "sağlamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Provide",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Give",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Protect",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Supply",
        "role": "distractor",
        "tier": "close",
        "rationale": "Supply is a one-level-lower near answer; it is plausible but less precise than Provide."
      },
      "estimated_difficulty": 0.42,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "provide"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: provide"
      ],
      "signal": "Provide targets provide as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "success_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "başarmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Achieve",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Win",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Reach",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Accomplish",
        "role": "distractor",
        "tier": "close",
        "rationale": "Accomplish is a one-level-lower near answer; it is plausible but less precise than Achieve."
      },
      "estimated_difficulty": 0.42,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "achieve"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: achieve"
      ],
      "signal": "Achieve targets achieve as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "cause_effect"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "neden olmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Cause",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Make",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Reason",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Lead to",
        "role": "distractor",
        "tier": "close",
        "rationale": "Lead to is a one-level-lower near answer; it is plausible but less precise than Cause."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "cause"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: cause"
      ],
      "signal": "Cause targets cause as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "cause_effect"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "önlemek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Prevent",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Protect",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Stop",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Keep from happening",
        "role": "distractor",
        "tier": "close",
        "rationale": "Keep from happening is a one-level-lower near answer; it is plausible but less precise than Prevent."
      },
      "estimated_difficulty": 0.43,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "prevent"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: prevent"
      ],
      "signal": "Prevent targets prevent as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "katılmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Attend",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Join",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Go",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Be present at",
        "role": "distractor",
        "tier": "close",
        "rationale": "Be present at is a one-level-lower near answer; it is plausible but less precise than Attend."
      },
      "estimated_difficulty": 0.41,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "attend"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: attend"
      ],
      "signal": "Attend targets attend as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "planning"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "düzenlemek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Arrange",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Order",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Organize",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Set up",
        "role": "distractor",
        "tier": "close",
        "rationale": "Set up is a one-level-lower near answer; it is plausible but less precise than Arrange."
      },
      "estimated_difficulty": 0.42,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "arrange"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: arrange"
      ],
      "signal": "Arrange targets arrange as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_011",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "şikayet etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Complain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Explain",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Argue",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Say you are unhappy",
        "role": "distractor",
        "tier": "close",
        "rationale": "Say you are unhappy is a one-level-lower near answer; it is plausible but less precise than Complain."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "complain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: complain"
      ],
      "signal": "Complain targets complain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_012",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "social_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "desteklemek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Support",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Carry",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Help",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Back",
        "role": "distractor",
        "tier": "close",
        "rationale": "Back is a one-level-lower near answer; it is plausible but less precise than Support."
      },
      "estimated_difficulty": 0.41,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "support"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: support"
      ],
      "signal": "Support targets support as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_013",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "relationship_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "bağlı olmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Depend",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Need",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Wait",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Rely",
        "role": "distractor",
        "tier": "close",
        "rationale": "Rely is a one-level-lower near answer; it is plausible but less precise than Depend."
      },
      "estimated_difficulty": 0.43,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "depend"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: depend"
      ],
      "signal": "Depend targets depend as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_014",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "academic_bridge"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "içermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Include",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Contain",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Add",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Have as part",
        "role": "distractor",
        "tier": "close",
        "rationale": "Have as part is a one-level-lower near answer; it is plausible but less precise than Include."
      },
      "estimated_difficulty": 0.42,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "include"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: include"
      ],
      "signal": "Include targets include as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_015",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "permission_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "izin vermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Allow",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Let",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Accept",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Permit",
        "role": "distractor",
        "tier": "close",
        "rationale": "Permit is a one-level-lower near answer; it is plausible but less precise than Allow."
      },
      "estimated_difficulty": 0.41,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "allow"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: allow"
      ],
      "signal": "Allow targets allow as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_016",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "thinking_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "düşünmek/değerlendirmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Consider",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Think",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Decide",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Think carefully about",
        "role": "distractor",
        "tier": "close",
        "rationale": "Think carefully about is a one-level-lower near answer; it is plausible but less precise than Consider."
      },
      "estimated_difficulty": 0.44,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "consider"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: consider"
      ],
      "signal": "Consider targets consider as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_017",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "thinking_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "beklemek/tahmin etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Expect",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Wait",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Hope",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Think will happen",
        "role": "distractor",
        "tier": "close",
        "rationale": "Think will happen is a one-level-lower near answer; it is plausible but less precise than Expect."
      },
      "estimated_difficulty": 0.43,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "expect"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: expect"
      ],
      "signal": "Expect targets expect as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_018",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "success_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "üstesinden gelmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Manage",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Control",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Succeed",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Cope with",
        "role": "distractor",
        "tier": "close",
        "rationale": "Cope with is a one-level-lower near answer; it is plausible but less precise than Manage."
      },
      "estimated_difficulty": 0.44,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "manage"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: manage"
      ],
      "signal": "Manage targets manage as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_019",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "perception"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "fark etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Notice",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Know",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Watch",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Become aware of",
        "role": "distractor",
        "tier": "close",
        "rationale": "Become aware of is a one-level-lower near answer; it is plausible but less precise than Notice."
      },
      "estimated_difficulty": 0.4,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "notice"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: notice"
      ],
      "signal": "Notice targets notice as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_vocab_020",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "kanıtlamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Prove",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Show",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Test",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Demonstrate",
        "role": "distractor",
        "tier": "close",
        "rationale": "Demonstrate is a one-level-lower near answer; it is plausible but less precise than Prove."
      },
      "estimated_difficulty": 0.45,
      "estimated_discrimination": 0.79,
      "lexicon": [
        "prove"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_3000: prove"
      ],
      "signal": "Prove targets prove as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b1_nat_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "work_tasks"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İş yerinde hangisi doğal?",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I need to check the details.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I need check the details.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I need checking details.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I need to look into the details.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.44,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "details"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_work_tasks"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "email_response"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir e-postaya cevap geldi; karşı tarafa geri döndüğü için teşekkür ediyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Thanks for getting back to me.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Thanks to turn back to me.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Thanks for return me.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Thanks for replying to me.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.45,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "reply"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_email_response"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "polite_requests"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Odada hava ağır; birinden pencereyi açmasını kibarca istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Would you mind opening the window?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Would you mind to open the window?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Would you mind open window?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could you open the window?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.46,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "mind"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_polite_requests"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "problem_explanation"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir dosyanın sistemde görünmediğini teknik destek konuşmasında açıklıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The file seems to be missing.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The file seems missing itself.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "The file looks like not there.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "It looks like the file is missing.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.47,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "missing"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_problem_explanation"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "turn_taking"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Toplantıda konuşmaya kısa bir nokta eklemek istiyorsun; sözü nazikçe alıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Can I add something here?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Can I add a thing in here?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I add something here?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could I add something here?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.43,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "add"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_turn_taking"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "cause"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Dün gelemediğini açıklıyorsun; nedeninin hasta olman olduğunu doğal şekilde söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I couldn't come because I was ill.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I couldn't come because of I was ill.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I didn't come for I was ill.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I was ill, so I couldn't come.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.44,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "because"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_cause"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "experience"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Hayatında hiç sushi denemediğini söylüyorsun; doğal deneyim cümlesini seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I've never tried sushi.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I never tried sushi in my life.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I didn't never try sushi.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I haven't tried sushi before.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.45,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "try"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_experience"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "comparison"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İki seçenek arasında fiyat karşılaştırması yapıyorsun; birinin biraz daha ucuz olduğunu söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "This option is slightly cheaper.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "This option is more cheap.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "This option cheaper is.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This option costs a little less.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.46,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "cheaper"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_comparison"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "plans"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Toplantıyı daha sonraya ertelemek istiyorsun; doğal plan değişikliği cümlesini seç.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Let's put the meeting off.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Let's delay the meeting to later.",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Let's make meeting later.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Let's postpone the meeting.",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.47,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "postpone"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_plans"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_nat_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "clarification"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Karşı tarafın ne demek istediğini tam anlamadın; açıklama istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Could you clarify what you mean?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Could you make clear what mean?",
          "role": "weak",
          "credit": 0.25,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "What you mean clarify?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could you explain what you mean?",
        "role": "weak",
        "credit": 0.25,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.43,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "clarify"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: naturalness_clarification"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b1_prag_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "work_request"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "İş arkadaşından yardım istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could you help me with this?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Help me with this.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You must help this.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Can you help me with this?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.46,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "help"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_work_request"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "delay_notice"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Toplantıya geç kalacaksın.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I'm running a few minutes late.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I am late some minutes.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I come late, wait.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'll be a few minutes late.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.47,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "late"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_delay_notice"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "agreement_nuance"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir öneriye kısmen katılıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "That could work, but I'm not sure.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Maybe yes but no.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "It works or not.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "That might work.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.48,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "work"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_agreement_nuance"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "customer_support"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Müşteriye problemi anlatıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "We're looking into the issue.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "We are looking the problem.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Problem is being looked by us.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "We're checking the issue.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.45,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "issue"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_customer_support"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "clarification"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Birinden açıklama istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could you clarify the last point?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Explain last point again.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Make clear last point.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could you explain the last point?",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.46,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "clarify"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_clarification"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "soft_disagreement"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Nazikçe aynı fikirde değilsin.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I'm not sure I agree.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I don't agree with you.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Your idea is wrong.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'm not sure about that.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.47,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "agree"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_soft_disagreement"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "feedback"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir hatayı kibarca söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "There may be a small mistake here.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "There is mistake here.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You made wrong here.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This might be a mistake.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.48,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "mistake"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_feedback"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_prag_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "feedback_response"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Geri bildirim için teşekkür ediyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Thanks for the feedback.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Thanks for your criticize.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Your feedback is accepted.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Thanks, that's helpful.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.45,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "feedback"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: pragmatic_feedback_response"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b1_coll_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "work_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The company will ___ a meeting tomorrow.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "hold",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "make",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "do",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "arrange",
        "role": "distractor",
        "tier": "close",
        "rationale": "arrange is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.48,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "meeting",
        "hold"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_work_collocations"
      ],
      "signal": "hold is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_coll_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "cause_effect",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "This change could ___ problems later.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "cause",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "make",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "give",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "lead to",
        "role": "distractor",
        "tier": "close",
        "rationale": "lead to is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.49,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "problem",
        "cause"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_cause_effect"
      ],
      "signal": "cause is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_coll_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "feedback_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The teacher ___ feedback on my essay.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "gave",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "made",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "did",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "provided",
        "role": "distractor",
        "tier": "close",
        "rationale": "provided is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.5,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "feedback",
        "give"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_feedback_collocations"
      ],
      "signal": "gave is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_coll_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "deadline_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "We need to ___ the deadline.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "meet",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "catch",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "reach",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "stick to",
        "role": "distractor",
        "tier": "close",
        "rationale": "stick to is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.51,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "deadline",
        "meet"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_deadline_collocations"
      ],
      "signal": "meet is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_coll_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "responsibility",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "She ___ responsibility for the mistake.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "took",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "made",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "held",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "accepted",
        "role": "distractor",
        "tier": "close",
        "rationale": "accepted is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.52,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "responsibility",
        "take"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_responsibility"
      ],
      "signal": "took is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_coll_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "formal_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The new rule will ___ effect next week.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "take",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "make",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "do",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "come into",
        "role": "distractor",
        "tier": "close",
        "rationale": "come into is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.53,
      "estimated_discrimination": 0.83,
      "lexicon": [
        "effect",
        "take"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: collocation_formal_collocations"
      ],
      "signal": "take is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b1_phr_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "rejection",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "He turned ___ the offer.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "down",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "off",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "away",
        "role": "distractor",
        "tier": "close",
        "rationale": "away is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.49,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "turn",
        "offer"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_rejection"
      ],
      "signal": "down completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_phr_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "scheduling",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The meeting was put ___.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "off",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "out",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "away",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "back",
        "role": "distractor",
        "tier": "close",
        "rationale": "back is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.5,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "put",
        "meeting"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_scheduling"
      ],
      "signal": "off completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_phr_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "problem_solving",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "I need to look ___ the issue.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "into",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "inside",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "at",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "investigate",
        "role": "distractor",
        "tier": "close",
        "rationale": "investigate is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.51,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "look",
        "issue"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_problem_solving"
      ],
      "signal": "into completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_phr_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "discussion",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "She brought ___ an important point.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "out",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "on",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "raised",
        "role": "distractor",
        "tier": "close",
        "rationale": "raised is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.52,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "bring",
        "point"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_discussion"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_phr_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "continuation",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We carried ___ working late.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "on",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "over",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "continued",
        "role": "distractor",
        "tier": "close",
        "rationale": "continued is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.53,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "carry",
        "work"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_continuation"
      ],
      "signal": "on completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b1_phr_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B1",
      "boundary": "A2/B1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "business",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "They set ___ a small business.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "started",
        "role": "distractor",
        "tier": "close",
        "rationale": "started is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.54,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "set",
        "business"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B1: phrasal_business"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_vocab_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_register"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ifşa etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Disclose",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Tell",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Discuss",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Reveal",
        "role": "distractor",
        "tier": "close",
        "rationale": "Reveal is a one-level-lower near answer; it is plausible but less precise than Disclose."
      },
      "estimated_difficulty": 0.56,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "disclose"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: disclose"
      ],
      "signal": "Disclose targets disclose as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "sürdürmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Sustain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Keep",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Support",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Maintain",
        "role": "distractor",
        "tier": "close",
        "rationale": "Maintain is a one-level-lower near answer; it is plausible but less precise than Sustain."
      },
      "estimated_difficulty": 0.57,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "sustain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: sustain"
      ],
      "signal": "Sustain targets sustain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "geri çekmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Withdraw",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Remove",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Return",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Pull back",
        "role": "distractor",
        "tier": "close",
        "rationale": "Pull back is a one-level-lower near answer; it is plausible but less precise than Withdraw."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "withdraw"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: withdraw"
      ],
      "signal": "Withdraw targets withdraw as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_register"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "geliştirmek/artırmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Enhance",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Increase",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Enlarge",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Improve",
        "role": "distractor",
        "tier": "close",
        "rationale": "Improve is a one-level-lower near answer; it is plausible but less precise than Enhance."
      },
      "estimated_difficulty": 0.57,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "enhance"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: enhance"
      ],
      "signal": "Enhance targets enhance as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "edinmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Acquire",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Get",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Ask",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Obtain",
        "role": "distractor",
        "tier": "close",
        "rationale": "Obtain is a one-level-lower near answer; it is plausible but less precise than Acquire."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "acquire"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: acquire"
      ],
      "signal": "Acquire targets acquire as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "academic_bridge"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "değerlendirmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Assess",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Guess",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Value",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Evaluate",
        "role": "distractor",
        "tier": "close",
        "rationale": "Evaluate is a one-level-lower near answer; it is plausible but less precise than Assess."
      },
      "estimated_difficulty": 0.56,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "assess"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: assess"
      ],
      "signal": "Assess targets assess as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ima etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Imply",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Say",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Mean",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Suggest indirectly",
        "role": "distractor",
        "tier": "close",
        "rationale": "Suggest indirectly is a one-level-lower near answer; it is plausible but less precise than Imply."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "imply"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: imply"
      ],
      "signal": "Imply targets imply as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "haklı göstermek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Justify",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Explain",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Judge",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Defend",
        "role": "distractor",
        "tier": "close",
        "rationale": "Defend is a one-level-lower near answer; it is plausible but less precise than Justify."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "justify"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: justify"
      ],
      "signal": "Justify targets justify as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "elinde tutmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Retain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Keep",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Remain",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Keep hold of",
        "role": "distractor",
        "tier": "close",
        "rationale": "Keep hold of is a one-level-lower near answer; it is plausible but less precise than Retain."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "retain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: retain"
      ],
      "signal": "Retain targets retain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "elde etmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Obtain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Get",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Hold",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Acquire",
        "role": "distractor",
        "tier": "close",
        "rationale": "Acquire is a one-level-lower near answer; it is plausible but less precise than Obtain."
      },
      "estimated_difficulty": 0.57,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "obtain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: obtain"
      ],
      "signal": "Obtain targets obtain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_011",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "zayıflatmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Undermine",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Damage",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Understate",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Weaken",
        "role": "distractor",
        "tier": "close",
        "rationale": "Weaken is a one-level-lower near answer; it is plausible but less precise than Undermine."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "undermine"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: undermine"
      ],
      "signal": "Undermine targets undermine as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_012",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "academic_bridge"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "göstermek/kanıtlamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Demonstrate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Show",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Describe",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Prove by showing",
        "role": "distractor",
        "tier": "close",
        "rationale": "Prove by showing is a one-level-lower near answer; it is plausible but less precise than Demonstrate."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "demonstrate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: demonstrate"
      ],
      "signal": "Demonstrate targets demonstrate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_013",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "problem_solving"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "çözmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Resolve",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Solve",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Decide",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Settle",
        "role": "distractor",
        "tier": "close",
        "rationale": "Settle is a one-level-lower near answer; it is plausible but less precise than Resolve."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "resolve"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: resolve"
      ],
      "signal": "Resolve targets resolve as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_014",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "change_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "ortaya çıkmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Emerge",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Appear",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Leave",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Come out",
        "role": "distractor",
        "tier": "close",
        "rationale": "Come out is a one-level-lower near answer; it is plausible but less precise than Emerge."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "emerge"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: emerge"
      ],
      "signal": "Emerge targets emerge as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_015",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "kurmak/oluşturmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Establish",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Build",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Start",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Set up",
        "role": "distractor",
        "tier": "close",
        "rationale": "Set up is a one-level-lower near answer; it is plausible but less precise than Establish."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "establish"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: establish"
      ],
      "signal": "Establish targets establish as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_016",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "azalmak/reddetmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Decline",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Refuse",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Fall",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Decrease",
        "role": "distractor",
        "tier": "close",
        "rationale": "Decrease is a one-level-lower near answer; it is plausible but less precise than Decline."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "decline"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: decline"
      ],
      "signal": "Decline targets decline as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_017",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "sürdürmek/korumak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Maintain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Keep",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Repair",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Sustain",
        "role": "distractor",
        "tier": "close",
        "rationale": "Sustain is a one-level-lower near answer; it is plausible but less precise than Maintain."
      },
      "estimated_difficulty": 0.57,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "maintain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: maintain"
      ],
      "signal": "Maintain targets maintain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_018",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "peşinden gitmek",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Pursue",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Follow",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Push",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Seek",
        "role": "distractor",
        "tier": "close",
        "rationale": "Seek is a one-level-lower near answer; it is plausible but less precise than Pursue."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "pursue"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: pursue"
      ],
      "signal": "Pursue targets pursue as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_019",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "kabul etmek/onaylamak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Acknowledge",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Accept",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Know",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Admit",
        "role": "distractor",
        "tier": "close",
        "rationale": "Admit is a one-level-lower near answer; it is plausible but less precise than Acknowledge."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "acknowledge"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: acknowledge"
      ],
      "signal": "Acknowledge targets acknowledge as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_vocab_020",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "vocab",
      "format": "meaning_tr_en",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "dağıtmak",
      "prompt_lang": "tr",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "Distribute",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "Give",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "Destroy",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Share out",
        "role": "distractor",
        "tier": "close",
        "rationale": "Share out is a one-level-lower near answer; it is plausible but less precise than Distribute."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.82,
      "lexicon": [
        "distribute"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: distribute"
      ],
      "signal": "Distribute targets distribute as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_b2_nat_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "polite_requests"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Yoğun bir iş gününde iş arkadaşından kısa bir yardım istiyorsun; nazik ama fazla resmi olmayan bir ton kullanıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Would you mind giving me a hand?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Could you give me a hand?",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Would you have wanting to help?",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could you help me with this?",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "mind",
        "hand"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_polite_requests"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "email_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İş arkadaşın sana gecikmeyi haber verdi. Profesyonel ama sıcak bir e-posta cevabı yazıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I appreciate you letting me know.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Thank you for letting me know.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "I appreciate for your information.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Thanks for letting me know.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "appreciate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_email_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "stance"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Toplantıda bir öneriye henüz tam ikna olmadığını, karşı tarafı doğrudan reddetmeden söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I'm not entirely convinced yet.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I'm not fully convinced yet.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "I don't convinced yet.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'm not completely convinced yet.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "convinced"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_stance"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "academic_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Raporun kısa özetinde sonuçların önceki verilerle büyük ölçüde uyumlu olduğunu söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The results are broadly consistent.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The results are mostly consistent.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "The results are generally same.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The results are largely consistent.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.62,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "consistent"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_academic_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "diplomatic_disagreement"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Toplantıda bir fikre kibarca karşı çıkıyorsun; karşı tarafı küçümsemeden çekinceni belirtiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I see your point, but I'm not sure.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I understand your point, but I have concerns.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Your point is wrong.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I understand, but I'm not sure.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "point"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_diplomatic_disagreement"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "formal_problem"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "İki veri kaynağı arasında açıklanması gereken küçük bir tutarsızlık olduğunu resmi bir tonda belirtiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "There seems to be a discrepancy.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "There appears to be a discrepancy.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "There seems a discrepancy exists.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "There seems to be some inconsistency.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.59,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "discrepancy"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_formal_problem"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "feedback"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir metin taslağına nazik geri bildirim veriyorsun; sorun içerikte değil, ifadenin açıklığında.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The wording could be a bit clearer.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The wording could be clearer.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "The words must clear more.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This could be worded a little more clearly.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "wording"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_feedback"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "cause_effect"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir gecikmenin olası nedenini resmi bir tonda açıklıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "That may account for the delay.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "That might explain the delay.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "That can be delay reason.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "That could explain the delay.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "account"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_cause_effect"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "decision_language"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir karar vermeden önce seçeneklerin artılarını ve eksilerini değerlendirmek gerektiğini söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "We need to weigh the options.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "We need to consider the options.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "We need to weight the options.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "We need to look at the options carefully.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.62,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "weigh"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_decision_language"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_nat_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "presentation_language"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Resmi bir sunumda anlattığın bulgunun daha geniş bir tartışma başlattığını söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "This raises a broader question.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "This brings up a broader question.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "This makes a wider question.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This opens up a broader question.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.58,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "raise"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: naturalness_presentation_language"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_b2_prag_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "diplomatic_correction"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Toplantıda yöneticin yanlış bir veri paylaştı. Onu doğrudan utandırmadan düzeltmek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could we double-check those figures?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Those figures may need another look.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Those figures are wrong.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Maybe we should revisit the figures.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "figures"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_diplomatic_correction"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "hedged_disagreement"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir önerinin riskli olduğunu düşünüyorsun ama kişiyi kırmadan söylemek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I have some reservations about that.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I'm not fully convinced by that yet.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "I don't like that idea.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I'm not fully convinced by that.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.62,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "reservations"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_hedged_disagreement"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "email_apology"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "E-postada gecikmeyi açıklıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Apologies for the delay in replying.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Sorry, I answer late.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "I was late to reply you.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Sorry for the late reply.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.63,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "delay"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_email_apology"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "customer_empathy"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir müşteri ürünle ilgili öfkeli bir mesaj yazdı. Empati kurup konuşmayı sakinleştirmek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I understand how frustrating this must be.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I can see why you're upset.",
          "role": "acceptable",
          "credit": 0.65,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Please calm down before we continue.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I can see why you're frustrated.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "frustration"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_customer_empathy"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "discourse_management"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Toplantıda sözü toparlıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "To sum up, we have two options.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "At sum, two options exist.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "The end is two options.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "In short, we have two options.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.61,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "sum up"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_discourse_management"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "risk_language"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir riskten kibarca bahsediyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "That might create some issues later.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "That will make problems.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "This is risky thing.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "That could cause issues later.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.62,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "issues"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_risk_language"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "collaboration"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Meslektaşının önerisini geliştiriyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Could we build on that idea?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Can we add over that idea?",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Your idea needs more.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Maybe we can develop that idea.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.63,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "build on"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_collaboration"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_prag_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "formal_email"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Resmi bir e-postayı bitirirken karşı tarafın soru sorabileceğini nazikçe belirtmek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Please let me know if anything is unclear.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Let me know if you have any questions.",
          "role": "acceptable",
          "credit": 0.65,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Tell me if you don't understand.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Let me know if anything is unclear.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.6,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "unclear"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: pragmatic_formal_email"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_b2_coll_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "formal_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The report ___ light on the delay.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "sheds",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "throws",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "opens",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "casts",
        "role": "distractor",
        "tier": "close",
        "rationale": "casts is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.63,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "light",
        "shed"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_formal_collocations"
      ],
      "signal": "sheds is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_coll_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "argument_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The evidence ___ doubt on the claim.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "casts",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "makes",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "throws",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "raises",
        "role": "distractor",
        "tier": "close",
        "rationale": "raises is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.64,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "doubt",
        "cast"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_argument_collocations"
      ],
      "signal": "casts is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_coll_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "abstract_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "We need to ___ a balance.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "strike",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "hit",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "make",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "find",
        "role": "distractor",
        "tier": "close",
        "rationale": "find is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.65,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "balance",
        "strike"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_abstract_collocations"
      ],
      "signal": "strike is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_coll_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "risk_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The policy ___ a risk to growth.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "poses",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "puts",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "makes",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "creates",
        "role": "distractor",
        "tier": "close",
        "rationale": "creates is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.66,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "risk",
        "pose"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_risk_collocations"
      ],
      "signal": "poses is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_coll_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "agreement_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The team ___ an agreement yesterday.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "reached",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "arrived",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "made",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "came to",
        "role": "distractor",
        "tier": "close",
        "rationale": "came to is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.67,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "agreement",
        "reach"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_agreement_collocations"
      ],
      "signal": "reached is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_coll_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "academic_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The findings ___ the need for reform.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "highlight",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "show",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "light",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "emphasize",
        "role": "distractor",
        "tier": "close",
        "rationale": "emphasize is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.68,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "need",
        "highlight"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: collocation_academic_collocations"
      ],
      "signal": "highlight is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_b2_phr_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "work_process",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We need to follow ___ on this.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "after",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "through",
        "role": "distractor",
        "tier": "close",
        "rationale": "through is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.64,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "follow"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_work_process"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_phr_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "failure",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The plan fell ___.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "through",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "down",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "off",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "apart",
        "role": "distractor",
        "tier": "close",
        "rationale": "apart is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.65,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "fall",
        "plan"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_failure"
      ],
      "signal": "through completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_phr_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "impression",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "She came ___ as very confident.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "across",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "over",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "across to us",
        "role": "distractor",
        "tier": "close",
        "rationale": "across to us is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.66,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "come",
        "confident"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_impression"
      ],
      "signal": "across completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_phr_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "negotiation",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The company backed ___ of the deal.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "out",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "off",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "away",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "away from",
        "role": "distractor",
        "tier": "close",
        "rationale": "away from is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.67,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "back",
        "deal"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_negotiation"
      ],
      "signal": "out completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_phr_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "problem_solving",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We need to sort ___ the problem.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "out",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "off",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "away",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "resolve",
        "role": "distractor",
        "tier": "close",
        "rationale": "resolve is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.68,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "sort",
        "problem"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_problem_solving"
      ],
      "signal": "out completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_b2_phr_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "B2",
      "boundary": "B1/B2",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "argumentation",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The result bears ___ his theory.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "out",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "up",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "supports",
        "role": "distractor",
        "tier": "close",
        "rationale": "supports is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.69,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "bear",
        "theory"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_B2: phrasal_argumentation"
      ],
      "signal": "out completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_vocab_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "precision_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The policy may ___ the worst effects.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "mitigate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "reduce",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "imitate",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "lessen",
        "role": "distractor",
        "tier": "close",
        "rationale": "lessen is a one-level-lower near answer; it is plausible but less precise than mitigate."
      },
      "estimated_difficulty": 0.72,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "mitigate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: mitigate"
      ],
      "signal": "mitigate targets mitigate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "academic_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The committee will ___ the proposal.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "scrutinize",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "scan",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "criticize",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "examine closely",
        "role": "distractor",
        "tier": "close",
        "rationale": "examine closely is a one-level-lower near answer; it is plausible but less precise than scrutinize."
      },
      "estimated_difficulty": 0.75,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "scrutinize"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: scrutinize"
      ],
      "signal": "scrutinize targets scrutinize as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The data does not ___ that claim.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "substantiate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "support",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "substitute",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "prove with evidence",
        "role": "distractor",
        "tier": "close",
        "rationale": "prove with evidence is a one-level-lower near answer; it is plausible but less precise than substantiate."
      },
      "estimated_difficulty": 0.77,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "substantiate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: substantiate"
      ],
      "signal": "substantiate targets substantiate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "They tried to ___ the new rule.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "circumvent",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "avoid",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "circle",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "get around",
        "role": "distractor",
        "tier": "close",
        "rationale": "get around is a one-level-lower near answer; it is plausible but less precise than circumvent."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "circumvent"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: circumvent"
      ],
      "signal": "circumvent targets circumvent as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The merger will ___ three teams.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "consolidate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "combine",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "confirm",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "bring together",
        "role": "distractor",
        "tier": "close",
        "rationale": "bring together is a one-level-lower near answer; it is plausible but less precise than consolidate."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "consolidate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: consolidate"
      ],
      "signal": "consolidate targets consolidate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "academic_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We can ___ the author's position.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "infer",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "guess",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "refer",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "deduce",
        "role": "distractor",
        "tier": "close",
        "rationale": "deduce is a one-level-lower near answer; it is plausible but less precise than infer."
      },
      "estimated_difficulty": 0.73,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "infer"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: infer"
      ],
      "signal": "infer targets infer as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The budget will ___ funds differently.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "allocate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "give",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "locate",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "assign",
        "role": "distractor",
        "tier": "close",
        "rationale": "assign is a one-level-lower near answer; it is plausible but less precise than allocate."
      },
      "estimated_difficulty": 0.75,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "allocate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: allocate"
      ],
      "signal": "allocate targets allocate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "change_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The situation may ___ without action.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "deteriorate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "worsen",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "determine",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "get worse",
        "role": "distractor",
        "tier": "close",
        "rationale": "get worse is a one-level-lower near answer; it is plausible but less precise than deteriorate."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "deteriorate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: deteriorate"
      ],
      "signal": "deteriorate targets deteriorate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "precision_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The team will ___ the design.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "refine",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "improve",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "define",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "make more precise",
        "role": "distractor",
        "tier": "close",
        "rationale": "make more precise is a one-level-lower near answer; it is plausible but less precise than refine."
      },
      "estimated_difficulty": 0.74,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "refine"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: refine"
      ],
      "signal": "refine targets refine as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The benefits may ___ the risks.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "outweigh",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "beat",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "overweight",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "be greater than",
        "role": "distractor",
        "tier": "close",
        "rationale": "be greater than is a one-level-lower near answer; it is plausible but less precise than outweigh."
      },
      "estimated_difficulty": 0.77,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "outweigh"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: outweigh"
      ],
      "signal": "outweigh targets outweigh as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_011",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "academic_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The report may ___ key details.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "omit",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "miss",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "admit",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "leave out",
        "role": "distractor",
        "tier": "close",
        "rationale": "leave out is a one-level-lower near answer; it is plausible but less precise than omit."
      },
      "estimated_difficulty": 0.72,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "omit"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: omit"
      ],
      "signal": "omit targets omit as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_012",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Firms must ___ with the law.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "comply",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "agree",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "complete",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "follow",
        "role": "distractor",
        "tier": "close",
        "rationale": "follow is a one-level-lower near answer; it is plausible but less precise than comply."
      },
      "estimated_difficulty": 0.74,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "comply"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: comply"
      ],
      "signal": "comply targets comply as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_013",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "academic_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The estimate is ___ from old data.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "derived",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "taken",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "driven",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "obtained",
        "role": "distractor",
        "tier": "close",
        "rationale": "obtained is a one-level-lower near answer; it is plausible but less precise than derived."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "derive"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: derive"
      ],
      "signal": "derived targets derive as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_014",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "High costs may ___ future growth.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "constrain",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "limit",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "complain",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "restrict",
        "role": "distractor",
        "tier": "close",
        "rationale": "restrict is a one-level-lower near answer; it is plausible but less precise than constrain."
      },
      "estimated_difficulty": 0.77,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "constrain"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: constrain"
      ],
      "signal": "constrain targets constrain as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_015",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The tool will ___ collaboration.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "facilitate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "help",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "facility",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "make easier",
        "role": "distractor",
        "tier": "close",
        "rationale": "make easier is a one-level-lower near answer; it is plausible but less precise than facilitate."
      },
      "estimated_difficulty": 0.75,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "facilitate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: facilitate"
      ],
      "signal": "facilitate targets facilitate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_016",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "argumentation"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The article will ___ stricter rules.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "advocate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "support",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "advertise",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "argue for",
        "role": "distractor",
        "tier": "close",
        "rationale": "argue for is a one-level-lower near answer; it is plausible but less precise than advocate."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "advocate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: advocate"
      ],
      "signal": "advocate targets advocate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_017",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The dates appear to ___.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "coincide",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "match",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "connect",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "happen together",
        "role": "distractor",
        "tier": "close",
        "rationale": "happen together is a one-level-lower near answer; it is plausible but less precise than coincide."
      },
      "estimated_difficulty": 0.75,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "coincide"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: coincide"
      ],
      "signal": "coincide targets coincide as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_018",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "formal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Savings may ___ the extra cost.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "offset",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "balance",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "upset",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "counterbalance",
        "role": "distractor",
        "tier": "close",
        "rationale": "counterbalance is a one-level-lower near answer; it is plausible but less precise than offset."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "offset"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: offset"
      ],
      "signal": "offset targets offset as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_019",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "communication"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Could you ___ on that point?",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "elaborate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "explain",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "decorate",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "explain further",
        "role": "distractor",
        "tier": "close",
        "rationale": "explain further is a one-level-lower near answer; it is plausible but less precise than elaborate."
      },
      "estimated_difficulty": 0.73,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "elaborate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: elaborate"
      ],
      "signal": "elaborate targets elaborate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_vocab_020",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "vocab",
      "format": "gap_fill",
      "focus": [
        "planning"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We should ___ possible objections.",
      "prompt_lang": "en",
      "instruction_tr": "Anlamı seç.",
      "options": [
        {
          "id": "k",
          "text": "anticipate",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "expect",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "participate",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "foresee",
        "role": "distractor",
        "tier": "close",
        "rationale": "foresee is a one-level-lower near answer; it is plausible but less precise than anticipate."
      },
      "estimated_difficulty": 0.74,
      "estimated_discrimination": 0.86,
      "lexicon": [
        "anticipate"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "Oxford_5000: anticipate"
      ],
      "signal": "anticipate targets anticipate as a level-specific lexical signal.",
      "trap": {
        "lt": "This option is semantically close enough for Turkish learners to overgeneralize, but it is not the target meaning here.",
        "d": "This option is outside the target meaning area and checks broad recognition."
      }
    },
    {
      "id": "v2_c1_nat_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "academic_argument"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Akademik tartışmada bir iddianın çok genel kaldığını ve daha dikkatli sınırlandırılması gerektiğini söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The claim requires further qualification.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The claim needs to be qualified.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "The claim wants qualification more.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The claim needs further qualification.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.77,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "qualification"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_academic_argument"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "diplomatic_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Yöneticinin varsayımlarından emin değilsin; doğrudan karşı çıkmadan onları yeniden değerlendirmeyi öneriyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "Could we revisit those assumptions?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Might we revisit those assumptions?",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Your assumptions are not good.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could we look again at those assumptions?",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "assumptions"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_diplomatic_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "hedging"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir raporda mevcut kanıtların kesin bir sonuca varmak için yeterince güçlü olmadığını temkinli biçimde ifade ediyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The evidence remains somewhat inconclusive.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The evidence is still inconclusive.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Evidence stays a little not conclusive.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The evidence is not yet conclusive.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.79,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "inconclusive"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_hedging"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "precision_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Strateji toplantısında önerilen yaklaşımın beklenenin tersine zarar verebileceğini diplomatik biçimde söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "That approach may prove counterproductive.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "That approach might backfire.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "That way can make opposite productivity.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "That approach could end up being counterproductive.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.8,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "counterproductive"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_precision_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "academic_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Akademik bir özetin sonunda bulguların aşırı kesin yorumlanmaması gerektiğini belirtiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The findings should be interpreted cautiously.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The findings need cautious interpretation.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Findings must be interpreted with cautionly.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The findings should be treated with caution.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "interpret"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_academic_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "nuanced_stance"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Toplantıda bir öneriyi tamamen reddetmediğini, ama henüz net biçimde kabul de etmediğini söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I wouldn't rule it out entirely.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "I wouldn't dismiss it completely.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "I don't throw it out total.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I wouldn't rule it out completely.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.77,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "rule out"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_nuanced_stance"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "critical_review"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir makale eleştirisinde argümanın ikna edici olduğunu, fakat bazı iddiaların fazla ileri götürüldüğünü söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The argument is persuasive but overstated.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The argument is strong but exaggerated.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "The argument persuades but over-says.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The argument is convincing, but it goes too far.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "overstated"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_critical_review"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "policy_language"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir politika kararında iki fayda arasında yapılan fedakarlığın savunulmasının zor olduğunu açıklıyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The trade-off is difficult to justify.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The trade-off is hard to defend.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "The trade-off is hard for justify.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "It is difficult to justify that trade-off.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.79,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "trade-off"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_policy_language"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_009",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "research_register"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Bir araştırma toplantısında, çalışmanın küçük örneklem yüzünden daha geniş gruplara genellenemeyeceğini söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "The sample size limits generalizability.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The sample size limits the conclusions.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Sample size limits to generalize.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The small sample limits how far we can generalize.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.8,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "generalizability"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_research_register"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_nat_010",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "naturalness_judgment",
      "format": "choose_natural_sentence",
      "focus": [
        "formal_email"
      ],
      "skill_tags": [
        "pragmatic",
        "production"
      ],
      "prompt": "Üst düzey bir danışmandan aldığın geri bildirime cevap veriyorsun ve sonraki adım için ek yönlendirme istemeye açık olduğunu kibarca belirtiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "En doğal cümleyi seç.",
      "options": [
        {
          "id": "k",
          "text": "I would welcome any further guidance.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Any further guidance would be welcome.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "I would be happy for guidance.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I would appreciate any further guidance.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      },
      "estimated_difficulty": 0.76,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "guidance"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: naturalness_formal_email"
      ],
      "signal": "The item checks whether the learner recognizes the sentence that sounds natural in everyday English.",
      "scoring_style": "naturalness_judgment",
      "rationale": {
        "k": "Most natural and idiomatic in this context.",
        "w": "Understandable, but less natural or less idiomatic.",
        "nn": "Clearly non-native wording or structure.",
        "cc": "This is understandable and near the target, but it is less idiomatic or less precise than the key."
      }
    },
    {
      "id": "v2_c1_prag_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "executive_diplomacy"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Üst düzey toplantıda veride sorun fark ettin; hem saygılı hem net olmalısın.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Might we double-check those figures?",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Those figures look slightly off to me.",
          "role": "acceptable",
          "credit": 0.6,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Your figures are wrong.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "Could we revisit those figures?",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.79,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "figures"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_executive_diplomacy"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "nuanced_response"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir öneriyi tamamen reddetmeden şu an öncelik olmadığını belirtmek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "I wouldn't rule it out entirely.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "It may be worth revisiting later.",
          "role": "acceptable",
          "credit": 0.65,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "This is not relevant to us.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "I wouldn't dismiss it outright.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.8,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "rule out"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_nuanced_response"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "limitations"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Akademik sunumda çalışmanın kapsamını açıklıyorsun: bulgunun her durumu temsil etmediğini, ama ana eğilimi gösterdiğini söylemek istiyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "This does not capture every case.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "This is not perfect.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "It doesn't include all things.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "This only captures the main trend.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.81,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "capture"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_limitations"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "hedging"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir toplantıda bir iddianın fazla kesin söylendiğini düşünüyorsun; doğrudan reddetmeden daha temkinli ifade öneriyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "That may be putting it too strongly.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "That is too strong.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "You say it too much.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "That wording may be too strong.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "strongly"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_hedging"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "senior_register"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Kıdemli bir kişinin fikrine alternatif bir çerçeve sunuyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "Another way to frame it might be...",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "We might frame it slightly differently.",
          "role": "acceptable",
          "credit": 0.65,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "Your framing is wrong.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "We might frame it differently.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.79,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "frame"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_senior_register"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "evidence_language"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Belirsiz sonucu raporluyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "The evidence points in that direction.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "The evidence says yes.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "Evidence tells this way.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The evidence seems to suggest that.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.8,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "evidence"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_evidence_language"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_007",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "diplomatic_feedback"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Bir rapor taslağına üst düzey geri bildirim veriyorsun: mantığın güçlü olduğunu, fakat bazı adımların eksik kaldığını diplomatik biçimde söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "The reasoning is sound, but incomplete.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "Your reason is not enough.",
          "role": "weak",
          "credit": 0.3,
          "naturalness": "weak"
        },
        {
          "id": "nn",
          "text": "This logic misses parts.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "The reasoning is solid but limited.",
        "role": "weak",
        "credit": 0.3,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.81,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "reasoning"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_diplomatic_feedback"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_prag_008",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "pragmatic_choice",
      "format": "pragmatic_choice",
      "focus": [
        "strategic_delay"
      ],
      "skill_tags": [
        "pragmatic",
        "register"
      ],
      "prompt": "Kararın aceleye gelmemesi gerektiğini profesyonelce söylüyorsun.",
      "prompt_lang": "tr",
      "instruction_tr": "Duruma en uygun cevabı seç.",
      "options": [
        {
          "id": "k",
          "text": "It may be premature to decide today.",
          "role": "key",
          "credit": 1,
          "naturalness": "key"
        },
        {
          "id": "w",
          "text": "It might be too early to decide today.",
          "role": "acceptable",
          "credit": 0.65,
          "naturalness": "acceptable"
        },
        {
          "id": "nn",
          "text": "We should not decide because it is early.",
          "role": "nonnative",
          "credit": 0,
          "naturalness": "nonnative"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "It might be too early to decide.",
        "role": "acceptable",
        "credit": 0.6,
        "tier": "close",
        "rationale": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      },
      "estimated_difficulty": 0.78,
      "estimated_discrimination": 0.89,
      "lexicon": [
        "premature"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: pragmatic_strategic_delay"
      ],
      "signal": "The item checks whether the learner chooses the socially appropriate English response.",
      "scoring_style": "pragmatic_choice",
      "rationale": {
        "k": "Best match for the situation, tone, and register.",
        "w": "Communicatively possible, but less natural or less well-matched.",
        "nn": "Wrong communicative act, tone, or wording.",
        "cc": "This response is plausible for a learner one level lower, but the tone or register is less exact than the key."
      }
    },
    {
      "id": "v2_c1_coll_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "evaluation_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The proposal ___ considerable merit.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "has",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "carries",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "owns",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "holds",
        "role": "distractor",
        "tier": "close",
        "rationale": "holds is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.81,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "merit",
        "have"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_evaluation_collocations"
      ],
      "signal": "has is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_coll_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "academic_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The evidence ___ close scrutiny.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "warrants",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "wants",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "needs",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "deserves",
        "role": "distractor",
        "tier": "close",
        "rationale": "deserves is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.82,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "scrutiny",
        "warrant"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_academic_collocations"
      ],
      "signal": "warrants is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_coll_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "policy_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The policy ___ unintended consequences.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "entails",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "includes",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "makes",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "involves",
        "role": "distractor",
        "tier": "close",
        "rationale": "involves is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.83,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "consequences",
        "entail"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_policy_collocations"
      ],
      "signal": "entails is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_coll_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "argument_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The report ___ a distinction between them.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "draws",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "makes",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "does",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "establishes",
        "role": "distractor",
        "tier": "close",
        "rationale": "establishes is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.84,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "distinction",
        "draw"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_argument_collocations"
      ],
      "signal": "draws is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_coll_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "stance_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The plan ___ serious reservations.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "raises",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "lifts",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "makes",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "prompts",
        "role": "distractor",
        "tier": "close",
        "rationale": "prompts is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.85,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "reservations",
        "raise"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_stance_collocations"
      ],
      "signal": "raises is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_coll_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "collocation",
      "format": "gap_fill",
      "focus": [
        "evidence_collocations",
        "L1_trap_turkish"
      ],
      "skill_tags": [
        "collocation"
      ],
      "prompt": "The data ___ a different interpretation.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan ifadeyi seç.",
      "options": [
        {
          "id": "k",
          "text": "supports",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "holds",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "gives",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "lends support to",
        "role": "distractor",
        "tier": "close",
        "rationale": "lends support to is semantically close and may work in related contexts, but it is not the best collocation here."
      },
      "estimated_difficulty": 0.86,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "interpretation",
        "support"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: collocation_evidence_collocations"
      ],
      "signal": "supports is the natural collocation in this sentence.",
      "trap": {
        "lt": "This reflects a likely Turkish transfer or do/make/give/take overgeneralization.",
        "d": "This word does not naturally collocate with the noun in this context."
      }
    },
    {
      "id": "v2_c1_phr_001",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "formal_phrasals",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The new facts call ___ a review.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "for",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "to",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "up",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "require",
        "role": "distractor",
        "tier": "close",
        "rationale": "require is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.82,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "call",
        "review"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_formal_phrasals"
      ],
      "signal": "for completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_phr_002",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "argumentation",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The argument hinges ___ one assumption.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "on",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "in",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "at",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "depends on",
        "role": "distractor",
        "tier": "close",
        "rationale": "depends on is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.83,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "hinge",
        "assumption"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_argumentation"
      ],
      "signal": "on completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_phr_003",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "formal_phrasals",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The proposal runs ___ the guidelines.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "counter to",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "opposite",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "over",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "against",
        "role": "distractor",
        "tier": "close",
        "rationale": "against is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.84,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "run",
        "guidelines"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_formal_phrasals"
      ],
      "signal": "counter to completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_phr_004",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "analysis",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "We need to factor ___ hidden costs.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "in",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "inside",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "up",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "include",
        "role": "distractor",
        "tier": "close",
        "rationale": "include is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.85,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "factor",
        "costs"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_analysis"
      ],
      "signal": "in completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_phr_005",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "formal_phrasals",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "The report bears ___ closer inspection.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "on",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "to",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "over",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "relates to",
        "role": "distractor",
        "tier": "close",
        "rationale": "relates to is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.86,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "bear",
        "inspection"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_formal_phrasals"
      ],
      "signal": "on completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    },
    {
      "id": "v2_c1_phr_006",
      "source_collection": "diagnostic_v2",
      "cefr_level": "C1",
      "boundary": "B2/C1",
      "type": "phrasal_verb",
      "format": "complete_sentence",
      "focus": [
        "logic",
        "phrasal_verbs"
      ],
      "skill_tags": [
        "recognition"
      ],
      "prompt": "Her account does not add ___.",
      "prompt_lang": "en",
      "instruction_tr": "Cümleyi doğal tamamlayan parçacığı seç.",
      "options": [
        {
          "id": "k",
          "text": "up",
          "role": "key"
        },
        {
          "id": "lt",
          "text": "on",
          "role": "l1_trap"
        },
        {
          "id": "d",
          "text": "out",
          "role": "distractor"
        }
      ],
      "correctId": "k",
      "close_competitor": {
        "id": "cc",
        "text": "make sense",
        "role": "distractor",
        "tier": "close",
        "rationale": "make sense is close in meaning or appears in a related expression, but it is not the target phrasal verb here."
      },
      "estimated_difficulty": 0.87,
      "estimated_discrimination": 0.88,
      "lexicon": [
        "add",
        "account"
      ],
      "distractor_distance": "tight",
      "source_grounding": [
        "CEFR_C1: phrasal_logic"
      ],
      "signal": "up completes the phrasal verb naturally in context.",
      "trap": {
        "lt": "This particle or single-word transfer is plausible from Turkish but wrong in this phrasal verb.",
        "d": "This particle forms a different or impossible expression in this context."
      }
    }
  ]
};
