import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

const Closing: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="flex flex-col items-center text-center gap-8">
        {/* Wordmark */}
        <motion.h1
          className="text-6xl md:text-7xl font-black tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span style={{ color: 'var(--color-primary)' }}>meta</span>
          <span>gomics</span>
          <span style={{ color: 'var(--color-secondary)' }}>2</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl font-light"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Peptide-centric taxonomic &amp; functional annotation
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-24 h-px"
          style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />

        {/* Links */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-sm font-mono" style={{ color: 'var(--color-primary)', opacity: 0.8 }}>
            github.com/mriffle/metagomics2
          </span>
        </motion.div>

        {/* Thank you */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <span className="text-3xl font-light tracking-wide" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>
            Thank you
          </span>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default Closing;
