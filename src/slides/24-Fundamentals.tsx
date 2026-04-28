import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 24 — Fundamentals: DS, CS, and Knowing Your Data
 *
 * Merges old slides 3.7 + 3.8. Establishes that fundamentals are not a
 * "nice to have" — they are the precondition for using AI well.
 *
 * Visual concept:
 *   Three foundation pillars rising from a baseline floor, supporting a
 *   horizontal platform labeled "ABLE TO PUSH BACK ON AI". A small AI
 *   agent icon sits ON TOP of the platform — supported BY the pillars.
 *   The visual lesson is structural: without these pillars, the platform
 *   (and the AI agent on it) would collapse.
 *
 *   Each pillar has:
 *     - A bold pillar headline (DS / CS / KNOWING YOUR DATA)
 *     - 2-3 small sub-bullet chips inside the pillar shape
 *     - A signature accent color
 *
 *   Color budget (3 accents, within the rule):
 *     --color-primary  (cyan)   — DS fundamentals (deck "fundamentals" color)
 *     --color-tertiary (violet) — CS fundamentals (deck "AI tooling" color,
 *                                  appropriate here because CS pushback is
 *                                  literally the architecture-talk you have
 *                                  with the AI tool)
 *     --color-amber             — Knowing your data (cautionary / practice)
 *
 *   --color-text and --color-text-muted carry the platform label and chip
 *   text. The AI agent icon at the top is rendered in muted text so the
 *   PILLARS are the visual story.
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 540
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 540 };

// Floor / baseline
const FLOOR_Y = 500;

// Platform (the beam resting on top of all three pillars)
const PLATFORM = {
  x: 110,
  y: 152,
  w: 780,
  h: 44,
  rx: 10,
};

// Pillar geometry — three vertical columns evenly spaced under the platform.
// Each pillar starts just below the platform and rises from the floor.
const PILLAR_TOP_Y = PLATFORM.y + PLATFORM.h + 6; // sits flush under platform
const PILLAR_BOTTOM_Y = FLOOR_Y - 4; // sits flush on floor
const PILLAR_HEIGHT = PILLAR_BOTTOM_Y - PILLAR_TOP_Y;
const PILLAR_W = 200;
// Center x for each pillar — evenly distributed inside the platform span.
const PILLAR_CXS = [
  PLATFORM.x + PLATFORM.w * 0.16, // ~234
  PLATFORM.x + PLATFORM.w * 0.5,  // 500
  PLATFORM.x + PLATFORM.w * 0.84, // ~766
];

// AI agent box centered on top of the platform
const AGENT = {
  cx: PLATFORM.x + PLATFORM.w / 2,
  cy: PLATFORM.y - 50,
  w: 120,
  h: 70,
  rx: 14,
};

// ---------------------------------------------------------------------------
// Pillar data
// ---------------------------------------------------------------------------

interface Pillar {
  key: string;
  headline: string;
  caption: string;
  bullets: string[];
  color: string;        // CSS var
  glowFilter: string;   // <filter id> reference
  fillOpacity: number;  // pillar fill opacity
}

