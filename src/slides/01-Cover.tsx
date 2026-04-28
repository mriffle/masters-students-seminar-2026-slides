import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 01 — Cover
 *
 * Wordmark-scale title with per-segment coloring:
 *   - "no 'right' path"               -> primary  (Part 1's argument)
 *   - "skills to focus on in the age of AI" -> secondary (Part 3's argument)
 *   - everything else                 -> muted text
 *
 * A faint constellation of branching paths in the background hints at the
 * trajectory motif that lands fully on slides 03-07. It must stay subtle
 * here -- this slide plants the motif, it does not establish it.
 */

// A small, hand-tuned set of branching paths. Each path starts at a left-side
// origin, walks rightward through a couple of fork nodes, and ends off-screen.
// All strokes are very low opacity so they read as atmosphere, not diagram.
type PathSpec = {
  d: string;
  // node positions for tiny intersection dots
  nodes: Array<[number, number]>;
};

const BACKGROUND_PATHS: PathSpec[] = [
  {
    d: 'M -20 120 C 180 100, 260 220, 460 210 S 760 140, 1020 180',
    nodes: [
      [260, 220],
      [460, 210],
    ],
  },
  {
    d: 'M -20 320 C 200 320, 320 240, 520 280 S 820 360, 1020 320',
    nodes: [
      [320, 240],
      [520, 280],
    ],
  },
  {
    d: 'M -20 460 C 220 480, 380 380, 600 420 S 880 500, 1020 470',
    nodes: [
      [380, 380],
      [600, 420],
    ],
  },
  {
    d: 'M 60 60 C 200 180, 360 80, 520 200',
    nodes: [[360, 80]],
  },
  {
    d: 'M 980 540 C 820 460, 660 540, 500 460',
    nodes: [[660, 540]],
  },
];

const Cover: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      {/* Background motif: a faint, atmospheric set of branching paths.
          Pointer-events disabled so it never interferes; opacity kept low so
          the title carries the slide. The full motif lands on slides 03-07. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="cover-vignette" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="var(--color-bg)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {BACKGROUND_PATHS.map((p, i) => (
            <motion.path
              key={`path-${i}`}
              d={p.d}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={1.2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.12 }}
              transition={{
                delay: 0.6 + i * 0.18,
                duration: 1.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}

          {/* Tiny intersection dots where the paths fork. They mark the
              "intersections" idea without naming it -- a planting gesture. */}
          {BACKGROUND_PATHS.flatMap((p, i) =>
            p.nodes.map(([cx, cy], j) => (
              <motion.circle
                key={`node-${i}-${j}`}
                cx={cx}
                cy={cy}
                r={2.5}
                fill="var(--color-primary)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.35, scale: 1 }}
                transition={{
                  delay: 1.0 + i * 0.18 + j * 0.08,
                  duration: 0.5,
                }}
              />
            ))
          )}

          {/* Vignette darkens the edges so the title sits cleanly in the
              center without the paths competing. */}
          <rect x="0" y="0" width="1000" height="600" fill="url(#cover-vignette)" />
        </svg>
      </div>

      {/* Foreground: the title is the wordmark. Authored directly (not via
          SlideTitle) because the entire title IS the slide. */}
      <div className="relative z-10 w-full max-w-[92vw] flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="font-black tracking-tight leading-[1.05] text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ color: 'var(--color-text)' }}
        >
          <span style={{ color: 'var(--color-text-muted)' }}>There's </span>
          <span style={{ color: 'var(--color-primary)' }}>no &ldquo;right&rdquo; path</span>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {' '}
            to a career in data science
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}> &mdash; and </span>
          <span style={{ color: 'var(--color-secondary)' }}>
            skills to focus on in the age of AI
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>.</span>
        </motion.h1>

        {/* A thin accent rule, half cyan / half magenta, ties the two
            colored phrases together typographically without a third color. */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 h-[2px] w-40 origin-center"
          style={{
            background:
              'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            opacity: 0.7,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-1"
        >
          <p
            className="text-xl md:text-2xl font-semibold tracking-wide"
            style={{ color: 'var(--color-text)' }}
          >
            Michael Riffle
          </p>
          <p
            className="text-base md:text-lg font-light tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Senior Research Scientist
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-1.5 font-mono"
        >
          <a
            href="https://www.linkedin.com/in/mikeriffle/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base tracking-wide transition-colors hover:opacity-90"
            style={{ color: 'var(--color-primary)' }}
          >
            https://www.linkedin.com/in/mikeriffle/
          </a>
          <a
            href="https://github.com/mriffle/masters-students-seminar-2026-slides"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base tracking-wide transition-colors hover:opacity-90"
            style={{ color: 'var(--color-secondary)' }}
          >
            https://github.com/mriffle/masters-students-seminar-2026-slides
          </a>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default Cover;
