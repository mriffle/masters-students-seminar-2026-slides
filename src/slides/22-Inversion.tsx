import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 22 — The Inversion: From Syntax to Domain Knowledge
 *
 * Merges old slides 3.4 (what becomes less valuable) + 3.5 (what becomes more
 * valuable). Per SLIDES.md slide 22: the flip IS the slide. Visual gravity
 * inverts on slide entrance — what was big becomes small, what was small
 * becomes big. This is the structural argument of Part 3 expressed
 * structurally rather than enumerated as two separate slides.
 *
 * Source content per docs/part3_future.md "The Headline Argument" + 3.4 + 3.5
 * + "What Counts as a 'Domain'":
 *
 *   FROM (less valuable, commoditized):
 *     - Specific syntax in Python or R
 *     - Memorizing library APIs
 *     - Mechanical execution (writing the code once you know what to write)
 *     - "How do I do X" lookups
 *
 *   TO (more valuable):
 *     - Domain knowledge          (KING — biggest emphasis, --color-secondary)
 *     - Judgment                  (--color-primary)
 *     - Knowing what to ask       (--color-primary)
 *     - Evaluation skills         (knowing if AI's suggestions are good
 *                                  IN THE CONTEXT OF YOUR DATA)
 *
 *   "Domain" is broad: biology, research, FDA rules, CS, web dev, databases,
 *   data viz. Examples surface as small chips beneath the "domain knowledge"
 *   centerpiece.
 *
 * ---------------------------------------------------------------------------
 * The flip animation (load-bearing — listed in SLIDES.md "Animation budget"):
 *
 * On slide entrance the FROM and TO panels swap visual weight in a single
 * coordinated animation. Implementation:
 *
 *   1. Both panels mount in their PRE-FLIP state:
 *        - FROM panel large, bright, items prominent
 *        - TO panel small, muted, "domain knowledge" not yet glowing
 *   2. ~0.9s in, the central pivot ring rotates 180° and FROM/TO crossfade
 *      into their POST-FLIP state:
 *        - FROM shrinks, items fade to text-muted, opacity drops, type
 *          shrinks (commodity chips)
 *        - TO expands, "domain knowledge" balloons in --color-secondary,
 *          judgment / knowing-what-to-ask / evaluation grow into --color-primary
 *          chips, domain examples fan in beneath
 *   3. Final state holds — the inversion is the slide's resting form.
 *
 * The audience watches the value flip happen rather than reading two lists.
 * ---------------------------------------------------------------------------
 *
 * Color budget (within the 3-accent rule):
 *   --color-secondary    -> "domain knowledge" (deck-wide domain / TEI-REX
 *                            color — primes the audience for slide 23)
 *   --color-primary      -> other TO items (judgment, ask, evaluation)
 *   --color-text-muted   -> FROM items in their post-flip commodity state
 *   --color-text         -> labels, headings
 */

// ---------------------------------------------------------------------------
// Animation timing
// ---------------------------------------------------------------------------
// All keyframes share a common timeline so FROM-shrink, TO-grow, and pivot
// rotation feel like ONE motion rather than three. Pre-flip values are the
// "hold" state for ~0.9s after entrance, then everything transitions in
// concert across ~1.0s. Resting state holds indefinitely.

// Pre-flip "hold" duration — how long the audience sees the FROM-dominant
// world before it inverts. Long enough to register, short enough to feel
// active.
const HOLD = 0.9;
// Crossfade duration — the actual flip.
const FLIP = 1.05;
// Stagger for the TO chips fanning in after the flip lands.
const POST_FLIP_LEAD = HOLD + FLIP * 0.55; // start TO chips ~midway through flip

// Re-usable cubic for the flip — fast at first, settles slow. Reads as a
// scale tipping past its balance point.
const FLIP_EASE = [0.32, 0.72, 0.24, 1] as const;

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

const FROM_ITEMS = [
  'specific syntax in Python or R',
  'memorizing library APIs',
  'mechanical execution',
  '"how do I do X" lookups',
];

// Other TO items — the supporting cast around "domain knowledge."
// Order matters: "judgment" first (broadest), "knowing what to ask" second
// (the headline-quote callback from slide 20), "evaluation" third (the
// concrete skill — the parenthetical context-of-your-data anchor sits
// beneath it).
const TO_OTHER_ITEMS = [
  { label: 'judgment', sub: null as string | null },
  { label: 'knowing what to ask', sub: null },
  {
    label: 'evaluation',
    // Per docs/part3_future.md "The Headline Argument": the speaker is
    // explicit that evaluation must be "in the context of your data."
    sub: 'in the context of your data',
  },
];

