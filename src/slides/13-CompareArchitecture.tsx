import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const CompareArchitecture: React.FC<SlideProps> = () => {
  const v1Color = '#ff6b6b';
  const v2Color = '#00e5ff';

  return (
    <SlideContainer>
      <SlideTitle subtitle="Architectural improvements that make metagomics2 dramatically faster and simpler">
        metagomics1 → metagomics2
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1200 520" className="w-full h-full">
          {/* Column Headers */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <text x="300" y="28" textAnchor="middle" fill={v1Color} fontSize="16" fontWeight="700" opacity="0.8">
              metagomics 1
            </text>
            <text x="900" y="28" textAnchor="middle" fill={v2Color} fontSize="16" fontWeight="700">
              metagomics2
            </text>
            <line x1="600" y1="10" x2="600" y2="510" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.15" strokeDasharray="4,4" />
          </motion.g>

          {/* === ROW 1: Homology Search === */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <text x="300" y="65" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">Homology Search</text>

            {/* BLAST box */}
            <rect x="180" y="75" width="240" height="70" rx="10" fill={v1Color} opacity="0.06" stroke={v1Color} strokeWidth="1.5" />
            <text x="300" y="100" textAnchor="middle" fill={v1Color} fontSize="20" fontWeight="800">BLAST</text>
            <text x="300" y="118" textAnchor="middle" fill={v1Color} fontSize="10" opacity="0.7">Per-FASTA, sequential</text>
            <text x="300" y="135" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.5">Separate search per peptide list</text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* DIAMOND box */}
            <rect x="780" y="75" width="240" height="70" rx="10" fill={v2Color} opacity="0.06" stroke={v2Color} strokeWidth="1.5" />
            <text x="900" y="100" textAnchor="middle" fill={v2Color} fontSize="20" fontWeight="800">DIAMOND</text>
            <text x="900" y="118" textAnchor="middle" fill={v2Color} fontSize="10" opacity="0.7">Single unified search</text>
            <text x="900" y="135" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.5">All peptide lists combined</text>
          </motion.g>

          {/* Speed comparison arrow */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6, type: 'spring' }}
          >
            <rect x="520" y="82" width="160" height="50" rx="25" fill="var(--color-success)" opacity="0.12" stroke="var(--color-success)" strokeWidth="1.5" />
            <text x="600" y="103" textAnchor="middle" fill="var(--color-success)" fontSize="14" fontWeight="800">~20,000×</text>
            <text x="600" y="120" textAnchor="middle" fill="var(--color-success)" fontSize="9" fontWeight="600">faster</text>
          </motion.g>

          {/* === ROW 2: FASTA Strategy === */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <text x="300" y="180" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">FASTA Strategy</text>

            {/* Multiple FASTAs */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={195 + i * 55} y={190 + i * 6} width="80" height="35" rx="5" fill="var(--color-bg-card)" stroke={v1Color} strokeWidth="1" opacity="0.5" />
                <text x={235 + i * 55} y={212 + i * 6} textAnchor="middle" fill={v1Color} fontSize="8">FASTA {i + 1}</text>
              </g>
            ))}
            <text x="300" y="255" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Separate FASTA per peptide list</text>
            <text x="300" y="268" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Each BLASTed separately (with caching)</text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Single unified FASTA */}
            <rect x="810" y="190" width="180" height="50" rx="8" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1.5" opacity="0.6" />
            <text x="900" y="213" textAnchor="middle" fill={v2Color} fontSize="11" fontWeight="600">Unified FASTA</text>
            <text x="900" y="228" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">All lists → 1 search</text>
            <text x="900" y="258" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.6">Aho-Corasick matching (very fast)</text>
            <text x="900" y="271" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.6">Single DIAMOND search against DB</text>
          </motion.g>

          {/* === ROW 3: Language & Architecture === */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <text x="300" y="310" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">Codebase</text>

            <rect x="150" y="320" width="300" height="70" rx="10" fill="var(--color-bg-card)" stroke={v1Color} strokeWidth="1" opacity="0.3" />
            <text x="300" y="343" textAnchor="middle" fill={v1Color} fontSize="13" fontWeight="700">Java</text>
            <text x="300" y="358" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">External job manager required</text>
            <text x="300" y="372" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Difficult to maintain and extend</text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <rect x="750" y="320" width="300" height="70" rx="10" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1.5" opacity="0.4" />
            <text x="900" y="340" textAnchor="middle" fill={v2Color} fontSize="13" fontWeight="700">Python</text>
            <text x="900" y="355" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">No external dependencies</text>
            <text x="900" y="369" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">Clean backend/frontend separation</text>
            <text x="900" y="383" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">Far more maintainable and accessible</text>
          </motion.g>

          {/* === ROW 4: User Interface === */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <text x="300" y="420" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">User Interface</text>

            <rect x="150" y="430" width="300" height="55" rx="10" fill="var(--color-bg-card)" stroke={v1Color} strokeWidth="1" opacity="0.3" />
            <text x="300" y="453" textAnchor="middle" fill={v1Color} fontSize="11" fontWeight="600">Static Web UI</text>
            <text x="300" y="470" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Basic interface • No CLI option</text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <rect x="750" y="430" width="300" height="55" rx="10" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1.5" opacity="0.4" />
            <text x="900" y="450" textAnchor="middle" fill={v2Color} fontSize="11" fontWeight="600">Dynamic Web UI + CLI</text>
            <text x="900" y="465" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">Rich interactive visualizations</text>
            <text x="900" y="479" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">Full command-line mode for automation</text>
          </motion.g>

          {/* Bottom summary */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <rect x="300" y="498" width="600" height="28" rx="14" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1" opacity="0.3" />
            <text x="600" y="516" textAnchor="middle" fill={v2Color} fontSize="11" fontWeight="600">
              Simpler to deploy • Far more maintainable • Superior UI • ~20,000× faster
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default CompareArchitecture;
