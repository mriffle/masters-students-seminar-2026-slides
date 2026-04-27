import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const PipelineOverview: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Annotations flow from the database back through background proteins to original peptides">
        Pipeline Overview
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1200 480" className="w-full h-full">
          <defs>
            {/* Arrowhead for forward arrows */}
            <marker id="arrowFwd" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="0,0 10,3 0,6" fill="var(--color-text-muted)" opacity="0.6" />
            </marker>
            {/* Arrowhead for return flow (colored) */}
            <marker id="arrowBack" viewBox="0 0 10 6" refX="0" refY="3" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="10,0 0,3 10,6" fill="var(--color-secondary)" opacity="0.8" />
            </marker>
            <marker id="arrowBackGreen" viewBox="0 0 10 6" refX="0" refY="3" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="10,0 0,3 10,6" fill="var(--color-success)" opacity="0.8" />
            </marker>
          </defs>

          {/* ===== COLUMN 1: Original Peptide Lists ===== */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <text x="80" y="30" textAnchor="middle" fill="var(--color-primary)" fontSize="13" fontWeight="700">
              Peptide Lists
            </text>
            {['PEP₁', 'PEP₂', 'PEP₃', 'PEP₄', 'PEP₅'].map((p, i) => (
              <g key={i}>
                <rect x="25" y={50 + i * 46} width="110" height="30" rx="15" fill="var(--color-primary)" opacity="0.12" stroke="var(--color-primary)" strokeWidth="1.5" />
                <text x="80" y={69 + i * 46} textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="600">
                  {p}
                </text>
              </g>
            ))}
            <text x="80" y="295" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" opacity="0.5">
              with abundances
            </text>
          </motion.g>

          {/* Forward arrow: Peptides → Background Proteins */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <text x="195" y="22" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10" opacity="0.5">
              Match
            </text>
            <line x1="145" y1="160" x2="230" y2="160" stroke="var(--color-text-muted)" strokeWidth="1.5" opacity="0.3" markerEnd="url(#arrowFwd)" />
          </motion.g>

          {/* ===== COLUMN 2: Background Proteins ===== */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <text x="310" y="30" textAnchor="middle" fill="var(--color-text-muted)" fontSize="13" fontWeight="700">
              Background Proteins
            </text>
            {['Prot A', 'Prot B', 'Prot C', 'Prot D', 'Prot E', 'Prot F'].map((p, i) => (
              <g key={i}>
                <rect x="245" y={50 + i * 40} width="130" height="26" rx="5" fill="var(--color-bg-card)" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.5" />
                <text x="310" y={67 + i * 40} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">
                  {p}
                </text>
              </g>
            ))}
            <text x="310" y="310" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" opacity="0.5">
              from metagenome FASTA
            </text>
          </motion.g>

          {/* Many-to-many lines: Peptides ↔ Background Proteins */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              [0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5], [1, 0], [3, 5],
            ].map(([pi, pri], idx) => (
              <line
                key={idx}
                x1="135"
                y1={65 + pi * 46}
                x2="245"
                y2={63 + pri * 40}
                stroke="var(--color-text-muted)"
                strokeWidth="1"
              />
            ))}
          </motion.g>

          {/* Forward arrow: Background Proteins → DIAMOND */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <line x1="385" y1="160" x2="470" y2="160" stroke="var(--color-text-muted)" strokeWidth="1.5" opacity="0.3" markerEnd="url(#arrowFwd)" />
          </motion.g>

          {/* ===== COLUMN 3: DIAMOND Homology Search ===== */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {/* DIAMOND shape */}
            <polygon points="550,70 620,150 550,230 480,150" fill="var(--color-tertiary)" opacity="0.08" stroke="var(--color-tertiary)" strokeWidth="2" />
            <text x="550" y="140" textAnchor="middle" fill="var(--color-tertiary)" fontSize="14" fontWeight="800">
              DIAMOND
            </text>
            <text x="550" y="158" textAnchor="middle" fill="var(--color-tertiary)" fontSize="10" opacity="0.7">
              Homology
            </text>
            <text x="550" y="172" textAnchor="middle" fill="var(--color-tertiary)" fontSize="10" opacity="0.7">
              Search
            </text>

            {/* Filter parameters */}
            <rect x="490" y="248" width="120" height="60" rx="8" fill="var(--color-bg-card)" stroke="var(--color-tertiary)" strokeWidth="1" opacity="0.5" />
            <text x="550" y="266" textAnchor="middle" fill="var(--color-tertiary)" fontSize="9" fontWeight="600">
              Filter by:
            </text>
            <text x="550" y="280" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
              e-value, % identity
            </text>
            <text x="550" y="294" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
              top-K hits
            </text>
            <line x1="550" y1="230" x2="550" y2="248" stroke="var(--color-tertiary)" strokeWidth="1" opacity="0.3" />
          </motion.g>

          {/* Forward arrow: DIAMOND → Annotated DB */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <line x1="625" y1="150" x2="715" y2="150" stroke="var(--color-text-muted)" strokeWidth="1.5" opacity="0.3" markerEnd="url(#arrowFwd)" />
            <text x="670" y="140" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" opacity="0.5">
              hits
            </text>
          </motion.g>

          {/* ===== COLUMN 4: Annotated Database ===== */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <text x="830" y="30" textAnchor="middle" fill="var(--color-amber)" fontSize="13" fontWeight="700">
              Annotated Database
            </text>
            <text x="830" y="46" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10" opacity="0.6">
              SwissProt / TrEMBL
            </text>

            {/* Database entries with annotations */}
            {[
              { id: 'P12345', tax: 'Bacteria > Proteo.', go: 'GO:0006810' },
              { id: 'Q67890', tax: 'Bacteria > Cyano.', go: 'GO:0008150' },
              { id: 'O11223', tax: 'Bacteria > Proteo.', go: 'GO:0003674' },
              { id: 'P44556', tax: 'Bacteria > Firmic.', go: 'GO:0005575' },
            ].map((entry, i) => (
              <g key={i}>
                <rect x="725" y={60 + i * 60} width="210" height="46" rx="8" fill="var(--color-bg-card)" stroke="var(--color-amber)" strokeWidth="1.2" opacity="0.5" />
                <text x="740" y={78 + i * 60} fill="var(--color-amber)" fontSize="10" fontWeight="600" fontFamily="monospace">
                  {entry.id}
                </text>
                <text x="740" y={92 + i * 60} fill="var(--color-success)" fontSize="8" opacity="0.8">
                  Tax: {entry.tax}
                </text>
                <text x="890" y={92 + i * 60} fill="var(--color-tertiary)" fontSize="8" opacity="0.8">
                  {entry.go}
                </text>
              </g>
            ))}
          </motion.g>

          {/* ===== RETURN FLOW: Annotations flowing BACK ===== */}
          {/* This is the key visual — bold colored arrows flowing leftward */}

          {/* Return arrow: Annotated DB → Background Proteins */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {/* Main return path */}
            <path
              d="M 725,340 L 625,340 Q 550,340 550,320 L 550,310 Q 550,290 530,290 L 375,370"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="0"
              opacity="0"
            />
            {/* Annotation flow arrow: DB → DIAMOND filter → Background Proteins */}
            <line x1="725" y1="340" x2="375" y2="340" stroke="var(--color-secondary)" strokeWidth="2.5" opacity="0.5" markerEnd="url(#arrowBack)" />
            <text x="550" y="332" textAnchor="middle" fill="var(--color-secondary)" fontSize="10" fontWeight="600" opacity="0.8">
              annotations pass through DIAMOND filter
            </text>

            {/* Return arrow: Background Proteins → Peptides */}
            <line x1="245" y1="370" x2="135" y2="370" stroke="var(--color-success)" strokeWidth="2.5" opacity="0.5" markerEnd="url(#arrowBackGreen)" />
            <text x="190" y="362" textAnchor="middle" fill="var(--color-success)" fontSize="10" fontWeight="600" opacity="0.8">
              transfer to peptides
            </text>

            {/* Flow label boxes */}
            <rect x="375" y="355" width="130" height="30" rx="6" fill="var(--color-bg-card)" stroke="var(--color-secondary)" strokeWidth="1.5" opacity="0.6" />
            <text x="440" y="373" textAnchor="middle" fill="var(--color-secondary)" fontSize="9" fontWeight="600">
              Taxonomy + GO
            </text>
          </motion.g>

          {/* Animated flow dots going backwards */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`dot-back-${i}`}
              r="4"
              fill="var(--color-secondary)"
              opacity="0.8"
              initial={{ cx: 725, cy: 340 }}
              animate={{
                cx: [725, 550, 375, 245, 135],
                cy: [340, 340, 340, 370, 370],
              }}
              transition={{
                duration: 3,
                delay: 2.2 + i * 0.8,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'linear',
              }}
            />
          ))}

          {/* Bottom summary */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <rect x="300" y="420" width="600" height="40" rx="12" fill="var(--color-bg-card)" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4" />
            <text x="600" y="444" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="600">
              Each peptide receives taxonomy + GO annotations from its matched database proteins
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default PipelineOverview;
