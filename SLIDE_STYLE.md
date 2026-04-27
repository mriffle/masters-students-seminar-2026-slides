# SLIDE_STYLE: Visual Design & Style Guide

> This file defines the visual language, color system, typography, layout rules, animation behavior, and overall aesthetic direction for the slide deck. It is the single source of truth for *how the slides look*. This file is project-agnostic in structure — it can be customized per-project to change the visual identity without touching the architecture or slide content.

---

## 1. Cardinal Rule: Visual-First

**The most paramount rule of this entire project.**

Every slide must be primarily visual. SVG diagrams, animated graphics, charts, and visual metaphors are the primary communication medium. Text is secondary — used only for short titles, concise labels, and minimal captions. If a concept can be conveyed with a diagram instead of words, it *must* be conveyed with a diagram.

This means:
- **SVG is the default medium** for all diagrams, illustrations, and data representations
- Slides should be immediately understandable from the visuals alone, without reading body text
- Bullet points and paragraphs of text are forbidden
- Short titles (one line) and brief subtitles (one line) are acceptable
- Labels on diagrams should be terse — single words or short phrases
- If a slide feels "wordy," it needs to be redesigned as a visual

---

## 2. Color System

### 2.1 Mode

**Dark theme.** All slides use dark backgrounds with vibrant foreground colors. This creates high visual impact, reduces eye strain in presentation settings, and gives diagrams a bold, striking appearance.

### 2.2 Palette

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#0a0e17` | Primary background — near-black with a blue undertone |
| `bg-alt` | `#0d1321` | Alternate/lighter background for variety |
| `bg-card` | `#131a2b` | Card and panel backgrounds, subtle lift from bg |
| `primary` | `#00e5ff` | Primary accent — vivid cyan/teal. Used for key elements, the main subject, peptides |
| `secondary` | `#ff2d78` | Secondary accent — electric magenta/pink. Used for emphasis, danger-adjacent, combined outputs |
| `tertiary` | `#b388ff` | Tertiary accent — soft violet. Used for Gene Ontology, supporting visuals |
| `text` | `#f0f0f0` | Primary text — near-white |
| `text-muted` | `#a0aec0` | Secondary text — muted light gray for captions, labels, descriptions |
| `success` | `#00e676` | Positive/correct — green. Used for "right approach" visuals, taxonomy |
| `danger` | `#ff1744` | Negative/wrong — red. Used for "wrong approach" visuals, errors, unknowns |
| `amber` | `#ffab00` | Warm accent — amber/gold. Used for annotated databases, intermediate elements |

### 2.3 Color Usage Rules

