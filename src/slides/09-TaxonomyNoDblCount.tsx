import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const TaxonomyNoDblCount: React.FC<SlideProps> = () => {
  const peptides = [
    { label: 'PEP₁', abundance: 150, nodes: ['Bacteria', 'Proteobacteria'] },
    { label: 'PEP₂', abundance: 80, nodes: ['Bacteria', 'Proteobacteria', 'Gammaproteo.'] },
    { label: 'PEP₃', abundance: 200, nodes: ['Bacteria', 'Cyanobacteria'] },
  ];

  const taxNodes = [
    { label: 'Bacteria', total: '430' },
    { label: 'Proteobacteria', total: '230' },
    { label: 'Gammaproteo.', total: '80' },
    { label: 'Cyanobacteria', total: '200' },
  ];

  return (
    <SlideContainer>
      <SlideTitle subtitle="Each peptide's abundance contributes exactly once to each taxonomy node">
        Taxonomy: No Double Counting
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
              <rect x="30" y={60 + i * 110} width="170" height="70" rx="12" fill="var(--color-primary)" opacity="0.08" stroke="var(--color-primary)" strokeWidth="1.5" />
              <text x="115" y={85 + i * 110} textAnchor="middle" fill="var(--color-primary)" fontSize="14" fontWeight="700" fontFamily="monospace">
                {p.label}
              </text>
              <text x="115" y={105 + i * 110} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                abundance: {p.abundance}
              </text>
              <text x="115" y={120 + i * 110} textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" opacity="0.6">
                → {p.nodes.join(', ')}
              </text>
            </motion.g>
          ))}

          {/* Arrows from peptides to tax nodes */}
          {peptides.map((p, pi) =>
            p.nodes.map((node, ni) => {
              const targetIdx = taxNodes.findIndex((t) => t.label === node);
              if (targetIdx < 0) return null;
              return (
                <motion.line
                  key={`${pi}-${ni}`}
                  x1="200"
                  y1={95 + pi * 110}
                  x2="620"
                  y2={80 + targetIdx * 85}
                  stroke="var(--color-success)"
                  strokeWidth="1.5"
                  opacity="0.15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ delay: 1.0 + pi * 0.15 + ni * 0.05 }}
                />
              );
            })
          )}

          {/* Contribution labels on arrows */}
          {peptides.map((p, pi) =>
            p.nodes.map((node, ni) => {
              const targetIdx = taxNodes.findIndex((t) => t.label === node);
              if (targetIdx < 0) return null;
              const midX = 410;
              const midY = (95 + pi * 110 + 80 + targetIdx * 85) / 2;
              return (
                <motion.text
                  key={`lbl-${pi}-${ni}`}
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  fill="var(--color-success)"
                  fontSize="10"
                  fontWeight="600"
                  opacity="0.6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1.3 + pi * 0.15 + ni * 0.05 }}
                >
                  +{p.abundance}
                </motion.text>
              );
            })
          )}

          {/* Taxonomy nodes on the right */}
          {taxNodes.map((node, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            >
              <rect x="620" y={55 + i * 85} width="200" height="50" rx="10" fill="var(--color-success)" opacity="0.08" stroke="var(--color-success)" strokeWidth="1.5" />
              <text x="720" y={75 + i * 85} textAnchor="middle" fill="var(--color-success)" fontSize="13" fontWeight="600">
                {node.label}
              </text>
              <text x="720" y={93 + i * 85} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                total: {node.total}
              </text>
            </motion.g>
          ))}

          {/* Key insight box */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <rect x="870" y="100" width="210" height="80" rx="12" fill="var(--color-bg-card)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
            <text x="975" y="128" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="700">
              Key Insight
            </text>
            <text x="975" y="150" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              PEP₁ abundance (150) counts
            </text>
            <text x="975" y="165" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              once for Bacteria, once for Proteo.
            </text>
          </motion.g>

          {/* Footer */}
          <motion.text
            x="550"
            y="390"
            textAnchor="middle"
            fill="var(--color-text-muted)"
            fontSize="12"
            opacity="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.3 }}
          >
            No inflation — each peptide contributes its abundance exactly once per taxonomy node
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default TaxonomyNoDblCount;
