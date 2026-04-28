import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 19 — Bridge: Dead Ends and Pattern Recognition
 *
 * CLOSING slide of Part 2. The bridge to Part 3.
 *
 * ============================================================================
 * MOTIF-ESTABLISHING SLIDE: "Dead-ends / forking path"
 * ============================================================================
 * This slide ESTABLISHES the canonical dead-ends-with-forking-path visual
 * grammar that slide 29 (Rabbit Hole and Stark Conclusion) will rhyme back
 * to. The shape language and color treatment committed here are canonical:
 *
 *   - Multiple branches diverging from a single origin point
 *   - Most branches: dim, dashed --color-danger strokes (low opacity ~0.4–0.55)
 *     fading to --color-text-muted, terminating in either an X-mark or a soft
 *     fade-out tip
 *   - ONE solid --color-primary branch continues onward, glowing, exiting
 *     off-screen to the right (foreshadowing: Part 3 / "where things are going")
 *   - A small magnifying-lens icon hovers near a fork, marking the senior
 *     skill of recognizing dead ends early
 *
 * This treatment also extends slide 05's dashed-danger-branch convention
 * (gradient fade danger -> text-muted, dashed 8 8 stroke, X-mark terminator,
 * danger stroke ~0.55 opacity).
 *
 * Slide 29 should reuse the BRANCH_GEOMETRY constant pattern below, the
 * gradient-fade defs, the DeadEndX terminator, and the MagnifyingLens
 * marker. (See "Reusable canonical geometry" comments inline.)
 *
 * ============================================================================
 * Required content (all three appear)
 * ============================================================================
 *   1. Centerpiece pull-quote (verbatim/near-verbatim per part doc 2.13):
 *        "I'd waste a lot more time today if I didn't have the experience
 *         to recognize dead ends early."
 *
 *   2. Key insight framing line (per SLIDES.md slide 19):
 *        "The same pattern recognition that lets you recognize dead ends in
 *         your own work is what lets you recognize when AI is wrong."
 *
 *   3. Soft transition (the bridge to Part 3, subtle footer):
 *        "Which brings us to where things are going."
 *
 * ============================================================================
 * Color budget (3 accents max)
 *   --color-danger      -> dead-end branches (dashed, low opacity, fading)
 *   --color-primary     -> the pursued path (solid, glowing, off-screen right)
 *   --color-text-muted  -> annotations, italic framing line, transition footer
 *   --color-text        -> pull-quote body (not counted as accent)
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// CANONICAL BRANCH GEOMETRY
// ---------------------------------------------------------------------------
// Shared constants for the dead-ends motif. Slide 29 should consume an
// equivalent geometry definition so the two slides feel like the same diagram
// being remembered. The viewBox is 1000 x 380.
//
//   - ORIGIN: where all branches diverge
//   - DEAD_END_BRANCHES: 5 dim/dashed branches that terminate in X-marks
//     or fade-outs. Spread vertically around the origin. The fork that
//     hosts the magnifying lens (the moment of recognition) is identified
//     by the `lens: true` flag.
//   - PURSUED: the solid primary branch that exits the right edge
// ---------------------------------------------------------------------------

const VIEW_W = 1000;
const VIEW_H = 380;
const ORIGIN = { x: 90, y: VIEW_H / 2 };

// The five dead-end branches. Each ends either at a small X-mark (stark
// terminator) or at a soft fade-out (the branch dies before it reaches
// anywhere -- "looked promising, then trailed off"). Targets are chosen so
// the visual reads as a fan of forks, with the pursued path threading
// through the middle.
type DeadEnd = {
  id: string;
  // Branch curve: cubic Bezier from origin via two control points to a node,
  // then a short line continuation to the terminator.
  node: { x: number; y: number };
  end: { x: number; y: number };
  control1: { x: number; y: number };
  control2: { x: number; y: number };
  terminator: 'x' | 'fade';
  // The fork that hosts the magnifying lens: the senior-skill moment.
  lens?: boolean;
  // Small annotation chip near the dead-end node (optional, italic muted).
  // Kept very terse -- this is a visual, not a list.
  annotation?: string;
};