const PILLARS: Pillar[] = [
  {
    key: 'ds',
    headline: 'DATA SCIENCE',
    caption: 'fundamentals',
    bullets: [
      'what test, when',
      'how methods actually work',
      'evaluating CV, normalization, metrics',
    ],
    color: 'var(--color-primary)',
    glowFilter: 'url(#fnd-primary-glow)',
    fillOpacity: 0.12,
  },
  {
    key: 'cs',
    headline: 'COMPUTER SCIENCE',
    caption: 'fundamentals',
    bullets: [
      'complexity',
      'vectorization · hash maps',
      'GPU / CUDA paths',
    ],
    color: 'var(--color-tertiary)',
    glowFilter: 'url(#fnd-tertiary-glow)',
    fillOpacity: 0.12,
  },
  {
    key: 'data',
    headline: 'KNOWING YOUR DATA',
    caption: 'more important now, not less',
    bullets: [
      'AI scans metadata, makes guesses',
      'iterate with AI on column meanings',
      'save metadata description (markdown)',
    ],
    color: 'var(--color-amber)',
    glowFilter: 'url(#fnd-amber-glow)',
    fillOpacity: 0.12,
  },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const Fundamentals: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="DS, CS, and knowing your data — the precondition for using AI well.">
        What Holds Up the Lever
      </SlideTitle>

      <div className="relative w-full max-w-[94vw] h-[72vh] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Three foundation pillars rising from a baseline floor support a horizontal platform labeled 'able to push back on AI'. The leftmost pillar in cyan is labeled 'data science fundamentals' with chips for what test when, how methods actually work, and evaluating cross-validation, normalization, and metrics. The middle pillar in violet is labeled 'computer science fundamentals' with chips for complexity, vectorization and hash maps, and GPU and CUDA paths. The rightmost pillar in amber is labeled 'knowing your data — more important now, not less' with chips for AI scanning metadata, iterating with AI on column meanings, and saving a metadata description as markdown. Above the platform, a small AI agent icon sits supported by the pillars. The visual message is that without the pillars, the platform — and the ability to use AI well — collapses."
        >
          <defs>
            <filter
              id="fnd-primary-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="fnd-tertiary-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="fnd-amber-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="fnd-platform-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Platform gradient — picks up a hint of each pillar color */}
            <linearGradient id="fnd-platform-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
              <stop offset="50%" stopColor="var(--color-tertiary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* ============================================================ */}
          {/* FLOOR / BASELINE                                             */}
          {/* ============================================================ */}
          <motion.line
            x1={60}
            y1={FLOOR_Y}
            x2={VB.w - 60}
            y2={FLOOR_Y}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.32}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.55 }}
          />
          {/* Floor texture — short ticks */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 80 + i * ((VB.w - 160) / 13);
            return (
              <motion.line
                key={`floor-tick-${i}`}
                x1={x}
                y1={FLOOR_Y + 2}
                x2={x - 8}
                y2={FLOOR_Y + 12}
                stroke="var(--color-text-muted)"
                strokeOpacity={0.22}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.015, duration: 0.3 }}
              />
            );
          })}

          {/* ============================================================ */}
          {/* PILLARS (drawn before platform so platform sits ON TOP)      */}
          {/* ============================================================ */}
          {PILLARS.map((p, i) => {
            const cx = PILLAR_CXS[i];
            const left = cx - PILLAR_W / 2;
            // Pillar capital (top trim) and base (bottom trim) — slightly
            // wider than the shaft, in classical column proportion.
            const capW = PILLAR_W + 24;
            const capH = 14;
            const capLeft = cx - capW / 2;

            return (
              <motion.g
                key={`pillar-${p.key}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + i * 0.18,
                  duration: 0.65,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Pillar shaft */}
                <rect
                  x={left}
                  y={PILLAR_TOP_Y}
                  width={PILLAR_W}
                  height={PILLAR_HEIGHT}
                  rx={6}
                  fill={p.color}
                  fillOpacity={p.fillOpacity}
                  stroke={p.color}
                  strokeOpacity={0.85}
                  strokeWidth={2}
                  filter={p.glowFilter}
                />
                {/* Pillar inner frame for depth */}
                <rect
                  x={left + 6}
                  y={PILLAR_TOP_Y + 6}
                  width={PILLAR_W - 12}
                  height={PILLAR_HEIGHT - 12}
                  rx={4}
                  fill="none"
                  stroke={p.color}
                  strokeOpacity={0.22}
                  strokeWidth={1}
                />

                {/* Pillar capital — top */}
                <rect
                  x={capLeft}
                  y={PILLAR_TOP_Y - capH}
                  width={capW}
                  height={capH}
                  rx={3}
                  fill={p.color}
                  fillOpacity={0.22}
                  stroke={p.color}
                  strokeOpacity={0.9}
                  strokeWidth={2}
                />
                {/* Pillar base — bottom */}
                <rect
                  x={capLeft}
                  y={PILLAR_BOTTOM_Y}
                  width={capW}
                  height={capH}
                  rx={3}
                  fill={p.color}
                  fillOpacity={0.22}
                  stroke={p.color}
                  strokeOpacity={0.9}
                  strokeWidth={2}
                />

                {/* Pillar headline */}
                <text
                  x={cx}
                  y={PILLAR_TOP_Y + 30}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={800}
                  fill={p.color}
                  fillOpacity={1}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.16em',
                  }}
                >
                  {p.headline}
                </text>
                <text
                  x={cx}
                  y={PILLAR_TOP_Y + 50}
                  textAnchor="middle"
                  fontSize={11}
                  fontStyle="italic"
                  fill="var(--color-text-muted)"
                  fillOpacity={0.85}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {p.caption}
                </text>

                {/* Sub-bullet chips inside the pillar */}
                {p.bullets.map((b, bi) => {
                  const chipY = PILLAR_TOP_Y + 80 + bi * 56;
                  const chipW = PILLAR_W - 24;
                  const chipH = 44;
                  const chipX = cx - chipW / 2;
                  return (
                    <motion.g
                      key={`pillar-${p.key}-chip-${bi}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.05 + i * 0.18 + bi * 0.1,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <rect
                        x={chipX}
                        y={chipY}
                        width={chipW}
                        height={chipH}
                        rx={8}
                        fill="var(--color-bg-card)"
                        fillOpacity={0.92}
                        stroke={p.color}
                        strokeOpacity={0.55}
                        strokeWidth={1.25}
                      />
                      <text
                        x={cx}
                        y={chipY + chipH / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={12}
                        fill="var(--color-text)"
                        fillOpacity={0.95}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                      >
                        {b}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>
            );
          })}

          {/* ============================================================ */}
          {/* PLATFORM — rests ON the pillars, supports the AI agent       */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <rect
              x={PLATFORM.x}
              y={PLATFORM.y}
              width={PLATFORM.w}
              height={PLATFORM.h}
              rx={PLATFORM.rx}
              fill="url(#fnd-platform-grad)"
              stroke="var(--color-text)"
              strokeOpacity={0.55}
              strokeWidth={2}
              filter="url(#fnd-platform-glow)"
            />
            {/* Inner subtle highlight */}
            <rect
              x={PLATFORM.x + 4}
              y={PLATFORM.y + 4}
              width={PLATFORM.w - 8}
              height={PLATFORM.h - 8}
              rx={PLATFORM.rx - 2}
              fill="none"
              stroke="var(--color-text)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
            {/* Platform label */}
            <text
              x={PLATFORM.x + PLATFORM.w / 2}
              y={PLATFORM.y + PLATFORM.h / 2 + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fontWeight={800}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
              }}
            >
              able to push back on AI
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* AI AGENT — sits supported on top of the platform             */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.75, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Agent body — rounded rect, muted bg-card so the pillars stay
                visually dominant. Stylized robot/agent silhouette. */}
            <rect
              x={AGENT.cx - AGENT.w / 2}
              y={AGENT.cy - AGENT.h / 2}
              width={AGENT.w}
              height={AGENT.h}
              rx={AGENT.rx}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={2}
            />
            {/* Eye dots — two small circles to read as "agent face" */}
            <circle
              cx={AGENT.cx - 18}
              cy={AGENT.cy - 4}
              r={4}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            />
            <circle
              cx={AGENT.cx + 18}
              cy={AGENT.cy - 4}
              r={4}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            />
            {/* Antenna / status mark on top */}
            <line
              x1={AGENT.cx}
              y1={AGENT.cy - AGENT.h / 2}
              x2={AGENT.cx}
              y2={AGENT.cy - AGENT.h / 2 - 12}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={2}
            />
            <circle
              cx={AGENT.cx}
              cy={AGENT.cy - AGENT.h / 2 - 16}
              r={3.5}
              fill="var(--color-text-muted)"
              fillOpacity={0.9}
            />
            {/* AI label */}
            <text
              x={AGENT.cx}
              y={AGENT.cy + 18}
              textAnchor="middle"
              fontSize={12}
              fontWeight={800}
              fill="var(--color-text-muted)"
              fillOpacity={0.95}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.32em',
              }}
            >
              AI
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default Fundamentals;

