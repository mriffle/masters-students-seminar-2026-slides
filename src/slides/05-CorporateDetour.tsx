import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 05 - The Corporate Detour
 *
 * Compresses the corporate / entrepreneurship years into a single
 * environmental-fit lesson. Per the part doc this section is deliberately
 * brief: "Don't let this section get long -- the speaker explicitly flagged
 * it as the weakest part of the biography."
 *
 * Three load-bearing verbatim quotes:
 *   1. (centerpiece pull-quote, top of slide):
 *        "I asked for a promotion, was told that's not how they do things
 *         here, so I quit and started my own company."
 *   2. (Corporate-branch friction node):
 *        "felt so fake and superficial"
 *   3. (Entrepreneurship-branch friction node):
 *        "I'm not an entrepreneur. I don't think like one."
 *
 * Visual concept:
 *   - The promotion-quit pull-quote sits beneath the title at wordmark-ish
 *     scale -- a moment of agency from the speaker.
 *   - Below the quote, a path diagram shows two side-by-side abandoned
 *     branches and a third forward branch:
 *
 *       (origin) -+--dashed (--color-danger tinted, fading to muted)-->  [Corporate]    X
 *                 |                                                       "felt so fake and superficial"
 *                 |
 *                 +--dashed (--color-danger tinted, fading to muted)-->  [Entrepreneurship]   X
 *                 |                                                       "I'm not an entrepreneur. I don't think like one."
 *                 |
 *                 +-----solid, glowing --color-primary----------->   ?    (off-screen right; foreshadow)
 *
 *     Both abandoned branches terminate in a small X mark. The forward
 *     "?" branch glows in primary and exits the right edge of the
 *     viewBox, foreshadowing slide 06 (Back to Science).
 *   - One-line lesson caption at the bottom:
 *       "good at this" and "want to do this every day" are different questions.
 *
 * Motif continuity (slides 03 -> 04 -> 05):
 *   - Same node grammar: small filled circle with a higher-opacity stroked
 *     ring, inner accent dot, italic muted annotations beneath.
 *   - Same defs/glow filter pattern (Gaussian blur + feMerge) for the
 *     pursued-path node.
 *   - Same italic muted text style for trajectory annotations.
 *   - Pursued path remains solid --color-primary; abandoned branches are
 *     dashed and de-saturated (slide 03 used --color-text-muted dashed; this
 *     slide tints those dashed branches with --color-danger because the
 *     content has shifted from "abandoned plan" to "actively did not fit").
 *
 * --color-danger establishment (FIRST APPEARANCE in the deck):
 *   This is the first slide to introduce --color-danger. The deck-wide
 *   semantic is "dead ends, what AI gets wrong, friction" and this slide
 *   sets the visual register that slides 19, 26, and 29 will rhyme back to.
 *   The treatment chosen here:
 *     - Strokes drawn at strokeOpacity ~0.4-0.55 (NOT loud red).
 *     - Strokes are dashed (8 8) to read as "abandoned trajectory."
 *     - The danger color FADES into --color-text-muted as the branch
 *       terminates -- implemented as a linearGradient stop from
 *       var(--color-danger) at the origin to var(--color-text-muted) at
 *       the dead-end terminator. This is the "fading to muted" effect the
 *       brief calls for.
 *     - Friction-phrase text on those branches is rendered in --color-danger
 *       at fillOpacity ~0.85 (legible but not blaring).
 *     - The terminator X is drawn in --color-danger at strokeOpacity 0.7.
 *   Net: danger is present and meaningful, but tinted -- the audience reads
 *   "these were dead ends" without the slide shouting. Later slides 19, 26,
 *   29 should use a similar restrained register (low-to-moderate opacity,
 *   dashed for branches, X-mark or fade-out for terminators).
 *
 * Color budget (3 accent max):
 *   - --color-primary    -> the forward "?" path (foreshadow into slide 06).
 *   - --color-danger     -> the two abandoned branches and their friction
 *                            phrase text. First appearance in the deck.
 *   - --color-text-muted -> annotations, branch fade-out, lesson caption.
 *   The pull-quote uses --color-text (primary text -- not counted as an
 *   accent).
 */

