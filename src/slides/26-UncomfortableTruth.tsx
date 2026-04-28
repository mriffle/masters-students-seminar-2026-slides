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
 *   LEFT pan (heavier, drops down):
 *     Senior figure standing tall on a TALL stack of --color-primary
 *     blocks labeled "fundamentals", "domain knowledge", "frame of
 *     reference". Pan sits LOW (heavy).
 *
 *   RIGHT pan (lighter, rises up):
 *     Junior figure on a MUCH SHORTER stack of --color-text-muted blocks.
 *     Above the junior figure: red --color-danger arrows showing
 *     entry-level tasks being siphoned away by an AI icon. The tasks
 *     that USED TO build experience are being automated.
 *
 *   The beam tilts roughly -16° on slide entrance (left-side-down) and
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
// Geometry — viewBox 1000 x 560
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 560 };

// Stand / pillar — vertical post the beam pivots on. Sits center.
const STAND = {
  cx: 500,
  baseY: 510,            // floor level
  topY: 250,             // beam pivot point
  baseW: 140,             // wide flared base
  baseH: 22,
  shaftW: 22,
};

// Beam — horizontal bar that tilts. Pivots at (STAND.cx, STAND.topY).
// We tilt it heavily toward the senior side (left).
const BEAM = {
  length: 720,            // full beam length
  thickness: 10,
  tiltDeg: -16,           // negative = left side down (senior side heavier)
};

// Pan suspension chain length (visual). Pans hang from each beam end.
const CHAIN_LEN_BASE = 38;

// Pan dimensions
const PAN_W = 230;
const PAN_H = 14;

// Senior side (LEFT pan) — pan ends LOW because it's heavy.
// Junior side (RIGHT pan) — pan ends HIGH because it's light.
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

// Pans hang from beam ends by chains. Senior chain is shorter (heavy → low),
// junior chain is longer (light → high) so the visual disparity reads even
// before the tilt registers.
const SENIOR_CHAIN = CHAIN_LEN_BASE + 18;     // longer drop, but pan still ends low
const JUNIOR_CHAIN = CHAIN_LEN_BASE - 14;     // shorter chain, pan rides higher

const seniorPan = {
  cx: beamLeftEnd.x,
  topY: beamLeftEnd.y + SENIOR_CHAIN,
};
const juniorPan = {
  cx: beamRightEnd.x,
  topY: beamRightEnd.y + JUNIOR_CHAIN,
};

// Senior block stack — sits on top of senior pan. TALL.
const SENIOR_BLOCKS = [
  'fundamentals',
  'domain knowledge',
  'frame of reference',
];
const SENIOR_BLOCK_W = 200;
const SENIOR_BLOCK_H = 30;
const SENIOR_BLOCK_GAP = 4;
// Senior figure stands on top of the stack.

// Junior block stack — much shorter. Two blocks only, smaller.
const JUNIOR_BLOCKS = ['fundamentals', 'experience'];
const JUNIOR_BLOCK_W = 170;
const JUNIOR_BLOCK_H = 22;
const JUNIOR_BLOCK_GAP = 4;

// Senior figure sizing
const SENIOR_FIG = { headR: 12, bodyH: 56, armSpan: 28 };
// Junior figure sizing — same proportions, slightly smaller to read "junior"
const JUNIOR_FIG = { headR: 10, bodyH: 44, armSpan: 24 };

// AI siphon icon (top-right). Pulls entry-level tasks away from the junior.
const AI_ICON = {
  cx: 920,
  cy: 110,
  w: 110,
  h: 64,
};

