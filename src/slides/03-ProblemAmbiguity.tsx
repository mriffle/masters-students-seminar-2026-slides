import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const organisms = [
  { label: 'Synechococcus', color: '#00e5ff', x: 780, y: 60 },
  { label: 'Prochlorococcus', color: '#00e676', x: 850, y: 120 },
  { label: 'SAR11', color: '#ffab00', x: 820, y: 185 },
  { label: 'Alteromonas', color: '#ff2d78', x: 870, y: 245 },
  { label: 'Vibrio sp.', color: '#b388ff', x: 790, y: 305 },
  { label: 'Roseobacter', color: '#00e5ff', x: 850, y: 365 },
  { label: 'Flavobacteria', color: '#00e676', x: 780, y: 425 },
];

const proteins = [
  { label: 'Prot A', y: 50 },
  { label: 'Prot B', y: 100 },
  { label: 'Prot C', y: 150 },
  { label: 'Prot D', y: 195 },
  { label: 'Prot E', y: 240 },
  { label: 'Prot F', y: 285 },
  { label: 'Prot G', y: 330 },
  { label: 'Prot H', y: 375 },
  { label: 'Prot I', y: 420 },
];

const ProblemAmbiguity: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="A single peptide can map to many proteins from many organisms">
        The Many-to-Many Problem
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1000 480" className="w-full h-full">
          {/* Peptide (left) */}
          <motion.g
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <rect x="40" y="200" width="180" height="60" rx="30" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="2.5" />
            <text x="130" y="225" textAnchor="middle" fill="var(--color-primary)" fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
              VGDANPALQK
            </text>
            <text x="130" y="245" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
              1 peptide
            </text>
          </motion.g>

          {/* Fan-out lines from peptide to each protein */}
          {proteins.map((p, i) => (
            <motion.line
              key={i}
              x1="220"
              y1="230"
              x2="480"
              y2={p.y + 15}
              stroke="var(--color-text-muted)"
              strokeWidth="1.2"
              opacity="0.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
            />
          ))}

          {/* Proteins (middle) */}
          {proteins.map((p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
            >
              <rect x="480" y={p.y} width="130" height="30" rx="6" fill="var(--color-bg-card)" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.7" />
              <text x="545" y={p.y + 19} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                {p.label}
              </text>
            </motion.g>
          ))}

          {/* Lines from proteins to organisms */}
          {proteins.map((p, i) => {
            const org = organisms[i % organisms.length];
            return (
              <motion.line
                key={`org-${i}`}
                x1="610"
                y1={p.y + 15}
                x2={org.x - 10}
                y2={org.y + 10}
                stroke={org.color}
                strokeWidth="1"
                opacity="0.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.3 + i * 0.06, duration: 0.4 }}
              />
            );
          })}

          {/* Organisms (right) */}
          {organisms.map((org, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.08, duration: 0.4 }}
            >
              <circle cx={org.x} cy={org.y + 10} r="8" fill={org.color} opacity="0.6" />
              <text x={org.x + 16} y={org.y + 14} fill={org.color} fontSize="12" fontWeight="500">
                {org.label}
              </text>
            </motion.g>
          ))}

          {/* Labels */}
          <text x="545" y="470" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" opacity="0.6">
            9 background proteins
          </text>
          <text x="830" y="470" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" opacity="0.6">
            7 organisms
          </text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default ProblemAmbiguity;
