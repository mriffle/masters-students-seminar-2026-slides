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
 *   1. Pull-quote (top of slide):
 *        "I asked for a promotion, was told that's not how they do things
 *         here, so I quit and started my own company."
 *   2. Corporate-row friction node:
 *        "felt so fake and superficial"
 *   3. Entrepreneurship-row friction node:
 *        "I'm not an entrepreneur. I don't think like one."
 *
 * Visual concept (SEQUENTIAL, not parallel):
 *   The three phases are stacked vertically as three horizontal rows --
 *   Corporate, then Entrepreneurship, then the forward "?" path. Each row
 *   reads left-to-right; curving connectors between rows show the temporal
 *   sequence (this phase dead-ended, then the next phase started, that one
 *   also dead-ended, then the forward path opened).
 *
 *       (origin) =====thick dashed danger=====> [Corporate] -----> X
 *           "Left UW before graduating"          "felt so fake and superficial"
 *                                                                            \
 *                                                                       (curving connector,
 *                                                                        danger-tinted)
 *                                                                              v
 *       (origin) =====thick dashed danger=====> [Entrepreneurship] -> X
 *           "Back at UW; finished degree in       "I'm not an entrepreneur.
 *            Cellular & Molecular Biology"          I don't think like one."
 *                                                                            \
 *                                                                       (connector fades
 *                                                                        from danger -> primary)
 *                                                                              v
 *       (origin) =====thick solid primary=====> ?   --dashed-->  (off-screen, foreshadow)
 *
 *   The biographical context for each dead-end phase appears as an italic
 *   muted annotation above its path: "Left UW before graduating" labels the
 *   entry into the Corporate phase; "Back at UW; finished degree in
 *   Cellular & Molecular Biology" labels the entry into the Entrepreneurship
 *   phase (returning to UW happened DURING the entrepreneurship years -- the
 *   self-employment provided the schedule flexibility to finish the degree).
 *
 *   Connector between rows 1 and 2 stays danger-tinted (still in the
 *   "didn't fit" era). Connector between rows 2 and 3 fades from danger
 *   through muted to primary -- a visible color shift that signals the next
 *   chapter is different in kind, foreshadowing slide 06.
 *
 * Line widths are deliberately heavy throughout (6 for main paths, 5 for
 * continuations, 6 for forward, 4 for connectors) so the path topology
 * reads from across the room.
 *
 * Motif continuity (slides 03 -> 04 -> 05):
 *   - Same node grammar: small filled circle with a higher-opacity stroked
 *     ring, inner accent dot, italic muted annotations beneath/around.
 *   - Same defs/glow filter pattern (Gaussian blur + feMerge) for the
 *     pursued-path node.
 *   - Same italic muted text style for trajectory annotations.
 *   - Pursued path remains solid --color-primary; abandoned branches are
 *     thick dashed and danger-gradient.
 *
 * --color-danger establishment (FIRST APPEARANCE in the deck):
 *   This is the first slide to introduce --color-danger. The deck-wide
 *   semantic is "dead ends, what AI gets wrong, friction" and this slide
 *   sets the visual register that slides 19, 26, and 29 will rhyme back to.
 *   The treatment chosen here:
 *     - Strokes drawn at 0.45-0.7 stop opacity (NOT loud red).
 *     - Strokes are thick dashed (12 12 / 10 14) to read as "abandoned
 *       trajectory you can see the shape of."
 *     - The danger color FADES into --color-text-muted as each branch
 *       terminates -- linearGradient stops from danger at the origin to
 *       muted at the dead-end terminator.
 *     - Friction-phrase text on those branches is rendered in --color-danger
 *       at fillOpacity ~0.85 (legible but not blaring).
 *     - The terminator X is drawn in --color-danger at strokeOpacity 0.7.
 *   Net: danger is present and meaningful, but tinted -- the audience reads
 *   "these were dead ends" without the slide shouting. Later slides 19, 26,
 *   29 should use a similar restrained register.
 *
 * Color budget (3 accent max):
 *   - --color-primary    -> the forward "?" path (foreshadow into slide 06).
 *   - --color-danger     -> the two abandoned phase paths and their friction
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

        {/* Path diagram: three sequential phases. */}
        <motion.div
          className="w-full max-w-[90vw] h-[52vh]"
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
          transition={{ delay: 5.0, duration: 0.6 }}
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
// Path branches diagram -- THREE SEQUENTIAL PHASES
// ---------------------------------------------------------------------------
//
// viewBox 1000 x 540.
//
// Three horizontal rows stacked vertically. Each row is one phase:
//   Row 1 (y=90):  Corporate          --> dead-end X
//   Row 2 (y=290): Entrepreneurship   --> dead-end X
//   Row 3 (y=480): Forward "?"        --> off-screen (foreshadow into slide 06)
//
// Curving bezier connectors between rows carry the "and then..." beat.
// Connector 1 stays danger-tinted (still in the didn't-fit era); connector
// 2 fades from danger through muted to primary, signaling the qualitative
// shift into the next chapter.
//
// Line widths are deliberately heavy: 6 for main dashed paths, 5 for the
// short continuations to the X, 6 for the forward primary path, 4 for the
// inter-row connectors. The original treatment used 2 px which read as
// hairline -- this version reads from across the room.
const PathBranches: React.FC = () => {
  const ORIGIN_X = 110;
  const NODE_X = 480;
  const END_X = 700; // X-mark terminator for dead-end rows
  const Q_X = 700; // "?" node x in the forward row
  const TAIL_X = 1000; // off-screen continuation tail for forward row

  const CORP_Y = 90;
  const ENT_Y = 290;
  const FWD_Y = 480;

  // Vertical mid-points used as bezier control points for inter-row connectors.
  const MID_1 = (CORP_Y + ENT_Y) / 2;
  const MID_2 = (ENT_Y + FWD_Y) / 2;

  return (
    <svg
      viewBox="0 0 1000 540"
      className="w-full h-full"
      aria-label="Three sequential phases: Corporate dead-ends, then Entrepreneurship begins (with the speaker returning to UW to finish a Cellular & Molecular Biology degree) and dead-ends, then a forward question-mark path begins, leading off-screen."
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

        {/* Linear gradients for each abandoned-phase row: danger at the
            origin fading into muted at the X-mark terminator. Same axis as
            the path so the gradient direction matches the visual flow. */}
        <linearGradient
          id="detour-fade-corp"
          gradientUnits="userSpaceOnUse"
          x1={ORIGIN_X}
          y1={CORP_Y}
          x2={END_X}
          y2={CORP_Y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.7" />
          <stop offset="60%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient
          id="detour-fade-ent"
          gradientUnits="userSpaceOnUse"
          x1={ORIGIN_X}
          y1={ENT_Y}
          x2={END_X}
          y2={ENT_Y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.7" />
          <stop offset="60%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.45" />
        </linearGradient>

        {/* Connector 1: Corporate dead-end -> Entrepreneurship origin.
            Stays in the danger family (still the didn't-fit era). */}
        <linearGradient
          id="detour-connector-1"
          gradientUnits="userSpaceOnUse"
          x1={END_X}
          y1={CORP_Y}
          x2={ORIGIN_X}
          y2={ENT_Y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0.45" />
        </linearGradient>

        {/* Connector 2: Entrepreneurship dead-end -> Forward origin.
            Fades from danger through muted to primary -- visible signal
            that the next chapter is different in kind. */}
        <linearGradient
          id="detour-connector-2"
          gradientUnits="userSpaceOnUse"
          x1={END_X}
          y1={ENT_Y}
          x2={ORIGIN_X}
          y2={FWD_Y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="var(--color-text-muted)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* =================================================================
          ROW 1 -- CORPORATE
          ================================================================= */}

      {/* Origin marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        style={{ transformOrigin: `${ORIGIN_X}px ${CORP_Y}px` }}
      >
        <circle
          cx={ORIGIN_X}
          cy={CORP_Y}
          r={10}
          fill="var(--color-bg-card)"
          stroke="var(--color-text-muted)"
          strokeOpacity={0.7}
          strokeWidth={2.5}
        />
        <circle
          cx={ORIGIN_X}
          cy={CORP_Y}
          r={4}
          fill="var(--color-text-muted)"
          fillOpacity={0.85}
        />
      </motion.g>

      {/* Annotation above row 1 path: entry circumstance. */}
      <motion.text
        x={(ORIGIN_X + NODE_X) / 2}
        y={CORP_Y - 22}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
        fontSize={14}
        fontStyle="italic"
        letterSpacing={0.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Left UW before graduating
      </motion.text>

      {/* Corporate path: thick dashed danger, origin -> node */}
      <motion.path
        d={`M ${ORIGIN_X} ${CORP_Y} L ${NODE_X} ${CORP_Y}`}
        fill="none"
        stroke="url(#detour-fade-corp)"
        strokeWidth={6}
        strokeDasharray="12 12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Continuation past the Corporate node, fading toward the X */}
      <motion.line
        x1={NODE_X}
        y1={CORP_Y}
        x2={END_X - 14}
        y2={CORP_Y}
        stroke="url(#detour-fade-corp)"
        strokeWidth={5}
        strokeDasharray="10 14"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.5 }}
      />
      <DeadEndX cx={END_X} cy={CORP_Y} delay={1.45} />

      {/* Corporate node + label + friction quote (label/friction below) */}
      <BranchNode
        cx={NODE_X}
        cy={CORP_Y}
        label="Corporate"
        friction={'“felt so fake and superficial”'}
        delay={0.9}
        labelAbove={false}
      />

      {/* =================================================================
          CONNECTOR 1 -- Corporate dead-end -> Entrepreneurship origin
          ================================================================= */}
      <motion.path
        d={`M ${END_X} ${CORP_Y + 22} C ${END_X} ${MID_1}, ${ORIGIN_X} ${MID_1}, ${ORIGIN_X} ${ENT_Y - 22}`}
        fill="none"
        stroke="url(#detour-connector-1)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Small chevron arrow at the connector tail, pointing down toward
          the row-2 origin so the temporal direction reads clearly. */}
      <motion.polygon
        points={`${ORIGIN_X - 7},${ENT_Y - 22 - 9} ${ORIGIN_X + 7},${ENT_Y - 22 - 9} ${ORIGIN_X},${ENT_Y - 22}`}
        fill="var(--color-danger)"
        fillOpacity={0.55}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 2.4, duration: 0.35 }}
      />

      {/* =================================================================
          ROW 2 -- ENTREPRENEURSHIP
          ================================================================= */}

      {/* Origin marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.45, duration: 0.4 }}
        style={{ transformOrigin: `${ORIGIN_X}px ${ENT_Y}px` }}
      >
        <circle
          cx={ORIGIN_X}
          cy={ENT_Y}
          r={10}
          fill="var(--color-bg-card)"
          stroke="var(--color-text-muted)"
          strokeOpacity={0.7}
          strokeWidth={2.5}
        />
        <circle
          cx={ORIGIN_X}
          cy={ENT_Y}
          r={4}
          fill="var(--color-text-muted)"
          fillOpacity={0.85}
        />
      </motion.g>

      {/* Annotation above row 2 path: returning to UW happened during this
          phase -- self-employment provided the schedule flexibility. */}
      <motion.text
        x={(ORIGIN_X + NODE_X) / 2}
        y={ENT_Y - 22}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
        fontSize={14}
        fontStyle="italic"
        letterSpacing={0.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 2.7, duration: 0.4 }}
      >
        Back at UW &middot; finished degree in Cellular &amp; Molecular Biology
      </motion.text>

      {/* Entrepreneurship path: thick dashed danger, origin -> node */}
      <motion.path
        d={`M ${ORIGIN_X} ${ENT_Y} L ${NODE_X} ${ENT_Y}`}
        fill="none"
        stroke="url(#detour-fade-ent)"
        strokeWidth={6}
        strokeDasharray="12 12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 2.55, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Continuation past the Entrepreneurship node, fading toward the X */}
      <motion.line
        x1={NODE_X}
        y1={ENT_Y}
        x2={END_X - 14}
        y2={ENT_Y}
        stroke="url(#detour-fade-ent)"
        strokeWidth={5}
        strokeDasharray="10 14"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 3.25, duration: 0.5 }}
      />
      <DeadEndX cx={END_X} cy={ENT_Y} delay={3.65} />

      {/* Entrepreneurship node + label + friction quote */}
      <BranchNode
        cx={NODE_X}
        cy={ENT_Y}
        label="Entrepreneurship"
        friction={'“I’m not an entrepreneur. I don’t think like one.”'}
        delay={3.1}
        labelAbove={false}
      />

      {/* =================================================================
          CONNECTOR 2 -- Entrepreneurship dead-end -> Forward origin
          (fades from danger through muted to primary)
          ================================================================= */}
      <motion.path
        d={`M ${END_X} ${ENT_Y + 22} C ${END_X} ${MID_2}, ${ORIGIN_X} ${MID_2}, ${ORIGIN_X} ${FWD_Y - 22}`}
        fill="none"
        stroke="url(#detour-connector-2)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 3.85, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.polygon
        points={`${ORIGIN_X - 7},${FWD_Y - 22 - 9} ${ORIGIN_X + 7},${FWD_Y - 22 - 9} ${ORIGIN_X},${FWD_Y - 22}`}
        fill="var(--color-primary)"
        fillOpacity={0.7}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 4.55, duration: 0.35 }}
      />

      {/* =================================================================
          ROW 3 -- FORWARD "?"  (foreshadow into slide 06)
          ================================================================= */}

      {/* Forward origin marker -- glowing primary so the eye registers the
          qualitative shift. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.6, duration: 0.4 }}
        style={{ transformOrigin: `${ORIGIN_X}px ${FWD_Y}px` }}
      >
        <circle
          cx={ORIGIN_X}
          cy={FWD_Y}
          r={9}
          fill="var(--color-bg-card)"
          stroke="var(--color-primary)"
          strokeOpacity={0.85}
          strokeWidth={2.6}
          filter="url(#detour-primary-glow)"
        />
        <circle
          cx={ORIGIN_X}
          cy={FWD_Y}
          r={3.5}
          fill="var(--color-primary)"
          fillOpacity={0.95}
        />
      </motion.g>

      {/* Forward path: thick solid glowing primary */}
      <motion.line
        x1={ORIGIN_X}
        y1={FWD_Y}
        x2={Q_X}
        y2={FWD_Y}
        stroke="var(--color-primary)"
        strokeOpacity={0.8}
        strokeWidth={6}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ delay: 4.75, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        filter="url(#detour-primary-glow)"
      />

      {/* Continuation off-screen right -- thick dashed primary, with arrowhead. */}
      <motion.line
        x1={Q_X}
        y1={FWD_Y}
        x2={TAIL_X}
        y2={FWD_Y}
        stroke="var(--color-primary)"
        strokeOpacity={0.55}
        strokeWidth={5}
        strokeDasharray="3 10"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.55 }}
        transition={{ delay: 5.4, duration: 0.55 }}
      />
      <motion.polygon
        points={`${TAIL_X - 16},${FWD_Y - 8} ${TAIL_X},${FWD_Y} ${TAIL_X - 16},${FWD_Y + 8}`}
        fill="var(--color-primary)"
        fillOpacity={0.6}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 5.85, duration: 0.4 }}
      />

      {/* "?" node -- glowing primary, the foreshadow into slide 06. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5.45, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${Q_X}px ${FWD_Y}px` }}
      >
        <circle
          cx={Q_X}
          cy={FWD_Y}
          r={22}
          fill="var(--color-primary)"
          fillOpacity={0.18}
          stroke="var(--color-primary)"
          strokeWidth={2.6}
          filter="url(#detour-primary-glow)"
        />
        <text
          x={Q_X}
          y={FWD_Y + 8}
          textAnchor="middle"
          fill="var(--color-primary)"
          fontSize={26}
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
// A node ring (danger-tinted) with the branch label and the verbatim friction
// phrase. labelAbove controls whether the label sits above (true) or below
// (false) the node. In the new sequential layout both rows pass labelAbove
// = false -- friction sits below the node so the area above each node is
// reserved for the entry-circumstance annotation.
const BranchNode: React.FC<{
  cx: number;
  cy: number;
  label: string;
  friction: string;
  delay: number;
  labelAbove: boolean;
}> = ({ cx, cy, label, friction, delay, labelAbove }) => {
  const labelY = labelAbove ? cy - 26 : cy + 32;
  const frictionY = labelAbove ? cy - 46 : cy + 54;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Outer ring -- danger-tinted, dashed to read as "tried and exited." */}
      <circle
        cx={cx}
        cy={cy}
        r={13}
        fill="var(--color-bg-card)"
        stroke="var(--color-danger)"
        strokeOpacity={0.65}
        strokeWidth={2.4}
        strokeDasharray="3 3"
      />
      {/* Inner dot in muted -- not glowing, intentionally inert. */}
      <circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill="var(--color-text-muted)"
        fillOpacity={0.6}
      />
      {/* Branch label */}
      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        fill="var(--color-text)"
        fillOpacity={0.9}
        fontSize={16}
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
        fillOpacity={0.9}
        fontSize={13}
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
  const r = 9;
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
        strokeOpacity={0.75}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={cx - r}
        y1={cy + r}
        x2={cx + r}
        y2={cy - r}
        stroke="var(--color-danger)"
        strokeOpacity={0.75}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </motion.g>
  );
};

export default CorporateDetour;
