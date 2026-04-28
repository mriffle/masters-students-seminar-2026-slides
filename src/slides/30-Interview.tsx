import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 30 — How You'll Be Interviewed (Soon)
 *
 * Per SLIDES.md slide 30 + docs/part3_future.md Slide 3.15 + "The
 * Hypothetical Interview" Raw Material.
 *
 * THE MOST CONCRETE, ACTIONABLE SLIDE IN PART 3.
 *
 * The audience can act on this *tomorrow*. The speaker's hypothetical
 * interview practice IF hiring a data scientist now.
 *
 * Required content (from the brief):
 *   - The setup: a coding problem; any tools allowed (including AI).
 *   - Three evaluation criteria:
 *       1. MAINTAINABILITY  (cyan / primary)
 *       2. EXPLAINABILITY   (magenta / secondary)
 *       3. JUDGMENT         (green / success) — quality of choices
 *   - Two interview questions, in mono to convey "this is real":
 *       • "Why did you code it this way?"
 *       • "What did you learn about the domain?"
 *   - Implication line: prepare to be evaluated on judgment and explanation,
 *     not on whether you can produce working code. Know WHY you made every
 *     choice.
 *
 * Visual concept — a stylized one-page interview-rubric card:
 *
 *   Outer "evaluation form" frame fills the slide center, like a printed
 *   rubric handed to a hiring manager. Inside, three vertically stacked
 *   sections, each with a small section-letter (A / B / C) on the left
 *   like form fields:
 *
 *     A. THE SETUP
 *        Top section. Small laptop/code-block icon at the left, then a
 *        mono "coding problem" pill, and an "any tools allowed (including
 *        AI)" badge in muted text — the explicit permission.
 *
 *     B. EVALUATION CRITERIA
 *        Middle section. Three large glowing chips side-by-side, each in
 *        a distinct accent color, each rendered as the dominant element
 *        of the slide. Numbered 01 / 02 / 03 like rubric fields.
 *           01 — MAINTAINABILITY (primary cyan)
 *           02 — EXPLAINABILITY (secondary magenta)
 *           03 — JUDGMENT (success green) — "quality of choices"
 *
 *     C. INTERVIEW QUESTIONS
 *        Bottom section. Two question chips set in mono, italicized
 *        feeling — "this is real." Side by side. Quote marks treated as
 *        part of the rubric form.
 *
 *   Implication line at the bottom:
 *     "Prepare to be evaluated on JUDGMENT and EXPLANATION — not on
 *      whether you can produce working code."
 *
 * Color budget (3 accents — within the rule):
 *   --color-primary    (cyan)    — Maintainability chip
 *   --color-secondary  (magenta) — Explainability chip
 *   --color-success    (green)   — Judgment chip
 *   --color-text-muted           — supporting labels, "any tools allowed"
 *                                    badge, rubric form chrome
 *   --color-text                 — body labels, questions
 *
 *   This is the one slide in Part 3 where the chart-style differentiation
 *   between three CRITERIA needs three distinct colors — explicitly within
 *   budget per the brief.
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 560
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 560 };

// Outer rubric form frame
const FORM = {
  x: 50,
  y: 16,
  w: 900,
  h: 524,
  rx: 14,
};

// Section A — "The Setup"
const SECTION_A_Y = 56;
const SECTION_A_H = 80;

// Section B — "Evaluation Criteria" (the dominant element)
const SECTION_B_Y = 156;
const SECTION_B_H = 220;

// Section C — "Interview Questions"
const SECTION_C_Y = 396;
const SECTION_C_H = 92;

// Implication line — bottom
const IMPLICATION_Y = 514;

// ---------------------------------------------------------------------------
// Evaluation criteria data — load-bearing
// ---------------------------------------------------------------------------

interface Criterion {
  num: string;
  label: string;
  caption: string;
  color: string;
  glowFilter: string;
}

const CRITERIA: Criterion[] = [
  {
    num: '01',
    label: 'MAINTAINABILITY',
    caption: 'will the next person understand this?',
    color: 'var(--color-primary)',
    glowFilter: 'url(#iv-primary-glow)',
  },
  {
    num: '02',
    label: 'EXPLAINABILITY',
    caption: 'can you walk me through every choice?',
    color: 'var(--color-secondary)',
    glowFilter: 'url(#iv-secondary-glow)',
  },
  {
    num: '03',
    label: 'JUDGMENT',
    caption: 'quality of the choices you made',
    color: 'var(--color-success)',
    glowFilter: 'url(#iv-success-glow)',
  },
];