// Domain examples — verbatim from docs/part3_future.md "What Counts as a
// 'Domain'". Surfaced as small chips beneath the centerpiece to make the
// "domain is broad" point visible without taking attention from the magenta
// wordmark.
const DOMAIN_EXAMPLES = [
  'biology',
  'research',
  'FDA rules',
  'CS',
  'web dev',
  'databases',
  'data viz',
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const Inversion: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[94vw] h-full flex flex-col items-center justify-start gap-0">
        <SlideTitle
          subtitle="Syntax was the bulk. Now it's the floor."
          className="!mb-1"
        >
          The Inversion
        </SlideTitle>

        {/* Two-panel inversion stage. Vertical split — FROM on top, TO on
            bottom — so the visual ratio is the lesson: the bottom panel
            ends up taking ~2x the vertical space of the top.

            Layout uses flex with explicit basis ratios that animate through
            framer-motion. We do this with two motion.div panels rather than
            an SVG so the type can be selectable / accessible and so the
            chip layouts can use real text wrapping. The central pivot
            indicator is a load-bearing SVG that rotates 180° during the
            flip. Stage fills the available vertical canvas so FROM/TO and
            the lever each get real space. */}
        <div
          className="relative w-full max-w-[92vw] flex-1 flex flex-col items-stretch"
          style={{ minHeight: 0 }}
        >
          <FromPanel />
          <CentralPivot />
          <ToPanel />
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// FromPanel — top half. Pre-flip: dominant, prominent. Post-flip: shrunken,
// muted, commoditized chips.
// ---------------------------------------------------------------------------

const FromPanel: React.FC = () => {
  return (
    <motion.div
      // The flip: panel shrinks vertically (flex-grow) and fades opacity
      // toward "commodity" state. Initial flexGrow is large; final is small.
      // Using flex-grow ratios (rather than basis) so FROM + pivot + TO
      // together always exactly fill the stage with no leftover band.
      // justify-start so the FROM header sits up against the subtitle —
      // no dead band between them.
      className="relative w-full flex flex-col items-center justify-start px-6 pt-1"
      initial={{ flexGrow: 1.6, opacity: 1 }}
      animate={{
        flexGrow: [1.6, 1.6, 0.85],
        opacity: [1, 1, 0.62],
      }}
      transition={{
        duration: HOLD + FLIP,
        times: [0, HOLD / (HOLD + FLIP), 1],
        ease: FLIP_EASE,
      }}
      style={{ flexBasis: 0, flexShrink: 1, minHeight: 0 }}
    >
      <FromHeader />
      <FromChips />
    </motion.div>
  );
};

const FromHeader: React.FC = () => (
  <motion.div
    className="flex items-center gap-3 mb-2"
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25, duration: 0.5 }}
    style={{ marginTop: 0 }}
  >
    <div
      className="h-[2px] w-8"
      style={{ background: 'var(--color-text-muted)', opacity: 0.5 }}
    />
    <span
      className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase"
      style={{ color: 'var(--color-text-muted)', opacity: 0.85 }}
    >
      From
    </span>
    <span
      className="text-xs md:text-sm font-light tracking-wide italic"
      style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
    >
      less valuable
    </span>
  </motion.div>
);

const FromChips: React.FC = () => (
  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-[78vw]">
    {FROM_ITEMS.map((item, i) => (
      <FromChip key={item} text={item} index={i} />
    ))}
  </div>
);

