import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 15 — Simple Usually Wins
 *
 * The contrarian punchline of Part 2. The most quotable single message in this
 * section, given its own slide so it doesn't drown in the technique list of 14.
 *
 * Editorial spine (per part2_present.md Slide 2.8 + SLIDES.md slide 15):
 *   Verbatim hero quote (load-bearing, must appear word-for-word):
 *     "Often, simple, canonical methods are enough.
 *      No need to explore more complex methods if simple ones work."
 *
 *   Load-bearing follow-on (the second beat — supporting text):
 *     "The real skill is knowing when the simple tool is enough
 *      and when it isn't."
 *
 *   Tool-selection tree carrying the visual: a wide trunk labeled "Simple,
 *   canonical methods" holds ~80% of the visual weight in glowing --color-primary.
 *   A narrower escalation branch ("when simple isn't enough") leads upward to a
 *   small cluster of chips — GAM, SVM, occasional deep learning — in
 *   --color-tertiary. The 80/20 visual ratio mirrors the message: simple
 *   dominates, escalation is the exception.
 *
 *   Optional brief callout: visualization conventions (volcano plots, PCA,
 *   normalizations) are CULTURAL — knowing your audience's conventions is part
 *   of the skill. Sits as a quiet mono caption at the bottom.
 *
 * Layout: authored wordmark layout (no SlideTitle). The quote IS the hero.
 *   - Section marker top-left ("Part 2 · 15") in muted primary, matching
 *     slide 09's grammar.
 *   - Verbatim quote centered, wordmark-scale. Two key phrases highlighted in
 *     --color-primary: "simple, canonical methods" and "are enough".
 *   - Follow-on "real skill" line below the quote in muted text, italic, with
 *     the word "knowing" lit in primary as the load-bearing concept.
 *   - Tool-selection tree fills the lower band. Wide primary trunk on the left
 *     and the escalation branch with tertiary chips peeling off to the right.
 *   - Cultural-conventions caption tucked into the bottom-right corner, mono,
 *     small.
 *
 * Color budget (3 accents — primary, tertiary, muted):
 *   --color-primary    — the wide trunk, the verbatim quote emphasis, the
 *                        "knowing" word in the follow-on. The "fundamentals"
 *                        semantic of primary maps cleanly onto "simple,
 *                        canonical methods".
 *   --color-tertiary   — escalation branch chips (GAM, SVM, deep learning).
 *                        Per the deck-wide convention, tertiary = "supporting
 *                        visual / AI tooling" — and these escalation tools are
 *                        exactly that: supporting, occasional, not the main
 *                        story.
 *   --color-text-muted — supporting text, "when simple isn't enough"
 *                        annotation, cultural-conventions caption.
 *   --color-text       — body of the quote.
 *
 * Tradeoffs / open questions documented at end of file.
 */

// ---------------------------------------------------------------------------
// Tool-selection tree geometry
// ---------------------------------------------------------------------------
// viewBox is wider than tall — the tree is more horizontal river than upright
// tree. The trunk runs left-to-right (a heavy primary band), and the
// escalation branch peels UP-and-to-the-RIGHT off the trunk near its end.
// That left-to-right flow reads as "you start simple, and only when simple
// isn't enough do you branch upward". The visual weight is dominated by the
// trunk; the branch is small, narrower, set in tertiary so it visibly recedes.

// viewBox is sized so the trunk (left ~70%) + escalation chip cluster on the
// right both fit comfortably with margin. Widened from 1000 -> 1200 to give
// the wide "occasional deep learning" chip room without clipping.
const VB = { w: 1200, h: 360 };

// Trunk: a fat horizontal slab carrying ~80% of the slide's visual weight.
const TRUNK = {
  x1: 60,
  x2: 800,        // trunk extends to ~67% of the new wider viewBox
  yTop: 240,
  yBottom: 300,   // 60px tall — heavy
};

// Branch: peels UP-and-to-the-right off the trunk's upper edge near its end.
// Narrower (~16px tall), lifts to a higher band where the chips sit.
const BRANCH = {
  startX: 680,    // where the branch leaves the trunk
  startY: 240,
  midX: 820,      // bend point
  midY: 150,
  endX: 980,      // chip cluster anchor (leaves >200px of right margin for chip widths)
  endY: 120,
  width: 16,      // visibly narrower than the trunk
};

