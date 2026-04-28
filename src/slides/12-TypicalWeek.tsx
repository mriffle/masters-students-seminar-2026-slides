import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 12 - A Typical Week
 *
 * Daily-reality grounding slide. A donut chart of weekly time allocation
 * sits in the center, flanked by two italic callouts that carry the
 * load-bearing surprise factors:
 *
 *   LEFT  -- "Half the job isn't coding."
 *            communication-as-deliverable (writing, figures) is a major
 *            part of the work, not a footnote.
 *
 *   RIGHT -- "Personal-project time is deliberate, not a confession."
 *            it's how you stay sharp and how the next project gets
 *            generated.
 *
 * Segments (must total ~100%, per part2_present.md "Typical Week (Hours
 * Breakdown)"):
 *   Coding ............... 50%   --color-primary  (cyan, the speaker's
 *                                  primary work — largest wedge)
 *   Writing & figures .... 20%   --color-tertiary (violet)
 *   Meetings ............. 10%   --color-amber    (cautionary/contextual)
 *   Reading ..............  8%   --color-text-muted
 *   Personal projects .... 12%   --color-success  ("deliberate, not a
 *                                  confession" — the speaker says
 *                                  "sometimes more than 10%". This wedge
 *                                  also carries a subtle glow filter to
 *                                  mark its deliberate nature.)
 *
 * Color budget note (deliberate exception to the 3-accent default):
 *   This is a CHART slide. Donut segments need to be distinguishable, so
 *   per the slide brief we use multiple accents. Each color still carries
 *   its deck-wide meaning:
 *     - primary (cyan)        : the speaker's primary work / fundamentals
 *     - tertiary (violet)     : a supporting visual (writing/figures —
 *                               the communication output, paired with
 *                               coding as the other half of the work)
 *     - amber                 : intermediate / cautionary (meetings)
 *     - text-muted            : low-key time (reading)
 *     - success (green)       : "right approach" — personal projects as
 *                               deliberate practice, with glow.
 */

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

const VB = { w: 560, h: 560 };
const CENTER = { x: VB.w / 2, y: VB.h / 2 };
const R_OUTER = 220;
const R_INNER = 130;
const LABEL_R = 250; // where percentage labels sit (just outside the ring)
const ACTIVITY_LABEL_R = 290; // activity name sits a bit further out

interface Segment {
  key: string;
  label: string;
  pct: number;
  color: string;
  emphasized?: boolean; // adds a subtle outward push + glow
}

// Order chosen so the largest wedge (coding) starts at the top and we
// rotate clockwise. The "personal projects" wedge sits between reading
// and coding, where the glow reads cleanly without overlapping a label.
//
// Total: 50 + 20 + 10 + 8 + 12 = 100
const SEGMENTS: Segment[] = [
  { key: 'coding', label: 'Coding', pct: 50, color: 'var(--color-primary)' },
  { key: 'writing', label: 'Writing & figures', pct: 20, color: 'var(--color-tertiary)' },
  { key: 'meetings', label: 'Meetings', pct: 8, color: 'var(--color-amber)' },
  { key: 'reading', label: 'Reading', pct: 10, color: 'var(--color-text-muted)' },
  {
    key: 'personal',
    label: 'Personal projects',
    pct: 12,
    color: 'var(--color-success)',
    emphasized: true,
  },
];

const TAU = Math.PI * 2;

// Convert a fractional position around the circle (0..1, starting from
// 12 o'clock, clockwise) to (x, y) at a given radius from CENTER.
const polar = (frac: number, r: number): [number, number] => {
  const theta = frac * TAU - Math.PI / 2; // -PI/2 puts 0 at 12 o'clock
  return [CENTER.x + r * Math.cos(theta), CENTER.y + r * Math.sin(theta)];
};

