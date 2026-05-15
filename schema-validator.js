(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.NektarSchemaValidator = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const VALID_BOUNDARIES = ["A1/A2", "A2/B1", "B1/B2", "B2/C1"];
  const VALID_TYPES = [
    "vocab",
    "grammar",
    "idiom",
    "collocation",
    "function",
    "phrasal_verb",
    "natural_speech",
    "spoken_chunk",
    "discourse_marker",
    "sentence_building",
    "naturalness_judgment",
    "pragmatic_choice"
  ];
  const VALID_FORMATS = [
    "meaning_tr_en",
    "gap_fill",
    "complete_sentence",
    "choose_natural_sentence",
    "idiom_meaning",
    "collocation_choice",
    "function_choice",
    "situation_choice",
    "dialogue_response",
    "naturalness_judgment",
    "pragmatic_choice"
  ];
  const VALID_DISTANCES = ["far", "medium", "near", "loose", "tight"];
  const REQUIRED_ROLES = ["key", "l1_trap", "developmental_error"];
  const V2_NON_NATURALNESS_ROLES = ["key", "distractor", "l1_trap", "developmental_error"];
  const VALID_SCORING_STYLES = ["role_based", "naturalness_judgment", "pragmatic_choice"];
  const NATURALNESS_ROLES = ["key", "acceptable", "weak", "nonnative", "weak_nonnative", "l1_trap", "developmental_error", "distractor"];
  const ABSOLUTE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const PLC_ID = /^plc_(a1a2|a2b1|b1b2|b2c1)_\d{3}$/;
  const GEN_ID = /^gen_(a1a2|a2b1|b1b2|b2c1)_[a-z]+(?:_[a-z]+)*_\d{3}$/;
  const V2_ID = /^v2_(a1|a2|b1|b2|c1)_(vocab|nat|prag|coll|phr)_\d{3}$/;
  const COMPACT = { "A1/A2": "a1a2", "A2/B1": "a2b1", "B1/B2": "b1b2", "B2/C1": "b2c1" };
  const V2_LEVEL_BOUNDARY = { a1: "A1/A2", a2: "A1/A2", b1: "A2/B1", b2: "B1/B2", c1: "B2/C1" };

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function isNonEmptyTextArray(value) {
    return Array.isArray(value) && value.some(hasText);
  }

  function countBy(items, getter) {
    return items.reduce((acc, item) => {
      const key = getter(item) || "missing";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function addIssue(issues, severity, code, message, path, details) {
    issues.push({ severity, code, message, path, details: details || null });
  }

  function normalizePayload(payload, options) {
    const sourceLabel = options?.sourceLabel || "unknown";
    if (Array.isArray(payload)) {
      return { ok: true, sourceLabel, inputShape: "plain_array", items: payload, content: { items: payload } };
    }
    if (!isObject(payload)) {
      return { ok: false, sourceLabel, inputShape: typeof payload, items: [], error: "Input must be an item array or an object containing items." };
    }
    if (Array.isArray(payload.items)) {
      return { ok: true, sourceLabel, inputShape: "object.items", items: payload.items, content: payload };
    }
    if (isObject(payload.NEKTAR_PLACEMENT_CONTENT) && Array.isArray(payload.NEKTAR_PLACEMENT_CONTENT.items)) {
      return {
        ok: true,
        sourceLabel,
        inputShape: "object.NEKTAR_PLACEMENT_CONTENT.items",
        items: payload.NEKTAR_PLACEMENT_CONTENT.items,
        content: payload.NEKTAR_PLACEMENT_CONTENT
      };
    }
    if (isObject(payload.NEKTAR_PLACEMENT_CONTENT_V2) && Array.isArray(payload.NEKTAR_PLACEMENT_CONTENT_V2.items)) {
      return {
        ok: true,
        sourceLabel,
        inputShape: "object.NEKTAR_PLACEMENT_CONTENT_V2.items",
        items: payload.NEKTAR_PLACEMENT_CONTENT_V2.items,
        content: payload.NEKTAR_PLACEMENT_CONTENT_V2
      };
    }
    if (isObject(payload.window) && isObject(payload.window.NEKTAR_PLACEMENT_CONTENT) && Array.isArray(payload.window.NEKTAR_PLACEMENT_CONTENT.items)) {
      return {
        ok: true,
        sourceLabel,
        inputShape: "object.window.NEKTAR_PLACEMENT_CONTENT.items",
        items: payload.window.NEKTAR_PLACEMENT_CONTENT.items,
        content: payload.window.NEKTAR_PLACEMENT_CONTENT
      };
    }
    if (isObject(payload.window) && isObject(payload.window.NEKTAR_PLACEMENT_CONTENT_V2) && Array.isArray(payload.window.NEKTAR_PLACEMENT_CONTENT_V2.items)) {
      return {
        ok: true,
        sourceLabel,
        inputShape: "object.window.NEKTAR_PLACEMENT_CONTENT_V2.items",
        items: payload.window.NEKTAR_PLACEMENT_CONTENT_V2.items,
        content: payload.window.NEKTAR_PLACEMENT_CONTENT_V2
      };
    }
    return { ok: false, sourceLabel, inputShape: "object", items: [], error: "No items array found." };
  }

  function parsePoolText(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return { ok: false, error: "File is empty." };
    try {
      return { ok: true, value: JSON.parse(trimmed), parser: "json" };
    } catch (jsonError) {
      if (!trimmed.includes("NEKTAR_PLACEMENT_CONTENT")) {
        return { ok: false, error: `JSON parse failed: ${jsonError.message}` };
      }
      try {
        const sandboxWindow = {};
        const value = new Function("window", `${trimmed}; return window.NEKTAR_PLACEMENT_CONTENT || window.NEKTAR_PLACEMENT_CONTENT_V2;`)(sandboxWindow);
        return { ok: true, value, parser: "window_assignment" };
      } catch (scriptError) {
        return { ok: false, error: `Could not read window.NEKTAR_PLACEMENT_CONTENT assignment: ${scriptError.message}` };
      }
    }
  }

  function validatePayload(payload, options) {
    const normalized = normalizePayload(payload, options);
    if (!normalized.ok) {
      return {
        generatedAt: new Date().toISOString(),
        sourceLabel: normalized.sourceLabel,
        inputShape: normalized.inputShape,
        summary: { totalItems: 0, validItems: 0, invalidItems: 0, errorCount: 1, warningCount: 0 },
        counts: { boundary: {}, type: {}, format: {}, distractorDistance: {}, issueCode: { INPUT_NOT_NORMALIZED: 1 } },
        items: [],
        issues: [{
          severity: "error",
          code: "INPUT_NOT_NORMALIZED",
          message: normalized.error,
          path: "$",
          details: null
        }]
      };
    }

    const idCounts = normalized.items.reduce((acc, item) => {
      if (isObject(item) && hasText(item.id)) acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});

    const itemReports = normalized.items.map((item, index) => validateItem(item, index, idCounts));
    const poolIssues = validatePoolBalance(normalized.items);
    const flatIssues = itemReports.flatMap((itemReport) =>
      itemReport.issues.map((issue) => ({
        ...issue,
        itemId: itemReport.id,
        index: itemReport.index,
        boundary: itemReport.boundary,
        type: itemReport.type
      }))
    ).concat(poolIssues);
    const errorCount = flatIssues.filter((issue) => issue.severity === "error").length;
    const warningCount = flatIssues.filter((issue) => issue.severity === "warning").length;

    return {
      generatedAt: new Date().toISOString(),
      sourceLabel: normalized.sourceLabel,
      inputShape: normalized.inputShape,
      summary: {
        totalItems: normalized.items.length,
        validItems: itemReports.filter((itemReport) => itemReport.errorCount === 0).length,
        invalidItems: itemReports.filter((itemReport) => itemReport.errorCount > 0).length,
        errorCount,
        warningCount
      },
      counts: {
        boundary: countBy(normalized.items, (item) => isObject(item) ? item.boundary : null),
        type: countBy(normalized.items, (item) => isObject(item) ? item.type : null),
        format: countBy(normalized.items, (item) => isObject(item) ? item.format : null),
        distractorDistance: countBy(normalized.items, (item) => isObject(item) ? item.distractor_distance : null),
        issueCode: countBy(flatIssues, (issue) => issue.code)
      },
      items: itemReports,
      issues: flatIssues
    };
  }

  function validateItem(item, index, idCounts) {
    const issues = [];
    const label = isObject(item) && hasText(item.id) ? item.id : `item_${String(index + 1).padStart(3, "0")}`;

    if (!isObject(item)) {
      addIssue(issues, "error", "ITEM_NOT_OBJECT", "Item must be an object.", `$[${index}]`);
      return summarizeItem(index, label, null, null, issues);
    }

    validateId(item, index, idCounts, issues);
    validateBoundary(item, index, issues);
    validateFieldEnums(item, index, issues);
    validateArrays(item, index, issues);
    validateTextFields(item, index, issues);
    validateOptions(item, index, issues);
    validateCloseCompetitor(item, index, issues);
    validateNumbers(item, index, issues);
    validateNoC2(item, index, issues);
    validateFunctionQuality(item, index, issues);
    validateFamilyMigration(item, index, issues);

    return summarizeItem(index, label, item.boundary || null, item.type || null, issues);
  }

  function summarizeItem(index, id, boundary, type, issues) {
    return {
      index,
      id,
      boundary,
      type,
      valid: issues.every((issue) => issue.severity !== "error"),
      errorCount: issues.filter((issue) => issue.severity === "error").length,
      warningCount: issues.filter((issue) => issue.severity === "warning").length,
      issues
    };
  }

  function validateId(item, index, idCounts, issues) {
    if (!hasText(item.id)) {
      addIssue(issues, "error", "MISSING_ID", "Missing id.", `$[${index}].id`);
      return;
    }
    if (idCounts[item.id] > 1) {
      addIssue(issues, "error", "DUPLICATE_ID", `Duplicate id "${item.id}".`, `$[${index}].id`);
    }
    const plcMatch = item.id.match(PLC_ID);
    const genMatch = item.id.match(GEN_ID);
    const v2Match = item.id.match(V2_ID);
    if (!plcMatch && !genMatch && !v2Match) {
      addIssue(issues, "error", "INVALID_ID_FORMAT", "ID must be plc_<boundary>_<###>, gen_<boundary>_<type>_<###>, or v2_<level>_<type>_<###>.", `$[${index}].id`);
      return;
    }
    if (v2Match) {
      const expectedBoundary = V2_LEVEL_BOUNDARY[v2Match[1]];
      if (VALID_BOUNDARIES.includes(item.boundary) && item.boundary !== expectedBoundary) {
        addIssue(issues, "error", "V2_ID_BOUNDARY_MISMATCH", "V2 item boundary does not match its level prefix.", `$[${index}].id`, { expectedBoundary });
      }
      return;
    }
    if (VALID_BOUNDARIES.includes(item.boundary)) {
      const idCompact = (plcMatch || genMatch)[1];
      if (idCompact !== COMPACT[item.boundary]) {
        addIssue(issues, "error", "ID_BOUNDARY_MISMATCH", "ID boundary compact does not match item.boundary.", `$[${index}].id`);
      }
    }
  }

  function validateBoundary(item, index, issues) {
    if (!hasText(item.boundary)) {
      addIssue(issues, "error", "MISSING_BOUNDARY", "Missing boundary.", `$[${index}].boundary`);
      if (hasAbsoluteLevelMetadata(item)) {
        addIssue(issues, "error", "ABSOLUTE_LEVEL_ONLY", "Item has absolute level metadata but no boundary.", `$[${index}]`);
      }
      return;
    }
    if (ABSOLUTE_LEVELS.includes(item.boundary)) {
      addIssue(issues, "error", "ABSOLUTE_LEVEL_BOUNDARY", "Boundary must be adjacent-level form, not an absolute CEFR level.", `$[${index}].boundary`);
      return;
    }
    if (item.boundary.includes("C2")) {
      addIssue(issues, "error", "C2_BOUNDARY", "C2 boundary is out of scope for v1.", `$[${index}].boundary`);
      return;
    }
    if (!VALID_BOUNDARIES.includes(item.boundary)) {
      addIssue(issues, "error", "INVALID_BOUNDARY", "Invalid boundary value.", `$[${index}].boundary`);
    }
  }

  function validateFieldEnums(item, index, issues) {
    if (!hasText(item.type)) {
      addIssue(issues, "error", "MISSING_TYPE", "Missing type.", `$[${index}].type`);
    } else if (!VALID_TYPES.includes(item.type)) {
      addIssue(issues, "error", "INVALID_TYPE", "Invalid item type for v1.", `$[${index}].type`);
    }

    if (!hasText(item.format)) {
      addIssue(issues, "error", "MISSING_FORMAT", "Missing format.", `$[${index}].format`);
    } else if (!VALID_FORMATS.includes(item.format)) {
      addIssue(issues, "warning", "UNKNOWN_FORMAT", "Format is not in the suggested v1 list.", `$[${index}].format`);
    }

    if (!hasText(item.distractor_distance)) {
      addIssue(issues, "error", "MISSING_DISTRACTOR_DISTANCE", "Missing distractor_distance.", `$[${index}].distractor_distance`);
    } else if (!VALID_DISTANCES.includes(item.distractor_distance)) {
      addIssue(issues, "error", "INVALID_DISTRACTOR_DISTANCE", "Invalid distractor_distance.", `$[${index}].distractor_distance`);
    }

    if (item.scoring_style !== undefined && (!hasText(item.scoring_style) || !VALID_SCORING_STYLES.includes(item.scoring_style))) {
      addIssue(issues, "error", "INVALID_SCORING_STYLE", "scoring_style must be role_based, naturalness_judgment, or pragmatic_choice.", `$[${index}].scoring_style`);
    }
  }

  function validateArrays(item, index, issues) {
    if (!isNonEmptyTextArray(item.focus)) {
      addIssue(issues, "error", "MISSING_FOCUS", "focus must be a non-empty array.", `$[${index}].focus`);
    }
    if (!isNonEmptyTextArray(item.skill_tags)) {
      addIssue(issues, "error", "MISSING_SKILL_TAGS", "skill_tags must be a non-empty array.", `$[${index}].skill_tags`);
    }
    if (!Array.isArray(item.lexicon)) {
      addIssue(issues, "error", "MISSING_LEXICON", "lexicon must be present as an array.", `$[${index}].lexicon`);
    } else if (!item.lexicon.some(hasText)) {
      addIssue(issues, "warning", "EMPTY_LEXICON", "lexicon is present but empty.", `$[${index}].lexicon`);
    }
    if (!isNonEmptyTextArray(item.source_grounding)) {
      addIssue(issues, "error", "MISSING_SOURCE_GROUNDING", "source_grounding must be a non-empty array.", `$[${index}].source_grounding`);
    }
  }

  function validateTextFields(item, index, issues) {
    if (!hasText(item.prompt)) {
      addIssue(issues, "error", "MISSING_PROMPT", "Missing prompt.", `$[${index}].prompt`);
    }
    if (!hasText(item.prompt_lang)) {
      addIssue(issues, "error", "MISSING_PROMPT_LANG", "Missing prompt_lang.", `$[${index}].prompt_lang`);
    }
    if (!hasText(item.instruction_tr)) {
      addIssue(issues, "error", "MISSING_INSTRUCTION_TR", "Missing instruction_tr.", `$[${index}].instruction_tr`);
    }
    if (!hasText(item.signal)) {
      addIssue(issues, "error", "MISSING_SIGNAL", "Missing signal.", `$[${index}].signal`);
    }
  }

  function validateOptions(item, index, issues) {
    if (!Array.isArray(item.options)) {
      addIssue(issues, "error", "MISSING_OPTIONS", "options must be an array.", `$[${index}].options`);
      return;
    }
    if (item.options.length !== 3) {
      addIssue(issues, "error", "OPTION_COUNT", "Item must have exactly 3 options.", `$[${index}].options`, { count: item.options.length });
    }

    const naturalness = isNaturalnessScoredItem(item);
    const v2 = isV2Item(item);
    const roleCounts = {};
    const optionById = {};
    let fullCreditCount = 0;
    item.options.forEach((option, optionIndex) => {
      const optionPath = `$[${index}].options[${optionIndex}]`;
      if (!isObject(option)) {
        addIssue(issues, "error", "OPTION_NOT_OBJECT", "Option must be an object.", optionPath);
        return;
      }
      if (!hasText(option.id)) {
        addIssue(issues, "error", "OPTION_MISSING_ID", "Option missing id.", `${optionPath}.id`);
      } else {
        optionById[option.id] = option;
      }
      if (!hasText(option.text)) {
        addIssue(issues, "error", "OPTION_MISSING_TEXT", "Option missing text.", `${optionPath}.text`);
      }
      validateOptionCredit(option, optionPath, issues);
      const credit = effectiveOptionCredit(option);
      if (credit >= 1) fullCreditCount += 1;

      if (!hasText(option.role)) {
        if (naturalness && hasCreditMetadata(option)) {
          return;
        }
        addIssue(issues, "error", naturalness ? "OPTION_MISSING_ROLE_OR_CREDIT" : "OPTION_MISSING_ROLE", naturalness ? "Naturalness option must have role or credit/score." : "Option missing role.", `${optionPath}.role`);
      } else {
        roleCounts[option.role] = (roleCounts[option.role] || 0) + 1;
        const allowedRoles = naturalness ? NATURALNESS_ROLES : v2 ? V2_NON_NATURALNESS_ROLES : REQUIRED_ROLES;
        if (!allowedRoles.includes(option.role)) {
          addIssue(issues, "error", naturalness ? "INVALID_NATURALNESS_OPTION_ROLE" : "INVALID_OPTION_ROLE", "Option role is not allowed for this scoring style.", `${optionPath}.role`);
        }
      }
    });

    if (naturalness) {
      if (fullCreditCount !== 1) {
        addIssue(issues, "error", "NATURALNESS_FULL_CREDIT_COUNT", "Naturalness/pragmatic scoring items must have exactly one full-credit option.", `$[${index}].options`, { count: fullCreditCount });
      }
    } else {
      if (v2) {
        if ((roleCounts.key || 0) !== 1) {
          addIssue(issues, "error", "ROLE_COUNT_KEY", "V2 item must have exactly one key option.", `$[${index}].options`, { count: roleCounts.key || 0 });
        }
        if ((roleCounts.distractor || 0) < 1) {
          addIssue(issues, "error", "V2_MISSING_SWAPPABLE_DISTRACTOR", "V2 item needs at least one plain distractor so close_competitor can swap in.", `$[${index}].options`);
        }
        const nonKeyCount = item.options.filter((option) => isObject(option) && option.role !== "key").length;
        if (nonKeyCount !== 2) {
          addIssue(issues, "error", "V2_NON_KEY_COUNT", "V2 item must have exactly two non-key options.", `$[${index}].options`, { count: nonKeyCount });
        }
      } else {
        REQUIRED_ROLES.forEach((role) => {
          if ((roleCounts[role] || 0) !== 1) {
            addIssue(issues, "error", `ROLE_COUNT_${role.toUpperCase()}`, `Item must have exactly one ${role} option.`, `$[${index}].options`, { count: roleCounts[role] || 0 });
          }
        });
      }
    }

    if (!hasText(item.correctId)) {
      addIssue(issues, "error", "MISSING_CORRECT_ID", "Missing correctId.", `$[${index}].correctId`);
    } else if (!optionById[item.correctId]) {
      addIssue(issues, "error", "CORRECT_ID_NOT_FOUND", "correctId does not point to an option.", `$[${index}].correctId`);
    } else if (naturalness && effectiveOptionCredit(optionById[item.correctId]) < 1) {
      addIssue(issues, "error", "CORRECT_ID_NOT_FULL_CREDIT", "correctId must point to the full-credit option.", `$[${index}].correctId`);
    } else if (!naturalness && optionById[item.correctId].role !== "key") {
      addIssue(issues, "error", "CORRECT_ID_NOT_KEY", "correctId must point to the key option.", `$[${index}].correctId`);
    }

    if (naturalness) validateNaturalnessExplanations(item, index, issues);
    else validateTrapExplanations(item, index, issues);
  }

  function validateTrapExplanations(item, index, issues) {
    if (!isObject(item.trap)) {
      addIssue(issues, "error", "MISSING_TRAP", "trap must contain explanations for both distractors.", `$[${index}].trap`);
      return;
    }
    for (const option of item.options || []) {
      if (!isObject(option) || option.role === "key") continue;
      if (["l1_trap", "developmental_error"].includes(option.role) && !hasText(item.trap[option.id])) {
        addIssue(issues, "error", "MISSING_TRAP_EXPLANATION", `Missing trap explanation for ${option.role} option "${option.id}".`, `$[${index}].trap.${option.id}`);
      }
    }
  }

  function validateCloseCompetitor(item, index, issues) {
    if (!isV2Item(item)) return;
    const cc = item.close_competitor;
    if (!isObject(cc)) {
      addIssue(issues, "error", "V2_MISSING_CLOSE_COMPETITOR", "V2 item must include close_competitor.", `$[${index}].close_competitor`);
      return;
    }
    if (!hasText(cc.id)) addIssue(issues, "error", "V2_CLOSE_COMPETITOR_MISSING_ID", "close_competitor must have id.", `$[${index}].close_competitor.id`);
    if (!hasText(cc.text)) addIssue(issues, "error", "V2_CLOSE_COMPETITOR_MISSING_TEXT", "close_competitor must have text.", `$[${index}].close_competitor.text`);
    if (!hasText(cc.role) || cc.role === "key") addIssue(issues, "error", "V2_CLOSE_COMPETITOR_ROLE", "close_competitor role must be non-key.", `$[${index}].close_competitor.role`);
    if (cc.tier !== "close") addIssue(issues, "error", "V2_CLOSE_COMPETITOR_TIER", "close_competitor tier must be close.", `$[${index}].close_competitor.tier`);
    if (!hasText(cc.rationale)) addIssue(issues, "error", "V2_CLOSE_COMPETITOR_RATIONALE", "close_competitor must include rationale.", `$[${index}].close_competitor.rationale`);
    const optionIds = new Set((item.options || []).map((option) => isObject(option) ? option.id : null));
    if (optionIds.has(cc.id)) addIssue(issues, "error", "V2_CLOSE_COMPETITOR_ID_COLLISION", "close_competitor id must not collide with option ids.", `$[${index}].close_competitor.id`);
    const optionTexts = new Set((item.options || []).map((option) => isObject(option) ? String(option.text || "").trim().toLowerCase() : ""));
    if (optionTexts.has(String(cc.text || "").trim().toLowerCase())) {
      addIssue(issues, "error", "V2_CLOSE_COMPETITOR_TEXT_COLLISION", "close_competitor text must not duplicate a visible option.", `$[${index}].close_competitor.text`);
    }
  }

  function validateNaturalnessExplanations(item, index, issues) {
    if (!isObject(item.trap) && !isObject(item.rationale) && !isObject(item.feedback)) {
      addIssue(issues, "warning", "MISSING_NATURALNESS_EXPLANATIONS", "Naturalness/pragmatic items should include trap, rationale, or feedback explanations for partial-credit options.", `$[${index}]`);
    }
  }

  function isNaturalnessScoredItem(item) {
    if (!isObject(item)) return false;
    if (["naturalness_judgment", "pragmatic_choice"].includes(item.scoring_style)) return true;
    if (["naturalness_judgment", "pragmatic_choice"].includes(item.format)) return true;
    if (["naturalness_judgment", "pragmatic_choice"].includes(item.type)) return true;
    return (item.options || []).some(hasCreditMetadata);
  }

  function hasCreditMetadata(option) {
    return isObject(option) && (option.credit !== undefined || option.score !== undefined);
  }

  function isV2Item(item) {
    return isObject(item) && hasText(item.id) && V2_ID.test(item.id);
  }

  function validateOptionCredit(option, optionPath, issues) {
    if (!isObject(option)) return;
    const creditFields = ["credit", "score"].filter((field) => option[field] !== undefined);
    for (const field of creditFields) {
      if (typeof option[field] !== "number" || !Number.isFinite(option[field])) {
        addIssue(issues, "error", `OPTION_INVALID_${field.toUpperCase()}`, `${field} must be a numeric value from 0 to 1.`, `${optionPath}.${field}`);
      } else if (option[field] < 0 || option[field] > 1) {
        addIssue(issues, "error", `OPTION_${field.toUpperCase()}_OUT_OF_RANGE`, `${field} must be between 0 and 1.`, `${optionPath}.${field}`, { value: option[field] });
      }
    }
    if (Number.isFinite(option.credit) && Number.isFinite(option.score) && Math.abs(option.credit - option.score) > 0.001) {
      addIssue(issues, "warning", "OPTION_CREDIT_SCORE_MISMATCH", "credit and score are both present but differ; the engine will use credit first.", optionPath, { credit: option.credit, score: option.score });
    }
  }

  function effectiveOptionCredit(option) {
    if (!isObject(option)) return 0;
    if (Number.isFinite(option.credit)) return clamp(option.credit, 0, 1);
    if (Number.isFinite(option.score)) return clamp(option.score, 0, 1);
    return option.role === "key" ? 1 : 0;
  }

  function validateNumbers(item, index, issues) {
    validateNumberField(item, index, issues, "estimated_difficulty");
    validateNumberField(item, index, issues, "estimated_discrimination");
    if (isV2Item(item) && Number.isFinite(item.estimated_discrimination) && item.estimated_discrimination < 0.7) {
      addIssue(issues, "error", "V2_LOW_DISCRIMINATION", "V2 diagnostic items must have estimated_discrimination >= 0.70.", `$[${index}].estimated_discrimination`);
    }
  }

  function validateNumberField(item, index, issues, field) {
    if (typeof item[field] !== "number" || !Number.isFinite(item[field])) {
      addIssue(issues, "error", `INVALID_${field.toUpperCase()}`, `${field} must be numeric.`, `$[${index}].${field}`);
      return;
    }
    if (item[field] < 0 || item[field] > 1) {
      addIssue(issues, "warning", `${field.toUpperCase()}_OUT_OF_RANGE`, `${field} is numeric but outside the expected 0-1 range.`, `$[${index}].${field}`);
    }
  }

  function validateNoC2(item, index, issues) {
    const hits = [];
    scanForC2(item, `$[${index}]`, hits);
    hits.forEach((hit) => {
      addIssue(issues, "error", "C2_REFERENCE", "C2 is out of scope for v1.", hit.path, { value: hit.value });
    });
  }

  function validateFunctionQuality(item, index, issues) {
    if (item.type !== "function") return;
    const prompt = String(item.prompt || "").trim();
    const lower = prompt.toLowerCase();
    const words = prompt.split(/\s+/).filter(Boolean);
    if (words.length < 10) {
      addIssue(issues, "warning", "FUNCTION_PROMPT_TOO_SHORT", "Function prompt is too short to establish a real communicative situation.", `$[${index}].prompt`);
    }
    if (isMetaFunctionPrompt(lower)) {
      addIssue(issues, "warning", "FUNCTION_PROMPT_IS_META_INSTRUCTION", "Function prompt is a task label rather than a communicative situation.", `$[${index}].prompt`);
    }
    if (!hasSpeakerCue(lower)) {
      addIssue(issues, "warning", "FUNCTION_PROMPT_MISSING_SPEAKER", "Function prompt should clarify who is speaking or writing.", `$[${index}].prompt`);
    }
    if (!hasListenerCue(lower)) {
      addIssue(issues, "warning", "FUNCTION_PROMPT_MISSING_LISTENER", "Function prompt should clarify the listener or reader.", `$[${index}].prompt`);
    }
    if (!hasRegisterCue(lower)) {
      addIssue(issues, "warning", "FUNCTION_PROMPT_MISSING_REGISTER", "Function prompt should include setting, medium, relationship, or register.", `$[${index}].prompt`);
    }
    if (hasCartoonRudeDistractor(item)) {
      addIssue(issues, "warning", "FUNCTION_CARTOON_RUDE_DISTRACTOR", "Function distractor looks cartoonishly rude rather than diagnostically useful.", `$[${index}].options`);
    }
  }

  function validateFamilyMigration(item, index, issues) {
    if (isV2Item(item)) return;
    if (item.family_id || item.stem_variants || item.option_variants) return;
    addIssue(issues, "warning", "SINGLE_ITEM_NO_VARIANTS", "Legacy single item has no item-family stem/option variants yet.", `$[${index}]`);
  }

  function validatePoolBalance(items) {
    const issues = [];
    const itemObjects = items.filter(isObject);
    const vocabByBoundary = {};
    const uniqueLexiconByBoundary = {};
    let directVocabCount = 0;
    for (const item of itemObjects) {
      vocabByBoundary[item.boundary] ||= 0;
      uniqueLexiconByBoundary[item.boundary] ||= new Set();
      if (item.type === "vocab") {
        vocabByBoundary[item.boundary] += 1;
        if (item.format === "meaning_tr_en") directVocabCount += 1;
        (item.lexicon || []).forEach((entry) => uniqueLexiconByBoundary[item.boundary].add(String(entry).toLowerCase()));
      }
    }
    VALID_BOUNDARIES.forEach((boundary) => {
      const unique = uniqueLexiconByBoundary[boundary]?.size || 0;
      if (unique > 0 && unique < 100) {
        issues.push({
          severity: "warning",
          code: "LEXICAL_POOL_MIN_100_PER_BAND",
          message: `${boundary} has ${unique} unique lexical entries; target is 100+ active Oxford lemmas per band.`,
          path: "$.items",
          details: { boundary, unique }
        });
      }
    });
    const idiomCount = itemObjects.filter((item) => item.type === "idiom").length;
    const naturalSpeechCount = itemObjects.filter((item) => ["natural_speech", "spoken_chunk", "discourse_marker", "pragmatic_choice", "naturalness_judgment"].includes(item.type)).length;
    if (idiomCount > 0 && idiomCount < 60) {
      issues.push({ severity: "warning", code: "IDIOM_POOL_TOO_SMALL", message: `Idiom/expression pool has ${idiomCount} active items; target is 60+ families.`, path: "$.items", details: { idiomCount } });
    }
    if (naturalSpeechCount < 80) {
      issues.push({ severity: "warning", code: "NATURAL_SPEECH_POOL_TOO_SMALL", message: `Natural speech pool has ${naturalSpeechCount} active items; target is 80+ families.`, path: "$.items", details: { naturalSpeechCount } });
    }
    if (itemObjects.length && directVocabCount / itemObjects.length > 0.35) {
      issues.push({ severity: "warning", code: "DIRECT_TRANSLATION_OVERWEIGHT", message: "Direct translation vocabulary appears overweighted for placement.", path: "$.items", details: { directVocabCount, total: itemObjects.length } });
    }
    return issues.map((issue) => ({ ...issue, itemId: "POOL", index: null, boundary: null, type: "pool" }));
  }

  function isMetaFunctionPrompt(lower) {
    return [
      "you avoid sounding too direct",
      "you want to be polite",
      "you make a suggestion",
      "you refuse politely",
      "you ask for help",
      "you qualify a strong claim",
      "you summarize a consequence",
      "you express disagreement",
      "you suggest lunch",
      "someone asks for a suggestion",
      "you advise studying",
      "you recommend a book"
    ].some((phrase) => lower.includes(phrase));
  }

  function hasSpeakerCue(lower) {
    return /\byou are\b|\byour\b|\ba friend\b|\bcolleague\b|\bclassmate\b|\bteacher\b|\bmanager\b|\bwaiter\b|\bcustomer\b|\bcashier\b|\bpassenger\b|\bteam\b|\bstaff\b|\bsupervisor\b|\btutor\b|\bemailing\b|\bwriting\b|\bspeaking\b|\bpresenting\b|\bpreparing\b|\bediting\b/.test(lower);
  }

  function hasListenerCue(lower) {
    return /\bto\b|\basks?\b|\bfriend\b|\bcolleague\b|\bclassmate\b|\bteacher\b|\bmanager\b|\bwaiter\b|\bcashier\b|\bpassenger\b|\breader\b|\baudience\b|\bteammate\b|\bstudent\b|\bstaff\b|\bsupervisor\b|\btutor\b|\bresearch team\b/.test(lower);
  }

  function hasRegisterCue(lower) {
    return /\bemail\b|\breport\b|\bmeeting\b|\bclass\b|\bcafe\b|\bshop\b|\brestaurant\b|\btrain\b|\bwork\b|\bformal\b|\bpolite\b|\bmanager\b|\bcolleague\b|\bteacher\b|\bfriend\b|\bsmall\b|\bshort update\b|\bwriting\b|\bessay\b|\bresearch\b|\blab\b|\bseminar\b|\bbudget\b|\bsales\b|\bpolicy\b|\bmarket\b|\bquarterly\b/.test(lower);
  }

  function hasCartoonRudeDistractor(item) {
    return (item.options || []).some((option) => {
      if (!isObject(option) || option.role === "key") return false;
      const text = String(option.text || "").toLowerCase();
      return /^(give me|repeat\.|show menu\.|look file\.|you are wrong\.|send me the report\.|extend the deadline\.)/.test(text);
    });
  }

  function scanForC2(value, path, hits) {
    if (typeof value === "string") {
      if (/(^|[^A-Za-z0-9])C2([^A-Za-z0-9]|$)|C1\/C2/i.test(value)) hits.push({ path, value });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry, index) => scanForC2(entry, `${path}[${index}]`, hits));
      return;
    }
    if (isObject(value)) {
      Object.keys(value).forEach((key) => scanForC2(value[key], `${path}.${key}`, hits));
    }
  }

  function hasAbsoluteLevelMetadata(item) {
    return ["level", "cefr", "cefr_level", "target_level", "source_level"].some((key) => ABSOLUTE_LEVELS.includes(item[key]));
  }

  return {
    VALID_BOUNDARIES,
    VALID_TYPES,
    VALID_FORMATS,
    VALID_DISTANCES,
    REQUIRED_ROLES,
    V2_NON_NATURALNESS_ROLES,
    VALID_SCORING_STYLES,
    NATURALNESS_ROLES,
    normalizePayload,
    parsePoolText,
    validatePayload
  };
});
