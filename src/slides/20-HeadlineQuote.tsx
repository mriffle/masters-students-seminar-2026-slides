import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 20 — Headline Quote (OPENING slide of Part 3)
 *
 * Merges old slides 3.1 (title/thesis) and 3.2 (headline quote). The headline
 * quote IS the thesis — Part 3 opens directly with the most quotable line in
 * the talk at wordmark scale, so it has the maximum amount of time to echo
 * across the section.
 *
 * Verbatim quote (load-bearing — must appear word-for-word):
 *   "Those who know what to ask for win now, not those who know how to do it."
 *
 * Per-segment coloring carries the value flip typographically:
 *   - "ask for" → --color-primary (cyan)        — what's becoming valuable
 *   - "do it"   → --color-text-muted             — what's commoditizing
 *   - everything else → --color-text             — restrained, lets the flip read
 *
 * Section opener pattern matches slide 09 (Part 2 frame):
 *   - No <SlideTitle>; the quote is the slide.
 *   - Top-left "Part 3" marker — short primary rule + tracked uppercase text.
 *   - Subtle supporting visual element (here: a thin scale/lever motif that
 *     foreshadows the literal lever metaphor in slide 27).
 *
 * The lever foreshadow:
 *   A horizontal beam balanced on a small triangular fulcrum, sitting beneath
 *   the quote. The beam tilts gently toward the "ask for" side (visually left
 *   of the fulcrum) — a very subtle weighting toward what's becoming valuable.
 *   Held at low opacity so it reads as atmosphere; slide 27 will pay it off
 *   as the centerpiece visual. Resist over-committing here.
 */

const VB = { w: 1000, h: 240 };

const HeadlineQuote: React.FC<SlideProps> = () => {
  // Lever geometry. The beam is tilted slightly counter-clockwise so the
  // left side ("ask for") sits lower / heavier — the value is flowing that way.
  // Fulcrum sits at the visual center; tilt ~ -3 degrees keeps the foreshadow
  // subtle rather than diagrammatic.
  const FULCRUM_X = VB.w / 2;
  const FULCRUM_Y = 150;
  const BEAM_LEN = 360; // half-length on each side
  const TILT_DEG = -2.5;
  const tiltRad = (TILT_DEG * Math.PI) / 180;
  const dx = BEAM_LEN * Math.cos(tiltRad);
  const dy = BEAM_LEN * Math.sin(tiltRad);
  // Left end (lower — "ask for" side): note tiltRad < 0, so dy < 0; left end
  // = fulcrum - (dx, dy) which means + |dy| in screen coords (lower).
  const leftX = FULCRUM_X - dx;
  const leftY = FULCRUM_Y - dy;
  const rightX = FULCRUM_X + dx;
  const rightY = FULCRUM_Y + dy;

  return (
    <SlideContainer>
      <div className="relative w-full max-w-[92vw] h-[78vh] flex items-center justify-center">
        {/* --- "Part 3" section marker (top-left, primary) --- */}
        <motion.div
          className="absolute top-0 left-0 flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="h-[2px] w-8"
            style={{ background: 'var(--color-primary)', opacity: 0.7 }}
          />
          <span
            className="text-sm md:text-base font-semibold tracking-[0.35em] uppercase"
            style={{ color: 'var(--color-primary)', opacity: 0.85 }}
          >
            Part 3
          </span>
        </motion.div>

        {/* --- Headline: the verbatim quote, wordmark-scale --- */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-[88vw]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="font-bold leading-[1.08] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: 'var(--color-text)' }}
          >
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &ldquo;
            </span>
            Those who know what to{' '}
            <span style={{ color: 'var(--color-primary)' }}>ask for</span> win now,
            <br />
            not those who know how to{' '}
            <span style={{ color: 'var(--color-text-muted)' }}>do it</span>.
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>

          {/* --- Lever foreshadow (subtle; pays off on slide 27) --- */}
          <motion.div
            className="mt-12 w-full max-w-[40vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
          >
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Faint horizontal ground line — sets the lever in space without
                  drawing attention. */}
              <line
                x1={120}
                y1={FULCRUM_Y + 56}
                x2={VB.w - 120}
                y2={FULCRUM_Y + 56}
                stroke="var(--color-text-muted)"
                strokeWidth={1}
                strokeOpacity={0.12}
              />

              {/* Beam — tilted toward the "ask for" side (left, lower).
                  Drawn in primary at low opacity so the weighting is felt
                  rather than declared. */}
              <motion.line
                x1={leftX}
                y1={leftY}
                x2={rightX}
                y2={rightY}
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.55}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.15, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* "ask for" side — small weighted node, primary, with a faint
                  glow halo. Sits at the lower (left) end of the tilted beam. */}
              <circle
                cx={leftX}
                cy={leftY}
                r={18}
                fill="var(--color-primary)"
                fillOpacity={0.10}
                stroke="var(--color-primary)"
                strokeWidth={1.25}
                strokeOpacity={0.45}
              />
              <circle
                cx={leftX}
                cy={leftY}
                r={4.5}
                fill="var(--color-primary)"
                fillOpacity={0.85}
              />

              {/* "do it" side — muted node at the higher (right) end. The
                  asymmetry between the two ends is the foreshadow: weight is
                  moving toward asking, away from doing. */}
              <circle
                cx={rightX}
                cy={rightY}
                r={11}
                fill="var(--color-text-muted)"
                fillOpacity={0.08}
                stroke="var(--color-text-muted)"
                strokeWidth={1}
                strokeOpacity={0.32}
              />
              <circle
                cx={rightX}
                cy={rightY}
                r={2.5}
                fill="var(--color-text-muted)"
                fillOpacity={0.55}
              />

              {/* Fulcrum — small triangle beneath the beam pivot. Muted so
                  it doesn't compete; slide 27 will give the fulcrum its full
                  meaning (the action items as the foundation of the lever). */}
              <polygon
                points={`${FULCRUM_X - 14},${FULCRUM_Y + 56} ${FULCRUM_X + 14},${FULCRUM_Y + 56} ${FULCRUM_X},${FULCRUM_Y + 8}`}
                fill="var(--color-text-muted)"
                fillOpacity={0.10}
                stroke="var(--color-text-muted)"
                strokeWidth={1}
                strokeOpacity={0.32}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default HeadlineQuote;
