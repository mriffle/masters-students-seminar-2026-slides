import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 06 - Back to Science (and an Unexpected Interview)
 *
 * Headline anecdote #2 of Part 1. Pairs explicitly with slide 04 (the
 * MUDs/Spinner story) as bookends of the SAME lesson:
 *   "unplanned intersection of interests + right place at right time =
 *    doors open you didn't know existed."
 *
 * The story:
 *   - Speaker applied to UW for a RESEARCH TECH role (not bioinformatics).
 *   - The group was part of a large research consortium that included
 *     David Baker. Baker personally interviewed him.
 *   - Baker's group had JUST been told by their advisory board to hire a
 *     bioinformatics specialist.
 *   - On the spot, they redirected the application. He took the role.
 *   - Career in academic science research started there.
 *
 * Visual concept -- the intersection slide of Part 1 (per SLIDES.md):
 *
 *   Three lines converge on a single glowing "the role" node, where a small
 *   door opens labeled "bioinformatics".
 *
 *     [Biology]  --primary line ----\
 *                                    >--- ( the role ) === [door: bioinformatics]
 *     [DB / Web Consulting] --primary line --/
 *                                            ^
 *                                            |  (amber: external -- the
 *     [Advisory-board directive: ----amber-->|   moment's contribution)
 *      "hire a bioinformatics specialist"]
 *
 *   The two LEFT lines (biology, db/web consulting) are the SPEAKER'S OWN
 *   threads, both in --color-primary -- rhymes with slides 03-05's pursued-
 *   path grammar.
 *   The THIRD line is external: it comes from the consortium's just-issued
 *   advisory-board directive, in --color-amber. Its origin sits to the RIGHT
 *   of the role node so the audience reads "the speaker's two threads from
 *   the past + an external moment-shaped contribution = convergence."
 *
 *   Beneath the diagram, a single monospace credibility line:
 *      60+ publications · CS Masters in DS (earned while working) · no PhD
 *
 * David Baker treatment:
 *   The name appears EXACTLY ONCE on the slide -- in the subtitle ("Met
 *   David Baker. Pivoted on the spot."). It is NOT repeated as a diagram
 *   annotation. Per the brief: "audience does the math. One mention, no
 *   milking. The Nobel detail is *not* on the slide."
 *
 * Color budget (3 accent max -- precisely):
 *   - --color-primary    -> the speaker's two own threads (biology, db/web
 *                            consulting), the convergence "the role" node,
 *                            the door.
 *   - --color-amber      -> the consortium's advisory-board directive line.
 *                            FIRST APPEARANCE OF AMBER IN THE DECK. The
 *                            register established here -- moderate-to-low
 *                            opacity, dashed-with-rhythm strokes, italic
 *                            label -- is what slide 18 (TEI-REX outcome
 *                            friction strip) should rhyme back to as
 *                            "intermediate / contextual / honest".
 *   - --color-text-muted -> annotations, secondary labels, faint axis text.
 *   The credibility close uses --color-text (primary text -- not counted).
 *
 * Why amber, not tertiary, for the consortium line:
 *   The brief calls amber out by name as the lean-toward choice and the
 *   semantic fit is correct: amber's deck-wide meaning is "cautionary,
 *   intermediate, contextual" -- precisely what the consortium's just-
 *   issued directive is (a contextual moment, not an AI tool, not the
 *   speaker's pursued path). --color-tertiary is reserved for AI tooling /
 *   supporting visuals deck-wide; using it here would foul that meaning.
 *
 * Motif continuity (slides 03 -> 04 -> 05 -> 06):
 *   - Same node grammar: filled circle with higher-opacity stroked ring,
 *     inner accent dot, italic muted annotation underneath.
 *   - Same defs/glow filter pattern (Gaussian blur + feMerge) for the
 *     pursued-path / convergence node.
 *   - Same italic muted text style for trajectory annotations.
 *   - The convergence node IS the apex of the path/node grammar -- larger
 *     than slides 03-05's nodes, brighter glow, marked as "the role" with
 *     a door opening to the right (the door is the visual lesson).
 *   - Slide 05's foreshadowing forward "?" path lands HERE -- this is what
 *     the "?" was pointing toward.
 */

const BackToScience: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-2">
        <SlideTitle subtitle="Applied for research tech. Met David Baker. Pivoted on the spot.">
          An Unexpected Interview
        </SlideTitle>

        {/* The intersection diagram: three lines converging on a single
            glowing "the role" node, where a door opens labeled
            "bioinformatics". */}
        <motion.div
          className="w-full max-w-[88vw] h-[58vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.65 }}
        >
          <IntersectionDiagram />
        </motion.div>

        {/* Credibility close -- single monospace line. Calm, factual,
            anchored. Verbatim per SLIDES.md. */}
        <motion.p
          className="text-center font-mono leading-snug tracking-wide"
          style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
            letterSpacing: '0.04em',
            opacity: 0.92,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.92, y: 0 }}
          transition={{ delay: 2.55, duration: 0.6 }}
        >
          60+ publications &middot; CS Masters in DS (earned while working) &middot; no PhD
        </motion.p>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// IntersectionDiagram -- the apex of the path/node motif in Part 1
