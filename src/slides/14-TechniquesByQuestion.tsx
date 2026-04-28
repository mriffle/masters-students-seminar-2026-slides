import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 14 - Techniques, Grouped by the Question They Answer
 *
 * Editorial spine (per part2_present.md Slide 2.7 + SLIDES.md slide 14):
 *   The structure IS the lesson. Students should see decisions (questions),
 *   not nouns (technique names). The 2x2 quadrant grid headlines each
 *   bucket with a question; the techniques inside are demoted to small
 *   monospaced chips. Prereqs / beats / examples are quiet italic callouts
 *   inside the relevant quadrant -- pedagogical context, not main copy.
 *
 * Layout: a 2x2 quadrant grid filling the slide body. Each quadrant is a
 * card with a subtle accent-tinted border and the question as a large
 * headline in that accent color.
 *
 *   +-------------------------+-------------------------+
 *   | Q1 differential         | Q2 feature selection    |
 *   |   "What's different     |   "Which features       |
 *   |    between two groups?" |    actually matter?"    |
 *   |   chips...              |   chips...              |
 *   |   prereq: normalization |   example: Alzheimer's  |
 *   +-------------------------+-------------------------+
 *   | Q3 modeling             | Q4 exploration          |
 *   |   "Can I predict an     |   "What does my data    |
 *   |    outcome from         |    even look like?"     |
 *   |    features?"           |   chips...              |
 *   |   chips...              |                         |
 *   |   beats: regularization,|                         |
 *   |   cross-validation      |                         |
 *   +-------------------------+-------------------------+
 *
 * Color budget (4 accents, deliberate exception per the brief):
 *   This is a CHART-like slide where each quadrant needs to be visually
 *   distinct (the same way slide 12's donut uses multiple accents for
 *   segment differentiation). Per the slide brief, multiple accent colors
 *   are explicitly acceptable here.
 *
 *     Q1 differential analysis  -> --color-primary    (cyan, fundamental;
 *                                  this is the "first thing you do" in
 *                                  most analyses, fits the deck-wide
 *                                  "fundamentals" semantic of primary)
 *     Q2 feature selection      -> --color-tertiary   (violet, supporting)
 *     Q3 modeling / prediction  -> --color-amber      (intermediate; the
 *                                  amber over secondary choice keeps
 *                                  --color-secondary reserved for its
 *                                  deck-wide "domain knowledge / TEI-REX"
 *                                  meaning, which lands in slides 16-18
 *                                  and 23. Modeling is not domain
 *                                  knowledge; it's the mechanical layer
 *                                  domain knowledge informs.)
 *     Q4 exploration            -> --color-success    ("right approach"
 *                                  semantic -- exploring your data first
 *                                  IS the right approach, the prerequisite
 *                                  the speaker explicitly wishes more
 *                                  people did)
 *
 *   Tradeoff documented: the brief listed --color-secondary as an
 *   alternative for Q3, but --color-secondary is deck-wide "domain
 *   knowledge / TEI-REX" and reusing it here for "modeling/prediction"
 *   would weaken the recognition payoff in slides 16-18 and 23. The brief
 *   explicitly OKed --color-amber as the alternative; that's what we use.
 */

// ---------------------------------------------------------------------------
// Quadrant data
// ---------------------------------------------------------------------------

interface Quadrant {
  key: string;
  bucket: string; // small uppercase tag above the question
  question: string;
  techniques: string[];
  callout?: {
    label: 'Prereq' | 'Beats' | 'Example' | 'Canonical viz';
    text: string;
  }[];
  accent: string;
}

