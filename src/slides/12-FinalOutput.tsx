import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const FinalOutput: React.FC<SlideProps> = () => {
  const tableHeaderStyle = { fill: 'var(--color-text)', fontSize: 10, fontWeight: 700 as const };
  const tableCellStyle = { fill: 'var(--color-text-muted)', fontSize: 9 };

  return (
    <SlideContainer>
      <SlideTitle subtitle="Taxonomy, Gene Ontology, and combined enrichment tables with statistical testing">
        Final Output: Data Tables
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2 flex gap-6">

        {/* Taxonomy Table */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-3">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--color-success)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
              Taxonomy Table
            </span>
          </div>
          <svg viewBox="0 0 300 240" className="w-full flex-1">
            {/* Header */}
            <rect x="5" y="5" width="290" height="28" rx="6" fill="var(--color-success)" opacity="0.12" />
            <text x="20" y="24" {...tableHeaderStyle}>Taxon</text>
            <text x="160" y="24" {...tableHeaderStyle}>Abundance</text>
            <text x="240" y="24" {...tableHeaderStyle}>Fraction</text>

            {/* Rows */}
            {[
              ['Bacteria', '12,450', '0.72'],
              ['Proteobacteria', '8,320', '0.48'],
              ['Gammaproteo.', '4,100', '0.24'],
              ['Cyanobacteria', '3,200', '0.18'],
              ['Firmicutes', '930', '0.05'],
              ['Actinobacteria', '520', '0.03'],
            ].map(([taxon, abund, frac], i) => (
              <g key={i}>
                {i % 2 === 0 && <rect x="5" y={38 + i * 30} width="290" height="30" rx="3" fill="rgba(255,255,255,0.02)" />}
                <text x="20" y={57 + i * 30} {...tableCellStyle}>{taxon}</text>
                <text x="175" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{abund}</text>
                <text x="255" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{frac}</text>
              </g>
            ))}
            <text x="150" y="230" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" opacity="0.5">…per peptide list / replicate</text>
          </svg>
        </motion.div>

        {/* GO Table */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center mb-3">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--color-tertiary)', background: 'rgba(179,136,255,0.1)', border: '1px solid rgba(179,136,255,0.3)' }}>
              GO Table
            </span>
          </div>
          <svg viewBox="0 0 300 240" className="w-full flex-1">
            <rect x="5" y="5" width="290" height="28" rx="6" fill="var(--color-tertiary)" opacity="0.12" />
            <text x="20" y="24" {...tableHeaderStyle}>GO Term</text>
            <text x="160" y="24" {...tableHeaderStyle}>Abundance</text>
            <text x="240" y="24" {...tableHeaderStyle}>Fraction</text>

            {[
              ['metabolic process', '9,800', '0.57'],
              ['transport', '5,400', '0.31'],
              ['nitrogen metab.', '3,200', '0.18'],
              ['ion transport', '2,100', '0.12'],
              ['carbohydrate met.', '1,800', '0.10'],
              ['signal transduc.', '900', '0.05'],
            ].map(([go, abund, frac], i) => (
              <g key={i}>
                {i % 2 === 0 && <rect x="5" y={38 + i * 30} width="290" height="30" rx="3" fill="rgba(255,255,255,0.02)" />}
                <text x="20" y={57 + i * 30} {...tableCellStyle}>{go}</text>
                <text x="175" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{abund}</text>
                <text x="255" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{frac}</text>
              </g>
            ))}
            <text x="150" y="230" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" opacity="0.5">…per peptide list / replicate</text>
          </svg>
        </motion.div>

        {/* Combined Table */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="text-center mb-3">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--color-secondary)', background: 'rgba(255,45,120,0.1)', border: '1px solid rgba(255,45,120,0.3)' }}>
              Combined Table ★
            </span>
          </div>
          <svg viewBox="0 0 420 240" className="w-full flex-1">
            <rect x="5" y="5" width="410" height="28" rx="6" fill="var(--color-secondary)" opacity="0.12" />
            <text x="15" y="24" {...tableHeaderStyle}>GO × Taxon</text>
            <text x="140" y="24" {...tableHeaderStyle}>GO→Tax</text>
            <text x="200" y="24" {...tableHeaderStyle}>Tax→GO</text>
            <text x="272" y="24" {...tableHeaderStyle}>p GO→T</text>
            <text x="352" y="24" {...tableHeaderStyle}>p T→GO</text>

            {[
              ['metab. × Proteo.', '0.48', '0.57', '2.3e-4', '1.8e-3'],
              ['transport × Gamma.', '0.31', '0.41', '1.1e-3', '3.4e-3'],
              ['N-met. × Cyano.', '0.22', '0.68', '4.7e-5', '8.2e-6'],
              ['ion trans. × Gamma.', '0.18', '0.24', '0.012', '0.008'],
              ['carb.met. × Firmic.', '0.09', '0.32', '0.034', '0.11'],
              ['signal × Actino.', '0.04', '0.15', '0.21', '0.34'],
            ].map(([combo, goTax, taxGo, pGoTax, pTaxGo], i) => (
              <g key={i}>
                {i % 2 === 0 && <rect x="5" y={38 + i * 30} width="410" height="30" rx="3" fill="rgba(255,255,255,0.02)" />}
                <text x="15" y={57 + i * 30} {...tableCellStyle}>{combo}</text>
                <text x="150" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{goTax}</text>
                <text x="210" y={57 + i * 30} {...tableCellStyle} textAnchor="middle">{taxGo}</text>
                <text x="280" y={57 + i * 30} {...tableCellStyle} textAnchor="middle" fill={parseFloat(pGoTax) < 0.01 ? 'var(--color-secondary)' : 'var(--color-text-muted)'}>{pGoTax}</text>
                <text x="360" y={57 + i * 30} {...tableCellStyle} textAnchor="middle" fill={parseFloat(pTaxGo) < 0.01 ? 'var(--color-secondary)' : 'var(--color-text-muted)'}>{pTaxGo}</text>
              </g>
            ))}
            <text x="210" y="230" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" opacity="0.5">p-values: enrichment vs. expected by chance</text>
          </svg>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default FinalOutput;