const CorporateDetour: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-3">
        <SlideTitle subtitle="Two paths that didn't fit">
          The Corporate Detour
        </SlideTitle>

        {/* Centerpiece pull-quote: the promotion-quit story, verbatim.
            Wordmark-ish scale, slightly less prominent than slide 02. The
            audience should read this as a moment of agency. */}
        <motion.div
          className="w-full max-w-[85vw] mt-1 mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="text-center font-light italic leading-snug"
            style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(1.25rem, 2.4vw, 2rem)',
              letterSpacing: '0.01em',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: 'var(--color-text-muted)',
                opacity: 0.45,
                marginRight: '0.25em',
                fontFamily: 'Georgia, serif',
                fontSize: '1.1em',
                verticalAlign: '-0.15em',
              }}
            >
              &ldquo;
            </span>
            I asked for a promotion, was told that&rsquo;s not how they do
            things here, so I quit and started my own company.
            <span
              aria-hidden="true"
              style={{
                color: 'var(--color-text-muted)',
                opacity: 0.45,
                marginLeft: '0.2em',
                fontFamily: 'Georgia, serif',
                fontSize: '1.1em',
                verticalAlign: '-0.15em',
              }}
            >
              &rdquo;
            </span>
          </blockquote>
        </motion.div>

        {/* Path diagram: two abandoned branches + forward "?" branch. */}
        <motion.div
          className="w-full max-w-[88vw] h-[44vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65 }}
        >
          <PathBranches />
        </motion.div>

        {/* One-line lesson caption -- italic muted, hovering near the bottom. */}
        <motion.p
          className="text-center font-light italic tracking-wide leading-snug max-w-[80vw]"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: '1rem',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <span style={{ color: 'var(--color-text)', opacity: 0.85 }}>
            &ldquo;good at this&rdquo;
          </span>
          {' and '}
          <span style={{ color: 'var(--color-text)', opacity: 0.85 }}>
            &ldquo;want to do this every day&rdquo;
          </span>
          {' are different questions.'}
        </motion.p>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Path branches diagram