// Escalation chips — three tools, in tertiary.
const CHIPS: { label: string }[] = [
  { label: 'GAM' },
  { label: 'SVM' },
  { label: 'occasional deep learning' },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const SimpleWins: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="relative w-full max-w-[92vw] h-[80vh] flex flex-col items-stretch justify-start">
        {/* --- Section marker (top-left) --- */}
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

        {/* --- Hero verbatim quote --- */}
        <motion.div
          className="relative z-10 mt-12 md:mt-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="font-bold leading-[1.12] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] max-w-[88vw]"
            style={{ color: 'var(--color-text)' }}
          >
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &ldquo;
            </span>
            Often,{' '}
            <span style={{ color: 'var(--color-primary)' }}>
              simple, canonical methods
            </span>{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              are enough
            </span>
            . No need to explore more complex methods if simple ones work.
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>

          {/* Thin accent rule under the quote (single-color, primary). */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 h-[2px] w-24 origin-center"
            style={{ background: 'var(--color-primary)', opacity: 0.55 }}
          />

          {/* Follow-on "real skill" line — supporting text. */}
          <motion.p
            className="mt-5 text-lg md:text-xl lg:text-2xl font-light italic max-w-[68vw] leading-snug"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            The real skill is{' '}
            <span
              style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 600 }}
            >
              knowing
            </span>{' '}
            when the simple tool is enough and when it isn&rsquo;t.
          </motion.p>
        </motion.div>

        {/* --- Tool-selection tree --- */}
        {/* The tree fills the lower band of the slide. Constrained max-width
            so the SVG never grows so wide that the right-side chips push out
            of the visible slide area, and enough vertical room (h-[34vh]) so
            the tree visibly fills the space between the follow-on line and
            the cultural footer caption (eliminating the prior mid-slide
            void). */}
        <div className="relative w-full max-w-[78vw] mx-auto mt-4 md:mt-6 h-[34vh]">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
            aria-label="Tool selection tree: a wide trunk of simple canonical methods, with a smaller escalation branch leading to GAM, SVM, and occasional deep learning"
          >
            <defs>
              {/* Glow for the trunk + trunk label. */}
              <filter
                id="simple-wins-trunk-glow"
                x="-20%"
                y="-50%"
                width="140%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Subtle horizontal gradient on the trunk so it reads as a
                  "river" with directionality, not a static slab. */}
              <linearGradient id="simple-wins-trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                <stop offset="55%" stopColor="var(--color-primary)" stopOpacity={0.32} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.22} />
              </linearGradient>
              {/* Soft glow + faint gradient for the branch (tertiary, dimmer). */}
              <linearGradient id="simple-wins-branch-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity={0.28} />
              </linearGradient>
            </defs>

            {/* --- TRUNK (wide, glowing primary, ~80% of visual weight) --- */}
            <motion.g
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.45, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: `${TRUNK.x1}px ${(TRUNK.yTop + TRUNK.yBottom) / 2}px` }}
            >
              <rect
                x={TRUNK.x1}
                y={TRUNK.yTop}
                width={TRUNK.x2 - TRUNK.x1}
                height={TRUNK.yBottom - TRUNK.yTop}
                rx={14}
                fill="url(#simple-wins-trunk-grad)"
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.7}
                filter="url(#simple-wins-trunk-glow)"
              />
              {/* Inner highlight band for depth. */}
              <rect
                x={TRUNK.x1 + 4}
                y={TRUNK.yTop + 4}
                width={TRUNK.x2 - TRUNK.x1 - 8}
                height={4}
                rx={2}
                fill="var(--color-primary)"
                fillOpacity={0.35}
              />
            </motion.g>

            {/* Trunk label — sits inside the trunk, large, primary. */}
            <motion.text
              x={(TRUNK.x1 + TRUNK.x2) / 2 - 60}
              y={(TRUNK.yTop + TRUNK.yBottom) / 2}
              fill="var(--color-primary)"
              fontSize={32}
              fontWeight={700}
              letterSpacing={1.4}
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#simple-wins-trunk-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.85, duration: 0.5 }}
            >
              Simple, canonical methods
            </motion.text>

            {/* "~80% of the work" hint — small mono caption beneath the trunk.
                Bumped opacity 0.6 -> 0.95 and font size 13 -> 17 so the chip
                list reads cleanly at presentation distance. */}
            <motion.text
              x={(TRUNK.x1 + TRUNK.x2) / 2 - 60}
              y={TRUNK.yBottom + 30}
              fill="var(--color-primary)"
              fontSize={17}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing={2}
              textAnchor="middle"
              fillOpacity={0.95}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
            >
              t-tests &middot; OLS &middot; elastic net &middot; logistic &middot; xgboost
            </motion.text>

            {/* --- ESCALATION BRANCH (narrower, tertiary) --- */}
            {/* The branch peels off the trunk's upper edge near its end and
                rises up-and-to-the-right toward the chip cluster. Drawn as a
                narrow tapered band so its visual weight is unmistakably less
                than the trunk's. */}
            <motion.path
              d={(() => {
                // Build a tapered band from (startX, startY) up through the
                // bend (midX, midY) to (endX, endY), with width `BRANCH.width`.
                // Quadratic Bezier on each side, offset perpendicular to the
                // axis. Approximate: just use a thick stroked path; visually
                // identical and simpler.
                return `M ${BRANCH.startX} ${BRANCH.startY} Q ${BRANCH.midX} ${BRANCH.midY} ${BRANCH.endX} ${BRANCH.endY}`;
              })()}
              fill="none"
              stroke="url(#simple-wins-branch-grad)"
              strokeWidth={BRANCH.width}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Branch outline — thin tertiary stroke for definition. */}
            <motion.path
              d={`M ${BRANCH.startX} ${BRANCH.startY} Q ${BRANCH.midX} ${BRANCH.midY} ${BRANCH.endX} ${BRANCH.endY}`}
              fill="none"
              stroke="var(--color-tertiary)"
              strokeWidth={1.25}
              strokeOpacity={0.55}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.15, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Branch annotation — "when simple isn't enough" — muted, italic,
                set near the bend. */}
            <motion.text
              x={BRANCH.midX - 6}
              y={BRANCH.midY - 22}
              fill="var(--color-text-muted)"
              fontSize={17}
              fontStyle="italic"
              textAnchor="middle"
              fillOpacity={0.95}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.55, duration: 0.5 }}
            >
              when simple isn&rsquo;t enough
            </motion.text>

            {/* --- Escalation chips (tertiary) --- */}
            {CHIPS.map((chip, i) => {
              // Stack chips vertically near the branch endpoint. Spread is
              // 40px between chips so the cluster reads clearly without
              // overlap; chipX is the chip cluster anchor with a small inset
              // from the branch endpoint.
              const chipX = BRANCH.endX + 8;
              const chipY = BRANCH.endY - 36 + i * 44;
              const chipWidth = chip.label.length * 9.5 + 32;
              const chipHeight = 32;
              return (
                <motion.g
                  key={chip.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.7 + i * 0.13, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <rect
                    x={chipX - chipWidth / 2}
                    y={chipY - chipHeight / 2}
                    width={chipWidth}
                    height={chipHeight}
                    rx={chipHeight / 2}
                    fill="var(--color-tertiary)"
                    fillOpacity={0.14}
                    stroke="var(--color-tertiary)"
                    strokeWidth={1.4}
                    strokeOpacity={0.7}
                  />
                  <text
                    x={chipX}
                    y={chipY + 1}
                    fill="var(--color-tertiary)"
                    fontSize={16}
                    fontWeight={600}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    letterSpacing={0.8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {chip.label}
                  </text>
                </motion.g>
              );
            })}

            {/* "made easy with scikit-learn" — tiny aside under the deep
                learning chip, the speaker's own framing. Mono, small,
                muted. */}
            <motion.text
              x={BRANCH.endX + 8}
              y={BRANCH.endY - 36 + (CHIPS.length - 1) * 44 + 36}
              fill="var(--color-text-muted)"
              fontSize={13}
              fontStyle="italic"
              textAnchor="middle"
              fillOpacity={0.9}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.5 }}
            >
              (made easy with scikit-learn)
            </motion.text>
          </svg>
        </div>

        {/* --- Cultural-conventions footer caption --- */}
        {/* The visualization-conventions point per the brief: volcano plots,
            PCA, normalizations are CULTURAL — knowing your audience's
            conventions is part of the skill. Anchored in the bottom-right as
            a quiet aside so it lands without competing with the hero quote.
            Sizes bumped (and z-index raised) so it isn't visually clipped or
            overlapped by the tree SVG above. */}
        <motion.div
          className="absolute bottom-0 right-0 flex items-baseline gap-3 max-w-[52vw] text-right z-20"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.25, duration: 0.55 }}
        >
          <span
            className="font-mono uppercase tracking-[0.22em] flex-shrink-0"
            style={{
              color: 'var(--color-tertiary)',
              fontSize: 'clamp(0.75rem, 0.95vw, 0.95rem)',
              opacity: 0.95,
            }}
          >
            Also cultural
          </span>
          <span
            className="italic leading-snug"
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
              opacity: 0.95,
            }}
          >
            volcano plots, PCA, normalizations &mdash; knowing your audience&rsquo;s
            conventions is part of the skill.
          </span>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default SimpleWins;

