# Slide Deck System

A modular system for building **self-contained, visual-first HTML slide presentations** in React + TypeScript + Vite. The build output is a single `dist/index.html` file with all JavaScript, CSS, fonts, and SVGs inlined — no external runtime dependencies — suitable for hosting on GitHub Pages or any static host.

The core idea: each slide is an independent React component, slides are composed at build time via a manifest, and visuals are inline SVG (animated with Framer Motion) rather than external images. The full architecture, design conventions, and content rules are documented in three companion specs:

- **`SPECIFICATION.md`** — architecture, technology stack, build pipeline, testing requirements. General-purpose; reusable for any deck built with this system.
- **`SLIDE_STYLE.md`** — visual design language: color palette, typography, layout rules, SVG/animation conventions.
- **`SLIDES.md`** — per-slide content manifest specific to a deck (purpose, key visual, source-of-truth phrasings, ordering).

To author a new deck with this system, replace `SLIDES.md` and the files under `src/slides/` and `docs/` with your own content; the rest of the scaffolding (`src/App.tsx`, `src/components/`, `src/hooks/`, build pipeline, theming) stays the same.

## This Deck

This repository's deck is a 31-slide seminar talk for University of Washington Data Science Masters students:
*"There's no 'right' path to a career in data science — and skills to focus on in the age of AI"* (Michael Riffle, Senior Research Scientist).

**Hosted version:** <https://mriffle.github.io/masters-students-seminar-2026-slides/>

The talk is structured in three parts (where I've been; where things are now; where things are going), and the originating thinking for each part lives under `docs/`.

## Repository Layout

```
.
├── SPECIFICATION.md         Architecture & build pipeline (general-purpose)
├── SLIDE_STYLE.md           Visual style guide (theme, typography, motion)
├── SLIDES.md                This deck's slide-by-slide manifest
├── README.md                You are here
├── LICENSE
│
├── package.json             Node dependencies and npm scripts
├── tsconfig.json            TypeScript config (strict mode)
├── vite.config.ts           Vite + vite-plugin-singlefile config
├── tailwind.config.ts       Tailwind theme tokens (mirror SLIDE_STYLE.md)
├── postcss.config.js        Tailwind/autoprefixer setup
├── index.html               Vite entry HTML
│
├── src/
│   ├── main.tsx             React entry point
│   ├── App.tsx              Slide host: assembles manifest, wires navigation
│   ├── theme.ts             Theme constants (colors, spacing, motion timing)
│   ├── types.ts             Shared TypeScript types (SlideProps, etc.)
│   ├── components/
│   │   ├── SlideContainer.tsx   Full-viewport wrapper with entry/exit motion
│   │   ├── SlideTitle.tsx       Reusable title primitive
│   │   └── ProgressBar.tsx      Thin progress indicator
│   ├── hooks/
│   │   └── useSlideNavigation.ts  Keyboard, touch, hash, click navigation
│   ├── slides/
│   │   ├── index.ts             SLIDE MANIFEST (ordered array — single source of truth)
│   │   └── NN-SlideName.tsx     One file per slide (01–31)
│   └── styles/
│       └── global.css           Tailwind directives + CSS custom properties
│
├── docs/                    Originating talk material (for this deck only)
│   ├── overview.md
│   ├── part1_path.md
│   ├── part2_present.md
│   ├── part3_future.md
│   ├── SLIDE_BUILDER_BRIEFING.md
│   └── SLIDE_REVIEWER_BRIEFING.md
│
├── scripts/
│   └── screenshot-slide.mjs   Playwright helper: render a single slide to PNG
│
├── .github/workflows/
│   └── static.yml             GitHub Pages deployment workflow
│
└── dist/
    └── index.html             BUILD OUTPUT — single self-contained HTML file
```

The `tmp/` directory (gitignored) is used for ad-hoc per-slide PNG screenshots produced by `scripts/screenshot-slide.mjs`.

## Adding, Reordering, or Removing a Slide

The slide manifest at `src/slides/index.ts` is the single source of truth for deck composition:

- **Add a slide:** create `src/slides/NN-NewSlide.tsx`, import it, insert it into the array.
- **Reorder:** change the array order.
- **Remove:** delete the entry (and optionally the file).

No other file needs to change. Slides are numbered with a zero-padded two-digit prefix (`01` through `NN`) for easy sorting.

## Building

### Prerequisites

- **Node.js 18+** (Vite 5 requires it). On a system with `nvm`: `nvm install 20 && nvm use 20`.

### One-time setup

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at <http://localhost:5173/> with hot module reload. Direct-link to a specific slide via `#slide=N` (1-indexed).

### Production build

```bash
npm run build
```

Runs `tsc` (type check) followed by `vite build`, producing the single self-contained file at `dist/index.html`. Open it directly in any modern browser — no server required.

### Preview the production build

```bash
npm run preview
```

### Per-slide PNG screenshot (optional)

For iterative review of an individual slide without rebuilding the whole deck:

```bash
# With the dev server running on localhost:5173:
node scripts/screenshot-slide.mjs <slide-number> <output-path> [width] [height]

# Example:
node scripts/screenshot-slide.mjs 16 tmp/slide-16.png
```

Defaults to a 1920×1080 viewport and waits 5 s after `networkidle` so any entrance animations have settled. Useful for visual diffing during slide development.

## Deployment

`.github/workflows/static.yml` deploys `dist/` to GitHub Pages on every push to `main`. To deploy elsewhere, copy `dist/index.html` to any static host.

## Navigation

Once the deck is open in a browser:

- **Right arrow / Space / Enter** — next slide
- **Left arrow / Backspace** — previous slide
- **Home / End** — first / last slide
- **Touch** — horizontal swipe
- **URL** — `#slide=N` to deep-link

## License

See `LICENSE`.
