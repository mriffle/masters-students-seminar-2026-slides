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
 *   - 2x2 card grid filling the available vertical space. Mode 3 spans
 *     both rows in the right column, giving its six-domain fan room to
 *     breathe; Modes 1, 2, 4 stack in the left column.
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

        <div className="w-full max-w-[90vw] flex-1 flex flex-col gap-[2vh] mt-1 min-h-0">
          <ModeGrid />
          <Tagline />
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// ModeGrid -- 2x2 layout. Mode 3 spans both rows on the right; Modes 1, 2, 4
// stack on the left, preserving the 1 -> 2 -> 4 reading order while keeping
// Mode 3 visibly the taller "expanded" card with room for its six-domain fan.
// ---------------------------------------------------------------------------
const ModeGrid: React.FC = () => {
  return (
    <div
      className="grid grid-cols-2 grid-rows-3 gap-[1.6vh] gap-x-[1.2vw]"
      style={{ height: 'min(70vh, 720px)' }}
    >
      {/* Left column, top: Mode 1 */}
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

      {/* Right column, spans all three rows: Mode 3 with domain chips */}
      <div className="row-span-3 col-start-2 row-start-1 min-h-0">
        <Mode3Card />
      </div>

      {/* Left column, middle: Mode 2 */}
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

      {/* Left column, bottom: Mode 4 */}
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
      className="rounded-lg flex flex-col justify-center gap-[1.2vh] h-full min-h-0"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text-muted) 24%, transparent)',
        padding: 'clamp(1.1rem, 2.2vw, 1.9rem) clamp(1.3rem, 2.4vw, 2.1rem)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className="font-mono"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
            letterSpacing: '0.2em',
            opacity: 0.75,
          }}
        >
          MODE {number}
        </span>
        <h3
          className="font-semibold leading-snug"
          style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(1.15rem, 1.55vw, 1.45rem)',
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="leading-snug"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
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
  // Six domain chips arranged as a radial fan around a center node.
  // Positions are percentages of the fan area (centered on 50/50).
  // Angles distribute the six chips evenly around the center.
  const domains: { label: string; angleDeg: number }[] = [
    { label: 'Radiation exposure', angleDeg: 210 },
    { label: "Alzheimer's", angleDeg: 270 },
    { label: "Parkinson's", angleDeg: 330 },
    { label: 'Ocean / environmental proteomics', angleDeg: 30 },
    { label: 'Pharmacology', angleDeg: 90 },
    { label: 'Aging', angleDeg: 150 },
  ];

  // Radius of the chip ring, expressed as percentages of the fan box.
  const radiusXPct = 34;
  const radiusYPct = 36;

  return (
    <motion.div
      className="relative rounded-lg flex flex-col overflow-hidden h-full min-h-0"
      style={{
        background: 'var(--color-bg-card)',
        border: '1.5px solid color-mix(in srgb, var(--color-primary) 38%, transparent)',
        boxShadow:
          '0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent), 0 0 48px -16px color-mix(in srgb, var(--color-primary) 28%, transparent)',
        padding: 'clamp(1.2rem, 2vw, 1.7rem) clamp(1.3rem, 2.2vw, 1.8rem)',
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
            fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
            letterSpacing: '0.2em',
            opacity: 0.85,
          }}
        >
          MODE 3
        </span>
        <h3
          className="font-semibold leading-snug"
          style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)',
          }}
        >
          Direct work on research problems
        </h3>
      </div>

      <p
        className="leading-snug mt-1"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
        }}
      >
        From radiation to aging biology.
      </p>

      {/* Radial-fan domain visual. The six chips ring a primary-colored
          center node, with thin connection lines radiating outward. This
          fills the right column and makes the domain breadth payoff
          visually dominant. */}
      <div className="relative flex-1 mt-3 min-h-0">
        {/* Connection lines: SVG sits behind the chips and the center node. */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {domains.map(({ label, angleDeg }, i) => {
            const rad = (angleDeg * Math.PI) / 180;
            const x = 50 + radiusXPct * Math.cos(rad);
            const y = 50 + radiusYPct * Math.sin(rad);
            return (
              <motion.line
                key={`line-${label}`}
                x1={50}
                y1={50}
                x2={x}
                y2={y}
                stroke="color-mix(in srgb, var(--color-primary) 30%, transparent)"
                strokeWidth={0.25}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.07, duration: 0.45 }}
              />
            );
          })}
          {/* Faint outer ring suggesting the orbit of the chips */}
          <ellipse
            cx={50}
            cy={50}
            rx={radiusXPct}
            ry={radiusYPct}
            fill="none"
            stroke="color-mix(in srgb, var(--color-primary) 14%, transparent)"
            strokeWidth={0.2}
            strokeDasharray="0.6 0.9"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Center node: the convergence point. Represents the "toolkit". */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(3.2rem, 5vw, 4.6rem)',
            height: 'clamp(3.2rem, 5vw, 4.6rem)',
            background: 'color-mix(in srgb, var(--color-primary) 14%, transparent)',
            border: '1.5px solid color-mix(in srgb, var(--color-primary) 55%, transparent)',
            boxShadow:
              '0 0 32px -6px color-mix(in srgb, var(--color-primary) 45%, transparent)',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.45 }}
        >
          <span
            style={{
              color: 'var(--color-primary)',
              fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.16em',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            TOOLKIT
          </span>
        </motion.div>

        {/* Domain chips positioned around the center. */}
        {domains.map(({ label, angleDeg }, i) => {
          const rad = (angleDeg * Math.PI) / 180;
          const xPct = 50 + radiusXPct * Math.cos(rad);
          const yPct = 50 + radiusYPct * Math.sin(rad);
          return (
            <DomainChip
              key={label}
              label={label}
              xPct={xPct}
              yPct={yPct}
              delay={1.1 + i * 0.08}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

const DomainChip: React.FC<{
  label: string;
  xPct: number;
  yPct: number;
  delay: number;
}> = ({ label, xPct, yPct, delay }) => {
  return (
    <motion.span
      className="absolute inline-flex items-center justify-center rounded-full text-center"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: 'translate(-50%, -50%)',
        color: 'var(--color-text)',
        background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
        border: '1.5px solid color-mix(in srgb, var(--color-primary) 42%, transparent)',
        padding: 'clamp(0.55rem, 0.9vw, 0.85rem) clamp(1rem, 1.6vw, 1.5rem)',
        fontSize: 'clamp(0.92rem, 1.15vw, 1.1rem)',
        fontWeight: 500,
        maxWidth: '38%',
        lineHeight: 1.15,
        boxShadow:
          '0 0 0 1px color-mix(in srgb, var(--color-primary) 8%, transparent)',
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
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
