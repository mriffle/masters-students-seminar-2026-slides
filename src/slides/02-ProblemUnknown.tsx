import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const dots = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: 30 + Math.random() * 40,
  y: 20 + Math.random() * 60,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 2,
}));

const ProblemUnknown: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="The background proteome is vast, unknown, and unannotated">
        Uncharted Metaproteomes
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-4">
        {/* Pipeline flow: Environment → DNA → Metagenome → Metaproteome → ? */}
        <svg viewBox="0 0 1000 400" className="w-full h-full">
          {/* Ocean/Environment */}
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <circle cx="100" cy="200" r="55" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.8" />
            <text x="100" y="190" textAnchor="middle" fill="var(--color-primary)" fontSize="13" fontWeight="600">
              Environment
            </text>
            <text x="100" y="210" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
              (ocean, soil, gut…)
            </text>
            {/* Wave decoration */}
            <path d="M60 240 Q80 230 100 240 Q120 250 140 240" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M65 250 Q85 240 105 250 Q125 260 140 250" stroke="var(--color-primary)" strokeWidth="1" fill="none" opacity="0.25" />
          </motion.g>

          {/* Arrow 1 */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <line x1="160" y1="200" x2="220" y2="200" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.5" />
            <polygon points="220,195 230,200 220,205" fill="var(--color-text-muted)" opacity="0.5" />
          </motion.g>

          {/* DNA Extraction */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <rect x="235" y="165" width="120" height="70" rx="8" fill="none" stroke="var(--color-tertiary)" strokeWidth="2" opacity="0.8" />
            <text x="295" y="195" textAnchor="middle" fill="var(--color-tertiary)" fontSize="13" fontWeight="600">
              Metagenome
            </text>
            <text x="295" y="215" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
              (DNA sequences)
            </text>
          </motion.g>

          {/* Arrow 2 */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            <line x1="360" y1="200" x2="420" y2="200" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.5" />
            <polygon points="420,195 430,200 420,205" fill="var(--color-text-muted)" opacity="0.5" />
          </motion.g>

          {/* Metaproteome */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <rect x="435" y="165" width="130" height="70" rx="8" fill="none" stroke="var(--color-amber)" strokeWidth="2" opacity="0.8" />
            <text x="500" y="195" textAnchor="middle" fill="var(--color-amber)" fontSize="13" fontWeight="600">
              Metaproteome
            </text>
            <text x="500" y="215" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
              (predicted proteins)
            </text>
          </motion.g>

          {/* Arrow 3 */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <line x1="570" y1="200" x2="630" y2="200" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.5" />
            <polygon points="630,195 640,200 630,205" fill="var(--color-text-muted)" opacity="0.5" />
          </motion.g>

          {/* Unknown proteome cloud */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {/* Dark cloud shape */}
            <ellipse cx="780" cy="200" rx="150" ry="120" fill="var(--color-bg-alt)" stroke="var(--color-danger)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

            {/* Scattered unknown dots */}
            {dots.map((d) => (
              <motion.circle
                key={d.id}
                cx={640 + (d.x - 30) * 3.5}
                cy={80 + (d.y - 20) * 4}
                r={d.size * 0.6}
                fill="var(--color-text-muted)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0.15] }}
                transition={{ delay: 1.8 + d.delay * 0.3, duration: 1.5 }}
              />
            ))}

            {/* Question marks */}
            <text x="740" y="180" fill="var(--color-danger)" fontSize="28" fontWeight="bold" opacity="0.7">?</text>
            <text x="800" y="220" fill="var(--color-danger)" fontSize="22" fontWeight="bold" opacity="0.5">?</text>
            <text x="820" y="170" fill="var(--color-danger)" fontSize="18" fontWeight="bold" opacity="0.4">?</text>

            <text x="780" y="340" textAnchor="middle" fill="var(--color-danger)" fontSize="14" fontWeight="600" opacity="0.8">
              No annotations. No taxonomy. No function.
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default ProblemUnknown;
