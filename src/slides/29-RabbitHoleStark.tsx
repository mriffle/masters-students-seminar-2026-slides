import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 29 — The Rabbit Hole and the Stark Conclusion
 *
 * Merges old slides 3.13 (rabbit-hole warning) + 3.14 (stark conclusion).
 * The rabbit hole IS the failure mode that produces the stark conclusion —
 * cause and consequence on one slide.
 *
 * ============================================================================
 * MOTIF CALLBACK: "Dead-ends / forking path" (established in slide 19)
 * ============================================================================
 * Slide 19 plants the dead-ends-with-forking-path visual grammar as the
 * senior skill of recognizing dead ends early. Slide 29 calls it back as
 * the *protective* skill against AI rabbit holes.
 *
 * The dead-ends miniature in this slide deliberately reuses slide 19's
 * shape language:
 *   - Multiple branches diverging from a single origin
 *   - Most branches: dim, dashed --color-danger strokes terminating in
 *     X-marks (the DeadEndX terminator)
 *   - One solid --color-primary branch continues onward, glowing
 *   - A small magnifying-lens icon hovers near a fork, marking the
 *     senior/protective skill
 *
 * The miniature is rendered at the bottom of the slide, beside the stark
 * conclusion, marking what protects you from the rabbit hole above.
 *
 * ============================================================================
 * Visual story (top → bottom)
 * ============================================================================
 *   1. Rabbit-hole spiral (the failure mode) -- a developer figure
 *      descending into a deepening danger/amber spiral, with "yes, and..."
 *      AI suggestion chips stacking on either side, leading deeper.
 *   2. Stark conclusion plate at the bottom of the spiral --
 *      "AI is useless without fundamentals or domain."
 *      (Verbatim word-for-word from the part doc / SLIDES.md spec.)
 *   3. Dead-ends miniature beside the conclusion -- the protective skill
 *      that prevents you from descending the spiral in the first place.
 *
 * ============================================================================
 * Color budget (3 accents max)
 *   --color-danger      -> spiral core, "yes, and..." chips, X-marks
 *   --color-amber       -> spiral mid-tones (cautionary turning to dangerous)
 *   --color-primary     -> dead-ends miniature pursued path + magnifying lens
 *                          (the protective skill)
 *   --color-text-muted  -> labels, footer line
 *   --color-text        -> stark conclusion (high-contrast, not an accent)
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Spiral geometry
// ---------------------------------------------------------------------------
// A logarithmic spiral descending toward a center point. We sample it at
// many small angle steps so we can render it as a smooth path AND drop
// "yes, and..." chips at specific angular positions along the way.

// NOTE: Spiral center sits in the upper-LEFT quadrant of the viewBox so the
// right column (dead-ends miniature) and the bottom row (stark conclusion
// plate) have guaranteed space. Smaller outer radius keeps chips clear of
// the right column / bottom row.
const SPIRAL_CENTER = { x: 290, y: 230 };
const SPIRAL_TURNS = 3.0; // ~3 full turns, deep enough to feel like a hole
const SPIRAL_START_RADIUS = 130; // outer radius
const SPIRAL_END_RADIUS = 12; // tight near center
// Logarithmic spiral: r(theta) = a * exp(b * theta). We solve for a, b given
// start/end radii at theta=0 and theta=2*pi*TURNS.
const SPIRAL_TOTAL_THETA = SPIRAL_TURNS * 2 * Math.PI;
const SPIRAL_B =
  Math.log(SPIRAL_END_RADIUS / SPIRAL_START_RADIUS) / SPIRAL_TOTAL_THETA;
const SPIRAL_A = SPIRAL_START_RADIUS;

function spiralPoint(theta: number): { x: number; y: number; r: number } {
  const r = SPIRAL_A * Math.exp(SPIRAL_B * theta);
  // Start at the top (theta = 0 => angle pointing up, then sweep clockwise
  // by negating theta in the angle term so it descends to the right first).
  const angle = -Math.PI / 2 + theta;
  return {
    x: SPIRAL_CENTER.x + r * Math.cos(angle),
    y: SPIRAL_CENTER.y + r * Math.sin(angle),
    r,
  };
}

