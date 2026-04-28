import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 26 — The Uncomfortable Truth: AI Helps Senior People Most
 *
 * Per SLIDES.md slide 26 + docs/part3_future.md Slide 3.10:
 *   Land the deliberately uncomfortable claim directly. Don't soften.
 *   Slide 27 is the constructive flip — this slide must NOT preempt it.
 *
 * Content:
 *   - Headline claim: AI is most useful to senior people (right now).
 *   - Why: senior people have fundamentals, frame of reference, domain
 *     knowledge — they can evaluate what AI gives them and frame requests.
 *   - Harder corollary: it is HARDER for junior people to gain that
 *     senior experience when AI is doing the entry-level tasks for them.
 *   - Action line: "Be aware. Push on it."
 *
 * Visual concept:
 *   A literal weighted scale, visibly tipped HEAVILY toward the senior
 *   side. The visual disparity IS the message. No softening.
 *
 *   RIGHT pan (heavier, drops down):
 *     Senior figure standing tall on a TALL stack of --color-primary
 *     blocks labeled "fundamentals", "domain knowledge", "frame of
 *     reference". Pan sits LOW (heavy).
 *
 *   LEFT pan (lighter, rises up):
 *     Junior figure on a MUCH SHORTER stack of --color-text-muted blocks.
 *     Above the junior figure: red --color-danger arrows showing
 *     entry-level tasks being siphoned away by an AI icon. The tasks
 *     that USED TO build experience are being automated.
 *
 *   Layout (per Round 3 fix):
 *     SENIOR is on the RIGHT pan (tall primary stack, heavy → drops DOWN).
 *     JUNIOR is on the LEFT pan (short muted stack, light → rises UP).
 *     The AI icon and siphoned-task chips sit in the upper-LEFT band, so
 *     the entry-level tasks visibly flow OFF the junior side INTO the AI.
 *
 *   The beam tilts roughly +14° on slide entrance (right-side-down) and
 *   stays there. The audience watches the tilt LAND, then sees what's
 *   on each pan and why.
 *
 * Color budget (3 accents — within the rule):
 *   --color-primary      → senior's stack (the things they HAVE)
 *   --color-text-muted   → junior's shorter stack (the things they have less of)
 *   --color-danger       → AI's siphon arrows + entry-level tasks being taken
 *                           (loss / threat semantic)
 *   --color-text         → labels and the headline claim
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 600
// We keep a wide aspect, center the scale vertically, and let the on-canvas
// headline + AI siphon fill the upper band so there's no large empty quadrant.
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 600 };

// Stand / pillar — vertical post the beam pivots on. Sits center.
const STAND = {
  cx: 500,
  baseY: 545,            // floor level (lower → taller stand → fills more vertical space)
  topY: 295,             // beam pivot point — leaves a clean upper band for headline + AI
  baseW: 160,             // wide flared base
  baseH: 24,
  shaftW: 24,
};

// Beam — horizontal bar that tilts. Pivots at (STAND.cx, STAND.topY).
// We tilt it heavily toward the senior side (right). The tilt is dramatic
// enough to read instantly but moderate enough to keep the junior figure
// from colliding with the AI icon up top.
const BEAM = {
  length: 620,            // beam length tuned so pans don't crowd AI icon / edge
  thickness: 10,
  tiltDeg: 14,            // positive = right side down (senior side heavier)
};

// Pan suspension chain length (visual). Pans hang from each beam end.
const CHAIN_LEN_BASE = 42;

// Pan dimensions
const PAN_W = 250;
const PAN_H = 14;

// Senior side (RIGHT pan) — pan ends LOW because it's heavy.
// Junior side (LEFT pan) — pan ends HIGH because it's light.
// We compute pan positions analytically from the tilted beam.

const beamHalf = BEAM.length / 2;
const tiltRad = (BEAM.tiltDeg * Math.PI) / 180;
const beamLeftEnd = {
  x: STAND.cx - Math.cos(tiltRad) * beamHalf,
  y: STAND.topY - Math.sin(tiltRad) * beamHalf,
};
const beamRightEnd = {
  x: STAND.cx + Math.cos(tiltRad) * beamHalf,
  y: STAND.topY + Math.sin(tiltRad) * beamHalf,
};

