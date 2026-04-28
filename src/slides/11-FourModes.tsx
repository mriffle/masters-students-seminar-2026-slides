import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 11 - Four Modes of Work
 *
 * Merges old slides 2.3 (Four Modes) and 2.4 (Domain Breadth) into one.
 * The card showing Mode 3 ("Direct work on research problems") expands to
 * surface domain breadth as a fan of six scientific-domain chips, making
 * domain breadth a visible payoff inside the modes structure.
 *
 * Layout:
 *   - Three-tier stack preserving 1 -> 2 -> 3 -> 4 reading order:
 *       Row 1: Modes 1 and 2 side-by-side (two equal cards).
 *       Row 2: Mode 3, full width -- visibly the expanded card, room for
 *              the six domain chips.
 *       Row 3: Mode 4, full width.
 *   - Card vocabulary matches slide 07 (--color-bg-card, color-mix muted
 *     borders, rounded-lg, generous padding).
 *   - Tagline anchors the bottom: "The toolkit travels. The domain doesn't."
 *
 * Color budget (2 accents):
 *   - --color-primary    -> project names (Limelight, Proxl, Nextflow,
 *                            GitHub), domain chip accents, tagline
 *                            emphasis
 *   - --color-text-muted -> descriptions, card borders, chip borders
 *   --color-text and --color-bg-card are not counted as accents.
 *
 * Don't teach the biology. One terse sentence per mode.
 */

const FourModes: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-3">
        <SlideTitle subtitle="What &ldquo;data scientist&rdquo; actually means here.">
          Four Modes of Work
        </SlideTitle>

        <div className="w-full max-w-[90vw] flex flex-col gap-4 mt-1">
          <ModeGrid />
          <Tagline />
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// ModeGrid -- three-tier layout preserving 1 -> 2 -> 3 -> 4 reading order
// ---------------------------------------------------------------------------
//
// Three rows:
//   Row 1: Modes 1 and 2 side-by-side (two equal cards).
//   Row 2: Mode 3, full width -- visibly the expanded card, with all six
//          domain chips spread across its width.
//   Row 3: Mode 4, full width.
//
// This satisfies (a) the 1 -> 2 -> 3 -> 4 reading order, and (b) Mode 3 is
// visibly the wider/expanded card where domain breadth becomes visible.
const ModeGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Modes 1 and 2 side-by-side */}
      <div className="grid grid-cols-2 gap-4">
        <StandardModeCard
          number="1"
          title="Generalized web apps"
          description={
            <>
              For data viz, sharing, analysis. Used by research labs.{' '}
              <ProjectName>Limelight</ProjectName> (proteomics) and{' '}
              <ProjectName>Proxl</ProjectName> (cross-linking proteomics).
            </>
          }
          delay={0.35}
        />
        <StandardModeCard
          number="2"
          title="Automated processing workflows"
          description={
            <>
              Pipelines in <ProjectName>Nextflow</ProjectName>. Push a button,
              raw data goes in, processed results come out the same way every
              time.
            </>
          }
          delay={0.5}
        />
      </div>

      {/* Row 2: Mode 3, full width, with domain chips inside */}
      <Mode3Card />

      {/* Row 3: Mode 4, full width */}
      <StandardModeCard
        number="4"
        title="Open-source algorithms and software"
        description={
          <>
            Algorithms and tools maintained on{' '}
            <ProjectName>GitHub</ProjectName>.
          </>
        }
        delay={0.65}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// StandardModeCard -- modes 1, 2, 4 (matching slide 07's secondary cards)