- **Never use more than 3 accent colors per slide** — pick a primary and at most 2 supporting accents
- **Backgrounds are always dark** — `bg`, `bg-alt`, or `bg-card`. Never white or light backgrounds
- **SVG elements use color with opacity** — filled shapes should typically use `opacity="0.1"` to `opacity="0.25"` for fills, with full-opacity strokes. This creates a layered, glowing feel
- **Text contrast**: Headings use `text` (#f0f0f0), body/captions use `text-muted` (#a0aec0). Never use low-contrast text
- **Color carries meaning**: Once a color is associated with a concept (e.g., `primary` = peptides, `success` = taxonomy), that association must be consistent across all slides

### 2.4 CSS Custom Properties

All colors are available as CSS custom properties on `:root`:

```css
--color-bg: #0a0e17;
--color-bg-alt: #0d1321;
--color-bg-card: #131a2b;
--color-primary: #00e5ff;
--color-secondary: #ff2d78;
--color-tertiary: #b388ff;
--color-text: #f0f0f0;
--color-text-muted: #a0aec0;
--color-success: #00e676;
--color-danger: #ff1744;
--color-amber: #ffab00;
```

Use these in SVG `fill` and `stroke` attributes via `var(--color-primary)` etc. This ensures a single point of change if the palette is updated.

---

## 3. Typography

### 3.1 Font Families

| Role | Font | Fallback |
|---|---|---|
| **Sans-serif (body/headings)** | Inter | system-ui, sans-serif |
| **Monospace (code/data)** | JetBrains Mono | Fira Code, monospace |

### 3.2 Font Loading

Fonts are loaded via Google Fonts `@import` in the global CSS. For fully offline/self-contained builds, fonts should be embedded as base64 woff2 files.

### 3.3 Type Scale

| Element | Size | Weight | Color |
|---|---|---|---|
| Slide title | `text-4xl` to `text-5xl` (2.25–3rem) | Bold (700) | `text` |
| Slide subtitle | `text-lg` to `text-xl` (1.125–1.25rem) | Light (300) | `text-muted` |
| Wordmark (title slide) | `text-7xl` to `text-8xl` (4.5–6rem) | Black (900) | Per-segment coloring |
| SVG labels | 10–14px | 500–700 | Accent color of the element |
| SVG captions/footnotes | 8–12px | 400 | `text-muted` |
| Monospace data | 9–12px | 400–600 | Accent or `text-muted` |

### 3.4 Type Rules

- **Titles are always one line.** If a title wraps, it's too long — shorten it.
- **Subtitles are one line.** Brief clarifying context, not a sentence.
- **No paragraphs on slides.** If text needs multiple sentences, it should be a visual instead.
- **Monospace for data values** — peptide sequences, protein IDs, abundance numbers, database names

---

## 4. Layout

### 4.1 Slide Dimensions

- Full viewport: `100vw × 100vh`
- No scrolling within a slide — everything must fit in one screen
- Design target aspect ratio: **16:9** (standard presentation)

### 4.2 Spacing & Safe Areas

- Padding: `px-16 py-12` (4rem horizontal, 3rem vertical) from slide edges
- The progress bar occupies the bottom 4px — content should not overlap it
- Title area: top portion of the slide (top 15–20%)
- Visual area: center 60–70% of the slide
- Caption/footnote area: bottom 10%

### 4.3 Composition Patterns

- **Centered single visual**: Title at top, one large SVG diagram centered, caption at bottom. Used for conceptual slides (Slides 2, 3, 5, 7, 8, 10).
- **Side-by-side comparison**: Two visuals divided by a vertical line, each with its own header. Used for contrast slides (Slide 4).
- **Grid/card layout**: Multiple equal-sized panels in a row. Used for multi-item slides (Slides 6, 12).
- **Browser mockup**: A fake browser chrome surrounding app content. Used for demo slides (Slide 13).

### 4.4 SVG Viewbox Standards

- SVG diagrams should use a `viewBox` with logical coordinates (e.g., `"0 0 1000 480"`)
- The SVG element should have `className="w-full h-full"` to fill its container responsively
- Never use fixed pixel widths/heights on SVG elements — always relative/responsive
- Coordinate system should be designed for the 16:9 aspect ratio

---

## 5. SVG Diagram Style

Since SVG is the primary visual medium, a consistent SVG style is critical.

### 5.1 General SVG Rules

- **Inline SVG in JSX** — all diagrams are React components with SVG elements directly in JSX, not external `.svg` files
- **Use CSS variables for colors** — `fill="var(--color-primary)"` not `fill="#00e5ff"`
- **Layered opacity** — filled shapes use low opacity (0.08–0.25) with higher-opacity strokes (0.4–1.0) to create a glowing, layered aesthetic
- **Rounded corners** — `rx` on rectangles (6–16 depending on size), `rx` on pill shapes (full radius)
- **Consistent stroke widths** — 1–2px for connections/lines, 1.5–2.5px for borders, 2–3px for emphasis

### 5.2 Node & Shape Language

| Concept | Shape | Style |
|---|---|---|
| Peptide | Pill/rounded rect (large rx) | `primary` accent, glowing |
| Protein | Rectangle (small rx) | Muted, `bg-card` fill, `text-muted` stroke |
| Organism | Small circle | Organism-specific color |
| Taxonomy node | Circle | `success` accent |
| GO node | Circle | `tertiary` accent |
| Database | Rectangle with badge | `amber` accent |
| Arrow/connection | Line with arrowhead polygon | `text-muted`, low opacity |
| Discarded/wrong | Dashed stroke, low opacity | `danger` or very faded |
| Highlighted/correct | Solid stroke, higher opacity, glow filter | `success` or `primary` |

### 5.3 Connection Lines

- Straight lines for direct relationships
- Opacity 0.15–0.3 for connection lines (they should not overpower nodes)
- Arrowheads as small `<polygon>` elements
- Fan-out patterns should feel dense but not cluttered — adjust spacing to avoid overlap

---

## 6. Animation & Transitions

### 6.1 Slide Transitions

- Slides transition with **fade + vertical shift**: enter from bottom (y: 30 → 0, opacity: 0 → 1), exit upward (y: 0 → -30, opacity: 1 → 0)
- Transition duration: **500ms** with easing `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease)
- Use `AnimatePresence` with `mode="wait"` so slides don't overlap

### 6.2 Element Entrance Animations

- Elements within a slide animate in with **staggered delays** — first the title, then the main visual, then secondary elements
- Base delay: **200–400ms** after slide entrance
- Stagger between elements: **100–200ms**
- All entrances use `opacity: 0 → 1` combined with a subtle transform (`y: 15–30 → 0` or `scale: 0.8 → 1`)

### 6.3 Ongoing Animations

- **Particle backgrounds**: Slow, gentle floating (`duration: 6–14s`, infinite repeat)
- **Data flow dots**: Dots traveling along connection lines to show direction (`duration: 1–2s`, infinite repeat with delay)
- **Pulsing indicators**: Gentle pulse for "live" indicators (`animate-pulse` utility)

### 6.4 Animation Rules

- **Every animation must serve comprehension** — if removing an animation wouldn't reduce understanding, remove it
- **No animation should distract from the main visual** — keep background animations subtle (low opacity)
- **Animations should not block reading** — critical content should be visible within 1 second of slide entrance
- **Use `framer-motion`** for all React-level animations. Use CSS animations only for simple infinite loops (pulse, float)

---

## 7. Component Styling Patterns

### 7.1 Cards

```
background: var(--color-bg-card)
border: 1px solid {accent}25    /* accent color at 25% opacity */
border-radius: 12px (rounded-xl)
padding: 20px (p-5)
```

### 7.2 Badges/Labels

```
color: {accent}
background: {accent} at 10% opacity
border: 1px solid {accent} at 30% opacity
border-radius: 9999px (rounded-full)
padding: 4px 12px
font-size: 14px, font-weight: 600
```

### 7.3 Buttons (decorative, not interactive)

```
background: linear-gradient(135deg, var(--color-primary), var(--color-tertiary))
color: var(--color-bg)
border-radius: 9999px
padding: 12px 32px
font-weight: 600
```

### 7.4 Dividers

```
width: 1px (vertical) or height: 1px (horizontal)
background: rgba(255, 255, 255, 0.1)
```

### 7.5 Progress Bar

```
position: fixed bottom
height: 4px (h-1)
track: rgba(255, 255, 255, 0.05)
fill: linear-gradient(90deg, var(--color-primary), var(--color-tertiary))
transition: width 500ms ease-out
```

---

## 8. Responsiveness

The primary target is a **16:9 desktop/projector display**. However:

- All layouts should use relative units (%, vh/vw, flex, grid) not fixed pixels
- SVG viewboxes ensure diagrams scale correctly
- Tailwind responsive prefixes (`md:`, `lg:`) can be used for minor adjustments
- Touch/swipe navigation should work on tablets
- The single-file output should render correctly on any modern browser

---

## 9. Accessibility Considerations

- **Color is never the sole differentiator** — shapes, labels, and position also distinguish elements
- **Text contrast** meets WCAG AA against dark backgrounds
- **Keyboard navigation** is fully functional (arrow keys, space, home, end)
- **Semantic HTML** where possible (headings, landmarks)

---

## 10. Applying This Style to a New Project

To use this style guide for a different slide deck:

1. Copy this file to the new project
2. Modify Section 2 (Color System) to change the palette
3. Modify Section 3 (Typography) to change fonts
4. Modify Section 5 (SVG Diagram Style) to update the shape language for new domain concepts
5. All structural patterns (layout, animation, responsiveness) remain unchanged
6. Update `src/theme.ts`, `src/styles/global.css`, and `tailwind.config.ts` to match the new palette