/*
 * Tradeoffs / open questions:
 *
 *  - Color budget: 3 accents (primary, tertiary, amber) — within the rule.
 *    Each carries a deck-consistent semantic: primary = fundamentals (deck-
 *    wide), tertiary = AI tooling / supporting (CS pushback IS the tooling
 *    conversation), amber = cautionary/practice (the "iterate, save metadata"
 *    discipline). The platform gradient blends all three at low opacity to
 *    suggest the platform is literally held up BY the three pillar colors.
 *
 *  - The "AI agent" is intentionally muted (text-muted bg-card box) so the
 *    visual hierarchy reads PILLARS first, then platform, then agent. The
 *    point is not "look at the cool agent" — it's "the agent is supported
 *    by these things." A flashier agent would steal focus.
 *
 *  - Pillar shaft + capital + base proportions follow classical column
 *    geometry to make the "pillars holding up a platform" reading
 *    unmistakable at a glance. The capital is what the platform actually
 *    rests on visually.
 *
 *  - Bullet text is terse (within the visual-first rule):
 *      DS:    "what test, when" / "how methods actually work" /
 *             "evaluating CV, normalization, metrics"
 *      CS:    "complexity" / "vectorization · hash maps" / "GPU / CUDA paths"
 *      DATA:  "AI scans metadata, makes guesses" /
 *             "iterate with AI on column meanings" /
 *             "save metadata description (markdown)"
 *    Each chip is a recognizable concept, not a sentence.
 *
 *  - Title chosen: "What Holds Up the Lever" — explicitly bridges to slide
 *    27's lever motif (fundamentals are the foundation the lever sits on).
 *    Subtitle states the thesis directly: "the precondition for using AI
 *    well." Per the brief, "Fundamentals" or "The Pillars" were also valid;
 *    the lever bridge felt strongest given slide 20 already foreshadows the
 *    lever and slide 27 lands it.
 *
 *  - No verbatim quotes mandatory on this slide per SLIDES.md and the
 *    briefing. Phrasings inside chips are condensed from docs/part3_future.md
 *    Slides 3.7 + 3.8 + the Understanding Your Data + Computer Science
 *    Fundamentals raw-material sections.
 */
