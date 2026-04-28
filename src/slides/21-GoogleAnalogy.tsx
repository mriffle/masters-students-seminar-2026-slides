import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 21 — The Google Analogy
 *
 * Make the abstract Part 3 thesis concrete with a relatable analogy. Every
 * student in the audience has seen this difference among classmates: some
 * people are wizards at extracting niche answers from Google; others can't
 * find anything. AI is the same dynamic — but amplified.
 *
 * ---------------------------------------------------------------------------
 * Verbatim / near-verbatim quote (load-bearing — must appear word-for-word):
 *
 *   "Some people are extremely good at finding niche answers on Google.
 *    Some aren't. AI is exactly like this, but to the Nth degree."
 *
 * Per docs/part3_future.md "The Google-Search Analogy (Verbatim and
 * Near-Verbatim)" raw-material section.
 * ---------------------------------------------------------------------------
 *
 * Visual: two parallel query trajectories.
 *   - LEFT  — vague query ("how to do statistics") branching into a chaotic,
 *             sprawling tree of low-quality results. Many nodes, scattered,
 *             ending in confusion. --color-danger tinted, dashed strokes.
 *             Rhymes with the dead-ends motif from slide 19 / slide 05 —
 *             this IS the dead-end shape language at search-engine scale.
 *   - RIGHT — precise, well-framed query branching into a focused tree that
 *             converges on a single useful answer. Solid strokes, fewer,
 *             well-placed nodes. --color-success.
 *
 * The contrast IS the visual lesson. Same person, two framings, two outcomes.
 *
 * Tagline beneath: "AI is this — to the Nth degree."
 *
 * Color budget (3 accents):
 *   --color-danger      -> chaotic tree, vague-query side
 *   --color-success     -> focused tree, precise-query side
 *   --color-text-muted  -> labels, query strings, supporting copy
 *   --color-text        -> verbatim quote body, tagline emphasis
 */

// ---------------------------------------------------------------------------
// Geometry: two trees inside a single SVG, side by side
// ---------------------------------------------------------------------------
// viewBox 1200 x 520 (approx 12:5). Two halves of width 600, with a soft
// vertical seam at x=600. Each tree roots at its query box near the top and
// branches downward.

const VB_W = 1200;
const VB_H = 820;

// Left side — VAGUE query, chaotic tree
const LEFT_QUERY = { x: 50, y: 30, w: 500, h: 64 };
const LEFT_ROOT = { x: 300, y: 122 }; // bottom-center of the query box
const LEFT_TERMINUS = { x: 300, y: 740 }; // confusion marker

// Right side — PRECISE query, focused tree
const RIGHT_QUERY = { x: 650, y: 30, w: 500, h: 64 };
const RIGHT_ROOT = { x: 900, y: 122 };
const RIGHT_ANSWER = { x: 900, y: 740 }; // converged-answer marker

// Branch definitions for the chaotic LEFT tree. Lots of nodes, scattered,
// some terminate as fade-outs (dead drift) and some as dead-end X-marks
// (clearly wrong). One central path "limps" down to confusion.
type ChaoticNode = {
  id: string;
  x: number;
  y: number;
  // Parent index in the array (-1 for root-attached). Lets us draw a true
  // tree without the wires crossing themselves randomly.
  parent: number;
  // Terminator: 'x' = clearly wrong, 'fade' = drifted off, 'confusion' =
  // central confusion marker. Internal (non-leaf) nodes have terminator=null.
  terminator: 'x' | 'fade' | 'confusion' | null;
};

