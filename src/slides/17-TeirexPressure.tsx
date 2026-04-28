import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 17 — Case Study: TEI-REX (2/3) — The Pressure
 *
 * Middle slide of the TEI-REX case study (slides 16 / 17 / 18).
 *
 * Editorial spine (per part2_present.md Slide 2.10 + SLIDES.md slide 17):
 *
 *   Multi-phase competition structure:
 *     - Each phase: team gets time to develop methods → hundreds of blinded
 *       samples shipped → team classifies/regresses → results sent back and
 *       evaluated → only top teams advance to the next, harder phase.
 *     - Each phase escalates: lower doses, more covariates (sex, genetic
 *       diversity).
 *     - Tight timelines and deadlines.
 *
 *   Two verbatim quotes (must appear word-for-word as pull-quotes in mono):
 *     1. "You didn't have much time to just try things out."
 *     2. "You had to decide and pivot immediately if things weren't working."
 *
 *   The "decide and pivot immediately" line is the load-bearing skill that
 *   course projects don't teach. This is the slide's emotional core.
 *
 * Visual concept — a NARROWING-FUNNEL phase diagram:
 *
 *   Four stacked horizontal bars, each labeled "Phase N", growing narrower
 *   top-to-bottom and tinted progressively darker (secondary → secondary mixed
 *   with danger at low opacity). Each bar carries:
 *     - Phase N label
 *     - Difficulty escalation cue ("baseline doses", "lower doses",
 *       "more covariates", "tightest timeline")
 *     - "samples shipped" marker (constant — hundreds of blinded samples each
 *       round, growing slightly to telegraph escalation)
 *     - "teams remaining" indicator — shrinking dot count (4 → 3 → 2 → 1).
 *       The narrowing funnel IS the visual: teams getting eliminated.
 *
 *   Phase 4 is the narrowest — the speaker's team alone (foreshadows slide 18's
 *   "only team to last").
 *
 * Color budget (3 accents):
 *   --color-secondary  — TEI-REX project color: phase bars, header chip
 *   --color-danger     — escalating intensity tint (low opacity, applied
 *                        progressively across phases as pressure mounts)
 *   --color-text-muted — supporting labels, sample-count chips
 *
 * Visual continuity with slide 16:
 *   The TEI-REX header chip (top-right; magenta border + magenta text + faint
 *   magenta wash + soft glow box-shadow) is reused verbatim from slide 16.
 *   Same project color (--color-secondary) territory.
 *
 * Layout (two columns):
 *   - SlideTitle at the top
 *   - Left ~63% column: Funnel of four phase bars + "ONE TEAM REMAINS" caption
 *   - Right ~37% column: TEI-REX header chip + two verbatim pull-quotes set
 *     in mono, treated prominently as the emotional anchor.
 */

// ---------------------------------------------------------------------------
// Phase data — 4 phases, narrowing as teams get eliminated.
// ---------------------------------------------------------------------------

interface Phase {
  n: number;
  /** Bar width as a fraction of the SVG viewBox width. Narrows top→bottom. */
  widthPct: number;
  /** Vertical center y-coordinate within the funnel SVG. */
  cy: number;
  /** Difficulty / escalation cue line. */
  escalation: string;
  /** Hundreds of blinded samples shipped — string for compact display. */
  samples: string;
  /** Number of teams remaining at this phase. */
  teamsRemaining: number;
  /** Mix of danger tint applied to this phase's secondary base (0..1). */
  dangerMix: number;
}

