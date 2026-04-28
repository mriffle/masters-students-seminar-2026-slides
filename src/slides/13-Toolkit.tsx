import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 13 - The Toolkit and What's Shifting
 *
 * Editorial spine (per part2_present.md Slide 2.6):
 *   "The interesting question isn't what's on this list.
 *    It's what changed in the last 2-3 years."
 *
 * The slide is a two-column comparison:
 *
 *   STABLE (left)              SHIFTING (right)
 *   - Python                   - Jupyter Notebooks  (waning, down arrow, muted)
 *   - VS Code                  - Claude Code CLI    (rising, up arrow, primary glow)
 *   - Obsidian
 *   - Slack
 *
 * The stable column is intentionally quiet -- four muted cards in a row -- so
 * the eye is pulled to the right column where the SHIFT lives. That asymmetry
 * is the slide. We don't dwell on each tool; we frame the change.
 *
 * Color budget (2 accents, per the brief):
 *   --color-primary    -> Claude Code rising (forward), headline emphasis
 *   --color-text-muted -> Jupyter waning, stable tools (steady, not exciting)
 *   --color-text       -> body labels
 *   --color-bg-card    -> card backgrounds
 *
 * Pre-pivots toward Part 3 by making Claude Code the visually loudest item
 * on the slide.
 */

const Toolkit: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="What changed in the last 2-3 years?">
        The Toolkit
      </SlideTitle>

      <div className="w-full max-w-[92vw] h-full flex flex-col items-center gap-4">
        <ColumnHeaders />
        <div className="w-full grid grid-cols-2 gap-6 md:gap-10 mt-1">
          <StableColumn />
          <ShiftingColumn />
        </div>
        <Footnote />
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Column headers -- "Stable" and "Shifting"
// ---------------------------------------------------------------------------

const ColumnHeaders: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-6 md:gap-10">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span
          className="font-mono"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          Stable
        </span>
        <div
          aria-hidden
          style={{
            width: 'clamp(36px, 5vw, 60px)',
            height: 1.5,
            background: 'var(--color-text-muted)',
            opacity: 0.45,
            marginTop: 6,
            borderRadius: 999,
          }}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span
          className="font-mono"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            opacity: 0.95,
          }}
        >
          Shifting
        </span>
        <div
          aria-hidden
          style={{
            width: 'clamp(36px, 5vw, 60px)',
            height: 1.5,
            background: 'var(--color-primary)',
            opacity: 0.7,
            marginTop: 6,
            borderRadius: 999,
          }}
        />
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Stable column -- four muted, steady cards
// ---------------------------------------------------------------------------

interface StableTool {
  name: string;
  role: string;
}

const STABLE_TOOLS: StableTool[] = [
  { name: 'Python', role: 'Primary language (over R) - vast ML / viz ecosystem.' },
  { name: 'VS Code', role: 'Primary IDE - Jupyter native, no Anaconda.' },
  { name: 'Obsidian', role: 'Notes and knowledge management.' },
  { name: 'Slack', role: 'Collaboration.' },
];

const StableColumn: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {STABLE_TOOLS.map((t, i) => (
        <StableCard key={t.name} tool={t} delay={0.75 + i * 0.1} />
      ))}
    </div>
  );
};

const StableCard: React.FC<{ tool: StableTool; delay: number }> = ({ tool, delay }) => {
  return (
    <motion.div
      className="rounded-lg flex items-baseline gap-3"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text-muted) 22%, transparent)',
        padding: 'clamp(0.7rem, 1.1vw, 0.95rem) clamp(0.95rem, 1.5vw, 1.25rem)',
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45 }}
    >
      <h3
        className="font-semibold"
        style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(0.95rem, 1.25vw, 1.2rem)',
          flexShrink: 0,
        }}
      >
        {tool.name}
      </h3>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.78rem, 0.95vw, 0.92rem)',
          opacity: 0.9,
        }}
      >
        {tool.role}
      </p>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Shifting column -- two cards, each with a directional arrow
// ---------------------------------------------------------------------------
//
// Jupyter -- waning. Faded card, down arrow in muted, label "waning".
// Claude Code -- rising. Glowing card, up arrow in primary, label "rising".
//
// The visual asymmetry between the two cards is deliberate: Claude Code
// is the loudest thing on the slide, pre-pivoting to Part 3.

const ShiftingColumn: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <ShiftCard
        name="Jupyter Notebooks"
        role="Still used; drifting away from."
        direction="down"
        tag="waning"
        delay={1.2}
      />
      <ShiftCard
        name="Claude Code CLI"
        role="Used heavily and increasingly."
        direction="up"
        tag="rising"
        delay={1.45}
      />
    </div>
  );
};

