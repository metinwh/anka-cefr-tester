(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.NektarCeilingProbeEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
  const BOUNDARIES = ["A1/A2", "A2/B1", "B1/B2", "B2/C1"];
  const BOUNDARY_TO_LEVELS = {
    "A1/A2": ["A1", "A2"],
    "A2/B1": ["A2", "B1"],
    "B1/B2": ["B1", "B2"],
    "B2/C1": ["B2", "C1"]
  };
  const DEFAULT_SETTINGS = {
    mode: "standard",
    seed: "nektar-step2",
    startBoundary: "A1/A2",
    // Reading-tolerant thresholds for non-vocab items: give people time to read carefully.
    // Vocab (Oxford-list) items keep the original tight windows since they're recognition.
    minFastThresholdMs: 3000,
    fastBaseMs: 1500,
    fastPerPromptWordMs: 400,
    slowMultiplier: 5.0,
    misclickThresholdMs: 400,
    // Vocab-specific (recognition: stays snappy)
    vocabMinFastThresholdMs: 1200,
    vocabFastBaseMs: 500,
    vocabFastPerPromptWordMs: 150,
    vocabSlowMultiplier: 2.5,
    vocabMisclickThresholdMs: 800,
    standardMinItems: 8,
    detailedMinItems: 14,
    maxItems: 24,
    recentFocusLimit: 6,
    recentTypeLimit: 8,
    recentLocalLemmaHistory: [],
    // Rapid-confirm: once confidence is high or a streak emerges, switch to short vocab probes
    // to verify the level and lock fast. Set to 0 to disable.
    rapidConfirmCount: 2,
    rapidConfirmStreakLength: 3,
    rapidConfirmTolerance: 1,    // wrongs allowed in rapid mode before bailing
    // Force-lock fallback: after this many items, if recent N at current boundary
    // are mostly correct, lock without waiting for strict evidence gates.
    // Force-lock fallback gates the "stop grinding" path. Tightened May 2026
    // (was 4-of-6 → 67% threshold; now requires 5+ correct of at least 5 items
    // at the current boundary, i.e. ≥83% recent accuracy at that level).
    forceLockMinItems: 10,
    forceLockWindow: 6,
    forceLockMinCorrect: 5,
    forceLockMinWindow:  5,
    // Vocab cap: stop the engine from grinding "Anlamı seç" Q's after this many.
    vocabSoftCap: 2,
    vocabHardCap: 4
  };
  const RESPONSE_CATEGORIES = [
    "correct_fast",
    "correct_normal",
    "correct_slow",
    "partial_credit",
    "partial_credit_slow",
    "wrong",
    "unknown",
    "misclick_suspected"
  ];
  const ACTIONS = [
    "start",
    "step_up",
    "fast_track_up",
    "recover_up",
    "probe_down",
    "retest_same_boundary",
    "confirm_boundary",
    "lock_result",
    "handle_unknown",
    "handle_misclick",
    "terminate_min_evidence",
    "terminate_high_confidence",
    "terminate_max_items"
  ];
  const BOUNDARY_CAPS = {
    standard: { "A1/A2": 7, "A2/B1": 9, "B1/B2": 9, "B2/C1": 7 },
    detailed: { "A1/A2": 10, "A2/B1": 12, "B1/B2": 12, "B2/C1": 10 }
  };
  const BOUNDARY_DIFFICULTY = {
    "A1/A2": { low: 0.18, base: 0.27, high: 0.36 },
    "A2/B1": { low: 0.38, base: 0.49, high: 0.58 },
    "B1/B2": { low: 0.58, base: 0.67, high: 0.74 },
    "B2/C1": { low: 0.74, base: 0.82, high: 0.9 }
  };

  function createEngine(items, settings) {
    return new CeilingProbeEngine(items, settings);
  }

  function simulateAnswerPattern(items, settings, pattern) {
    const engine = createEngine(items, settings);
    runAnswerPattern(engine, pattern);
    return engine.exportSession();
  }

  function runAnswerPattern(engine, pattern) {
    const tokens = normalizePattern(pattern);
    for (const token of tokens) {
      if (engine.state.result || !engine.currentItem) break;
      const response = responseForToken(engine, token);
      engine.answer(response.optionId, response.responseMs);
    }
    return engine;
  }

  class CeilingProbeEngine {
    constructor(items, settings) {
      this.items = Array.isArray(items) ? items.filter(isUsableItem) : [];
      this.settings = normalizeSettings(settings);
      this.state = freshState(this.settings);
      this.currentItem = null;
      this.selectNextItem("start");
    }

    thresholds(item) {
      const isVocab = item?.type === "vocab";
      const promptWords = wordCount(item?.prompt || "") + Math.round(optionWordCount(item) * 0.35);
      const baseMs       = isVocab ? this.settings.vocabFastBaseMs           : this.settings.fastBaseMs;
      const perWordMs    = isVocab ? this.settings.vocabFastPerPromptWordMs  : this.settings.fastPerPromptWordMs;
      const minFast      = isVocab ? this.settings.vocabMinFastThresholdMs   : this.settings.minFastThresholdMs;
      const slowMult     = isVocab ? this.settings.vocabSlowMultiplier       : this.settings.slowMultiplier;
      const misclickMs   = isVocab ? this.settings.vocabMisclickThresholdMs  : this.settings.misclickThresholdMs;
      const fast = Math.max(minFast, baseMs + (perWordMs * promptWords));
      return {
        fast,
        slow: Math.round(fast * slowMult),
        misclick: misclickMs
      };
    }

    selectNextItem(reason) {
      if (this.state.result) return null;
      const decision = this.finishDecision();
      if (decision) {
        this.finish(decision);
        return null;
      }
      const candidates = this.rankCandidates(this.state.current_boundary);
      const rawItem = candidates[0] || null;
      this.currentItem = rawItem ? this.renderItem(rawItem) : null;
      this.state.current_item_id = this.currentItem?.id || null;
      this.state.adaptive_difficulty_target = adaptiveDifficultyTarget(this.state.current_boundary, this.state, this.settings);
      this.state.current_item_difficulty = Number.isFinite(this.currentItem?.estimated_difficulty) ? this.currentItem.estimated_difficulty : null;
      const goal = this.state.last_movement_decision?.next_selection_goal;
      this.state.last_selection_reason = goal ? `${reason || "select_next"} -> ${goal}` : (reason || "select_next");
      return this.currentItem;
    }

    // ── Tier 1 adaptive distractor swap ────────────────────────────────
    // If the item has a `close_competitor` field AND the learner is in a
    // high-confidence / rapid-confirm state, swap one easy distractor for
    // the close_competitor. Protected roles (key, l1_trap, etc.) are never
    // swapped — they carry diagnostic signal. No-op for legacy items.
    renderItem(item) {
      if (!item || !item.close_competitor) return item;
      const shouldSwap = this.state.confidence === "high"
        || this.state.rapid_confirm === true;
      if (!shouldSwap) return item;

      const protectedRoles = new Set([
        "key", "l1_trap", "developmental_error", "acceptable", "natural", "weak"
      ]);
      const options = item.options.slice();
      const swapIdx = options.findIndex((o) => !protectedRoles.has(o.role));
      if (swapIdx < 0) return item;

      const cc = item.close_competitor;
      const swappedOption = {
        id: cc.id,
        text: cc.text,
        role: cc.role || "distractor",
        tier: "close"
      };
      // Preserve any explicit credit on the close_competitor.
      // Default partial credit of 0.5: the close_competitor is by definition a
      // "defensible near-miss" — picking it shouldn't be treated as a hard fail.
      if (typeof cc.credit === "number") swappedOption.credit = cc.credit;
      else swappedOption.credit = 0.5;
      options[swapIdx] = swappedOption;

      return Object.assign({}, item, {
        options,
        _distractor_tier_used: "close_swapped",
        _replaced_option_id: item.options[swapIdx].id
      });
    }

    rankCandidates(boundary) {
      const seen = new Set(this.state.items_seen_ids);
      const boundaryItems = this.items.filter((item) => item.boundary === boundary && !seen.has(item.id));
      const fallbackItems = this.items.filter((item) => !seen.has(item.id));
      const pool = boundaryItems.length ? boundaryItems : fallbackItems;
      const turn = this.state.items_asked + 1;
      return pool
        .map((item) => ({ item, score: this.scoreItem(item, boundary, turn) }))
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.item);
    }

    scoreItem(item, boundary, turn) {
      const exactBoundary = item.boundary === boundary ? 4 : 0;
      const focusPenalty = intersects(item.focus, this.state.focus_seen_recently) ? -1.6 : 0;
      const lemmaPenalty = intersects(normalizedLexicon(item), this.state.lemmas_seen) ? -2.2 : 0;
      const recentLemmaPenalty = intersects(normalizedLexicon(item), this.settings.recentLocalLemmaHistory) ? -1.5 : 0;
      const modeBonus = modeTypeBonus(item, this.state, this.settings);
      const distanceBonus = distractorDistanceBonus(item, this.state, this.settings);
      const difficultyBonus = adaptiveDifficultyBonus(item, boundary, this.state, this.settings);
      const coldStartBonus = coldStartDiversityBonus(item, this.state);
      const mixBonus = typeMixBonus(item, this.state, this.settings);
      const roleBonus = roleAwareBonus(item, this.state);
      const readingBonus = readingLoadBonus(item, this.state, this.settings);
      const mixedBonus = isMixedBoundary(boundary, this.state) && newFocusForBoundary(item, boundary, this.state) ? 0.8 : 0;
      const repeatPenalty = sameFamilyAlreadySeen(item, this.state) ? -999 : repeatedSurfacePenalty(item, this.state);
      const discrimination = Number.isFinite(item.estimated_discrimination) ? item.estimated_discrimination : 0;
      const tieBreak = hashToUnit(`${this.settings.seed}|${turn}|${item.id}`);
      const openingVariety = this.state.items_asked === 0
        ? hashToUnit(`${this.settings.seed}|opening_item|${item.id}`) * 1.4
        : 0;
      // Rapid-confirm bias: prefer short vocab items, push everything else down.
      // Effect: the 2 verification questions feel snappy and lexical.
      const rapidConfirmBias = this.state.rapid_confirm
        ? (item.type === "vocab" ? 8.0 : -4.0)
        : 0;
      // Vocab cap: "Anlamı seç" was popping up too often. After the soft cap,
      // apply a strong penalty so other types win the selection race.
      // (Exempted while in rapid-confirm — that mode wants vocab.)
      let vocabCapPenalty = 0;
      if (item.type === "vocab" && !this.state.rapid_confirm) {
        const vocabSeen = this.state.response_log.filter((e) => e.type === "vocab").length;
        const soft = this.settings.vocabSoftCap ?? 2;
        const hard = this.settings.vocabHardCap ?? 4;
        if (vocabSeen >= hard) vocabCapPenalty = -12;
        else if (vocabSeen >= soft) vocabCapPenalty = -5;
      }
      return exactBoundary + focusPenalty + lemmaPenalty + recentLemmaPenalty + modeBonus + distanceBonus + difficultyBonus + coldStartBonus + mixBonus + roleBonus + readingBonus + mixedBonus + repeatPenalty + discrimination + tieBreak + openingVariety + rapidConfirmBias + vocabCapPenalty;
    }

    answer(optionId, responseMs) {
      if (this.state.result) return { done: true, result: this.state.result };
      if (!this.currentItem) this.selectNextItem("start");
      if (!this.currentItem) throw new Error("No selectable item is available.");

      const item = this.currentItem;
      const isUnknown = optionId === "unknown";
      const selected = isUnknown ? null : item.options.find((option) => option.id === optionId);
      if (!isUnknown && !selected) throw new Error(`Option "${optionId}" not found for item "${item.id}".`);

      const before = stateSnapshot(this.state);
      const ms = Math.max(0, Number(responseMs) || 0);
      const selectedCredit = isUnknown ? 0 : optionCredit(selected);
      const naturalness = isUnknown ? null : optionNaturalness(selected, item, selectedCredit);
      const correct = selectedCredit >= 1;
      const category = this.responseCategory(item, selected, isUnknown, ms);
      const movement = this.applyMovement(item, selected, category, selectedCredit, naturalness);
      const action = movement.action;

      this.state.items_asked += 1;
      this.state.items_seen_ids.push(item.id);
      this.state.lemmas_seen = unique(this.state.lemmas_seen.concat(normalizedLexicon(item)));
      this.state.types_seen = unique(this.state.types_seen.concat(item.type ? [item.type] : []));
      this.state.formats_seen = unique(this.state.formats_seen.concat(item.format ? [item.format] : []));
      this.state.type_counts[item.type] = (this.state.type_counts[item.type] || 0) + 1;
      this.state.focus_seen_recently = item.focus.concat(this.state.focus_seen_recently)
        .filter(Boolean)
        .slice(0, this.settings.recentFocusLimit);
      this.state.recent_item_summaries = [{
        id: item.id,
        family_id: item.family_id || null,
        prompt: item.prompt,
        type: item.type,
        format: item.format,
        focus: item.focus,
        lexicon: normalizedLexicon(item),
        distractor_distance: item.distractor_distance,
        selected_role: isUnknown ? "unknown" : selectedRole(selected, naturalness),
        selected_credit: selectedCredit,
        naturalness,
        response_category: category,
        engine_action: action
      }].concat(this.state.recent_item_summaries).slice(0, this.settings.recentTypeLimit);
      this.state.last_selected_role = isUnknown ? "unknown" : selectedRole(selected, naturalness);
      this.state.last_selected_credit = selectedCredit;
      this.state.last_naturalness = naturalness;
      this.state.last_response_category = category;
      this.state.last_item_type = item.type || null;
      this.state.last_focus = item.focus || [];
      this.state.last_engine_action = action;
      this.updateErrorProfile(item, selected, category, selectedCredit, naturalness);
      this.state.confidence = this.computeConfidence();
      this.state.candidate_level = this.candidateLevel();

      const after = stateSnapshot(this.state);
      const logEntry = {
        turn: this.state.items_asked,
        item_id: item.id,
        boundary: item.boundary,
        type: item.type,
        format: item.format,
        focus: item.focus,
        selected_option_id: isUnknown ? null : selected.id,
        selected_role: isUnknown ? "unknown" : selectedRole(selected, naturalness),
        selected_credit: selectedCredit,
        naturalness,
        correct,
        response_ms: ms,
        response_category: category,
        estimated_difficulty: item.estimated_difficulty,
        adaptive_difficulty_target: before.adaptive_difficulty_target,
        state_before: before,
        engine_action: action,
        movement_decision: movement.action,
        movement_reason: movement.reason,
        boundary_status: movement.boundary_status,
        pass_focuses: movement.pass_focuses || [],
        resistance_focuses: movement.resistance_focuses || [],
        ping_pong_guardrail_active: Boolean(movement.ping_pong_guardrail_active),
        next_selection_goal: movement.next_selection_goal,
        boundary_evidence_before: movement.evidence_before,
        boundary_evidence_after: movement.evidence_after,
        state_after: after,
        selection_reason: this.state.last_selection_reason,
        distractor_distance: item.distractor_distance,
        family_id: item.family_id || null,
        stem_variant_id: item.stem_variant_id || null,
        option_variant_id: item.option_variant_id || null,
        rendered_item_id: item.id,
        // Tier-1 adaptive distractor instrumentation
        distractor_tier_used: item._distractor_tier_used || "default",
        selected_option_tier: isUnknown ? null : (selected?.tier || "default")
      };
      this.state.response_log.push(logEntry);

      // ── Rapid-confirm state transitions ───────────────────────────
      // Enter rapid mode when confidence becomes "high" OR when there's a
      // streak of N correct answers at the current top boundary. Once in,
      // decrement remaining on correct, tolerate a single wrong, then exit.
      const rcCount     = this.settings.rapidConfirmCount        ?? 2;
      const rcStreakN   = this.settings.rapidConfirmStreakLength ?? 3;
      const rcTolerance = this.settings.rapidConfirmTolerance    ?? 1;
      if (rcCount > 0) {
        if (this.state.rapid_confirm) {
          if (correct) {
            this.state.rapid_confirm_remaining = Math.max(0, this.state.rapid_confirm_remaining - 1);
          } else {
            // One wrong is forgiven; second wrong bails out.
            this.state.rapid_confirm_wrong_tolerance =
              (this.state.rapid_confirm_wrong_tolerance ?? 0) - 1;
            if (this.state.rapid_confirm_wrong_tolerance < 0) {
              this.state.rapid_confirm = false;
              this.state.rapid_confirm_remaining = 0;
            }
          }
        } else if (this.state.items_asked >= 5) {
          const tail = this.state.response_log.slice(-rcStreakN);
          const streakHit = tail.length === rcStreakN
            && tail.every((e) => e.correct && e.boundary === this.state.current_boundary);
          if (this.state.confidence === "high" || streakHit) {
            this.state.rapid_confirm = true;
            this.state.rapid_confirm_remaining = rcCount;
            this.state.rapid_confirm_wrong_tolerance = rcTolerance;
            this.state.rapid_confirm_locked_boundary = this.state.current_boundary;
          }
        }
      }

      const decision = this.finishDecision();
      if (decision) {
        this.finish(decision);
      } else {
        this.selectNextItem(action);
      }
      return { done: Boolean(this.state.result), logEntry, nextItem: this.currentItem, result: this.state.result };
    }

    updateErrorProfile(item, selected, category, selectedCredit, naturalness) {
      const role = category === "unknown" ? "unknown" : selectedRole(selected, naturalness);
      if (selectedCredit > 0 && selectedCredit < 1) {
        this.state.error_profile.partial_credit_count += 1;
        return;
      }
      if (role === "l1_trap") this.state.error_profile.l1_trap_count += 1;
      if (role === "developmental_error") this.state.error_profile.developmental_error_count += 1;
      if (role === "unknown") this.state.error_profile.unknown_count += 1;
      if (["l1_trap", "developmental_error", "unknown"].includes(role)) {
        this.state.error_profile.by_boundary[item.boundary] ||= { l1_trap: 0, developmental_error: 0, unknown: 0 };
        this.state.error_profile.by_boundary[item.boundary][role] += 1;
        for (const focus of item.focus || []) {
          this.state.error_profile.by_focus[focus] ||= { l1_trap: 0, developmental_error: 0, unknown: 0 };
          this.state.error_profile.by_focus[focus][role] += 1;
        }
      }
    }

    responseCategory(item, selected, isUnknown, responseMs) {
      if (isUnknown) return "unknown";
      const t = this.thresholds(item);
      const credit = optionCredit(selected);
      const correct = credit >= 1;
      if (credit > 0 && credit < 1) return responseMs >= t.slow ? "partial_credit_slow" : "partial_credit";
      if (!correct && responseMs < t.misclick) return "misclick_suspected";
      if (!correct) return "wrong";
      if (responseMs <= t.fast) return "correct_fast";
      if (responseMs >= t.slow) return "correct_slow";
      return "correct_normal";
    }

    applyMovement(item, selected, category, selectedCredit, naturalness) {
      const boundary = item.boundary;
      const role = category === "unknown" ? "unknown" : selectedRole(selected, naturalness);
      const evidenceBefore = cloneEvidence(this.state.boundary_evidence[boundary]);
      this.updateBoundaryEvidence(boundary, item, role, category, selectedCredit, naturalness);
      this.state.boundary_item_counts[boundary] = (this.state.boundary_item_counts[boundary] || 0) + 1;

      // Generic consecutive-wrong probe-down: if learner is failing repeatedly
      // (regardless of role type — distractor/l1_trap/nonnative/dev_error all count),
      // step DOWN. Stops the engine from grinding "step_up" at the ceiling forever
      // when the user is clearly below this level.
      const isCorrectCat = ["correct_fast", "correct_normal", "correct_slow", "partial_credit", "partial_credit_slow"].includes(category);
      const recent2Wrong = this.state.response_log.slice(-2);
      const priorTwoWrong = recent2Wrong.length === 2 && recent2Wrong.every((e) => !e.correct);
      const thisIsWrong = !isCorrectCat && category !== "misclick_suspected";

      let movement;
      if (thisIsWrong && priorTwoWrong && boundary !== "A1/A2") {
        // 3 consecutive wrongs at non-floor boundary → probe down hard.
        this.state.consecutive_fast_correct = 0;
        this.state.consecutive_wrong = (this.state.consecutive_wrong || 0) + 1;
        movement = this.movementDecision(
          stepBoundary(boundary, -1),
          "probe_down",
          `${boundary} has 3 consecutive wrong answers (mixed roles); probing the lower boundary.`,
          "lower boundary check"
        );
      } else if (category === "misclick_suspected") {
        this.state.consecutive_fast_correct = 0;
        movement = this.movementDecision(boundary, "handle_misclick", "Very fast wrong answer is treated as possible misclick; staying on the same boundary.", "same boundary, cleaner confirmation item");
      } else if (category === "partial_credit" || category === "partial_credit_slow") {
        movement = this.movementAfterPartialCredit(boundary, item, selectedCredit, naturalness, category);
      } else if (category === "correct_slow") {
        this.state.consecutive_fast_correct = 0;
        this.state.consecutive_wrong = 0;
        movement = this.movementDecision(boundary, "confirm_boundary", "Slow correct is useful but not a clean pass; confirm this boundary with another focus.", "same boundary confirmation");
      } else if (role === "key") {
        movement = this.movementAfterCorrect(boundary, item, category);
      } else if (role === "l1_trap") {
        movement = this.movementAfterL1Trap(boundary, item);
      } else if (role === "developmental_error") {
        movement = this.movementAfterDevelopmentalError(boundary, item);
      } else {
        movement = this.movementAfterUnknown(boundary, item);
      }

      movement = this.applyFloorRecoveryAndCaps(boundary, item, movement);

      const projectedBoundary = movement.boundary || this.state.current_boundary;
      if (projectedPingPong(this.state, movement.action, projectedBoundary)) {
        const guardBoundary = mostRecentBoundaryWithMixedEvidence(this.state) || boundary;
        movement = this.movementDecision(
          guardBoundary,
          "retest_same_boundary",
          "Ping-pong guardrail active: recent movement alternated up/down, so the engine is holding position for confirmation.",
          "same boundary, different focus",
          true
        );
        this.state.ping_pong_events.push({
          turn: this.state.items_asked + 1,
          item_id: item.id,
          held_boundary: guardBoundary
        });
      }

      this.state.confirm_count_by_boundary[boundary] = movement.action === "confirm_boundary"
        ? (this.state.confirm_count_by_boundary[boundary] || 0) + 1
        : 0;
      this.state.same_boundary_confirm_count = movement.action === "confirm_boundary" && movement.boundary === boundary
        ? this.state.same_boundary_confirm_count + 1
        : 0;
      if (movement.action === "probe_down" && movement.boundary === "A1/A2") this.state.floor_probe_active = true;
      if (movement.action === "recover_up" || movement.boundary !== "A1/A2") this.state.floor_probe_active = false;
      this.state.current_boundary = movement.boundary || boundary;
      const computedBoundaryResult = boundaryResultFromEvidence(this.state.boundary_evidence[boundary], boundary);
      this.state.boundary_results[boundary] = this.state.boundary_results[boundary] === "passed_with_weaknesses" && computedBoundaryResult === "passed"
        ? "passed_with_weaknesses"
        : computedBoundaryResult;
      movement.boundary_status = this.state.boundary_results[boundary];
      movement.pass_focuses = unique(this.state.boundary_evidence[boundary].pass_focuses);
      movement.resistance_focuses = unique(this.state.boundary_evidence[boundary].resistance_focuses);
      movement.floor_confirmation_loop_detected = isFloorConfirmationLoop(this.state);
      movement.recover_up_available = shouldRecoverFromFloor(boundary, this.state);
      movement.boundary_item_count = this.state.boundary_item_counts[boundary] || 0;
      movement.confirm_count_at_boundary = this.state.confirm_count_by_boundary[boundary] || 0;
      movement.boundary_item_cap = boundaryItemCap(boundary, this.settings);
      movement.evidence_before = evidenceBefore;
      movement.evidence_after = cloneEvidence(this.state.boundary_evidence[boundary]);
      this.state.last_movement_decision = movement;
      this.state.movement_decisions.push({
        turn: this.state.items_asked + 1,
        item_id: item.id,
        boundary,
        role,
        category,
        selected_credit: selectedCredit,
        naturalness,
        ...movement
      });
      return movement;
    }

    applyFloorRecoveryAndCaps(boundary, item, movement) {
      const ev = this.state.boundary_evidence[boundary];
      this.state.boundary_results[boundary] = boundaryResultFromEvidence(ev, boundary);

      if (shouldRecoverFromFloor(boundary, this.state)) {
        this.state.boundary_results["A1/A2"] = "passed_with_weaknesses";
        if (isFloorConfirmationLoop(this.state)) {
          this.state.floor_confirmation_loop_events.push({
            turn: this.state.items_asked + 1,
            item_id: item.id,
            boundary: "A1/A2",
            items_at_boundary: this.state.boundary_item_counts["A1/A2"],
            confirm_count: this.state.confirm_count_by_boundary["A1/A2"] || 0
          });
        }
        const recovered = this.movementDecision(
          "A2/B1",
          "recover_up",
          `floor_confirmation_loop recovery: A1/A2 has ${ev.pass} pass signals across ${unique(ev.pass_focuses).length} focus families, with more pass than resistance. Returning to A2/B1.`,
          "A2/B1 recovery probe"
        );
        this.state.recover_up_events.push({
          turn: this.state.items_asked + 1,
          item_id: item.id,
          from_boundary: "A1/A2",
          to_boundary: "A2/B1",
          reason: recovered.reason
        });
        return recovered;
      }

      const cap = boundaryItemCap(boundary, this.settings);
      const boundaryCount = this.state.boundary_item_counts[boundary] || 0;
      // +1 confirm chance before the engine is forced to decide at non-floor
       // boundaries (May 2026 — was 4/6, now 5/7). Learners felt B1/B2 collapsed
       // too quickly after the early hit-the-cap probe_down.
      const confirmLimit = this.settings.mode === "detailed" ? 7 : 5;
      const confirmCount = this.state.confirm_count_by_boundary[boundary] || 0;
      const pass = ev.pass || 0;
      const resistance = boundaryResistance(ev);
      const passFocusCount = unique(ev.pass_focuses || []).length;

      if (movement.action === "confirm_boundary" && boundary !== "B2/C1" && pass >= 3 && passFocusCount >= 3 && pass > resistance) {
        this.state.boundary_results[boundary] = "passed_with_weaknesses";
        const action = boundary === "A1/A2" ? "recover_up" : "step_up";
        const target = stepBoundary(boundary, 1);
        const reason = `${boundary} has repeated correct answers across ${passFocusCount} focuses, but timing adds uncertainty; moving up with a cautious pass.`;
        if (boundary === "A1/A2") {
          this.state.recover_up_events.push({ turn: this.state.items_asked + 1, item_id: item.id, from_boundary: boundary, to_boundary: target, reason });
        }
        return this.movementDecision(target, action, reason, "cautious upper-boundary probe");
      }

      if (boundaryCount >= cap || confirmCount >= confirmLimit) {
        this.state.boundary_cap_hits.push({
          turn: this.state.items_asked + 1,
          boundary,
          item_id: item.id,
          boundary_count: boundaryCount,
          cap,
          confirm_count: confirmCount
        });

        if (pass > resistance && passFocusCount >= 2) {
          this.state.boundary_results[boundary] = passFocusCount >= 3 ? "passed_with_weaknesses" : "uncertain";
          const action = boundary === "A1/A2" ? "recover_up" : "step_up";
          const target = stepBoundary(boundary, 1);
          const reason = `${boundary} hit its evidence cap with more pass than resistance; marking ${this.state.boundary_results[boundary]} and moving up.`;
          if (boundary === "A1/A2") {
            this.state.recover_up_events.push({ turn: this.state.items_asked + 1, item_id: item.id, from_boundary: boundary, to_boundary: target, reason });
          }
          return this.movementDecision(target, action, reason, "next boundary after cap resolution");
        }

        if (resistance > pass && boundary !== "A1/A2") {
          this.state.boundary_results[boundary] = "failed";
          return this.movementDecision(stepBoundary(boundary, -1), "probe_down", `${boundary} hit its evidence cap with more resistance than pass; down-probe allowed.`, "lower boundary after cap resolution");
        }

        if (boundary === "A1/A2" && pass >= 3 && passFocusCount >= 3) {
          this.state.boundary_results[boundary] = "passed_with_weaknesses";
          const reason = `A1/A2 reached its cap with ${pass} passes across ${passFocusCount} focuses; not an A1 profile, recovering to A2/B1.`;
          this.state.recover_up_events.push({ turn: this.state.items_asked + 1, item_id: item.id, from_boundary: boundary, to_boundary: "A2/B1", reason });
          return this.movementDecision("A2/B1", "recover_up", reason, "A2/B1 recovery probe");
        }
      }

      return movement;
    }

    updateBoundaryEvidence(boundary, item, role, category, selectedCredit, naturalness) {
      const evidence = this.state.boundary_evidence[boundary];
      if (!evidence) return;
      const focuses = [primaryFocusGroup(item)].filter(Boolean);
      const itemSummary = { id: item.id, focus: focuses, raw_focus: item.focus || [], type: item.type, role, category, selected_credit: selectedCredit, naturalness };

      if (category === "misclick_suspected") {
        evidence.misclick += 1;
        evidence.last_action = "handle_misclick";
        evidence.mixed = evidence.pass > 0 && boundaryResistance(evidence) > 0;
        return;
      }

      if (category === "partial_credit" || category === "partial_credit_slow") {
        evidence.partial_credit_count += 1;
        evidence.partial_credit_total += selectedCredit || 0;
        evidence.uncertain += 1;
        evidence.partial_focuses = unique(evidence.partial_focuses.concat(focuses));
        evidence.partial_items.push(itemSummary);
        const label = naturalness?.label || "partial_credit";
        evidence.naturalness_counts[label] = (evidence.naturalness_counts[label] || 0) + 1;
        evidence.last_action = "partial_credit_signal";
        evidence.mixed = evidence.pass > 0 && boundaryResistance(evidence) > 0;
        return;
      }

      if (category === "correct_slow") {
        evidence.pass += 1;
        evidence.pass_focuses = unique(evidence.pass_focuses.concat(focuses));
        evidence.pass_items.push(itemSummary);
        evidence.uncertain += 1;
        evidence.last_action = "slow_pass_signal";
        evidence.mixed = evidence.pass > 0 && boundaryResistance(evidence) > 0;
        return;
      }

      if (role === "key") {
        evidence.pass += 1;
        evidence.pass_focuses = unique(evidence.pass_focuses.concat(focuses));
        evidence.pass_items.push(itemSummary);
        if (category === "correct_fast") evidence.fast_pass_focuses = unique(evidence.fast_pass_focuses.concat(focuses));
        evidence.last_action = "pass_signal";
        evidence.mixed = evidence.pass > 0 && boundaryResistance(evidence) > 0;
        return;
      }

      if (role === "unknown") {
        evidence.unknown += 1;
        evidence.unknown_focuses = unique(evidence.unknown_focuses.concat(focuses));
      } else if (role === "l1_trap") {
        evidence.l1_trap += 1;
        evidence.l1_trap_focuses = unique(evidence.l1_trap_focuses.concat(focuses));
      } else if (role === "developmental_error") {
        evidence.developmental_error += 1;
        evidence.developmental_error_focuses = unique(evidence.developmental_error_focuses.concat(focuses));
      } else {
        evidence.fail += 1;
      }
      evidence.resistance_focuses = unique(evidence.resistance_focuses.concat(focuses));
      evidence.resistance_items.push(itemSummary);
      evidence.mixed = evidence.pass > 0 && boundaryResistance(evidence) > 0;
      evidence.last_action = "resistance_signal";
    }

    movementAfterCorrect(boundary, item, category) {
      this.state.consecutive_wrong = 0;
      if (category === "correct_fast") this.state.consecutive_fast_correct += 1;
      else this.state.consecutive_fast_correct = 0;

      const ev = this.state.boundary_evidence[boundary];
      if (boundary === "A1/A2" && this.state.floor_probe_active && !shouldRecoverFromFloor(boundary, this.state)) {
        return this.movementDecision(boundary, "confirm_boundary", "A1/A2 is being checked after a down-probe; waiting for independent floor pass evidence before recovery.", "floor recovery confirmation");
      }
      if (boundaryResistance(ev) > 0 && !hasTwoIndependentPassFocuses(boundary, this.state)) {
        return this.movementDecision(boundary, "confirm_boundary", `${boundary} is mixed; correct answer does not step up until another independent pass focus confirms it.`, "same boundary, different focus");
      }
      if (category === "correct_fast" && hasTwoFastCorrectAcrossDifferentFocuses(boundary, this.state)) {
        // Was stepBoundary(boundary, 2) — too aggressive. A couple of fast correct
        // answers at A1/A2 should not vault the learner to B1/B2 in one step.
        return this.movementDecision(stepBoundary(boundary, 1), "fast_track_up", `${boundary} has fast correct answers across independent focuses; advancing one step.`, "higher boundary check");
      }
      if (hasCleanPass(boundary, this.state)) {
        // Slow the early climb: a single correct answer at a non-floor
        // boundary should not vault the learner to the next boundary.
        // Require >=2 items seen at this boundary first (regardless of speed).
        // The fast_track_up path above already handles legitimately fast climbers
        // (it requires 2 fast-correct across independent focuses).
        const seenAtBoundary = this.state.boundary_item_counts?.[boundary] || 0;
        if (boundary !== "A1/A2" && seenAtBoundary < 2) {
          return this.movementDecision(boundary, "confirm_boundary", `${boundary} has a clean first pass; staying for a second item before stepping up.`, "same boundary, second confirmation");
        }
        return this.movementDecision(stepBoundary(boundary, 1), "step_up", `${boundary} has a clean pass signal with no prior resistance; probing the next boundary.`, "next boundary probe");
      }
      return this.movementDecision(boundary, "confirm_boundary", `${boundary} has a useful pass signal but not enough independent evidence to treat it as passed.`, "same boundary confirmation");
    }

    movementAfterL1Trap(boundary) {
      this.state.consecutive_fast_correct = 0;
      this.state.consecutive_wrong += 1;
      if (!hasTwoIndependentResistanceFocuses(boundary, this.state)) {
        return this.movementDecision(boundary, "retest_same_boundary", `${boundary} has one L1-transfer signal only; staying to test a different focus.`, "same boundary, different transfer-sensitive focus");
      }
      if (hasAnyPassEvidence(boundary, this.state)) {
        return this.movementDecision(boundary, "confirm_boundary", `${boundary} has pass evidence plus transfer resistance; treating it as mixed and holding for confirmation.`, "same boundary confirmation");
      }
      return this.movementDecision(stepBoundary(boundary, -1), "probe_down", `${boundary} has repeated independent L1-transfer resistance and no pass evidence; down-probe allowed.`, "lower boundary check");
    }

    movementAfterDevelopmentalError(boundary) {
      this.state.consecutive_fast_correct = 0;
      this.state.consecutive_wrong += 1;
      if (!hasTwoIndependentResistanceFocuses(boundary, this.state)) {
        return this.movementDecision(boundary, "retest_same_boundary", `${boundary} has one developmental-error signal; checking the same boundary with a different surface.`, "same boundary, related focus");
      }
      if (hasAnyPassEvidence(boundary, this.state)) {
        return this.movementDecision(boundary, "confirm_boundary", `${boundary} shows partial acquisition, not a clean fail; staying for confirmation.`, "same boundary confirmation");
      }
      return this.movementDecision(stepBoundary(boundary, -1), "probe_down", `${boundary} has repeated independent developmental resistance and no pass evidence; down-probe allowed.`, "lower boundary check");
    }

    movementAfterPartialCredit(boundary, item, credit, naturalness, category) {
      this.state.consecutive_fast_correct = 0;
      this.state.consecutive_wrong = 0;
      const label = naturalness?.label || "partial credit";
      const slowNote = category === "partial_credit_slow" ? " Slow timing adds uncertainty." : "";
      if (credit >= 0.6) {
        return this.movementDecision(
          boundary,
          "confirm_boundary",
          `${boundary} received ${label} partial credit (${formatCredit(credit)}), so the engine holds for confirmation instead of treating it as a wrong answer.${slowNote}`,
          "same boundary, naturalness confirmation"
        );
      }
      if (hasAnyPassEvidence(boundary, this.state)) {
        return this.movementDecision(
          boundary,
          "confirm_boundary",
          `${boundary} has pass evidence plus weak partial credit (${formatCredit(credit)}); holding as mixed/uncertain rather than collapsing.`,
          "same boundary confirmation"
        );
      }
      return this.movementDecision(
        boundary,
        "retest_same_boundary",
        `${boundary} received weak partial credit (${formatCredit(credit)}), which is diagnostic uncertainty rather than a full L1/developmental failure.${slowNote}`,
        "same boundary, clearer naturalness item"
      );
    }

    movementAfterUnknown(boundary) {
      this.state.consecutive_fast_correct = 0;
      this.state.consecutive_wrong += 1;
      const ev = this.state.boundary_evidence[boundary];
      if (ev.unknown < 2 && hasAnyPassEvidence(boundary, this.state)) {
        return this.movementDecision(boundary, "handle_unknown", `${boundary} has some pass evidence; one unknown response is handled as resistance, not a collapse.`, "same boundary, clearer item");
      }
      if (ev.unknown >= 2 || hasTwoIndependentResistanceFocuses(boundary, this.state)) {
        return this.movementDecision(stepBoundary(boundary, -1), "probe_down", `${boundary} has repeated unknown/resistance evidence; down-probe allowed.`, "lower boundary check");
      }
      return this.movementDecision(boundary, "handle_unknown", `Single unknown at ${boundary}; staying for a clearer diagnostic item.`, "same boundary, clearer item");
    }

    movementDecision(boundary, action, reason, nextSelectionGoal, pingPong = false) {
      return {
        boundary,
        action,
        reason,
        next_selection_goal: nextSelectionGoal,
        ping_pong_guardrail_active: pingPong
      };
    }

    finishDecision() {
      const minItems = this.settings.mode === "detailed" ? this.settings.detailedMinItems : this.settings.standardMinItems;
      if (this.state.items_asked >= this.settings.maxItems) {
        return { action: "terminate_max_items", lock: this.bestAvailableLock(), reason: "Maximum item count reached." };
      }
      // Rapid-confirm exit: vocab streak verified the level — lock now.
      // Mark as strong evidence so finish() can upgrade confidence to "high".
      if (this.state.rapid_confirm && this.state.rapid_confirm_remaining <= 0) {
        const lock = this.adjacentLock() || this.bestAvailableLock();
        return {
          action: "terminate_high_confidence",
          lock,
          reason: "Rapid-confirm complete (vocab streak verified).",
          rapid_confirm_strong: true
        };
      }

      // Force-lock fallback: if the learner has clearly demonstrated the current
      // boundary, lock and stop grinding. May 2026: tightened to require both
      //   • at least `forceLockMinCorrect` correct (default 5)
      //   • a window of at least `forceLockMinWindow` items at the boundary (5)
      // Together this enforces ≥83% recent accuracy at the boundary.
      const flMin       = this.settings.forceLockMinItems   ?? 10;
      const flWindow    = this.settings.forceLockWindow     ?? 6;
      const flNeeded    = this.settings.forceLockMinCorrect ?? 5;
      const flMinWindow = this.settings.forceLockMinWindow  ?? 5;
      if (this.state.items_asked >= flMin) {
        const recentAtCurrent = this.state.response_log
          .slice(-flWindow)
          .filter((e) => e.boundary === this.state.current_boundary);
        if (recentAtCurrent.length >= flMinWindow) {
          const correctCount = recentAtCurrent.filter((e) => e.correct).length;
          if (correctCount >= flNeeded) {
            const lock = this.adjacentLock() || this.bestAvailableLock();
            return {
              action: "terminate_high_confidence",
              lock,
              reason: `Force-lock: ${correctCount}/${recentAtCurrent.length} correct at ${this.state.current_boundary}.`,
              force_lock_ratio: { correct: correctCount, total: recentAtCurrent.length }
            };
          }
        }
      }
      if (this.state.items_asked < minItems) return null;

      const contradiction = hasContradiction(this.state);
      if (contradiction && this.state.items_asked < (this.settings.mode === "detailed" ? 16 : 10)) return null;
      if (hasBoundaryPingPong(this.state) && this.state.items_asked < minItems + 3) return null;

      const lock = this.adjacentLock();
      if (!lock) return null;

      if (this.settings.mode === "detailed" && !hasDetailedEvidence(lock, this.state)) return null;
      if (hasRecentMisclick(this.state) && this.state.items_asked < minItems + 2) return null;
      if (hasUnresolvedContradiction(this.state) && lock.kind !== "floor_recovered") return null;
      if (lock.kind === "top" && hasStrongPassEvidence("B2/C1", this.state)) {
        return { action: "terminate_high_confidence", lock, reason: "B2/C1 passed with enough evidence." };
      }
      if (this.state.confidence === "high") {
        return { action: "terminate_high_confidence", lock, reason: `${lock.reason} Confidence is high.` };
      }
      return { action: "terminate_min_evidence", lock, reason: lock.reason };
    }

    adjacentLock() {
      if (this.state.boundary_results["A1/A2"] === "failed" && hasTwoIndependentResistanceFocuses("A1/A2", this.state)) {
        const ev = this.state.boundary_evidence["A1/A2"];
        if ((ev.pass || 0) < 2) {
          return { kind: "floor", estimatedLevel: "A1", lower: null, upper: "A1/A2", reason: "A1/A2 failed after minimum evidence with few independent passes." };
        }
      }
      for (let index = 0; index < BOUNDARIES.length - 1; index += 1) {
        const lower = BOUNDARIES[index];
        const upper = BOUNDARIES[index + 1];
        const lowerPassed = ["passed", "passed_with_weaknesses"].includes(this.state.boundary_results[lower]);
        if (lowerPassed && this.state.boundary_results[upper] === "failed") {
          return {
            kind: "adjacent",
            estimatedLevel: BOUNDARY_TO_LEVELS[lower][1],
            lower,
            upper,
            reason: this.state.boundary_results[lower] === "passed_with_weaknesses"
              ? `${lower} passed with weaknesses and ${upper} failed.`
              : `${lower} passed and ${upper} failed.`
          };
        }
        if (lower === "A1/A2" && this.state.boundary_results[lower] === "passed_with_weaknesses" && ["mixed", "uncertain", "failed", "untested"].includes(this.state.boundary_results[upper]) && !hasUpwardPassWithoutResistance(upper, this.state)) {
          return {
            kind: "floor_recovered",
            estimatedLevel: "A2",
            lower,
            upper,
            reason: "A1/A2 is passed with weaknesses and A2/B1 is not stable; A2 is the conservative start level."
          };
        }
      }
      if (this.state.boundary_results["B2/C1"] === "passed" && hasStrongPassEvidence("B2/C1", this.state)) {
        return { kind: "top", estimatedLevel: "C1", lower: "B2/C1", upper: null, reason: "B2/C1 passed with repeated evidence." };
      }
      return null;
    }

    bestAvailableLock() {
      return this.adjacentLock() || { kind: "best_available", estimatedLevel: this.candidateLevel(), lower: null, upper: null, reason: "Best available level from current evidence." };
    }

    candidateLevel() {
      let level = BOUNDARY_TO_LEVELS[this.state.current_boundary]?.[0] || "A2";
      for (const boundary of BOUNDARIES) {
        if (["passed", "passed_with_weaknesses"].includes(this.state.boundary_results[boundary])) level = BOUNDARY_TO_LEVELS[boundary][1];
        if (["mixed", "uncertain"].includes(this.state.boundary_results[boundary]) && hasAnyPassEvidence(boundary, this.state)) {
          level = maxLevel(level, BOUNDARY_TO_LEVELS[boundary][0]);
        }
      }
      // ── Accuracy guardrail ──────────────────────────────────────────
      // Don't lock above what overall performance supports. A learner who
      // happened to land 2 correct at A1/A2 then spam-clicked through 18
      // mostly-wrong items at B2/C1 should not test as C1.
      const total = this.state.response_log.length;
      if (total >= 6) {
        const correctCount = this.state.response_log.filter((e) => e.correct).length;
        const accuracy = correctCount / total;
        const order = ["A1", "A2", "B1", "B2", "C1"];
        const currentIdx = order.indexOf(level);
        if (currentIdx > 0) {
          if (accuracy < 0.40) {
            level = order[Math.max(0, currentIdx - 2)];   // severe underperform → demote 2
          } else if (accuracy < 0.55) {
            level = order[Math.max(0, currentIdx - 1)];   // borderline → demote 1
          }
        }
      }
      return level;
    }

    computeConfidence() {
      const lock = this.adjacentLock();
      if (!lock) return "low";
      if (lock.kind === "floor_recovered") return "medium";
      if (hasContradiction(this.state) || hasUnresolvedContradiction(this.state) || hasBoundaryPingPong(this.state)) return "low";
      if (lock.kind === "top") return hasStrongPassEvidence("B2/C1", this.state) && !isMixedBoundary("B2/C1", this.state) ? "high" : "medium";
      const lowerStrong = lock.lower ? hasStrongPassEvidence(lock.lower, this.state) : false;
      const upperResistant = lock.upper ? hasTwoIndependentResistanceFocuses(lock.upper, this.state) && !hasAnyPassEvidence(lock.upper, this.state) : false;
      const lowerHasWeaknesses = lock.lower ? this.state.boundary_results[lock.lower] === "passed_with_weaknesses" : false;
      const uncertain = [lock.lower, lock.upper].filter(Boolean).some((boundary) =>
        ["mixed", "uncertain"].includes(this.state.boundary_results[boundary]) || this.state.boundary_evidence[boundary].uncertain > 0
      );
      if (lowerStrong && upperResistant && !uncertain && !lowerHasWeaknesses) return "high";
      if ((lowerStrong || upperResistant) && !hasBoundaryPingPong(this.state)) return "medium";
      return "low";
    }

    finish(decision) {
      const lock = decision.lock || this.bestAvailableLock();
      // ── Final accuracy ceiling (applies to ALL termination paths) ──
      // Your locked level cannot exceed what session accuracy supports.
      // C1 requires ≥70% across the whole session. B2 requires ≥55%.
      // This stops random-clickers from being promoted to C1 by lucky
      // early correct streaks + ignored misclicks at the ceiling.
      let estimatedLevel = lock.estimatedLevel;
      const total = this.state.response_log.length;
      if (total >= 6 && estimatedLevel) {
        const correctCount = this.state.response_log.filter((e) => e.correct).length;
        const accuracy = correctCount / total;
        const order = ["A1", "A2", "B1", "B2", "C1"];
        const ceilingFor = (acc) => {
          if (acc < 0.40) return "A2"; // sub-random / spam-click territory
          if (acc < 0.55) return "B1";
          if (acc < 0.70) return "B2";
          return "C1";
        };
        const ceiling = ceilingFor(accuracy);
        const lockIdx = order.indexOf(estimatedLevel);
        const ceilIdx = order.indexOf(ceiling);
        if (lockIdx > ceilIdx) {
          estimatedLevel = ceiling;
          lock.estimatedLevel = estimatedLevel;
          lock.accuracy_adjusted_from = order[lockIdx];
          lock.accuracy_adjusted_reason = `Session accuracy ${Math.round(accuracy * 100)}% caps at ${ceiling}; original lock was ${order[lockIdx]}.`;
        }
      }
      // ── Confidence override based on actual termination evidence ──
      // computeConfidence() is conservative — it returns "low" when the formal
      // adjacent-lock pattern isn't perfect, even after a force-lock or rapid-
      // confirm exit. Upgrade based on the real evidence carried in `decision`.
      let confidence = this.computeConfidence();
      const hasPingPongOrContradiction = hasBoundaryPingPong(this.state)
        || hasContradiction(this.state)
        || hasUnresolvedContradiction(this.state);

      // Strong evidence sources:
      //   • Rapid-confirm exit: the learner just passed a fresh vocab streak.
      //   • Force-lock with high ratio: ≥5/6 (83%) at the current boundary.
      if (!hasPingPongOrContradiction) {
        if (decision.rapid_confirm_strong) {
          confidence = "high";
        } else if (decision.force_lock_ratio) {
          const { correct, total } = decision.force_lock_ratio;
          const ratio = total > 0 ? correct / total : 0;
          if (ratio >= 0.95 && total >= 5)        confidence = "high";    // 5/5, 6/6, etc.
          else if (ratio >= 0.80 && total >= 5)   confidence = upgradeConfidence(confidence, "medium"); // 5/6, 6/7
        }
      }

      const result = {
        estimated_level: estimatedLevel,
        confidence,
        termination_action: decision.action,
        termination_reason: decision.reason,
        productive_receptive_hedge: "This short test mostly measures recognition. Speaking and writing may feel slightly lower at first.",
        recommended_next_action: decision.action === "terminate_max_items" || confidence === "low" ? "offer_detailed_test" : "start_here",
        offer_detailed_test: confidence !== "high",
        skill_profile: buildSkillProfile(this.state.response_log)
      };
      this.state.result = result;
      this.currentItem = null;
      this.state.current_item_id = null;
      return result;
    }

    exportSession() {
      return {
        settings: this.settings,
        state: this.state,
        result: this.state.result,
        trajectory: this.state.response_log,
      boundary_evidence_full: cloneEvidenceMap(this.state.boundary_evidence),
      movement_decisions: this.state.movement_decisions,
      ping_pong_events: this.state.ping_pong_events,
      floor_confirmation_loop_events: this.state.floor_confirmation_loop_events,
      recover_up_events: this.state.recover_up_events,
      passed_with_weaknesses_boundaries: BOUNDARIES.filter((boundary) => this.state.boundary_results[boundary] === "passed_with_weaknesses"),
      boundary_item_counts: { ...this.state.boundary_item_counts },
      confirm_counts_by_boundary: { ...this.state.confirm_count_by_boundary },
      boundary_cap_hits: this.state.boundary_cap_hits,
      focus_profile: buildSkillProfile(this.state.response_log),
        role_profile: buildRoleProfile(this.state.response_log),
        selection_reasons: this.state.response_log.map((entry) => ({
          turn: entry.turn,
          item_id: entry.item_id,
          selection_reason: entry.selection_reason,
          movement_decision: entry.movement_decision,
          movement_reason: entry.movement_reason
        }))
      };
    }
  }

  function normalizeSettings(settings) {
    const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
    if (!["standard", "detailed"].includes(merged.mode)) merged.mode = "standard";
    if (!BOUNDARIES.includes(merged.startBoundary)) merged.startBoundary = DEFAULT_SETTINGS.startBoundary;
    return merged;
  }

  function freshBoundaryEvidence() {
    return {
      pass: 0,
      fail: 0,
      l1_trap: 0,
      developmental_error: 0,
      unknown: 0,
      uncertain: 0,
      misclick: 0,
      partial_credit_count: 0,
      partial_credit_total: 0,
      pass_focuses: [],
      resistance_focuses: [],
      l1_trap_focuses: [],
      developmental_error_focuses: [],
      unknown_focuses: [],
      partial_focuses: [],
      fast_pass_focuses: [],
      pass_items: [],
      partial_items: [],
      resistance_items: [],
      naturalness_counts: {},
      last_action: null,
      mixed: false
    };
  }

  function freshState(settings) {
    return {
      mode: settings.mode,
      current_boundary: settings.startBoundary,
      candidate_level: BOUNDARY_TO_LEVELS[settings.startBoundary][0],
      confidence: "low",
      items_asked: 0,
      items_seen_ids: [],
      lemmas_seen: [],
      focus_seen_recently: [],
      types_seen: [],
      formats_seen: [],
      type_counts: {},
      recent_item_summaries: [],
      last_selected_role: null,
      last_selected_credit: null,
      last_naturalness: null,
      last_response_category: null,
      last_item_type: null,
      last_focus: [],
      last_engine_action: null,
      error_profile: { l1_trap_count: 0, developmental_error_count: 0, unknown_count: 0, partial_credit_count: 0, by_focus: {}, by_boundary: {} },
      consecutive_fast_correct: 0,
      consecutive_wrong: 0,
      boundary_results: Object.fromEntries(BOUNDARIES.map((boundary) => [boundary, "untested"])),
      boundary_evidence: Object.fromEntries(BOUNDARIES.map((boundary) => [boundary, freshBoundaryEvidence()])),
      response_log: [],
      movement_decisions: [],
      ping_pong_events: [],
      floor_confirmation_loop_events: [],
      recover_up_events: [],
      boundary_cap_hits: [],
      boundary_item_counts: Object.fromEntries(BOUNDARIES.map((boundary) => [boundary, 0])),
      confirm_count_by_boundary: Object.fromEntries(BOUNDARIES.map((boundary) => [boundary, 0])),
      same_boundary_confirm_count: 0,
      floor_probe_active: false,
      last_movement_decision: null,
      current_item_id: null,
      current_item_difficulty: null,
      adaptive_difficulty_target: adaptiveDifficultyTarget(settings.startBoundary, { items_asked: 0, current_boundary: settings.startBoundary }, settings),
      last_selection_reason: "start",
      // Rapid-confirm mode: switches to short vocab probes once confidence is high
      // or a correct-answer streak emerges, then exits after rapid_confirm_remaining hits 0.
      rapid_confirm: false,
      rapid_confirm_remaining: 0,
      rapid_confirm_locked_boundary: null,
      rapid_confirm_wrong_tolerance: 0,
      result: null
    };
  }

  function stateSnapshot(state) {
    return {
      current_boundary: state.current_boundary,
      candidate_level: state.candidate_level,
      confidence: state.confidence,
      items_asked: state.items_asked,
      consecutive_fast_correct: state.consecutive_fast_correct,
      consecutive_wrong: state.consecutive_wrong,
      last_selected_role: state.last_selected_role,
      last_selected_credit: state.last_selected_credit,
      last_naturalness: state.last_naturalness,
      last_response_category: state.last_response_category,
      last_item_type: state.last_item_type,
      last_engine_action: state.last_engine_action,
      adaptive_difficulty_target: state.adaptive_difficulty_target,
      current_item_difficulty: state.current_item_difficulty,
      boundary_results: { ...state.boundary_results },
      boundary_item_counts: { ...state.boundary_item_counts },
      confirm_count_by_boundary: { ...state.confirm_count_by_boundary },
      boundary_evidence: cloneEvidenceMap(state.boundary_evidence),
      ping_pong_guardrail_active: hasBoundaryPingPong(state),
      floor_confirmation_loop_detected: isFloorConfirmationLoop(state)
    };
  }

  function isUsableItem(item) {
    return item && BOUNDARIES.includes(item.boundary) && Array.isArray(item.options) && item.options.length === 3;
  }

  function wordCount(text) {
    return String(text || "").split(/\s+/).filter(Boolean).length;
  }

  function optionWordCount(item) {
    return (item?.options || []).reduce((sum, option) => sum + wordCount(option?.text || ""), 0);
  }

  function itemReadingLoad(item) {
    return wordCount(item?.prompt || "") + optionWordCount(item);
  }

  function stepBoundary(boundary, delta) {
    const index = Math.max(0, Math.min(BOUNDARIES.length - 1, BOUNDARIES.indexOf(boundary) + delta));
    return BOUNDARIES[index];
  }

  function chooseNeighborForConfirmation(boundary, state) {
    const index = BOUNDARIES.indexOf(boundary);
    if (index < BOUNDARIES.length - 1 && state.boundary_results[BOUNDARIES[index + 1]] === "untested") return BOUNDARIES[index + 1];
    return boundary;
  }

  function normalizedLexicon(item) {
    const words = Array.isArray(item.lexicon) ? item.lexicon : [];
    if (item.target_word) words.push(item.target_word);
    return unique(words.map((word) => String(word).trim().toLowerCase()).filter(Boolean));
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function intersects(a, b) {
    const set = new Set((b || []).map((value) => String(value).toLowerCase()));
    return (a || []).some((value) => set.has(String(value).toLowerCase()));
  }

  function modeTypeBonus(item, state, settings) {
    if (settings.mode === "detailed") {
      if (item.type === "vocab" && item.format === "meaning_tr_en") return -0.55;
      if (["grammar", "collocation", "idiom", "phrasal_verb"].includes(item.type)) return 0.5;
      return 0.1;
    }

    let score = 0;
    if (state.items_asked === 0) {
      const openingTypes = ["vocab", "naturalness_judgment", "pragmatic_choice"];
      const preferredType = openingTypes[Math.floor(hashToUnit(`${settings.seed}|opening_type`) * openingTypes.length) % openingTypes.length];
      if (item.type === preferredType) score += 1.35;
      if (item.type === "vocab") score += 0.35;
    } else if (state.items_asked < 2 && item.type === "vocab") score += 0.25;
    if (["A2/B1", "B1/B2"].includes(state.current_boundary) && item.type === "grammar") score += 0.45;
    if (state.current_boundary === "B2/C1" && ["collocation", "idiom", "phrasal_verb", "function", "natural_speech", "spoken_chunk", "discourse_marker", "naturalness_judgment", "pragmatic_choice"].includes(item.type)) score += 0.45;
    if (state.consecutive_wrong >= 1 && ["grammar", "function"].includes(item.type)) score += 0.25;
    return score;
  }

  function coldStartDiversityBonus(item, state) {
    if (state.items_asked >= 3) return 0;
    const recent = state.recent_item_summaries[0];
    let score = 0;
    if (!state.types_seen.includes(item.type)) score += 0.85;
    if (!state.formats_seen.includes(item.format)) score += 0.45;
    if (recent) {
      if (item.type === recent.type) score -= 1.25;
      if (item.format === recent.format) score -= 0.75;
      if (intersects(item.focus, recent.focus)) score -= 1.5;
      if (samePromptTemplate(item.prompt, recent.prompt)) score -= 0.35;
    }
    const evidenceChannel = itemEvidenceChannel(item);
    if (!state.recent_item_summaries.some((entry) => itemEvidenceChannel(entry) === evidenceChannel)) score += 0.45;
    return score;
  }

  function typeMixBonus(item, state, settings) {
    const asked = Math.max(1, state.items_asked);
    const count = state.type_counts[item.type] || 0;
    const ratio = count / asked;
    let score = 0;
    if (settings.mode === "standard" && item.type === "vocab" && ratio > 0.32) score -= 1.0;
    if (settings.mode === "detailed" && item.type === "vocab" && ratio > 0.22) score -= 1.2;
    if (["collocation", "idiom", "phrasal_verb", "natural_speech", "spoken_chunk", "discourse_marker", "function", "naturalness_judgment", "pragmatic_choice"].includes(item.type) && ratio === 0 && state.items_asked >= 2) score += 0.4;
    if (item.type === "grammar" && ratio === 0 && state.items_asked >= 1) score += 0.35;
    return score;
  }

  function readingLoadBonus(item, state, settings) {
    const load = itemReadingLoad(item);
    let score = 0;

    if (state.items_asked < 3) {
      score += load <= 18 ? 0.8 : -Math.min(1.7, (load - 18) * 0.08);
    } else if (settings.mode === "standard" && state.items_asked < 7) {
      if (load <= 24) score += 0.25;
      if (load > 34) score -= Math.min(1.0, (load - 34) * 0.05);
    }

    if (state.current_boundary === "A1/A2" && load > 32) score -= 0.75;
    if (state.last_response_category === "unknown" && load > 28) score -= 0.85;
    if (state.last_response_category === "partial_credit_slow" && load > 30) score -= 0.55;
    if (settings.mode === "detailed" && load > 44) score -= 0.25;

    return score;
  }

  function roleAwareBonus(item, state) {
    const last = state.recent_item_summaries[0];
    if (!last) return 0;
    let score = 0;
    const distance = normalizedDistractorDistance(item.distractor_distance);
    if (state.last_selected_role === "l1_trap" && intersects(item.focus, last.focus)) score += 0.45;
    if (state.last_selected_role === "developmental_error" && intersects(item.focus, last.focus)) score += 0.5;
    if (state.last_response_category === "partial_credit" && intersects(item.focus, last.focus)) score += 0.45;
    if (state.last_response_category === "partial_credit_slow" && intersects(item.focus, last.focus)) score += 0.55;
    if (state.last_selected_role === "unknown" && ["far", "medium"].includes(distance)) score += 0.35;
    if (state.last_response_category === "correct_fast" && distance === "near") score += 0.35;
    if (intersects(normalizedLexicon(item), last.lexicon)) score -= 2.0;
    return score;
  }

  function itemEvidenceChannel(item) {
    if (!item) return "unknown";
    if (item.type === "vocab") return "lexical";
    if (item.type === "grammar" || item.type === "sentence_building") return "structure";
    if (["function", "natural_speech", "spoken_chunk", "discourse_marker", "naturalness_judgment", "pragmatic_choice"].includes(item.type)) return "pragmatics";
    if (["collocation", "idiom", "phrasal_verb"].includes(item.type)) return "expression";
    return item.type || "mixed";
  }

  function samePromptTemplate(prompt, previousPrompt) {
    if (!prompt || !previousPrompt) return false;
    const normalize = (value) => String(value)
      .toLowerCase()
      .replace(/[a-z]+/g, "x")
      .replace(/\s+/g, " ")
      .trim();
    return normalize(prompt) === normalize(previousPrompt);
  }

  function distractorDistanceBonus(item, state, settings) {
    const distance = normalizedDistractorDistance(item.distractor_distance);
    if (settings.mode === "detailed") return distance === "near" ? 0.35 : distance === "medium" ? 0.15 : -0.15;
    if (state.current_boundary === "A1/A2") return distance === "far" ? 0.25 : 0;
    if (state.current_boundary === "B2/C1") return distance === "near" ? 0.35 : 0;
    return distance === "medium" ? 0.2 : 0;
  }

  function normalizedDistractorDistance(distance) {
    if (distance === "tight") return "near";
    if (distance === "loose") return "far";
    return distance;
  }

  function adaptiveDifficultyTarget(boundary, state, settings) {
    const range = BOUNDARY_DIFFICULTY[boundary] || BOUNDARY_DIFFICULTY["A2/B1"];
    let target = range.base;
    const action = state.last_engine_action || state.last_movement_decision?.action;
    const role = state.last_selected_role;
    const category = state.last_response_category;

    if (!state.items_asked) return clamp(target - 0.06, range.low, range.high);
    if (action === "step_up") target -= 0.07;
    if (action === "fast_track_up") target -= 0.03;
    if (action === "probe_down" || action === "recover_up") target -= 0.05;
    if (action === "confirm_boundary" || action === "retest_same_boundary") target -= 0.03;

    if (category === "correct_fast") target += 0.08;
    else if (category === "correct_normal") target += 0.03;
    else if (category === "correct_slow") target -= 0.08;
    else if (category === "partial_credit") target -= role === "weak_nonnative" || (state.last_selected_credit || 0) < 0.5 ? 0.08 : 0.04;
    else if (category === "partial_credit_slow") target -= 0.1;
    else if (category === "unknown") target -= 0.11;

    if (["l1_trap", "developmental_error"].includes(role) && (state.last_selected_credit || 0) <= 0) target -= 0.1;
    if ((state.consecutive_wrong || 0) >= 2) target -= 0.08;
    if (isMixedBoundary(boundary, state)) target -= 0.04;
    if (settings.mode === "detailed") target += 0.03;
    return clamp(target, range.low, range.high);
  }

  function adaptiveDifficultyBonus(item, boundary, state, settings) {
    const range = BOUNDARY_DIFFICULTY[boundary] || BOUNDARY_DIFFICULTY["A2/B1"];
    const difficulty = Number.isFinite(item.estimated_difficulty) ? item.estimated_difficulty : range.base;
    const target = adaptiveDifficultyTarget(boundary, state, settings);
    const gap = Math.abs(difficulty - target);
    return clamp(1.15 - (gap * 8), -0.9, 1.15);
  }

  function boundaryResultFromEvidence(evidence, boundary) {
    const passFocusCount = unique(evidence.pass_focuses || []).length;
    const resistanceFocusCount = unique(evidence.resistance_focuses || []).length;
    const resistance = boundaryResistance(evidence);
    if (evidence.pass >= 2 && passFocusCount >= 2 && resistance === 0 && evidence.uncertain === 0) return "passed";
    if (boundary === "A1/A2" && evidence.pass >= 3 && passFocusCount >= 3 && evidence.pass >= resistance) return "passed_with_weaknesses";
    if (evidence.pass >= 3 && passFocusCount >= 3 && evidence.pass > resistance) return "passed_with_weaknesses";
    if (resistance >= 2 && resistanceFocusCount >= 2 && evidence.pass === 0) return "failed";
    if (evidence.pass > 0 && resistance > 0) return "mixed";
    if (evidence.uncertain > 0) return "uncertain";
    if (evidence.pass > 0 || resistance > 0 || evidence.misclick > 0) return "uncertain";
    return "untested";
  }

  function boundaryResistance(evidence) {
    if (!evidence) return 0;
    return (evidence.fail || 0) + (evidence.l1_trap || 0) + (evidence.developmental_error || 0) + (evidence.unknown || 0);
  }

  function hasAnyPassEvidence(boundary, state) {
    return (state.boundary_evidence[boundary]?.pass || 0) > 0;
  }

  function hasUpwardPassWithoutResistance(boundary, state) {
    const ev = state.boundary_evidence[boundary];
    return Boolean(ev && (ev.pass || 0) > 0 && boundaryResistance(ev) === 0);
  }

  function hasStrongPassEvidence(boundary, state) {
    const ev = state.boundary_evidence[boundary];
    return Boolean(ev && ev.pass >= 2 && unique(ev.pass_focuses || []).length >= 2);
  }

  function hasCleanPass(boundary, state) {
    const ev = state.boundary_evidence[boundary];
    return Boolean(ev && ev.pass > 0 && boundaryResistance(ev) === 0 && ev.uncertain === 0 && ev.misclick === 0);
  }

  function hasTwoIndependentPassFocuses(boundary, state) {
    return unique(state.boundary_evidence[boundary]?.pass_focuses || []).length >= 2;
  }

  function hasTwoFastCorrectAcrossDifferentFocuses(boundary, state) {
    const ev = state.boundary_evidence[boundary];
    return Boolean(ev && unique(ev.fast_pass_focuses || []).length >= 2);
  }

  function hasTwoIndependentResistanceFocuses(boundary, state) {
    return unique(state.boundary_evidence[boundary]?.resistance_focuses || []).length >= 2;
  }

  function shouldRecoverFromFloor(boundary, state) {
    if (boundary !== "A1/A2") return false;
    const ev = state.boundary_evidence["A1/A2"];
    if (!ev) return false;
    const passFocusCount = unique(ev.pass_focuses || []).length;
    const resistance = (ev.l1_trap || 0) + (ev.developmental_error || 0) + (ev.unknown || 0) + (ev.fail || 0);
    const itemsAtBoundary = state.boundary_item_counts?.["A1/A2"] || countItemsAtBoundary(state, "A1/A2");
    if (ev.pass >= 3 && passFocusCount >= 3 && ev.pass > resistance) return true;
    if (itemsAtBoundary >= 6 && ev.pass >= 3 && passFocusCount >= 3) return true;
    return false;
  }

  function boundaryItemCap(boundary, settings) {
    const mode = settings?.mode === "detailed" ? "detailed" : "standard";
    return BOUNDARY_CAPS[mode][boundary] || 9;
  }

  function countItemsAtBoundary(state, boundary) {
    return (state.response_log || []).filter((entry) => entry.boundary === boundary).length + (state.current_boundary === boundary ? 1 : 0);
  }

  function isFloorConfirmationLoop(state) {
    const floorCount = state.boundary_item_counts?.["A1/A2"] || 0;
    const floorConfirmCount = state.confirm_count_by_boundary?.["A1/A2"] || 0;
    return floorCount >= 5 && floorConfirmCount >= 3 && shouldRecoverFromFloor("A1/A2", state);
  }

  function isMixedBoundary(boundary, state) {
    const ev = state.boundary_evidence[boundary];
    return Boolean(ev && ev.pass > 0 && boundaryResistance(ev) > 0);
  }

  function hasUnresolvedContradiction(state) {
    return BOUNDARIES.some((boundary) => state.boundary_results[boundary] === "mixed");
  }

  function newFocusForBoundary(item, boundary, state) {
    const ev = state.boundary_evidence[boundary];
    const seen = unique([...(ev?.pass_focuses || []), ...(ev?.resistance_focuses || [])]);
    return !intersects([primaryFocusGroup(item)], seen);
  }

  function primaryFocusGroup(item) {
    const focus = item?.focus || [];
    if (!focus.length) return item?.family_id || item?.type || "unknown_focus";
    if (item.type === "vocab" && focus.length > 1) return focus[1];
    return focus[0];
  }

  function sameFamilyAlreadySeen(item, state) {
    if (!item.family_id) return false;
    return state.recent_item_summaries.some((entry) => entry.family_id && entry.family_id === item.family_id);
  }

  function repeatedSurfacePenalty(item, state) {
    const last = state.recent_item_summaries[0];
    if (!last) return 0;
    let score = 0;
    if (intersects(item.focus, last.focus)) score -= 0.45;
    if (intersects(normalizedLexicon(item), last.lexicon)) score -= 2.0;
    if (samePromptTemplate(item.prompt, last.prompt)) score -= 1.5;
    return score;
  }

  // Ping-pong detection — May 2026 widening:
  //   • Window grown from 4→8 logs so we see swaps even when many confirm_boundary
  //     items appear between them (real sessions have lots of confirms).
  //   • isPingPongSequence now filters confirm/retest actions out of the alternation
  //     check, so the detection triggers based on actual movement events.
  function hasBoundaryPingPong(state) {
    const logs = state.response_log.slice(-8);
    if (logs.length < 3) return false;
    return isPingPongSequence(logs.map((e) => e.engine_action), logs.map((e) => e.state_after.current_boundary));
  }

  function projectedPingPong(state, action, projectedBoundary) {
    const logs = state.response_log.slice(-7);
    if (logs.length < 2) return false;
    const actions = logs.map((e) => e.engine_action).concat(action);
    const boundaries = logs.map((e) => e.state_after.current_boundary).concat(projectedBoundary);
    return isPingPongSequence(actions, boundaries);
  }

  function isPingPongSequence(actions, boundaries) {
    // Keep only actual movements (step / probe / fast_track). Skip confirms,
    // retests, handlers, and other no-op-direction actions.
    const movementIdx = [];
    for (let i = 0; i < actions.length; i++) {
      if (/step|probe|fast_track/.test(actions[i] || "")) movementIdx.push(i);
    }
    if (movementIdx.length < 3) return false;
    // Last three movement actions: should alternate up↔down↔up or down↔up↔down.
    const m = movementIdx.slice(-3).map((idx) => actions[idx]);
    const isUp   = (a) => /step|fast_track/.test(a);
    const isDown = (a) => /probe/.test(a);
    const upDownUp   = isUp(m[0])   && isDown(m[1]) && isUp(m[2]);
    const downUpDown = isDown(m[0]) && isUp(m[1])   && isDown(m[2]);
    const alternating = upDownUp || downUpDown;
    // The boundaries at those three movement points should occupy ≤2 levels.
    const movementBoundaries = movementIdx.slice(-3).map((idx) => boundaries[idx]).filter(Boolean);
    const uniqueBoundaries = new Set(movementBoundaries);
    return alternating && uniqueBoundaries.size <= 2;
  }

  function mostRecentBoundaryWithMixedEvidence(state) {
    const recent = state.response_log.slice(-4).map((entry) => entry.boundary).reverse();
    return recent.find((boundary) => isMixedBoundary(boundary, state)) || recent[0] || state.current_boundary;
  }

  function cloneEvidence(evidence) {
    if (!evidence) return null;
    return {
      ...evidence,
      pass_focuses: [...(evidence.pass_focuses || [])],
      resistance_focuses: [...(evidence.resistance_focuses || [])],
      l1_trap_focuses: [...(evidence.l1_trap_focuses || [])],
      developmental_error_focuses: [...(evidence.developmental_error_focuses || [])],
      unknown_focuses: [...(evidence.unknown_focuses || [])],
      partial_focuses: [...(evidence.partial_focuses || [])],
      fast_pass_focuses: [...(evidence.fast_pass_focuses || [])],
      pass_items: (evidence.pass_items || []).map((item) => ({ ...item, focus: [...(item.focus || [])] })),
      partial_items: (evidence.partial_items || []).map((item) => ({ ...item, focus: [...(item.focus || [])] })),
      resistance_items: (evidence.resistance_items || []).map((item) => ({ ...item, focus: [...(item.focus || [])] })),
      naturalness_counts: { ...(evidence.naturalness_counts || {}) }
    };
  }

  function cloneEvidenceMap(map) {
    return Object.fromEntries(Object.entries(map || {}).map(([boundary, evidence]) => [boundary, cloneEvidence(evidence)]));
  }

  function maxLevel(a, b) {
    return LEVELS.indexOf(b) > LEVELS.indexOf(a) ? b : a;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hasContradiction(state) {
    const results = BOUNDARIES.map((boundary) => state.boundary_results[boundary]);
    return results.some((result, index) =>
      result === "failed" && results.slice(index + 1).some((laterResult) => laterResult === "passed")
    );
  }

  function hasRecentMisclick(state) {
    return state.response_log.slice(-2).some((entry) => entry.response_category === "misclick_suspected");
  }

  function hasDetailedEvidence(lock, state) {
    if (lock.kind === "floor") return hasTwoIndependentResistanceFocuses("A1/A2", state);
    if (lock.kind === "top") return hasStrongPassEvidence("B2/C1", state);
    return (!lock.lower || hasStrongPassEvidence(lock.lower, state)) &&
      (!lock.upper || hasTwoIndependentResistanceFocuses(lock.upper, state));
  }

  function buildSkillProfile(log) {
    const buckets = {};
    for (const entry of log) {
      for (const tag of entry.focus || []) {
        buckets[tag] ||= { seen: 0, correct: 0, unknown: 0 };
        buckets[tag].seen += 1;
        buckets[tag].correct += Number.isFinite(entry.selected_credit) ? entry.selected_credit : (entry.correct ? 1 : 0);
        if (entry.selected_role === "unknown") buckets[tag].unknown += 1;
      }
    }
    return Object.fromEntries(Object.entries(buckets).map(([tag, bucket]) => {
      const ratio = bucket.correct / bucket.seen;
      const label = bucket.unknown > 0 || (ratio > 0 && ratio < 0.75) ? "uncertain" : ratio >= 0.75 ? "strong" : "weak";
      return [tag, label];
    }));
  }

  function buildRoleProfile(log) {
    return log.reduce((profile, entry) => {
      const role = entry.selected_role || "unknown";
      profile[role] = (profile[role] || 0) + 1;
      return profile;
    }, {});
  }

  function optionCredit(option) {
    if (!option) return 0;
    const explicit = Number.isFinite(option.credit) ? option.credit : Number.isFinite(option.score) ? option.score : null;
    if (explicit !== null) return clamp(explicit, 0, 1);
    return option.role === "key" ? 1 : 0;
  }

  function optionNaturalness(option, item, credit) {
    if (!option) return null;
    const style = naturalnessStyle(item);
    if (!style && !Number.isFinite(option.credit) && !Number.isFinite(option.score) && !option.naturalness) return null;
    const label = String(option.naturalness || option.naturalness_label || option.quality || option.role || inferNaturalnessLabel(credit)).trim() || inferNaturalnessLabel(credit);
    return {
      style: style || "role_based_credit",
      label,
      credit
    };
  }

  function naturalnessStyle(item) {
    const style = item?.scoring_style || item?.scoringStyle || item?.format;
    if (["naturalness_judgment", "pragmatic_choice"].includes(style)) return style;
    return ["naturalness_judgment", "pragmatic_choice"].includes(item?.type) ? item.type : null;
  }

  function selectedRole(option, naturalness) {
    if (!option) return "unknown";
    return option.role || naturalness?.label || inferNaturalnessLabel(optionCredit(option));
  }

  function inferNaturalnessLabel(credit) {
    if (credit >= 1) return "key";
    if (credit >= 0.6) return "acceptable";
    if (credit > 0) return "weak_nonnative";
    return "wrong";
  }

  function formatCredit(credit) {
    return Number.isFinite(credit) ? credit.toFixed(2).replace(/0+$/, "").replace(/\.$/, "") : "0";
  }

  function responseForToken(engine, rawToken) {
    const token = String(rawToken || "").trim().toLowerCase();
    const item = engine.currentItem;
    const thresholds = engine.thresholds(item);
    const key = item.options.find((option) => optionCredit(option) >= 1) || item.options[0];
    const l1 = item.options.find((option) => option.role === "l1_trap") || item.options.find((option) => optionCredit(option) === 0) || item.options[1] || key;
    const dev = item.options.find((option) => option.role === "developmental_error") || item.options.find((option) => optionCredit(option) > 0 && optionCredit(option) < 0.6) || item.options[2] || l1;
    const partial = item.options.find((option) => optionCredit(option) > 0 && optionCredit(option) < 1) || dev;
    if (token === "unknown" || token === "bilmiyorum") return { optionId: "unknown", responseMs: thresholds.fast + 400 };
    if (token === "misclick" || token === "misclick_suspected") return { optionId: l1.id, responseMs: Math.max(120, thresholds.misclick - 250) };
    if (token === "wrong_dev" || token === "developmental_error") return { optionId: dev.id, responseMs: thresholds.fast + 650 };
    if (token === "wrong_l1" || token === "l1_trap" || token === "wrong") return { optionId: l1.id, responseMs: thresholds.fast + 650 };
    if (token === "partial" || token === "partial_credit" || token === "acceptable") return { optionId: partial.id, responseMs: thresholds.fast + 650 };
    if (token === "partial_slow") return { optionId: partial.id, responseMs: thresholds.slow + 400 };
    if (token === "correct_slow") return { optionId: key.id, responseMs: thresholds.slow + 400 };
    if (token === "correct_normal" || token === "correct") return { optionId: key.id, responseMs: thresholds.fast + 550 };
    return { optionId: key.id, responseMs: Math.max(250, thresholds.fast - 250) };
  }

  function normalizePattern(pattern) {
    if (Array.isArray(pattern)) return pattern;
    return String(pattern || "")
      .split(/[,\n>]+/)
      .map((token) => token.trim())
      .filter(Boolean);
  }

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function hashToUnit(value) {
    return hashString(value) / 4294967296;
  }

  // Return the stronger of two confidence labels.
  function upgradeConfidence(current, target) {
    const rank = { low: 0, medium: 1, high: 2 };
    return (rank[target] ?? 0) > (rank[current] ?? 0) ? target : current;
  }

  return {
    LEVELS,
    BOUNDARIES,
    BOUNDARY_TO_LEVELS,
    DEFAULT_SETTINGS,
    RESPONSE_CATEGORIES,
    ACTIONS,
    createEngine,
    runAnswerPattern,
    simulateAnswerPattern,
    hashToUnit
  };
});
