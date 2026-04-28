import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 16 — Case Study: TEI-REX (1/3) — The Setup
 *
 * ============================================================================
 * IMPORTANT: THIS SLIDE ESTABLISHES THE TEI-REX VISUAL VOCABULARY.
 *
 * Slide 23 (Part 3, "Concrete Example: TEI-REX Feature Selection") will call
 * back to this slide using the SAME shapes and colors so the audience instantly
 * recognizes the project. The geometry constants and shape recipes below are
 * the canonical reusable definitions.
 *
 * What slide 23 should reuse from this file:
 *   - The skin-swab sample node shape and color (--color-primary; the input).
 *   - The classifier "black box" rectangle shape (rounded rect; --color-bg-card
 *     fill; --color-secondary border) and its question-mark interior.
 *   - The three small output nodes shape (rounded rects with question marks).
 *   - The TEI-REX header chip (pill; --color-secondary border + text).
 *   - The deck-wide TEI-REX project color: --color-secondary (magenta).
 *
 * Geometry constants exposed at module level for slide 23 to copy verbatim:
 *
 *   TEIREX_VB     — canonical viewBox dimensions (1000 × 480)
 *   SKIN          — skin-swab sample node spec (cx, cy, w, h, rx, swab head)
 *   CLASSIFIER    — black-box classifier rectangle spec (cx, cy, w, h, rx)
 *   OUTPUTS       — array of three output node specs (dose / type / time)
 *   ARROW_HEAD    — small triangle polygon points template
 *   COLORS        — semantic mapping (input / project / muted)
 *
 * Slide 23 may extend (e.g., draw two parallel paths inside the classifier),
 * but the OUTER silhouette of skin sample → classifier → outputs must remain
 * recognizable. Keep dimensions identical when possible.
 * ============================================================================
 *
 * Editorial spine (per part2_present.md Slide 2.9 + SLIDES.md slide 16):
 *
 *   Project: TEI-REX
 *   Funder: IARPA (the U.S. intelligence research agency)
 *   Selection: top 4 teams in the country, head-to-head competition
 *   The problem: from a non-invasive surface skin sample, classify whether
 *     someone has been exposed to ionizing radiation — and if so:
 *       * how strong the dose?
 *       * what type of radiation?
 *       * how long ago?
 *   Difficulty: state plainly that this is a hard problem.
 *
 * Color budget (3 accents max):
 *   --color-secondary (magenta) — TEI-REX project color: header chip,
 *                                  classifier border, outputs accent.
 *   --color-primary   (cyan)    — skin-sample input (the speaker's data,
 *                                  per the deck-wide semantic).
 *   --color-text-muted          — connectors at low opacity, supporting text.
 *
 * Visual layout (left-to-right flow, single horizontal SVG row):
 *
 *   [SKIN-SWAB]  ──►  [CLASSIFIER (?)]  ──►  [DOSE?]
 *    (primary)         (secondary border          [TYPE?]
 *                       on bg-card; ?)            [TIME?]
 *
 *   The unknowns (question marks) are emphasized — the audience should feel
 *   "we don't know yet" before any methods are introduced.
 *
 *   "TEI-REX" header chip sits top-right with "IARPA — top 4 teams" subtitle
 *   beneath it. Below the diagram, a single "This is a hard problem." line
 *   states the difficulty plainly.
 */

// ---------------------------------------------------------------------------
// CANONICAL TEI-REX GEOMETRY — REUSABLE BY SLIDE 23
// ---------------------------------------------------------------------------

/** Canonical viewBox for the TEI-REX problem diagram. */
export const TEIREX_VB = { w: 1000, h: 480 };

/**
 * Skin-swab sample node — INPUT.
 * Stylized as a small rounded rect with a small "swab head" circle on its left
 * end (the cotton tip), reading as a swab from the side.
 *
 * Color semantic: --color-primary (cyan) — the speaker's data / input.
 */
const SKIN = {
  cx: 140,
  cy: 240,
  w: 150,
  h: 70,
  rx: 14,
  swabR: 18, // radius of the cotton-tip circle
};

