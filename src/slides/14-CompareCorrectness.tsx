import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const CompareCorrectness: React.FC<SlideProps> = () => {
  const v1Color = '#ff6b6b';
  const v2Color = '#00e5ff';

  return (
    <SlideContainer>
      <SlideTitle subtitle="Deterministic results and flexible execution">
        Correctness & Usability
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1200 500" className="w-full h-full">
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
            <line x1="600" y1="10" x2="600" y2="480" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.15" strokeDasharray="4,4" />
          </motion.g>

          {/* === ROW 1: Top-K Filtering === */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <text x="300" y="60" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">Top-K Hit Filtering</text>

            <rect x="130" y="70" width="340" height="130" rx="12" fill={v1Color} opacity="0.04" stroke={v1Color} strokeWidth="1" />

            {/* Show top-K with arbitrary cutoff */}
            <text x="300" y="92" textAnchor="middle" fill={v1Color} fontSize="11" fontWeight="600">Strict top K (ignores ties)</text>

            {/* Visual: 5 hits, scores, arbitrary selection among ties */}
            {['Hit A  score: 92', 'Hit B  score: 85', 'Hit C  score: 80', 'Hit D  score: 80', 'Hit E  score: 80'].map((h, i) => {
              const selected = i < 3;
              const isTied = i >= 2;
              return (
                <g key={i}>
                  <rect x="200" y={100 + i * 20} width="200" height="16" rx="3"
                    fill={selected ? v1Color : 'transparent'}
                    opacity={selected ? 0.1 : 0}
                    stroke={isTied ? v1Color : 'transparent'}
                    strokeWidth="0.5"
                    strokeDasharray={isTied && !selected ? '3,2' : 'none'}
                  />
                  <text x="210" y={112 + i * 20} fill={selected ? v1Color : 'var(--color-text-muted)'} fontSize="9"
                    fontFamily="'JetBrains Mono', monospace" opacity={selected ? 0.9 : 0.4}
                  >
                    {h}
                  </text>
                  {i === 2 && (
                    <text x="415" y={112 + i * 20} fill={v1Color} fontSize="8" opacity="0.7">← K=3 cutoff</text>
                  )}
                </g>
              );
            })}
            <text x="300" y="210" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">
              D and E tied at 80 but excluded — which is selected is stochastic
            </text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <text x="900" y="60" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">Top-K Hit Filtering</text>

            <rect x="730" y="70" width="340" height="130" rx="12" fill={v2Color} opacity="0.04" stroke={v2Color} strokeWidth="1" />

            <text x="900" y="92" textAnchor="middle" fill={v2Color} fontSize="11" fontWeight="600">Top K + ties with Kth hit</text>

            {['Hit A  score: 92', 'Hit B  score: 85', 'Hit C  score: 80', 'Hit D  score: 80', 'Hit E  score: 80'].map((h, i) => (
              <g key={i}>
                <rect x="800" y={100 + i * 20} width="200" height="16" rx="3"
                  fill={v2Color} opacity={0.1}
                  stroke={v2Color} strokeWidth="0.5"
                />
                <text x="810" y={112 + i * 20} fill={v2Color} fontSize="9"
                  fontFamily="'JetBrains Mono', monospace" opacity="0.9"
                >
                  {h}
                </text>
                {i === 4 && (
                  <text x="1015" y={112 + i * 20} fill={v2Color} fontSize="8" opacity="0.7">← all ties included</text>
                )}
              </g>
            ))}
            <text x="900" y="210" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">
              All hits tied with Kth score are included
            </text>
          </motion.g>

          {/* Reproducibility callout */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <rect x="420" y="230" width="360" height="50" rx="25" fill="var(--color-success)" opacity="0.08" stroke="var(--color-success)" strokeWidth="1.5" />
            <text x="600" y="252" textAnchor="middle" fill="var(--color-success)" fontSize="12" fontWeight="700">
              ✓ Deterministic & Reproducible
            </text>
            <text x="600" y="268" textAnchor="middle" fill="var(--color-success)" fontSize="9" opacity="0.8">
              Same input → same taxonomy + GO output, guaranteed
            </text>
          </motion.g>

          {/* === ROW 2: CLI Mode === */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <text x="300" y="310" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="600">Execution Modes</text>

            <rect x="180" y="320" width="240" height="70" rx="10" fill="var(--color-bg-card)" stroke={v1Color} strokeWidth="1" opacity="0.3" />
            <text x="300" y="348" textAnchor="middle" fill={v1Color} fontSize="14" fontWeight="700">Web Only</text>
            <text x="300" y="366" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Must use the web interface</text>
            <text x="300" y="380" textAnchor="middle" fill={v1Color} fontSize="9" opacity="0.6">Cannot automate or script</text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <rect x="690" y="320" width="160" height="70" rx="10" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1.5" opacity="0.4" />
            <text x="770" y="348" textAnchor="middle" fill={v2Color} fontSize="13" fontWeight="700">Web UI</text>
            <text x="770" y="366" textAnchor="middle" fill={v2Color} fontSize="9" opacity="0.7">Full interactive interface</text>

            <text x="880" y="355" fill="var(--color-text-muted)" fontSize="16" fontWeight="700" opacity="0.3">+</text>

            <rect x="900" y="320" width="160" height="70" rx="10" fill="var(--color-bg-card)" stroke="var(--color-amber)" strokeWidth="1.5" opacity="0.4" />
            <text x="980" y="348" textAnchor="middle" fill="var(--color-amber)" fontSize="13" fontWeight="700">CLI Mode</text>
            <text x="980" y="366" textAnchor="middle" fill="var(--color-amber)" fontSize="9" opacity="0.7">Full workflow from terminal</text>
            <text x="980" y="380" textAnchor="middle" fill="var(--color-amber)" fontSize="9" opacity="0.7">Nextflow-ready</text>
          </motion.g>

          {/* CLI example */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <rect x="650" y="405" width="450" height="55" rx="8" fill="#0d1117" stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.6" />
            <text x="670" y="425" fill="var(--color-success)" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.8">
              $ metagomics2 run \
            </text>
            <text x="690" y="440" fill="var(--color-text-muted)" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
              --fasta proteome.fa --peptides *.tsv --db swissprot
            </text>
            <text x="670" y="455" fill="var(--color-text-muted)" fontSize="8" opacity="0.4">
              # scriptable • automatable • Nextflow-compatible
            </text>
          </motion.g>

          {/* Bottom summary */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <rect x="350" y="475" width="500" height="28" rx="14" fill="var(--color-bg-card)" stroke={v2Color} strokeWidth="1" opacity="0.3" />
            <text x="600" y="493" textAnchor="middle" fill={v2Color} fontSize="11" fontWeight="600">
              Reproducible results • Scriptable execution • Automated pipelines
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default CompareCorrectness;