// Two interview questions — mono, to convey "this is real."
const QUESTIONS = [
  'Why did you code it this way?',
  'What did you learn about the domain?',
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const Interview: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Maintainability. Explainability. Judgment.">
        How I'd Hire Now
      </SlideTitle>

      <div className="relative w-full max-w-[94vw] h-[72vh] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A stylized one-page interview rubric card. Section A at the top reads 'the setup' with a small code-block icon, a 'coding problem' pill, and an 'any tools allowed — including AI' badge. Section B in the middle is the dominant element: three large glowing chips side by side, numbered 01 maintainability in cyan, 02 explainability in magenta, and 03 judgment in green, each with a short caption. Section C at the bottom shows two interview-question chips set in monospace: 'Why did you code it this way?' and 'What did you learn about the domain?'. An implication line at the very bottom reads: prepare to be evaluated on judgment and explanation, not on whether you can produce working code."
        >
          <defs>
            <filter id="iv-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="iv-secondary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="iv-success-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ============================================================ */}
          {/* OUTER RUBRIC-FORM FRAME                                       */}
          {/* The whole slide reads as one printed evaluation page.         */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <rect
              x={FORM.x}
              y={FORM.y}
              width={FORM.w}
              height={FORM.h}
              rx={FORM.rx}
              fill="var(--color-bg-card)"
              fillOpacity={0.55}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.45}
              strokeWidth={1.5}
            />
            {/* Inner ruled hairline — gives the form a "printed page" feel */}
            <rect
              x={FORM.x + 8}
              y={FORM.y + 8}
              width={FORM.w - 16}
              height={FORM.h - 16}
              rx={FORM.rx - 4}
              fill="none"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.18}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            {/* Form header band */}
            <text
              x={FORM.x + 24}
              y={FORM.y + 28}
              fontSize={10}
              fontWeight={800}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              data scientist · interview rubric
            </text>
            <text
              x={FORM.x + FORM.w - 24}
              y={FORM.y + 28}
              textAnchor="end"
              fontSize={10}
              fontWeight={800}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              v · 2026
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* SECTION A — THE SETUP                                         */}
          {/* small icon · coding-problem pill · any-tools-allowed badge    */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {/* Section letter A */}
            <text
              x={FORM.x + 24}
              y={SECTION_A_Y + 14}
              fontSize={11}
              fontWeight={900}
              fill="var(--color-text-muted)"
              fillOpacity={0.9}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.18em',
              }}
            >
              A · THE SETUP
            </text>

            {/* Mini code-block / laptop icon */}
            {(() => {
              const ix = FORM.x + 30;
              const iy = SECTION_A_Y + 30;
              return (
                <g>
                  {/* Laptop screen */}
                  <rect
                    x={ix}
                    y={iy}
                    width={56}
                    height={36}
                    rx={4}
                    fill="var(--color-bg)"
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.7}
                    strokeWidth={1.5}
                  />
                  {/* Mini code lines on the screen */}
                  <line
                    x1={ix + 6}
                    y1={iy + 9}
                    x2={ix + 28}
                    y2={iy + 9}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.6}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={ix + 6}
                    y1={iy + 17}
                    x2={ix + 38}
                    y2={iy + 17}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.5}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={ix + 6}
                    y1={iy + 25}
                    x2={ix + 22}
                    y2={iy + 25}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.5}
                    strokeWidth={1.5}
                  />
                  {/* Cursor blink mark */}
                  <rect
                    x={ix + 26}
                    y={iy + 22}
                    width={2}
                    height={6}
                    fill="var(--color-text-muted)"
                    fillOpacity={0.9}
                  />
                  {/* Laptop base */}
                  <line
                    x1={ix - 4}
                    y1={iy + 38}
                    x2={ix + 60}
                    y2={iy + 38}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.6}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                </g>
              );
            })()}

            {/* "Coding problem" pill */}
            <g>
              <rect
                x={FORM.x + 110}
                y={SECTION_A_Y + 36}
                width={170}
                height={28}
                rx={14}
                fill="var(--color-bg)"
                fillOpacity={0.9}
                stroke="var(--color-text)"
                strokeOpacity={0.55}
                strokeWidth={1.4}
              />
              <text
                x={FORM.x + 110 + 85}
                y={SECTION_A_Y + 54}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill="var(--color-text)"
                fillOpacity={0.95}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  letterSpacing: '0.06em',
                }}
              >
                a coding problem
              </text>
            </g>

            {/* Plus connector */}
            <text
              x={FORM.x + 296}
              y={SECTION_A_Y + 56}
              fontSize={16}
              fontWeight={800}
              fill="var(--color-text-muted)"
              fillOpacity={0.7}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              +
            </text>

            {/* "Any tools allowed (including AI)" badge */}
            <g>
              <rect
                x={FORM.x + 318}
                y={SECTION_A_Y + 36}
                width={300}
                height={28}
                rx={14}
                fill="var(--color-text-muted)"
                fillOpacity={0.10}
                stroke="var(--color-text-muted)"
                strokeOpacity={0.65}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text
                x={FORM.x + 318 + 150}
                y={SECTION_A_Y + 54}
                textAnchor="middle"
                fontSize={11}
                fontWeight={800}
                fill="var(--color-text-muted)"
                fillOpacity={0.95}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                any tools allowed — including AI
              </text>
            </g>

            {/* Section A right-side hint — almost a permission stamp */}
            <text
              x={FORM.x + FORM.w - 30}
              y={SECTION_A_Y + 54}
              textAnchor="end"
              fontSize={10}
              fontStyle="italic"
              fill="var(--color-text-muted)"
              fillOpacity={0.7}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              "use whatever you'd actually use on the job"
            </text>

            {/* Section divider */}
            <line
              x1={FORM.x + 24}
              y1={SECTION_A_Y + SECTION_A_H - 2}
              x2={FORM.x + FORM.w - 24}
              y2={SECTION_A_Y + SECTION_A_H - 2}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* SECTION B — EVALUATION CRITERIA (THE DOMINANT ELEMENT)        */}
          {/* Three large glowing chips, each in a distinct accent color    */}
          {/* ============================================================ */}
          <motion.text
            x={FORM.x + 24}
            y={SECTION_B_Y + 14}
            fontSize={11}
            fontWeight={900}
            fill="var(--color-text-muted)"
            fillOpacity={0.9}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              letterSpacing: '0.18em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            B · EVALUATE THE RESULT ON
          </motion.text>

          {(() => {
            const stripPad = 50;
            const chipGap = 22;
            const chipsAreaX = FORM.x + stripPad;
            const chipsAreaW = FORM.w - stripPad * 2;
            const chipW =
              (chipsAreaW - chipGap * (CRITERIA.length - 1)) / CRITERIA.length;
            const chipH = 168;
            const chipY = SECTION_B_Y + 30;

            return (
              <>
                {CRITERIA.map((c, i) => {
                  const x = chipsAreaX + i * (chipW + chipGap);
                  return (
                    <motion.g
                      key={`crit-${i}`}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.85 + i * 0.16,
                        duration: 0.55,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {/* Outer glow halo — the "glowing chip" treatment */}
                      <rect
                        x={x - 4}
                        y={chipY - 4}
                        width={chipW + 8}
                        height={chipH + 8}
                        rx={16}
                        fill={c.color}
                        fillOpacity={0.06}
                        stroke={c.color}
                        strokeOpacity={0.30}
                        strokeWidth={1}
                      />
                      {/* Chip body */}
                      <rect
                        x={x}
                        y={chipY}
                        width={chipW}
                        height={chipH}
                        rx={14}
                        fill="var(--color-bg-card)"
                        fillOpacity={0.95}
                        stroke={c.color}
                        strokeOpacity={0.95}
                        strokeWidth={2.2}
                        filter={c.glowFilter}
                      />
                      {/* Inner accent fill — low-opacity so the label dominates */}
                      <rect
                        x={x + 4}
                        y={chipY + 4}
                        width={chipW - 8}
                        height={chipH - 8}
                        rx={10}
                        fill={c.color}
                        fillOpacity={0.08}
                        stroke="none"
                      />

                      {/* Number tag — top-left corner, mono */}
                      <rect
                        x={x + 14}
                        y={chipY + 14}
                        width={36}
                        height={22}
                        rx={5}
                        fill={c.color}
                        fillOpacity={0.18}
                        stroke={c.color}
                        strokeOpacity={0.7}
                        strokeWidth={1}
                      />
                      <text
                        x={x + 32}
                        y={chipY + 30}
                        textAnchor="middle"
                        fontSize={11}
                        fontWeight={900}
                        fill={c.color}
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          letterSpacing: '0.10em',
                        }}
                      >
                        {c.num}
                      </text>

                      {/* Big criterion label — the dominant text */}
                      <text
                        x={x + chipW / 2}
                        y={chipY + 96}
                        textAnchor="middle"
                        fontSize={22}
                        fontWeight={900}
                        fill={c.color}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          letterSpacing: '0.06em',
                        }}
                        filter={c.glowFilter}
                      >
                        {c.label}
                      </text>

                      {/* Caption — small italic line beneath the label */}
                      <text
                        x={x + chipW / 2}
                        y={chipY + 124}
                        textAnchor="middle"
                        fontSize={11.5}
                        fontStyle="italic"
                        fill="var(--color-text)"
                        fillOpacity={0.85}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {c.caption}
                      </text>

                      {/* Small "score" tick row — pure rubric texture, lets
                          the chip read as a real evaluation field. */}
                      {Array.from({ length: 5 }).map((_, ti) => {
                        const tx = x + chipW / 2 - 32 + ti * 16;
                        return (
                          <circle
                            key={`crit-${i}-tick-${ti}`}
                            cx={tx}
                            cy={chipY + chipH - 22}
                            r={3.2}
                            fill="none"
                            stroke={c.color}
                            strokeOpacity={0.7}
                            strokeWidth={1}
                          />
                        );
                      })}
                    </motion.g>
                  );
                })}
              </>
            );
          })()}

          {/* ============================================================ */}
          {/* SECTION C — INTERVIEW QUESTIONS                               */}
          {/* Two mono question chips, the "this is real" beat.             */}
          {/* ============================================================ */}
          <motion.text
            x={FORM.x + 24}
            y={SECTION_C_Y + 14}
            fontSize={11}
            fontWeight={900}
            fill="var(--color-text-muted)"
            fillOpacity={0.9}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              letterSpacing: '0.18em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.45, duration: 0.4 }}
          >
            C · AND ASK
          </motion.text>

          {(() => {
            const qPad = 50;
            const qGap = 24;
            const qAreaX = FORM.x + qPad;
            const qAreaW = FORM.w - qPad * 2;
            const qW = (qAreaW - qGap) / 2;
            const qH = 56;
            const qY = SECTION_C_Y + 28;

            return (
              <>
                {QUESTIONS.map((q, i) => {
                  const x = qAreaX + i * (qW + qGap);
                  return (
                    <motion.g
                      key={`q-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.6 + i * 0.14,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {/* Question chip — bg-card, muted-text border, mono.
                          The "this is real" feel comes from monospace + the
                          quoted-input look. */}
                      <rect
                        x={x}
                        y={qY}
                        width={qW}
                        height={qH}
                        rx={10}
                        fill="var(--color-bg)"
                        fillOpacity={0.85}
                        stroke="var(--color-text)"
                        strokeOpacity={0.55}
                        strokeWidth={1.4}
                      />
                      {/* Subtle leading marker — like a prompt caret */}
                      <text
                        x={x + 14}
                        y={qY + qH / 2 + 5}
                        fontSize={14}
                        fontWeight={900}
                        fill="var(--color-text-muted)"
                        fillOpacity={0.85}
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}
                      >
                        &gt;
                      </text>
                      {/* The question itself — mono, quoted */}
                      <text
                        x={x + 36}
                        y={qY + qH / 2 + 5}
                        fontSize={14}
                        fontWeight={700}
                        fill="var(--color-text)"
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          letterSpacing: '0.01em',
                        }}
                      >
                        "{q}"
                      </text>
                    </motion.g>
                  );
                })}
              </>
            );
          })()}

          {/* ============================================================ */}
          {/* IMPLICATION LINE — bottom of the form                         */}
          {/* The take-home for the audience: prep for judgment + explain.  */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.95, duration: 0.5 }}
          >
            <line
              x1={FORM.x + 24}
              y1={IMPLICATION_Y - 14}
              x2={FORM.x + FORM.w - 24}
              y2={IMPLICATION_Y - 14}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
            <text
              x={FORM.x + FORM.w / 2}
              y={IMPLICATION_Y + 6}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="var(--color-text)"
              fillOpacity={0.92}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.01em',
              }}
            >
              <tspan>Prepare to be evaluated on </tspan>
              <tspan fill="var(--color-success)" fontWeight={900}>
                judgment
              </tspan>
              <tspan> and </tspan>
              <tspan fill="var(--color-secondary)" fontWeight={900}>
                explanation
              </tspan>
              <tspan> — not on whether you can produce working code.</tspan>
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default Interview;

/*
 * Tradeoffs / open questions:
 *
 *  - The slide is built as one literal "interview rubric" form — outer
 *    rounded card, dashed inner ruled hairline, mono header with a fake
 *    version stamp ("v · 2026"). This makes the entire slide read as a
 *    one-page evaluation document, exactly what the brief asked for.
 *
 *  - Color budget: 3 accents (primary, secondary, success), each carrying
 *    one of the three criteria — explicitly within the brief's allowance
 *    for chart-style differentiation. Muted text carries the form chrome,
 *    section letters, "any tools allowed" badge, and the "use whatever
 *    you'd actually use" italic stamp.
 *
 *  - The three CRITERIA are the dominant element by a wide margin: each
 *    chip is 168px tall in the 560-tall viewBox (~30% of the slide each,
 *    ~90% of slide width collectively). The label text is 22pt 900-weight
 *    and glow-filtered. There is no question that the audience sees
 *    "MAINTAINABILITY · EXPLAINABILITY · JUDGMENT" first.
 *
 *  - "The setup" details:
 *      icon  — a small laptop with three code lines + cursor caret
 *      pill  — "a coding problem" in mono
 *      badge — "any tools allowed — including AI" in dashed muted style
 *      stamp — italic "use whatever you'd actually use on the job" at right
 *
 *  - Three criterion chips (exact labels and colors):
 *      01 MAINTAINABILITY — primary cyan
 *           caption: "will the next person understand this?"
 *      02 EXPLAINABILITY  — secondary magenta
 *           caption: "can you walk me through every choice?"
 *      03 JUDGMENT        — success green
 *           caption: "quality of the choices you made"
 *      Captions are short rubric-prompt-style lines, intentionally brief.
 *      Quality-of-choices is called out for JUDGMENT per the brief.
 *
 *  - Two interview-question chips, mono font, quoted, with a > prompt
 *    marker for the "this is real / live conversation" feel:
 *      "Why did you code it this way?"
 *      "What did you learn about the domain?"
 *    Each verbatim from the brief / Slide 3.15 raw material.
 *
 *  - Implication line (verbatim per brief intent, paraphrased to fit):
 *      "Prepare to be evaluated on judgment and explanation — not on
 *       whether you can produce working code."
 *    "judgment" is set in success green; "explanation" is set in secondary
 *    magenta — visually echoing the chips above so the implication ties
 *    back to the rubric.
 *
 *  - Title: "How I'd Hire Now" (per brief suggestion). The alternative
 *    "How You'll Be Interviewed" is also valid; chose "How I'd Hire Now"
 *    because it preserves the speaker's first-person framing — this is
 *    what HE would do — which makes the rubric's authority feel personal
 *    rather than abstract.
 *
 *  - Subtitle: "Maintainability. Explainability. Judgment." — echoes the
 *    three criteria, exactly per brief suggestion.
 *
 *  - The 5 small unfilled circles at the bottom of each criterion chip
 *    are pure rubric texture — they imply a 1-5 scoring scale without
 *    actually claiming one. Helps the chips read as evaluation FIELDS
 *    rather than just decorative chips. Kept very subtle (1px stroke,
 *    no fill) so they don't compete with the label.
 *
 *  - No verbatim quotes mandatory on this slide per the brief. The two
 *    interview questions ARE the closest thing to verbatim — they're the
 *    speaker's hypothetical interview questions, and they appear in the
 *    raw material as: "Ask them WHY things are coded the way they are"
 *    and "Push on WHAT they learned about the domain." Lifted into the
 *    natural-question form ("Why did you code it this way?" / "What did
 *    you learn about the domain?") that's what the speaker would actually
 *    say in the room.
 */