/*
 * Tradeoffs / open questions:
 *
 *  - Tree orientation. The brief calls the visual a "tree" with a "trunk" and
 *    an "escalation branch leading upward". A literal vertical tree (trunk
 *    pointing up, branch peeling sideways) read as too botanical and used the
 *    slide's vertical real estate inefficiently — the wordmark quote needs the
 *    upper two-thirds. Chose a horizontal "river" (left-to-right trunk, branch
 *    peeling up-and-right) which preserves the 80/20 weight ratio, reads
 *    left-to-right as "you start simple; only when that fails do you escalate
 *    upward", and fits a short horizontal SVG band cleanly under the quote.
 *
 *  - Verbatim source ambiguity. SLIDES.md and the brief both render the quote
 *    as: "Often, simple, canonical methods are enough." (with a comma after
 *    "Often,"). The Raw Material section of part2_present.md drops the comma:
 *    "Often simple, canonical methods are enough." Followed the brief's
 *    explicit verbatim form (with the comma), since the brief flagged it as
 *    load-bearing word-for-word.
 *
 *  - Color budget. Used three accents (--color-primary, --color-tertiary,
 *    --color-text-muted) plus body --color-text. Within the briefing's
 *    "2-3 accents" guideline.
 *
 *  - Cultural-conventions callout placement. Brief said "optional small
 *    callout if space permits". Kept it small in the bottom-right; reads as a
 *    footnote, not a competing message. If the reviewer wants it removed for
 *    a cleaner punchline, deletion is a single block.
 *
 *  - Chip text width. Computed from label length (8.5px per char + 28px
 *    padding). Works for the three current chips; if labels change, the rough
 *    sizing may need tuning.
 */
