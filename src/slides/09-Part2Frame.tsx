import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 09 — Part 2 Frame: What I Actually Do
 *
 * OPENING slide of Part 2. Lightweight thesis slide that establishes the frame
 * so the rest of the section reads as evidence.
 *
 * Headline (load-bearing, must appear verbatim):
 *   "Most of this job is translation, judgment, and communication.
 *    The toolkit is smaller than you think."
 *
 * Composition: headline-centric. The verbatim thesis dominates as wordmark-scale
 * typography. Behind it, a *very faint* foreshadow of the upcoming three-way
 * translation diagram (slide 10) — three muted peripheral nodes around a single
 * glowing central node, with thin connecting lines. Atmospheric only; the
 * audience should feel the diagram more than see it. Slide 10 will be the full,
 * legible version.
 *
 * "Part 2" section marker sits in the top-left in --color-primary.
 *
 * Color budget: --color-primary (central node, "Part 2" marker, key emphasized
 * words in the headline) and --color-text-muted (peripheral nodes, faint lines,
 * supporting text). No new accents are introduced here — Part 2 will introduce
 * its own emphasis colors on later slides; slide 09 stays restrained.
 *
 * Approach: authored layout (no SlideTitle). The thesis IS the slide; a generic
 * title atop a wordmark quote would compete with the centerpiece. The "Part 2"
 * marker handles section-orientation duty in place of a title.
 */

// --- Foreshadow node geometry ---
// Central node (the data scientist — slide 10 makes this explicit) plus three
// peripheral nodes arranged in a triangle around it. Held at low opacity so
// the headline reads first and the diagram registers second, peripherally.
const VB = { w: 1000, h: 760 };
const CENTER = { x: VB.w / 2, y: VB.h / 2 };
const PERIPH_R = 330; // distance from center to peripheral nodes

// Three angles for the triangle of peripheral nodes (in degrees, 0 = up).
// 0 / 120 / 240 places one node at top, two at bottom-left/bottom-right —
// the same triangular topology slide 10 will inherit.
const PERIPH_ANGLES = [0, 120, 240];

const polar = (cx: number, cy: number, r: number, theta_deg: number): [number, number] => {
  const t = (theta_deg * Math.PI) / 180;
  return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
};

const Part2Frame: React.FC<SlideProps> = () => {
  const peripherals = PERIPH_ANGLES.map((angle) => {
    const [x, y] = polar(CENTER.x, CENTER.y, PERIPH_R, angle);
    return { x, y, angle };
  });

  return (
    <SlideContainer>
      <div className="relative w-full max-w-[92vw] h-[86vh] flex items-center justify-center">
        {/* --- Foreshadow visual: faint three-node-around-center hint --- */}
        {/* Sits behind the headline. Low opacity throughout so it reads as
            atmosphere, not as an established diagram. */}
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="part2-frame-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="part2-frame-center-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
              <stop offset="60%" stopColor="var(--color-primary)" stopOpacity={0.08} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Faint connecting lines from center to each peripheral node.
              Drawn first so they sit beneath the nodes. */}
          {peripherals.map((p, i) => (
            <motion.line
              key={`line-${i}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
              stroke="var(--color-text-muted)"
              strokeWidth={1}
              strokeOpacity={0.18}
              strokeDasharray="3 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.12, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}

          {/* Soft halo behind the central node. */}
          <motion.circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={120}
            fill="url(#part2-frame-center-grad)"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1.0 }}
          />

          {/* Three peripheral nodes — muted, faint. Slide 10 will name them
              (bench biologists / hardcore statisticians / software engineers);
              here they are deliberately unlabeled. */}
          {peripherals.map((p, i) => (
            <motion.g
              key={`periph-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={28}
                fill="var(--color-text-muted)"
                fillOpacity={0.08}
                stroke="var(--color-text-muted)"
                strokeWidth={1.4}
                strokeOpacity={0.32}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={4.5}
                fill="var(--color-text-muted)"
                fillOpacity={0.5}
              />
            </motion.g>
          ))}

          {/* Central node — glowing primary. The data scientist. Subtle but
              clearly the center of gravity. */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          >
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={34}
              fill="var(--color-primary)"
              fillOpacity={0.12}
              stroke="var(--color-primary)"
              strokeWidth={1.6}
              strokeOpacity={0.55}
              filter="url(#part2-frame-glow)"
            />
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={6.5}
              fill="var(--color-primary)"
              fillOpacity={0.85}
              filter="url(#part2-frame-glow)"
            />
          </motion.g>
        </svg>

        {/* --- "Part 2" section marker (top-left, muted primary) --- */}
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
            Part 2
          </span>
        </motion.div>

        {/* --- Headline: verbatim thesis at wordmark scale --- */}
        {/* Sits centered, on top of the faint foreshadow visual. The dark
            slide background plus the low-opacity SVG keeps the type fully
            legible. */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-[80vw]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="font-bold leading-[1.1] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: 'var(--color-text)' }}
          >
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &ldquo;
            </span>
            Most of this job is{' '}
            <span style={{ color: 'var(--color-primary)' }}>translation</span>,{' '}
            <span style={{ color: 'var(--color-primary)' }}>judgment</span>, and{' '}
            <span style={{ color: 'var(--color-primary)' }}>communication</span>.
            <br />
            <span style={{ color: 'var(--color-text)' }}>
              The toolkit is{' '}
            </span>
            <span style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>
              smaller
            </span>
            <span style={{ color: 'var(--color-text)' }}>
              {' '}than you think.
            </span>
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>

          {/* Thin accent rule + section title underneath. The title sits as
              supporting text rather than a header — the quote is the hero. */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 h-[2px] w-24 origin-center"
            style={{ background: 'var(--color-primary)', opacity: 0.55 }}
          />
          <motion.div
            className="mt-4 text-lg md:text-xl lg:text-2xl font-semibold tracking-[0.32em] uppercase"
            style={{ color: 'var(--color-primary)', opacity: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ delay: 1.25, duration: 0.55 }}
          >
            What I Actually Do
          </motion.div>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default Part2Frame;