// ---------------------------------------------------------------------------
//
// viewBox: 1000 x 460. The convergence node sits left-of-center so the door
// to the right has room to read as a clear opening.
//
//   Layout:
//     - BIO     (top-left)         [biology]
//     - DBWEB   (bottom-left)      [database / web consulting]
//     - DIRECT  (top-right)        [advisory-board directive (amber)]
//     - ROLE    (center)           [the role -- glowing convergence]
//     - DOOR    (right of ROLE)    [door opening, labeled "bioinformatics"]
//
//   The two speaker-thread origins fan in from the LEFT, the directive fans
//   in from the upper RIGHT. All three terminate at ROLE. To ROLE's right,
//   the door swings open and emits a soft glow toward the right edge of the
//   frame -- the visual lesson: the door opened.
const IntersectionDiagram: React.FC = () => {
  // Geometry -----------------------------------------------------------------
  const BIO = { x: 110, y: 110 };       // top-left: biology
  const DBWEB = { x: 110, y: 360 };     // bottom-left: db/web consulting
  const DIRECT = { x: 880, y: 90 };     // top-right: advisory-board directive
  const ROLE = { x: 540, y: 235 };      // center: convergence node

  // Door geometry -- swung open to the right of ROLE
  const DOOR_HINGE_X = ROLE.x + 32;     // hinge at the right side of ROLE
  const DOOR_HINGE_Y_TOP = ROLE.y - 36;
  const DOOR_HINGE_Y_BOT = ROLE.y + 36;
  const DOOR_W = 64;                     // visual swing width
  // The door's free edge swings outward (rightward + slightly up to suggest
  // an open posture). We render two trapezoidal "halves" -- the open jamb
  // and the door leaf -- with the door leaf rotated outward.

  return (
    <svg
      viewBox="0 0 1000 460"
      className="w-full h-full"
      aria-label="Intersection diagram: biology, database/web consulting, and the consortium's advisory-board directive converge on a single role; a door opens labeled bioinformatics."
    >
      <defs>
        <filter id="back-to-science-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="back-to-science-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Radial gradient for the door's "light spilling out" -- primary,
            fading outward. */}
        <radialGradient id="back-to-science-door-spill" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
          <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
        {/* Linear gradient for the consortium directive line -- amber that
            stays amber along its run (no muted fade-out -- this thread
            actively contributes to the convergence; it isn't a dead end). */}
        <linearGradient
          id="back-to-science-directive"
          gradientUnits="userSpaceOnUse"
          x1={DIRECT.x}
          y1={DIRECT.y}
          x2={ROLE.x}
          y2={ROLE.y}
        >
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* ---------- Door spill (drawn beneath everything else so it doesn't
                     overpower the lines) ---------- */}
      <motion.rect
        x={DOOR_HINGE_X + DOOR_W - 8}
        y={ROLE.y - 90}
        width={460}
        height={180}
        fill="url(#back-to-science-door-spill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
      />

      {/* ---------- Speaker's two threads (left -> ROLE), --color-primary ---------- */}
      {/* Biology -> ROLE */}
      <motion.path
        d={`M ${BIO.x} ${BIO.y} C ${BIO.x + 220} ${BIO.y}, ${ROLE.x - 220} ${ROLE.y}, ${ROLE.x} ${ROLE.y}`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2.2}
        strokeOpacity={0.7}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 0.5, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* DB / Web Consulting -> ROLE */}
      <motion.path
        d={`M ${DBWEB.x} ${DBWEB.y} C ${DBWEB.x + 220} ${DBWEB.y}, ${ROLE.x - 220} ${ROLE.y}, ${ROLE.x} ${ROLE.y}`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2.2}
        strokeOpacity={0.7}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 0.7, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ---------- Consortium directive thread (right -> ROLE), --color-amber ---------- */}
      <motion.path
        d={`M ${DIRECT.x} ${DIRECT.y} C ${DIRECT.x - 200} ${DIRECT.y}, ${ROLE.x + 220} ${ROLE.y - 60}, ${ROLE.x} ${ROLE.y}`}
        fill="none"
        stroke="url(#back-to-science-directive)"
        strokeWidth={2.2}
        strokeOpacity={0.85}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ delay: 0.95, duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* "from the consortium" italic muted annotation along the directive
          line, just below where it enters the right side of the frame. */}
      <motion.text
        x={DIRECT.x - 6}
        y={DIRECT.y + 56}
        textAnchor="end"
        fill="var(--color-text-muted)"
        fontSize={11}
        fontStyle="italic"
        letterSpacing={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.55, duration: 0.5 }}
      >
        from the consortium
      </motion.text>
      {/* ---------- Origin nodes (Biology, DB/Web, Directive) ---------- */}
      <SpeakerOriginNode
        cx={BIO.x}
        cy={BIO.y}
        label="Biology"
        sublabel="BS degree, interest"
        delay={0.35}
      />
      <SpeakerOriginNode
        cx={DBWEB.x}
        cy={DBWEB.y}
        label="Database / Web Consulting"
        sublabel="hands on expertise"
        delay={0.55}
      />
      <DirectiveOriginNode
        cx={DIRECT.x}
        cy={DIRECT.y}
        delay={0.8}
      />

      {/* ---------- Door opening (right of ROLE), --color-primary ---------- */}
      {/* Door jamb: a thin rectangle representing the open frame. */}
      <motion.rect
        x={DOOR_HINGE_X}
        y={DOOR_HINGE_Y_TOP}
        width={4}
        height={DOOR_HINGE_Y_BOT - DOOR_HINGE_Y_TOP}
        rx={1}
        fill="var(--color-primary)"
        fillOpacity={0.7}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.95, duration: 0.45 }}
      />
      {/* Door leaf: a trapezoidal polygon swung outward to the right.
          Hinged at (DOOR_HINGE_X, DOOR_HINGE_Y_TOP/BOT). The free edge sits
          further right and slightly inward from horizontal -- reads as a
          door swung open ~60 degrees toward the audience. */}
      <motion.polygon
        points={[
          `${DOOR_HINGE_X + 4},${DOOR_HINGE_Y_TOP}`,
          `${DOOR_HINGE_X + DOOR_W},${DOOR_HINGE_Y_TOP - 18}`,
          `${DOOR_HINGE_X + DOOR_W},${DOOR_HINGE_Y_BOT + 18}`,
          `${DOOR_HINGE_X + 4},${DOOR_HINGE_Y_BOT}`,
        ].join(' ')}
        fill="var(--color-primary)"
        fillOpacity={0.14}
        stroke="var(--color-primary)"
        strokeWidth={1.8}
        strokeOpacity={0.85}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.05, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${DOOR_HINGE_X}px ${ROLE.y}px` }}
      />
      {/* Tiny door-handle dot on the leaf -- a small touch that makes the
          shape unmistakably read as a door. */}
      <motion.circle
        cx={DOOR_HINGE_X + DOOR_W - 10}
        cy={ROLE.y}
        r={2}
        fill="var(--color-primary)"
        fillOpacity={0.95}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ delay: 2.35, duration: 0.4 }}
      />
      {/* "bioinformatics" label, set just past the door leaf, in mono so it
          reads as a labeled threshold, not an annotation. */}
      <motion.text
        x={DOOR_HINGE_X + DOOR_W + 22}
        y={ROLE.y + 5}
        textAnchor="start"
        fill="var(--color-primary)"
        fontSize={16}
        fontWeight={700}
        fontFamily="JetBrains Mono, Fira Code, monospace"
        letterSpacing={1.6}
        filter="url(#back-to-science-glow-soft)"
        initial={{ opacity: 0, x: DOOR_HINGE_X + DOOR_W + 12 }}
        animate={{ opacity: 1, x: DOOR_HINGE_X + DOOR_W + 22 }}
        transition={{ delay: 2.45, duration: 0.5 }}
      >
        bioinformatics
      </motion.text>

      {/* ---------- Convergence "the role" node (drawn LAST so it sits on
                     top of the converging lines and the door jamb) ---------- */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.85, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${ROLE.x}px ${ROLE.y}px` }}
      >
        {/* Outer glow ring -- the apex node is visibly larger than slides
            03-05's nodes. */}
        <circle
          cx={ROLE.x}
          cy={ROLE.y}
          r={32}
          fill="var(--color-primary)"
          fillOpacity={0.16}
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          strokeOpacity={0.9}
          filter="url(#back-to-science-glow)"
        />
        {/* Inner accent dot */}
        <circle
          cx={ROLE.x}
          cy={ROLE.y}
          r={9}
          fill="var(--color-primary)"
          fillOpacity={0.95}
        />
        {/* "the role" label above the node */}
        <text
          x={ROLE.x}
          y={ROLE.y - 50}
          textAnchor="middle"
          fill="var(--color-primary)"
          fontSize={15}
          fontWeight={700}
          letterSpacing={2}
          filter="url(#back-to-science-glow-soft)"
        >
          the role
        </text>
      </motion.g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// SpeakerOriginNode -- one of the speaker's own two threads (biology, db/web)
