import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 28 — Working With AI: A Systems Engineering Skill
 *
 * Per SLIDES.md slide 28 + docs/part3_future.md Slide 3.12 + the
 * "Working Effectively With AI Tools" + "Systems-Engineering Skills"
 * raw-material sections.
 *
 *   THE PRACTICAL LAYER OF PART 3.
 *
 *   After slide 27 lands the optimistic flip + the take-home checklist,
 *   slide 28 zooms in on a single one of those investments: HOW to use
 *   AI tools well. The argument is that working with AI on complex
 *   projects is itself a SYSTEMS ENGINEERING task — and systems thinking
 *   is itself a fundamental.
 *
 * Visual concept — small architecture diagram:
 *
 *   Three nodes arranged left-to-right, drawn as a small system you (the
 *   speaker / student) configure and steer:
 *
 *     LEFT — YOU (cyan)
 *       A small "you" node in primary cyan. The user driving the system.
 *
 *     CENTER — CONFIGURATION (violet)
 *       A larger node containing three small attached chips:
 *         • CLAUDE.md       (instruction file)
 *         • skills          (reusable instruction packages)
 *         • subagents       (specialized agents)
 *       This is where you do the systems-engineering work. The chips
 *       are visibly attached to the configuration node — they're its
 *       contents, not free-floating.
 *
 *     RIGHT — CLAUDE / AI (violet)
 *       A Claude/AI icon. Around it, the agent's outputs (code, analysis,
 *       suggestions) — drawn as small muted satellite chips orbiting at
 *       low opacity so they read as outputs, not configuration.
 *
 *   ARROWS:
 *     • You → Configuration   (you set up the configuration)
 *     • Configuration → AI    (this arrow is labeled "opinionated
 *       instructions" — the load-bearing concept; this is what makes the
 *       AI steerable)
 *
 *   CAPTION beneath the diagram, small and italic:
 *     "This is itself a fundamental."
 *
 *   FOOTNOTE beneath the caption, even smaller and muted:
 *     "Public examples worth studying — review, understand, try them."
 *     "IDEs still important, but getting less important."
 *
 * Color budget (3 accents — within the rule):
 *   --color-primary    → the YOU node (the user driving the system —
 *                        consistent with deck-wide "the path / the
 *                        practitioner" meaning)
 *   --color-tertiary   → AI tooling color (deck-wide). Used for the AI
 *                        icon, configuration node, configuration chips,
 *                        and the "opinionated instructions" arrow.
 *   --color-text-muted → output satellite labels, supporting captions,
 *                        the floor/footnote.
 *   --color-text       → primary body labels.
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 540
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 540 };

// Vertical center for the architecture row
const ROW_Y = 240;

// YOU node — small, on the left
const YOU = {
  cx: 130,
  cy: ROW_Y,
  r: 44,
};

// CONFIGURATION node — center-left, larger; holds three chips inside
const CONFIG = {
  x: 280,
  y: 130,
  w: 290,
  h: 220,
  rx: 16,
};

// Three chips inside the configuration node
const CHIP_X = CONFIG.x + 22;
const CHIP_W = CONFIG.w - 44;
const CHIP_H = 46;
const CHIPS = [
  {
    keyword: 'CLAUDE.md',
    detail: 'instruction file',
    mono: true,
  },
  {
    keyword: 'skills',
    detail: 'reusable instruction packages',
    mono: false,
  },
  {
    keyword: 'subagents',
    detail: 'specialized agents',
    mono: false,
  },
];

// AI / CLAUDE node — right side. Drawn as a stylized hexagonal "agent"
// glyph so it visually distinguishes itself from the rectangular config
// box.
const AI = {
  cx: 800,
  cy: ROW_Y,
  r: 62, // outer radius for the hex
};