/**
 * Classifier black-box — the central unknown.
 * Larger rectangle, --color-bg-card fill, --color-secondary border, with a
 * question mark glyph inside. This is the canonical TEI-REX classifier shape.
 */
const CLASSIFIER = {
  cx: 500,
  cy: 240,
  w: 280,
  h: 200,
  rx: 16,
};

/**
 * Three output nodes — the unknowns to predict.
 * Vertically stacked on the right. Each is a small rounded rect with a label
 * and a "?" question mark.
 */
const OUTPUTS: { key: string; label: string; cy: number }[] = [
  { key: 'dose', label: 'dose', cy: 130 },
  { key: 'type', label: 'type', cy: 240 },
  { key: 'time', label: 'time', cy: 350 },
];
const OUTPUT_BOX = {
  cx: 850,
  w: 160,
  h: 70,
  rx: 12,
};

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const TeirexSetup: React.FC<SlideProps> = () => {
  const VB = TEIREX_VB;

  // Skin-sample geometry — left edge / right edge for arrow anchoring.
  const skinLeft = SKIN.cx - SKIN.w / 2;
  const skinRight = SKIN.cx + SKIN.w / 2;

  // Classifier edges
  const clfLeft = CLASSIFIER.cx - CLASSIFIER.w / 2;
  const clfRight = CLASSIFIER.cx + CLASSIFIER.w / 2;

  // Output box left edge
  const outLeft = OUTPUT_BOX.cx - OUTPUT_BOX.w / 2;

  // Arrow geometry helpers
  const arrowGap = 12; // visual gap between shape edge and arrow start/end

  return (
    <SlideContainer>
      <SlideTitle subtitle="Hard problem. Top 4 teams. IARPA.">
        Case Study: TEI-REX
      </SlideTitle>

      <div className="relative w-full max-w-[92vw] h-[68vh] flex flex-col items-stretch">
        {/* --- TEI-REX header chip (top-right) --- */}
        {/* Pill chip in --color-secondary marking the project. The subtitle
            "IARPA — top 4 teams" sits below in muted text. This is the
            canonical TEI-REX header chip — slide 23 should reuse this exact
            styling so the audience recognizes the project on sight. */}
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
            IARPA &middot; top 4 teams in the country
          </div>
        </motion.div>

        {/* --- Problem diagram --- */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-10 md:mt-12">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            aria-label="TEI-REX problem diagram: a non-invasive skin-swab sample feeds into a black-box classifier with a question mark; three unknown outputs emerge — dose, type, and time."
          >
            <defs>
              <filter id="teirex-secondary-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="teirex-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Arrow marker — small triangle, muted */}
              <marker
                id="teirex-arrow"
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
                  fillOpacity={0.65}
                />
              </marker>
            </defs>

            {/* ============================================================ */}
            {/* CONNECTORS (drawn first, sit beneath nodes)                  */}
            {/* ============================================================ */}

            {/* Skin sample → classifier */}
            <motion.line
              x1={skinRight + arrowGap}
              y1={SKIN.cy}
              x2={clfLeft - arrowGap}
              y2={CLASSIFIER.cy}
              stroke="var(--color-text-muted)"
              strokeWidth={2}
              strokeOpacity={0.5}
              markerEnd="url(#teirex-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Classifier → three outputs (one line each) */}
            {OUTPUTS.map((o, i) => (
              <motion.line
                key={`conn-${o.key}`}
                x1={clfRight + arrowGap}
                y1={CLASSIFIER.cy}
                x2={outLeft - arrowGap}
                y2={o.cy}
                stroke="var(--color-text-muted)"
                strokeWidth={2}
                strokeOpacity={0.5}
                markerEnd="url(#teirex-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.5 + i * 0.12,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            ))}

            {/* ============================================================ */}
            {/* SKIN-SWAB SAMPLE NODE (input, --color-primary)               */}
            {/* Stylized as a rounded rect (the swab stick) with a small     */}
            {/* circle (the cotton tip) on its left end.                     */}
            {/* CANONICAL — slide 23 reuses this exact shape.                */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: `${SKIN.cx}px ${SKIN.cy}px` }}
            >
              {/* Swab stick — rounded rect */}
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
                filter="url(#teirex-primary-glow)"
              />
              {/* Cotton swab tip — small filled circle hanging off the left
                  end of the stick, reading as a swab head from the side. */}
              <circle
                cx={skinLeft + 6}
                cy={SKIN.cy}
                r={SKIN.swabR}
                fill="var(--color-primary)"
                fillOpacity={0.28}
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.9}
                filter="url(#teirex-primary-glow)"
              />
              {/* Label inside the stick */}
              <text
                x={SKIN.cx + 14}
                y={SKIN.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={15}
                fontWeight={700}
                fill="var(--color-primary)"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.08em',
                }}
              >
                skin sample
              </text>
              {/* Caption underneath — "non-invasive surface" */}
              <text
                x={SKIN.cx}
                y={SKIN.cy + SKIN.h / 2 + 22}
                textAnchor="middle"
                fontSize={12}
                fontStyle="italic"
                fill="var(--color-text-muted)"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                non-invasive surface
              </text>
            </motion.g>

            {/* ============================================================ */}
            {/* CLASSIFIER BLACK BOX (--color-secondary border on bg-card)   */}
            {/* CANONICAL — slide 23 will redraw the inside of this box to   */}
            {/* show the feature-selection paths. The OUTER rectangle must   */}
            {/* match.                                                       */}
            {/* ============================================================ */}
            <motion.g
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: `${CLASSIFIER.cx}px ${CLASSIFIER.cy}px`,
              }}
            >
              {/* Black box rectangle */}
              <rect
                x={clfLeft}
                y={CLASSIFIER.cy - CLASSIFIER.h / 2}
                width={CLASSIFIER.w}
                height={CLASSIFIER.h}
                rx={CLASSIFIER.rx}
                fill="var(--color-bg-card)"
                stroke="var(--color-secondary)"
                strokeWidth={2.5}
                strokeOpacity={0.9}
                filter="url(#teirex-secondary-glow)"
              />
              {/* Inner subtle frame for depth */}
              <rect
                x={clfLeft + 8}
                y={CLASSIFIER.cy - CLASSIFIER.h / 2 + 8}
                width={CLASSIFIER.w - 16}
                height={CLASSIFIER.h - 16}
                rx={CLASSIFIER.rx - 4}
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth={1}
                strokeOpacity={0.2}
              />
              {/* Big interior question mark — the unknown */}
              <text
                x={CLASSIFIER.cx}
                y={CLASSIFIER.cy + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={120}
                fontWeight={800}
                fill="var(--color-secondary)"
                fillOpacity={0.85}
                filter="url(#teirex-secondary-glow)"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                ?
              </text>
              {/* Tag label below the box — "classifier" */}
              <text
                x={CLASSIFIER.cx}
                y={CLASSIFIER.cy + CLASSIFIER.h / 2 + 26}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fill="var(--color-secondary)"
                fillOpacity={0.95}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                classifier
              </text>
              {/* Tiny mono tag at the box top-left — "black box" cue */}
              <text
                x={clfLeft + 14}
                y={CLASSIFIER.cy - CLASSIFIER.h / 2 + 22}
                fontSize={11}
                fill="var(--color-text-muted)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing={1.5}
                fillOpacity={0.7}
              >
                BLACK BOX
              </text>
            </motion.g>

            {/* ============================================================ */}
            {/* THREE OUTPUT NODES — dose / type / time                       */}
            {/* CANONICAL — slide 23 reuses these node shapes.               */}
            {/* ============================================================ */}
            {OUTPUTS.map((o, i) => {
              const boxLeft = OUTPUT_BOX.cx - OUTPUT_BOX.w / 2;
              return (
                <motion.g
                  key={`out-${o.key}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.85 + i * 0.13,
                    duration: 0.55,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {/* Output box — thin secondary border, faint fill */}
                  <rect
                    x={boxLeft}
                    y={o.cy - OUTPUT_BOX.h / 2}
                    width={OUTPUT_BOX.w}
                    height={OUTPUT_BOX.h}
                    rx={OUTPUT_BOX.rx}
                    fill="var(--color-bg-card)"
                    stroke="var(--color-secondary)"
                    strokeWidth={1.75}
                    strokeOpacity={0.7}
                  />
                  {/* Question mark — large, lit, emphasizes the unknown */}
                  <text
                    x={boxLeft + 26}
                    y={o.cy + 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={36}
                    fontWeight={800}
                    fill="var(--color-secondary)"
                    fillOpacity={0.95}
                    filter="url(#teirex-secondary-glow)"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    ?
                  </text>
                  {/* Label — the unknown's name */}
                  <text
                    x={boxLeft + 60}
                    y={o.cy + 2}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fontSize={20}
                    fontWeight={700}
                    fill="var(--color-text)"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {o.label}
                  </text>
                </motion.g>
              );
            })}

            {/* "predict:" small tag above the column of outputs */}
            <motion.text
              x={OUTPUT_BOX.cx}
              y={OUTPUTS[0].cy - OUTPUT_BOX.h / 2 - 18}
              textAnchor="middle"
              fontSize={12}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={2}
              fill="var(--color-text-muted)"
              fillOpacity={0.7}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            >
              PREDICT
            </motion.text>

            {/* "exposure?" caption above classifier — the binary first question */}
            <motion.text
              x={CLASSIFIER.cx}
              y={CLASSIFIER.cy - CLASSIFIER.h / 2 - 14}
              textAnchor="middle"
              fontSize={13}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={2.5}
              fill="var(--color-text-muted)"
              fillOpacity={0.75}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              EXPOSED TO IONIZING RADIATION?
            </motion.text>
          </svg>
        </div>

        {/* --- "Hard problem" footer line --- */}
        {/* The brief asks for the difficulty stated plainly. A single line in
            slightly elevated weight under the diagram. Not a paragraph. */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-base md:text-lg font-medium tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>
              This is a hard problem.
            </span>{' '}
            <span style={{ opacity: 0.85 }}>
              Non-invasive sample &rarr; dose, type, and time-since-exposure.
            </span>
          </p>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default TeirexSetup;

/*
 * Tradeoffs / open questions:
 *
 *  - Skin-swab shape recognizability. A "skin swab" doesn't have an obvious
 *    universal silhouette at this scale, so I went with a rounded-rect "stick"
 *    + small offset circle "cotton tip" on the left end. The interior label
 *    "skin sample" + the muted caption "non-invasive surface" disambiguates.
 *    Slide 23 should keep the same silhouette to preserve the callback.
 *
 *  - Classifier interior. The brief specifies a single big "?" inside the
 *    black box. Slide 23 will replace this interior with the two
 *    feature-selection paths (regularization-only vs. pathway-informed). The
 *    OUTER rectangle (position, size, rx, secondary border) must remain
 *    identical for the callback to land — that's the recognizable silhouette.
 *
 *  - Three output nodes are stacked vertically rather than fanned. Stacking
 *    lets the labels (`dose`, `type`, `time`) sit horizontally next to their
 *    "?" glyphs, which reads better than fanning at the same scale. Slide 23
 *    can either keep them stacked (likely) or replace the outputs with
 *    two parallel "model quality" bands — but if outputs are kept, this
 *    geometry should be reused.
 *
 *  - Color budget: 3 accents (secondary, primary, muted). Within the budget.
 *    No tertiary or amber on this slide.
 *
 *  - "EXPOSED TO IONIZING RADIATION?" caption above the classifier reinforces
 *    the binary first-question framing without clutter. Could be removed if
 *    the reviewer wants a cleaner box, but it adds load-bearing content
 *    (radiation type) that the brief calls for.
 *
 *  - Header chip styling. Used a glowing pill with magenta border + magenta
 *    text + faint magenta wash, plus a soft box-shadow glow. Slide 23 should
 *    reuse this chip exactly so audiences register "TEI-REX is back" within a
 *    fraction of a second.
 *
 *  - Difficulty framing chosen as a single high-weight magenta phrase
 *    ("This is a hard problem.") followed by a muted continuation line.
 *    Reads as a stated fact rather than a paragraph. Within the
 *    visual-first / 30-words-of-body-text budget.
 */