// ---------------------------------------------------------------------------
//
// Filled circle with higher-opacity stroked ring, inner dot, label to the
// right of the node, sublabel underneath. Matches the node grammar from
// slides 03-05 (same circle size class, same italic muted sublabel).
const SpeakerOriginNode: React.FC<{
  cx: number;
  cy: number;
  label: string;
  sublabel: string;
  delay: number;
}> = ({ cx, cy, label, sublabel, delay }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={13}
        fill="var(--color-primary)"
        fillOpacity={0.22}
        stroke="var(--color-primary)"
        strokeWidth={2.2}
        strokeOpacity={0.9}
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="var(--color-primary)"
        fillOpacity={0.95}
      />
      {/* Label sits to the RIGHT of the node so it never collides with the
          left edge of the viewBox. */}
      <text
        x={cx + 22}
        y={cy - 4}
        textAnchor="start"
        fill="var(--color-text)"
        fontSize={15}
        fontWeight={600}
        letterSpacing={1.1}
      >
        {label}
      </text>
      <text
        x={cx + 22}
        y={cy + 14}
        textAnchor="start"
        fill="var(--color-text-muted)"
        fontSize={11}
        fontStyle="italic"
        letterSpacing={1}
      >
        {sublabel}
      </text>
    </motion.g>
  );
};