const PHASES: Phase[] = [
  {
    n: 1,
    widthPct: 1.0,
    cy: 70,
    escalation: 'baseline doses · basic covariates',
    samples: 'hundreds of blinded samples',
    teamsRemaining: 4,
    dangerMix: 0.0,
  },
  {
    n: 2,
    widthPct: 0.88,
    cy: 168,
    escalation: 'lower doses',
    samples: 'hundreds of blinded samples',
    teamsRemaining: 3,
    dangerMix: 0.18,
  },
  {
    n: 3,
    widthPct: 0.76,
    cy: 266,
    escalation: 'more covariates · sex, genetic diversity',
    samples: 'hundreds of blinded samples',
    teamsRemaining: 2,
    dangerMix: 0.36,
  },
  {
    n: 4,
    widthPct: 0.64,
    cy: 364,
    escalation: 'tightest timeline · everything escalated',
    samples: 'hundreds of blinded samples',
    teamsRemaining: 1,
    dangerMix: 0.55,
  },
];

const FUNNEL_VB = { w: 1000, h: 460 };
const BAR_HEIGHT = 78;

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const TeirexPressure: React.FC<SlideProps> = () => {
  const VB = FUNNEL_VB;

  return (
    <SlideContainer>
      <SlideTitle subtitle="Phases. Eliminations. No time to try things out.">
        TEI-REX (2/3): The Pressure
      </SlideTitle>

      <div className="relative w-full max-w-[92vw] h-[70vh] flex flex-row items-stretch gap-[2vw] pb-[3vh]">
        {/* ====================================================== */}
        {/* LEFT COLUMN — funnel diagram + ONE TEAM REMAINS caption  */}
        {/* ====================================================== */}
        <div className="relative flex flex-col items-stretch flex-[1.7_1_0%] min-w-0">
          {/* --- Narrowing-funnel phase diagram --- */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Narrowing-funnel phase diagram. Four stacked horizontal bars labeled Phase 1 through Phase 4. Each bar narrows top-to-bottom, tinted progressively darker. Each phase shows an escalation cue, samples shipped (hundreds of blinded samples), and teams remaining as a row of dots, shrinking from four to one."
            >
              <defs>
                <filter
                  id="teirex-pressure-glow"
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

                <marker
                  id="teirex-pressure-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <polygon
                    points="0,0 10,5 0,10"
                    fill="var(--color-text-muted)"
                    fillOpacity={0.85}
                  />
                </marker>
              </defs>

              {/* Vertical "PRESSURE" axis cue down the left margin —
                  sets the mental frame for the funnel. */}
              <motion.text
                x={26}
                y={VB.h / 2}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing={4}
                fill="var(--color-text-muted)"
                fillOpacity={0.92}
                transform={`rotate(-90 26 ${VB.h / 2})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.92 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                PRESSURE INCREASES
              </motion.text>

              {/* Connector arrow on the left, top to bottom, indicating
                  escalation direction. */}
              <motion.line
                x1={56}
                y1={PHASES[0].cy - BAR_HEIGHT / 2 + 8}
                x2={56}
                y2={PHASES[PHASES.length - 1].cy + BAR_HEIGHT / 2 - 8}
                stroke="var(--color-text-muted)"
                strokeWidth={1.5}
                strokeOpacity={0.55}
                strokeDasharray="3 4"
                markerEnd="url(#teirex-pressure-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* ============================================================ */}
              {/* PHASE BARS (the funnel)                                       */}
              {/* ============================================================ */}
              {PHASES.map((p, i) => {
                // Available bar zone: leaves room for the pressure axis on the left.
                const barZoneLeft = 80;
                const barZoneRight = VB.w - 10;
                const barZoneWidth = barZoneRight - barZoneLeft;
                const barWidth = barZoneWidth * p.widthPct;
                // Bars left-aligned within the zone — keeps the phase label
                // column stable while the right edge narrows (pure funnel).
                const barLeft = barZoneLeft + (barZoneWidth - barWidth) / 2;
                const barTop = p.cy - BAR_HEIGHT / 2;

                // Compute danger-tint overlay opacity scaling with dangerMix.
                const dangerOverlay = p.dangerMix; // 0..1

                // Three dedicated horizontal slots inside each bar:
                //   [Phase N + escalation]  |  [SAMPLES SHIPPED + value]  |  [TEAMS REMAINING + dots + count]
                const phaseColX = barLeft + 24;
                const phaseColRight = barLeft + barWidth * 0.42;

                const samplesColCenter = barLeft + barWidth * 0.62;

                const teamsColRight = barLeft + barWidth - 22;
                const dotR = 5.5;
                const dotGap = 16;
                const dotsAreaRight = teamsColRight;
                const dotsAreaLeft = dotsAreaRight - (4 - 1) * dotGap;

                // Vertical divider lines between the three columns to
                // reinforce the slot structure (very faint).
                const divider1X = (phaseColRight + samplesColCenter - 60) / 2 + 30;
                const divider2X = (samplesColCenter + (dotsAreaLeft - dotR - 14)) / 2;

                return (
                  <motion.g
                    key={`phase-${p.n}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9 + i * 0.18,
                      duration: 0.55,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {/* Base bar — secondary fill, low opacity */}
                    <rect
                      x={barLeft}
                      y={barTop}
                      width={barWidth}
                      height={BAR_HEIGHT}
                      rx={14}
                      fill="var(--color-secondary)"
                      fillOpacity={0.1 + i * 0.04}
                      stroke="var(--color-secondary)"
                      strokeWidth={2}
                      strokeOpacity={0.85}
                      filter="url(#teirex-pressure-glow)"
                    />
                    {/* Danger-tint overlay — escalates with phase */}
                    {dangerOverlay > 0 && (
                      <rect
                        x={barLeft}
                        y={barTop}
                        width={barWidth}
                        height={BAR_HEIGHT}
                        rx={14}
                        fill="var(--color-danger)"
                        fillOpacity={dangerOverlay * 0.18}
                        stroke="none"
                        pointerEvents="none"
                      />
                    )}

                    {/* Faint vertical dividers between the three internal columns */}
                    <line
                      x1={divider1X}
                      y1={barTop + 14}
                      x2={divider1X}
                      y2={barTop + BAR_HEIGHT - 14}
                      stroke="var(--color-text-muted)"
                      strokeOpacity={0.15}
                      strokeWidth={1}
                    />
                    <line
                      x1={divider2X}
                      y1={barTop + 14}
                      x2={divider2X}
                      y2={barTop + BAR_HEIGHT - 14}
                      stroke="var(--color-text-muted)"
                      strokeOpacity={0.15}
                      strokeWidth={1}
                    />

                    {/* --- Column 1: Phase N + escalation cue --- */}
                    <text
                      x={phaseColX}
                      y={p.cy - 8}
                      textAnchor="start"
                      dominantBaseline="middle"
                      fontSize={20}
                      fontWeight={800}
                      fill="var(--color-secondary)"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Phase {p.n}
                    </text>
                    <text
                      x={phaseColX}
                      y={p.cy + 16}
                      textAnchor="start"
                      dominantBaseline="middle"
                      fontSize={11.5}
                      fontStyle="italic"
                      fill="var(--color-text-muted)"
                      fillOpacity={0.95}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {p.escalation}
                    </text>

                    {/* --- Column 2: SAMPLES SHIPPED + value --- */}
                    <text
                      x={samplesColCenter}
                      y={p.cy - 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9.5}
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fill="var(--color-text-muted)"
                      fillOpacity={0.75}
                      letterSpacing={1.8}
                    >
                      SAMPLES SHIPPED
                    </text>
                    <text
                      x={samplesColCenter}
                      y={p.cy + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={11.5}
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fill="var(--color-text)"
                      fillOpacity={0.92}
                      letterSpacing={0.6}
                    >
                      {p.samples}
                    </text>

                    {/* --- Column 3: TEAMS REMAINING (header + dots + count) --- */}
                    <text
                      x={dotsAreaRight + dotR + 4}
                      y={p.cy - 18}
                      textAnchor="end"
                      fontSize={9.5}
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fill="var(--color-text-muted)"
                      fillOpacity={0.75}
                      letterSpacing={1.8}
                    >
                      TEAMS REMAINING
                    </text>
                    {[0, 1, 2, 3].map((d) => {
                      const cx = dotsAreaLeft + d * dotGap;
                      const isAlive = d < p.teamsRemaining;
                      return (
                        <circle
                          key={`p${p.n}-dot-${d}`}
                          cx={cx}
                          cy={p.cy + 2}
                          r={dotR}
                          fill={
                            isAlive
                              ? 'var(--color-secondary)'
                              : 'var(--color-text-muted)'
                          }
                          fillOpacity={isAlive ? 0.95 : 0.18}
                          stroke={
                            isAlive
                              ? 'var(--color-secondary)'
                              : 'var(--color-text-muted)'
                          }
                          strokeWidth={1.25}
                          strokeOpacity={isAlive ? 1 : 0.35}
                          filter={isAlive ? 'url(#teirex-pressure-glow)' : undefined}
                        />
                      );
                    })}
                    {/* Numeric badge to reinforce the count */}
                    <text
                      x={dotsAreaRight + dotR + 4}
                      y={p.cy + 18}
                      textAnchor="end"
                      fontSize={12}
                      fontWeight={700}
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fill="var(--color-secondary)"
                      fillOpacity={0.95}
                      letterSpacing={0.5}
                    >
                      {p.teamsRemaining} of 4
                    </text>
                  </motion.g>
                );
              })}

              {/* "only team to last" foreshadow — small caret pointing at Phase 4
                  from below, in muted text. Lands as a quiet setup for slide 18. */}
              <motion.text
                x={VB.w / 2}
                y={PHASES[3].cy + BAR_HEIGHT / 2 + 32}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing={3}
                fill="var(--color-text-muted)"
                fillOpacity={0.9}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.95, duration: 0.5 }}
              >
                ONE TEAM REMAINS
              </motion.text>
            </svg>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN — TEI-REX chip + verbatim pull-quotes       */}
        {/* ====================================================== */}
        <div className="relative flex flex-col items-stretch flex-[1_1_0%] min-w-0 max-w-[34vw] gap-[2.5vh]">
          {/* --- TEI-REX header chip (reused from slide 16) --- */}
          <motion.div
            className="flex flex-col items-end gap-2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="px-5 py-1.5 rounded-full font-bold tracking-[0.28em] text-base md:text-lg uppercase"
              style={{
                color: 'var(--color-secondary)',
                border: '2px solid var(--color-secondary)',
                background: 'rgba(255, 45, 120, 0.08)',
                boxShadow: '0 0 24px rgba(255, 45, 120, 0.25)',
              }}
            >
              TEI-REX
            </div>
            <div
              className="text-xs md:text-sm font-mono tracking-wider text-right"
              style={{ color: 'var(--color-text-muted)' }}
            >
              multi-phase &middot; head-to-head &middot; tight timelines
            </div>
          </motion.div>

          {/* --- Two verbatim pull-quotes (mono, prominent) --- */}
          <motion.div
            className="flex flex-col gap-[2vh] flex-1 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <PullQuote
              text={'"You didn’t have much time to just try things out."'}
            />
            <PullQuote
              text={'"You had to decide and pivot immediately if things weren’t working."'}
              emphasized
            />
          </motion.div>
        </div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Pull-quote component — verbatim quote treated as a prominent mono pull-quote