// Build an annular-sector path (donut wedge). startFrac and endFrac are
// fractions of the full circle (0..1). The wedge goes clockwise from
// startFrac to endFrac.
const wedgePath = (startFrac: number, endFrac: number): string => {
  // Guard against full-circle (undefined arc); not relevant for our data.
  const [x1Outer, y1Outer] = polar(startFrac, R_OUTER);
  const [x2Outer, y2Outer] = polar(endFrac, R_OUTER);
  const [x1Inner, y1Inner] = polar(endFrac, R_INNER);
  const [x2Inner, y2Inner] = polar(startFrac, R_INNER);
  const largeArc = endFrac - startFrac > 0.5 ? 1 : 0;

  return [
    `M ${x1Outer} ${y1Outer}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
    `L ${x1Inner} ${y1Inner}`,
    `A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
    'Z',
  ].join(' ');
};

// Precompute segment placements: cumulative fractional offsets and midpoints.
interface PlacedSegment extends Segment {
  startFrac: number;
  endFrac: number;
  midFrac: number;
  midX: number;
  midY: number;
  pctX: number;
  pctY: number;
  labelX: number;
  labelY: number;
  pushX: number; // outward push direction (unit vector)
  pushY: number;
}

const placeSegments = (): PlacedSegment[] => {
  let cum = 0;
  return SEGMENTS.map((s) => {
    const startFrac = cum / 100;
    const endFrac = (cum + s.pct) / 100;
    const midFrac = (startFrac + endFrac) / 2;
    cum += s.pct;

    const midTheta = midFrac * TAU - Math.PI / 2;
    const midRingR = (R_OUTER + R_INNER) / 2;
    const midX = CENTER.x + midRingR * Math.cos(midTheta);
    const midY = CENTER.y + midRingR * Math.sin(midTheta);

    const [pctX, pctY] = polar(midFrac, LABEL_R);
    const [labelX, labelY] = polar(midFrac, ACTIVITY_LABEL_R);

    const pushX = Math.cos(midTheta);
    const pushY = Math.sin(midTheta);

    return {
      ...s,
      startFrac,
      endFrac,
      midFrac,
      midX,
      midY,
      pctX,
      pctY,
      labelX,
      labelY,
      pushX,
      pushY,
    };
  });
};

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const TypicalWeek: React.FC<SlideProps> = () => {
  const placed = placeSegments();

  return (
    <SlideContainer>
      <SlideTitle subtitle="Most of the surprise lives in two slices.">
        A Typical Week
      </SlideTitle>

      <div className="w-full max-w-[92vw] h-[72vh] flex flex-row items-center justify-between gap-4 mt-1">
        <Callout
          side="left"
          delay={1.4}
          emphasis="Half the job isn't coding."
          tail="Writing and figures alone are 20%. Add meetings and reading and the non-coding half is real work, not overhead."
          accent="var(--color-tertiary)"
        />

        <div className="flex-1 flex items-center justify-center h-full">
          <Donut placed={placed} />
        </div>

        <Callout
          side="right"
          delay={1.7}
          emphasis="Personal-project time is deliberate, not a confession."
          tail="It's how you stay sharp — and how the next project gets generated."
          accent="var(--color-success)"
        />
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Donut
// ---------------------------------------------------------------------------

const Donut: React.FC<{ placed: PlacedSegment[] }> = ({ placed }) => {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="h-full w-auto max-w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Subtle outer glow for the "personal projects" wedge — marks its
            deliberate nature visually. */}
        <filter id="tw-personal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft glow for the central caption */}
        <filter id="tw-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="tw-center-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
          <stop offset="60%" stopColor="var(--color-primary)" stopOpacity={0.05} />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Soft halo behind the donut hole */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={R_INNER - 4}
        fill="url(#tw-center-grad)"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      />

      {/* Wedges */}
      {placed.map((seg, i) => {
        const path = wedgePath(seg.startFrac, seg.endFrac);
        const pushDist = seg.emphasized ? 6 : 0;
        const dx = seg.pushX * pushDist;
        const dy = seg.pushY * pushDist;
        return (
          <motion.g
            key={seg.key}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.45 + i * 0.1,
              duration: 0.55,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            transform={`translate(${dx} ${dy})`}
          >
            <path
              d={path}
              fill={seg.color}
              fillOpacity={seg.emphasized ? 0.25 : 0.22}
              stroke={seg.color}
              strokeWidth={seg.emphasized ? 2.5 : 1.75}
              strokeOpacity={seg.emphasized ? 1 : 0.85}
              filter={seg.emphasized ? 'url(#tw-personal-glow)' : undefined}
            />
          </motion.g>
        );
      })}

      {/* Center caption — total hours / week framing */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <text
          x={CENTER.x}
          y={CENTER.y + 22}
          textAnchor="middle"
          fontSize={13}
          fontStyle="italic"
          fill="var(--color-text-muted)"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          approximate hours allocation
        </text>
      </motion.g>

      {/* Percentage labels — sit just outside the ring, in the segment color */}
      {placed.map((seg, i) => (
        <motion.g
          key={`pct-${seg.key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 + i * 0.08, duration: 0.5 }}
        >
          <text
            x={seg.pctX + seg.pushX * (seg.emphasized ? 6 : 0)}
            y={seg.pctY + seg.pushY * (seg.emphasized ? 6 : 0) + 5}
            textAnchor="middle"
            fontSize={22}
            fontWeight={700}
            fill={seg.color}
            filter={seg.emphasized ? 'url(#tw-soft-glow)' : undefined}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {seg.pct}%
          </text>
        </motion.g>
      ))}

      {/* Activity name labels — further out, smaller, muted text */}
      {placed.map((seg, i) => {
        // For the activity-name layer, anchor depends on which side the
        // label sits to avoid clipping at the SVG edges.
        const anchor: 'start' | 'middle' | 'end' =
          seg.pushX < -0.3 ? 'end' : seg.pushX > 0.3 ? 'start' : 'middle';
        return (
          <motion.text
            key={`label-${seg.key}`}
            x={seg.labelX + seg.pushX * (seg.emphasized ? 6 : 0)}
            y={seg.labelY + seg.pushY * (seg.emphasized ? 6 : 0) + 22}
            textAnchor={anchor}
            fontSize={13}
            fontWeight={500}
            fill="var(--color-text)"
            opacity={0.92}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.92 }}
            transition={{ delay: 0.95 + i * 0.08, duration: 0.5 }}
          >
            {seg.label}
          </motion.text>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Callout
// ---------------------------------------------------------------------------
//
// Italic muted line flanking the donut. The emphasized phrase carries the
// load-bearing message; the tail gives the supporting "why" in muted text.
const Callout: React.FC<{
  side: 'left' | 'right';
  delay: number;
  emphasis: string;
  tail: string;
  accent: string;
}> = ({ side, delay, emphasis, tail, accent }) => {
  const initialX = side === 'left' ? -16 : 16;
  return (
    <motion.div
      className="flex flex-col gap-3 max-w-[22vw]"
      style={{ textAlign: side === 'left' ? 'right' : 'left' }}
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Accent rule — a thin colored line on the side closest to the donut,
          tying the callout to the segment it's about. */}
      <div
        className="self-stretch flex"
        style={{ justifyContent: side === 'left' ? 'flex-end' : 'flex-start' }}
        aria-hidden
      >
        <div
          style={{
            width: 'clamp(40px, 5vw, 60px)',
            height: 2,
            background: accent,
            opacity: 0.7,
            borderRadius: 999,
          }}
        />
      </div>

      <p
        className="italic leading-snug"
        style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(1.05rem, 1.5vw, 1.4rem)',
          fontWeight: 600,
        }}
      >
        <span style={{ color: accent }}>&ldquo;</span>
        {emphasis}
        <span style={{ color: accent }}>&rdquo;</span>
      </p>
      <p
        className="leading-snug italic"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(0.82rem, 1vw, 1rem)',
          opacity: 0.92,
        }}
      >
        {tail}
      </p>
    </motion.div>
  );
};

export default TypicalWeek;
