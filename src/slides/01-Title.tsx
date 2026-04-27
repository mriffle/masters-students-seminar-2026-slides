import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const Title: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? 'var(--color-primary)' : p.id % 3 === 1 ? 'var(--color-tertiary)' : 'var(--color-secondary)',
              opacity: 0.15,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight">
            <span style={{ color: 'var(--color-primary)' }}>meta</span>
            <span style={{ color: 'var(--color-text)' }}>gomics</span>
            <span style={{ color: 'var(--color-secondary)' }}>2</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6"
        >
          <p className="text-xl md:text-2xl font-light tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
            Peptide-centric annotation for uncharted metaproteomes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="h-px w-12" style={{ background: 'var(--color-primary)', opacity: 0.5 }} />
          <span className="text-sm font-mono uppercase tracking-widest" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
            Taxonomic &amp; Functional Annotation
          </span>
          <div className="h-px w-12" style={{ background: 'var(--color-primary)', opacity: 0.5 }} />
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default Title;