// ---------------------------------------------------------------------------
const StandardModeCard: React.FC<{
  number: string;
  title: string;
  description: React.ReactNode;
  delay: number;
}> = ({ number, title, description, delay }) => {
  return (
    <motion.div
      className="rounded-lg flex flex-col gap-1.5"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text-muted) 24%, transparent)',
        padding: 'clamp(0.95rem, 1.6vw, 1.25rem) clamp(1.1rem, 1.9vw, 1.5rem)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
            letterSpacing: '0.18em',
            opacity: 0.7,
          }}
        >
          MODE {number}
        </span>
        <h3
          className="font-semibold leading-snug"
          style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.82rem, 1vw, 0.98rem)',
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Mode3Card -- the wide card with the six domain chips
// ---------------------------------------------------------------------------
//
// This card occupies its own full-width row in the middle of the stack,
// making it visibly the expanded card. The six domain chips appear as a
// fan of pill-shaped badges, in muted text with a primary border accent.
// This is where "domain breadth" becomes visible inside the modes
// structure.
const Mode3Card: React.FC = () => {
  const domains = [
    'Radiation exposure',
    "Alzheimer's",
    "Parkinson's",
    'Ocean / environmental proteomics',
    'Pharmacology',
    'Aging',
  ];

  return (
    <motion.div
      className="relative rounded-lg flex flex-col gap-3 overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: '1.5px solid color-mix(in srgb, var(--color-primary) 38%, transparent)',
        boxShadow:
          '0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent), 0 0 48px -16px color-mix(in srgb, var(--color-primary) 28%, transparent)',
        padding: 'clamp(1.1rem, 1.9vw, 1.5rem) clamp(1.25rem, 2.1vw, 1.7rem)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Vertical accent bar on the left edge -- echoes slide 07's lead card */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: 4,
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 0%, transparent), color-mix(in srgb, var(--color-primary) 70%, transparent), color-mix(in srgb, var(--color-primary) 0%, transparent))',
        }}
      />

      <div className="flex items-baseline gap-3">
        <span
          className="font-mono"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
            letterSpacing: '0.18em',
            opacity: 0.85,
          }}
        >
          MODE 3
        </span>
        <h3
          className="font-semibold leading-snug"
          style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)',
          }}
        >
          Direct work on research problems
        </h3>
      </div>

      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.85rem, 1.05vw, 1rem)',
        }}
      >
        From radiation to aging biology.
      </p>

      {/* Domain chips -- the "fan" of six scientific domains. This is the
          visible payoff of the merged 2.4 (Domain Breadth) slide. */}
      <div className="flex flex-wrap gap-2 mt-1">
        {domains.map((domain, i) => (
          <DomainChip key={domain} label={domain} delay={0.75 + i * 0.07} />
        ))}
      </div>
    </motion.div>
  );
};

const DomainChip: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  return (
    <motion.span
      className="inline-flex items-center rounded-full"
      style={{
        color: 'var(--color-text)',
        background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-primary) 32%, transparent)',
        padding: 'clamp(0.28rem, 0.45vw, 0.4rem) clamp(0.7rem, 1vw, 0.95rem)',
        fontSize: 'clamp(0.72rem, 0.88vw, 0.85rem)',
        fontWeight: 500,
        opacity: 0.92,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 0.92, scale: 1 }}
      transition={{ delay, duration: 0.35 }}
    >
      {label}
    </motion.span>
  );
};

// ---------------------------------------------------------------------------
// ProjectName -- subtle primary accent for Limelight, Proxl, Nextflow, GitHub
// ---------------------------------------------------------------------------
const ProjectName: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      color: 'var(--color-primary)',
      fontWeight: 600,
      opacity: 0.92,
    }}
  >
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// Tagline -- anchors the bottom of the slide
// ---------------------------------------------------------------------------
//
// "The toolkit travels. The domain doesn't." -- punchy single-line statement.
// Treated as the slide's payoff line: italic, in primary, slightly larger
// than caption text.
const Tagline: React.FC = () => {
  return (
    <motion.p
      className="text-center italic leading-snug self-center mt-1"
      style={{
        color: 'var(--color-text)',
        fontSize: 'clamp(0.95rem, 1.25vw, 1.18rem)',
        opacity: 0.95,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 0.95, y: 0 }}
      transition={{ delay: 1.35, duration: 0.55 }}
    >
      <span style={{ color: 'var(--color-primary)' }}>The toolkit travels.</span>{' '}
      <span style={{ color: 'var(--color-text-muted)' }}>The domain doesn&rsquo;t.</span>
    </motion.p>
  );
};

export default FourModes;
