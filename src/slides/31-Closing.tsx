import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

/**
 * Slide 31 — Closing: Follow What's Interesting
 *
 * The FINAL slide of the 31-slide talk. Direct visual rhyme with slide 02.
 *
 * Continuity contract with slide 02:
 *   - Same compass geometry (CX=300, CY=300, R_OUTER=240, R_INNER=210,
 *     R_LABEL=268, INTERESTING_ANGLE=30, four cardinals PRESTIGE/MONEY/PLAN/TITLE).
 *   - Same shape language (lozenge needle, off-cardinal INTERESTING label).
 *   - Same color budget: --color-primary + --color-text-muted + --color-text.
 *
 * What changes vs slide 02 (the "callback signal"):
 *   - Outer ring opacity 0.35 -> 0.75 (brighter).
 *   - Needle glow filter stdDeviation 3.5 -> 5.5 (stronger glow).
 *   - INTERESTING label fontSize 22 -> 24, with an extra outer glow filter.
 *   - Inner ring opacity 0.18 -> 0.35.
 *   - Pivot dot stroke width bumped 2 -> 2.5.
 *
 *   - A faint dotted/dashed trail circling OUTSIDE the ring at r=R_TRAIL,
 *     marking the speaker's actual touchpoints in talk order:
 *       MUDs (~1996) -> Spinner (~1998) -> Baker -> TEI-REX -> Masters -> 60+ pubs
 *     drawn in --color-text-muted so they don't compete with the compass.
 *   - A "forward arrow" extends from the last trail marker outward to the
 *     right edge with a "YOU" indicator — implication: the same path is open.
 *
 * Layout: split, mirroring slide 02. Compass + trail on the LEFT, the verbatim
 * callback quote stacked above the closing tagline on the RIGHT.
 */

// --- CANONICAL compass geometry constants (REUSED VERBATIM from slide 02) ---
const CX = 300;
const CY = 300;
const R_OUTER = 240;
const R_INNER = 210;
const R_TICK_OUT = 235;
const R_TICK_IN = 218;
const R_LABEL = 268;

// New for slide 31 — the trail sits OUTSIDE the compass labels.
const R_TRAIL = 322;

const polar = (rad: number, theta_deg: number): [number, number] => {
  const t = (theta_deg * Math.PI) / 180;
  return [CX + rad * Math.sin(t), CY - rad * Math.cos(t)];
};

const CARDINALS: { label: string; angle: number }[] = [
  { label: 'PRESTIGE', angle: 0 },
  { label: 'MONEY', angle: 90 },
  { label: 'PLAN', angle: 180 },
  { label: 'TITLE', angle: 270 },
];

const INTERESTING_ANGLE = 30;

// Trail markers: chronological touchpoints from the talk, arranged as an arc
// that sweeps around the compass starting from the lower-left ("the past")
// and ending at the upper-right ("now / future"), so the path visually
// converges on the same direction the needle points.
//
// Angles are in compass degrees (0 = north, clockwise). We sweep from
// roughly 200deg (lower-left, "the past") around through 270/0/30 ending
// near the INTERESTING needle direction at upper-right.
const TRAIL_MARKERS: { label: string; angle: number }[] = [
  { label: 'MUDs', angle: 200 },
  { label: 'Spinner', angle: 235 },
  { label: 'Baker', angle: 270 },
  { label: 'TEI-REX', angle: 305 },
  { label: 'Masters', angle: 340 },
  { label: '60+ pubs', angle: 15 },
];