// Entry-level task chips that get siphoned (drawn flowing FROM the junior
// side TOWARD the AI icon). These are the things that USED TO build
// experience.
const SIPHONED_TASKS = [
  'data cleanup',
  'boilerplate code',
  'syntax lookups',
  'simple queries',
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

      <div className="relative w-full max-w-[94vw] h-[74vh] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A weighted scale tipped heavily toward the senior side. On the left pan, a tall figure stands on a tall stack of cyan blocks labeled fundamentals, domain knowledge, and frame of reference. On the right pan, a smaller junior figure stands on a much shorter stack of muted blocks. Red arrows show entry-level tasks (data cleanup, boilerplate code, syntax lookups, simple queries) being siphoned away from the junior side by an AI icon. The scale beam is tilted heavily toward the senior side. A headline reads: AI is most useful to senior people. Right now. A smaller line reads: harder for junior people to gain that experience when AI does the entry-level tasks. An action line reads: be aware, push on it."
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
          {/* BEAM — tilts on entrance, lands at -16°                      */}
          {/* ============================================================ */}
          <motion.g
            style={{ originX: `${STAND.cx}px`, originY: `${STAND.topY}px` }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: [0, -4, BEAM.tiltDeg, BEAM.tiltDeg],
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
          {/* SENIOR SIDE (LEFT) — heavy, drops low                        */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.45 }}
          >
            {/* Suspension chain (visual) */}
            <line
              x1={beamLeftEnd.x}
              y1={beamLeftEnd.y}
              x2={seniorPan.cx - PAN_W * 0.42}
              y2={seniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            <line
              x1={beamLeftEnd.x}
              y1={beamLeftEnd.y}
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
                    fillOpacity={0.18}
                    stroke="var(--color-primary)"
                    strokeOpacity={0.95}
                    strokeWidth={1.8}
                    filter="url(#ut-primary-glow)"
                  />
                  <text
                    x={seniorPan.cx}
                    y={y + SENIOR_BLOCK_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={13}
                    fontWeight={700}
                    fill="var(--color-text)"
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
            const feetY = stackTop;
            const cx = seniorPan.cx;
            return (
              <motion.g
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                {/* Body */}
                <line
                  x1={cx}
                  y1={feetY - 4}
                  x2={cx}
                  y2={feetY - 4 - SENIOR_FIG.bodyH}
                  stroke="var(--color-primary)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  filter="url(#ut-primary-glow)"
                />
                {/* Arms — out to convey "standing tall" / capable */}
                <line
                  x1={cx - SENIOR_FIG.armSpan}
                  y1={feetY - 4 - SENIOR_FIG.bodyH * 0.55}
                  x2={cx + SENIOR_FIG.armSpan}
                  y2={feetY - 4 - SENIOR_FIG.bodyH * 0.55}
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Legs */}
                <line
                  x1={cx}
                  y1={feetY - 4 - SENIOR_FIG.bodyH * 0.05}
                  x2={cx - 12}
                  y2={feetY - 4}
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={cx}
                  y1={feetY - 4 - SENIOR_FIG.bodyH * 0.05}
                  x2={cx + 12}
                  y2={feetY - 4}
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Head */}
                <circle
                  cx={cx}
                  cy={feetY - 4 - SENIOR_FIG.bodyH - SENIOR_FIG.headR}
                  r={SENIOR_FIG.headR}
                  fill="var(--color-bg)"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  filter="url(#ut-primary-glow)"
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
          {/* JUNIOR SIDE (RIGHT) — light, rises high                      */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.45 }}
          >
            {/* Suspension chain */}
            <line
              x1={beamRightEnd.x}
              y1={beamRightEnd.y}
              x2={juniorPan.cx - PAN_W * 0.42}
              y2={juniorPan.topY}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            <line
              x1={beamRightEnd.x}
              y1={beamRightEnd.y}
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
                    fillOpacity={0.12}
                    stroke="var(--color-text-muted)"
                    strokeOpacity={0.7}
                    strokeWidth={1.4}
                  />
                  <text
                    x={juniorPan.cx}
                    y={y + JUNIOR_BLOCK_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill="var(--color-text-muted)"
                    fillOpacity={0.95}
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
                  y1={feetY - 4}
                  x2={cx}
                  y2={feetY - 4 - JUNIOR_FIG.bodyH}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Arms — slightly drooping, conveying "less to stand on" */}
                <line
                  x1={cx - JUNIOR_FIG.armSpan}
                  y1={feetY - 4 - JUNIOR_FIG.bodyH * 0.45}
                  x2={cx + JUNIOR_FIG.armSpan}
                  y2={feetY - 4 - JUNIOR_FIG.bodyH * 0.45}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                {/* Legs */}
                <line
                  x1={cx}
                  y1={feetY - 4 - JUNIOR_FIG.bodyH * 0.05}
                  x2={cx - 10}
                  y2={feetY - 4}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                <line
                  x1={cx}
                  y1={feetY - 4 - JUNIOR_FIG.bodyH * 0.05}
                  x2={cx + 10}
                  y2={feetY - 4}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                {/* Head */}
                <circle
                  cx={cx}
                  cy={feetY - 4 - JUNIOR_FIG.bodyH - JUNIOR_FIG.headR}
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

          {/* Siphoned-task chips traveling FROM the junior side TOWARD the AI.
              These are the entry-level tasks that USED TO build experience.
              Each chip animates along an arc from above the junior figure
              up toward the AI icon — visualizing the siphon. */}
          {(() => {
            // Junior figure head position (approximate origin for arrows)
            const stackTop =
              juniorPan.topY -
              2 -
              JUNIOR_BLOCKS.length * JUNIOR_BLOCK_H -
              (JUNIOR_BLOCKS.length - 1) * JUNIOR_BLOCK_GAP;
            const juniorHeadY =
              stackTop - 4 - JUNIOR_FIG.bodyH - JUNIOR_FIG.headR * 2;
            const originX = juniorPan.cx;
            const originY = juniorHeadY;

            return SIPHONED_TASKS.map((task, i) => {
              // Lay tasks out in a vertical column ABOVE the junior figure,
              // starting just above the head and extending up. Each task has
              // an arrow flowing up-right toward the AI icon.
              const chipW = 130;
              const chipH = 24;
              const colSpacing = 38;
              const chipCx = originX - 4;
              const chipCy = originY - 30 - i * colSpacing;
              return (
                <motion.g
                  key={`task-${i}`}
                  initial={{ opacity: 0, x: 0, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 2.95 + i * 0.12,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {/* Chip — drawn with danger styling because it represents
                      something being TAKEN, not something the junior keeps. */}
                  <rect
                    x={chipCx - chipW / 2}
                    y={chipCy - chipH / 2}
                    width={chipW}
                    height={chipH}
                    rx={chipH / 2}
                    fill="var(--color-bg-card)"
                    stroke="var(--color-danger)"
                    strokeOpacity={0.65}
                    strokeWidth={1.3}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={chipCx}
                    y={chipCy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill="var(--color-danger)"
                    fillOpacity={0.92}
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

          {/* Siphon arrow — single bold curved arrow from above the junior
              figure into the AI icon. Represents the flow of entry-level
              tasks being taken. Drawn beneath the chips so the chips read as
              "the things being pulled along this arrow." */}
          {(() => {
            const stackTop =
              juniorPan.topY -
              2 -
              JUNIOR_BLOCKS.length * JUNIOR_BLOCK_H -
              (JUNIOR_BLOCKS.length - 1) * JUNIOR_BLOCK_GAP;
            const juniorHeadY =
              stackTop - 4 - JUNIOR_FIG.bodyH - JUNIOR_FIG.headR * 2;
            const startX = juniorPan.cx;
            const startY = juniorHeadY - 14;
            const endX = AI_ICON.cx - AI_ICON.w / 2 - 4;
            const endY = AI_ICON.cy + 8;
            // Control point for a curved Bezier arc up and to the right
            const cpX = (startX + endX) / 2 + 30;
            const cpY = Math.min(startY, endY) - 80;

            return (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.85, duration: 0.7 }}
              >
                <motion.path
                  d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
                  fill="none"
                  stroke="var(--color-danger)"
                  strokeOpacity={0.85}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  filter="url(#ut-danger-glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.85, duration: 0.9, ease: 'easeOut' }}
                />
                {/* Arrowhead at the AI end */}
                <motion.polygon
                  points={`${endX},${endY} ${endX - 12},${endY - 6} ${endX - 12},${endY + 6}`}
                  fill="var(--color-danger)"
                  fillOpacity={0.95}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.6, duration: 0.3 }}
                />
                {/* Caption above the arc */}
                <motion.text
                  x={cpX - 10}
                  y={cpY + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontStyle="italic"
                  fill="var(--color-danger)"
                  fillOpacity={0.95}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.4 }}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  entry-level tasks → automated away
                </motion.text>
              </motion.g>
            );
          })()}

          {/* ============================================================ */}
          {/* HEADLINE CLAIM (top-left) + ACTION LINE (bottom-center)      */}
          {/* ============================================================ */}
          {/* Headline top-left — the uncomfortable claim, stated plainly */}
          <motion.g
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            <text
              x={70}
              y={68}
              fontSize={20}
              fontWeight={800}
              fill="var(--color-text)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.005em',
              }}
            >
              <tspan fill="var(--color-text)">AI is most useful to </tspan>
              <tspan fill="var(--color-primary)" fontWeight={900}>
                senior people
              </tspan>
              <tspan fill="var(--color-text)">.</tspan>
            </text>
            <text
              x={70}
              y={92}
              fontSize={13}
              fill="var(--color-text-muted)"
              fillOpacity={0.9}
              fontStyle="italic"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Right now. They have what AI requires to be useful.
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
              y={VB.h - 14}
              textAnchor="middle"
              fontSize={15}
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
 *  - The beam tilts on entrance (-16°) and STAYS tipped. No softening.
 *    The visual disparity (left pan low, right pan high; tall stack vs
 *    short stack; senior figure standing tall vs junior figure smaller
 *    and unsupported) IS the message.
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
