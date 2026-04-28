# Slide Builder Briefing

You are building **one slide** for a 31-slide React/TypeScript/Vite seminar deck. This briefing contains everything you need that isn't slide-specific. Read this AND your assigned slide's entry in `SLIDES.md` AND the relevant section of the part doc cited in that entry.

You are not building the whole deck, the dev server, the tests, or any infrastructure. Just one slide file. Stay in your lane.

---

## The Project

- **Audience:** UW Data Science Masters students, mostly 22–28, anxious about AI displacement and unsure about career paths.
- **Talk title:** *There's no "right" path to a career in data science — and skills to focus on in the age of AI.*
- **Speaker:** Michael Riffle, Senior Research Scientist.
- **Three parts:**
  - Part 1 (slides 01–08): "Where I've Been" — the speaker's unorthodox path. Source: `docs/part1_path.md`.
  - Part 2 (slides 09–19): "Where Things Are Now" — the day-to-day. Source: `docs/part2_present.md`.
  - Part 3 (slides 20–31): "Where Things Are Going" — data science in the AI era. Source: `docs/part3_future.md`.
- **Authoritative content sources you must read:**
  - `SLIDES.md` — per-slide structural manifest. Find your slide's entry. The "Source:" line tells you which part doc to read.
  - The cited part doc — speaker's verbatim phrasings, editorial direction, tone notes.
- **Architecture spec:** `SPECIFICATION.md`.
- **Visual style spec:** `SLIDE_STYLE.md`.

---

## Cardinal Rule: Visual-First with Inline SVG

Every slide must be **primarily visual**. Bullet points and paragraphs are forbidden. SVG diagrams, animated graphics, and visual metaphors are the primary communication medium.

What's allowed:
- Short titles (one line)
- Brief subtitles (one line)
- Terse SVG labels (single words or short phrases)
- A centerpiece quote treated as wordmark-scale typography, paired with a supporting SVG element

If your slide ends up being more than ~30 words of body text, you've done it wrong.

---

## Component Contract

Every slide is a `React.FC<SlideProps>`:

```ts
// src/types.ts (already exists, do not modify)
export interface SlideProps {
  isActive: boolean;
  direction: 'forward' | 'backward' | null;
}

export type SlideComponent = React.FC<SlideProps>;
```

Canonical slide skeleton:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const NNSlideName: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="optional one-line subtitle">Slide Title</SlideTitle>
      <div className="relative w-full max-w-[90vw] h-[70vh]">
        <svg viewBox="0 0 1000 480" className="w-full h-full">
          {/* SVG content */}
        </svg>
      </div>
    </SlideContainer>
  );
};

export default NNSlideName;
```

You may destructure `isActive` and `direction` from props if you need them for animation logic, but you don't have to — `SlideContainer` already handles entry/exit animations via Framer Motion `AnimatePresence` upstream.

`SlideContainer` provides full-viewport sizing (100vw × 100vh), dark background, centered children, fade+y-slide entry/exit, and standard padding. **Do not replicate that wrapping yourself.**

`SlideTitle` is optional. Use it for slides that need a clear title/subtitle. Slides whose visual *is* the whole thing (e.g., wordmark-scale quote slides) may omit it.

---

## Layout Rules (Non-Negotiable)

- Use **viewport-relative units**: `max-w-[90vw]`, `h-[70vh]`, `w-full`, `min-h-[60vh]`, etc.
- **NEVER use** `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, or any pixel/rem-based max-width on slide content. These cap content at fixed widths and leave whitespace on large screens. Hard rule per `SPECIFICATION.md` §3.5.
- SVG `viewBox` uses logical coordinates (e.g., `viewBox="0 0 1000 480"`). The `<svg>` element uses `className="w-full h-full"` to scale responsively.
- Content must fit **one viewport**, no scrolling.
- Default 16:9 aspect ratio target.

---

## Color System (Use CSS Custom Properties, Not Hex)

All theme colors are exposed as CSS custom properties on `:root` in `src/styles/global.css`. **Use the variables, never hardcoded hex values.**

| Variable | Hex | Deck-wide meaning |
|---|---|---|
| `--color-bg` | `#0a0e17` | Primary background |
| `--color-bg-alt` | `#0d1321` | Alternate background |
| `--color-bg-card` | `#131a2b` | Cards, panels |
| `--color-primary` | `#00e5ff` | **The path / interest compass / fundamentals** |
| `--color-secondary` | `#ff2d78` | **Domain knowledge / TEI-REX / emphasis** |
| `--color-tertiary` | `#b388ff` | **AI tooling / supporting visuals** |
| `--color-text` | `#f0f0f0` | Primary text |
| `--color-text-muted` | `#a0aec0` | Captions, secondary text |
| `--color-success` | `#00e676` | Right approach, fit, correct |
| `--color-danger` | `#ff1744` | Dead ends, what AI gets wrong, friction |
| `--color-amber` | `#ffab00` | Cautionary, intermediate |

