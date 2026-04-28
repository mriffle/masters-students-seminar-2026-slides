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

      <div className="w-full max-w-[92vw] flex-1 flex flex-col items-center justify-center gap-[2.2vh] pt-[1vh] pb-[1vh]">
        <div className="w-full grid grid-cols-2 gap-6 md:gap-10 items-start">
          <StableColumn />
          <ShiftingColumn />
        </div>
        <Footnote />
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Column header -- shared, fixed-height label + underline
// ---------------------------------------------------------------------------
//
// Header is rendered as the first child of each column with an explicit fixed
// height and identical marginBottom. This guarantees the first card top-edge
// is at exactly the same y in both columns, regardless of label content.

const COLUMN_HEADER_HEIGHT = 'clamp(40px, 4.6vh, 56px)';

const ColumnHeader: React.FC<{
  label: string;
  color: string;
  underlineOpacity: number;
  labelOpacity: number;
  delay: number;
}> = ({ label, color, underlineOpacity, labelOpacity, delay }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-start"
      style={{
        height: COLUMN_HEADER_HEIGHT,
        flexShrink: 0,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span
        className="font-mono"
        style={{
          color,
          fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)',
          lineHeight: 1.2,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          opacity: labelOpacity,
        }}
      >
        {label}
      </span>
      <div
        aria-hidden
        style={{
          width: 'clamp(36px, 5vw, 60px)',
          height: 1.5,
          background: color,
          opacity: underlineOpacity,
          marginTop: 6,
          borderRadius: 999,
        }}
      />
    </motion.div>
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
    <div
      className="flex flex-col items-stretch gap-[1.6vh]"
      style={{ paddingTop: 0 }}
    >
      <ColumnHeader
        label="Stable"
        color="var(--color-text-muted)"
        underlineOpacity={0.45}
        labelOpacity={0.85}
        delay={0.5}
      />
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
        padding: 'clamp(0.95rem, 1.6vw, 1.35rem) clamp(1.1rem, 1.9vw, 1.55rem)',
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45 }}
    >
      <h3
        className="font-semibold"
        style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(1.1rem, 1.55vw, 1.45rem)',
          flexShrink: 0,
        }}
      >
        {tool.name}
      </h3>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.85rem, 1.05vw, 1rem)',
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
    <div
      className="flex flex-col items-stretch gap-[1.6vh]"
      style={{ paddingTop: 0 }}
    >
      <ColumnHeader
        label="Shifting"
        color="var(--color-primary)"
        underlineOpacity={0.7}
        labelOpacity={0.95}
        delay={0.6}
      />
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
      className="relative rounded-lg flex items-center gap-6 overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: isUp
          ? '1.5px solid color-mix(in srgb, var(--color-primary) 45%, transparent)'
          : '1px dashed color-mix(in srgb, var(--color-text-muted) 35%, transparent)',
        boxShadow: isUp
          ? '0 0 0 1px color-mix(in srgb, var(--color-primary) 15%, transparent), 0 0 56px -16px color-mix(in srgb, var(--color-primary) 50%, transparent)'
          : 'none',
        padding: 'clamp(1.9rem, 2.9vw, 2.6rem) clamp(1.7rem, 2.6vw, 2.3rem)',
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

      <div className="flex flex-col gap-[0.6vh] flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3
            className="font-semibold leading-snug"
            style={{
              color: isUp ? 'var(--color-text)' : 'var(--color-text-muted)',
              fontSize: 'clamp(1.45rem, 2.1vw, 2rem)',
            }}
          >
            {name}
          </h3>
          <span
            className="font-mono"
            style={{
              color: accent,
              fontSize: 'clamp(0.78rem, 1.05vw, 0.98rem)',
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
            fontSize: 'clamp(1.02rem, 1.35vw, 1.25rem)',
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
        width: 'clamp(60px, 6.4vw, 88px)',
        height: 'clamp(60px, 6.4vw, 88px)',
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
      className="text-center italic leading-snug"
      style={{
        color: 'var(--color-text-muted)',
        fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
        maxWidth: '70vw',
        marginTop: '0.4vh',
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
