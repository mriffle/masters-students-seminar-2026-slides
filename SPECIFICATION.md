# SPECIFICATION: Slide Deck Architecture

> This file describes the **general-purpose architecture** for building self-contained, visual-first HTML slide presentations using React, TypeScript, and Vite. It is technology- and process-focused — applicable to any slide deck built with this system. The specific slide content and visual styling for a given project live in separate files (see below).

---

## 1. Companion Documents

This specification works in concert with two other files. All three must be read to have a complete picture of the project:

| File | Purpose | When to edit |
|---|---|---|
| **`SPECIFICATION.md`** (this file) | Architecture, technology stack, project structure, build pipeline, testing, development workflow. General-purpose — applies to any slide deck built with this system. | When changing how the project is built, tested, or structured. |
| **`SLIDES.md`** | Slide content: ordered list of slides, each slide's purpose, what it conveys, its justification for existing, key visual description, and source file mapping. Project-specific. | When changing *what* the slides say — adding, removing, reordering, or revising slide content. This is the primary file for iterative content development. |
| **`SLIDE_STYLE.md`** | Visual design and style guide: color palette, typography, layout rules, SVG diagram conventions, animation behavior, component styling patterns. Can be customized per-project. | When changing *how* the slides look — colors, fonts, spacing, animation style. |

### Recommended Workflow

1. **Iterate on `SLIDES.md`** until the content outline is finalized
2. **Review `SLIDE_STYLE.md`** to confirm the visual language is appropriate
3. **Implement** the slides in code, following this specification for architecture
4. **Test** thoroughly (see Section 7)
5. **Build** the final single-file output

---

## 2. Project Purpose

This project produces a **single, self-contained HTML file** that serves as a visual slide presentation. The final artifact is designed to be hosted on **GitHub Pages** (or any static host) as one HTML file with zero external runtime dependencies — all assets (SVGs, images, fonts, styles) are inlined or encoded.

### Cardinal Rule: Visual-First with SVG

**The most paramount rule of this entire project.** Every slide must be primarily visual. SVG diagrams, animated graphics, and visual metaphors are the primary communication medium — not text. If a concept can be conveyed with a diagram instead of words, it *must* be conveyed with a diagram. Inline SVG in React JSX is the default medium for all visual content. This rule is echoed in `SLIDE_STYLE.md` and must be respected in every slide implementation.

### Design Goals

| Goal | Description |
|---|---|
| **Self-contained** | One `.html` file, no external fetches at runtime. All images base64-encoded or inline SVG. All CSS/JS bundled. |
| **Modular authoring** | Each slide is an independent React component in its own file. Slides are assembled at build time into a linear deck. |
| **Iterative-friendly** | Adding, removing, reordering, or editing a single slide should not require touching other slides. A central manifest controls order. |
| **Visually consistent** | A shared theme (colors, typography, spacing, animation timing) enforced via a theme object and CSS variables, as defined in `SLIDE_STYLE.md`. |
| **Viewport-filling** | Slides must fill the entire browser viewport on any screen size. Content containers should use viewport-relative units (e.g., `max-w-[90vw]`, `h-[70vh]`) rather than fixed pixel or rem-based max-width constraints (e.g., avoid `max-w-4xl`, `max-w-5xl`). Slides must never appear small or centered in a sea of empty space on large screens. |
| **Visual-first storytelling** | Heavy use of inline SVG, animated diagrams, and visual metaphors. Minimal text per slide. See `SLIDE_STYLE.md` Section 1. |
| **Reproducible & tested** | Deterministic build via `npm` scripts. Strict type checking. Linting. Unit tests. All tests must pass before a build is considered valid. |

---

## 3. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Language** | TypeScript (strict mode) | Type safety, IDE support, industry standard |
| **UI Framework** | React 18+ | Component model maps perfectly to modular slides; JSX composes inline SVG naturally |
| **Bundler** | Vite | Fast dev server with HMR, excellent tree-shaking, single-file build support via `vite-plugin-singlefile` |
| **Styling** | Tailwind CSS + CSS custom properties | Utility-first for rapid iteration; CSS variables for theme tokens defined in `SLIDE_STYLE.md` |
| **Animations** | Framer Motion | Declarative React animations, widely adopted, integrates with `AnimatePresence` for slide transitions |
| **SVG/Diagrams** | Inline React SVG components | Keeps everything in the component tree; no external files; enables animation and interactivity |
| **Slide Framework** | Custom (minimal, ~200 LOC) | Thin slide container + navigation hook; avoids heavy frameworks like reveal.js for full control and minimal bundle |
| **Asset Generation** | Python 3 (venv) scripts (optional) | For generating complex SVGs or data visualizations that are impractical to hand-code in JSX |
| **Build Output** | Single `.html` file | `vite-plugin-singlefile` inlines all JS, CSS, and assets into one file |
| **Testing** | Vitest + React Testing Library | Fast, Vite-native test runner; industry-standard React component testing |
| **Linting** | ESLint (with TypeScript plugin) | Strict linting to catch bugs and enforce style |
| **Type Checking** | TypeScript `strict: true` | Maximum type safety — no `any`, no implicit returns, etc. |