// Build a smooth SVG path of the spiral by sampling many points.
function buildSpiralPath(): string {
  const samples = 220;
  let d = '';
  for (let i = 0; i <= samples; i++) {
    const theta = (i / samples) * SPIRAL_TOTAL_THETA;
    const p = spiralPoint(theta);
    d += i === 0 ? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}` : ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }
  return d;
}

const SPIRAL_PATH = buildSpiralPath();

// "yes, and..." AI suggestion chips. Each is anchored at a theta along the
// spiral. We pick angles that alternate left/right so chips stack on either
// side of the spiral as the figure descends.
type YesAndChip = {
  theta: number; // position along spiral
  side: 'left' | 'right';
  label: string;
};

// Chips are anchored at the OUTER turns of the spiral only (theta < ~2.2π),
// so the deepest, smallest, hardest-to-read chips never appear. Each chip's
// width is sized to fit its label at its render scale (see chipW calc) so
// no chip overflows its pill outline with a leading "...".
//
// Layout: with the spiral on the left, chips bias to the RIGHT side of the
// spiral so they sit in the right-of-spiral horizontal band without
// colliding with the dead-ends miniature on the far right.
const YES_AND_CHIPS: YesAndChip[] = [
  { theta: Math.PI * 0.45, side: 'right', label: 'yes, and try this...' },
  { theta: Math.PI * 1.15, side: 'left', label: 'yes, and consider...' },
  { theta: Math.PI * 1.75, side: 'right', label: 'yes, and what about...' },
  { theta: Math.PI * 2.35, side: 'left', label: 'yes, and also...' },
];

// Position the developer figure near the top of the spiral, just outside
// its outer rim — they're about to descend.
const FIGURE = {
  x: SPIRAL_CENTER.x,
  y: SPIRAL_CENTER.y - SPIRAL_START_RADIUS - 30,
};

// ---------------------------------------------------------------------------
// Dead-ends miniature geometry
// ---------------------------------------------------------------------------
// A compact echo of slide 19's forking-path. Lives in its own sub-viewBox
// at the bottom-right of the slide. We reuse the same shape vocabulary:
// dashed-danger dead-end branches with X-mark terminators, one solid
// primary pursued branch, and a small magnifying lens marking the
// senior/protective skill.
//
// Coordinates are in a 280x140 sub-viewBox so the miniature can sit beside
// the stark conclusion plate without competing with the spiral above.

const MINI_VIEW_W = 280;
const MINI_VIEW_H = 140;
const MINI_ORIGIN = { x: 28, y: MINI_VIEW_H / 2 };

type MiniDeadEnd = {
  id: string;
  node: { x: number; y: number };
  end: { x: number; y: number };
  control1: { x: number; y: number };
  control2: { x: number; y: number };
  lens?: boolean; // the fork the magnifying lens is diagnosing
};

const MINI_DEAD_ENDS: MiniDeadEnd[] = [
  {
    id: 'mini-top',
    node: { x: 150, y: 30 },
    end: { x: 200, y: 22 },
    control1: { x: 70, y: MINI_ORIGIN.y - 18 },
    control2: { x: 105, y: 38 },
  },
  {
    id: 'mini-upper-mid',
    node: { x: 145, y: 56 },
    end: { x: 195, y: 52 },
    control1: { x: 65, y: MINI_ORIGIN.y - 4 },
    control2: { x: 100, y: 62 },
    lens: true,
  },
  {
    id: 'mini-lower-mid',
    node: { x: 145, y: 86 },
    end: { x: 195, y: 92 },
    control1: { x: 65, y: MINI_ORIGIN.y + 4 },
    control2: { x: 100, y: 80 },
  },
  {
    id: 'mini-bottom',
    node: { x: 150, y: 112 },
    end: { x: 200, y: 120 },
    control1: { x: 70, y: MINI_ORIGIN.y + 18 },
    control2: { x: 105, y: 104 },
  },
];

const MINI_PURSUED_NODE = { x: 215, y: MINI_ORIGIN.y };
const MINI_PURSUED_TAIL = { x: MINI_VIEW_W, y: MINI_ORIGIN.y };

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const RabbitHoleStark: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-1">
        <SlideTitle subtitle="AI is supportive — even when it shouldn't be.">
          Don&rsquo;t Be Led Down the Rabbit Hole
        </SlideTitle>

        {/* Lead framing line — the rabbit-hole warning, succinct. */}
        <motion.p
          className="text-center font-light italic leading-snug max-w-[80vw]"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
            letterSpacing: 0.3,
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          AI follows you all the way to the end of a rabbit hole &mdash;
          costing you{' '}
          <span style={{ color: 'var(--color-danger)', opacity: 0.95 }}>
            hours.
          </span>
        </motion.p>

        {/* Main visual: spiral + bottom row (stark conclusion + dead-ends
            mini). Height bumped so the wide-aspect viewBox (1000x620) is
            rendered larger by preserveAspectRatio meet, taking up more of
            the previously-empty horizontal real estate. */}
        <motion.div
          className="w-full max-w-[92vw] h-[74vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
        >
          <RabbitHoleVisual />
        </motion.div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// RabbitHoleVisual — full SVG combining spiral, stark plate, dead-ends mini
// ---------------------------------------------------------------------------

const RabbitHoleVisual: React.FC = () => {
  return (
    <svg
      viewBox="0 0 1000 620"
      className="w-full h-full"
      aria-label="A descending rabbit-hole spiral with a developer figure entering at the top, AI 'yes, and...' suggestion chips stacking on either side as the spiral deepens. Below the spiral, a stark conclusion plate reads 'AI is useless without fundamentals or domain.' Beside the conclusion, a miniature forking-path diagram echoes slide 19: most branches dim and dashed in danger red ending in X-marks, one solid primary path continuing onward, with a small magnifying lens marking the protective skill of recognizing dead ends early."
    >
      <defs>
        {/* Spiral gradient: amber at the rim (cautionary) → danger at the
            core (dangerous). The descent is the color shift. */}
        <linearGradient id="spiral-grad" gradientUnits="userSpaceOnUse" x1={SPIRAL_CENTER.x - 200} y1={SPIRAL_CENTER.y - 200} x2={SPIRAL_CENTER.x} y2={SPIRAL_CENTER.y}>
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--color-amber)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0.95" />
        </linearGradient>

        {/* Radial darkening at the center of the spiral — the "void" the
            figure is descending toward. */}
        <radialGradient id="spiral-void" cx={SPIRAL_CENTER.x} cy={SPIRAL_CENTER.y} r={SPIRAL_START_RADIUS} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--color-danger)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="0" />
        </radialGradient>

        {/* Glow for the spiral path */}
        <filter id="spiral-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glow for the dead-ends miniature pursued path / lens */}
        <filter id="mini-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Per-branch fade gradients for the miniature dead ends —
            same pattern as slide 19. */}
        {MINI_DEAD_ENDS.map((b) => (
          <linearGradient
            key={b.id}
            id={`mini-fade-${b.id}`}
            gradientUnits="userSpaceOnUse"
            x1={MINI_ORIGIN.x}
            y1={MINI_ORIGIN.y}
            x2={b.end.x}
            y2={b.end.y}
          >
            <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--color-danger)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.32" />
          </linearGradient>
        ))}
      </defs>

      {/* Soft radial void behind the spiral — gives the spiral depth */}
      <circle
        cx={SPIRAL_CENTER.x}
        cy={SPIRAL_CENTER.y}
        r={SPIRAL_START_RADIUS + 20}
        fill="url(#spiral-void)"
      />

      {/* Spiral path — animated draw from rim to core */}
      <motion.path
        d={SPIRAL_PATH}
        fill="none"
        stroke="url(#spiral-grad)"
        strokeWidth={3}
        strokeLinecap="round"
        filter="url(#spiral-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Tiny throat dot at the spiral center */}
      <motion.circle
        cx={SPIRAL_CENTER.x}
        cy={SPIRAL_CENTER.y}
        r={4}
        fill="var(--color-danger)"
        fillOpacity={0.95}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.4 }}
      />

      {/* Developer figure — entering the rabbit hole from the top.
          Stylized: small head circle + simple body, leaning forward. */}
      <DeveloperFigure x={FIGURE.x} y={FIGURE.y} />

      {/* Connector from figure down to spiral rim — they're descending */}
      <motion.line
        x1={FIGURE.x}
        y1={FIGURE.y + 20}
        x2={SPIRAL_CENTER.x}
        y2={SPIRAL_CENTER.y - SPIRAL_START_RADIUS}
        stroke="var(--color-amber)"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        strokeDasharray="3 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      />

      {/* "yes, and..." AI suggestion chips, anchored along the spiral.
          Width is sized per-label (using a conservative monospace-ish char
          width) so no label is clipped with a leading "...". Contrast is
          held high (full-opacity solid bg-card with darker overlay so the
          spiral glow does not bleed through). */}
      {YES_AND_CHIPS.map((chip, i) => {
        const p = spiralPoint(chip.theta);
        const offsetSign = chip.side === 'left' ? -1 : 1;
        // Modest scale variation: outer chips slightly larger than deeper
        // ones, but never small enough to become illegible.
        const t = chip.theta / SPIRAL_TOTAL_THETA; // 0..1 along the spiral
        const chipScale = 1.0 - t * 0.18; // 1.0 → ~0.82
        const chipH = 26 * chipScale;
        const fontSize = Math.max(11, chipH * 0.55);
        // Width fits the label: ~0.62em per char + generous horizontal
        // padding. The 36px total padding (18 each side) ensures the
        // longest labels (e.g. "yes, and what about...") never overflow
        // their pill outline as a leading "...".
        const chipW = chip.label.length * fontSize * 0.62 + 36;
        // Anchor chip OUTSIDE the spiral path on the chosen side, with a
        // generous gap so chips never overlap the spiral glow.
        const ax = p.x + offsetSign * (chipW / 2 + 30);
        const ay = p.y;
        return (
          <YesAndChipNode
            key={i}
            anchorX={p.x}
            anchorY={p.y}
            cx={ax}
            cy={ay}
            w={chipW}
            h={chipH}
            fontSize={fontSize}
            label={chip.label}
            opacity={1}
            delay={1.0 + i * 0.16}
          />
        );
      })}

      {/* ===== Bottom row: stark conclusion + dead-ends miniature =====
          The visual story payoff: rabbit hole down (the failure mode) →
          stark conclusion (the consequence) → dead-ends mini (the
          protective skill). */}

      {/* Stark conclusion plate — high-contrast text on bg-card */}
      <StarkConclusionPlate />

      {/* Dead-ends miniature — slide 19's vocabulary in compact form */}
      <DeadEndsMiniature />

      {/* Tiny footer line beneath the bottom row */}
      {/* Footer line — sits beneath the stark plate at the absolute
          bottom of the canvas, the closing beat of the slide. */}
      <motion.text
        x={500}
        y={595}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.7}
        fontSize={13}
        fontStyle="italic"
        letterSpacing={1.2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3.4, duration: 0.6 }}
      >
        It will give you things. You won&rsquo;t know if those things are good.
      </motion.text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// DeveloperFigure — the figure descending into the rabbit hole
// ---------------------------------------------------------------------------
// Stylized: head + body silhouette in --color-amber, slightly leaning into
// the spiral. Marked as the protagonist about to fall.
const DeveloperFigure: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.g
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.85, duration: 0.55 }}
  >
    {/* Head */}
    <circle
      cx={x}
      cy={y}
      r={9}
      fill="var(--color-amber)"
      fillOpacity={0.25}
      stroke="var(--color-amber)"
      strokeWidth={1.8}
      strokeOpacity={0.9}
    />
    {/* Shoulders / torso — short downward trapezoid suggesting forward lean */}
    <path
      d={`M ${x - 9} ${y + 8} L ${x - 6} ${y + 22} L ${x + 6} ${y + 22} L ${x + 9} ${y + 8} Z`}
      fill="var(--color-amber)"
      fillOpacity={0.18}
      stroke="var(--color-amber)"
      strokeWidth={1.6}
      strokeOpacity={0.85}
    />
    {/* Tiny "you" tag — bumped contrast and size so it remains legible. */}
    <text
      x={x - 24}
      y={y - 4}
      textAnchor="end"
      fill="var(--color-text)"
      fillOpacity={0.92}
      fontSize={13}
      fontStyle="italic"
      fontWeight={500}
      letterSpacing={1.4}
    >
      you
    </text>
  </motion.g>
);

// ---------------------------------------------------------------------------
// YesAndChipNode — a single "yes, and..." chip anchored to the spiral
// ---------------------------------------------------------------------------
// Pill rect + label + a thin connector from the spiral anchor point to the
// chip. Drawn in --color-danger so the audience reads them as the agent
// of the descent, not friendly.
const YesAndChipNode: React.FC<{
  anchorX: number;
  anchorY: number;
  cx: number;
  cy: number;
  w: number;
  h: number;
  fontSize: number;
  label: string;
  opacity: number;
  delay: number;
}> = ({ anchorX, anchorY, cx, cy, w, h, fontSize, label, opacity, delay }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Connector — drawn before the pill so the pill sits on top of it. */}
      <line
        x1={anchorX}
        y1={anchorY}
        x2={cx + (anchorX < cx ? -w / 2 : w / 2)}
        y2={cy}
        stroke="var(--color-danger)"
        strokeOpacity={0.55}
        strokeWidth={1.1}
        strokeDasharray="2 3"
      />
      {/* Pill — solid bg-card so the spiral glow behind cannot bleed
          through and obscure the label. Full opacity is intentional. */}
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        ry={h / 2}
        fill="var(--color-bg-card)"
        stroke="var(--color-danger)"
        strokeOpacity={0.9}
        strokeWidth={1.6}
      />
      {/* Label — full-opacity danger text on the solid pill for maximum
          contrast against the spiral glow zone. */}
      <text
        x={cx}
        y={cy + fontSize * 0.36}
        textAnchor="middle"
        fill="var(--color-danger)"
        fontSize={fontSize}
        fontStyle="italic"
        fontWeight={500}
        letterSpacing={0.3}
      >
        {label}
      </text>
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// StarkConclusionPlate — the bluntest version of the section message
// ---------------------------------------------------------------------------
// Verbatim text per the briefing: "AI is useless without fundamentals or
// domain." Set on a bg-card plate at high contrast (--color-text), with
// a thin danger border to tie it visually to the spiral above (the spiral
// is what produces this conclusion).
const StarkConclusionPlate: React.FC = () => {
  // Plate dimensions — full-width and centered at the bottom of the canvas
  // so the verbatim conclusion is the visual payoff of the lower half of
  // the canvas (no longer empty).
  const plateX = 50;
  const plateY = 460;
  const plateW = 900;
  const plateH = 96;
  return (
    <motion.g
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Plate */}
      <rect
        x={plateX}
        y={plateY}
        width={plateW}
        height={plateH}
        rx={12}
        fill="var(--color-bg-card)"
        stroke="var(--color-danger)"
        strokeOpacity={0.7}
        strokeWidth={2}
      />
      {/* Inner accent stripe on the left edge */}
      <rect
        x={plateX}
        y={plateY}
        width={5}
        height={plateH}
        rx={2}
        fill="var(--color-danger)"
        fillOpacity={0.95}
      />
      {/* Stark conclusion text — VERBATIM per briefing.
          Two-line layout for legibility; first line stark and full-weight,
          second line a quieter beat-of-emphasis. */}
      <text
        x={plateX + plateW / 2}
        y={plateY + 46}
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize={27}
        fontWeight={700}
        letterSpacing={0.4}
      >
        AI is useless without fundamentals or domain.
      </text>
      <text
        x={plateX + plateW / 2}
        y={plateY + 76}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.9}
        fontSize={14}
        fontStyle="italic"
        letterSpacing={1.0}
      >
        Not useful. Not sustainable. Not in the professional workplace.
      </text>
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// DeadEndsMiniature — the protective skill, callback to slide 19
// ---------------------------------------------------------------------------
// Compact echo of slide 19's forking path. Same shape vocabulary:
//   - dashed-danger dead-end branches (gradient fade danger -> muted)
//   - X-mark terminators (DeadEndX style)
//   - inert dashed-danger ring nodes at each fork
//   - one solid primary pursued path exiting right with arrowhead
//   - magnifying-lens icon hovering above one of the forks
//
// Lives in its own positioned group (translated to the right of the stark
// plate). Coordinates inside the group are MINI_VIEW_W x MINI_VIEW_H.
const DeadEndsMiniature: React.FC = () => {
  // Position the miniature group beside the spiral (upper-right area of
  // the canvas). With the spiral relocated upper-left and the stark plate
  // running full-width along the bottom, the miniature lives in the
  // upper-right column where there was previously dead space.
  const groupX = 670;
  const groupY = 200;
  // Header label above the miniature
  return (
    <motion.g
      transform={`translate(${groupX} ${groupY})`}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.6, duration: 0.6 }}
    >
      {/* Frame card — subtle bg-card so the miniature reads as a discrete
          motif rather than overlapping the spiral. */}
      <rect
        x={-6}
        y={-30}
        width={MINI_VIEW_W + 12}
        height={MINI_VIEW_H + 50}
        rx={10}
        fill="var(--color-bg-card)"
        fillOpacity={0.55}
        stroke="var(--color-primary)"
        strokeOpacity={0.25}
        strokeWidth={1.2}
      />

      {/* Header label — what this miniature represents */}
      <text
        x={MINI_VIEW_W / 2}
        y={-12}
        textAnchor="middle"
        fill="var(--color-primary)"
        fillOpacity={0.95}
        fontSize={12}
        fontWeight={600}
        letterSpacing={1.6}
      >
        THE PROTECTIVE SKILL
      </text>
      <text
        x={MINI_VIEW_W / 2}
        y={MINI_VIEW_H + 14}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
        fontSize={11}
        fontStyle="italic"
        letterSpacing={0.6}
      >
        recognize dead ends early
      </text>

      {/* Origin marker — small muted ring */}
      <circle
        cx={MINI_ORIGIN.x}
        cy={MINI_ORIGIN.y}
        r={5}
        fill="var(--color-bg-card)"
        stroke="var(--color-text-muted)"
        strokeOpacity={0.7}
        strokeWidth={1.3}
      />
      <circle
        cx={MINI_ORIGIN.x}
        cy={MINI_ORIGIN.y}
        r={1.8}
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
      />

      {/* Dead-end branches — dashed danger, X-mark terminators */}
      {MINI_DEAD_ENDS.map((b, i) => {
        const branchDelay = 2.8 + i * 0.08;
        return (
          <g key={b.id}>
            {/* Curved branch from origin to node */}
            <motion.path
              d={`M ${MINI_ORIGIN.x} ${MINI_ORIGIN.y} C ${b.control1.x} ${b.control1.y}, ${b.control2.x} ${b.control2.y}, ${b.node.x} ${b.node.y}`}
              fill="none"
              stroke={`url(#mini-fade-${b.id})`}
              strokeWidth={1.5}
              strokeDasharray="6 6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: branchDelay, duration: 0.55 }}
            />
            {/* Continuation past the node toward terminator */}
            <motion.line
              x1={b.node.x}
              y1={b.node.y}
              x2={b.end.x - 6}
              y2={b.end.y}
              stroke={`url(#mini-fade-${b.id})`}
              strokeWidth={1.3}
              strokeDasharray="4 5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: branchDelay + 0.35, duration: 0.35 }}
            />
            {/* Inert dead-end ring node — same as slide 19's DeadEndNode */}
            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: branchDelay + 0.25, duration: 0.35 }}
              style={{ transformOrigin: `${b.node.x}px ${b.node.y}px` }}
            >
              <circle
                cx={b.node.x}
                cy={b.node.y}
                r={5}
                fill="var(--color-bg-card)"
                stroke="var(--color-danger)"
                strokeOpacity={0.55}
                strokeWidth={1.2}
                strokeDasharray="2 2"
              />
              <circle
                cx={b.node.x}
                cy={b.node.y}
                r={1.4}
                fill="var(--color-text-muted)"
                fillOpacity={0.6}
              />
            </motion.g>
            {/* X-mark terminator — same as slide 19's DeadEndX */}
            <MiniDeadEndX
              cx={b.end.x}
              cy={b.end.y}
              delay={branchDelay + 0.55}
            />
          </g>
        );
      })}

      {/* Pursued path — solid glowing primary, exits right edge */}
      <motion.line
        x1={MINI_ORIGIN.x}
        y1={MINI_ORIGIN.y}
        x2={MINI_PURSUED_NODE.x}
        y2={MINI_PURSUED_NODE.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.78}
        strokeWidth={1.8}
        strokeLinecap="round"
        filter="url(#mini-primary-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.78 }}
        transition={{ delay: 3.25, duration: 0.5 }}
      />
      <motion.line
        x1={MINI_PURSUED_NODE.x}
        y1={MINI_PURSUED_NODE.y}
        x2={MINI_PURSUED_TAIL.x}
        y2={MINI_PURSUED_TAIL.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.55}
        strokeWidth={1.4}
        strokeDasharray="2 5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.55 }}
        transition={{ delay: 3.6, duration: 0.4 }}
      />
      <motion.polygon
        points={`${MINI_PURSUED_TAIL.x - 8},${MINI_PURSUED_TAIL.y - 4} ${MINI_PURSUED_TAIL.x},${MINI_PURSUED_TAIL.y} ${MINI_PURSUED_TAIL.x - 8},${MINI_PURSUED_TAIL.y + 4}`}
        fill="var(--color-primary)"
        fillOpacity={0.65}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 3.9, duration: 0.3 }}
      />
      {/* Pursued node — small glowing primary ring */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, duration: 0.4 }}
        style={{ transformOrigin: `${MINI_PURSUED_NODE.x}px ${MINI_PURSUED_NODE.y}px` }}
      >
        <circle
          cx={MINI_PURSUED_NODE.x}
          cy={MINI_PURSUED_NODE.y}
          r={8}
          fill="var(--color-primary)"
          fillOpacity={0.18}
          stroke="var(--color-primary)"
          strokeWidth={1.6}
          filter="url(#mini-primary-glow)"
        />
        <circle
          cx={MINI_PURSUED_NODE.x}
          cy={MINI_PURSUED_NODE.y}
          r={2}
          fill="var(--color-primary)"
          fillOpacity={0.95}
        />
      </motion.g>

      {/* Magnifying lens — slide 19's senior-skill marker, miniature
          version. Hovers above the lens-flagged fork (the upper-mid one). */}
      <MiniMagnifyingLens
        cx={88}
        cy={32}
        marksX={108}
        marksY={56}
      />
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// MiniDeadEndX — X-mark terminator, miniature version of slide 19's DeadEndX
// ---------------------------------------------------------------------------
const MiniDeadEndX: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => {
  const r = 4;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <line
        x1={cx - r}
        y1={cy - r}
        x2={cx + r}
        y2={cy + r}
        stroke="var(--color-danger)"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line
        x1={cx - r}
        y1={cy + r}
        x2={cx + r}
        y2={cy - r}
        stroke="var(--color-danger)"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// MiniMagnifyingLens — slide 19's senior-skill marker, compact version
// ---------------------------------------------------------------------------
// Lens glass + handle + dashed connector to the fork being diagnosed +
// pulse dot at that fork. Drawn in --color-primary.
const MiniMagnifyingLens: React.FC<{
  cx: number;
  cy: number;
  marksX: number;
  marksY: number;
}> = ({ cx, cy, marksX, marksY }) => {
  const r = 9;
  const dx = marksX - cx;
  const dy = marksY - cy;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const handleStart = { x: cx + ux * (r + 1), y: cy + uy * (r + 1) };
  const handleEnd = { x: cx + ux * (r + 6), y: cy + uy * (r + 6) };
  const connectorStart = { x: handleEnd.x + ux * 1.5, y: handleEnd.y + uy * 1.5 };

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3.7, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Lens glass */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="var(--color-primary)"
        fillOpacity={0.1}
        stroke="var(--color-primary)"
        strokeOpacity={0.85}
        strokeWidth={1.6}
        filter="url(#mini-primary-glow)"
      />
      {/* Inner glint */}
      <circle
        cx={cx - r * 0.35}
        cy={cy - r * 0.35}
        r={r * 0.2}
        fill="var(--color-primary)"
        fillOpacity={0.4}
      />
      {/* Handle */}
      <line
        x1={handleStart.x}
        y1={handleStart.y}
        x2={handleEnd.x}
        y2={handleEnd.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.85}
        strokeWidth={2.2}
        strokeLinecap="round"
        filter="url(#mini-primary-glow)"
      />
      {/* Dashed connector to the fork being diagnosed */}
      <line
        x1={connectorStart.x}
        y1={connectorStart.y}
        x2={marksX}
        y2={marksY}
        stroke="var(--color-primary)"
        strokeOpacity={0.4}
        strokeWidth={1}
        strokeDasharray="2 3"
        strokeLinecap="round"
      />
      {/* Pulse dot at the fork */}
      <circle
        cx={marksX}
        cy={marksY}
        r={2}
        fill="var(--color-primary)"
        fillOpacity={0.85}
      />
    </motion.g>
  );
};

export default RabbitHoleStark;