const DEAD_ENDS: DeadEnd[] = [
  {
    id: 'top-far',
    node: { x: 540, y: 50 },
    end: { x: 700, y: 35 },
    control1: { x: 280, y: ORIGIN.y - 30 },
    control2: { x: 380, y: 70 },
    terminator: 'x',
  },
  {
    id: 'top-mid',
    node: { x: 600, y: 130 },
    end: { x: 760, y: 115 },
    control1: { x: 260, y: ORIGIN.y - 10 },
    control2: { x: 440, y: 145 },
    terminator: 'fade',
  },
  // The fork that hosts the magnifying lens. Positioned just above center
  // so the lens sits in the natural reading zone next to the pursued path.
  {
    id: 'just-above',
    node: { x: 480, y: 220 },
    end: { x: 640, y: 235 },
    control1: { x: 230, y: ORIGIN.y },
    control2: { x: 360, y: 215 },
    terminator: 'x',
    lens: true,
  },
  {
    id: 'bot-mid',
    node: { x: 600, y: 280 },
    end: { x: 760, y: 295 },
    control1: { x: 260, y: ORIGIN.y + 10 },
    control2: { x: 440, y: 270 },
    terminator: 'x',
  },
  {
    id: 'bot-far',
    node: { x: 540, y: 340 },
    end: { x: 700, y: 355 },
    control1: { x: 280, y: ORIGIN.y + 30 },
    control2: { x: 380, y: 325 },
    terminator: 'fade',
  },
];

// Pursued path: lands at a node mid-right then continues off-screen.
const PURSUED_NODE = { x: 720, y: ORIGIN.y };
const PURSUED_TAIL = { x: VIEW_W, y: ORIGIN.y };

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const DeadEndsBridge: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-2">
        <SlideTitle subtitle="The senior skill nobody teaches">
          Dead Ends
        </SlideTitle>

        {/* Centerpiece pull-quote -- verbatim per part doc 2.13.
            Wordmark-ish scale; this is the moment that lands. */}
        <motion.div
          className="w-full max-w-[86vw] mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="text-center font-light italic leading-snug"
            style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
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
            I&rsquo;d waste a lot more time today if I didn&rsquo;t have the
            experience to recognize dead ends early.
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

        {/* Diagram: branching path with dead ends + the pursued path. */}
        <motion.div
          className="w-full max-w-[90vw] h-[44vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65 }}
        >
          <ForkingPath />
        </motion.div>

        {/* Key insight framing line -- italic muted, sits beneath the diagram. */}
        <motion.p
          className="text-center font-light italic leading-snug max-w-[80vw]"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
            letterSpacing: 0.3,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          The same pattern recognition that lets you recognize dead ends in
          your own work is what lets you recognize when{' '}
          <span style={{ color: 'var(--color-text)', opacity: 0.92 }}>
            AI is wrong.
          </span>
        </motion.p>

        {/* Soft transition footer -- the bridge to Part 3. Deliberately
            subtle: present, but not loud. */}
        <motion.p
          className="text-center font-light tracking-wide"
          style={{
            color: 'var(--color-text-muted)',
            opacity: 0.6,
            fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
            letterSpacing: 1.4,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3.1, duration: 0.7 }}
        >
          Which brings us to where things are going.
        </motion.p>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// ForkingPath -- the branching diagram
// ---------------------------------------------------------------------------
// CANONICAL DEAD-ENDS GRAMMAR (slide 29 should rhyme):
//   - origin marker: small muted ring + inner dot
//   - dead-end branch: cubic Bezier, stroke = url(#deadends-fade-N), dashed
//     8 8, strokeWidth 2, opacity ramps from 0.55 (origin) -> ~0.35 muted
//     (terminator)
//   - dead-end node: small ring (r=10), bg-card fill, dashed danger stroke
//     at 0.55 opacity, inert muted inner dot
//   - terminator: DeadEndX (X-mark, danger 0.7 opacity) OR FadeOutTip (small
//     muted ring softly fading)
//   - pursued path: solid primary stroke 2.2px, glow filter, exits viewBox
//     to the right with arrowhead
//   - magnifying lens: hovers ABOVE one of the forks, marking the moment of
//     recognition. Drawn in primary at moderate opacity (the senior skill).
// ---------------------------------------------------------------------------