Usage examples:
- SVG: `fill="var(--color-primary)"`, `stroke="var(--color-secondary)"`
- Inline style: `style={{ background: 'var(--color-bg-card)' }}`
- Tailwind classes (defined in `tailwind.config.ts`): `bg-bg`, `text-text-main`, `text-text-muted`, etc.

Rules:
- **Never use more than 3 accent colors** on a single slide. Pick a primary + at most 2 supporting.
- **Color carries deck-wide meaning.** If your slide is about the speaker's path, use `primary`. If about domain knowledge or TEI-REX, use `secondary`. If about AI tooling, use `tertiary`. Don't swap them arbitrarily.

---

## SVG Style Conventions

- **Filled shapes:** low-opacity fill (`opacity="0.08"` to `opacity="0.25"`) with higher-opacity strokes (`opacity="0.4"` to `1.0`). Creates a layered glow effect.
- **Stroke widths:** 1–2px for connections/lines, 1.5–2.5px for borders, 2–3px for emphasis.
- **Rounded corners:** `rx` 6–16 for rectangles depending on size; full-radius (`rx="999"` or pill `rx={height/2}`) for pills.
- **Connection lines:** opacity 0.15–0.3, with `<polygon>` arrowheads (small triangles).
- **Card style:** `rx="12"`, `bg-card` fill, accent-colored border at 25% opacity, padding inside.

Shape language for recurring concepts (use these consistently):

| Concept | Shape | Color |
|---|---|---|
| Path / trajectory step | Small circle or rounded rect node | `primary` |
| Choice point / fork | Diamond or branching point | varies |
| Failed/abandoned branch | Dashed stroke, low opacity | `danger` or muted |
| Door opening / "the role" | Larger node where lines converge | glowing accent |
| TEI-REX skin sample | Small rounded rect, swab-like | `primary` |
| TEI-REX classifier | Larger rectangle / black box | `bg-card` with `secondary` border |
| Compass | Circle with cardinal-direction labels, needle pointing inward | `primary` |

---

## Animations

- Use `framer-motion` for any React-level motion. Use CSS animations only for simple infinite loops (pulse, float).
- Stagger element entrances: title first (~0.2s delay), main visual (~0.4s), secondary elements (~0.6s onward).
- Combine `opacity: 0 → 1` with a subtle transform (`y: 15-30 → 0` or `scale: 0.8 → 1`).
- **Every animation must serve comprehension.** If removing it doesn't reduce understanding, remove it.
- All critical content must be visible within 1 second of slide entrance.
- Background animations (particles, floats) must be subtle (low opacity) — never compete with the main visual.

---

## Recurring Motifs (Cross-Slide Continuity — IMPORTANT)

These visual motifs MUST be consistent across the slides where they appear. If you're building one of these slides, your visual treatment must match the motif's other slides.

| Motif | Slides | Description |
|---|---|---|
| **Compass with needle pointing to "INTERESTING"** | 02 (plant) ↔ 31 (closing) | Literal compass; needle in `primary`; other labels (PRESTIGE, MONEY, PLAN, TITLE) faded in `text-muted`. Slide 31 reuses the same compass with extra brightness and a faint trail of the speaker's path traced around it. |
| **Branching path / intersection diagram** | 03–07 (Part 1 trajectory) | Lines/branches representing the speaker's trajectories. Failed branches are dashed/muted; the pursued branch is solid `primary`. Slide 06 specifically has *three* lines converging on a single node — the intersection lesson. |
| **TEI-REX visual vocabulary** | 16, 17, 18 (case study) ↔ 23 (Part 3 callback) | Skin-sample input node, classifier middle node, three output question marks (dose, type, time). Project color: `secondary`. The callback in slide 23 must use the SAME shapes/colors so the audience recognizes the project on sight. |
| **Dead-ends / forking path** | 19 (bridge) ↔ 29 (rabbit hole) | Multiple branches: most dim/dashed in `danger`, one solid in `primary`/`success`. Slide 19 plants the motif as the senior skill; slide 29 calls it back as the protective skill against AI rabbit holes. |
| **Lever / mechanical advantage** | hinted on 20, full on 27 | Literal lever with audience effort on the short side and "advantage compounding" on the long side. The action items become the fulcrum's foundation. |

If your assigned slide is one of these, **explicitly say so in your report** and describe how you matched the established motif. If your slide is the FIRST occurrence of a motif (e.g., 02, 16, 19), establish it carefully — later slides will rhyme back.