// ---------------------------------------------------------------------------
//
// viewBox 1000 x 360.
// Origin sits at left-center; three branches fan out to the right.
//
//   (origin) --dashed danger->muted--> [Corporate]        X
//            --dashed danger->muted--> [Entrepreneurship] X
//            --solid, glowing primary--> ?  (exits right edge)
//
// The forward "?" path lands above center to give the dead-end branches the
// natural visual weight of "things tried and exited."
const PathBranches: React.FC = () => {
  const ORIGIN = { x: 90, y: 180 };

  // Corporate branch: upper dead-end.
  const CORP = { x: 600, y: 80 };
  const CORP_END = { x: 760, y: 80 }; // X-mark terminator

  // Entrepreneurship branch: lower dead-end.
  const ENT = { x: 600, y: 280 };
  const ENT_END = { x: 760, y: 280 };

  // Forward "?" path: middle, exits right.
  const Q = { x: 720, y: 180 };
  const FORWARD_TAIL = { x: 1000, y: 180 };

  return (
    <svg
      viewBox="0 0 1000 360"
      className="w-full h-full"
      aria-label="Two abandoned paths (Corporate, Entrepreneurship) and a third forward path leading off-screen."
    >
      <defs>
        {/* Glow filter for the forward "?" node and path -- matches the
            grammar established in slides 03 / 04. */}
        <filter id="detour-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Linear gradient: --color-danger fading to --color-text-muted along
            each abandoned branch. This is the deck-establishing treatment for
            "tinted, low-opacity, fading dead-end" that slides 19, 26, 29 will
            rhyme back to. Two gradients (one per branch) so they share the
            same axis as their respective lines without distortion. */}
        <linearGradient
          id="detour-fade-corp"
          gradientUnits="userSpaceOnUse"
          x1={ORIGIN.x}
          y1={ORIGIN.y}
          x2={CORP_END.x}
          y2={CORP_END.y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="var(--color-danger)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="detour-fade-ent"
          gradientUnits="userSpaceOnUse"
          x1={ORIGIN.x}
          y1={ORIGIN.y}
          x2={ENT_END.x}
          y2={ENT_END.y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="var(--color-danger)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Origin marker: small muted node where the three branches diverge. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
      >
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={7}
          fill="var(--color-bg-card)"
          stroke="var(--color-text-muted)"
          strokeOpacity={0.6}
          strokeWidth={1.5}
        />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={2.5}
          fill="var(--color-text-muted)"
          fillOpacity={0.85}
        />
      </motion.g>

      {/* --- Corporate branch (dashed danger->muted, dead-end) --- */}
      <motion.path
        d={`M ${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x + 220} ${ORIGIN.y}, ${CORP.x - 200} ${CORP.y}, ${CORP.x} ${CORP.y}`}
        fill="none"
        stroke="url(#detour-fade-corp)"
        strokeWidth={2}
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Corporate branch continuation past the node, fading to the X */}
      <motion.line
        x1={CORP.x}
        y1={CORP.y}
        x2={CORP_END.x - 10}
        y2={CORP_END.y}
        stroke="url(#detour-fade-corp)"
        strokeWidth={1.8}
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
      <DeadEndX cx={CORP_END.x} cy={CORP_END.y} delay={1.55} />

      {/* Corporate node */}
      <BranchNode
        cx={CORP.x}
        cy={CORP.y}
        label="Corporate"
        friction={"“felt so fake and superficial”"}
        delay={0.95}
        labelAbove
      />

      {/* --- Entrepreneurship branch (dashed danger->muted, dead-end) --- */}
      <motion.path
        d={`M ${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x + 220} ${ORIGIN.y}, ${ENT.x - 200} ${ENT.y}, ${ENT.x} ${ENT.y}`}
        fill="none"
        stroke="url(#detour-fade-ent)"
        strokeWidth={2}
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.line
        x1={ENT.x}
        y1={ENT.y}
        x2={ENT_END.x - 10}
        y2={ENT_END.y}
        stroke="url(#detour-fade-ent)"
        strokeWidth={1.8}
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />
      <DeadEndX cx={ENT_END.x} cy={ENT_END.y} delay={1.75} />

      {/* Entrepreneurship node */}
      <BranchNode
        cx={ENT.x}
        cy={ENT.y}
        label="Entrepreneurship"
        friction={"“I’m not an entrepreneur. I don’t think like one.”"}
        delay={1.15}
        labelAbove={false}
      />

      {/* --- Forward "?" path (solid, glowing primary, exits right edge) --- */}
      <motion.line
        x1={ORIGIN.x}
        y1={ORIGIN.y}
        x2={Q.x}
        y2={Q.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.7}
        strokeWidth={2.2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 1.95, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        filter="url(#detour-primary-glow)"
      />
      {/* Continuation off-screen right */}
      <motion.line
        x1={Q.x}
        y1={Q.y}
        x2={FORWARD_TAIL.x}
        y2={FORWARD_TAIL.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.45}
        strokeWidth={2}
        strokeDasharray="2 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ delay: 2.5, duration: 0.55 }}
      />
      {/* Tiny arrowhead on the forward continuation, pointing off-screen */}
      <motion.polygon
        points={`${FORWARD_TAIL.x - 12},${FORWARD_TAIL.y - 5} ${FORWARD_TAIL.x},${FORWARD_TAIL.y} ${FORWARD_TAIL.x - 12},${FORWARD_TAIL.y + 5}`}
        fill="var(--color-primary)"
        fillOpacity={0.55}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 2.85, duration: 0.4 }}
      />

      {/* "?" node -- glowing primary, the foreshadow into slide 06. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.55, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${Q.x}px ${Q.y}px` }}
      >
        <circle
          cx={Q.x}
          cy={Q.y}
          r={18}
          fill="var(--color-primary)"
          fillOpacity={0.18}
          stroke="var(--color-primary)"
          strokeWidth={2.2}
          filter="url(#detour-primary-glow)"
        />
        <text
          x={Q.x}
          y={Q.y + 7}
          textAnchor="middle"
          fill="var(--color-primary)"
          fontSize={22}
          fontWeight={700}
          letterSpacing={0}
          filter="url(#detour-primary-glow)"
        >
          ?
        </text>
      </motion.g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// BranchNode -- Corporate / Entrepreneurship dead-end node + friction phrase
// ---------------------------------------------------------------------------
//
// A small node ring (danger-tinted) with the branch label and the verbatim
// friction phrase. labelAbove controls whether the label sits above (true)
// or below (false) the node, so the upper/lower branches don't crowd the
// horizontal connector.
const BranchNode: React.FC<{
  cx: number;
  cy: number;
  label: string;
  friction: string;
  delay: number;
  labelAbove: boolean;
}> = ({ cx, cy, label, friction, delay, labelAbove }) => {
  const labelY = labelAbove ? cy - 26 : cy + 32;
  const frictionY = labelAbove ? cy - 46 : cy + 52;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Outer ring -- danger-tinted, low opacity, dashed to read as "tried
          and exited." */}
      <circle
        cx={cx}
        cy={cy}
        r={11}
        fill="var(--color-bg-card)"
        stroke="var(--color-danger)"
        strokeOpacity={0.55}
        strokeWidth={1.8}
        strokeDasharray="3 3"
      />
      {/* Inner dot in muted -- not glowing, intentionally inert. */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="var(--color-text-muted)"
        fillOpacity={0.6}
      />
      {/* Branch label */}
      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        fill="var(--color-text)"
        fillOpacity={0.85}
        fontSize={15}
        fontWeight={600}
        letterSpacing={1.5}
      >
        {label}
      </text>
      {/* Verbatim friction phrase -- the load-bearing quote. */}
      <text
        x={cx}
        y={frictionY}
        textAnchor="middle"
        fill="var(--color-danger)"
        fillOpacity={0.85}
        fontSize={12}
        fontStyle="italic"
        letterSpacing={0.6}
      >
        {friction}
      </text>
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// DeadEndX -- small X-mark terminator at the end of an abandoned branch
// ---------------------------------------------------------------------------
const DeadEndX: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => {
  const r = 7;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <line
        x1={cx - r}
        y1={cy - r}
        x2={cx + r}
        y2={cy + r}
        stroke="var(--color-danger)"
        strokeOpacity={0.7}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={cx - r}
        y1={cy + r}
        x2={cx + r}
        y2={cy - r}
        stroke="var(--color-danger)"
        strokeOpacity={0.7}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </motion.g>
  );
};

export default CorporateDetour;