// FromChip — pre-flip: muted/commodity styling (text-muted border, body text).
// post-flip: further demoted — dashed border, lower opacity, sized down.
// NO cyan at any point: cyan is reserved for the TO panel ("fundamentals").
// The flip narrative is "these were already commodity; now we're literally
// diminishing them," not "these were fundamentals, now they are not."
const FromChip: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  // Each chip individually transitions through the flip. We animate
  // border opacity, text color, and font scaling so the chip becomes
  // visibly "less" without disappearing — the audience must see them
  // shrink, not vanish. Acknowledgment THEN demotion.
  const enterDelay = 0.35 + index * 0.04;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{
        opacity: [0, 1, 1, 1],
        y: [8, 0, 0, 0],
        scale: [0.95, 1.0, 1.0, 0.82],
      }}
      transition={{
        delay: enterDelay,
        duration: HOLD + FLIP - enterDelay,
        times: [
          0,
          0.25,
          (HOLD - enterDelay) / (HOLD + FLIP - enterDelay),
          1,
        ],
        ease: FLIP_EASE,
      }}
      className="px-4 py-2 rounded-full border"
      style={{
        // Pre-flip stroke is muted (not cyan) — these items are commodity
        // from the moment they appear. Post-flip the stroke transitions to
        // a dashed muted border to mark "further demoted." Implemented as
        // two stacked layers animating in opposite directions.
        background: 'var(--color-bg-card)',
        borderColor: 'transparent',
      }}
    >
      <span className="relative inline-flex items-center">
        {/* Pre-flip border layer (muted, solid — commodity from the start,
            not "fundamentals being demoted"). Fades out during the flip so
            the dashed post-flip layer can take over. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'var(--color-text-muted)',
            margin: -8,
            paddingInline: 16,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            delay: enterDelay,
            duration: HOLD + FLIP - enterDelay,
            times: [
              0,
              0.25,
              (HOLD - enterDelay) / (HOLD + FLIP - enterDelay),
              1,
            ],
            ease: FLIP_EASE,
          }}
        />
        {/* Post-flip border layer (muted, dashed — further demoted) */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: 'var(--color-text-muted)',
            margin: -8,
            paddingInline: 16,
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.55] }}
          transition={{
            delay: enterDelay,
            duration: HOLD + FLIP - enterDelay,
            times: [0, (HOLD - enterDelay) / (HOLD + FLIP - enterDelay), 1],
            ease: FLIP_EASE,
          }}
        />
        {/* Text — color animates from body text (already neutral, not cyan)
            to muted gray. The pre-flip color is intentionally NOT primary:
            cyan is reserved for the TO panel. */}
        <motion.span
          className="font-medium tracking-tight"
          style={{
            fontSize: 'clamp(0.95rem, 1.35vw, 1.2rem)',
          }}
          initial={{ color: 'var(--color-text)' }}
          animate={{
            color: [
              'var(--color-text)',
              'var(--color-text)',
              'var(--color-text-muted)',
            ],
          }}
          transition={{
            delay: enterDelay,
            duration: HOLD + FLIP - enterDelay,
            times: [0, (HOLD - enterDelay) / (HOLD + FLIP - enterDelay), 1],
            ease: FLIP_EASE,
          }}
        >
          {text}
        </motion.span>
      </span>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// CentralPivot — the visual hinge. A small horizontal bar with a triangular
// fulcrum below it. On entrance the bar tilts heavily toward the FROM side,
// then during the flip rotates through to tilt heavily toward the TO side.
// This is the literal moment of inversion — the audience sees the scale tip.
// ---------------------------------------------------------------------------