// Indices reflect order; parent is the index in this array.
// -1 means "child of LEFT_ROOT" (the query box's bottom).
const CHAOTIC_NODES: ChaoticNode[] = [
  // First-level scatter
  { id: 'l-1',  x: 130, y: 260, parent: -1, terminator: null },
  { id: 'l-2',  x: 235, y: 252, parent: -1, terminator: null },
  { id: 'l-3',  x: 360, y: 260, parent: -1, terminator: null },
  { id: 'l-4',  x: 470, y: 260, parent: -1, terminator: null },
  // Second-level chaos
  { id: 'l-5',  x: 75,  y: 420, parent: 0,  terminator: 'fade' },
  { id: 'l-6',  x: 175, y: 445, parent: 0,  terminator: 'x' },
  { id: 'l-7',  x: 215, y: 425, parent: 1,  terminator: null },
  { id: 'l-8',  x: 305, y: 445, parent: 2,  terminator: 'x' },
  { id: 'l-9',  x: 395, y: 420, parent: 2,  terminator: null },
  { id: 'l-10', x: 510, y: 445, parent: 3,  terminator: 'fade' },
  // Third-level deeper sprawl from a couple of the level-2 nodes
  { id: 'l-11', x: 175, y: 595, parent: 6,  terminator: 'x' },
  { id: 'l-12', x: 250, y: 612, parent: 6,  terminator: 'fade' },
  { id: 'l-13', x: 395, y: 595, parent: 8,  terminator: 'x' },
  { id: 'l-14', x: 470, y: 612, parent: 8,  terminator: 'fade' },
  // Central confusion terminus — convergence on "??" (the result of the
  // chaotic walk). Reached via the middle-back node l-3 -> central spine.
  { id: 'l-15', x: 300, y: 580, parent: 2,  terminator: null },
];

// Branch definitions for the FOCUSED RIGHT tree. Few well-placed nodes,
// a clean spine that converges to a single answer. Each branch is solid
// success, no dashed strokes.
type FocusedNode = {
  id: string;
  x: number;
  y: number;
  parent: number; // -1 = child of RIGHT_ROOT
  // Optional small annotation below the node (very terse, single word /
  // 2-word fragment). Helps the right-side tree feel "purposeful" by
  // contrast to the left's noise.
  label?: string;
};

