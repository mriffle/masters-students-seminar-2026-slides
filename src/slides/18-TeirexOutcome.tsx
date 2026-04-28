import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 18 — Case Study: TEI-REX (3/3) — Outcome + Honest Friction
 *
 * Closes the TEI-REX case study (slides 16/17/18). Folds in the friction
 * texture from old slide 2.12. The headline is an HONEST mixed result, not
 * a triumph — the credibility move per part2_present.md "do not sand this
 * down".
 *
 * Editorial spine (per part2_present.md Slides 2.11 + 2.12 + SLIDES.md slide 18):
 *
 *   Outcome (must appear):
 *     - The team was the only one to last to the end of the competition
 *       ("last team standing")
 *     - A masterclass — taught by necessity — in feature finding, biomarker
 *       discovery, classification, regression, viz, report writing, presenting
 *     - Honest, mixed result:
 *         * not perfect at very low doses
 *         * much better than randomly guessing
 *         * extremely good at higher doses
 *         * developed cutting-edge tools and methods
 *
 *   Friction (folded in from old 2.12, framed as honest texture not failure):
 *     - high-stakes projects (e.g., TEI-REX) are stressful
 *     - presenting is sometimes stressful and never gets fully comfortable
 *
 * ============================================================================
 * COLOR BUDGET — 3 ACCENTS (justified)
 *
 *   --color-secondary  (magenta) — TEI-REX project color: header chip,
 *                                  accuracy curve, outcome bullets.
 *                                  This is the 4th and final TEI-REX beat;
 *                                  the project color closes here.
 *   --color-amber                — friction strip background (honest texture,
 *                                  cautionary/intermediate semantic).
 *                                  First reuse since slide 06's advisory-board
 *                                  directive — same "intermediate / contextual"
 *                                  semantic, repurposed as honest texture.
 *   --color-success    (green)   — last-team-standing badge (right approach /
 *                                  fit / "made it through").
 *
 *   Plus --color-text-muted (uncertainty shading, axis labels, supporting copy)
 *   and --color-text (primary labels, framing).
 *
 *   3 accents is on-budget. Justified because the slide carries three distinct
 *   narrative beats — the curve (TEI-REX outcome), the friction strip (honest
 *   texture), and the badge (last-team-standing) — each needing its own
 *   semantic color so the audience can parse them without re-reading.
 * ============================================================================
 *
 * Visual layout (top → bottom):
 *
 *   1. SlideTitle ("TEI-REX (3/3): Outcome" + subtitle).
 *   2. TEI-REX header chip (top-right, reused verbatim from slides 16/17 —
 *      same magenta pill, same glow, same subtitle-under-chip pattern).
 *   3. LAST TEAM STANDING badge — small, in --color-success, top-left corner
 *      placement (opposite the TEI-REX chip).
 *   4. HERO: accuracy curve — horizontal band; x-axis dose (low → high),
 *      y-axis classification accuracy (0% → 100%). Curve climbs from
 *      "better than random" at low doses to "extremely good" at high doses.
 *      Gray uncertainty shading around the curve (honest, not sanded).
 *      Random-chance line at 50%. "Extremely good" zone shaded brighter on
 *      the right. Four honest-outcome bullets pinned alongside the curve.
 *   5. FRICTION STRIP (slim, bottom): two muted chips against a dim
 *      --color-amber background — "high-stakes is stressful" and
 *      "presenting never gets fully comfortable". Framed as honest texture.
 *
 * Visual continuity with slides 16 & 17:
 *   - Header chip styling is identical (magenta border + faint magenta wash
 *     + soft glow box-shadow + same uppercase tracking).
 *   - TEI-REX project color = --color-secondary (magenta), reused for the
 *     accuracy curve so the audience reads "this is still TEI-REX".
 */

// ---------------------------------------------------------------------------
// Geometry — accuracy curve (the hero)
// ---------------------------------------------------------------------------

const CURVE_VB = { w: 1000, h: 360 };

// Plot rect inside the SVG (leaves room for axis labels)
const PLOT = {
  left: 90,
  right: 940,
  top: 30,
  bottom: 290,
};