const ShiftCard: React.FC<{
  name: string;
  role: string;
  direction: 'up' | 'down';
  tag: string;
  delay: number;
}> = ({ name, role, direction, tag, delay }) => {
  const isUp = direction === 'up';
  const accent = isUp ? 'var(--color-primary)' : 'var(--color-text-muted)';

  return (
    <motion.div
      className="relative rounded-lg flex items-center gap-4 overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: isUp
          ? '1.5px solid color-mix(in srgb, var(--color-primary) 45%, transparent)'
          : '1px dashed color-mix(in srgb, var(--color-text-muted) 35%, transparent)',
        boxShadow: isUp
          ? '0 0 0 1px color-mix(in srgb, var(--color-primary) 15%, transparent), 0 0 56px -16px color-mix(in srgb, var(--color-primary) 50%, transparent)'
          : 'none',
        padding: 'clamp(0.95rem, 1.5vw, 1.25rem) clamp(1.1rem, 1.7vw, 1.4rem)',
        opacity: isUp ? 1 : 0.78,
      }}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: isUp ? 1 : 0.78, x: 0 }}
      transition={{ delay, duration: 0.55 }}
    >
      {/* Vertical accent bar on the left edge -- echoes the up/down feel. */}
      {isUp && (
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: 3,
            background:
              'linear-gradient(0deg, color-mix(in srgb, var(--color-primary) 0%, transparent), color-mix(in srgb, var(--color-primary) 80%, transparent), color-mix(in srgb, var(--color-primary) 0%, transparent))',
          }}
        />
      )}

      {/* Directional arrow */}
      <DirectionalArrow direction={direction} delay={delay + 0.15} />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3
            className="font-semibold leading-snug"
            style={{
              color: isUp ? 'var(--color-text)' : 'var(--color-text-muted)',
              fontSize: 'clamp(1rem, 1.35vw, 1.3rem)',
            }}
          >
            {name}
          </h3>
          <span
            className="font-mono"
            style={{
              color: accent,
              fontSize: 'clamp(0.65rem, 0.85vw, 0.78rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: isUp ? 0.95 : 0.7,
            }}
          >
            {tag}
          </span>
        </div>
        <p
          className="leading-snug italic"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
            opacity: isUp ? 0.95 : 0.85,
          }}
        >
          {role}
        </p>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// DirectionalArrow -- glowing up arrow (primary) or faded down arrow (muted)
// ---------------------------------------------------------------------------
//
// Drawn as inline SVG so we can apply a glow filter and the correct accent
// color. The arrow size is responsive via a clamped wrapper.

const DirectionalArrow: React.FC<{ direction: 'up' | 'down'; delay: number }> = ({
  direction,
  delay,
}) => {
  const isUp = direction === 'up';
  const color = isUp ? 'var(--color-primary)' : 'var(--color-text-muted)';
  const filterId = isUp ? 'tk-arrow-glow' : undefined;
  const opacity = isUp ? 1 : 0.55;

  // SVG arrow drawn pointing up; for "down" we rotate 180.
  // Path is a chunky upward-pointing arrow with shaft and head.
  return (
    <motion.div
      style={{
        width: 'clamp(36px, 4vw, 52px)',
        height: 'clamp(36px, 4vw, 52px)',
        flexShrink: 0,
        transform: isUp ? 'none' : 'rotate(180deg)',
        opacity,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden>
        <defs>
          {isUp && (
            <filter id="tk-arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
        {/* Arrowhead (triangle at top) */}
        <polygon
          points="32,6 54,30 42,30 42,52 22,52 22,30 10,30"
          fill={color}
          fillOpacity={isUp ? 0.22 : 0.12}
          stroke={color}
          strokeWidth={2}
          strokeOpacity={isUp ? 1 : 0.6}
          strokeLinejoin="round"
          filter={filterId ? `url(#${filterId})` : undefined}
        />
      </svg>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Footnote -- editorial line at the bottom
// ---------------------------------------------------------------------------
//
// Per the part doc, the SHIFT is the interesting story. The footnote names
// that explicitly so the audience reads the right column as the lesson, not
// the left.

const Footnote: React.FC = () => {
  return (
    <motion.p
      className="text-center italic leading-snug mt-2"
      style={{
        color: 'var(--color-text-muted)',
        fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
        maxWidth: '70vw',
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 0.95, y: 0 }}
      transition={{ delay: 1.85, duration: 0.55 }}
    >
      The interesting question isn&rsquo;t what&rsquo;s on this list.{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
        It&rsquo;s what changed.
      </span>
    </motion.p>
  );
};

export default Toolkit;
