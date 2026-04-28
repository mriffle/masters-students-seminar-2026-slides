import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 02 — The Compass: Interesting
 *
 * Plants the primary throughline of the talk: "Something being interesting is
 * THE primary motivator for me." Establishes the compass motif that slide 31
 * (the closing slide) rhymes back to.
 *
 * Layout: split. Compass on the left, verbatim centerpiece quote on the right.
 *
 * Color budget: only --color-primary and --color-text-muted / --color-text.
 * No secondary, tertiary, success, danger, amber. The audience must read this
 * as a single-thesis slide, not a palette demo.
 *
 * Compass design (canonical — slide 31 must reuse these proportions):
 *   - viewBox 0 0 600 600, compass centered at (300, 300) with outer R = 240.
 *   - Four cardinal labels at N/E/S/W (PRESTIGE, MONEY, PLAN, TITLE) drawn in
 *     --color-text-muted at low opacity, with small tick marks in the same.
 *   - INTERESTING label set off-cardinal at the upper-right (about 30 degrees
 *     east of north). Drawn in --color-primary, glowing.
 *   - Needle is a slim diamond (a "lozenge"): pointed end -> INTERESTING,
 *     tail end faded. The pointed half is full --color-primary; the tail
 *     half is --color-text-muted at low opacity. A pivot dot sits at center.
 *   - Outer ring + a faint inner ring in --color-primary at low opacity, so
 *     slide 31 can simply brighten the rings + draw a path trail OUTSIDE the
 *     ring without rebuilding the compass.
 *
 * Slide 31 callback contract:
 *   - Same viewBox, same center, same outer radius, same label positions.
 *   - Slide 31 can: increase ring opacity, intensify needle glow, and add a
 *     faint dotted path trail circling OUTSIDE r=240 (markers for MUDs,
 *     Spinner, Baker, TEI-REX, etc.). The space outside the compass is left
 *     deliberately empty here.
 */

// --- Compass geometry constants (canonical for slides 02 and 31) ---
const CX = 300;
const CY = 300;
const R_OUTER = 240; // outer ring
const R_INNER = 210; // inner faint ring
const R_TICK_OUT = 235;
const R_TICK_IN = 218;
const R_LABEL = 268; // where cardinal labels sit (just outside the ring)

// Angle convention: 0deg = north (12 o'clock), positive clockwise.
// We compute SVG coordinates with: x = CX + r*sin(theta), y = CY - r*cos(theta).
const polar = (rad: number, theta_deg: number): [number, number] => {
  const t = (theta_deg * Math.PI) / 180;
  return [CX + rad * Math.sin(t), CY - rad * Math.cos(t)];
};

// Cardinal labels (faded). N / E / S / W.
const CARDINALS: { label: string; angle: number }[] = [
  { label: 'PRESTIGE', angle: 0 },
  { label: 'MONEY', angle: 90 },
  { label: 'PLAN', angle: 180 },
  { label: 'TITLE', angle: 270 },
];

// "INTERESTING" lives off-cardinal — deliberately not one of the four stock
// career-compass directions. 30deg east of north reads as "up and to the
// right", visibly diagonal so the audience sees the needle pointing OFF the
// cardinal grid.
const INTERESTING_ANGLE = 30;

