import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 27 — The Optimistic Flip + How to Invest Your Time
 *
 * Per SLIDES.md slide 27 + docs/part3_future.md Slides 3.11 + 3.16 (merged).
 *
 *   THE EMOTIONAL TURN of Part 3.
 *
 *   After slide 26's deliberately uncomfortable claim ("AI is most useful to
 *   senior people"), slide 27 lands the constructive lever AND makes it
 *   actionable on the same beat. The visual rhyme with slide 20's quiet
 *   foreshadow (a tilted beam on a small fulcrum) PAYS OFF here as the FULL
 *   lever — much more dramatic, large scale, with audience-effort and
 *   advantage-compounding labels visible.
 *
 * Verbatim phrasings (must appear, word-for-word):
 *   - "If you invest heavily in fundamentals and domain knowledge, you will
 *      have a HUGE advantage."   (capitalized HUGE preserved)
 *   - "The lever has rarely been clearer."
 *
 * Five concrete actions (load-bearing — must appear, also as the fulcrum's
 * foundation chips so they read as a take-home checklist):
 *   1. Go deep on at least one DOMAIN you find genuinely interesting
 *   2. Build CS fundamentals — complexity, data structures, algorithmic thinking
 *   3. Build DS fundamentals — methods, tests, viz, regularization, cross-validation
 *   4. Practice JUDGMENT — using AI tools, ask: do I know why this output is good?
 *   5. Practice EXPLAINING your work — the "did you actually understand this" question is coming
 *
 * Visual concept — the LEVER:
 *
 *   A literal physical lever, anchored at a fulcrum.
 *
 *     LEFT (short, near the fulcrum) — "your effort":
 *       small platform, small primary-cyan figure standing on it, label
 *       "your effort". The platform is short and modest.
 *
 *     RIGHT (long, extending way off to the right) — "advantage compounding":
 *       enormously long beam in primary cyan with a glowing tip. Label
 *       "advantage compounding". The length ratio is the visual punchline.
 *
 *     FULCRUM — the foundation:
 *       a wide trapezoidal base sitting on the floor. The five concrete
 *       actions sit BENEATH the fulcrum's apex as success-green chips that
 *       form the foundation supporting the entire mechanism. The action
 *       chips must be both (a) part of the foundation AND (b) legible as
 *       a take-home checklist on their own.
 *
 *   Headline (the optimistic flip):
 *     Top-center, in `text` with HUGE in primary cyan and bolder/larger
 *     so the typographic emphasis matches the verbal emphasis the speaker
 *     gives it.
 *
 *   Pull-quote (the lever payoff):
 *     "The lever has rarely been clearer." — set as a small italic line
 *     near the lever beam, so the visual and the line sit together.
 *
 * Color budget (3 accents — within the rule):
 *   --color-primary    → main lever beam, "advantage compounding" output,
 *                         "your effort" platform/figure (the lever mechanism)
 *   --color-success    → action items on the fulcrum (right approach / fit)
 *   --color-text-muted → supporting labels, the floor line, fulcrum body
 *   --color-text       → the optimistic flip headline body text
 *
 * Slide 20 callback:
 *   Slide 20 had a tiny tilted beam (~-2.5°) on a small triangular fulcrum
 *   beneath a quote — quiet, atmospheric, "felt rather than declared."
 *   Slide 27 is the FULL lever: same vocabulary (beam + fulcrum), now full
 *   and explicit. The beam tilts a bit toward the long side as it lands —
 *   small effort visibly producing massive output.
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 560
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 420 };

// Floor line — sits low, gives ground-truth to the lever and fulcrum
const FLOOR_Y = 360;

// Fulcrum — placed left-of-center so the long output side has lots of room
// to extend to the right.
const FULCRUM = {
  cx: 280,
  apexY: 220,        // where the beam pivots
  baseW: 200,        // wide trapezoid base on the floor
  topW: 36,          // narrow at the apex
};

// Beam — pivots at (FULCRUM.cx, FULCRUM.apexY).
// Short side (left of fulcrum) = "your effort"
// Long side (right of fulcrum) = "advantage compounding"
const SHORT_LEN = 130;     // short side — ~1
const LONG_LEN = 600;      // long side — ~4.6× the short side, the visual punchline
const BEAM_THICK = 8;
const BEAM_TILT_DEG = -2.5;  // very subtle tilt — long side lifts slightly,
                              // echoing the foreshadow on slide 20