const CentralPivot: React.FC = () => {
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ flex: '0 0 16vh', minHeight: 0 }}
    >
      <motion.svg
        viewBox="0 0 320 80"
        style={{ width: 'min(78vw, 74vh)', height: '16vh' }}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        // The whole pivot rotates 180° during the flip. Combined with the
        // beam's own counter-rotation (handled in the inner group), the
        // visible effect is "scale tips one way, then completely flips."
      >
        <defs>
          <filter id="inv-pivot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The beam group rotates around the fulcrum point (160, 44).
            Pre-flip tilt: -9deg (heavier on the LEFT — i.e., the FROM
            side gets the visual weight). Post-flip tilt: +9deg AFTER a
            full 180° rotation through, ending heavier on the RIGHT (TO
            side). The full sweep is "tilted left → through vertical →
            past horizontal → tilted right" so the audience sees a flip,
            not a wobble. */}
        <motion.g
          style={{ originX: '160px', originY: '44px' }}
          initial={{ rotate: -9 }}
          animate={{ rotate: [-9, -9, 171, 189] }}
          transition={{
            duration: HOLD + FLIP,
            times: [0, HOLD / (HOLD + FLIP), 0.92, 1],
            ease: FLIP_EASE,
          }}
        >
          {/* Beam — thickened and brightened so it reads as load-bearing
              at presentation distance. Uses primary text color rather than
              a muted variant. */}
          <rect
            x={36}
            y={38}
            width={248}
            height={10}
            rx={5}
            fill="var(--color-text)"
            fillOpacity={0.92}
          />
          {/* End caps — the "weights" sitting on each end of the beam.
              Pre-flip the LEFT cap is bright (FROM bears the value);
              post-flip the RIGHT cap is bright (TO bears the value).
              We animate cap colors in concert with the rotation so the
              audience sees the value transfer. */}
          <motion.circle
            cx={44}
            cy={43}
            r={13}
            initial={{
              fill: 'var(--color-primary)',
              fillOpacity: 0.9,
            }}
            animate={{
              fillOpacity: [0.9, 0.9, 0.4, 0.4],
            }}
            transition={{
              duration: HOLD + FLIP,
              times: [0, HOLD / (HOLD + FLIP), 0.92, 1],
              ease: FLIP_EASE,
            }}
            style={{ filter: 'url(#inv-pivot-glow)' }}
          />
          <motion.circle
            cx={276}
            cy={43}
            r={13}
            initial={{
              fill: 'var(--color-secondary)',
              fillOpacity: 0.35,
            }}
            animate={{
              fillOpacity: [0.35, 0.35, 1, 1],
            }}
            transition={{
              duration: HOLD + FLIP,
              times: [0, HOLD / (HOLD + FLIP), 0.92, 1],
              ease: FLIP_EASE,
            }}
            style={{ filter: 'url(#inv-pivot-glow)' }}
          />
        </motion.g>

        {/* Fulcrum — stationary triangle beneath the beam. Stroke
            thickened and brightened so the support reads at distance. */}
        <polygon
          points="160,40 140,76 180,76"
          fill="var(--color-bg-card)"
          stroke="var(--color-text)"
          strokeOpacity={0.85}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Arc indicator suggesting rotation — thickened stroke and
            stronger color so the rotational cue reads at presentation
            distance instead of near-disappearing. */}
        <motion.path
          d="M 126 28 A 38 38 0 0 1 194 28"
          fill="none"
          stroke="var(--color-secondary)"
          strokeOpacity={0}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="5 6"
          initial={{ strokeOpacity: 0 }}
          animate={{ strokeOpacity: [0, 0, 0.95, 0.9] }}
          transition={{
            duration: HOLD + FLIP,
            times: [0, HOLD / (HOLD + FLIP), 0.92, 1],
            ease: FLIP_EASE,
          }}
        />
        {/* Arrowhead at the end of the arc, pointing toward the TO side. */}
        <motion.polygon
          points="188,22 202,30 190,40"
          fill="var(--color-secondary)"
          fillOpacity={0}
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: [0, 0, 1, 0.95] }}
          transition={{
            duration: HOLD + FLIP,
            times: [0, HOLD / (HOLD + FLIP), 0.92, 1],
            ease: FLIP_EASE,
          }}
        />
      </motion.svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ToPanel — bottom half. Pre-flip: small, muted. Post-flip: dominant, with
// "domain knowledge" balooning in magenta as the visual centerpiece.
// ---------------------------------------------------------------------------

const ToPanel: React.FC = () => {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center px-6"
      initial={{ flexGrow: 0.85, opacity: 0.7 }}
      animate={{
        flexGrow: [0.85, 0.85, 1.6],
        opacity: [0.7, 0.7, 1],
      }}
      transition={{
        duration: HOLD + FLIP,
        times: [0, HOLD / (HOLD + FLIP), 1],
        ease: FLIP_EASE,
      }}
      style={{ flexBasis: 0, flexShrink: 1, minHeight: 0 }}
    >
      <ToHeader />
      <DomainKnowledgeWordmark />
      <DomainExamples />
      <ToOtherChips />
    </motion.div>
  );
};

const ToHeader: React.FC = () => (
  <motion.div
    className="flex items-center gap-3 mb-2"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    <div
      className="h-[2px] w-8"
      style={{ background: 'var(--color-secondary)', opacity: 0.75 }}
    />
    <span
      className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase"
      style={{ color: 'var(--color-secondary)', opacity: 0.95 }}
    >
      To
    </span>
    <span
      className="text-xs md:text-sm font-light tracking-wide italic"
      style={{ color: 'var(--color-text-muted)', opacity: 0.75 }}
    >
      more valuable
    </span>
  </motion.div>
);