const Compass: React.FC<SlideProps> = () => {
  // --- Needle endpoints ---
  // The needle is a lozenge: tip at INTERESTING_ANGLE (just shy of inner ring),
  // tail at the opposite angle (shorter), and two side points near the pivot
  // to give it the classic diamond profile.
  const needleTipR = R_INNER - 6;
  const needleTailR = R_INNER * 0.55;
  const needleWaistR = 14;
  const tip = polar(needleTipR, INTERESTING_ANGLE);
  const tail = polar(needleTailR, INTERESTING_ANGLE + 180);
  // Side points are perpendicular to the needle axis at the pivot.
  const sideA = polar(needleWaistR, INTERESTING_ANGLE + 90);
  const sideB = polar(needleWaistR, INTERESTING_ANGLE - 90);

  const needlePointed = `${tip[0]},${tip[1]} ${sideA[0]},${sideA[1]} ${CX},${CY} ${sideB[0]},${sideB[1]}`;
  const needleTail = `${CX},${CY} ${sideA[0]},${sideA[1]} ${tail[0]},${tail[1]} ${sideB[0]},${sideB[1]}`;

  // INTERESTING label position (just outside the ring, along the needle axis).
  const [iLabelX, iLabelY] = polar(R_LABEL, INTERESTING_ANGLE);

  return (
    <SlideContainer>
      <div className="relative w-full max-w-[92vw] h-[78vh] flex flex-row items-center justify-center gap-8 lg:gap-16">
        {/* --- Left: the compass --- */}
        <div className="relative flex-shrink-0 w-[42vw] aspect-square">
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full"
            aria-label="Compass with the needle pointing toward INTERESTING"
          >
            <defs>
              {/* Soft glow filter for the needle tip + INTERESTING label. */}
              <filter id="compass-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer ring (low opacity primary — slide 31 can brighten this). */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_OUTER}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeOpacity={0.35}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Inner faint ring */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_INNER}
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth={1}
              strokeOpacity={0.18}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            />

            {/* Cardinal tick marks (faded). 12 minor ticks every 30deg, with the
                4 cardinals slightly heavier. */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              const isCardinal = angle % 90 === 0;
              const [x1, y1] = polar(R_TICK_IN, angle);
              const [x2, y2] = polar(R_TICK_OUT, angle);
              return (
                <motion.line
                  key={`tick-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-text-muted)"
                  strokeWidth={isCardinal ? 1.5 : 1}
                  strokeOpacity={isCardinal ? 0.55 : 0.25}
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.02, duration: 0.4 }}
                />
              );
            })}

            {/* Cardinal labels (PRESTIGE / MONEY / PLAN / TITLE) — faded. */}
            {CARDINALS.map((c, i) => {
              const [lx, ly] = polar(R_LABEL, c.angle);
              return (
                <motion.text
                  key={c.label}
                  x={lx}
                  y={ly}
                  fill="var(--color-text-muted)"
                  fontSize={18}
                  fontWeight={500}
                  letterSpacing={2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fillOpacity={0.55}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 + i * 0.08, duration: 0.5 }}
                >
                  {c.label}
                </motion.text>
              );
            })}

            {/* Subtle "guide" line from center toward INTERESTING, low opacity,
                so the eye is led from the pivot outward to the bright label. */}
            <motion.line
              x1={CX}
              y1={CY}
              x2={iLabelX}
              y2={iLabelY}
              stroke="var(--color-primary)"
              strokeWidth={1}
              strokeOpacity={0.18}
              strokeDasharray="2 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />

            {/* INTERESTING label (glowing primary). Sits off-cardinal. */}
            <motion.text
              x={iLabelX}
              y={iLabelY}
              fill="var(--color-primary)"
              fontSize={22}
              fontWeight={800}
              letterSpacing={3}
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#compass-glow)"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.45, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              INTERESTING
            </motion.text>

            {/* --- Needle --- */}
            {/* Tail half (faded) */}
            <motion.polygon
              points={needleTail}
              fill="var(--color-text-muted)"
              fillOpacity={0.45}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.6}
              strokeWidth={1}
              strokeLinejoin="round"
              initial={{ opacity: 0, rotate: -25 }}
              animate={{ opacity: 1, rotate: 0 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Pointed half (glowing primary) */}
            <motion.polygon
              points={needlePointed}
              fill="var(--color-primary)"
              fillOpacity={0.9}
              stroke="var(--color-primary)"
              strokeWidth={1.2}
              strokeLinejoin="round"
              filter="url(#compass-glow)"
              initial={{ opacity: 0, rotate: -25 }}
              animate={{ opacity: 1, rotate: 0 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Pivot dot */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={6}
              fill="var(--color-bg)"
              stroke="var(--color-primary)"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            />
          </svg>
        </div>

        {/* --- Right: centerpiece quote --- */}
        <motion.div
          className="flex-1 flex flex-col items-start justify-center max-w-[44vw]"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote
            className="font-bold leading-[1.15] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: 'var(--color-text)' }}
          >
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &ldquo;
            </span>
            Something being{' '}
            <span style={{ color: 'var(--color-primary)' }}>interesting</span> has been{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              THE
            </span>{' '}
            primary motivator for me.
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>

          {/* Thin accent rule, matched to the cover slide's visual grammar but
              single-color (no secondary). Leaves the slide unmistakably "primary". */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 h-[2px] w-32 origin-left"
            style={{ background: 'var(--color-primary)', opacity: 0.6 }}
          />
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default Compass;