// Compute beam endpoints from the tilt
const tiltRad = (BEAM_TILT_DEG * Math.PI) / 180;
const beamShortEnd = {
  x: FULCRUM.cx - Math.cos(tiltRad) * SHORT_LEN,
  y: FULCRUM.apexY - Math.sin(tiltRad) * SHORT_LEN,
};
const beamLongEnd = {
  x: FULCRUM.cx + Math.cos(tiltRad) * LONG_LEN,
  y: FULCRUM.apexY + Math.sin(tiltRad) * LONG_LEN,
};

// "Your effort" platform on the short side — small, modest
const EFFORT_PLATFORM_W = 90;
const EFFORT_PLATFORM_H = 8;

// Small effort figure (stands on the platform)
const EFFORT_FIG = { headR: 7, bodyH: 26, armSpan: 12 };

// Five action items — fulcrum's foundation, also a take-home checklist.
// These are verbatim from SLIDES.md slide 27 / part3_future.md Slide 3.16.
//
// Each entry has:
//   keyword  — a single emphasized word (DOMAIN, CS, DS, JUDGMENT,
//              EXPLAINING) that becomes the chip's headline
//   detail   — the one-line elaboration
//
// The chips sit beneath the fulcrum, each in success-green, arranged
// horizontally as a foundation strip the lever rests on.
const ACTION_ITEMS = [
  {
    keyword: 'DOMAIN',
    detail: 'Go deep on one you find genuinely interesting',
  },
  {
    keyword: 'CS FUNDAMENTALS',
    detail: 'Complexity, data structures, algorithms',
  },
  {
    keyword: 'DS FUNDAMENTALS',
    detail: 'Methods, tests, viz, regularization, CV',
  },
  {
    keyword: 'JUDGMENT',
    detail: 'Do I know why this AI output is good?',
  },
  {
    keyword: 'EXPLAINING',
    detail: '"Did you actually understand this?"',
  },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const OptimisticFlip: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Invest in fundamentals. Go deep. The lever has rarely been clearer.">
        Your Lever Is Bigger Than Ever
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[52vh] flex items-start justify-center mt-[-1vh]">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A literal physical lever. On the short left side near the fulcrum, a small cyan platform with a small figure labeled 'your effort.' On the long right side, the beam extends much farther and is labeled 'advantage compounding.' The fulcrum's foundation is made of five green chips listing the take-home actions: DOMAIN (go deep on at least one), CS FUNDAMENTALS (complexity, data structures, algorithmic thinking), DS FUNDAMENTALS (methods, tests, viz, regularization, cross-validation), JUDGMENT (using AI tools — do I know why this output is good?), and EXPLAINING (the 'did you actually understand this?' question is coming). A headline above reads: 'If you invest heavily in fundamentals and domain knowledge, you will have a HUGE advantage.' A small italic line near the beam reads: 'The lever has rarely been clearer.'"
        >
          <defs>
            <filter id="of-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="of-success-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="of-beam-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="of-fulcrum-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-text-muted)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.20" />
            </linearGradient>
          </defs>

          {/* ============================================================ */}
          {/* HEADLINE — the optimistic flip claim, top-center             */}
          {/* The capitalized HUGE is intentional emphasis from the speaker.*/}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <text
              x={VB.w / 2}
              y={48}
              textAnchor="middle"
              fontSize={20}
              fontWeight={800}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.005em',
              }}
            >
              <tspan>If you invest heavily in fundamentals and domain knowledge,</tspan>
            </text>
            <text
              x={VB.w / 2}
              y={78}
              textAnchor="middle"
              fontSize={22}
              fontWeight={900}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.005em',
              }}
            >
              <tspan>you will have a </tspan>
              <tspan
                fill="var(--color-primary)"
                fontWeight={900}
                fontSize={30}
                style={{ letterSpacing: '0.04em' }}
                filter="url(#of-primary-glow)"
              >
                HUGE
              </tspan>
              <tspan> advantage.</tspan>
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* FLOOR — ground line for the fulcrum                          */}
          {/* ============================================================ */}
          <motion.line
            x1={60}
            y1={FLOOR_Y}
            x2={VB.w - 60}
            y2={FLOOR_Y}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.22}
            strokeWidth={1.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          />

          {/* ============================================================ */}
          {/* FULCRUM — wide trapezoidal base, narrow apex                 */}
          {/* The five action chips sit BELOW it as the foundation.        */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <polygon
              points={[
                `${FULCRUM.cx - FULCRUM.topW / 2},${FULCRUM.apexY}`,
                `${FULCRUM.cx + FULCRUM.topW / 2},${FULCRUM.apexY}`,
                `${FULCRUM.cx + FULCRUM.baseW / 2},${FLOOR_Y}`,
                `${FULCRUM.cx - FULCRUM.baseW / 2},${FLOOR_Y}`,
              ].join(' ')}
              fill="url(#of-fulcrum-grad)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={1.6}
            />
            {/* Pivot cap — where the beam rests on the apex */}
            <circle
              cx={FULCRUM.cx}
              cy={FULCRUM.apexY}
              r={6.5}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.85}
              strokeWidth={1.6}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* BEAM — short on left ("your effort"), long on right          */}
          {/* ("advantage compounding"). Tilts to ~-2.5° on entrance —     */}
          {/* visually echoes the slide-20 foreshadow.                      */}
          {/* ============================================================ */}
          <motion.g
            style={{
              originX: `${FULCRUM.cx}px`,
              originY: `${FULCRUM.apexY}px`,
            }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: BEAM_TILT_DEG, opacity: 1 }}
            transition={{
              delay: 1.05,
              duration: 0.95,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Beam — drawn UN-rotated; the wrapping <g> applies the tilt.
                We use a horizontal rect from short-end-x to long-end-x
                with un-tilted coordinates for simpler math. */}
            <rect
              x={FULCRUM.cx - SHORT_LEN}
              y={FULCRUM.apexY - BEAM_THICK / 2}
              width={SHORT_LEN + LONG_LEN}
              height={BEAM_THICK}
              rx={BEAM_THICK / 2}
              fill="url(#of-beam-grad)"
              stroke="var(--color-primary)"
              strokeOpacity={0.95}
              strokeWidth={1.8}
              filter="url(#of-primary-glow)"
            />

            {/* Glowing tip at the long end — the "advantage compounding"
                output node. Larger, brighter, with halo. */}
            <circle
              cx={FULCRUM.cx + LONG_LEN}
              cy={FULCRUM.apexY}
              r={26}
              fill="var(--color-primary)"
              fillOpacity={0.10}
              stroke="var(--color-primary)"
              strokeOpacity={0.55}
              strokeWidth={1.2}
            />
            <circle
              cx={FULCRUM.cx + LONG_LEN}
              cy={FULCRUM.apexY}
              r={14}
              fill="var(--color-primary)"
              fillOpacity={0.30}
              stroke="var(--color-primary)"
              strokeOpacity={0.95}
              strokeWidth={2}
              filter="url(#of-primary-glow)"
            />
            <circle
              cx={FULCRUM.cx + LONG_LEN}
              cy={FULCRUM.apexY}
              r={6}
              fill="var(--color-primary)"
              fillOpacity={0.95}
            />

            {/* "advantage compounding" label — runs along/beneath the
                long beam, in primary, sized to read across distance. */}
            <text
              x={FULCRUM.cx + (LONG_LEN * 0.55)}
              y={FULCRUM.apexY - 18}
              textAnchor="middle"
              fontSize={15}
              fontWeight={900}
              fill="var(--color-primary)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.30em',
                textTransform: 'uppercase',
              }}
              filter="url(#of-primary-glow)"
            >
              advantage compounding
            </text>
            {/* The lever-payoff italic — verbatim line, sits under the long
                beam to PAIR the visual claim with the verbal claim. */}
            <text
              x={FULCRUM.cx + (LONG_LEN * 0.55)}
              y={FULCRUM.apexY + 28}
              textAnchor="middle"
              fontSize={13}
              fontStyle="italic"
              fill="var(--color-text-muted)"
              fillOpacity={0.95}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              "The lever has rarely been clearer."
            </text>

            {/* === SHORT SIDE — the "your effort" platform + figure === */}

            {/* Effort platform — short, in primary at lower opacity so the
                long output side carries the visual gravity. */}
            <rect
              x={FULCRUM.cx - SHORT_LEN + 6}
              y={FULCRUM.apexY - BEAM_THICK / 2 - EFFORT_PLATFORM_H}
              width={EFFORT_PLATFORM_W}
              height={EFFORT_PLATFORM_H}
              rx={3}
              fill="var(--color-primary)"
              fillOpacity={0.20}
              stroke="var(--color-primary)"
              strokeOpacity={0.85}
              strokeWidth={1.5}
            />

            {/* Effort figure — small, primary, stands on the platform.
                Computed feet position is the top of the platform. */}
            {(() => {
              const platTop =
                FULCRUM.apexY - BEAM_THICK / 2 - EFFORT_PLATFORM_H;
              const figCx =
                FULCRUM.cx - SHORT_LEN + 6 + EFFORT_PLATFORM_W / 2;
              const feetY = platTop;
              return (
                <g>
                  {/* Body */}
                  <line
                    x1={figCx}
                    y1={feetY - 2}
                    x2={figCx}
                    y2={feetY - 2 - EFFORT_FIG.bodyH}
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    filter="url(#of-primary-glow)"
                  />
                  {/* Arms */}
                  <line
                    x1={figCx - EFFORT_FIG.armSpan}
                    y1={feetY - 2 - EFFORT_FIG.bodyH * 0.55}
                    x2={figCx + EFFORT_FIG.armSpan}
                    y2={feetY - 2 - EFFORT_FIG.bodyH * 0.55}
                    stroke="var(--color-primary)"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                  {/* Legs */}
                  <line
                    x1={figCx}
                    y1={feetY - 2 - EFFORT_FIG.bodyH * 0.05}
                    x2={figCx - 6}
                    y2={feetY - 2}
                    stroke="var(--color-primary)"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                  <line
                    x1={figCx}
                    y1={feetY - 2 - EFFORT_FIG.bodyH * 0.05}
                    x2={figCx + 6}
                    y2={feetY - 2}
                    stroke="var(--color-primary)"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                  {/* Head */}
                  <circle
                    cx={figCx}
                    cy={feetY - 2 - EFFORT_FIG.bodyH - EFFORT_FIG.headR}
                    r={EFFORT_FIG.headR}
                    fill="var(--color-bg)"
                    stroke="var(--color-primary)"
                    strokeWidth={2.2}
                    filter="url(#of-primary-glow)"
                  />
                  {/* "your effort" label — sits ABOVE the figure's head so it
                      doesn't collide with the fulcrum/platform/figure below. */}
                  <text
                    x={figCx}
                    y={feetY - 2 - EFFORT_FIG.bodyH - EFFORT_FIG.headR * 2 - 14}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={800}
                    fill="var(--color-primary)"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                    }}
                  >
                    your effort
                  </text>
                </g>
              );
            })()}
          </motion.g>

          {/* ============================================================ */}
          {/* FOUNDATION HINT — a small dashed connector below the fulcrum  */}
          {/* points down to the HTML chip strip rendered outside the SVG, */}
          {/* visually marking those chips AS the fulcrum's foundation.    */}
          {/* ============================================================ */}
          <motion.line
            x1={FULCRUM.cx}
            y1={FLOOR_Y + 1}
            x2={FULCRUM.cx}
            y2={VB.h - 6}
            stroke="var(--color-success)"
            strokeOpacity={0.55}
            strokeWidth={1.2}
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.5 }}
          />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* FOUNDATION CHIP STRIP — five action items as HTML chips       */}
      {/* rendered below the SVG so they're guaranteed in-flow with    */}
      {/* the slide layout (no SVG clipping). Flexbox enforces equal   */}
      {/* spacing for all five chips.                                   */}
      {/* ============================================================ */}
      <div className="w-full max-w-[90vw] mt-[1vh] flex flex-col items-stretch px-[1vw]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          className="mb-[0.6vh] text-center"
          style={{
            color: 'var(--color-success)',
            opacity: 0.95,
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            fontWeight: 800,
            fontSize: '1.25vh',
          }}
        >
          The Foundation — Invest Here
        </motion.div>

        <div className="flex flex-row items-stretch justify-between gap-[1vw] w-full">
          {ACTION_ITEMS.map((item, i) => (
            <motion.div
              key={`action-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.7 + i * 0.08,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex-1 min-w-0 rounded-lg flex flex-col"
              style={{
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-success)',
                padding: '1vh 0.9vw',
                boxShadow: '0 0 12px color-mix(in srgb, var(--color-success) 25%, transparent)',
              }}
            >
              <div
                style={{
                  color: 'var(--color-success)',
                  opacity: 1,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '1.1vh',
                  fontWeight: 800,
                  letterSpacing: '0.10em',
                  marginBottom: '0.3vh',
                }}
              >
                0{i + 1}
              </div>
              <div
                className="text-center"
                style={{
                  color: 'var(--color-success)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1.55vh',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5vh',
                  lineHeight: 1.1,
                }}
              >
                {item.keyword}
              </div>
              <div
                className="text-center"
                style={{
                  color: 'var(--color-text)',
                  opacity: 1,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1.3vh',
                  letterSpacing: '0.01em',
                  lineHeight: 1.25,
                }}
              >
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default OptimisticFlip;

/*
 * Tradeoffs / open questions:
 *
 *  - Color budget: 3 accents (primary, success, text-muted) — within the
 *    rule. Primary = lever mechanism (beam, output node, effort platform,
 *    figure, HUGE in headline) — same deck-wide meaning ("fundamentals,
 *    the path, the compass"). Success = action chips (right approach /
 *    fit / things to invest in). Muted = floor, fulcrum, supporting
 *    captions. Text = the optimistic flip headline body.
 *
 *  - Length ratio: long side is ~4.6× the short side. Bigger ratios
 *    (e.g., 8×) push the output node off-canvas at viewport scale.
 *    4.6× still reads dramatically as a lever and keeps the glowing tip
 *    inside the visible area at common aspect ratios. Easy to tune.
 *
 *  - Tilt: -2.5° is deliberately the SAME tilt slide 20 used as a quiet
 *    foreshadow. Slide 27 is the FULL lever (much larger, with all the
 *    labels), but the tilt magnitude is the visual rhyme. Felt rather
 *    than declared.
 *
 *  - The five action chips are arranged left-to-right beneath the floor
 *    line, with a faint success-tinted backplate, a dashed connector
 *    from the fulcrum's base, and a "the foundation — invest here"
 *    caption. This lets them work BOTH as part of the fulcrum's
 *    foundation AND as a take-home checklist (they're labeled with
 *    numbers 01–05, the keyword stands alone, the detail is one line).
 *
 *  - Capitalized HUGE is rendered as a larger, bolder, primary-cyan
 *    glow tspan inside the headline. Letterspacing widened so it visually
 *    "shouts" matching the speaker's verbal emphasis.
 *
 *  - Verbatim lines preserved:
 *      • "If you invest heavily in fundamentals and domain knowledge,
 *         you will have a HUGE advantage."  (headline)
 *      • "The lever has rarely been clearer."  (italic line under beam)
 *
 *  - Slide title: "Your Lever Is Bigger Than Ever" + subtitle "Invest in
 *    fundamentals. Go deep. The lever has rarely been clearer." — both
 *    per the brief's suggestions.
 *
 *  - The effort figure's "your effort" label sits below the platform.
 *    The "advantage compounding" label sits above the long beam mid-span
 *    so it doesn't fight the glowing tip for attention. Italic verbatim
 *    quote sits under the long beam — visual + verbal claim paired.
 *
 *  - Action-item chip text was condensed to fit a single visible line at
 *    chip width. Each chip's keyword is the load-bearing word from the
 *    SLIDES.md slide-27 list (DOMAIN, CS FUNDAMENTALS, DS FUNDAMENTALS,
 *    JUDGMENT, EXPLAINING) and the detail line preserves the substance
 *    of the verbatim phrasing without being long enough to overflow.
 */