// DomainKnowledgeWordmark — the king. Sized largest on the slide, magenta,
// glowing post-flip. Crown-style annotation underneath signals primacy
// without needing a literal crown icon.
const DomainKnowledgeWordmark: React.FC = () => {
  return (
    <motion.div
      className="text-center"
      // Wordmark scale grows during the flip. Pre-flip we render it at a
      // modest size with reduced opacity so the audience sees something is
      // there but doesn't yet read it as the centerpiece. Post-flip it
      // dominates — "king."
      initial={{ scale: 0.55, opacity: 0.35 }}
      animate={{
        scale: [0.55, 0.55, 1.0],
        opacity: [0.35, 0.35, 1],
      }}
      transition={{
        duration: HOLD + FLIP,
        times: [0, HOLD / (HOLD + FLIP), 1],
        ease: FLIP_EASE,
      }}
      style={{ transformOrigin: 'center top' }}
    >
      <div
        className="font-extrabold tracking-tight leading-none"
        style={{
          color: 'var(--color-secondary)',
          fontSize: 'clamp(2.5rem, 6.4vw, 5.4rem)',
          textShadow: '0 0 24px color-mix(in srgb, var(--color-secondary) 45%, transparent)',
        }}
      >
        domain knowledge
      </div>
      {/* Primacy annotation — small uppercase tracked label paired with
          horizontal rules on either side. Reads "king" without the cliché. */}
      <motion.div
        className="mt-1 flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{
          duration: HOLD + FLIP,
          times: [0, HOLD / (HOLD + FLIP), 1],
          ease: FLIP_EASE,
        }}
      >
        <div
          className="h-[1.5px] w-10"
          style={{ background: 'var(--color-secondary)', opacity: 0.6 }}
        />
        <span
          className="text-[0.7rem] md:text-xs font-semibold tracking-[0.45em] uppercase"
          style={{ color: 'var(--color-secondary)', opacity: 0.85 }}
        >
          king
        </span>
        <div
          className="h-[1.5px] w-10"
          style={{ background: 'var(--color-secondary)', opacity: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

// DomainExamples — small chips listing what counts as a "domain." Surface
// these so the audience doesn't read "domain knowledge" as "biology only."
// Animated to fan in once the wordmark has settled, in mono so they feel
// like a list of fields rather than a sentence.
const DomainExamples: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3 max-w-[78vw]">
      <motion.span
        className="font-mono text-[0.7rem] md:text-xs uppercase tracking-[0.25em]"
        style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.7] }}
        transition={{
          duration: HOLD + FLIP,
          times: [0, POST_FLIP_LEAD / (HOLD + FLIP), 1],
          ease: 'linear',
        }}
      >
        e.g.
      </motion.span>
      {DOMAIN_EXAMPLES.map((d, i) => (
        <motion.span
          key={d}
          className="font-mono text-[0.78rem] md:text-sm"
          style={{ color: 'var(--color-text)', opacity: 0.85 }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 0, 0.88], y: [4, 4, 0] }}
          transition={{
            delay: 0,
            duration: HOLD + FLIP + i * 0.04,
            times: [
              0,
              (POST_FLIP_LEAD + i * 0.04) / (HOLD + FLIP + i * 0.04),
              1,
            ],
            ease: 'linear',
          }}
        >
          {d}
          {i < DOMAIN_EXAMPLES.length - 1 && (
            <span style={{ color: 'var(--color-text-muted)', opacity: 0.45 }}>
              {' ·'}
            </span>
          )}
        </motion.span>
      ))}
    </div>
  );
};

// ToOtherChips — judgment / knowing what to ask / evaluation. Smaller than
// the wordmark by design — they ARE valuable but domain knowledge is king.
// Cyan to mark "fundamentals / supporting more-valuable items" and to
// reserve magenta exclusively for the king.
const ToOtherChips: React.FC = () => {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4 md:gap-7 mt-6 md:mt-8 max-w-[82vw]">
      {TO_OTHER_ITEMS.map((item, i) => (
        <ToOtherChip key={item.label} item={item} index={i} />
      ))}
    </div>
  );
};

const ToOtherChip: React.FC<{
  item: { label: string; sub: string | null };
  index: number;
}> = ({ item, index }) => {
  // Chips fan in after the wordmark lands. Each gets a small per-index
  // stagger so the trio reads left-to-right. Use plain delay + duration
  // so EVERY chip resolves to opacity:1 in its final state — no times-
  // array gymnastics that could leave a chip stranded mid-curve.
  const chipStart = POST_FLIP_LEAD + 0.15 + index * 0.12;
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: chipStart,
        duration: 0.5,
        ease: FLIP_EASE,
      }}
    >
      <div
        className="px-5 py-2.5 rounded-full"
        style={{
          background: 'var(--color-bg-card)',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 0 18px color-mix(in srgb, var(--color-primary) 32%, transparent)',
        }}
      >
        <span
          className="font-semibold tracking-tight"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
            opacity: 1,
          }}
        >
          {item.label}
        </span>
      </div>
      {item.sub && (
        <span
          className="mt-2 text-center font-normal italic"
          style={{
            color: 'var(--color-secondary)',
            opacity: 1,
            fontSize: 'clamp(1.0rem, 1.35vw, 1.25rem)',
            maxWidth: 320,
          }}
        >
          {item.sub}
        </span>
      )}
    </motion.div>
  );
};

export default Inversion;
