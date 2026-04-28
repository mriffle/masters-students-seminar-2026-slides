import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 10 — The Three-Way Translation
 *
 * The conceptual anchor of Part 2. Slide 09 planted a faint version of this
 * diagram (three muted peripheral nodes around a glowing central one); slide
 * 10 is the FULL reveal — labeled, animated, with directional translation
 * lines and data-flow dots traveling along them.
 *
 * Three audiences (load-bearing — must appear with their characterizations,
 * verbatim from SLIDES.md slide 10 entry):
 *   - Bench biologists       — have a question, don't always know how to ask it computationally.
 *   - Hardcore statisticians — can answer a clean question, don't have the domain context.
 *   - Software engineers     — can build infrastructure, don't know what should be built.
 *
 * The data scientist sits at the intersection.
 *
 * Footer line (load-bearing, must appear, verbatim):
 *   "This is the part of the job that doesn't get taught in a Masters program."
 *
 * Topology: ONE node at top, TWO at bottom (0° / 120° / 240° around the center).
 * This MUST match slide 09's foreshadow geometry. Placement chosen here:
 *   - Top (0°)        : Bench biologists       — they're the source of the question
 *   - Bottom-left (240°): Hardcore statisticians
 *   - Bottom-right (120°): Software engineers
 *
 * Color budget (3 accents max): --color-primary (data scientist + translation
 * lines + flowing dots) and --color-text-muted (corner nodes, characterizations,
 * footer). Per the brief, this keeps the visual unified — the data scientist is
 * unambiguously the center of gravity.
 */

const VB = { w: 1000, h: 560 };
const CENTER = { x: VB.w / 2, y: VB.h / 2 + 10 };
const PERIPH_R = 215;

// 0 / 120 / 240 — same triangular topology as slide 09. One node at the top,
// two at the bottom. Order chosen so bench biologists sit at the apex (the
// source of the question), with statisticians bottom-left and engineers
// bottom-right.
const AUDIENCES = [
  {
    key: 'bio',
    angle: 0, // top
    label: 'Bench biologists',
    blurb: 'have a question, don’t always know how to ask it computationally.',
  },
  {
    key: 'eng',
    angle: 120, // bottom-right
    label: 'Software engineers',
    blurb: 'can build infrastructure, don’t know what should be built.',
  },
  {
    key: 'stat',
    angle: 240, // bottom-left
    label: 'Hardcore statisticians',
    blurb: 'can answer a clean question, don’t have the domain context.',
  },
];

const polar = (cx: number, cy: number, r: number, theta_deg: number): [number, number] => {
  const t = (theta_deg * Math.PI) / 180;
  return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
};

// How far back from the corner node to terminate the line, so the line stops
// at the node edge rather than punching into it.
const NODE_R = 28; // outer node circle radius
const LINE_END_TRIM = NODE_R + 6;