const QUADRANTS: Quadrant[] = [
  {
    key: 'differential',
    bucket: 'Differential analysis',
    question: "What's different between two groups?",
    techniques: ['t-tests', 'Mann-Whitney', 'limma'],
    callout: [
      { label: 'Canonical viz', text: 'volcano plots' },
      {
        label: 'Prereq',
        text: 'normalization (L1, median, MAD, VSN) — rarely taught, always needed',
      },
    ],
    accent: 'var(--color-primary)',
  },
  {
    key: 'features',
    bucket: 'Feature selection',
    question: 'Which features actually matter?',
    techniques: [
      'boruta',
      'OLS',
      'classifier-based importance',
      'regression-based importance',
    ],
    callout: [
      {
        label: 'Example',
        text: "finding proteins predictive of Alzheimer's",
      },
    ],
    accent: 'var(--color-tertiary)',
  },
  {
    key: 'modeling',
    bucket: 'Modeling / prediction',
    question: 'Can I predict an outcome from features?',
    techniques: ['elastic-net regression', 'logistic regression', 'xgboost'],
    callout: [
      {
        label: 'Beats',
        text: 'regularization (L1 / L2) — what it is, why it matters',
      },
      { label: 'Beats', text: 'cross-validation — non-negotiable' },
    ],
    accent: 'var(--color-amber)',
  },
  {
    key: 'exploration',
    bucket: 'Exploration',
    question: 'What does my data even look like?',
    techniques: [
      'bar / box plots',
      'PCA',
      'missingness',
      'scale checks',
      'metadata relationships',
    ],
    callout: [
      {
        label: 'Prereq',
        text: 'do this BEFORE reaching for anything else',
      },
    ],
    accent: 'var(--color-success)',
  },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const TechniquesByQuestion: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Decisions, not nouns.">
        Grouped by the Question They Answer
      </SlideTitle>

      <div className="w-full max-w-[92vw] flex flex-col items-center gap-3 mt-1">
        <div
          className="w-full grid grid-cols-2 grid-rows-2"
          style={{
            gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
            // Each row claims a healthy slice of the viewport so the grid
            // fills the body region instead of hugging its content. Tuned to
            // sit beneath the title and breathe at the bottom edge without
            // overflowing.
            gridAutoRows: 'minmax(0, 1fr)',
            height: 'clamp(30rem, 64vh, 44rem)',
          }}
        >
          {QUADRANTS.map((q, i) => (
            <QuadrantCard key={q.key} quadrant={q} delay={0.4 + i * 0.15} />
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// QuadrantCard
// ---------------------------------------------------------------------------

const QuadrantCard: React.FC<{ quadrant: Quadrant; delay: number }> = ({
  quadrant,
  delay,
}) => {
  const { bucket, question, techniques, callout, accent } = quadrant;

  return (
    <motion.div
      className="relative rounded-lg flex flex-col gap-3 overflow-hidden h-full"
      style={{
        background: 'var(--color-bg-card)',
        border: `1.5px solid color-mix(in srgb, ${accent} 38%, transparent)`,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} 10%, transparent), 0 0 36px -18px color-mix(in srgb, ${accent} 35%, transparent)`,
        padding: 'clamp(1.1rem, 2vw, 1.6rem) clamp(1.25rem, 2.2vw, 1.8rem)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Vertical accent bar on the left edge -- visual handle, echoes
          slide 11 / 13 conventions. */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: 3,
          background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 0%, transparent), color-mix(in srgb, ${accent} 70%, transparent), color-mix(in srgb, ${accent} 0%, transparent))`,
        }}
      />

      {/* Bucket tag — small uppercase mono caption, in accent */}
      <span
        className="font-mono"
        style={{
          color: accent,
          fontSize: 'clamp(0.7rem, 0.92vw, 0.9rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.85,
        }}
      >
        {bucket}
      </span>

      {/* Question headline — the lesson. Large, in the accent color. */}
      <h3
        className="font-semibold leading-tight"
        style={{
          color: accent,
          fontSize: 'clamp(1.25rem, 1.95vw, 1.85rem)',
        }}
      >
        &ldquo;{question}&rdquo;
      </h3>

      {/* Technique chips — small, monospaced, demoted */}
      <div className="flex flex-wrap gap-2 mt-1">
        {techniques.map((t) => (
          <TechniqueChip key={t} label={t} accent={accent} />
        ))}
      </div>

      {/* Callouts — italic muted text inside the quadrant */}
      {callout && callout.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-auto pt-2">
          {callout.map((c, i) => (
            <Callout key={i} label={c.label} text={c.text} accent={accent} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// TechniqueChip — small monospaced chip, demoted relative to the question
// ---------------------------------------------------------------------------

const TechniqueChip: React.FC<{ label: string; accent: string }> = ({
  label,
  accent,
}) => {
  return (
    <span
      className="inline-flex items-center font-mono rounded"
      style={{
        color: 'var(--color-text)',
        background: `color-mix(in srgb, ${accent} 6%, transparent)`,
        border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
        padding: 'clamp(0.28rem, 0.45vw, 0.4rem) clamp(0.65rem, 0.95vw, 0.9rem)',
        fontSize: 'clamp(0.82rem, 1.05vw, 1rem)',
        opacity: 0.92,
      }}
    >
      {label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Callout — italic muted line with a tiny tag (Prereq / Beats / Example)
// ---------------------------------------------------------------------------

const Callout: React.FC<{
  label: 'Prereq' | 'Beats' | 'Example' | 'Canonical viz';
  text: string;
  accent: string;
}> = ({ label, text, accent }) => {
  return (
    <p
      className="leading-snug italic flex items-baseline gap-2"
      style={{
        color: 'var(--color-text-muted)',
        fontSize: 'clamp(0.85rem, 1.05vw, 1.02rem)',
        opacity: 0.92,
      }}
    >
      <span
        className="font-mono not-italic flex-shrink-0"
        style={{
          color: accent,
          fontSize: 'clamp(0.7rem, 0.88vw, 0.85rem)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          opacity: 0.85,
        }}
      >
        {label}
      </span>
      <span>{text}</span>
    </p>
  );
};

export default TechniquesByQuestion;
