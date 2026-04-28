import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 07 - Why Academia Fit
 *
 * The bridge slide between Part 1 and Part 2. The audience has just heard
 * about the David Baker interview (slide 06) and is now silently asking:
 * "OK, so why are you still there?" This slide answers honestly.
 *
 * Editorial direction (CRITICAL -- the EMPHASIS is the slide):
 *
 *   LEAD reason (the real answer, dominant -- ~50% of the visual area):
 *     Constantly changing projects on the frontier of multiple fields.
 *     There's often no known way to do things, even from a data science
 *     perspective. It's exciting to be on the forefront of knowledge and
 *     applications of data science to new fields.
 *
 *   SECONDARY reasons (three, briefly, framed honestly):
 *     - Schedule flexibility (married, had kids -- DON'T elaborate)
 *     - Generally low stress
 *     - Relative job security vs. always hustling for the next client
 *     All three tagged "didn't know to value at your age."
 *
 *   HONEST NOTE (footnote): rare combination, partly luck.
 *
 * Why this layout (and not the path-motif from slides 03-06):
 *   The trajectory has resolved at slide 06. Slide 07 is about the
 *   *destination* -- where the speaker landed and why -- so it is
 *   structurally a card grid, not a connection diagram. The hierarchy of
 *   the four reasons (one dominant, three muted) is the entire visual
 *   message, so the layout enforces it: the lead card occupies the top
 *   half (full width), and the three secondary cards sit in a muted row
 *   beneath it. The honest-note caption anchors the bottom.
 *
 * Bridge to Part 2:
 *   The lead card's content ("frontier of multiple fields, no known way
 *   to do things") is the seed of Part 2's frame. There is NO explicit
 *   "next: Part 2" text -- the lead card's content does the bridging.
 *
 * Color budget (max 2 accents per the brief -- precisely):
 *   - --color-primary    -> lead card border, headline, glow
 *   - --color-text-muted -> secondary card borders, muted text, "didn't
 *                            know to value" annotations, honest-note
 *   --color-text and --color-bg-card are not counted as accents.
 */

const WhyAcademiaFit: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-center gap-[2vh]">
        <SlideTitle subtitle="Frontier of multiple fields. No known way to do things.">
          Why Academia Fit
        </SlideTitle>

        {/* Card grid: lead card on top (dominant), three secondaries beneath. */}
        <div className="w-full max-w-[88vw] flex-1 flex flex-col justify-center gap-[2.2vh]">
          <LeadCard />
          <SecondaryRow />
          <HonestNote />
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// LeadCard -- the real answer, dominant on the slide
// ---------------------------------------------------------------------------
//
// Occupies the top ~half of the visual area. Glowing primary border at
// moderate opacity, generous padding, primary headline, one-line description
// in muted text. This is the slide's center of gravity -- and the seed of
// Part 2.
const LeadCard: React.FC = () => {
  return (
    <motion.div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: '1.5px solid color-mix(in srgb, var(--color-primary) 38%, transparent)',
        boxShadow:
          '0 0 0 1px color-mix(in srgb, var(--color-primary) 14%, transparent), 0 0 48px -12px color-mix(in srgb, var(--color-primary) 32%, transparent)',
        padding: 'clamp(1.4rem, 2.6vw, 2.3rem) clamp(1.6rem, 3vw, 2.6rem)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Subtle inner glow accent on the left edge -- a vertical accent bar
          that reinforces "this is THE reason" without competing with the
          headline. */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: 4,
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 0%, transparent), color-mix(in srgb, var(--color-primary) 75%, transparent), color-mix(in srgb, var(--color-primary) 0%, transparent))',
        }}
      />

      <div className="flex flex-row items-center gap-[2.4vw]">
        {/* Left: text column */}
        <div className="flex-1 flex flex-col gap-[1.2vh]">
          {/* Tiny eyebrow tag -- "the real answer" */}
          <motion.div
            className="inline-flex items-center self-start uppercase font-mono"
            style={{
              color: 'var(--color-primary)',
              fontSize: 'clamp(0.72rem, 0.9vw, 0.9rem)',
              letterSpacing: '0.22em',
              opacity: 0.95,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            the real answer
          </motion.div>

          {/* Headline -- wordmark-scale, in primary. */}
          <motion.h2
            className="font-bold leading-[1.1] tracking-tight"
            style={{
              color: 'var(--color-primary)',
              fontSize: 'clamp(1.7rem, 3.1vw, 2.7rem)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
          >
            Frontier projects. No known way to do things.
          </motion.h2>

          {/* One-line description in muted text. Single sentence, no bullets. */}
          <motion.p
            className="leading-snug max-w-[60ch]"
            style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.4rem)',
              opacity: 0.92,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.92, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55 }}
          >
            Constantly changing projects on the frontier of multiple fields &mdash; often no known way
            to do things, even from a data science perspective. The forefront of knowledge, applied to
            new fields.
          </motion.p>
        </div>

        {/* Right: branching-paths frontier glyph */}
        <motion.div
          aria-hidden
          className="hidden md:flex shrink-0 items-center justify-center"
          style={{
            width: 'clamp(10rem, 18vw, 18rem)',
            height: 'clamp(10rem, 18vw, 18rem)',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg
            viewBox="0 0 120 120"
            fill="none"
            stroke="currentColor"
            style={{ color: 'var(--color-primary)', width: '100%', height: '100%' }}
          >
            <defs>
              <radialGradient id="lead-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="70%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* soft glow disc */}
            <circle cx="28" cy="86" r="48" fill="url(#lead-glow)" />
            {/* origin node */}
            <circle cx="28" cy="86" r="5" fill="currentColor" opacity="0.95" />
            {/* branching paths -- three forking trajectories outward */}
            <path
              d="M28 86 Q 50 70 72 56"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M28 86 Q 56 86 90 78"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
              strokeDasharray="4 4"
            />
            <path
              d="M28 86 Q 48 96 78 100"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.55"
              strokeDasharray="2 5"
            />
            {/* sub-branch off the top path */}
            <path
              d="M58 64 Q 78 50 100 42"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
              strokeDasharray="3 4"
            />
            {/* frontier nodes */}
            <circle cx="72" cy="56" r="3" fill="currentColor" opacity="0.85" />
            <circle cx="100" cy="42" r="2.5" fill="currentColor" opacity="0.55" />
            <circle cx="90" cy="78" r="2.5" fill="currentColor" opacity="0.65" />
            <circle cx="78" cy="100" r="2.5" fill="currentColor" opacity="0.5" />
            {/* horizon line suggesting "frontier" */}
            <line
              x1="6"
              y1="22"
              x2="114"
              y2="22"
              strokeWidth="1"
              opacity="0.25"
              strokeDasharray="2 4"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// SecondaryRow -- three muted cards (flexibility, low stress, security)
// ---------------------------------------------------------------------------
//
// Smaller, less prominent. Each card has a muted border and a tiny annotation
// strip across the top reading "didn't know to value at your age" (the
// annotation is rendered ONCE as a header above the row, so it's not
// repeated three times -- cleaner read at 16:9).
const SecondaryRow: React.FC = () => {
  const items: { headline: string; description: string }[] = [
    {
      headline: 'Schedule flexibility',
      description: 'Married, had kids. Time with family.',
    },
    {
      headline: 'Generally low stress',
      description: 'Most days, anyway.',
    },
    {
      headline: 'Relative job security',
      description: 'Vs. always hustling for the next client.',
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.55 }}
    >
      {/* Single annotation that applies to all three cards below. Italic and
          muted -- this is the editorial frame the speaker explicitly asked
          for. Set as a header so it isn't repeated three times. */}
      <div
        className="font-mono italic uppercase self-start font-semibold"
        style={{
          color: 'var(--color-text-secondary, var(--color-text))',
          fontSize: 'clamp(1rem, 1.4vw, 1.35rem)',
          letterSpacing: '0.22em',
          opacity: 1,
        }}
      >
        things I didn&rsquo;t know to value at your age
      </div>

      <div className="grid grid-cols-3 gap-[1.2vw]">
        {items.map((item, i) => (
          <SecondaryCard
            key={item.headline}
            headline={item.headline}
            description={item.description}
            delay={1.15 + i * 0.12}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SecondaryCard: React.FC<{
  headline: string;
  description: string;
  delay: number;
}> = ({ headline, description, delay }) => {
  return (
    <motion.div
      className="rounded-lg flex flex-col justify-center gap-[0.8vh]"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text-muted) 28%, transparent)',
        padding: 'clamp(1rem, 1.8vw, 1.5rem) clamp(1.1rem, 2vw, 1.6rem)',
        minHeight: '14vh',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
    >
      <h3
        className="font-semibold leading-snug"
        style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(1rem, 1.35vw, 1.3rem)',
          opacity: 0.95,
        }}
      >
        {headline}
      </h3>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-secondary, var(--color-text-muted))',
          fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
          opacity: 0.9,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// HonestNote -- footnote-style caption acknowledging luck
// ---------------------------------------------------------------------------
//
// A single line set in muted, italic, small type. Anchors the bottom and
// undercuts any reading of "this is a formula you can plan for."
const HonestNote: React.FC = () => {
  return (
    <motion.p
      className="text-center italic leading-snug self-center mt-[0.5vh]"
      style={{
        color: 'var(--color-text-secondary, var(--color-text))',
        fontSize: 'clamp(0.9rem, 1.15vw, 1.1rem)',
        opacity: 0.9,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ delay: 1.7, duration: 0.55 }}
    >
      Not every academic position delivers all four. The combination is rare &mdash; and partly luck.
    </motion.p>
  );
};

export default WhyAcademiaFit;
