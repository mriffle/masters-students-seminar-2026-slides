import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 23 — Concrete Example: TEI-REX Feature Selection
 *
 * The load-bearing concrete example for Part 3. Audience already knows
 * TEI-REX from slides 16/17/18 — this slide drops directly into "here's
 * what made us win." Visual vocabulary MUST match slides 16-18.
 *
 * ============================================================================
 * VISUAL CONTINUITY WITH SLIDES 16/17/18 — REQUIRED
 *
 * Reused verbatim from slide 16 (canonical TEI-REX vocabulary):
 *   - TEIREX_VB viewBox dimensions (1000 x 480)
 *   - SKIN constant geometry: { cx: 140, cy: 240, w: 150, h: 70, rx: 14, swabR: 18 }
 *   - CLASSIFIER outer rectangle shape (rounded rect, --color-bg-card fill,
 *     --color-secondary border) — re-used twice (Path A and Path B)
 *   - TEI-REX header chip (top-right, magenta border, magenta wash, soft glow)
 *
 * Reused from slide 18 (accuracy band visual treatment):
 *   - Smooth Catmull-Rom curve through dose -> accuracy points
 *   - Uncertainty shading polygon (wider at low doses, narrower at high)
 *   - 50% random-chance dashed line
 *   - Magenta curve color (--color-secondary)
 *
 * The OUTER silhouette of the skin sample, the rounded-rect classifier
 * shape, and the magenta header chip must be instantly recognizable as
 * "TEI-REX is back" within a fraction of a second of slide entrance.
 * ============================================================================
 *
 * Editorial spine (per part3_future.md Slide 3.6 + SLIDES.md slide 23):
 *
 *   The team's secret to success in TEI-REX:
 *     - Choosing features based on biological pathway knowledge.
 *     - Regularization (a fundamentals tool every team had) only goes so far.
 *     - Knowing which proteins are involved in which pathways is domain
 *       knowledge, and not every team had it.
 *     - Had a DRAMATIC effect on model quality.
 *   Generalizable lesson: AI doesn't have your domain. You do.
 *
 *   Visual punchline: the DELTA between Path A (regularization only) and
 *   Path B (pathway-informed) accuracy bands. Path B obviously wins.
 *
 * ============================================================================
 * COLOR BUDGET — 3 ACCENTS (justified)
 *
 *   --color-secondary  (magenta) — TEI-REX project color: header chip,
 *                                  classifier outlines, Path B emphasis
 *                                  (the WIN, the domain-knowledge path).
 *   --color-primary    (cyan)    — skin-sample input (the speaker's data,
 *                                  consistent with slide 16's input semantic).
 *   --color-success    (green)   — Path B "right approach" tint on the
 *                                  accuracy curve glow + the WINS callout.
 *   --color-danger     (red)     — Path A "regularization only" — mediocre,
 *                                  dashed (consistent with dead-ends grammar
 *                                  from slides 05/19).
 *
 *   Plus --color-text-muted (axis labels, supporting copy) and --color-text
 *   (primary labels). Four "true" accents (secondary, primary, success,
 *   danger) — slightly above the 3-accent rule but matches slide 18's
 *   pattern (which used secondary + amber + success). Each carries a
 *   load-bearing semantic and the slide cannot land its punchline without
 *   the danger/success contrast on the two paths.
 * ============================================================================
 *
 * Visual layout (single SVG, 1000 x 540):
 *
 *   [SKIN-SAMPLE] ──┬──► [CLASSIFIER A · regularization only]  ──► [accuracy band: mediocre]
 *      (primary)    │     (dashed magenta border, danger tint)        (danger curve, ~70% peak)
 *                   │
 *                   └──► [CLASSIFIER B · + pathway knowledge]  ──► [accuracy band: GREAT]
 *                         (solid magenta border, success glow)        (magenta curve, ~95% peak)
 *
 *   The shared input forks. Two parallel classifier boxes (same outer
 *   rectangle as slide 16, different interiors — generic-feature scatter
 *   vs. pathway-clustered nodes). Two accuracy bands on the right with
 *   massive visual delta. Below: lesson line "AI doesn't have your domain."
 */

// ---------------------------------------------------------------------------
// CANONICAL TEI-REX GEOMETRY — REUSED FROM SLIDE 16
// ---------------------------------------------------------------------------

const TEIREX_VB = { w: 1000, h: 540 };

/**
 * Skin-swab sample node — INPUT.
 * Geometry copied verbatim from slide 16's SKIN constant; cy adjusted to
 * sit between Path A (top) and Path B (bottom) since the input forks.
 * The audience's eye should still register "that's the same swab".
 */
const SKIN = {
  cx: 130,
  cy: 270,
  w: 150,
  h: 70,
  rx: 14,
  swabR: 18,
};

/**
 * Two parallel classifier black boxes. Same w/h/rx as slide 16's CLASSIFIER
 * (280 x 200, rx 16) so the silhouette is recognized. Slightly compressed
 * vertically to fit two stacked instances within the viewBox.
 */
const CLASSIFIER = {
  w: 260,
  h: 170,
  rx: 16,
  cx: 470,
  cyA: 150, // Path A — top
  cyB: 390, // Path B — bottom
};

/** Accuracy band plot rectangles — one per path, on the right. */
const BAND = {
  left: 660,
  right: 980,
  // Path A — mediocre
  topA: 70,
  bottomA: 230,
  // Path B — great
  topB: 310,
  bottomB: 470,
};

// ---------------------------------------------------------------------------
// Accuracy curves — illustrative (qualitative, not literal)
// ---------------------------------------------------------------------------

// Path A — "regularization only": mediocre. Above random chance, but
// not dramatic; tops out around 70% at high doses.
const CURVE_A: Array<{ x: number; y: number }> = [
  { x: 0.0, y: 0.52 },
  { x: 0.2, y: 0.55 },
  { x: 0.4, y: 0.60 },
  { x: 0.6, y: 0.64 },
  { x: 0.8, y: 0.68 },
  { x: 1.0, y: 0.70 },
];
// Wide uncertainty — the regularization-only path is shaky.
const UNCERTAINTY_A: number[] = [0.10, 0.10, 0.09, 0.085, 0.08, 0.075];

// Path B — "pathway-informed + regularization": great. Matches slide 18's
// shape (climbing from above-random to mid-90s).
const CURVE_B: Array<{ x: number; y: number }> = [
  { x: 0.0, y: 0.62 },
  { x: 0.2, y: 0.72 },
  { x: 0.4, y: 0.82 },
  { x: 0.6, y: 0.90 },
  { x: 0.8, y: 0.94 },
  { x: 1.0, y: 0.96 },
];
// Tighter uncertainty — pathway knowledge stabilizes the model.
const UNCERTAINTY_B: number[] = [0.07, 0.05, 0.04, 0.03, 0.025, 0.02];

// ---------------------------------------------------------------------------
// Curve helpers (cardinal-spline smoothing, same recipe as slide 18)
// ---------------------------------------------------------------------------

function makePlotX(left: number, right: number) {
  return (t: number) => left + (right - left) * t;
}
function makePlotY(top: number, bottom: number) {
  // y axis: top = 100% accuracy, bottom = 0%.
  return (acc: number) => top + (bottom - top) * (1 - acc);
}

function buildSmoothPath(
  pts: Array<{ x: number; y: number }>,
  px: (t: number) => number,
  py: (a: number) => number,
): string {
  if (pts.length < 2) return '';
  const p = pts.map((pt) => ({ x: px(pt.x), y: py(pt.y) }));
  let d = `M ${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function buildUncertaintyBand(
  pts: Array<{ x: number; y: number }>,
  half: number[],
  px: (t: number) => number,
  py: (a: number) => number,
): string {
  const upper = pts.map((pt, i) => ({
    x: px(pt.x),
    y: py(Math.min(1, pt.y + half[i])),
  }));
  const lower = pts.map((pt, i) => ({
    x: px(pt.x),
    y: py(Math.max(0, pt.y - half[i])),
  }));
  let d = `M ${upper[0].x.toFixed(2)} ${upper[0].y.toFixed(2)}`;
  for (let i = 1; i < upper.length; i++) {
    d += ` L ${upper[i].x.toFixed(2)} ${upper[i].y.toFixed(2)}`;
  }
  for (let i = lower.length - 1; i >= 0; i--) {
    d += ` L ${lower[i].x.toFixed(2)} ${lower[i].y.toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

// ---------------------------------------------------------------------------
// "Generic features" interior (Path A) — scattered protein dots, no structure.
// Deterministic positions (no Math.random) so the visual is stable.
// ---------------------------------------------------------------------------

const GENERIC_DOTS: Array<{ dx: number; dy: number; r: number }> = [
  { dx: -90, dy: -50, r: 4 },
  { dx: -55, dy: -25, r: 3.5 },
  { dx: -30, dy: 28, r: 4 },
  { dx: 5, dy: -45, r: 3 },
  { dx: 18, dy: 12, r: 4.5 },
  { dx: 50, dy: -20, r: 3.5 },
  { dx: 70, dy: 35, r: 4 },
  { dx: -75, dy: 40, r: 3 },
  { dx: -10, dy: 50, r: 3.5 },
  { dx: 95, dy: -10, r: 4 },
  { dx: -50, dy: 55, r: 3 },
  { dx: 35, dy: -55, r: 3.5 },
];

// ---------------------------------------------------------------------------
// "Pathway-informed" interior (Path B) — clustered protein dots connected
// by faint edges, organized into 2-3 pathway groupings.
// ---------------------------------------------------------------------------

interface PathwayCluster {
  label: string;
  cx: number; // center offset from classifier center
  cy: number;
  nodes: Array<{ dx: number; dy: number; r: number }>;
  // edges as pairs of node indices forming the pathway connections.
  edges: Array<[number, number]>;
}

const PATHWAYS: PathwayCluster[] = [
  {
    label: 'DNA repair',
    cx: -75,
    cy: -35,
    nodes: [
      { dx: -18, dy: -12, r: 4 },
      { dx: 12, dy: -18, r: 4 },
      { dx: 20, dy: 12, r: 4 },
      { dx: -10, dy: 18, r: 4 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 2],
    ],
  },
  {
    label: 'oxidative stress',
    cx: 60,
    cy: -32,
    nodes: [
      { dx: 0, dy: -16, r: 4 },
      { dx: -16, dy: 8, r: 4 },
      { dx: 16, dy: 8, r: 4 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
  },
  {
    label: 'apoptosis',
    cx: -10,
    cy: 38,
    nodes: [
      { dx: -22, dy: -8, r: 4 },
      { dx: 0, dy: 4, r: 4 },
      { dx: 22, dy: -10, r: 4 },
      { dx: 8, dy: 18, r: 4 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const TeirexFeatures: React.FC<SlideProps> = () => {
  const VB = TEIREX_VB;

  // Skin sample edges
  const skinLeft = SKIN.cx - SKIN.w / 2;
  const skinRight = SKIN.cx + SKIN.w / 2;

  // Classifier edges (shared w/h, two cy's)
  const clfLeft = CLASSIFIER.cx - CLASSIFIER.w / 2;
  const clfRight = CLASSIFIER.cx + CLASSIFIER.w / 2;
  const clfTopA = CLASSIFIER.cyA - CLASSIFIER.h / 2;
  const clfTopB = CLASSIFIER.cyB - CLASSIFIER.h / 2;

  // Plot transforms — one per band
  const pxA = makePlotX(BAND.left, BAND.right);
  const pyA = makePlotY(BAND.topA, BAND.bottomA);
  const pxB = makePlotX(BAND.left, BAND.right);
  const pyB = makePlotY(BAND.topB, BAND.bottomB);

  const arrowGap = 10;

  return (
    <SlideContainer>
      <SlideTitle subtitle="Domain knowledge had a dramatic effect.">
        Feature Selection Made the Difference
      </SlideTitle>

      <div className="relative w-full max-w-[94vw] h-[72vh] flex flex-col items-stretch">
        {/* --- TEI-REX header chip — IDENTICAL styling to slides 16/17/18 ---
            Subtitle changes to "the team's secret" to mark this as the Part 3
            callback. Border, wash, glow, tracking, font weight all match. */}
        <motion.div
          className="absolute top-0 right-0 flex flex-col items-end gap-2 z-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="px-5 py-1.5 rounded-full font-bold tracking-[0.28em] text-base md:text-lg uppercase"
            style={{
              color: 'var(--color-secondary)',
              border: '2px solid var(--color-secondary)',
              background: 'rgba(255, 45, 120, 0.08)',
              boxShadow: '0 0 24px rgba(255, 45, 120, 0.25)',
            }}
          >
            TEI-REX
          </div>
          <div
            className="text-xs md:text-sm font-mono tracking-wider"
            style={{ color: 'var(--color-text-muted)' }}
          >
            the team&apos;s secret &middot; pathway-informed features
          </div>
        </motion.div>

        {/* --- Main diagram --- */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-10 md:mt-12">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Two parallel feature-selection paths from the same TEI-REX skin sample. Path A uses generic features with regularization only and produces a mediocre accuracy band peaking around seventy percent. Path B adds biological pathway knowledge, organizing proteins by DNA-repair, oxidative-stress, and apoptosis pathways; its accuracy band climbs to the mid-nineties. The dramatic delta between the two outcomes is the visual punchline."
          >
            <defs>
              <filter
                id="tx-secondary-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="tx-primary-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="tx-success-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Path B "win" gradient — magenta to success-green wash */}
              <linearGradient id="tx-band-b" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="var(--color-secondary)"
                  stopOpacity="0.04"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-success)"
                  stopOpacity="0.18"
                />
              </linearGradient>

              {/* Path A "mediocre" gradient — danger wash */}
              <linearGradient id="tx-band-a" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="var(--color-danger)"
                  stopOpacity="0.05"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-danger)"
                  stopOpacity="0.10"
                />
              </linearGradient>

              {/* Arrow markers — muted for Path A, magenta for Path B */}
              <marker
                id="tx-arrow-muted"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <polygon
                  points="0,0 10,5 0,10"
                  fill="var(--color-text-muted)"
                  fillOpacity={0.6}
                />
              </marker>
              <marker
                id="tx-arrow-magenta"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <polygon
                  points="0,0 10,5 0,10"
                  fill="var(--color-secondary)"
                  fillOpacity={0.85}
                />
              </marker>
            </defs>

            {/* ============================================================ */}
            {/* CONNECTORS (drawn first, sit beneath nodes)                  */}
            {/* ============================================================ */}

            {/* Skin sample fork → Path A classifier (upper) */}
            <motion.path
              d={`M ${skinRight + arrowGap} ${SKIN.cy}
                  C ${(skinRight + clfLeft) / 2} ${SKIN.cy},
                    ${(skinRight + clfLeft) / 2} ${CLASSIFIER.cyA},
                    ${clfLeft - arrowGap} ${CLASSIFIER.cyA}`}
              stroke="var(--color-text-muted)"
              strokeWidth={2}
              strokeOpacity={0.45}
              fill="none"
              strokeDasharray="6 5"
              markerEnd="url(#tx-arrow-muted)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.6 }}
            />

            {/* Skin sample fork → Path B classifier (lower) */}
            <motion.path
              d={`M ${skinRight + arrowGap} ${SKIN.cy}
                  C ${(skinRight + clfLeft) / 2} ${SKIN.cy},
                    ${(skinRight + clfLeft) / 2} ${CLASSIFIER.cyB},
                    ${clfLeft - arrowGap} ${CLASSIFIER.cyB}`}
              stroke="var(--color-secondary)"
              strokeWidth={2.5}
              strokeOpacity={0.85}
              fill="none"
              markerEnd="url(#tx-arrow-magenta)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
            />

            {/* Path A classifier → accuracy band */}
            <motion.line
              x1={clfRight + arrowGap}
              y1={CLASSIFIER.cyA}
              x2={BAND.left - arrowGap}
              y2={(BAND.topA + BAND.bottomA) / 2}
              stroke="var(--color-danger)"
              strokeWidth={2}
              strokeOpacity={0.55}
              strokeDasharray="6 5"
              markerEnd="url(#tx-arrow-muted)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            />

            {/* Path B classifier → accuracy band */}
            <motion.line
              x1={clfRight + arrowGap}
              y1={CLASSIFIER.cyB}
              x2={BAND.left - arrowGap}
              y2={(BAND.topB + BAND.bottomB) / 2}
              stroke="var(--color-secondary)"
              strokeWidth={2.5}
              strokeOpacity={0.9}
              markerEnd="url(#tx-arrow-magenta)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            />

            {/* ============================================================ */}
            {/* SKIN-SWAB SAMPLE (CANONICAL — copied from slide 16)          */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Swab stick */}
              <rect
                x={skinLeft}
                y={SKIN.cy - SKIN.h / 2}
                width={SKIN.w}
                height={SKIN.h}
                rx={SKIN.rx}
                fill="var(--color-primary)"
                fillOpacity={0.12}
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.85}
                filter="url(#tx-primary-glow)"
              />
              {/* Cotton swab tip */}
              <circle
                cx={skinLeft + 6}
                cy={SKIN.cy}
                r={SKIN.swabR}
                fill="var(--color-primary)"
                fillOpacity={0.28}
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.9}
                filter="url(#tx-primary-glow)"
              />
              {/* Label inside */}
              <text
                x={SKIN.cx + 14}
                y={SKIN.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fontWeight={700}
                fill="var(--color-primary)"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.08em',
                }}
              >
                skin sample
              </text>
              {/* Caption underneath — "same input" makes the fork legible */}
              <text
                x={SKIN.cx}
                y={SKIN.cy + SKIN.h / 2 + 22}
                textAnchor="middle"
                fontSize={12}
                fontStyle="italic"
                fill="var(--color-text-muted)"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                same input, same data
              </text>
            </motion.g>

            {/* ============================================================ */}
            {/* PATH A — CLASSIFIER (regularization only, generic features)  */}
            {/* Outer rect matches slide 16's CLASSIFIER silhouette.         */}
            {/* Border is dashed danger to read as the lesser path.          */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: `${CLASSIFIER.cx}px ${CLASSIFIER.cyA}px`,
              }}
            >
              {/* Black-box rectangle — same shape as slide 16, dashed danger
                  border to mark "the lesser approach" */}
              <rect
                x={clfLeft}
                y={clfTopA}
                width={CLASSIFIER.w}
                height={CLASSIFIER.h}
                rx={CLASSIFIER.rx}
                fill="var(--color-bg-card)"
                stroke="var(--color-danger)"
                strokeWidth={2}
                strokeOpacity={0.65}
                strokeDasharray="8 6"
              />

              {/* Generic-features interior: scattered, unstructured dots */}
              {GENERIC_DOTS.map((d, i) => (
                <circle
                  key={`a-dot-${i}`}
                  cx={CLASSIFIER.cx + d.dx}
                  cy={CLASSIFIER.cyA + d.dy}
                  r={d.r}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.55}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.35}
                  strokeWidth={0.5}
                />
              ))}

              {/* Tiny mono tag inside top-left */}
              <text
                x={clfLeft + 12}
                y={clfTopA + 18}
                fontSize={10}
                fill="var(--color-danger)"
                fillOpacity={0.85}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing={1.5}
              >
                PATH A
              </text>

              {/* Path label below the box */}
              <text
                x={CLASSIFIER.cx}
                y={clfTopA + CLASSIFIER.h + 22}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="var(--color-danger)"
                fillOpacity={0.95}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                generic features &middot; regularization only
              </text>
            </motion.g>

            {/* ============================================================ */}
            {/* PATH B — CLASSIFIER (regularization + pathway knowledge)     */}
            {/* Outer rect matches slide 16's CLASSIFIER silhouette.         */}
            {/* Solid magenta border + success glow = the WIN.               */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: `${CLASSIFIER.cx}px ${CLASSIFIER.cyB}px`,
              }}
            >
              {/* Black-box rectangle — same shape, solid magenta border with
                  success-green glow to mark "the right approach" */}
              <rect
                x={clfLeft}
                y={clfTopB}
                width={CLASSIFIER.w}
                height={CLASSIFIER.h}
                rx={CLASSIFIER.rx}
                fill="var(--color-bg-card)"
                stroke="var(--color-secondary)"
                strokeWidth={2.75}
                strokeOpacity={0.95}
                filter="url(#tx-secondary-glow)"
              />
              {/* Inner subtle frame for depth — same as slide 16 */}
              <rect
                x={clfLeft + 8}
                y={clfTopB + 8}
                width={CLASSIFIER.w - 16}
                height={CLASSIFIER.h - 16}
                rx={CLASSIFIER.rx - 4}
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth={1}
                strokeOpacity={0.22}
              />

              {/* Pathway clusters — each is a small connected graph */}
              {PATHWAYS.map((cluster, ci) => {
                const baseX = CLASSIFIER.cx + cluster.cx;
                const baseY = CLASSIFIER.cyB + cluster.cy;
                return (
                  <g key={`cluster-${ci}`}>
                    {/* Edges first (under nodes) */}
                    {cluster.edges.map(([a, b], ei) => {
                      const na = cluster.nodes[a];
                      const nb = cluster.nodes[b];
                      return (
                        <line
                          key={`edge-${ci}-${ei}`}
                          x1={baseX + na.dx}
                          y1={baseY + na.dy}
                          x2={baseX + nb.dx}
                          y2={baseY + nb.dy}
                          stroke="var(--color-secondary)"
                          strokeWidth={1.25}
                          strokeOpacity={0.65}
                        />
                      );
                    })}
                    {/* Nodes — proteins in the pathway */}
                    {cluster.nodes.map((n, ni) => (
                      <circle
                        key={`node-${ci}-${ni}`}
                        cx={baseX + n.dx}
                        cy={baseY + n.dy}
                        r={n.r}
                        fill="var(--color-secondary)"
                        fillOpacity={0.85}
                        stroke="var(--color-success)"
                        strokeOpacity={0.6}
                        strokeWidth={1}
                      />
                    ))}
                    {/* Cluster label */}
                    <text
                      x={baseX}
                      y={baseY - 30}
                      textAnchor="middle"
                      fontSize={9}
                      fill="var(--color-secondary)"
                      fillOpacity={0.95}
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      letterSpacing={1.2}
                      style={{ textTransform: 'uppercase' }}
                    >
                      {cluster.label}
                    </text>
                  </g>
                );
              })}

              {/* Tiny mono tag inside top-left */}
              <text
                x={clfLeft + 12}
                y={clfTopB + 18}
                fontSize={10}
                fill="var(--color-secondary)"
                fillOpacity={0.95}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing={1.5}
              >
                PATH B
              </text>

              {/* Path label below the box */}
              <text
                x={CLASSIFIER.cx}
                y={clfTopB + CLASSIFIER.h + 22}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="var(--color-secondary)"
                fillOpacity={1}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                pathway-informed &middot; + domain knowledge
              </text>
            </motion.g>

            {/* ============================================================ */}
            {/* ACCURACY BAND — PATH A (mediocre)                            */}
            {/* ============================================================ */}
            <AccuracyBand
              top={BAND.topA}
              bottom={BAND.bottomA}
              left={BAND.left}
              right={BAND.right}
              curve={CURVE_A}
              uncertainty={UNCERTAINTY_A}
              px={pxA}
              py={pyA}
              tone="mediocre"
              caption="MEDIOCRE"
              animationDelay={1.95}
              labelVerdict="~70% peak — barely moves with dose"
            />

            {/* ============================================================ */}
            {/* ACCURACY BAND — PATH B (great)                               */}
            {/* ============================================================ */}
            <AccuracyBand
              top={BAND.topB}
              bottom={BAND.bottomB}
              left={BAND.left}
              right={BAND.right}
              curve={CURVE_B}
              uncertainty={UNCERTAINTY_B}
              px={pxB}
              py={pyB}
              tone="great"
              caption="GREAT"
              animationDelay={2.25}
              labelVerdict="climbs to ~95% — dramatic gain"
            />

            {/* ============================================================ */}
            {/* DRAMATIC DELTA marker — vertical bracket between the two     */}
            {/* bands with a "DELTA" label. Visual punchline.                */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.55 }}
            >
              {/* Bracket on the right edge of both bands */}
              <line
                x1={BAND.right + 12}
                y1={BAND.topA + 30}
                x2={BAND.right + 12}
                y2={BAND.bottomB - 30}
                stroke="var(--color-success)"
                strokeWidth={2}
                strokeOpacity={0.85}
              />
              <line
                x1={BAND.right + 8}
                y1={BAND.topA + 30}
                x2={BAND.right + 16}
                y2={BAND.topA + 30}
                stroke="var(--color-success)"
                strokeWidth={2}
                strokeOpacity={0.85}
              />
              <line
                x1={BAND.right + 8}
                y1={BAND.bottomB - 30}
                x2={BAND.right + 16}
                y2={BAND.bottomB - 30}
                stroke="var(--color-success)"
                strokeWidth={2}
                strokeOpacity={0.85}
              />
              {/* DELTA label — rotated, sits to the right of the bracket */}
              <text
                x={BAND.right + 28}
                y={(BAND.topA + BAND.bottomB) / 2}
                textAnchor="middle"
                fontSize={14}
                fontWeight={800}
                fill="var(--color-success)"
                fillOpacity={1}
                filter="url(#tx-success-glow)"
                transform={`rotate(90 ${BAND.right + 28} ${(BAND.topA + BAND.bottomB) / 2})`}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                dramatic delta
              </text>
            </motion.g>
          </svg>
        </div>

        {/* --- Bottom takeaway: the generalizable lesson --- */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.45, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-base md:text-lg font-medium tracking-wide text-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>
              AI doesn&apos;t have your domain.
            </span>{' '}
            <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>
              You do.
            </span>
          </p>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// AccuracyBand — sub-component that draws one path's accuracy curve. Same
// recipe as slide 18: smooth curve, uncertainty shading, axis frame, plus
// a verdict caption pinned to the top-right of the plot.
// ---------------------------------------------------------------------------

interface AccuracyBandProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
  curve: Array<{ x: number; y: number }>;
  uncertainty: number[];
  px: (t: number) => number;
  py: (a: number) => number;
  tone: 'mediocre' | 'great';
  caption: string;
  animationDelay: number;
  labelVerdict: string;
}

const AccuracyBand: React.FC<AccuracyBandProps> = ({
  top,
  bottom,
  left,
  right,
  curve,
  uncertainty,
  px,
  py,
  tone,
  caption,
  animationDelay,
  labelVerdict,
}) => {
  const curveColor =
    tone === 'great' ? 'var(--color-secondary)' : 'var(--color-danger)';
  const captionColor =
    tone === 'great' ? 'var(--color-success)' : 'var(--color-danger)';
  const fillId = tone === 'great' ? 'url(#tx-band-b)' : 'url(#tx-band-a)';
  const glowFilter =
    tone === 'great' ? 'url(#tx-success-glow)' : undefined;

  const randomY = py(0.5);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay, duration: 0.7 }}
    >
      {/* Plot background — gradient fill that hints at tone */}
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill={fillId}
        rx={6}
      />
      {/* Plot frame */}
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="none"
        stroke="var(--color-text-muted)"
        strokeOpacity={0.25}
        strokeWidth={1}
        rx={6}
      />

      {/* Y-axis tick — 100% top, 50% middle (random chance), 0% bottom */}
      {[0, 0.5, 1].map((tick) => (
        <g key={`tick-${tone}-${tick}`}>
          <line
            x1={left}
            y1={py(tick)}
            x2={right}
            y2={py(tick)}
            stroke="var(--color-text-muted)"
            strokeOpacity={tick === 0.5 ? 0 : 0.1}
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={left - 6}
            y={py(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={9}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="var(--color-text-muted)"
            fillOpacity={0.65}
          >
            {Math.round(tick * 100)}%
          </text>
        </g>
      ))}

      {/* Random chance line at 50% */}
      <line
        x1={left}
        y1={randomY}
        x2={right}
        y2={randomY}
        stroke="var(--color-text-muted)"
        strokeWidth={1}
        strokeOpacity={0.5}
        strokeDasharray="5 5"
      />
      <text
        x={left + 8}
        y={randomY - 4}
        fontSize={9}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing={1.4}
        fill="var(--color-text-muted)"
        fillOpacity={0.7}
      >
        random · 50%
      </text>

      {/* Uncertainty band */}
      <path
        d={buildUncertaintyBand(curve, uncertainty, px, py)}
        fill={curveColor}
        fillOpacity={tone === 'great' ? 0.18 : 0.14}
        stroke="none"
      />

      {/* Curve */}
      <motion.path
        d={buildSmoothPath(curve, px, py)}
        fill="none"
        stroke={curveColor}
        strokeWidth={tone === 'great' ? 3.25 : 2.5}
        strokeOpacity={tone === 'great' ? 0.98 : 0.85}
        strokeDasharray={tone === 'great' ? undefined : '7 5'}
        strokeLinecap="round"
        filter={glowFilter}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: animationDelay + 0.15,
          duration: 1.1,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* X-axis dose label */}
      <text
        x={left + 4}
        y={bottom + 14}
        fontSize={9}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing={1.4}
        fill="var(--color-text-muted)"
        fillOpacity={0.75}
      >
        low dose
      </text>
      <text
        x={right - 4}
        y={bottom + 14}
        textAnchor="end"
        fontSize={9}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing={1.4}
        fill="var(--color-text-muted)"
        fillOpacity={0.75}
      >
        high dose &rarr;
      </text>

      {/* Verdict caption — pinned to the band */}
      <text
        x={right - 10}
        y={top + 18}
        textAnchor="end"
        fontSize={12}
        fontWeight={800}
        fill={captionColor}
        fillOpacity={1}
        filter={tone === 'great' ? glowFilter : undefined}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}
      >
        {caption}
      </text>
      <text
        x={right - 10}
        y={top + 34}
        textAnchor="end"
        fontSize={10}
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
        fontStyle="italic"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {labelVerdict}
      </text>
    </motion.g>
  );
};