// with a left magenta accent rail. The second quote ("decide and pivot") is
// the load-bearing one and gets a slightly stronger glow.
// ---------------------------------------------------------------------------

const PullQuote: React.FC<{ text: string; emphasized?: boolean }> = ({
  text,
  emphasized = false,
}) => {
  return (
    <div
      className="flex items-stretch"
      style={{
        background: 'var(--color-bg-card)',
        borderRadius: 12,
        border: emphasized
          ? '1.5px solid var(--color-secondary)'
          : '1px solid rgba(255, 45, 120, 0.45)',
        boxShadow: emphasized
          ? '0 0 26px rgba(255, 45, 120, 0.28)'
          : '0 0 14px rgba(255, 45, 120, 0.12)',
        overflow: 'hidden',
      }}
    >
      {/* Left magenta accent rail */}
      <div
        style={{
          width: 4,
          background: 'var(--color-secondary)',
          opacity: emphasized ? 0.95 : 0.7,
          flexShrink: 0,
        }}
      />
      <p
        className="px-4 py-3 text-sm md:text-base leading-snug"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          color: 'var(--color-text)',
          letterSpacing: '0.01em',
          fontWeight: emphasized ? 600 : 500,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default TeirexPressure;

/*
 * Tradeoffs / open questions:
 *
 *  - Funnel encoding. Three signals are layered onto the same bar: bar width
 *    (narrows = elimination), color tint (secondary → +danger overlay = rising
 *    pressure), and dot count (filled dots = teams remaining). All three reach
 *    the same conclusion (the funnel narrows, pressure mounts, teams drop
 *    out). I judged that redundant encoding is appropriate here because the
 *    elimination is the slide's core visual lesson, but a reviewer could trim
 *    one signal if it reads as overdetermined.
 *
 *  - Layout: the slide is split into two columns. The funnel sits in the left
 *    ~63%, leaving a dedicated right column for the TEI-REX header chip and
 *    the two pull-quotes (stacked). The phase rows are themselves split into
 *    three internal slots (phase+escalation | SAMPLES SHIPPED | TEAMS
 *    REMAINING) with faint dividers, so escalation subtitles never collide
 *    with the centered samples value or the teams indicator.
 *
 *  - Funnel narrows less aggressively than before (1.0 → 0.64 instead of
 *    0.96 → 0.38) so even Phase 4 has room for all three internal columns.
 *    The narrowing is still clearly visible and the dot-count + tint provide
 *    redundant elimination cues.
 *
 *  - Verbatim quotes are placed as stacked pull-quotes on the right in mono
 *    with a magenta left-rail and faint magenta border. The second quote
 *    ("decide and pivot immediately") gets a slightly stronger border and
 *    glow to mark it as the load-bearing one. Both appear word-for-word with
 *    the speaker's punctuation preserved (curly apostrophes encoded via
 *    ’).
 *
 *  - Header chip is a verbatim copy from slide 16 (same pill, same magenta
 *    border + faint wash + soft glow). The subtitle line under the chip
 *    differs to fit this slide's content ("multi-phase · head-to-head ·
 *    tight timelines") rather than slide 16's "IARPA · top 4 teams".
 *
 *  - Color budget: 3 accents (secondary, danger as a low-opacity overlay,
 *    text-muted). Within budget. No primary on this slide — the path-color is
 *    deliberately absent because this slide is about TEI-REX-internal
 *    pressure, not the speaker's path.
 *
 *  - Phase 4 narrowness foreshadows slide 18 ("only team to last"). The
 *    "ONE TEAM REMAINS" caption beneath Phase 4 is a quiet setup; slide 18
 *    will pay it off. Caption font + opacity were boosted (and the slide
 *    container reserves bottom padding) so it clears the global progress
 *    bar without clipping.
 *
 *  - Contrast: the vertical "PRESSURE INCREASES" axis label and the
 *    "ONE TEAM REMAINS" caption both got bumped to 14px / weight 700 /
 *    ~0.9 opacity so they read clearly against the dark background.
 *
 *  - The "samples shipped" line says "hundreds of blinded samples" each
 *    phase rather than escalating the count, since the part doc says
 *    "hundreds of blinded samples" without committing to a specific
 *    increase. The escalation is encoded in the difficulty cue and bar
 *    color/width instead.
 */
