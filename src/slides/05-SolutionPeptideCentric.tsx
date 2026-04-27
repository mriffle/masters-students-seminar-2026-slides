import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

const annotationStreams = [
  { label: 'Taxonomy', color: '#00e5ff', angle: -50, len: 180 },
  { label: 'GO Terms', color: '#b388ff', angle: -25, len: 160 },
  { label: 'EC Numbers', color: '#ffab00', angle: 0, len: 150 },
  { label: 'Pathways', color: '#ff2d78', angle: 25, len: 160 },
  { label: 'Keywords', color: '#00e676', angle: 50, len: 180 },
];

const SolutionPeptideCentric: React.FC<SlideProps> = () => {
  const cx = 500;
  const cy = 240;

  return (
    <SlideContainer>
      <motion.h1
        className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        The <span style={{ color: 'var(--color-primary)' }}>Peptide</span> Is the Unit of Analysis
      </motion.h1>
      <motion.p
        className="text-lg font-light text-center mb-6"
        style={{ color: 'var(--color-text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Annotations flow to the peptide — not from proteins outward
      </motion.p>

      <div className="relative w-full max-w-[90vw] h-[70vh]">
        <svg viewBox="0 0 1000 480" className="w-full h-full">
          {/* Glow behind peptide */}
          <defs>
            <radialGradient id="peptideGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow circle */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="120"
            fill="url(#peptideGlow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.0 }}
          />

          {/* Central peptide */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <rect x={cx - 80} y={cy - 28} width="160" height="56" rx="28" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" strokeWidth="3" filter="url(#glow)" />
            <text x={cx} y={cy - 2} textAnchor="middle" fill="var(--color-primary)" fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
              PEPTIDE
            </text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
              abundance: 100
            </text>
          </motion.g>

          {/* Annotation streams converging on peptide */}
          {annotationStreams.map((stream, i) => {
            const rad = (stream.angle * Math.PI) / 180;
            const startX = cx + Math.cos(rad + Math.PI) * stream.len;
            const startY = cy + Math.sin(rad + Math.PI) * stream.len;
            const endX = cx + Math.cos(rad + Math.PI) * 90;
            const endY = cy + Math.sin(rad + Math.PI) * 90;

            return (
              <motion.g key={i}>
                {/* Stream label */}
                <motion.text
                  x={startX}
                  y={startY}
                  textAnchor="middle"
                  fill={stream.color}
                  fontSize="13"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                >
                  {stream.label}
                </motion.text>

                {/* Arrow line */}
                <motion.line
                  x1={startX}
                  y1={startY + 12}
                  x2={endX}
                  y2={endY}
                  stroke={stream.color}
                  strokeWidth="2"
                  opacity="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.6 }}
                />

                {/* Animated dot traveling along the line */}
                <motion.circle
                  r="4"
                  fill={stream.color}
                  opacity="0.8"
                  initial={{ cx: startX, cy: startY + 12, opacity: 0 }}
                  animate={{
                    cx: [startX, endX],
                    cy: [startY + 12, endY],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    delay: 1.8 + i * 0.15,
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeIn',
                  }}
                />
              </motion.g>
            );
          })}

          {/* Bottom note */}
          <motion.text
            x={cx}
            y="450"
            textAnchor="middle"
            fill="var(--color-text-muted)"
            fontSize="13"
            opacity="0.6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            Each peptide's abundance contributes exactly once to every annotation term
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default SolutionPeptideCentric;