// Output satellite chips around the AI icon — code / analysis /
// suggestions. Drawn small, in muted text, at low opacity so the
// CONFIGURATION → AI relationship stays the visual story.
const OUTPUTS = [
  { label: 'code',        angle: -55 },
  { label: 'analysis',    angle:  10 },
  { label: 'suggestions', angle:  75 },
];
const OUTPUT_ORBIT_R = 118;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
};

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    })
    .join(' ');

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const SystemsEngineering: React.FC<SlideProps> = () => {
  // Configuration node attachment point on its right edge — where the
  // arrow to the AI begins.
  const configRight = { x: CONFIG.x + CONFIG.w, y: CONFIG.y + CONFIG.h / 2 };
  // AI node attachment point on its left edge.
  const aiLeft = { x: AI.cx - AI.r * 0.93, y: AI.cy };
  // YOU node right edge — where the arrow to configuration begins.
  const youRight = { x: YOU.cx + YOU.r, y: YOU.cy };
  // Configuration left edge — arrow target for YOU → CONFIG.
  const configLeft = { x: CONFIG.x, y: CONFIG.y + CONFIG.h / 2 };

  return (
    <SlideContainer>
      <SlideTitle subtitle="Configure. Instruct. Steer.">
        Working With AI
      </SlideTitle>

      <div className="relative w-full max-w-[94vw] h-[72vh] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A small architecture diagram. On the left, a cyan 'you' node representing the practitioner. In the center, a violet 'configuration' node containing three attached chips: CLAUDE.md (instruction file), skills (reusable instruction packages), and subagents (specialized agents). On the right, a violet hexagonal AI / Claude icon, surrounded by three faint satellite chips labeled code, analysis, and suggestions. An arrow runs from 'you' to 'configuration', and a labeled arrow runs from 'configuration' to the AI icon, marked 'opinionated instructions'. A small italic caption beneath reads 'This is itself a fundamental.' Footnotes beneath read 'Public examples worth studying — review, understand, try them.' and 'IDEs still important, but getting less important.' At the top, a banner reads: 'Working with AI on complex projects requires SYSTEMS ENGINEERING THINKING.'"
        >
          <defs>
            <filter id="se-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="se-tertiary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="se-tertiary-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrowhead — tertiary (config → AI) */}
            <marker
              id="se-arrow-tertiary"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-tertiary)" />
            </marker>
            {/* Arrowhead — primary (you → config) */}
            <marker
              id="se-arrow-primary"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
            </marker>

            {/* Configuration gradient — subtle violet wash */}
            <linearGradient id="se-config-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* ============================================================ */}
          {/* TOP BANNER — the load-bearing claim                          */}
          {/* "SYSTEMS ENGINEERING THINKING" emphasized in tertiary.       */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <text
              x={VB.w / 2}
              y={50}
              textAnchor="middle"
              fontSize={18}
              fontWeight={700}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.005em',
              }}
            >
              <tspan>Working with AI on complex projects requires </tspan>
            </text>
            <text
              x={VB.w / 2}
              y={82}
              textAnchor="middle"
              fontSize={22}
              fontWeight={900}
              fill="var(--color-tertiary)"
              filter="url(#se-tertiary-glow)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              systems engineering thinking
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* YOU NODE — left, cyan, the user driving the system           */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{ originX: `${YOU.cx}px`, originY: `${YOU.cy}px` }}
          >
            <circle
              cx={YOU.cx}
              cy={YOU.cy}
              r={YOU.r + 8}
              fill="var(--color-primary)"
              fillOpacity={0.06}
              stroke="var(--color-primary)"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            <circle
              cx={YOU.cx}
              cy={YOU.cy}
              r={YOU.r}
              fill="var(--color-bg-card)"
              stroke="var(--color-primary)"
              strokeOpacity={0.95}
              strokeWidth={2.2}
              filter="url(#se-primary-glow)"
            />
            {/* Stylized "person" glyph — head + shoulders */}
            <circle
              cx={YOU.cx}
              cy={YOU.cy - 10}
              r={9}
              fill="var(--color-primary)"
              fillOpacity={0.95}
            />
            <path
              d={`M ${YOU.cx - 18} ${YOU.cy + 16}
                  Q ${YOU.cx} ${YOU.cy + 2}
                    ${YOU.cx + 18} ${YOU.cy + 16}`}
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity={0.95}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* "YOU" label below */}
            <text
              x={YOU.cx}
              y={YOU.cy + YOU.r + 26}
              textAnchor="middle"
              fontSize={13}
              fontWeight={900}
              fill="var(--color-primary)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
              }}
            >
              you
            </text>
            <text
              x={YOU.cx}
              y={YOU.cy + YOU.r + 44}
              textAnchor="middle"
              fontSize={10}
              fontStyle="italic"
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              the systems engineer
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* ARROW: YOU → CONFIGURATION                                    */}
          {/* ============================================================ */}
          <motion.line
            x1={youRight.x + 6}
            y1={youRight.y}
            x2={configLeft.x - 8}
            y2={configLeft.y}
            stroke="var(--color-primary)"
            strokeOpacity={0.7}
            strokeWidth={2}
            markerEnd="url(#se-arrow-primary)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.55 }}
          />
          <motion.text
            x={(youRight.x + configLeft.x) / 2}
            y={youRight.y - 12}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="var(--color-text-muted)"
            fillOpacity={0.85}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            configure
          </motion.text>

          {/* ============================================================ */}
          {/* CONFIGURATION NODE — center, violet, holds three chips       */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55 }}
          >
            {/* Outer halo */}
            <rect
              x={CONFIG.x - 6}
              y={CONFIG.y - 6}
              width={CONFIG.w + 12}
              height={CONFIG.h + 12}
              rx={CONFIG.rx + 4}
              fill="var(--color-tertiary)"
              fillOpacity={0.04}
              stroke="var(--color-tertiary)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
            {/* Body */}
            <rect
              x={CONFIG.x}
              y={CONFIG.y}
              width={CONFIG.w}
              height={CONFIG.h}
              rx={CONFIG.rx}
              fill="url(#se-config-grad)"
              stroke="var(--color-tertiary)"
              strokeOpacity={0.95}
              strokeWidth={2}
              filter="url(#se-tertiary-soft)"
            />
            {/* Header label */}
            <text
              x={CONFIG.x + CONFIG.w / 2}
              y={CONFIG.y + 26}
              textAnchor="middle"
              fontSize={12}
              fontWeight={900}
              fill="var(--color-tertiary)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
              }}
            >
              configuration
            </text>
            <line
              x1={CONFIG.x + 16}
              y1={CONFIG.y + 38}
              x2={CONFIG.x + CONFIG.w - 16}
              y2={CONFIG.y + 38}
              stroke="var(--color-tertiary)"
              strokeOpacity={0.35}
              strokeWidth={1}
            />

            {/* Three chips */}
            {CHIPS.map((chip, i) => {
              const chipY = CONFIG.y + 52 + i * (CHIP_H + 10);
              return (
                <motion.g
                  key={`chip-${chip.keyword}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.0 + i * 0.12,
                    duration: 0.45,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <rect
                    x={CHIP_X}
                    y={chipY}
                    width={CHIP_W}
                    height={CHIP_H}
                    rx={8}
                    fill="var(--color-bg-card)"
                    stroke="var(--color-tertiary)"
                    strokeOpacity={0.7}
                    strokeWidth={1.4}
                  />
                  {/* Small attach-tab on the left edge — visually marks
                      the chip as a slotted module of the configuration. */}
                  <rect
                    x={CHIP_X - 4}
                    y={chipY + CHIP_H / 2 - 8}
                    width={6}
                    height={16}
                    rx={2}
                    fill="var(--color-tertiary)"
                    fillOpacity={0.85}
                  />
                  <text
                    x={CHIP_X + 14}
                    y={chipY + 20}
                    fontSize={14}
                    fontWeight={900}
                    fill="var(--color-tertiary)"
                    style={{
                      fontFamily: chip.mono
                        ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
                        : 'Inter, system-ui, sans-serif',
                      letterSpacing: chip.mono ? '0.02em' : '0.06em',
                    }}
                  >
                    {chip.keyword}
                  </text>
                  <text
                    x={CHIP_X + 14}
                    y={chipY + 36}
                    fontSize={11}
                    fill="var(--color-text)"
                    fillOpacity={0.85}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {chip.detail}
                  </text>
                </motion.g>
              );
            })}
          </motion.g>

          {/* ============================================================ */}
          {/* ARROW: CONFIGURATION → AI                                    */}
          {/* Labeled "opinionated instructions" — the load-bearing concept*/}
          {/* ============================================================ */}
          {(() => {
            const x1 = configRight.x + 8;
            const y1 = configRight.y;
            const x2 = aiLeft.x - 8;
            const y2 = aiLeft.y;
            // Place the label above the arrow line, well clear of both the
            // configuration node and the hex's vertical span. Label is
            // centered on the arrow midpoint horizontally and lifted high
            // enough that its bottom edge sits above the hex top point
            // (AI.cy - AI.r - 10).
            const midX = (x1 + x2) / 2;
            const labelW = 184;
            const labelH = 24;
            // Sits above the "AGENT OUTPUTS" mini-caption, with clearance.
            const labelTopY = AI.cy - AI.r - 72;
            const labelBottomY = labelTopY + labelH;
            const labelCenterY = labelTopY + labelH / 2;
            return (
              <>
                {/* Arrow */}
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-tertiary)"
                  strokeOpacity={0.95}
                  strokeWidth={2.4}
                  markerEnd="url(#se-arrow-tertiary)"
                  filter="url(#se-tertiary-soft)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.45, duration: 0.65 }}
                />
                {/* Leader from arrow up to label */}
                <motion.line
                  x1={midX}
                  y1={y1 - 2}
                  x2={midX}
                  y2={labelBottomY}
                  stroke="var(--color-tertiary)"
                  strokeOpacity={0.45}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                />
                {/* Label backplate */}
                <motion.rect
                  x={midX - labelW / 2}
                  y={labelTopY}
                  width={labelW}
                  height={labelH}
                  rx={6}
                  fill="var(--color-bg-card)"
                  stroke="var(--color-tertiary)"
                  strokeOpacity={0.55}
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.65, duration: 0.4 }}
                />
                <motion.text
                  x={midX}
                  y={labelCenterY + 4}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={900}
                  fill="var(--color-tertiary)"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.75, duration: 0.4 }}
                >
                  opinionated instructions
                </motion.text>
                {/* Subtle "load" annotation under the arrow.
                    Shifted leftward and given a solid backplate so the
                    italic caption sits clear of the AI hexagon's left
                    edge (leftmost hex point ~ AI.cx - AI.r * cos(30°)).
                    Anchored to configRight so it stays close to the
                    arrow's origin and never crowds the hex. */}
                {(() => {
                  const annoText = 'loaded to keep the agent on track';
                  const annoW = 156;
                  const annoH = 18;
                  // Sit the caption between the configuration node's
                  // right edge and the hex's leftmost vertex (~AI.cx -
                  // AI.r * cos(30°) ≈ 746) with clearance on both sides.
                  const hexLeftmostX = AI.cx - AI.r * Math.cos(Math.PI / 6);
                  const annoRightX = hexLeftmostX - 14;
                  const annoCenterX = annoRightX - annoW / 2;
                  const annoTopY = y1 + 14;
                  return (
                    <>
                      <motion.rect
                        x={annoCenterX - annoW / 2}
                        y={annoTopY}
                        width={annoW}
                        height={annoH}
                        rx={5}
                        fill="var(--color-bg-card)"
                        fillOpacity={0.95}
                        stroke="var(--color-text-muted)"
                        strokeOpacity={0.25}
                        strokeWidth={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.4 }}
                      />
                      <motion.text
                        x={annoCenterX}
                        y={annoTopY + annoH - 5}
                        textAnchor="middle"
                        fontSize={10}
                        fontStyle="italic"
                        fill="var(--color-text-muted)"
                        fillOpacity={0.95}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        transition={{ delay: 1.85, duration: 0.4 }}
                      >
                        {annoText}
                      </motion.text>
                    </>
                  );
                })()}
              </>
            );
          })()}

          {/* ============================================================ */}
          {/* AI / CLAUDE NODE — right, violet hexagon                     */}
          {/* Surrounded by three muted output satellite chips.            */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.55 }}
            style={{ originX: `${AI.cx}px`, originY: `${AI.cy}px` }}
          >
            {/* Outer halo */}
            <polygon
              points={hexPoints(AI.cx, AI.cy, AI.r + 10)}
              fill="var(--color-tertiary)"
              fillOpacity={0.06}
              stroke="var(--color-tertiary)"
              strokeOpacity={0.22}
              strokeWidth={1}
            />
            {/* Hex body */}
            <polygon
              points={hexPoints(AI.cx, AI.cy, AI.r)}
              fill="var(--color-bg-card)"
              stroke="var(--color-tertiary)"
              strokeOpacity={0.95}
              strokeWidth={2.2}
              filter="url(#se-tertiary-glow)"
            />
            {/* Inner chevron-ish "AI" mark — three small bars */}
            {[-1, 0, 1].map((k) => (
              <line
                key={`ai-bar-${k}`}
                x1={AI.cx - 16 + k * 12}
                y1={AI.cy - 14 + Math.abs(k) * 6}
                x2={AI.cx - 16 + k * 12 + 18}
                y2={AI.cy + 14 - Math.abs(k) * 6}
                stroke="var(--color-tertiary)"
                strokeOpacity={0.95}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            ))}
            {/* Label below the hex */}
            <text
              x={AI.cx}
              y={AI.cy + AI.r + 28}
              textAnchor="middle"
              fontSize={13}
              fontWeight={900}
              fill="var(--color-tertiary)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
              }}
            >
              claude / AI
            </text>
            <text
              x={AI.cx}
              y={AI.cy + AI.r + 46}
              textAnchor="middle"
              fontSize={10}
              fontStyle="italic"
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              steerable when configured
            </text>
          </motion.g>

          {/* OUTPUT SATELLITES — code / analysis / suggestions
              Drawn as small muted chips around the AI node. The arcs
              connecting them to the AI are very faint — they're the
              outputs of the system, not part of the configuration story. */}
          {OUTPUTS.map((o, i) => {
            const p = polar(AI.cx, AI.cy, OUTPUT_ORBIT_R, o.angle);
            return (
              <motion.g
                key={`output-${o.label}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 2.05 + i * 0.12,
                  duration: 0.45,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ originX: `${p.x}px`, originY: `${p.y}px` }}
              >
                {/* Faint connector — short dashed line from AI edge to chip */}
                {(() => {
                  const edge = polar(AI.cx, AI.cy, AI.r + 6, o.angle);
                  return (
                    <line
                      x1={edge.x}
                      y1={edge.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="var(--color-text-muted)"
                      strokeOpacity={0.35}
                      strokeWidth={1}
                      strokeDasharray="2 4"
                    />
                  );
                })()}
                {/* Chip body */}
                <rect
                  x={p.x - 46}
                  y={p.y - 14}
                  width={92}
                  height={28}
                  rx={14}
                  fill="var(--color-bg-card)"
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.55}
                  strokeWidth={1}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.95}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.10em',
                    textTransform: 'lowercase',
                  }}
                >
                  {o.label}
                </text>
              </motion.g>
            );
          })}

          {/* "outputs" caption — anchored below the AI hex (between the
              hex bottom and its label cluster is too tight, so it sits
              just under the leftmost lower-satellite area). Moved off
              the top of the hex to avoid colliding with the upper-right
              "code" output chip; tightened letter-spacing and font so it
              reads as a small section header without crowding any chip. */}
          <motion.text
            x={AI.cx - AI.r - 18}
            y={AI.cy - AI.r - 4}
            textAnchor="end"
            fontSize={9}
            fontWeight={800}
            fill="var(--color-text-muted)"
            fillOpacity={0.7}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          >
            agent outputs
          </motion.text>

          {/* ============================================================ */}
          {/* CAPTION — "This is itself a fundamental."                    */}
          {/* The italic tagline that anchors the section thesis. Sits     */}
          {/* prominently in the lower region of the slide on its own       */}
          {/* backplate, with the footnotes below.                          */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.55, duration: 0.55 }}
          >
            {/* Subtle backplate to lift the caption out of the empty space */}
            <rect
              x={VB.w / 2 - 250}
              y={418}
              width={500}
              height={42}
              rx={10}
              fill="var(--color-tertiary)"
              fillOpacity={0.05}
              stroke="var(--color-tertiary)"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            <text
              x={VB.w / 2}
              y={446}
              textAnchor="middle"
              fontSize={22}
              fontStyle="italic"
              fontWeight={600}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.01em',
              }}
            >
              &ldquo;This is itself a fundamental.&rdquo;
            </text>
          </motion.g>

          {/* FOOTNOTES — public examples + IDEs note */}
          <motion.text
            x={VB.w / 2}
            y={488}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-text-muted)"
            fillOpacity={0.85}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 2.75, duration: 0.45 }}
          >
            Public examples worth studying — review them, understand why what's in them is in them, try them out.
          </motion.text>
          <motion.text
            x={VB.w / 2}
            y={512}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-text-muted)"
            fillOpacity={0.7}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontStyle: 'italic',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.9, duration: 0.45 }}
          >
            IDEs are still important — but getting less important.
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default SystemsEngineering;