const FOCUSED_NODES: FocusedNode[] = [
  // Three intentional first-level branches — narrow the search.
  // Spread evenly so the right tree fills the vertical band even
  // though it stays intentionally sparse compared to the chaotic side.
  { id: 'r-1', x: 760, y: 290, parent: -1, label: 'right method' },
  { id: 'r-2', x: 900, y: 290, parent: -1, label: 'assumptions' },
  { id: 'r-3', x: 1040, y: 290, parent: -1, label: 'caveats' },
  // Each merges back toward the spine — the convergence is the visual
  // payoff. The three nodes are slightly inboard of their parents.
  { id: 'r-4', x: 820, y: 540, parent: 0 },
  { id: 'r-5', x: 900, y: 540, parent: 1 },
  { id: 'r-6', x: 980, y: 540, parent: 2 },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const GoogleAnalogy: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[94vw] h-full flex flex-col items-center justify-between gap-1 pb-2">
        <SlideTitle subtitle="AI amplifies this gap.">
          The Google Analogy
        </SlideTitle>

        {/* Verbatim / near-verbatim pull-quote.
            Per docs/part3_future.md: this analogy is the most relatable
            framing in the section. Set as a wordmark-ish quote so it lands
            BEFORE the diagram explains it. */}
        <motion.div
          className="w-full max-w-[88vw] -mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="text-center font-light italic leading-snug"
            style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(1rem, 1.85vw, 1.55rem)',
              letterSpacing: '0.01em',
            }}
          >
            <Quote side="open" />
            Some people are extremely good at finding niche answers on Google.
            Some aren&rsquo;t. AI is exactly like this, but{' '}
            <span style={{ color: 'var(--color-text)', fontStyle: 'normal', fontWeight: 600 }}>
              to the Nth degree.
            </span>
            <Quote side="close" />
          </blockquote>
        </motion.div>

        {/* The two-tree diagram. Flex-1 lets the diagram grow to absorb
            whatever vertical room remains between the quote and the
            tagline — prevents leftover empty space at the bottom of the
            1920x1080 canvas. */}
        <motion.div
          className="w-full max-w-[92vw] flex-1 min-h-0 flex items-stretch justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65 }}
        >
          <TwoTreeDiagram />
        </motion.div>

        {/* Tagline anchor — pays off the diagram. Slightly emphatic but
            still secondary to the quote. */}
        <motion.p
          className="text-center font-light tracking-wide"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.85rem, 1.05vw, 1.1rem)',
            letterSpacing: 1.6,
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
        >
          AI is this&nbsp;
          <span style={{ color: 'var(--color-text)', opacity: 0.95 }}>
            — to the Nth degree.
          </span>
        </motion.p>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Quote — soft serif open/close marks (matches slide 19's treatment)
// ---------------------------------------------------------------------------
const Quote: React.FC<{ side: 'open' | 'close' }> = ({ side }) => (
  <span
    aria-hidden="true"
    style={{
      color: 'var(--color-text-muted)',
      opacity: 0.45,
      fontFamily: 'Georgia, serif',
      fontSize: '1.1em',
      verticalAlign: '-0.15em',
      marginRight: side === 'open' ? '0.25em' : 0,
      marginLeft: side === 'close' ? '0.2em' : 0,
    }}
  >
    {side === 'open' ? '“' : '”'}
  </span>
);

// ---------------------------------------------------------------------------
// TwoTreeDiagram — left chaotic / right focused
// ---------------------------------------------------------------------------

const TwoTreeDiagram: React.FC = () => {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full h-full"
      aria-label="Two parallel query trajectories. Left: a vague query 'how to do statistics' branching into a chaotic sprawl of dashed, danger-colored dead ends and fade-outs ending in confusion. Right: a precise, well-framed query branching into a focused tree of solid, success-colored nodes that converge on a single useful answer."
    >
      <defs>
        {/* Glow filter for the focused tree — the success path should feel
            slightly luminous to mark it as "the good outcome." */}
        <filter id="ga-success-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle danger glow for the confusion terminus. */}
        <filter id="ga-danger-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Per-branch fade gradients on the chaotic side: danger fading to
            text-muted as branches sprawl outward. Matches the dead-ends
            motif from slide 19 / slide 05. We share one gradient for all
            chaotic branches since the directions are varied — keeps DOM
            light. The fade is subtle. */}
        <linearGradient
          id="ga-chaotic-fade"
          gradientUnits="userSpaceOnUse"
          x1={LEFT_ROOT.x}
          y1={LEFT_ROOT.y}
          x2={LEFT_ROOT.x}
          y2={LEFT_TERMINUS.y}
        >
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.6" />
          <stop offset="55%" stopColor="var(--color-danger)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      {/* ============================================================ */}
      {/* SOFT VERTICAL SEAM — separates the two halves visually.       */}
      {/* Held at very low opacity so the audience perceives "two       */}
      {/* paired worlds" without a hard divider.                        */}
      {/* ============================================================ */}
      <line
        x1={VB_W / 2}
        y1={20}
        x2={VB_W / 2}
        y2={VB_H - 20}
        stroke="var(--color-text-muted)"
        strokeOpacity={0.1}
        strokeWidth={1}
        strokeDasharray="2 6"
      />

      {/* ============================================================ */}
      {/* LEFT  — VAGUE query, chaotic tree                             */}
      {/* ============================================================ */}
      <QueryBox
        side="left"
        x={LEFT_QUERY.x}
        y={LEFT_QUERY.y}
        w={LEFT_QUERY.w}
        h={LEFT_QUERY.h}
        text='how to do statistics'
        accent="var(--color-danger)"
        delay={0.4}
      />

      {/* Chaotic branches: each node has a parent (root or another node).
          Strokes are dashed, colored via the danger fade gradient.
          Drawn first so the nodes/terminators sit on top. */}
      {CHAOTIC_NODES.map((n, i) => {
        const parent =
          n.parent === -1 ? LEFT_ROOT : { x: CHAOTIC_NODES[n.parent].x, y: CHAOTIC_NODES[n.parent].y };
        const branchDelay = 0.55 + i * 0.05;
        // Curve: a gentle S-curve cubic so the chaotic side has visible
        // "wandering" rather than straight pipes. Control points pull
        // sideways relative to the segment.
        const mx = (parent.x + n.x) / 2;
        const c1 = { x: parent.x, y: mx - parent.x > 0 ? parent.y + 45 : parent.y + 35 };
        const c2 = { x: n.x, y: n.y - 42 };
        return (
          <motion.path
            key={`l-edge-${n.id}`}
            d={`M ${parent.x} ${parent.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${n.x} ${n.y}`}
            fill="none"
            stroke="url(#ga-chaotic-fade)"
            strokeWidth={3}
            strokeDasharray="8 7"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: branchDelay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        );
      })}

      {/* Chaotic-side nodes + terminators */}
      {CHAOTIC_NODES.map((n, i) => {
        const nodeDelay = 0.65 + i * 0.05;
        const termDelay = nodeDelay + 0.25;
        return (
          <g key={`l-node-${n.id}`}>
            <ChaoticNodeMark cx={n.x} cy={n.y} delay={nodeDelay} />
            {n.terminator === 'x' && <DeadEndX cx={n.x} cy={n.y + 28} delay={termDelay} />}
            {n.terminator === 'fade' && <FadeOutTip cx={n.x} cy={n.y + 28} delay={termDelay} />}
          </g>
        );
      })}

      {/* Spine into central confusion: faint dashed lane from the bottom
          of the inner level-3 node into the confusion terminus. */}
      <motion.path
        d={`M ${CHAOTIC_NODES[14].x} ${CHAOTIC_NODES[14].y} C ${CHAOTIC_NODES[14].x - 18} ${CHAOTIC_NODES[14].y + 50}, ${LEFT_TERMINUS.x + 18} ${LEFT_TERMINUS.y - 50}, ${LEFT_TERMINUS.x} ${LEFT_TERMINUS.y - 12}`}
        fill="none"
        stroke="url(#ga-chaotic-fade)"
        strokeWidth={3}
        strokeDasharray="6 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ delay: 1.55, duration: 0.55 }}
      />

      {/* Confusion terminus — the resolution of the chaotic walk: ??
          Bumped contrast: solid danger fill behind the glyph and a
          near-white "??" so it reads cleanly against the dark slide bg.
          Outer dashed ring keeps the dead-end grammar from slide 19. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.95, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${LEFT_TERMINUS.x}px ${LEFT_TERMINUS.y}px` }}
      >
        {/* Outer dashed danger ring — preserves dead-end grammar. */}
        <circle
          cx={LEFT_TERMINUS.x}
          cy={LEFT_TERMINUS.y}
          r={42}
          fill="none"
          stroke="var(--color-danger)"
          strokeOpacity={0.85}
          strokeWidth={3.4}
          strokeDasharray="5 5"
          filter="url(#ga-danger-glow)"
        />
        {/* Solid inner danger disk — provides high-contrast backing
            so the "??" glyph is unambiguously legible. */}
        <circle
          cx={LEFT_TERMINUS.x}
          cy={LEFT_TERMINUS.y}
          r={32}
          fill="var(--color-danger)"
          fillOpacity={0.95}
          stroke="var(--color-danger)"
          strokeOpacity={1}
          strokeWidth={1}
        />
        <text
          x={LEFT_TERMINUS.x}
          y={LEFT_TERMINUS.y + 10}
          textAnchor="middle"
          fill="var(--color-text)"
          fillOpacity={1}
          fontSize={30}
          fontWeight={900}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          letterSpacing={1}
        >
          ??
        </text>
      </motion.g>

      {/* Caption beneath the chaotic side — frames the outcome in one word. */}
      <motion.text
        x={LEFT_TERMINUS.x}
        y={LEFT_TERMINUS.y + 72}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={1}
        fontSize={20}
        fontStyle="italic"
        letterSpacing={2}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.25, duration: 0.55 }}
      >
        confusion
      </motion.text>

      {/* ============================================================ */}
      {/* RIGHT — PRECISE query, focused tree                           */}
      {/* ============================================================ */}
      <QueryBox
        side="right"
        x={RIGHT_QUERY.x}
        y={RIGHT_QUERY.y}
        w={RIGHT_QUERY.w}
        h={RIGHT_QUERY.h}
        text='paired t-test vs Wilcoxon, n=12, non-normal'
        accent="var(--color-success)"
        delay={0.4}
      />

      {/* Focused branches — solid success strokes, gentle fan out.
          Drawn before the convergence spine so the spine reads as the
          synthesis of the three tributaries. */}
      {FOCUSED_NODES.map((n, i) => {
        const parent =
          n.parent === -1 ? RIGHT_ROOT : { x: FOCUSED_NODES[n.parent].x, y: FOCUSED_NODES[n.parent].y };
        const branchDelay = 1.2 + i * 0.15;
        return (
          <motion.path
            key={`r-edge-${n.id}`}
            d={`M ${parent.x} ${parent.y} C ${parent.x} ${parent.y + 60}, ${n.x} ${n.y - 60}, ${n.x} ${n.y}`}
            fill="none"
            stroke="var(--color-success)"
            strokeOpacity={0.9}
            strokeWidth={3.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ delay: branchDelay, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            filter="url(#ga-success-glow)"
          />
        );
      })}

      {/* Convergence: each of the three lower nodes feeds into the
          single answer terminus. Solid, glowing — three streams becoming
          one is the visual punchline. Drawn BEFORE the second-level node
          marks so each branch's terminator ring sits cleanly on top of
          the convergence origin (no half-overdrawn ring). */}
      {[3, 4, 5].map((idx, i) => {
        const n = FOCUSED_NODES[idx];
        const delay = 2.05 + i * 0.1;
        return (
          <motion.path
            key={`r-converge-${n.id}`}
            d={`M ${n.x} ${n.y} C ${n.x} ${n.y + 80}, ${RIGHT_ANSWER.x} ${RIGHT_ANSWER.y - 90}, ${RIGHT_ANSWER.x} ${RIGHT_ANSWER.y - 32}`}
            fill="none"
            stroke="var(--color-success)"
            strokeOpacity={0.9}
            strokeWidth={3.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            filter="url(#ga-success-glow)"
          />
        );
      })}

      {/* Focused-side nodes + terse labels. Drawn AFTER convergence so
          each branch terminates at a clean, fully-visible focused node
          (matches the left-tree grammar of having a clear terminal mark
          on every branch — no dangling stubs). */}
      {FOCUSED_NODES.map((n, i) => {
        const nodeDelay = 1.35 + i * 0.15;
        return (
          <g key={`r-node-${n.id}`}>
            <FocusedNodeMark cx={n.x} cy={n.y} delay={nodeDelay} />
            {n.label && (
              <motion.text
                x={n.x}
                y={n.y + 38}
                textAnchor="middle"
                fill="var(--color-text)"
                fillOpacity={1}
                fontSize={18}
                fontWeight={500}
                letterSpacing={0.8}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: nodeDelay + 0.2, duration: 0.45 }}
              >
                {n.label}
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Answer terminus — the focused tree's payoff: a single,
          clearly-glowing success node with a check mark. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${RIGHT_ANSWER.x}px ${RIGHT_ANSWER.y}px` }}
      >
        <circle
          cx={RIGHT_ANSWER.x}
          cy={RIGHT_ANSWER.y}
          r={34}
          fill="var(--color-success)"
          fillOpacity={0.2}
          stroke="var(--color-success)"
          strokeOpacity={1}
          strokeWidth={3.2}
          filter="url(#ga-success-glow)"
        />
        {/* Check mark: two short lines forming a tick. Centered in the
            success node. */}
        <polyline
          points={`${RIGHT_ANSWER.x - 14},${RIGHT_ANSWER.y + 2} ${RIGHT_ANSWER.x - 4},${RIGHT_ANSWER.y + 12} ${RIGHT_ANSWER.x + 16},${RIGHT_ANSWER.y - 9}`}
          fill="none"
          stroke="var(--color-success)"
          strokeOpacity={1}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Caption beneath the focused side. */}
      <motion.text
        x={RIGHT_ANSWER.x}
        y={RIGHT_ANSWER.y + 72}
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fillOpacity={1}
        fontSize={20}
        fontStyle="italic"
        letterSpacing={2}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.75, duration: 0.55 }}
      >
        useful answer
      </motion.text>

      {/* Side annotations above each tree — terse framing labels.
          Positioned in the gap between the query box (bottom y≈94) and the
          first branching (y≈245/270), with a small backing pill so tree
          branches passing nearby don't make the labels illegible. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <rect
          x={LEFT_ROOT.x - 95}
          y={155}
          width={190}
          height={32}
          rx={16}
          fill="var(--color-bg)"
          fillOpacity={0.92}
          stroke="var(--color-danger)"
          strokeOpacity={0.55}
          strokeWidth={1.4}
        />
        <text
          x={LEFT_ROOT.x}
          y={176}
          textAnchor="middle"
          fill="var(--color-danger)"
          fillOpacity={1}
          fontSize={18}
          letterSpacing={3}
          fontWeight={700}
        >
          VAGUE QUERY
        </text>
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <rect
          x={RIGHT_ROOT.x - 105}
          y={155}
          width={210}
          height={32}
          rx={16}
          fill="var(--color-bg)"
          fillOpacity={0.92}
          stroke="var(--color-success)"
          strokeOpacity={0.6}
          strokeWidth={1.4}
        />
        <text
          x={RIGHT_ROOT.x}
          y={176}
          textAnchor="middle"
          fill="var(--color-success)"
          fillOpacity={1}
          fontSize={18}
          letterSpacing={3}
          fontWeight={700}
        >
          PRECISE QUERY
        </text>
      </motion.g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// QueryBox — a stylized search-bar / query container at the top of each tree
// ---------------------------------------------------------------------------
// Pill-shaped rectangle with the query text in monospace. Accent border in
// danger or success. Subtle inner background.

const QueryBox: React.FC<{
  side: 'left' | 'right';
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  accent: string;
  delay: number;
}> = ({ x, y, w, h, text, accent, delay }) => {
  return (
    <motion.g
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill="var(--color-bg-card)"
        stroke={accent}
        strokeOpacity={0.7}
        strokeWidth={2.2}
      />
      {/* Tiny "search" indicator on the leading edge — a small open ring,
          evocative of a magnifying glass without taking the lens motif from
          slide 19. */}
      <circle
        cx={x + 26}
        cy={y + h / 2}
        r={7}
        fill="none"
        stroke={accent}
        strokeOpacity={0.85}
        strokeWidth={2}
      />
      <line
        x1={x + 31}
        y1={y + h / 2 + 5}
        x2={x + 37}
        y2={y + h / 2 + 11}
        stroke={accent}
        strokeOpacity={0.85}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <text
        x={x + 50}
        y={y + h / 2 + 6}
        fill="var(--color-text)"
        fillOpacity={1}
        fontSize={19}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing={0.3}
      >
        {text}
      </text>
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// ChaoticNodeMark — small inert ring on the chaotic side
// ---------------------------------------------------------------------------
// Dashed danger ring, bg-card fill, muted inner dot. Same grammar as the
// DeadEndNode in slide 19 — kept consistent so the audience reads "this is
// a dead-end-flavored node." Smaller (r=7) since there are many of them.
const ChaoticNodeMark: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <circle
      cx={cx}
      cy={cy}
      r={10}
      fill="var(--color-bg-card)"
      stroke="var(--color-danger)"
      strokeOpacity={0.75}
      strokeWidth={2.2}
      strokeDasharray="4 3"
    />
    <circle
      cx={cx}
      cy={cy}
      r={2.6}
      fill="var(--color-text-muted)"
      fillOpacity={0.75}
    />
  </motion.g>
);

// ---------------------------------------------------------------------------
// FocusedNodeMark — solid success node on the right side
// ---------------------------------------------------------------------------
// Larger filled-glow ring + solid center. The audience should feel "these
// are deliberate, well-placed steps" by contrast with the chaotic dotted
// rings on the left.
const FocusedNodeMark: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <circle
      cx={cx}
      cy={cy}
      r={15}
      fill="var(--color-success)"
      fillOpacity={0.2}
      stroke="var(--color-success)"
      strokeOpacity={1}
      strokeWidth={3}
      filter="url(#ga-success-glow)"
    />
    <circle
      cx={cx}
      cy={cy}
      r={4.2}
      fill="var(--color-success)"
      fillOpacity={1}
    />
  </motion.g>
);

// ---------------------------------------------------------------------------
// DeadEndX — X-mark terminator (matches slide 19 grammar)
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
      transition={{ delay, duration: 0.35 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <line
        x1={cx - r}
        y1={cy - r}
        x2={cx + r}
        y2={cy + r}
        stroke="var(--color-danger)"
        strokeOpacity={0.85}
        strokeWidth={2.8}
        strokeLinecap="round"
      />
      <line
        x1={cx - r}
        y1={cy + r}
        x2={cx + r}
        y2={cy - r}
        stroke="var(--color-danger)"
        strokeOpacity={0.85}
        strokeWidth={2.8}
        strokeLinecap="round"
      />
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// FadeOutTip — soft fade-out terminator (matches slide 19 grammar)
// ---------------------------------------------------------------------------
const FadeOutTip: React.FC<{ cx: number; cy: number; delay: number }> = ({
  cx,
  cy,
  delay,
}) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.45 }}
  >
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="none"
      stroke="var(--color-text-muted)"
      strokeOpacity={0.55}
      strokeWidth={1.6}
      strokeDasharray="3 3"
    />
    <circle
      cx={cx}
      cy={cy}
      r={1.8}
      fill="var(--color-text-muted)"
      fillOpacity={0.6}
    />
  </motion.g>
);

export default GoogleAnalogy;