const Closing: React.FC<SlideProps> = () => {
  // --- Needle endpoints (same construction as slide 02) ---
  const needleTipR = R_INNER - 6;
  const needleTailR = R_INNER * 0.55;
  const needleWaistR = 14;
  const tip = polar(needleTipR, INTERESTING_ANGLE);
  const tail = polar(needleTailR, INTERESTING_ANGLE + 180);
  const sideA = polar(needleWaistR, INTERESTING_ANGLE + 90);
  const sideB = polar(needleWaistR, INTERESTING_ANGLE - 90);

  const needlePointed = `${tip[0]},${tip[1]} ${sideA[0]},${sideA[1]} ${CX},${CY} ${sideB[0]},${sideB[1]}`;
  const needleTail = `${CX},${CY} ${sideA[0]},${sideA[1]} ${tail[0]},${tail[1]} ${sideB[0]},${sideB[1]}`;

  const [iLabelX, iLabelY] = polar(R_LABEL, INTERESTING_ANGLE);

  // Trail arc — a faint dashed circle hint behind the markers, plus the
  // markers themselves. We draw it as a full circle at low opacity so the
  // eye reads "the path wrapped around the compass".
  return (
    <SlideContainer>
      <div className="relative w-full max-w-[92vw] h-[78vh] flex flex-row items-center justify-center gap-8 lg:gap-16">
        {/* --- Left: the compass (brighter) + the path trail --- */}
        <div className="relative flex-shrink-0 w-[44vw] aspect-square">
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full"
            aria-label="The compass from slide 2, brighter, with the speaker's path traced around it"
          >
            <defs>
              {/* Stronger needle glow than slide 02 (stdDev 3.5 -> 5.5). */}
              <filter id="closing-needle-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Even stronger glow for the INTERESTING label so it reads
                  as "the same compass, but lit up". */}
              <filter id="closing-label-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* --- Trail arc behind the markers (faint dashed full circle) --- */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_TRAIL}
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth={1}
              strokeOpacity={0.22}
              strokeDasharray="2 7"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ delay: 1.7, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* --- Compass: outer ring (BRIGHTER than slide 02: 0.35 -> 0.75) --- */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_OUTER}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2.25}
              strokeOpacity={0.75}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Inner ring (brighter: 0.18 -> 0.35) */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_INNER}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={1}
              strokeOpacity={0.35}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            />

            {/* Cardinal tick marks — same as slide 02 (kept faded). */}
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

            {/* Cardinal labels (PRESTIGE / MONEY / PLAN / TITLE) — faded, same as slide 02. */}
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

            {/* Subtle guide line from center toward INTERESTING (slide 02 callback). */}
            <motion.line
              x1={CX}
              y1={CY}
              x2={iLabelX}
              y2={iLabelY}
              stroke="var(--color-primary)"
              strokeWidth={1}
              strokeOpacity={0.28}
              strokeDasharray="2 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />

            {/* INTERESTING label (more luminous than slide 02). */}
            <motion.text
              x={iLabelX}
              y={iLabelY}
              fill="var(--color-primary)"
              fontSize={24}
              fontWeight={800}
              letterSpacing={3}
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#closing-label-glow)"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.45, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              INTERESTING
            </motion.text>

            {/* --- Needle (brighter glow) --- */}
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
            <motion.polygon
              points={needlePointed}
              fill="var(--color-primary)"
              fillOpacity={1}
              stroke="var(--color-primary)"
              strokeWidth={1.4}
              strokeLinejoin="round"
              filter="url(#closing-needle-glow)"
              initial={{ opacity: 0, rotate: -25 }}
              animate={{ opacity: 1, rotate: 0 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.circle
              cx={CX}
              cy={CY}
              r={6}
              fill="var(--color-bg)"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            />

            {/* --- Path trail markers (touchpoints from the talk) --- */}
            {TRAIL_MARKERS.map((m, i) => {
              const [mx, my] = polar(R_TRAIL, m.angle);
              // Label sits slightly further out than the dot, on the same radial.
              const [lx, ly] = polar(R_TRAIL + 22, m.angle);
              return (
                <motion.g
                  key={m.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 + i * 0.15, duration: 0.5 }}
                >
                  <circle
                    cx={mx}
                    cy={my}
                    r={3.5}
                    fill="var(--color-text-muted)"
                    fillOpacity={0.85}
                  />
                  <text
                    x={lx}
                    y={ly}
                    fill="var(--color-text-muted)"
                    fontSize={12}
                    fontWeight={500}
                    letterSpacing={1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fillOpacity={0.85}
                  >
                    {m.label}
                  </text>
                </motion.g>
              );
            })}

            {/* --- Forward arrow: from the last trail marker outward, in the
                same direction the needle points. The compass faces forward. --- */}
            {(() => {
              // Start just past the last trail marker label, end near the right
              // edge of the viewBox. We use the INTERESTING_ANGLE so the arrow
              // visually reinforces the needle direction.
              const [ax1, ay1] = polar(R_TRAIL + 42, INTERESTING_ANGLE);
              const [ax2, ay2] = polar(R_TRAIL + 130, INTERESTING_ANGLE);
              // Arrowhead — small triangle perpendicular at the tip.
              const headBase = polar(R_TRAIL + 116, INTERESTING_ANGLE);
              const headLeft = polar(R_TRAIL + 116, INTERESTING_ANGLE - 4);
              const headRight = polar(R_TRAIL + 116, INTERESTING_ANGLE + 4);
              // Tip of arrow == ax2,ay2; base sits a touch behind it.
              const headPoints = `${ax2},${ay2} ${headLeft[0] - 0 * headBase[0]},${headLeft[1]} ${headRight[0]},${headRight[1]}`;
              const [youX, youY] = polar(R_TRAIL + 156, INTERESTING_ANGLE);
              return (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                  <line
                    x1={ax1}
                    y1={ay1}
                    x2={ax2}
                    y2={ay2}
                    stroke="var(--color-primary)"
                    strokeWidth={1.75}
                    strokeOpacity={0.7}
                    strokeLinecap="round"
                  />
                  <polygon
                    points={headPoints}
                    fill="var(--color-primary)"
                    fillOpacity={0.85}
                  />
                  <text
                    x={youX}
                    y={youY}
                    fill="var(--color-primary)"
                    fontSize={13}
                    fontWeight={700}
                    letterSpacing={2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fillOpacity={0.95}
                  >
                    YOU
                  </text>
                </motion.g>
              );
            })()}
          </svg>
        </div>

        {/* --- Right: verbatim callback quote + closing tagline --- */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-[44vw] gap-10">
          {/* Verbatim callback quote (word-for-word from slide 02). */}
          <motion.blockquote
            className="font-bold leading-[1.15] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &ldquo;
            </span>
            Something being{' '}
            <span style={{ color: 'var(--color-primary)' }}>interesting</span> is{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              THE
            </span>{' '}
            primary motivator for me.
            <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
              &rdquo;
            </span>
          </motion.blockquote>

          {/* Accent rule, brighter than slide 02 (matches the compass intensification). */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="h-[2px] w-40 origin-left"
            style={{ background: 'var(--color-primary)', opacity: 0.9 }}
          />

          {/* Closing tagline (must appear, in muted text per the brief). */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl lg:text-2xl leading-snug font-light"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Follow what&rsquo;s interesting. Invest in fundamentals.
            <br />
            <span style={{ color: 'var(--color-text)' }}>
              The lever has never been bigger.
            </span>
          </motion.p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Closing;