/*
 * Tradeoffs / open questions:
 *
 *  - Color budget: 3 accents (primary, tertiary, muted) — within the rule.
 *    Primary = YOU (the practitioner driving the system; consistent with
 *    deck-wide "the path / the practitioner / fundamentals" cyan).
 *    Tertiary = AI tooling (deck-wide). Used uniformly for the AI icon,
 *    the configuration node body, all three configuration chips, and the
 *    "opinionated instructions" arrow — visually unifying the
 *    AI-tool-system as a single tertiary-violet domain. Muted = output
 *    satellites and supporting captions.
 *
 *  - Architecture diagram, left-to-right reading: YOU → CONFIGURATION
 *    (with chips) → AI (with output satellites). Each arrow is labeled
 *    with the verb. The CONFIGURATION → AI arrow carries the load-bearing
 *    label "opinionated instructions" + sublabel "loaded to keep the
 *    agent on track" — verbatim phrasing from part3_future.md.
 *
 *  - Three chips inside the configuration node: CLAUDE.md (rendered in
 *    monospace to look like a filename), skills (sans), subagents (sans).
 *    Each chip has a small left-edge attach-tab to read as a slotted
 *    module of the configuration node, not a free-floating chip.
 *
 *  - AI icon is a violet hexagon with a stylized chevron mark — chosen
 *    because (a) it visually distinguishes from the rectangular config
 *    node, (b) hexagonal "agent" glyphs read well at small scale, and
 *    (c) it doesn't compete with the configuration's three chips for
 *    the eye's attention.
 *
 *  - Output satellites (code, analysis, suggestions) are deliberately
 *    muted at low opacity, with dashed connector lines — they're labeled
 *    "AGENT OUTPUTS" so they read as outputs of the system, not
 *    configuration. The configuration → AI relationship stays the
 *    visual story.
 *
 *  - Caption "This is itself a fundamental." sits beneath the diagram,
 *    italicized, in regular text weight — calm, anchoring the slide's
 *    thesis. Above it the top banner declares "SYSTEMS ENGINEERING
 *    THINKING" — together they bookend the diagram.
 *
 *  - Two footnotes beneath the caption pull in the remaining required
 *    content: (1) the "public examples worth studying — review,
 *    understand, try them out" sentence, and (2) the "IDEs still
 *    important, but getting less important" line.
 *
 *  - Title "Working With AI" + subtitle "Configure. Instruct. Steer." —
 *    both per the brief's suggestions. The subtitle's three verbs map
 *    directly to the three components of the diagram (you configure;
 *    the configuration instructs; the result is a steerable AI).
 *
 *  - No verbatim quote requirement on this slide per SLIDES.md and the
 *    brief. The strongest near-verbatim phrasings ("opinionated
 *    instructions", "this is itself a fundamental", "IDEs ... still
 *    important, but getting less important") are preserved word-for-word.
 */