// Pans hang from beam ends by chains. Senior chain is longer (heavy drop),
// junior chain is shorter (rides high). The visual disparity reads even
// before the tilt registers.
const SENIOR_CHAIN = CHAIN_LEN_BASE + 18;     // longer drop on the heavy side
const JUNIOR_CHAIN = CHAIN_LEN_BASE - 14;     // shorter chain, pan rides higher

const seniorPan = {
  cx: beamRightEnd.x,
  topY: beamRightEnd.y + SENIOR_CHAIN,
};
const juniorPan = {
  cx: beamLeftEnd.x,
  topY: beamLeftEnd.y + JUNIOR_CHAIN,
};

// Senior block stack — sits on top of senior pan. TALL.
const SENIOR_BLOCKS = [
  'fundamentals',
  'domain knowledge',
  'frame of reference',
];
const SENIOR_BLOCK_W = 220;
const SENIOR_BLOCK_H = 32;
const SENIOR_BLOCK_GAP = 5;
// Senior figure stands on top of the stack.

// Junior block stack — much shorter. Two blocks only, smaller.
const JUNIOR_BLOCKS = ['fundamentals', 'experience'];
const JUNIOR_BLOCK_W = 180;
const JUNIOR_BLOCK_H = 24;
const JUNIOR_BLOCK_GAP = 4;

// Senior figure sizing
const SENIOR_FIG = { headR: 13, bodyH: 62, armSpan: 32 };
// Junior figure sizing — same proportions, slightly smaller to read "junior"
const JUNIOR_FIG = { headR: 11, bodyH: 48, armSpan: 26 };

// AI siphon icon (top-LEFT). Pulls entry-level tasks away from the junior.
// Junior is now on the LEFT pan, so the AI icon sits in the far upper-left
// corner and the arrow flows UP-LEFT from the junior figure → chip column
// → AI, reading as a clear siphon.
const AI_ICON = {
  cx: 95,
  cy: 70,
  w: 120,
  h: 70,
};

