import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const ProblemDoubleCounting: React.FC<SlideProps> = () => {
  const barDelay = 1.2;

  return (
    <SlideContainer>
      <SlideTitle subtitle="Protein-centric approaches inflate abundance when peptides map to multiple proteins">
        The Double Counting Problem
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2 flex gap-8">
        {/* LEFT: Wrong approach */}
        <motion.div
          className="flex-1 flex flex-col items-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-danger)' }}>✗</span>
            <span className="text-lg font-semibold" style={{ color: 'var(--color-danger)' }}>Protein-Centric</span>
          </div>

          <svg viewBox="0 0 400 340" className="w-full flex-1">
            {/* Peptide */}
            <rect x="140" y="10" width="120" height="36" rx="18" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="2" />
            <text x="200" y="32" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="600" fontFamily="monospace">
              abundance: 100
            </text>

            {/* Lines to proteins */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.line
                key={i}
                x1="200"
                y1="46"
                x2={60 + i * 70}
                y2="90"
                stroke="var(--color-text-muted)"
                strokeWidth="1.5"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              />
            ))}

            {/* 5 proteins each getting 100 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <rect x={40 + i * 70} y="90" width="50" height="24" rx="4" fill="var(--color-bg-card)" stroke="var(--color-danger)" strokeWidth="1.5" opacity="0.7" />
                <text x={65 + i * 70} y="106" textAnchor="middle" fill="var(--color-danger)" fontSize="10" fontWeight="600">
                  +100
                </text>
              </motion.g>
            ))}

            {/* Arrow down to total */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: barDelay }}
            >
              <line x1="200" y1="125" x2="200" y2="160" stroke="var(--color-text-muted)" strokeWidth="1.5" opacity="0.4" />
              <polygon points="195,160 200,170 205,160" fill="var(--color-text-muted)" opacity="0.4" />
            </motion.g>

            {/* Inflated bar */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: barDelay + 0.3 }}
            >
              <text x="200" y="190" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                Total reported abundance
              </text>
              <rect x="60" y="200" width="280" height="40" rx="6" fill="var(--color-danger)" opacity="0.2" stroke="var(--color-danger)" strokeWidth="2" />
              <text x="200" y="226" textAnchor="middle" fill="var(--color-danger)" fontSize="20" fontWeight="800">
                500
              </text>
              <text x="200" y="260" textAnchor="middle" fill="var(--color-danger)" fontSize="12" fontWeight="600" opacity="0.8">
                5× inflated!
              </text>
            </motion.g>
          </svg>
        </motion.div>

        {/* Divider */}
        <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {/* RIGHT: Correct approach */}
        <motion.div
          className="flex-1 flex flex-col items-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>✓</span>
            <span className="text-lg font-semibold" style={{ color: 'var(--color-success)' }}>Peptide-Centric</span>
          </div>

          <svg viewBox="0 0 400 340" className="w-full flex-1">
            {/* Peptide */}
            <rect x="140" y="10" width="120" height="36" rx="18" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="2" />
            <text x="200" y="32" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="600" fontFamily="monospace">
              abundance: 100
            </text>

            {/* Single arrow down */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <line x1="200" y1="46" x2="200" y2="160" stroke="var(--color-success)" strokeWidth="2.5" opacity="0.6" />
              <polygon points="195,160 200,170 205,160" fill="var(--color-success)" opacity="0.6" />

              <text x="240" y="100" fill="var(--color-text-muted)" fontSize="11" opacity="0.7">
                annotate the peptide
              </text>
              <text x="240" y="115" fill="var(--color-text-muted)" fontSize="11" opacity="0.7">
                directly
              </text>
            </motion.g>

            {/* Clean bar */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: barDelay + 0.3 }}
            >
              <text x="200" y="190" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                Total reported abundance
              </text>
              <rect x="140" y="200" width="120" height="40" rx="6" fill="var(--color-success)" opacity="0.2" stroke="var(--color-success)" strokeWidth="2" />
              <text x="200" y="226" textAnchor="middle" fill="var(--color-success)" fontSize="20" fontWeight="800">
                100
              </text>
              <text x="200" y="260" textAnchor="middle" fill="var(--color-success)" fontSize="12" fontWeight="600" opacity="0.8">
                Accurate count
              </text>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default ProblemDoubleCounting;