const ThreeWayTranslation: React.FC<SlideProps> = () => {
  const corners = AUDIENCES.map((a) => {
    const [x, y] = polar(CENTER.x, CENTER.y, PERIPH_R, a.angle);
    // Trim line endpoint back from the node center along the radial direction.
    const dx = x - CENTER.x;
    const dy = y - CENTER.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const lineEndX = x - (dx / len) * LINE_END_TRIM;
    const lineEndY = y - (dy / len) * LINE_END_TRIM;
    // Trim line start from the central node's edge as well.
    const CENTER_TRIM = 36;
    const lineStartX = CENTER.x + (dx / len) * CENTER_TRIM;
    const lineStartY = CENTER.y + (dy / len) * CENTER_TRIM;
    return {
      ...a,
      x,
      y,
      lineStartX,
      lineStartY,
      lineEndX,
      lineEndY,
    };
  });

  return (
    <SlideContainer>
      <SlideTitle subtitle="The data scientist sits at the intersection.">
        The Three-Way Translation
      </SlideTitle>

      <div className="relative w-full max-w-[92vw] h-[68vh] flex flex-col items-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="t3w-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="t3w-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="t3w-center-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
              <stop offset="55%" stopColor="var(--color-primary)" stopOpacity={0.1} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* --- Translation lines (drawn first, sit beneath nodes) --- */}
          {corners.map((c, i) => (
            <motion.line
              key={`line-${c.key}`}
              x1={c.lineStartX}
              y1={c.lineStartY}
              x2={c.lineEndX}
              y2={c.lineEndY}
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              strokeOpacity={0.45}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}

          {/* --- Data-flow dots traveling outward along each line --- */}
          {/* Per SLIDE_STYLE.md §6.3, infinite loop, 1-2s, with delay. The dots
              travel FROM the data scientist TO each corner audience, illustrating
              the translator pushing the question/answer outward. */}
          {corners.map((c, i) => (
            <motion.circle
              key={`dot-${c.key}`}
              r={3.5}
              fill="var(--color-primary)"
              filter="url(#t3w-glow-soft)"
              initial={{
                cx: c.lineStartX,
                cy: c.lineStartY,
                opacity: 0,
              }}
              animate={{
                cx: [c.lineStartX, c.lineEndX],
                cy: [c.lineStartY, c.lineEndY],
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.15, 0.85, 1],
                ease: 'linear',
                repeat: Infinity,
                delay: 1.6 + i * 0.6,
              }}
            />
          ))}

          {/* --- Soft halo behind the central data scientist node --- */}
          <motion.circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={110}
            fill="url(#t3w-center-grad)"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          />

          {/* --- Corner audience nodes --- */}
          {corners.map((c, i) => {
            // Decide label placement: top corner gets label above; bottom
            // corners get labels below their node.
            const isTop = c.angle === 0;
            const labelY = isTop ? c.y - NODE_R - 22 : c.y + NODE_R + 26;
            const blurbY = isTop ? c.y - NODE_R - 4 : c.y + NODE_R + 48;
            return (
              <motion.g
                key={`node-${c.key}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.55 + i * 0.12,
                  duration: 0.55,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              >
                {/* Node — muted ring with subtle fill */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={NODE_R}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.07}
                  stroke="var(--color-text-muted)"
                  strokeWidth={1.5}
                  strokeOpacity={0.55}
                />
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={5}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.85}
                />

                {/* Label */}
                <text
                  x={c.x}
                  y={labelY}
                  textAnchor="middle"
                  fontSize={20}
                  fontWeight={700}
                  fill="var(--color-text)"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {c.label}
                </text>
                {/* Characterization — italic, muted */}
                <text
                  x={c.x}
                  y={blurbY}
                  textAnchor="middle"
                  fontSize={13}
                  fontStyle="italic"
                  fill="var(--color-text-muted)"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {c.blurb}
                </text>
              </motion.g>
            );
          })}

          {/* --- Central data scientist node (drawn last so it sits on top) --- */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          >
            {/* Outer ring */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={42}
              fill="var(--color-primary)"
              fillOpacity={0.12}
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeOpacity={0.8}
              filter="url(#t3w-glow)"
            />
            {/* Bright core */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={8}
              fill="var(--color-primary)"
              fillOpacity={0.95}
              filter="url(#t3w-glow)"
            />
            {/* Label inside/below the central node */}
            <text
              x={CENTER.x}
              y={CENTER.y + 68}
              textAnchor="middle"
              fontSize={16}
              fontWeight={700}
              fill="var(--color-primary)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Data Scientist
            </text>
          </motion.g>
        </svg>

        {/* --- Footer caption: the "doesn't get taught" line ---
            Verbatim from SLIDES.md slide 10 entry. Sits beneath the diagram
            as a subordinate caption — load-bearing editorial line, but
            visually subordinate to the diagram. */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center px-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-sm md:text-base lg:text-lg italic text-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            This is the part of the job that doesn&rsquo;t get taught in a Masters program.
          </p>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default ThreeWayTranslation;
