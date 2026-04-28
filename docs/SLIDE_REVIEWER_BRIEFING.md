# Slide Reviewer Briefing

You are reviewing **one slide** that another agent just built. Your job is to critically evaluate it against the project's standards and produce a verdict (PASS or REVISE) plus specific, actionable feedback. **You are not building anything. Do not modify files.**

The deck must be coherent across 31 slides. The bar for PASS is high.

---

## What to Read

1. The slide file at `src/slides/NN-Name.tsx` — the focus of your review.
2. The slide's entry in `SLIDES.md` — the contract (purpose, conveys, visual concept, source mapping).
3. The slide's section in the cited part doc (`docs/part1_path.md`, `docs/part2_present.md`, or `docs/part3_future.md`) — for verbatim phrasing fidelity. Find the corresponding "Slide N.M" entry.
4. `docs/SLIDE_BUILDER_BRIEFING.md` — the same briefing the builder followed; this is your standards reference.
5. `SLIDE_STYLE.md` — visual design standards (Sections 1, 2, 3, 4, 5, 6 are most relevant).
6. `SPECIFICATION.md` Sections 1, 3.5, 5.2 — visual-first cardinal rule, viewport-relative units, component contract.

The builder's report (passed to you alongside this prompt) tells you what they intended; your job is to verify they delivered it.

---

## Review Dimensions

Evaluate the slide on each of the following. Quote line numbers from the code where relevant. Be specific — vague feedback is useless to the reviser.

### A. Specification Adherence
- Implements `React.FC<SlideProps>` correctly with `SlideProps` imported from `'../types'`?
- Default export present?
- Wraps content in `<SlideContainer>`?
- File name matches `NN-Name.tsx` pattern? Component name is reasonable?
- Slide is registered in `src/slides/index.ts` at the correct array index?

### B. Visual-First Compliance (Cardinal Rule — `SLIDE_STYLE.md` §1)
- Slide is **primarily visual**? Inline SVG diagram or visual metaphor carries the message?
- **Bullet points and paragraphs are forbidden.** Are there any?
- Body text is limited to: titles (one line), brief subtitle (one line), terse SVG labels, or a centerpiece wordmark-scale quote? Anything beyond this is a violation.
- If a quote slide: is the quote treated typographically (large scale, dominant) with a supporting SVG element? Plain quote on a background is not enough.

### C. Layout Rules (`SPECIFICATION.md` §3.5)
- **Viewport-relative units used?** `max-w-[90vw]`, `h-[70vh]`, `w-full` — never `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, or fixed-pixel widths.
- Content fits one viewport, no implied scrolling?
- SVG uses `viewBox` with logical coordinates and `className="w-full h-full"` to scale?
- 16:9 aspect ratio target respected?

### D. Content Fidelity
- Does the slide convey what the `SLIDES.md` entry says it should convey? Each item under "Conveys"?
- Are verbatim phrasings from the part doc preserved **word-for-word**? Compare the slide's text to the verbatim quotes flagged in the cited part doc.
- Are there phrasings the slide author paraphrased that should be verbatim? Flag specifically.
- Title/subtitle match the slide's purpose from `SLIDES.md`?

### E. Color & Motif Consistency
- Are colors used in their **deck-wide meanings**?
  - `primary` (cyan) = path / interest compass / fundamentals
  - `secondary` (magenta) = domain knowledge / TEI-REX / emphasis
  - `tertiary` (violet) = AI tooling / supporting
  - `success` (green) = right approach, fit
  - `danger` (red) = dead ends, what AI gets wrong, friction
  - `amber` = cautionary, intermediate
- Are CSS custom properties used (`var(--color-primary)`) rather than hardcoded hex values like `#00e5ff`?
- No more than 3 accent colors on the slide?
- **If this slide is part of a recurring motif** (compass on 02/31; intersection on 06; TEI-REX on 16–18/23; dead-ends on 19/29; lever on 20/27), does the visual treatment match the motif's other slides?
  - For *first* occurrences: is the motif clearly established for later slides to rhyme with?
  - For *callbacks*: is the visual recognizably the same as the original (same shapes, same colors)?

### F. SVG Style (`SLIDE_STYLE.md` §5)
- Filled shapes use low-opacity fills (0.08–0.25) with higher-opacity strokes?
- Stroke widths in the 1–2.5px range as appropriate?
- Rounded corners (`rx`) used for shapes; full-radius for pills?
- Shape language matches the deck's conventions (peptide-pill, protein-rect, etc.) where relevant?

### G. Animation (`SLIDE_STYLE.md` §6)
- Uses `framer-motion` for entrance animations (not raw CSS)?
- Staggered entrance? Critical content visible within 1 second?
- Each animation serves comprehension, or is it decorative noise?
- Background/loop animations subtle (low opacity, slow)?

### H. Build / Type Safety
- Does the file likely typecheck? (Spot any obvious type errors, missing imports, unused vars under strict mode.)
- Imports valid (correct paths, correct named/default imports)?
- No use of `any`?

---

## Verdict Format

End your review with **exactly one** of two verdicts. Be unambiguous.

### Option 1: PASS

If the slide meets all standards, write:

```
VERDICT: PASS

Brief rationale (2–4 sentences) — what the slide does well, why it meets the bar.
```

### Option 2: REVISE

If the slide has issues, write:

```
VERDICT: REVISE

Specific revisions:

1. [Quote offending line/lines OR describe the missing element]
   Issue: [what's wrong, citing the rule]
   Fix: [exactly what should change]

2. ...

3. ...
```

Each revision item must be specific, actionable, and rule-cited. Examples:

> 1. **Line 14:** `<div className="max-w-4xl mx-auto">`
>    Issue: `max-w-4xl` violates the viewport-relative-unit rule (`SPECIFICATION.md` §3.5).
>    Fix: Replace with `max-w-[90vw]`.

> 2. **Line 23:** Quote rendered as "Interest is what motivates me most."
>    Issue: This is a paraphrase of a verbatim quote. `docs/part1_path.md` Slide 1.2 specifies the verbatim phrasing: *"Something being interesting is THE primary motivator for me."*
>    Fix: Restore the verbatim text exactly.

> 3. **Line 47:** Compass needle uses `var(--color-success)`.
>    Issue: The compass motif (slides 02 ↔ 31) requires the needle in `--color-primary` for visual rhyme. `docs/SLIDE_BUILDER_BRIEFING.md` recurring-motifs table specifies this.
>    Fix: Change `stroke` and `fill` on the needle to `var(--color-primary)`.

---

## Standards Are High

A slide that "looks fine" but misses a verbatim quote, swaps a motif color, or uses `max-w-4xl` is a **REVISE**, not a PASS. The deck must be coherent across 31 slides — coherence comes from these specific rules, not from individual slides looking nice in isolation.

When deciding PASS vs REVISE, ask: *if every slide in the deck were built to this standard, would the deck hold together?* If not, REVISE.

---

## Out of Scope (Don't Do)

- **Don't edit the slide file.**
- Don't run the dev server or build.
- Don't add tests.
- Don't review other slides.
- Don't try to "fix" architectural concerns; flag them in your verdict instead.

Just read, evaluate, and write the verdict. Be ruthless when needed and clear about why.