const ForkingPath: React.FC = () => {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full h-full"
      aria-label="A branching path with five dim, dashed dead-end forks and one solid, glowing path that continues off-screen to the right. A magnifying-lens icon hovers near a fork, marking the senior skill of recognizing dead ends early."
    >
      <defs>
        {/* Glow filter for the pursued path -- matches the grammar from
            slides 03 / 04 / 05. */}
        <filter id="bridge-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Softer glow for the magnifying lens -- present but not dominant. */}
        <filter id="bridge-lens-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Per-branch linear gradients: --color-danger fading to
            --color-text-muted along each dead-end path. Same treatment as
            slide 05's "detour-fade-corp" / "detour-fade-ent" defs. Each
            branch needs its own gradient because gradientUnits="userSpaceOnUse"
            with branch-specific endpoints keeps the fade aligned with the
            branch direction. Slide 29 should reproduce this pattern. */}
        {DEAD_ENDS.map((b) => (
          <linearGradient
            key={b.id}
            id={`bridge-fade-${b.id}`}
            gradientUnits="userSpaceOnUse"
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={b.end.x}
            y2={b.end.y}
          >
            <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--color-danger)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.32" />
          </linearGradient>
        ))}
      </defs>

      {/* Origin marker -- small muted node where all branches diverge. */}
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

      {/* --- Dead-end branches (dashed danger -> muted) --- */}
      {DEAD_ENDS.map((b, i) => {
        // Stagger the entrance so the dead ends appear before the pursued
        // path -- the audience reads "things tried" then "the one that worked."
        const branchDelay = 0.3 + i * 0.12;
        const tailDelay = branchDelay + 0.6;
        const termDelay = tailDelay + 0.35;
        const nodeDelay = branchDelay + 0.45;
        return (
          <g key={b.id}>
            {/* Curved branch from origin to node */}
            <motion.path
              d={`M ${ORIGIN.x} ${ORIGIN.y} C ${b.control1.x} ${b.control1.y}, ${b.control2.x} ${b.control2.y}, ${b.node.x} ${b.node.y}`}
              fill="none"
              stroke={`url(#bridge-fade-${b.id})`}
              strokeWidth={2}
              strokeDasharray="8 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: branchDelay,
                duration: 0.85,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            {/* Continuation past the node toward terminator */}
            <motion.line
              x1={b.node.x}
              y1={b.node.y}
              x2={b.terminator === 'x' ? b.end.x - 10 : b.end.x}
              y2={b.terminator === 'x' ? b.end.y : b.end.y}
              stroke={`url(#bridge-fade-${b.id})`}
              strokeWidth={1.8}
              strokeDasharray="6 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: tailDelay, duration: 0.5 }}
            />
            {/* Small inert dead-end node */}
            <DeadEndNode cx={b.node.x} cy={b.node.y} delay={nodeDelay} />
            {/* Terminator */}
            {b.terminator === 'x' ? (
              <DeadEndX cx={b.end.x} cy={b.end.y} delay={termDelay} />
            ) : (
              <FadeOutTip cx={b.end.x} cy={b.end.y} delay={termDelay} />
            )}
          </g>
        );
      })}

      {/* --- Pursued path (solid, glowing primary, exits right edge) ---
          Animated last, after the dead ends have populated. */}
      <motion.line
        x1={ORIGIN.x}
        y1={ORIGIN.y}
        x2={PURSUED_NODE.x}
        y2={PURSUED_NODE.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.75}
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ delay: 1.85, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        filter="url(#bridge-primary-glow)"
      />
      {/* Continuation off-screen right */}
      <motion.line
        x1={PURSUED_NODE.x}
        y1={PURSUED_NODE.y}
        x2={PURSUED_TAIL.x}
        y2={PURSUED_TAIL.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeDasharray="2 6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.55 }}
        transition={{ delay: 2.45, duration: 0.55 }}
      />
      {/* Arrowhead pointing off-screen right */}
      <motion.polygon
        points={`${PURSUED_TAIL.x - 13},${PURSUED_TAIL.y - 6} ${PURSUED_TAIL.x},${PURSUED_TAIL.y} ${PURSUED_TAIL.x - 13},${PURSUED_TAIL.y + 6}`}
        fill="var(--color-primary)"
        fillOpacity={0.65}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 2.85, duration: 0.4 }}
      />
      {/* Pursued-path node -- glowing primary ring. The moment the speaker's
          experience routes them past the dead ends. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${PURSUED_NODE.x}px ${PURSUED_NODE.y}px` }}
      >
        <circle
          cx={PURSUED_NODE.x}
          cy={PURSUED_NODE.y}
          r={14}
          fill="var(--color-primary)"
          fillOpacity={0.18}
          stroke="var(--color-primary)"
          strokeWidth={2.2}
          filter="url(#bridge-primary-glow)"
        />
        <circle
          cx={PURSUED_NODE.x}
          cy={PURSUED_NODE.y}
          r={3.5}
          fill="var(--color-primary)"
          fillOpacity={0.95}
        />
      </motion.g>

      {/* --- Magnifying lens -- the senior skill -----------------------
          Hovers above the lens-flagged fork, marking the moment of
          recognition: "this branch is a dead end -- don't go there."
          A short dashed connector links the lens to the fork point on
          the dead-end branch it's diagnosing. */}
      <MagnifyingLens
        cx={290}
        cy={150}
        // The fork it's marking -- mid-curve point of the lens-flagged dead end.
        marksX={350}
        marksY={205}
      />
      <motion.text
        x={290}
        y={113}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={0.85}
        fontSize={11}
        fontStyle="italic"
        letterSpacing={1.2}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 3.4, duration: 0.55 }}
      >
        recognize it early
      </motion.text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// DeadEndNode -- small inert ring at a dead-end fork