// ---------------------------------------------------------------------------
// DirectiveOriginNode -- the consortium's just-issued advisory-board directive
// ---------------------------------------------------------------------------
//
// Rendered in --color-amber to set the deck's first-appearance register for
// "intermediate / contextual / external moment" (slide 18 will rhyme back).
// The directive is shown as a small node with a two-line label to its left
// so it doesn't crowd the right edge.
const DirectiveOriginNode: React.FC<{
  cx: number;
  cy: number;
  delay: number;
}> = ({ cx, cy, delay }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={13}
        fill="var(--color-amber)"
        fillOpacity={0.2}
        stroke="var(--color-amber)"
        strokeWidth={2.2}
        strokeOpacity={0.9}
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="var(--color-amber)"
        fillOpacity={0.95}
      />
      {/* Two-line label sits to the LEFT of the node (since the node is on
          the right edge of the diagram). Top line is the directive itself
          (verbatim phrasing), bottom line is the temporal qualifier
          ("just-issued") so the "right place at right time" reading lands. */}
      <text
        x={cx - 22}
        y={cy - 4}
        textAnchor="end"
        fill="var(--color-amber)"
        fontSize={14}
        fontWeight={600}
        letterSpacing={1}
      >
        hire a bioinformatics specialist
      </text>
      <text
        x={cx - 22}
        y={cy + 14}
        textAnchor="end"
        fill="var(--color-text-muted)"
        fontSize={11}
        fontStyle="italic"
        letterSpacing={1}
      >
        advisory-board directive (just issued)
      </text>
    </motion.g>
  );
};

export default BackToScience;