// Entry-level task chips that get siphoned (drawn flowing FROM the junior
// side TOWARD the AI icon). These are the things that USED TO build
// experience. Three concrete examples — enough to make the siphon legible
// without crowding the upper band.
const SIPHONED_TASKS = [
  'data cleanup',
  'boilerplate code',
  'syntax lookups',
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const UncomfortableTruth: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="AI helps senior people most. Right now.">
        The Uncomfortable Truth
      </SlideTitle>

      <div className="relative w-full max-w-[96vw] h-[80vh] -mt-4 flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A weighted scale tipped heavily toward the senior side. On the right pan (which has dropped low under its load), a tall figure stands on a tall stack of glowing cyan blocks labeled fundamentals, domain knowledge, and frame of reference. On the left pan (which has risen high), a smaller junior figure stands on a much shorter stack of muted blocks. Red arrows show entry-level tasks (data cleanup, boilerplate code, syntax lookups) being siphoned away from the junior side into an AI icon in the upper-left corner. The scale beam is tilted heavily toward the senior side on the right. A headline reads: AI is most useful to senior people. Right now. A smaller line reads: harder for junior people to gain that experience when AI does the entry-level tasks. An action line reads: be aware, push on it."
        >
          <defs>
            <filter id="ut-primary-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ut-danger-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="ut-stand-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-text-muted)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* ============================================================ */}
          {/* FLOOR LINE                                                   */}
          {/* ============================================================ */}
          <motion.line
            x1={60}
            y1={STAND.baseY + STAND.baseH + 4}
            x2={VB.w - 60}
            y2={STAND.baseY + STAND.baseH + 4}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.22}
            strokeWidth={1.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          />

          {/* ============================================================ */}
          {/* SCALE STAND — wide base + vertical shaft                     */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Wide base */}
            <rect
              x={STAND.cx - STAND.baseW / 2}
              y={STAND.baseY}
              width={STAND.baseW}
              height={STAND.baseH}
              rx={4}
              fill="url(#ut-stand-grad)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.6}
            />
            {/* Shaft */}
            <rect
              x={STAND.cx - STAND.shaftW / 2}
              y={STAND.topY}
              width={STAND.shaftW}
              height={STAND.baseY - STAND.topY}
              rx={3}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.6}
            />
            {/* Pivot cap (where the beam rests) */}
            <circle
              cx={STAND.cx}
              cy={STAND.topY}
              r={9}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.85}
              strokeWidth={1.8}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* BEAM — tilts on entrance, lands at +14° (right side down)    */}
          {/* ============================================================ */}
          <motion.g
            style={{ originX: `${STAND.cx}px`, originY: `${STAND.topY}px` }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: [0, 4, BEAM.tiltDeg, BEAM.tiltDeg],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              delay: 0.7,
              duration: 1.2,
              times: [0, 0.18, 0.78, 1],
              ease: [0.42, 0, 0.18, 1],
            }}
          >
            <rect
              x={STAND.cx - beamHalf}
              y={STAND.topY - BEAM.thickness / 2}
              width={BEAM.length}
              height={BEAM.thickness}
              rx={5}
              fill="var(--color-text)"
              fillOpacity={0.16}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.85}
              strokeWidth={1.8}
            />
            {/* End caps to anchor the chains */}
            <circle
              cx={STAND.cx - beamHalf}
              cy={STAND.topY}
              r={5}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            />
            <circle
              cx={STAND.cx + beamHalf}
              cy={STAND.topY}
              r={5}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            />
          </motion.g>

          {/* ============================================================ */}
          {/* SENIOR SIDE (RIGHT) — heavy, drops low                       */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.45 }}
          >
            {/* Suspension chain (visual) */}
            <line
              x1={beamRightEnd.x}
              y1={beamRightEnd.y}
              x2={seniorPan.cx - PAN_W * 0.42}
              y2={seniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            <line
              x1={beamRightEnd.x}
              y1={beamRightEnd.y}
              x2={seniorPan.cx + PAN_W * 0.42}
              y2={seniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            {/* Pan */}
            <rect
              x={seniorPan.cx - PAN_W / 2}
              y={seniorPan.topY}
              width={PAN_W}
              height={PAN_H}
              rx={PAN_H / 2}
              fill="var(--color-bg-card)"
              stroke="var(--color-primary)"
              strokeOpacity={0.7}
              strokeWidth={1.8}
            />
          </motion.g>

          {/* Senior block stack — drawn from the bottom up so animations
              read as "stacking up." Each block carries one of the things
              they HAVE (primary cyan). */}
          {(() => {
            const stackBottom = seniorPan.topY - 2;
            return SENIOR_BLOCKS.map((label, i) => {
              // i = 0 is the bottom block (fundamentals)
              const y = stackBottom - (i + 1) * SENIOR_BLOCK_H - i * SENIOR_BLOCK_GAP;
              return (
                <motion.g
                  key={`senior-block-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.7 + i * 0.18,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <rect
                    x={seniorPan.cx - SENIOR_BLOCK_W / 2}
                    y={y}
                    width={SENIOR_BLOCK_W}
                    height={SENIOR_BLOCK_H}
                    rx={5}
                    fill="var(--color-primary)"
                    fillOpacity={0.34}
                    stroke="var(--color-primary)"
                    strokeOpacity={1}
                    strokeWidth={2.4}
                    filter="url(#ut-primary-glow)"
                  />
                  <text
                    x={seniorPan.cx}
                    y={y + SENIOR_BLOCK_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                    fontWeight={800}
                    fill="var(--color-text)"
                    fillOpacity={1}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                  </text>
                </motion.g>
              );
            });
          })()}

          {/* Senior figure — stands tall on top of the stack */}
          {(() => {
            const stackTop =
              seniorPan.topY -
              2 -
              SENIOR_BLOCKS.length * SENIOR_BLOCK_H -
              (SENIOR_BLOCKS.length - 1) * SENIOR_BLOCK_GAP;
            // Feet sit DIRECTLY on the stack top (which sits on the tilted
            // senior pan). Round 7 revert: a previous +45 nudge moved the
            // feet down INTO the block stack, which made the body and arms
            // overlap with the rendered blocks and effectively disappear,
            // leaving only the head visible above the stack. The correct
            // attachment is feetY = stackTop, matching the junior figure
            // exactly so neither figure floats above its pan.
            const feetY = stackTop;
            const cx = seniorPan.cx;
            return (
              <motion.g
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                {/* Body — no filter: a purely vertical line has a zero-width
                    bbox, and the glow filter's relative x/width percentages
                    collapse against that zero bbox, clipping the line to
                    nothing. Match the junior figure: render unfiltered. */}
                <line
                  x1={cx}
                  y1={feetY}
                  x2={cx}
                  y2={feetY - SENIOR_FIG.bodyH}
                  stroke="var(--color-primary)"
                  strokeOpacity={0.95}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
                {/* Arms — out to convey "standing tall" / capable */}
                <line
                  x1={cx - SENIOR_FIG.armSpan}
                  y1={feetY - SENIOR_FIG.bodyH * 0.55}
                  x2={cx + SENIOR_FIG.armSpan}
                  y2={feetY - SENIOR_FIG.bodyH * 0.55}
                  stroke="var(--color-primary)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Legs */}
                <line
                  x1={cx}
                  y1={feetY - SENIOR_FIG.bodyH * 0.05}
                  x2={cx - 12}
                  y2={feetY}
                  stroke="var(--color-primary)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={cx}
                  y1={feetY - SENIOR_FIG.bodyH * 0.05}
                  x2={cx + 12}
                  y2={feetY}
                  stroke="var(--color-primary)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Head — no filter, matching junior figure */}
                <circle
                  cx={cx}
                  cy={feetY - SENIOR_FIG.bodyH - SENIOR_FIG.headR}
                  r={SENIOR_FIG.headR}
                  fill="var(--color-bg)"
                  stroke="var(--color-primary)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                />
                {/* Senior label beneath the pan */}
                <text
                  x={cx}
                  y={seniorPan.topY + PAN_H + 24}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={800}
                  fill="var(--color-primary)"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                  }}
                >
                  senior
                </text>
                <text
                  x={cx}
                  y={seniorPan.topY + PAN_H + 42}
                  textAnchor="middle"
                  fontSize={11}
                  fontStyle="italic"
                  fill="var(--color-text-muted)"
                  fillOpacity={0.85}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  has what AI requires to be useful
                </text>
              </motion.g>
            );
          })()}

          {/* ============================================================ */}
          {/* JUNIOR SIDE (LEFT) — light, rises high                       */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.45 }}
          >
            {/* Suspension chain */}
            <line
              x1={beamLeftEnd.x}
              y1={beamLeftEnd.y}
              x2={juniorPan.cx - PAN_W * 0.42}
              y2={juniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            <line
              x1={beamLeftEnd.x}
              y1={beamLeftEnd.y}
              x2={juniorPan.cx + PAN_W * 0.42}
              y2={juniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            {/* Pan — muted border (not as bright as senior pan) */}
            <rect
              x={juniorPan.cx - PAN_W / 2}
              y={juniorPan.topY}
              width={PAN_W}
              height={PAN_H}
              rx={PAN_H / 2}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={1.6}
            />
          </motion.g>

          {/* Junior block stack — small, muted */}
          {(() => {
            const stackBottom = juniorPan.topY - 2;
            return JUNIOR_BLOCKS.map((label, i) => {
              const y = stackBottom - (i + 1) * JUNIOR_BLOCK_H - i * JUNIOR_BLOCK_GAP;
              return (
                <motion.g
                  key={`junior-block-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.7 + i * 0.18,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <rect
                    x={juniorPan.cx - JUNIOR_BLOCK_W / 2}
                    y={y}
                    width={JUNIOR_BLOCK_W}
                    height={JUNIOR_BLOCK_H}
                    rx={4}
                    fill="var(--color-text-muted)"
                    fillOpacity={0.16}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.75}
                    strokeWidth={1.6}
                  />
                  <text
                    x={juniorPan.cx}
                    y={y + JUNIOR_BLOCK_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="var(--color-text)"
                    fillOpacity={1}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                  </text>
                </motion.g>
              );
            });
          })()}

          {/* Junior figure — smaller, muted */}
          {(() => {
            const stackTop =
              juniorPan.topY -
              2 -
              JUNIOR_BLOCKS.length * JUNIOR_BLOCK_H -
              (JUNIOR_BLOCKS.length - 1) * JUNIOR_BLOCK_GAP;
            // Feet sit directly on the stack top — match senior figure
            // attachment so neither figure floats above its pan.
            const feetY = stackTop;
            const cx = juniorPan.cx;
            return (
              <motion.g
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                {/* Body */}
                <line
                  x1={cx}
                  y1={feetY}
                  x2={cx}
                  y2={feetY - JUNIOR_FIG.bodyH}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Arms — slightly drooping, conveying "less to stand on" */}
                <line
                  x1={cx - JUNIOR_FIG.armSpan}
                  y1={feetY - JUNIOR_FIG.bodyH * 0.45}
                  x2={cx + JUNIOR_FIG.armSpan}
                  y2={feetY - JUNIOR_FIG.bodyH * 0.45}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                {/* Legs */}
                <line
                  x1={cx}
                  y1={feetY - JUNIOR_FIG.bodyH * 0.05}
                  x2={cx - 10}
                  y2={feetY}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                <line
                  x1={cx}
                  y1={feetY - JUNIOR_FIG.bodyH * 0.05}
                  x2={cx + 10}
                  y2={feetY}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                {/* Head */}
                <circle
                  cx={cx}
                  cy={feetY - JUNIOR_FIG.bodyH - JUNIOR_FIG.headR}
                  r={JUNIOR_FIG.headR}
                  fill="var(--color-bg)"
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                />
                {/* Junior label beneath the pan */}
                <text
                  x={cx}
                  y={juniorPan.topY + PAN_H + 24}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={800}
                  fill="var(--color-text-muted)"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                  }}
                >
                  junior
                </text>
                <text
                  x={cx}
                  y={juniorPan.topY + PAN_H + 42}
                  textAnchor="middle"
                  fontSize={11}
                  fontStyle="italic"
                  fill="var(--color-text-muted)"
                  fillOpacity={0.7}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  the path to seniority is being eroded
                </text>
              </motion.g>
            );
          })()}

          {/* ============================================================ */}
          {/* AI SIPHON — entry-level tasks pulled away from the junior    */}
          {/* ============================================================ */}
          {/* AI icon top-right */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.7, duration: 0.5 }}
            style={{
              transformOrigin: `${AI_ICON.cx}px ${AI_ICON.cy}px`,
            }}
          >
            <rect
              x={AI_ICON.cx - AI_ICON.w / 2}
              y={AI_ICON.cy - AI_ICON.h / 2}
              width={AI_ICON.w}
              height={AI_ICON.h}
              rx={12}
              fill="var(--color-bg-card)"
              stroke="var(--color-danger)"
              strokeOpacity={0.85}
              strokeWidth={2}
              filter="url(#ut-danger-glow)"
            />
            {/* AI eyes */}
            <circle
              cx={AI_ICON.cx - 16}
              cy={AI_ICON.cy - 6}
              r={3.5}
              fill="var(--color-danger)"
              fillOpacity={0.95}
            />
            <circle
              cx={AI_ICON.cx + 16}
              cy={AI_ICON.cy - 6}
              r={3.5}
              fill="var(--color-danger)"
              fillOpacity={0.95}
            />
            {/* AI label */}
            <text
              x={AI_ICON.cx}
              y={AI_ICON.cy + 14}
              textAnchor="middle"
              fontSize={11}
              fontWeight={800}
              fill="var(--color-danger)"
              fillOpacity={0.95}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.34em',
              }}
            >
              AI
            </text>
            {/* Antenna */}
            <line
              x1={AI_ICON.cx}
              y1={AI_ICON.cy - AI_ICON.h / 2}
              x2={AI_ICON.cx}
              y2={AI_ICON.cy - AI_ICON.h / 2 - 10}
              stroke="var(--color-danger)"
              strokeOpacity={0.85}
              strokeWidth={2}
            />
            <circle
              cx={AI_ICON.cx}
              cy={AI_ICON.cy - AI_ICON.h / 2 - 14}
              r={3}
              fill="var(--color-danger)"
              fillOpacity={0.95}
            />
          </motion.g>

          {/* Siphon arrow — single curved arc from above the junior figure
              UP through the stacked task chips and into the AI icon. The
              chips ride along this arc. The visual reads as: entry-level
              tasks lifted off the junior, queued up, and absorbed by the AI.
              Drawn BEFORE the chips so the chips' bg-card backplates cover
              the arrow where they overlap and the chip text stays legible. */}
          {(() => {
            const stackTop =
              juniorPan.topY -
              2 -
              JUNIOR_BLOCKS.length * JUNIOR_BLOCK_H -
              (JUNIOR_BLOCKS.length - 1) * JUNIOR_BLOCK_GAP;
            const juniorHeadY =
              stackTop - JUNIOR_FIG.bodyH - JUNIOR_FIG.headR * 2;

            // Single arc: junior head → AI icon right side, bulging UP-RIGHT
            // past the chip column then back DOWN-LEFT into the AI. The
            // chips visually sit "in" the path. (AI is in the upper-LEFT
            // corner; junior is on the LEFT pan.)
            const outStartX = juniorPan.cx;
            const outStartY = juniorHeadY - 14;
            const outEndX = AI_ICON.cx + AI_ICON.w / 2 + 4;
            const outEndY = AI_ICON.cy + AI_ICON.h / 2 - 6;
            // Control point offset so the apex passes near the chip column.
            const outCpX = 360;
            const outCpY = -30;

            return (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.85, duration: 0.7 }}
              >
                {/* Single siphon arc (junior → AI), threading through chips */}
                <motion.path
                  d={`M ${outStartX} ${outStartY} Q ${outCpX} ${outCpY} ${outEndX} ${outEndY}`}
                  fill="none"
                  stroke="var(--color-danger)"
                  strokeOpacity={0.85}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  filter="url(#ut-danger-glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.85, duration: 1.1, ease: 'easeOut' }}
                />
                {/* Arrowhead at the AI end (pointing LEFT into the AI icon) */}
                <motion.polygon
                  points={`${outEndX},${outEndY} ${outEndX + 12},${outEndY - 6} ${outEndX + 12},${outEndY + 6}`}
                  fill="var(--color-danger)"
                  fillOpacity={0.95}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.85, duration: 0.3 }}
                />
              </motion.g>
            );
          })()}

          {/* Siphoned-task chips — entry-level tasks that USED TO build
              experience, drawn as a stacked column ABOVE-RIGHT of the junior
              figure (junior is on LEFT pan; AI sits in top-left corner).
              Drawn AFTER the siphon arrow so each chip's solid bg-card
              backplate masks the arrow underneath the chip text, keeping
              "data cleanup" / "boilerplate code" / "syntax lookups" fully
              legible while the arrow visually still threads through the
              column above and below each chip. */}
          {(() => {
            const chipW = 140;
            const chipH = 24;
            // Chips form a stacked column in the upper band, between the
            // AI icon (top-left) and the junior figure (left pan). The
            // siphon arc bulges UP through the column from junior head
            // and curves back DOWN-LEFT into the AI, so the chips read
            // as "tasks being pulled along the arrow into the AI".
            const chipCx = 265;
            const chipColTopY = 40;
            const chipSpacing = 32;

            return SIPHONED_TASKS.map((task, i) => {
              const cy = chipColTopY + i * chipSpacing;
              return (
                <motion.g
                  key={`task-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.95 + i * 0.12,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {/* Chip — drawn with danger styling because it represents
                      something being TAKEN, not something the junior keeps.
                      Solid bg-card fill acts as a backplate that hides the
                      siphon arrow behind the chip text. */}
                  <rect
                    x={chipCx - chipW / 2}
                    y={cy - chipH / 2}
                    width={chipW}
                    height={chipH}
                    rx={chipH / 2}
                    fill="var(--color-bg-card)"
                    stroke="var(--color-danger)"
                    strokeOpacity={0.85}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                  <text
                    x={chipCx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill="var(--color-danger)"
                    fillOpacity={0.95}
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {task}
                  </text>
                </motion.g>
              );
            });
          })()}

          {/* ============================================================ */}
          {/* HEADLINE CLAIM (upper-right band) + ACTION LINE (bottom-center) */}
          {/* ============================================================ */}
          {/* Headline upper-right — the uncomfortable claim, stated plainly.
              Anchored on the SENIOR side (right) and right-aligned so it
              sits cleanly above the senior stack and fills the upper-right
              band that would otherwise read as empty. */}
          <motion.g
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            <text
              x={VB.w - 50}
              y={70}
              textAnchor="end"
              fontSize={26}
              fontWeight={800}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              <tspan fill="var(--color-text)">AI is most useful to </tspan>
              <tspan fill="var(--color-primary)" fontWeight={900}>
                senior people
              </tspan>
              <tspan fill="var(--color-text)">.</tspan>
            </text>
            <text
              x={VB.w - 50}
              y={102}
              textAnchor="end"
              fontSize={15}
              fill="var(--color-text-muted)"
              fillOpacity={0.95}
              fontStyle="italic"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Right now. They have what AI requires to be useful.
            </text>
            {/* Harder corollary — explicit text, sits below the headline
                in the upper-right band. Anchors the visual semantics of
                the chip siphon (entry-level tasks → AI) on the left. */}
            <text
              x={VB.w - 50}
              y={158}
              textAnchor="end"
              fontSize={13}
              fill="var(--color-text)"
              fillOpacity={0.85}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.005em',
              }}
            >
              <tspan fill="var(--color-text)" fillOpacity={0.85}>Harder corollary: it&rsquo;s harder for </tspan>
              <tspan fill="var(--color-danger)" fontWeight={700} fillOpacity={1}>junior people</tspan>
              <tspan fill="var(--color-text)" fillOpacity={0.85}> to gain</tspan>
            </text>
            <text
              x={VB.w - 50}
              y={178}
              textAnchor="end"
              fontSize={13}
              fill="var(--color-text)"
              fillOpacity={0.85}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              that experience when AI does the entry-level tasks for them.
            </text>
          </motion.g>

          {/* Action line at the bottom — "Be aware. Push on it." */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.5 }}
          >
            <text
              x={STAND.cx}
              y={VB.h - 16}
              textAnchor="middle"
              fontSize={16}
              fontWeight={800}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              <tspan>Be aware. </tspan>
              <tspan fill="var(--color-primary)">Push on it.</tspan>
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default UncomfortableTruth;

/*
 * Tradeoffs / open questions:
 *
 *  - Color budget: 3 accents (primary, text-muted, danger). Per the brief.
 *    Primary = senior's stack of fundamentals. Muted = junior's shorter
 *    stack. Danger = the AI siphon arrow + the entry-level task chips
 *    being taken. text and text-muted carry labels.
 *
 *  - The beam tilts on entrance (+14°, right-side-down) and STAYS tipped.
 *    No softening. The visual disparity (right pan low, left pan high;
 *    tall stack vs short stack; senior figure standing tall vs junior
 *    figure smaller and unsupported) IS the message.
 *
 *  - Does NOT preempt slide 27. There is no lever, no "advantage", no
 *    optimistic flip on this slide. The action line "Be aware. Push on
 *    it." is the directive the brief explicitly calls for at this slide
 *    — it is awareness/agency, not the constructive lever (which lives
 *    on slide 27).
 *
 *  - The siphoned-task chips (data cleanup, boilerplate code, syntax
 *    lookups, simple queries) are deliberately concrete entry-level
 *    work. They are drawn in danger-dashed style flowing FROM the
 *    junior side TOWARD the AI icon — making the corollary visceral:
 *    these are the things that USED TO build seniority and are now
 *    being automated away.
 *
 *  - The two figures are stick-style for reading clarity at viewport
 *    scale. Senior: cyan, glow, arms out (capable, supported by tall
 *    stack). Junior: muted, smaller, slightly drooping arms (less to
 *    stand on, lacks support).
 *
 *  - Title "The Uncomfortable Truth" + subtitle "AI helps senior
 *    people most. Right now." — both per the brief's suggestions.
 *    Headline claim "AI is most useful to senior people." is rendered
 *    as on-canvas text inside the SVG so it pairs with the visual,
 *    not as a separate text block above it.
 *
 *  - One open question: the four siphoned-task chip labels are not
 *    verbatim from the part doc (the doc says "entry-level tasks"
 *    abstractly). I chose four concrete instances — data cleanup,
 *    boilerplate code, syntax lookups, simple queries — because the
 *    visual needed labeled chips to make the siphon legible. If the
 *    speaker prefers different concrete examples, those four strings
 *    are the only thing to swap.
 */
