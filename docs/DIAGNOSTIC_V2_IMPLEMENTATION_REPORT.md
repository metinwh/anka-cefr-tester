# Diagnostic V2 Implementation Report

Date: 2026-05-15

## Summary

Implemented the Phase 1 diagnostic pool described in `CODEX_BRIEF.md`.

- Added `placement-questions-v2.js` with 250 diagnostic items.
- Added exactly 50 items per CEFR level: A1, A2, B1, B2, C1.
- Per level mix: 20 vocab, 10 naturalness, 8 pragmatic, 6 collocation, 6 phrasal verb.
- Every item includes `close_competitor` with `tier: "close"` and reviewer rationale.
- Vocab items include Oxford 3000/5000 source grounding.
- All v2 items have `estimated_discrimination >= 0.70`.

## Runtime Integration

- `index.html` and `student-preview.html` now load `placement-questions-v2.js`.
- Legacy excluded soft item types remain excluded for the old pool.
- Diagnostic v2 items are allowed into the student core through `source_collection: "diagnostic_v2"`.
- Student core size is now 1049 items: 799 legacy active items + 250 diagnostic v2 items.
- The trajectory console confidence column now shows `low`, `medium`, or `high` instead of treating confidence as a percentage.

## Schema And Engine Updates

- `schema-validator.js` now accepts `v2_<level>_<type>_<###>` IDs.
- The validator checks v2 close-competitor shape, rationale, tier, ID/text collisions, and low discrimination.
- The validator accepts v2 role-based items with a plain `distractor`, so the engine has a swappable option.
- `ceiling-probe-engine.js` now normalizes `tight -> near` and `loose -> far` for the existing scoring heuristics.

## Validation

All checks passed in the staged `claude-v2` workspace:

```txt
node diagnostic-v2-tests.js
node placement-quality-tests.js
node student-core-pool-tests.js
node naturalness-scoring-tests.js
node engine-guardrail-tests.js
node engine-floor-recovery-tests.js
node --check ceiling-probe-engine.js
node --check schema-validator.js
node --check placement-questions-v2.js
node --check diagnostic-v2-tests.js
inline script syntax check for index.html and student-preview.html
merged schema validation: 1312 valid items, 0 errors
```

Remaining schema warnings are the known legacy strategic warnings: 76 single-item legacy warnings and 4 lexical-pool scale warnings. No v2 item has schema errors.