// ---------------------------------------------------------------------------
// CANONICAL: dashed danger ring, bg-card fill, muted inner dot.
// Slide 29 should reuse this exact treatment.
const DeadEndNode: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.45 }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <circle
      cx={cx}
      cy={cy}
      r={9}
      fill="var(--color-bg-card)"
      stroke="var(--color-danger)"
      strokeOpacity={0.55}
      strokeWidth={1.6}
      strokeDasharray="3 3"
    />
    <circle
      cx={cx}
      cy={cy}
      r={2.4}
      fill="var(--color-text-muted)"
      fillOpacity={0.6}
    />
  </motion.g>
);

// ---------------------------------------------------------------------------
// DeadEndX -- X-mark terminator (danger, low-medium opacity)
// ---------------------------------------------------------------------------
// CANONICAL: identical to slide 05's terminator, kept consistent so the
// audience reads the same shape as "abandoned." Slide 29 should reuse.
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

// ---------------------------------------------------------------------------
// FadeOutTip -- soft fade-out terminator (alternative to X)
// ---------------------------------------------------------------------------
// Two concentric arcs that softly trail off, suggesting "this branch just
// dies." Useful when the slide doesn't want every dead-end to read as a
// stark X. Slide 29 may reuse OR omit -- the X is the primary terminator.
const FadeOutTip: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="none"
      stroke="var(--color-text-muted)"
      strokeOpacity={0.4}
      strokeWidth={1.2}
      strokeDasharray="2 3"
    />
    <circle
      cx={cx}
      cy={cy}
      r={1.5}
      fill="var(--color-text-muted)"
      fillOpacity={0.45}
    />
  </motion.g>
);

// ---------------------------------------------------------------------------
// MagnifyingLens -- the senior skill marker
// ---------------------------------------------------------------------------
// A small magnifying-lens icon (circle + handle) drawn in --color-primary
// at moderate opacity, with a short dashed connector to the fork it's
// diagnosing. The lens is the visible moment of "noticing" -- the skill
// the speaker says he's developed and that students need.
//
// CANONICAL: slide 29 should reuse this same icon (the protective skill
// against AI rabbit holes IS the same skill).
const MagnifyingLens: React.FC<{
  cx: number;
  cy: number;
  marksX: number;
  marksY: number;
}> = ({ cx, cy, marksX, marksY }) => {
  const r = 16;
  // Handle goes outward toward the fork it's marking.
  const dx = marksX - cx;
  const dy = marksY - cy;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const handleStart = { x: cx + ux * (r + 1), y: cy + uy * (r + 1) };
  const handleEnd = { x: cx + ux * (r + 11), y: cy + uy * (r + 11) };
  // Connector continues from handle tip down to the fork it's diagnosing.
  const connectorStart = { x: handleEnd.x + ux * 2, y: handleEnd.y + uy * 2 };

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3.0, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Lens glass -- primary, low fill, full stroke */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="var(--color-primary)"
        fillOpacity={0.1}
        stroke="var(--color-primary)"
        strokeOpacity={0.85}
        strokeWidth={2.2}
        filter="url(#bridge-lens-glow)"
      />
      {/* Inner highlight glint -- gives the lens dimensionality */}
      <circle
        cx={cx - r * 0.35}
        cy={cy - r * 0.35}
        r={r * 0.18}
        fill="var(--color-primary)"
        fillOpacity={0.35}
      />
      {/* Handle */}
      <line
        x1={handleStart.x}
        y1={handleStart.y}
        x2={handleEnd.x}
        y2={handleEnd.y}
        stroke="var(--color-primary)"
        strokeOpacity={0.85}
        strokeWidth={3.2}
        strokeLinecap="round"
        filter="url(#bridge-lens-glow)"
      />
      {/* Dashed connector from handle tip to the fork being diagnosed --
          subtle, just enough to show the lens is "looking at" something. */}
      <line
        x1={connectorStart.x}
        y1={connectorStart.y}
        x2={marksX}
        y2={marksY}
        stroke="var(--color-primary)"
        strokeOpacity={0.35}
        strokeWidth={1.2}
        strokeDasharray="2 4"
        strokeLinecap="round"
      />
      {/* Tiny pulse dot at the fork being diagnosed */}
      <circle
        cx={marksX}
        cy={marksY}
        r={3}
        fill="var(--color-primary)"
        fillOpacity={0.8}
      />
    </motion.g>
  );
};

export default DeadEndsBridge;