---

## 4. Project Structure

```
project-root/
├── SPECIFICATION.md              # This file — architecture & process
├── SLIDES.md                     # Slide content definitions (project-specific)
├── SLIDE_STYLE.md                # Visual style guide (customizable per-project)
├── package.json                  # Node dependencies & scripts
├── tsconfig.json                 # TypeScript configuration (strict mode)
├── vite.config.ts                # Vite config with singlefile plugin
├── vitest.config.ts              # Vitest test configuration
├── tailwind.config.ts            # Tailwind theme (colors, fonts from SLIDE_STYLE.md)
├── postcss.config.js             # PostCSS with Tailwind + autoprefixer
├── .eslintrc.cjs                 # ESLint configuration
├── index.html                    # Vite entry HTML
├── src/
│   ├── main.tsx                  # React entry point, renders <App />
│   ├── App.tsx                   # Assembles slides from manifest, provides navigation
│   ├── theme.ts                  # Theme constants (mirrors SLIDE_STYLE.md palette)
│   ├── types.ts                  # Shared TypeScript types (SlideProps, etc.)
│   ├── hooks/
│   │   └── useSlideNavigation.ts # Keyboard, touch, click, and hash navigation
│   ├── components/
│   │   ├── SlideContainer.tsx    # Full-viewport wrapper, transition logic
│   │   ├── SlideTitle.tsx        # Reusable title/heading component
│   │   ├── ProgressBar.tsx       # Thin progress indicator
│   │   └── ...                   # Other shared UI primitives
│   ├── slides/
│   │   ├── index.ts              # SLIDE MANIFEST — ordered array of slide components
│   │   ├── 01-SlideName.tsx      # Individual slide components (one per slide)
│   │   ├── 02-SlideName.tsx
│   │   └── ...
│   ├── assets/
│   │   ├── fonts/                # Embedded font files (woff2)
│   │   └── generated/            # Output from Python scripts (SVGs, base64 images)
│   └── styles/
│       └── global.css            # Tailwind directives, CSS custom properties, global styles
├── src/__tests__/                # Unit tests
│   ├── useSlideNavigation.test.ts
│   ├── SlideContainer.test.tsx
│   ├── ProgressBar.test.tsx
│   ├── App.test.tsx
│   └── slides/                   # Per-slide smoke tests
│       └── ...
├── scripts/                      # Optional Python asset generation
│   ├── requirements.txt
│   ├── generate_assets.py
│   └── ...
├── dist/
│   └── index.html                # BUILD OUTPUT — the single-file presentation
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Pages deployment (optional)
```

---

## 5. Core Architecture

### 5.1 Slide Manifest & Ordering

The file `src/slides/index.ts` exports an ordered array of slide components:

```typescript
import SlideOne from './01-SlideName';
import SlideTwo from './02-SlideName';
// ...

export const slides = [
  SlideOne,
  SlideTwo,
  // ...
];
```

- **Reorder**: Change the array order
- **Add**: Create a new component file, import it, insert into the array
- **Remove**: Remove from the array

No other file needs to change. This is the single source of truth for deck composition. The mapping from this manifest to slide definitions in `SLIDES.md` is by file name.

### 5.2 Slide Component Contract

Every slide component conforms to this interface (defined in `src/types.ts`):

```typescript
interface SlideProps {
  isActive: boolean;
  direction: 'forward' | 'backward' | null;
}

type SlideComponent = React.FC<SlideProps>;
```

A minimal slide:

```tsx
const MySlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <SlideContainer>
      {/* SVG diagram and minimal text */}
    </SlideContainer>
  );
};

export default MySlide;
```

`SlideContainer` handles:
- Full-viewport sizing (`100vw × 100vh`) — the container itself is always full-screen
- Background color from theme
- Entry/exit animations via Framer Motion `AnimatePresence`
- Consistent padding and safe areas (as defined in `SLIDE_STYLE.md`)

**Important**: Content *within* each slide must also scale to fill the viewport. Use viewport-relative max-width (e.g., `max-w-[90vw]`) and height (e.g., `h-[70vh]`) for content containers. Never use fixed max-width classes like `max-w-4xl` or `max-w-5xl` which cap content at pixel-based widths and leave excessive whitespace on large screens.

### 5.3 Navigation

The `useSlideNavigation` hook manages all navigation:

