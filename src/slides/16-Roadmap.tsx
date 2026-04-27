import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const roadmapItems = [
  {
    title: 'P-value Calculations',
    desc: 'Bootstrap-based empirical null distributions for GO↔Taxon enrichment significance',
    color: '#ff2d78',
    icon: 'σ',
  },
  {
    title: 'Enhanced Visualizations',
    desc: 'Visual presentation of enrichment p-values in the results viewer',
    color: '#b388ff',
    icon: '◎',
  },
  {
    title: 'Cross-Sample Statistics',
    desc: 'Compare across N groups or time series — differential enrichment analysis',
    color: '#ffab00',
    icon: 'Δ',
  },
  {
    title: 'Cross-Sample Views',
    desc: 'Visualizations for comparing and contrasting results across samples',
    color: '#00e5ff',
    icon: '⊞',
  },
  {
    title: 'Parallel Processing',
    desc: 'Parallelize peptide list statistical analysis — minutes saved per list',
    color: '#00e676',
    icon: '⫽',
  },
  {
    title: 'Nextflow Workflow',
    desc: 'Complete raw → search → metagomics2 pipeline as a Nextflow workflow',
    color: '#ff6b6b',
    icon: '⟳',
  },
  {
    title: 'Visual Polish',
    desc: 'Logo, site styling, and improved UX for the web application',
    color: '#80deea',
    icon: '✦',
  },
  {
    title: 'Publication',
    desc: 'Write and submit a paper describing metagomics2 methods, architecture, and validation',
    color: '#e0e0e0',
    icon: '✎',
  },
];

const Roadmap: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Planned features and improvements">
        What's Next
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1200 480" className="w-full h-full">
          {/* Timeline line */}
          <motion.line
            x1="100" y1="60" x2="100" y2="460"
            stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {roadmapItems.map((item, i) => {
            const y = 50 + i * 52;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              >
                {/* Timeline dot */}
                <circle cx="100" cy={y + 16} r="8" fill={item.color} opacity="0.2" stroke={item.color} strokeWidth="1.5" />
                <text x="100" y={y + 20} textAnchor="middle" fill={item.color} fontSize="9" fontWeight="700">
                  {item.icon}
                </text>

                {/* Card */}
                <rect x="130" y={y} width="1040" height="46" rx="10" fill="var(--color-bg-card)" stroke={item.color} strokeWidth="1" opacity="0.4" />

                {/* Title */}
                <text x="155" y={y + 20} fill={item.color} fontSize="13" fontWeight="700">
                  {item.title}
                </text>

                {/* Description */}
                <text x="155" y={y + 36} fill="var(--color-text-muted)" fontSize="10" opacity="0.7">
                  {item.desc}
                </text>
              </motion.g>
            );
          })}

          {/* Priority highlight for first item */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <rect x="950" y="56" width="80" height="22" rx="11" fill="#ff2d78" opacity="0.15" stroke="#ff2d78" strokeWidth="1" />
            <text x="990" y="71" textAnchor="middle" fill="#ff2d78" fontSize="8" fontWeight="700">
              IN PROGRESS
            </text>
          </motion.g>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default Roadmap;
