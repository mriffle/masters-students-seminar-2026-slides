import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const GOUnion: React.FC<SlideProps> = () => {
  const dag1Color = '#00e5ff';
  const dag2Color = '#ff2d78';
  const dag3Color = '#ffab00';
  const unionColor = '#b388ff';

  return (
    <SlideContainer>
      <SlideTitle subtitle="For each peptide, GO DAGs are combined via union — proteins can have multiple distinct functions">
        Gene Ontology: DAG Union
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] h-[70vh] mt-2">
        <svg viewBox="0 0 1100 420" className="w-full h-full">

          {/* === DAG 1: Protein A's GO terms === */}
          <motion.g
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <text x="100" y="22" textAnchor="middle" fill={dag1Color} fontSize="11" fontWeight="600">Protein A GO</text>

            {/* Root: biological process */}
            <circle cx="100" cy="55" r="16" fill={dag1Color} opacity="0.2" stroke={dag1Color} strokeWidth="1.5" />
            <text x="100" y="59" textAnchor="middle" fill={dag1Color} fontSize="7">bio. proc.</text>

            {/* metabolic process */}
            <line x1="100" y1="71" x2="100" y2="90" stroke={dag1Color} strokeWidth="1" opacity="0.4" />
            <circle cx="100" cy="108" r="16" fill={dag1Color} opacity="0.2" stroke={dag1Color} strokeWidth="1.5" />
            <text x="100" y="106" textAnchor="middle" fill={dag1Color} fontSize="6">metabolic</text>
            <text x="100" y="114" textAnchor="middle" fill={dag1Color} fontSize="6">process</text>

            {/* nitrogen compound metabolism */}
            <line x1="100" y1="124" x2="100" y2="145" stroke={dag1Color} strokeWidth="1" opacity="0.4" />
            <circle cx="100" cy="163" r="16" fill={dag1Color} opacity="0.2" stroke={dag1Color} strokeWidth="1.5" />
            <text x="100" y="161" textAnchor="middle" fill={dag1Color} fontSize="6">nitrogen</text>
            <text x="100" y="169" textAnchor="middle" fill={dag1Color} fontSize="6">metabolism</text>
          </motion.g>

          {/* === DAG 2: Protein B's GO terms === */}
          <motion.g
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <text x="290" y="22" textAnchor="middle" fill={dag2Color} fontSize="11" fontWeight="600">Protein B GO</text>

            <circle cx="290" cy="55" r="16" fill={dag2Color} opacity="0.2" stroke={dag2Color} strokeWidth="1.5" />
            <text x="290" y="59" textAnchor="middle" fill={dag2Color} fontSize="7">bio. proc.</text>

            {/* transport */}
            <line x1="290" y1="71" x2="290" y2="90" stroke={dag2Color} strokeWidth="1" opacity="0.4" />
            <circle cx="290" cy="108" r="16" fill={dag2Color} opacity="0.2" stroke={dag2Color} strokeWidth="1.5" />
            <text x="290" y="112" textAnchor="middle" fill={dag2Color} fontSize="7">transport</text>

            {/* ion transport */}
            <line x1="290" y1="124" x2="290" y2="145" stroke={dag2Color} strokeWidth="1" opacity="0.4" />
            <circle cx="290" cy="163" r="16" fill={dag2Color} opacity="0.2" stroke={dag2Color} strokeWidth="1.5" />
            <text x="290" y="161" textAnchor="middle" fill={dag2Color} fontSize="6">ion</text>
            <text x="290" y="169" textAnchor="middle" fill={dag2Color} fontSize="6">transport</text>
          </motion.g>

          {/* === DAG 3: Protein C's GO terms (shares metabolic process with A) === */}
          <motion.g
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <text x="470" y="22" textAnchor="middle" fill={dag3Color} fontSize="11" fontWeight="600">Protein C GO</text>

            <circle cx="470" cy="55" r="16" fill={dag3Color} opacity="0.2" stroke={dag3Color} strokeWidth="1.5" />
            <text x="470" y="59" textAnchor="middle" fill={dag3Color} fontSize="7">bio. proc.</text>

            <line x1="470" y1="71" x2="470" y2="90" stroke={dag3Color} strokeWidth="1" opacity="0.4" />
            <circle cx="470" cy="108" r="16" fill={dag3Color} opacity="0.2" stroke={dag3Color} strokeWidth="1.5" />
            <text x="470" y="106" textAnchor="middle" fill={dag3Color} fontSize="6">metabolic</text>
            <text x="470" y="114" textAnchor="middle" fill={dag3Color} fontSize="6">process</text>

            {/* carbohydrate metabolism (different leaf from A) */}
            <line x1="470" y1="124" x2="470" y2="145" stroke={dag3Color} strokeWidth="1" opacity="0.4" />
            <circle cx="470" cy="163" r="16" fill={dag3Color} opacity="0.2" stroke={dag3Color} strokeWidth="1.5" />
            <text x="470" y="161" textAnchor="middle" fill={dag3Color} fontSize="6">carbohydrate</text>
            <text x="470" y="169" textAnchor="middle" fill={dag3Color} fontSize="6">metabolism</text>
          </motion.g>

          {/* Union operator */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <text x="610" y="100" textAnchor="middle" fill="var(--color-text-muted)" fontSize="16" fontWeight="700">∪</text>
            <text x="610" y="120" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">Union</text>
            <line x1="555" y1="108" x2="575" y2="108" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.4" />
            <line x1="640" y1="108" x2="660" y2="108" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.4" />
            <polygon points="660,103 672,108 660,113" fill="var(--color-text-muted)" opacity="0.4" />
          </motion.g>

          {/* Contrast with taxonomy */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <rect x="550" y="165" width="120" height="40" rx="8" fill="var(--color-bg-card)" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.4" />
            <text x="610" y="182" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" opacity="0.7">
              Not intersection ∩
            </text>
            <text x="610" y="196" textAnchor="middle" fill={unionColor} fontSize="9" fontWeight="600">
              Union ∪ — keep all!
            </text>
          </motion.g>

          {/* === RESULT: Union DAG === */}
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <text x="870" y="22" textAnchor="middle" fill={unionColor} fontSize="14" fontWeight="700">
              Result: Combined DAG
            </text>

            {/* Root */}
            <circle cx="870" cy="60" r="20" fill={unionColor} opacity="0.15" stroke={unionColor} strokeWidth="2" />
            <text x="870" y="64" textAnchor="middle" fill={unionColor} fontSize="8" fontWeight="600">bio. proc.</text>

            {/* metabolic process branch */}
            <line x1="850" y1="78" x2="810" y2="110" stroke={unionColor} strokeWidth="1.5" opacity="0.4" />
            <circle cx="800" cy="125" r="18" fill={unionColor} opacity="0.15" stroke={unionColor} strokeWidth="2" />
            <text x="800" y="123" textAnchor="middle" fill={unionColor} fontSize="7" fontWeight="600">metabolic</text>
            <text x="800" y="132" textAnchor="middle" fill={unionColor} fontSize="7" fontWeight="600">process</text>

            {/* nitrogen metabolism */}
            <line x1="785" y1="142" x2="760" y2="168" stroke={unionColor} strokeWidth="1" opacity="0.3" />
            <circle cx="750" cy="183" r="16" fill={unionColor} opacity="0.1" stroke={unionColor} strokeWidth="1.5" />
            <text x="750" y="181" textAnchor="middle" fill={unionColor} fontSize="6">nitrogen</text>
            <text x="750" y="189" textAnchor="middle" fill={unionColor} fontSize="6">metabolism</text>

            {/* carbohydrate metabolism */}
            <line x1="815" y1="142" x2="845" y2="168" stroke={unionColor} strokeWidth="1" opacity="0.3" />
            <circle cx="855" cy="183" r="16" fill={unionColor} opacity="0.1" stroke={unionColor} strokeWidth="1.5" />
            <text x="855" y="181" textAnchor="middle" fill={unionColor} fontSize="6">carbohydrate</text>
            <text x="855" y="189" textAnchor="middle" fill={unionColor} fontSize="6">metabolism</text>

            {/* transport branch */}
            <line x1="890" y1="78" x2="940" y2="110" stroke={unionColor} strokeWidth="1.5" opacity="0.4" />
            <circle cx="950" cy="125" r="18" fill={unionColor} opacity="0.15" stroke={unionColor} strokeWidth="2" />
            <text x="950" y="129" textAnchor="middle" fill={unionColor} fontSize="7" fontWeight="600">transport</text>

            {/* ion transport */}
            <line x1="950" y1="143" x2="950" y2="168" stroke={unionColor} strokeWidth="1" opacity="0.3" />
            <circle cx="950" cy="183" r="16" fill={unionColor} opacity="0.1" stroke={unionColor} strokeWidth="1.5" />
            <text x="950" y="181" textAnchor="middle" fill={unionColor} fontSize="6">ion</text>
            <text x="950" y="189" textAnchor="middle" fill={unionColor} fontSize="6">transport</text>

            {/* Abundance box */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <rect x="755" y="240" width="230" height="60" rx="10" fill="var(--color-bg-card)" stroke={unionColor} strokeWidth="1.5" opacity="0.6" />
              <text x="870" y="262" textAnchor="middle" fill={unionColor} fontSize="11" fontWeight="600">
                Peptide abundance: 100
              </text>
              <text x="870" y="282" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
                +100 to every node in the union
              </text>
            </motion.g>
          </motion.g>

          {/* Why union? */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <rect x="30" y="280" width="500" height="55" rx="10" fill="var(--color-bg-card)" stroke={unionColor} strokeWidth="1" opacity="0.3" />
            <text x="280" y="303" textAnchor="middle" fill={unionColor} fontSize="11" fontWeight="600">
              Why union instead of intersection?
            </text>
            <text x="280" y="322" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">
              A protein can legitimately have multiple, distinct functions — intersection would discard valid annotations
            </text>
          </motion.g>

          <motion.text
            x="550" y="410" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" opacity="0.5"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.8 }}
          >
            All GO terms from all matched proteins are retained — nothing is lost
          </motion.text>
        </svg>
      </div>
    </SlideContainer>
  );
};

export default GOUnion;