- **Keyboard**: Right arrow / Space / Enter = next; Left arrow / Backspace = previous; Home = first; End = last
- **Touch/Swipe**: Horizontal swipe gestures (>50px threshold)
- **URL hash**: `#slide=N` (1-indexed) for direct linking and browser history
- **Progress bar**: Thin bar at bottom showing position in deck

### 5.4 Theme System

`src/theme.ts` exports constants that mirror the palette defined in `SLIDE_STYLE.md`. These values are also set as CSS custom properties (`--color-primary`, `--color-bg`, etc.) on `:root` in `global.css`, so both React code and Tailwind/CSS can reference them.

When the style guide changes, update:
1. `SLIDE_STYLE.md` (source of truth for design intent)
2. `src/theme.ts` (runtime constants)
3. `src/styles/global.css` (CSS custom properties)
4. `tailwind.config.ts` (Tailwind color tokens)

---

## 6. Build Pipeline

### 6.1 npm Scripts

```
npm run dev        → Vite dev server with HMR (for iterating on slides)
npm run build      → Type check + lint + test + production build → dist/index.html
npm run preview    → Serve dist/ locally to verify final output
npm run test       → Run all unit tests via Vitest
npm run test:watch → Run tests in watch mode during development
npm run lint       → Run ESLint on all TypeScript/TSX files
npm run typecheck  → Run tsc --noEmit for type checking without emitting
npm run gen-assets → Run Python venv scripts to regenerate assets (optional)
```

### 6.2 Build Steps (for `npm run build`)

1. `tsc --noEmit` — Type check all TypeScript (strict mode, must pass with zero errors)
2. `eslint` — Lint all source files (must pass with zero errors)
3. `vitest run` — Run all unit tests (must pass with zero failures)
4. `vite build` — Compile TypeScript + React, purge unused Tailwind CSS, inline everything via `vite-plugin-singlefile`
5. Output: `dist/index.html` — a single, standalone HTML file

**A build is only valid if steps 1–3 all pass.**

### 6.3 Asset Generation (Python, optional)

For complex scientific diagrams that are difficult to create purely in React:

1. Python scripts in `scripts/` use libraries like `svgwrite`, `matplotlib`, or `drawsvg` to produce SVGs
2. Output SVGs are written to `src/assets/generated/`
3. These are imported in React components as inline SVG strings (Vite handles this with `?raw` imports)
4. The build inlines them into the final HTML

**Python environment setup:**
```bash
python3 -m venv scripts/.venv
source scripts/.venv/bin/activate
pip install -r scripts/requirements.txt
```

### 6.4 GitHub Pages Deployment

Two options:
1. **Manual**: Run `npm run build`, commit `dist/index.html`, push to `gh-pages` branch
2. **Automated**: GitHub Actions workflow that builds on push to `main` and deploys to Pages

The Actions workflow (`.github/workflows/deploy.yml`) would:
1. Checkout code
2. Setup Node, install deps
3. (Optional) Setup Python venv, generate assets
4. Run `npm run build` (which includes typecheck, lint, test)
5. Deploy `dist/` to GitHub Pages

---

## 7. Testing Requirements

Testing is an essential, non-negotiable part of the development process. All testable code must be tested using industry-standard approaches. **All tests must pass at all times.**

### 7.1 Test Runner

- **Vitest** — Vite-native, fast, compatible with Jest API
- **React Testing Library** — for component rendering tests
- **jsdom** environment for simulating the DOM in tests

### 7.2 What Must Be Tested

| Area | What to test | Tool |
|---|---|---|
| **Type safety** | All code compiles under `strict: true` with zero errors | `tsc --noEmit` |
| **Linting** | All code passes ESLint with zero errors/warnings | `eslint` |
| **Navigation hook** | `useSlideNavigation` correctly handles keyboard events, touch gestures, hash changes, clamping | Vitest + testing-library hooks |
| **Shared components** | `SlideContainer`, `SlideTitle`, `ProgressBar` render correctly with expected props | Vitest + React Testing Library |
| **App shell** | `App.tsx` renders the correct slide based on navigation state, wraps in `AnimatePresence` | Vitest + React Testing Library |
| **Slide manifest** | `slides` array has the expected length and all entries are valid React components | Vitest |
| **Individual slides** | Each slide renders without errors (smoke test: mount the component, assert no crash) | Vitest + React Testing Library |
| **Theme consistency** | `theme.ts` values match CSS custom properties in `global.css` | Vitest (snapshot or value comparison) |

### 7.3 Test Organization

- Tests live in `src/__tests__/` mirroring the source structure
- Slide smoke tests can be co-located or in `src/__tests__/slides/`
- Test files use the `.test.ts` or `.test.tsx` extension

### 7.4 Testing Commands

