import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const TaxonomyIntersection: React.FC<SlideProps> = () => {
  const treeColor1 = '#00e5ff';
  const treeColor2 = '#b388ff';
  const treeColor3 = '#ffab00';
  const intersectColor = '#00e676';
  const fadedOpacity = 0.15;

  return (
    <SlideContainer>
      <SlideTitle subtitle="For each peptide, taxonomic trees are intersected → lowest common ancestor + ancestors">
        Taxonomy: Tree Intersection
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1100 430" className="w-full h-full">

          {/* === Three taxonomic trees from 3 matched proteins === */}

          {/* Tree 1: Bacteria → Proteobacteria → Gamma → Vibrio → V. cholerae */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <text x="110" y="20" textAnchor="middle" fill={treeColor1} fontSize="11" fontWeight="600">Protein A's taxonomy</text>

            {/* Nodes */}
            <circle cx="110" cy="55" r="18" fill={treeColor1} opacity="0.2" stroke={treeColor1} strokeWidth="1.5" />
            <text x="110" y="59" textAnchor="middle" fill={treeColor1} fontSize="8" fontWeight="600">Bacteria</text>

            <line x1="110" y1="73" x2="110" y2="95" stroke={treeColor1} strokeWidth="1" opacity="0.4" />
            <circle cx="110" cy="113" r="18" fill={treeColor1} opacity="0.2" stroke={treeColor1} strokeWidth="1.5" />
            <text x="110" y="110" textAnchor="middle" fill={treeColor1} fontSize="7">Proteo-</text>
            <text x="110" y="119" textAnchor="middle" fill={treeColor1} fontSize="7">bacteria</text>

            <line x1="110" y1="131" x2="110" y2="153" stroke={treeColor1} strokeWidth="1" opacity="0.4" />
            <circle cx="110" cy="171" r="18" fill={treeColor1} opacity="0.2" stroke={treeColor1} strokeWidth="1.5" />
            <text x="110" y="168" textAnchor="middle" fill={treeColor1} fontSize="7">Gamma-</text>
            <text x="110" y="177" textAnchor="middle" fill={treeColor1} fontSize="7">proteo.</text>

            <line x1="110" y1="189" x2="110" y2="211" stroke={treeColor1} strokeWidth="1" opacity="0.4" />
            <circle cx="110" cy="229" r="18" fill={treeColor1} opacity="0.2" stroke={treeColor1} strokeWidth="1.5" />
            <text x="110" y="233" textAnchor="middle" fill={treeColor1} fontSize="7">Vibrio</text>

            <line x1="110" y1="247" x2="110" y2="269" stroke={treeColor1} strokeWidth="1" opacity="0.4" />
            <circle cx="110" cy="287" r="18" fill={treeColor1} opacity={fadedOpacity} stroke={treeColor1} strokeWidth="1" strokeDasharray="3 2" />
            <text x="110" y="291" textAnchor="middle" fill={treeColor1} fontSize="7" opacity="0.4">V. cholerae</text>
          </motion.g>

          {/* Tree 2: Bacteria → Proteobacteria → Gamma → Alteromonas → A. macleodii */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <text x="290" y="20" textAnchor="middle" fill={treeColor2} fontSize="11" fontWeight="600">Protein B's taxonomy</text>

            <circle cx="290" cy="55" r="18" fill={treeColor2} opacity="0.2" stroke={treeColor2} strokeWidth="1.5" />
            <text x="290" y="59" textAnchor="middle" fill={treeColor2} fontSize="8" fontWeight="600">Bacteria</text>

            <line x1="290" y1="73" x2="290" y2="95" stroke={treeColor2} strokeWidth="1" opacity="0.4" />
            <circle cx="290" cy="113" r="18" fill={treeColor2} opacity="0.2" stroke={treeColor2} strokeWidth="1.5" />
            <text x="290" y="110" textAnchor="middle" fill={treeColor2} fontSize="7">Proteo-</text>
            <text x="290" y="119" textAnchor="middle" fill={treeColor2} fontSize="7">bacteria</text>

            <line x1="290" y1="131" x2="290" y2="153" stroke={treeColor2} strokeWidth="1" opacity="0.4" />
            <circle cx="290" cy="171" r="18" fill={treeColor2} opacity="0.2" stroke={treeColor2} strokeWidth="1.5" />
            <text x="290" y="168" textAnchor="middle" fill={treeColor2} fontSize="7">Gamma-</text>
            <text x="290" y="177" textAnchor="middle" fill={treeColor2} fontSize="7">proteo.</text>

            <line x1="290" y1="189" x2="290" y2="211" stroke={treeColor2} strokeWidth="1" opacity="0.4" />
            <circle cx="290" cy="229" r="18" fill={treeColor2} opacity={fadedOpacity} stroke={treeColor2} strokeWidth="1" strokeDasharray="3 2" />
            <text x="290" y="233" textAnchor="middle" fill={treeColor2} fontSize="7" opacity="0.4">Alteromonas</text>

            <line x1="290" y1="247" x2="290" y2="269" stroke={treeColor2} strokeWidth="1" opacity={fadedOpacity} />
            <circle cx="290" cy="287" r="18" fill={treeColor2} opacity={fadedOpacity * 0.5} stroke={treeColor2} strokeWidth="1" strokeDasharray="3 2" />
            <text x="290" y="291" textAnchor="middle" fill={treeColor2} fontSize="7" opacity="0.3">A. macleodii</text>
          </motion.g>

          {/* Tree 3: Bacteria → Proteobacteria → Alpha → SAR11 */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <text x="470" y="20" textAnchor="middle" fill={treeColor3} fontSize="11" fontWeight="600">Protein C's taxonomy</text>

            <circle cx="470" cy="55" r="18" fill={treeColor3} opacity="0.2" stroke={treeColor3} strokeWidth="1.5" />
            <text x="470" y="59" textAnchor="middle" fill={treeColor3} fontSize="8" fontWeight="600">Bacteria</text>

            <line x1="470" y1="73" x2="470" y2="95" stroke={treeColor3} strokeWidth="1" opacity="0.4" />
            <circle cx="470" cy="113" r="18" fill={treeColor3} opacity="0.2" stroke={treeColor3} strokeWidth="1.5" />
            <text x="470" y="110" textAnchor="middle" fill={treeColor3} fontSize="7">Proteo-</text>
            <text x="470" y="119" textAnchor="middle" fill={treeColor3} fontSize="7">bacteria</text>

            <line x1="470" y1="131" x2="470" y2="153" stroke={treeColor3} strokeWidth="1" opacity="0.4" />
            <circle cx="470" cy="171" r="18" fill={treeColor3} opacity={fadedOpacity} stroke={treeColor3} strokeWidth="1" strokeDasharray="3 2" />
            <text x="470" y="168" textAnchor="middle" fill={treeColor3} fontSize="7" opacity="0.4">Alpha-</text>
            <text x="470" y="177" textAnchor="middle" fill={treeColor3} fontSize="7" opacity="0.4">proteo.</text>

            <line x1="470" y1="189" x2="470" y2="211" stroke={treeColor3} strokeWidth="1" opacity={fadedOpacity} />
            <circle cx="470" cy="229" r="18" fill={treeColor3} opacity={fadedOpacity * 0.5} stroke={treeColor3} strokeWidth="1" strokeDasharray="3 2" />
            <text x="470" y="233" textAnchor="middle" fill={treeColor3} fontSize="7" opacity="0.3">SAR11</text>
          </motion.g>

          {/* Big arrow → Intersection */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <text x="620" y="155" textAnchor="middle" fill="var(--color-text-muted)" fontSize="13" fontWeight="600">∩</text>
            <text x="620" y="175" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">Intersection</text>
            <line x1="570" y1="165" x2="590" y2="165" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.4" />
            <line x1="650" y1="165" x2="670" y2="165" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.4" />
            <polygon points="670,160 682,165 670,170" fill="var(--color-text-muted)" opacity="0.4" />
          </motion.g>

          {/* === RESULT: Intersection tree === */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <text x="870" y="20" textAnchor="middle" fill={intersectColor} fontSize="14" fontWeight="700">
              Result: Common Subtree
            </text>

            {/* Highlighted intersection nodes */}
            <circle cx="870" cy="70" r="24" fill={intersectColor} opacity="0.15" stroke={intersectColor} strokeWidth="2.5" />
            <text x="870" y="74" textAnchor="middle" fill={intersectColor} fontSize="10" fontWeight="700">Bacteria</text>

            <line x1="870" y1="94" x2="870" y2="125" stroke={intersectColor} strokeWidth="2" opacity="0.5" />

            <circle cx="870" cy="149" r="24" fill={intersectColor} opacity="0.15" stroke={intersectColor} strokeWidth="2.5" />
            <text x="870" y="146" textAnchor="middle" fill={intersectColor} fontSize="9" fontWeight="700">Proteo-</text>
            <text x="870" y="156" textAnchor="middle" fill={intersectColor} fontSize="9" fontWeight="700">bacteria</text>

            {/* LCA label */}
            <line x1="898" y1="149" x2="950" y2="149" stroke={intersectColor} strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
            <text x="955" y="153" fill={intersectColor} fontSize="10" fontWeight="600" opacity="0.8">← LCA</text>

            {/* Discarded branches shown faded */}
            <line x1="870" y1="173" x2="870" y2="200" stroke={intersectColor} strokeWidth="1" opacity="0.15" strokeDasharray="3 3" />
            <circle cx="870" cy="220" r="18" fill="none" stroke={intersectColor} strokeWidth="1" opacity="0.15" strokeDasharray="3 3" />
            <text x="870" y="224" textAnchor="middle" fill={intersectColor} fontSize="8" opacity="0.25">below LCA</text>

            {/* Abundance annotation */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <rect x="750" y="280" width="240" height="60" rx="10" fill="var(--color-bg-card)" stroke={intersectColor} strokeWidth="1.5" opacity="0.6" />
              <text x="870" y="302" textAnchor="middle" fill={intersectColor} fontSize="11" fontWeight="600">
                Peptide abundance: 100
              </text>
              <text x="870" y="322" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
                +100 to Bacteria, +100 to Proteobacteria
              </text>
            </motion.g>
          </motion.g>

          {/* Bottom explanation */}
          <motion.text
            x="550"
            y="420"
            textAnchor="middle"
            fill="var(--color-text-muted)"
            fontSize="12"
            opacity="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.5 }}
          >
            Only nodes present in ALL trees survive → conservative, accurate taxonomic assignment
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default TaxonomyIntersection;