// Accuracy curve sample points — modeled to match the speaker's honest
// description: "much better than randomly guessing" at low doses (~58–65%),
// climbing through the middle, and "extremely good" at high doses (~93–96%).
// The curve is intentionally NOT a triumphant 0→100; it lands in the high
// 90s, not at 100, and starts above random rather than at random.
const CURVE_POINTS: Array<{ x: number; y: number }> = [
  { x: 0.0, y: 0.58 },
  { x: 0.1, y: 0.62 },
  { x: 0.2, y: 0.66 },
  { x: 0.3, y: 0.71 },
  { x: 0.4, y: 0.77 },
  { x: 0.5, y: 0.83 },
  { x: 0.6, y: 0.88 },
  { x: 0.7, y: 0.92 },
  { x: 0.8, y: 0.94 },
  { x: 0.9, y: 0.955 },
  { x: 1.0, y: 0.96 },
];

// Uncertainty band (honest gray shading) — half-width as a fraction of full
// y-axis. Wider at low doses (more uncertainty there — exactly the
// "not perfect at very low doses" point), narrower at high doses.
const UNCERTAINTY_HALF: number[] = [
  0.085, 0.082, 0.078, 0.07, 0.06, 0.05, 0.042, 0.035, 0.03, 0.028, 0.026,
];

// ---------------------------------------------------------------------------
// Honest-outcome bullets (4)
// ---------------------------------------------------------------------------

interface OutcomeBullet {
  /** Short label as it appears on the slide. */
  text: string;
  /** Where on the curve to anchor visually (x in 0..1, used for marker). */
  anchorX: number;
  /** Tone — "honest" muted, or "strong" magenta. */
  tone: 'muted' | 'magenta';
}

const OUTCOME_BULLETS: OutcomeBullet[] = [
  { text: 'Not perfect at very low doses', anchorX: 0.05, tone: 'muted' },
  { text: 'Much better than randomly guessing', anchorX: 0.25, tone: 'muted' },
  { text: 'Extremely good at higher doses', anchorX: 0.85, tone: 'magenta' },
  { text: 'Developed cutting-edge tools and methods', anchorX: 0.6, tone: 'magenta' },
];

// ---------------------------------------------------------------------------
// Helpers — coordinate transforms for the curve plot
// ---------------------------------------------------------------------------

function plotX(t: number): number {
  return PLOT.left + (PLOT.right - PLOT.left) * t;
}

function plotY(acc: number): number {
  // acc is in 0..1. y axis: top = 100%, bottom = 0%.
  return PLOT.top + (PLOT.bottom - PLOT.top) * (1 - acc);
}

