import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const GONoDblCount: React.FC<SlideProps> = () => {
  const peptides = [
    { label: 'PEP₁', abundance: 150, nodes: ['bio. process', 'metabolic proc.', 'transport'] },
    { label: 'PEP₂', abundance: 80, nodes: ['bio. process', 'transport', 'ion transport'] },
    { label: 'PEP₃', abundance: 200, nodes: ['bio. process', 'metabolic proc.', 'nitrogen met.'] },
  ];

  const goNodes = [
    { label: 'bio. process', total: '430' },
    { label: 'metabolic proc.', total: '350' },
    { label: 'nitrogen met.', total: '200' },
    { label: 'transport', total: '230' },
    { label: 'ion transport', total: '80' },
  ];

  return (
    <SlideContainer>
      <SlideTitle subtitle="Each peptide's abundance contributes exactly once to each GO term">
        Gene Ontology: No Double Counting
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1100 400" className="w-full h-full">

          {/* Peptides on the left */}
          {peptides.map((p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
            >
              <rect x="20" y={50 + i * 115} width="180" height="80" rx="12" fill="var(--color-tertiary)" opacity="0.08" stroke="var(--color-tertiary)" strokeWidth="1.5" />
              <text x="110" y={75 + i * 115} textAnchor="middle" fill="var(--color-tertiary)" fontSize="14" fontWeight="700" fontFamily="monospace">
                {p.label}
              </text>
              <text x="110" y={95 + i * 115} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                abundance: {p.abundance}
              </text>
              <text x="110" y={118 + i * 115} textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" opacity="0.6">
                → {p.nodes.join(', ')}
              </text>
            </motion.g>
          ))}

          {/* Arrows from peptides to GO nodes */}
          {peptides.map((p, pi) =>
            p.nodes.map((node, ni) => {
              const targetIdx = goNodes.findIndex((g) => g.label === node);
              if (targetIdx < 0) return null;
              return (
                <motion.line
                  key={`${pi}-${ni}`}
                  x1="200"
                  y1={90 + pi * 115}
                  x2="620"
                  y2={65 + targetIdx * 68}
                  stroke="var(--color-tertiary)"
                  strokeWidth="1.2"
                  opacity="0.12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ delay: 1.0 + pi * 0.12 + ni * 0.04 }}
                />
              );
            })
          )}

          {/* GO nodes on the right */}
          {goNodes.map((node, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
            >
              <rect x="620" y={42 + i * 68} width="200" height="46" rx="10" fill="var(--color-tertiary)" opacity="0.08" stroke="var(--color-tertiary)" strokeWidth="1.5" />
              <text x="720" y={60 + i * 68} textAnchor="middle" fill="var(--color-tertiary)" fontSize="12" fontWeight="600">
                {node.label}
              </text>
              <text x="720" y={78 + i * 68} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                total: {node.total}
              </text>
            </motion.g>
          ))}

          {/* Key insight box */}
          <motion.g
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <rect x="870" y="80" width="210" height="100" rx="12" fill="var(--color-bg-card)" stroke="var(--color-tertiary)" strokeWidth="1.5" opacity="0.6" />
            <text x="975" y="108" textAnchor="middle" fill="var(--color-tertiary)" fontSize="12" fontWeight="700">
              Same Principle
            </text>
            <text x="975" y="130" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              PEP₂ (abundance 80)
            </text>
            <text x="975" y="148" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              +80 to bio. process
            </text>
            <text x="975" y="163" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              +80 to transport, +80 to ion transport
            </text>
          </motion.g>

          <motion.text
            x="550" y="390" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" opacity="0.5"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.3 }}
          >
            No inflation — each peptide contributes its abundance exactly once per GO term
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default GONoDblCount;
