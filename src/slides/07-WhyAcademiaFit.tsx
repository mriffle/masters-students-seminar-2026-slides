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
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-3">
        <SlideTitle subtitle="Frontier of multiple fields. No known way to do things.">
          Why Academia Fit
        </SlideTitle>

        {/* Card grid: lead card on top (dominant), three secondaries beneath. */}
        <div className="w-full max-w-[88vw] flex flex-col gap-4 mt-1">
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
        padding: 'clamp(1.25rem, 2.4vw, 2.1rem) clamp(1.5rem, 3vw, 2.6rem)',
        minHeight: '30vh',
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

      <div className="flex flex-col gap-3">
        {/* Tiny eyebrow tag -- "the real answer" */}
        <motion.div
          className="inline-flex items-center self-start uppercase font-mono"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.62rem, 0.78vw, 0.78rem)',
            letterSpacing: '0.22em',
            opacity: 0.85,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          the real answer
        </motion.div>

        {/* Headline -- wordmark-scale, in primary. */}
        <motion.h2
          className="font-bold leading-[1.1] tracking-tight"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          Frontier projects. No known way to do things.
        </motion.h2>

        {/* One-line description in muted text. Single sentence, no bullets. */}
        <motion.p
          className="leading-snug max-w-[88ch]"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55 }}
        >
          Constantly changing projects on the frontier of multiple fields &mdash; often no known way
          to do things, even from a data science perspective. The forefront of knowledge, applied to
          new fields.
        </motion.p>
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
        className="font-mono italic uppercase self-start"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.62rem, 0.78vw, 0.76rem)',
          letterSpacing: '0.18em',
          opacity: 0.75,
        }}
      >
        things I didn&rsquo;t know to value at your age
      </div>

      <div className="grid grid-cols-3 gap-3">
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
      className="rounded-lg flex flex-col gap-1.5"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text-muted) 22%, transparent)',
        padding: 'clamp(0.85rem, 1.5vw, 1.15rem) clamp(1rem, 1.7vw, 1.35rem)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
    >
      <h3
        className="font-semibold leading-snug"
        style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
          opacity: 0.9,
        }}
      >
        {headline}
      </h3>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.78rem, 0.95vw, 0.92rem)',
          opacity: 0.85,
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
      className="text-center italic leading-snug self-center mt-1"
      style={{
        color: 'var(--color-text-muted)',
        fontSize: 'clamp(0.72rem, 0.9vw, 0.88rem)',
        opacity: 0.7,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.7, duration: 0.55 }}
    >
      Not every academic position delivers all four. The combination is rare &mdash; and partly luck.
    </motion.p>
  );
};

export default WhyAcademiaFit;