export default TeirexFeatures;

/*
 * Tradeoffs / open questions:
 *
 *  - Color budget intentionally extended to 4 accents (secondary, primary,
 *    success, danger) plus muted/text. Each carries a deck-consistent
 *    semantic and the slide cannot land without the danger/success contrast
 *    on the two paths. Slide 18 also used 3+ accents (secondary, amber,
 *    success), so this is consistent with the established pattern for the
 *    most visually demanding TEI-REX slides. Documented at top of file.
 *
 *  - Skin-sample geometry kept identical to slide 16 (w, h, rx, swabR all
 *    match) but cy moved to 270 to vertically center between the two
 *    classifier boxes (cyA=150, cyB=390). The recognizable silhouette is
 *    the swab-stick + cotton-tip shape; cy is allowed to shift.
 *
 *  - Two classifier boxes use slide 16's shape (rounded rect, rx 16,
 *    --color-bg-card fill, --color-secondary border) but with a slightly
 *    smaller h (170 vs 200) so two stack within the viewBox. Path A's
 *    border is dashed danger-tinted to read as "lesser path" (consistent
 *    with the dead-ends grammar from slides 05 and 19). Path B's border
 *    is solid magenta with secondary glow — the canonical TEI-REX look.
 *
 *  - Path A interior: 12 unstructured gray dots, no edges. Reads as
 *    "generic features, no organizing principle." Path B interior: three
 *    labeled pathway clusters (DNA repair, oxidative stress, apoptosis) —
 *    each a small connected graph of magenta nodes. The interiors ARE
 *    the visual argument: structure-vs-noise.
 *
 *  - Pathway names (DNA repair, oxidative stress, apoptosis) are chosen
 *    because they are biologically plausible for a radiation-exposure
 *    classifier (radiation damages DNA, induces oxidative stress, and
 *    triggers apoptosis). They are illustrative — not claims about which
 *    specific pathways the team actually used. If the speaker wants to
 *    swap in real pathway names from TEI-REX, the array PATHWAYS at the
 *    top of the file is the place.
 *
 *  - Accuracy bands are illustrative, matching slide 18's recipe but
 *    sized smaller (each ~160pt tall). Path A peaks at ~70% with wide
 *    uncertainty (mediocre, dashed danger curve). Path B climbs to ~95%
 *    with tight uncertainty (great, solid magenta curve with success
 *    glow). The dramatic vertical delta between the two bands is
 *    bracketed on the right with a "DRAMATIC DELTA" callout in success
 *    green — the visual punchline.
 *
 *  - Header chip subtitle: "the team's secret · pathway-informed features"
 *    — names this slide as the Part 3 callback while keeping the chip
 *    visually identical to slides 16/17/18.
 *
 *  - Bottom takeaway line: "AI doesn't have your domain. You do."
 *    Two-tone (magenta for the warning, success-green for the agency
 *    statement). This is the generalizable lesson the brief explicitly
 *    calls for.
 *
 *  - Title: "Feature Selection Made the Difference" — chose this over
 *    "TEI-REX: How We Won" because the TEI-REX header chip already
 *    establishes the project context, freeing the title to deliver the
 *    transferable lesson. Subtitle: "Domain knowledge had a dramatic
 *    effect." — uses the speaker's word ("dramatic") verbatim.
 */