---

## Verbatim Phrasings Policy

The part docs contain the speaker's exact phrasings. **Lift verbatim quotes word-for-word; do not paraphrase.** This is a credibility tool — the speaker's voice should sound like the speaker.

- If the part doc says "verbatim" or marks a line as a direct quote, it must appear exactly as written.
- If the part doc says "near-verbatim", you may make minor cleanup (punctuation, capitalization) but preserve the cadence and the words.
- Each slide's "Conveys" section in `SLIDES.md` flags which phrasings are verbatim.

When in doubt: **prefer the speaker's own words over your paraphrase.**

---

## Slide Registration

After writing your slide file:

1. Save it at `src/slides/NN-Name.tsx` where `NN` is your slide's two-digit number from `SLIDES.md` (zero-padded: `01`, `02`, ..., `31`) and `Name` matches the file name in `SLIDES.md` (PascalCase).
2. Update `src/slides/index.ts`:
   - Add an `import` line for your component (alphabetized by slide number is fine, but in-order is cleanest)
   - Insert your component in the `slides` array at the correct position. Slide 01 goes at index 0, slide 02 at index 1, etc.
3. Confirm typecheck passes by running `npx tsc --noEmit` from the project root. Fix any errors before reporting back.

The manifest currently looks like:

```ts
import type { SlideComponent } from '../types';

export const slides: SlideComponent[] = [
];
```

Earlier slides may already be present when you start; later slides may not yet exist. **Insert your slide at the correct position.** If the array has 4 entries (slides 01–04) and you're building slide 05, append at the end (index 4). If you're building slide 03 and the array has slides 01, 02, 04, 05 — that's a problem; report it instead of trying to fix it.

---

## Output Expected From You

When you finish:

1. The slide file at `src/slides/NN-Name.tsx`
2. The updated `src/slides/index.ts` with your import and array entry
3. A clean typecheck (`npx tsc --noEmit` returns no errors)
4. A short report (~10–20 lines) describing:
   - **Visual concept** — what diagram/metaphor you implemented and why
   - **Colors used** — which CSS custom properties, in their deck-wide meanings
   - **Motif handling** — if your slide is part of a recurring motif, explicitly state which one and how you matched/established it
   - **Verbatim phrasings** — list the exact quotes you included
   - **Tradeoffs / open questions** — anything you'd flag for the reviewer

---

## Out of Scope (Don't Touch)

- Components in `src/components/` (SlideContainer, SlideTitle, ProgressBar)
- The navigation hook (`src/hooks/useSlideNavigation.ts`)
- `src/App.tsx`, `src/main.tsx`, `src/types.ts`, `src/theme.ts`
- `src/styles/global.css`, `tailwind.config.ts`
- Other slide files in `src/slides/`
- Tests / lint / build infrastructure

If you find a real architectural blocker, surface it in your report. Don't try to fix it.

---

## Python Helper Scripts (Optional, Use Sparingly)

If your slide requires SVG content that's impractical to author by hand in JSX (e.g., precise mathematical curves, dense data visualizations, hundreds of programmatic shapes), you may write a Python helper script to generate the SVG.

**Hard rules:**

- **Only Python.** No other scripting languages.
- **Always use a virtual environment at `scripts/.venv/`.** Never install packages on the host system. Never run `pip install` outside the venv.

Setup (one-time, if the venv doesn't already exist):

```bash
cd /home/mriffle/vscode/masters-students-seminar-2026-slides
python3 -m venv scripts/.venv
source scripts/.venv/bin/activate
pip install <packages-you-need>
pip freeze > scripts/requirements.txt
```

If the venv already exists, just activate it: `source scripts/.venv/bin/activate`

Workflow:

1. Save your script in `scripts/` (e.g., `scripts/generate_compass.py`).
2. Run it under the venv to produce an SVG file in `src/assets/generated/` (create the directory if it doesn't exist).
3. Import the SVG in your slide component as a raw string via Vite's `?raw` suffix:
   ```tsx
   import compassSvg from '../assets/generated/compass.svg?raw';
   // ... in JSX:
   <div className="..." dangerouslySetInnerHTML={{ __html: compassSvg }} />
   ```
4. Document any new packages in `scripts/requirements.txt`.

**Most slides will not need this.** Default to authoring SVG directly in JSX. Only reach for Python when JSX-authored SVG would be unreasonable. If you do use it, mention it explicitly in your report so the reviewer can check the script too.

---

## Final Reminder

One slide. Visual-first. Use the deck's colors and motifs in their deck-wide meanings. Lift verbatim quotes faithfully. Pass typecheck. Report back with a tight summary so the reviewer can verify your work efficiently.