```bash
npm run test           # Run all tests once (CI mode)
npm run test:watch     # Run tests in watch mode (development)
npm run lint           # Lint all source files
npm run typecheck      # Type check all source files
```

### 7.5 CI Gate

No code should be merged or deployed unless **all** of the following pass:
- `npm run typecheck` — zero errors
- `npm run lint` — zero errors
- `npm run test` — zero failures
- `npm run build` — successful output

---

## 8. Conventions for Iterative Development

### 8.1 Editing a Single Slide

1. Open `src/slides/NN-SlideName.tsx`
2. Edit the component (follow `SLIDE_STYLE.md` visual conventions)
3. `npm run dev` provides instant HMR feedback
4. No other files need to change (unless updating the slide definition in `SLIDES.md`)

### 8.2 Adding a New Slide

1. Define the slide in `SLIDES.md` (purpose, visual description, justification)
2. Create `src/slides/NN-NewSlide.tsx` following the `SlideProps` contract
3. Import and insert into the array in `src/slides/index.ts`
4. Add a smoke test in `src/__tests__/slides/`
5. Run `npm run test` to verify

### 8.3 Removing a Slide

1. Remove from the array in `src/slides/index.ts`
2. Optionally delete the component file and its test
3. Update `SLIDES.md` to reflect the removal

### 8.4 Changing the Visual Style

1. Update `SLIDE_STYLE.md` with the new design intent
2. Update `src/theme.ts`, `src/styles/global.css`, and `tailwind.config.ts` to match
3. Review all slides for visual consistency

### 8.5 Build After Every Change

**Every session that modifies source files must end with a successful `npm run build`.** The `dist/index.html` file is the deliverable artifact and must always reflect the latest source. Never leave the build output stale.

```bash
npm run build
# Runs: typecheck → lint → test → vite build
# Output: dist/index.html (single standalone file)
```

This is non-negotiable: if code was changed, `dist/index.html` must be rebuilt before the session ends.

---

## 9. Dependencies

### Node (package.json)

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI framework |
| `typescript` | Language |
| `vite` | Bundler / dev server |
| `@vitejs/plugin-react` | React support for Vite |
| `vite-plugin-singlefile` | Inline everything into one HTML |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling |
| `framer-motion` | Animations |
| `vitest` | Test runner |
| `@testing-library/react` | React component testing |
| `@testing-library/jest-dom` | DOM assertion matchers |
| `jsdom` | DOM simulation for tests |
| `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` | Linting |
| `eslint-plugin-react`, `eslint-plugin-react-hooks` | React-specific linting |

### Python (scripts/requirements.txt, optional)

| Package | Purpose |
|---|---|
| `svgwrite` or `drawsvg` | Programmatic SVG generation |
| `matplotlib` | If needed for chart-style diagrams |

---

## 10. Key Design Decisions & Rationale

### 10.1 Why Not reveal.js or Slidev?

- **reveal.js** adds significant bundle weight, has opinions about structure that fight customization, and makes single-file output harder
- **Slidev** is Markdown-based and Vue-based — doesn't align with our React/TypeScript stack
- A **thin custom framework** (~200 lines) gives total control over layout, animation, and the component model while keeping the bundle minimal

### 10.2 Why Vite + vite-plugin-singlefile?

- Vite is the de facto standard bundler for modern React
- `vite-plugin-singlefile` is purpose-built for exactly our use case: one HTML file with everything inlined
- Supports base64 inlining of fonts and images automatically

### 10.3 Why React for a Slide Deck?

- Each slide is a component — natural modularity
- JSX makes it easy to compose complex **inline SVG** diagrams with layout — this is critical for the visual-first approach
- Framer Motion integrates seamlessly for animations
- TypeScript catches errors early during iterative editing

### 10.4 Why Inline SVG over External Images?

- SVG elements live in the React component tree, making them animatable with Framer Motion
- No external file dependencies — everything is self-contained in the component
- SVG scales perfectly to any screen size
- Individual elements within an SVG can be styled, animated, and interactive
- This is the foundation of the **visual-first** approach

---

## 11. Acceptance Criteria

- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run test` passes with zero failures
- [ ] `npm run build` produces a single `dist/index.html`
- [ ] Opening `dist/index.html` in a browser displays all slides with navigation working
- [ ] Visual style matches `SLIDE_STYLE.md` consistently across all slides
- [ ] Each slide is primarily visual (SVG-based), not textual — per `SLIDE_STYLE.md` Section 1
- [ ] Slide content matches the definitions in `SLIDES.md`
- [ ] Keyboard, touch, and hash-based navigation all function
- [ ] Adding/removing/reordering slides requires only editing the manifest + component files
- [ ] All fonts, images, and SVGs are embedded in the HTML file
- [ ] The file renders correctly on modern browsers (Chrome, Firefox, Safari, Edge)