/** Build a smooth Catmull-Rom-ish path through the points (cardinal spline). */
function buildSmoothPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length < 2) return '';
  const p = pts.map((pt) => ({ x: plotX(pt.x), y: plotY(pt.y) }));
  let d = `M ${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    // Tension factor 0.5 → smooth cardinal spline approximation.
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/** Build the uncertainty band as a closed polygon (upper edge then lower edge reversed). */
function buildUncertaintyBand(): string {
  const upper = CURVE_POINTS.map((pt, i) => ({
    x: plotX(pt.x),
    y: plotY(Math.min(1, pt.y + UNCERTAINTY_HALF[i])),
  }));
  const lower = CURVE_POINTS.map((pt, i) => ({
    x: plotX(pt.x),
    y: plotY(Math.max(0, pt.y - UNCERTAINTY_HALF[i])),
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
// Slide
// ---------------------------------------------------------------------------

const TeirexOutcome: React.FC<SlideProps> = () => {
  const VB = CURVE_VB;

  // "Extremely good" zone — right portion of plot, shaded brighter
  const goodZoneLeft = plotX(0.7);
  const goodZoneRight = plotX(1.0);

  // Random chance line at 50%
  const randomY = plotY(0.5);

  return (
    <SlideContainer>
      <SlideTitle subtitle="Last team standing. Mixed result. No spin.">
        TEI-REX (3/3): Outcome
      </SlideTitle>

      <div className="relative w-full max-w-[92vw] h-[70vh] flex flex-col items-stretch">
        {/* --- LAST TEAM STANDING badge (top-left corner) --- */}
        <motion.div
          className="absolute top-0 left-0 flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="px-4 py-1.5 rounded-full font-bold tracking-[0.22em] text-xs md:text-sm uppercase flex items-center gap-2"
            style={{
              color: 'var(--color-success)',
              border: '2px solid var(--color-success)',
              background: 'rgba(0, 230, 118, 0.08)',
              boxShadow: '0 0 22px rgba(0, 230, 118, 0.30)',
            }}
          >
            {/* small filled circle as a "trophy dot" */}
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--color-success)',
                boxShadow: '0 0 10px rgba(0, 230, 118, 0.85)',
              }}
            />
            Last Team Standing
          </div>
        </motion.div>

        {/* --- TEI-REX header chip (top-right; identical to slides 16 & 17) --- */}
        <motion.div
          className="absolute top-0 right-0 flex flex-col items-end gap-2"
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
            honest outcome &middot; cutting-edge methods
          </div>
        </motion.div>

        {/* --- Hero: accuracy curve --- */}
        <div className="relative w-full flex-[1.6] flex items-center justify-center mt-12 md:mt-14">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Performance accuracy curve. X-axis: radiation dose, low to high. Y-axis: classification accuracy, zero to one hundred percent. The curve starts above the fifty-percent random-chance line at low doses, with wide uncertainty shading, and climbs to the mid-nineties at high doses with narrower uncertainty. The high-dose region is shaded brighter as the extremely-good zone."
          >
            <defs>
              <filter
                id="teirex-outcome-glow"
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
              <linearGradient id="teirex-good-zone" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.14" />
              </linearGradient>
            </defs>

            {/* "Extremely good" zone shading — brighter region under the
                right portion of the curve */}
            <motion.rect
              x={goodZoneLeft}
              y={PLOT.top}
              width={goodZoneRight - goodZoneLeft}
              height={PLOT.bottom - PLOT.top}
              fill="url(#teirex-good-zone)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            />
            <motion.text
              x={(goodZoneLeft + goodZoneRight) / 2}
              y={PLOT.top + 18}
              textAnchor="middle"
              fontSize={11}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={2.5}
              fill="var(--color-secondary)"
              fillOpacity={0.85}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              EXTREMELY GOOD ZONE
            </motion.text>

            {/* Y-axis grid lines + labels */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => (
              <g key={`ytick-${tick}`}>
                <line
                  x1={PLOT.left}
                  y1={plotY(tick)}
                  x2={PLOT.right}
                  y2={plotY(tick)}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={tick === 0.5 ? 0 : 0.12}
                  strokeWidth={1}
                  strokeDasharray="3 5"
                />
                <text
                  x={PLOT.left - 12}
                  y={plotY(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill="var(--color-text-muted)"
                  fillOpacity={0.7}
                >
                  {Math.round(tick * 100)}%
                </text>
              </g>
            ))}

            {/* Random-chance line at 50% — explicit threshold marker */}
            <motion.line
              x1={PLOT.left}
              y1={randomY}
              x2={PLOT.right}
              y2={randomY}
              stroke="var(--color-text-muted)"
              strokeWidth={1.5}
              strokeOpacity={0.55}
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            />
            <motion.text
              x={PLOT.right - 8}
              y={randomY - 6}
              textAnchor="end"
              fontSize={11}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={1.6}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              random chance · 50%
            </motion.text>

            {/* X-axis baseline */}
            <line
              x1={PLOT.left}
              y1={PLOT.bottom}
              x2={PLOT.right}
              y2={PLOT.bottom}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.4}
              strokeWidth={1.25}
            />
            {/* Y-axis */}
            <line
              x1={PLOT.left}
              y1={PLOT.top}
              x2={PLOT.left}
              y2={PLOT.bottom}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.4}
              strokeWidth={1.25}
            />

            {/* X-axis label and arrow */}
            <text
              x={PLOT.left - 4}
              y={PLOT.bottom + 22}
              textAnchor="start"
              fontSize={11}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={1.6}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            >
              low dose
            </text>
            <text
              x={PLOT.right + 4}
              y={PLOT.bottom + 22}
              textAnchor="end"
              fontSize={11}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={1.6}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            >
              high dose &rarr;
            </text>
            <text
              x={(PLOT.left + PLOT.right) / 2}
              y={PLOT.bottom + 40}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--color-text)"
              fillOpacity={0.85}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              radiation dose
            </text>

            {/* Y-axis label (rotated) */}
            <text
              x={32}
              y={(PLOT.top + PLOT.bottom) / 2}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--color-text)"
              fillOpacity={0.85}
              transform={`rotate(-90 32 ${(PLOT.top + PLOT.bottom) / 2})`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              classification accuracy
            </text>

            {/* Uncertainty band — gray shading around the curve.
                Honest texture: "we are not certain at every dose." */}
            <motion.path
              d={buildUncertaintyBand()}
              fill="var(--color-text-muted)"
              fillOpacity={0.18}
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            />

            {/* The accuracy curve — TEI-REX magenta */}
            <motion.path
              d={buildSmoothPath(CURVE_POINTS)}
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth={3.5}
              strokeOpacity={0.95}
              strokeLinecap="round"
              filter="url(#teirex-outcome-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.55, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Anchor markers + outcome bullet labels */}
            {OUTCOME_BULLETS.map((b, i) => {
              const pt = CURVE_POINTS.reduce((closest, c) =>
                Math.abs(c.x - b.anchorX) < Math.abs(closest.x - b.anchorX)
                  ? c
                  : closest,
              );
              const cx = plotX(pt.x);
              const cy = plotY(pt.y);
              const labelTone =
                b.tone === 'magenta'
                  ? 'var(--color-secondary)'
                  : 'var(--color-text-muted)';

              // Bullet label placement — alternate above/below the curve so
              // they don't collide. Low-dose labels go above (room) and the
              // high-dose labels go below (room under the rising curve).
              const labelAbove = b.anchorX < 0.5;
              const labelY = labelAbove ? cy - 28 : cy + 30;
              // Anchor labels left/right based on x position to keep them in
              // the plot rect.
              const anchor: 'start' | 'middle' | 'end' =
                b.anchorX < 0.2 ? 'start' : b.anchorX > 0.75 ? 'end' : 'middle';
              const labelX =
                anchor === 'start' ? cx + 6 : anchor === 'end' ? cx - 6 : cx;

              return (
                <motion.g
                  key={`bullet-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 + i * 0.15, duration: 0.5 }}
                >
                  {/* Anchor dot on the curve */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="var(--color-secondary)"
                    fillOpacity={0.95}
                    stroke="var(--color-bg)"
                    strokeWidth={2}
                    filter="url(#teirex-outcome-glow)"
                  />
                  {/* Connector line from dot to label */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={labelX}
                    y2={labelY + (labelAbove ? 6 : -8)}
                    stroke={labelTone}
                    strokeOpacity={0.45}
                    strokeWidth={1}
                    strokeDasharray="2 3"
                  />
                  {/* Bullet text */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={anchor}
                    fontSize={13}
                    fontWeight={b.tone === 'magenta' ? 700 : 500}
                    fill={labelTone}
                    fillOpacity={b.tone === 'magenta' ? 1 : 0.9}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {b.text}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* --- "Masterclass in" supporting line — small, between curve and
             friction strip. Compresses the seven-skill list into one line. */}
        <motion.div
          className="w-full text-center mt-1 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.55 }}
        >
          <p
            className="text-xs md:text-sm tracking-wider"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>
              MASTERCLASS
            </span>{' '}
            in feature finding &middot; biomarker discovery &middot;
            classification &middot; regression &middot; viz &middot; report
            writing &middot; presenting
          </p>
        </motion.div>

        {/* --- Friction strip (slim, bottom; --color-amber background) ---
             Honest texture, not failure. Two muted chips on a dim amber wash. */}
        <motion.div
          className="w-full mt-auto rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-3"
          style={{
            background: 'rgba(255, 171, 0, 0.10)',
            border: '1px solid rgba(255, 171, 0, 0.45)',
            boxShadow: '0 0 18px rgba(255, 171, 0, 0.12) inset',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.25, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Strip header — "honest texture" framing */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--color-amber)',
                boxShadow: '0 0 10px rgba(255, 171, 0, 0.85)',
              }}
            />
            <span
              className="text-xs md:text-sm font-bold tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-amber)' }}
            >
              honest texture
            </span>
          </div>

          {/* Two muted friction chips */}
          <div className="flex flex-1 flex-col md:flex-row gap-2 md:gap-4 justify-end items-stretch md:items-center w-full">
            <FrictionChip text="high-stakes projects are stressful" />
            <FrictionChip text="presenting never gets fully comfortable" />
          </div>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// FrictionChip — muted pill set against the dim amber strip. Framed as
// honest texture (not danger / not failure).
// ---------------------------------------------------------------------------

const FrictionChip: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm flex items-center justify-center"
      style={{
        background: 'rgba(255, 171, 0, 0.06)',
        border: '1px solid rgba(255, 171, 0, 0.55)',
        color: 'var(--color-text)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

export default TeirexOutcome;

/*
 * Tradeoffs / open questions:
 *
 *  - Curve shape is illustrative, not literal. The speaker did not give
 *    numeric accuracies; he described the outcome qualitatively ("not perfect
 *    at very low doses; much better than randomly guessing; extremely good at
 *    higher doses"). I picked points that make the curve match those words
 *    visually: starting at ~58% (clearly above the 50% random-chance line but
 *    not great), climbing through the middle, and topping out in the mid-90s
 *    (extremely good but not 100%). The uncertainty band is similarly
 *    illustrative — wider on the left, narrower on the right. If the speaker
 *    wants numbers anchored, this is the place to swap them in.
 *
 *  - 3 accents + 2 supporting (text/text-muted). Color budget rule allows max
 *    3 accents per slide; I used the maximum because each color carries a
 *    distinct, deck-consistent semantic: secondary=TEI-REX, amber=intermediate
 *    /honest texture, success=fit/right approach. Justified in the top-of-file
 *    color comment.
 *
 *  - Last-team-standing badge placed top-LEFT (opposite the TEI-REX chip on
 *    the right) so the two corner tags don't fight. Reads as: "[badge] TITLE
 *    [chip]" across the top.
 *
 *  - Friction strip framed with a "HONEST TEXTURE" header to make the framing
 *    explicit per the brief — these are not failures, they're texture. Amber
 *    semantic is "intermediate / cautionary" deck-wide; reusing it as
 *    "honest texture" is a small extension of that semantic, not a contradiction.
 *
 *  - Two friction chips use the EXACT spirit of the speaker's lines without
 *    being verbatim quotes (the part doc presents these as themes, not direct
 *    quotes): "high-stakes is stressful" (compresses "high-stakes projects
 *    like TEI-REX are stressful") and "presenting never gets fully comfortable"
 *    (compresses "presenting work is sometimes stressful and never gets fully
 *    comfortable"). The brief calls for these exact short forms.
 *
 *  - Header chip is verbatim styling from slides 16/17. Subtitle under the
 *    chip differs to fit this slide ("honest outcome · cutting-edge methods")
 *    rather than slides 16's "IARPA · top 4 teams" or 17's "multi-phase · ...".
 *
 *  - "MASTERCLASS in feature finding · biomarker discovery · classification ·
 *    regression · viz · report writing · presenting" is a single mono line
 *    between the curve and the friction strip. This earns its keep because it
 *    is the "what it taught" callback — the seven-skill list — without
 *    becoming a paragraph. If too dense, drop the line; if too sparse, give
 *    it its own row of chips. I kept it as a single line to preserve the
 *    visual primacy of the accuracy curve.
 *
 *  - The curve climbing from the 50% random line to ~96% is the
 *    visual punchline; the "EXTREMELY GOOD ZONE" gradient on the right is
 *    the brighter shading the brief calls for, and the wider uncertainty
 *    band on the left is the brief's "honest uncertainty shading".
 */
