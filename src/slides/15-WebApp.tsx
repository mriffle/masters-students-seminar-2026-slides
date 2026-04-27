import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import type { SlideProps } from '../types';

const WebApp: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      {/* Centered browser mockup */}
      <motion.div
        className="w-full max-w-[90vw]"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Browser chrome */}
        <div
          className="rounded-t-xl px-4 py-3 flex items-center gap-2"
          style={{ background: '#1a1f2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <div
            className="flex-1 ml-4 px-3 py-1 rounded-md text-xs font-mono"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)' }}
          >
            metagomics2.example.org/results
          </div>
        </div>

        {/* App content area */}
        <div
          className="rounded-b-xl p-8 flex flex-col items-center gap-6"
          style={{ background: '#0f1524', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none', minHeight: '50vh' }}
        >
          {/* App header */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="text-2xl font-black">
              <span style={{ color: 'var(--color-primary)' }}>meta</span>
              <span>gomics</span>
              <span style={{ color: 'var(--color-secondary)' }}>2</span>
            </span>
            <span className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
              Results Viewer
            </span>
          </motion.div>

          {/* Placeholder panels */}
          <motion.div
            className="w-full grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {/* Taxonomy sunburst placeholder */}
            <div className="rounded-lg p-4 flex flex-col items-center gap-3" style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.15)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>Taxonomy</span>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Simulated sunburst */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-primary)" strokeWidth="12" opacity="0.2" strokeDasharray="80 234" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-success)" strokeWidth="12" opacity="0.2" strokeDasharray="50 264" strokeDashoffset="-80" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-amber)" strokeWidth="12" opacity="0.2" strokeDasharray="40 274" strokeDashoffset="-130" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="var(--color-primary)" strokeWidth="10" opacity="0.15" strokeDasharray="60 166" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="var(--color-success)" strokeWidth="10" opacity="0.15" strokeDasharray="35 191" strokeDashoffset="-60" />
                <circle cx="60" cy="60" r="22" fill="none" stroke="var(--color-primary)" strokeWidth="8" opacity="0.1" strokeDasharray="40 98" />
              </svg>
            </div>

            {/* GO bar chart placeholder */}
            <div className="rounded-lg p-4 flex flex-col items-center gap-3" style={{ background: 'rgba(179,136,255,0.04)', border: '1px solid rgba(179,136,255,0.15)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-tertiary)' }}>Gene Ontology</span>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Simulated bar chart */}
                {[
                  { x: 10, h: 80, color: 'var(--color-tertiary)' },
                  { x: 30, h: 55, color: 'var(--color-tertiary)' },
                  { x: 50, h: 70, color: 'var(--color-tertiary)' },
                  { x: 70, h: 35, color: 'var(--color-tertiary)' },
                  { x: 90, h: 45, color: 'var(--color-tertiary)' },
                ].map((bar, i) => (
                  <rect key={i} x={bar.x} y={110 - bar.h} width="14" height={bar.h} rx="2" fill={bar.color} opacity="0.25" />
                ))}
              </svg>
            </div>

            {/* Combined heatmap placeholder */}
            <div className="rounded-lg p-4 flex flex-col items-center gap-3" style={{ background: 'rgba(255,45,120,0.04)', border: '1px solid rgba(255,45,120,0.15)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-secondary)' }}>Combined</span>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Simulated heatmap */}
                {Array.from({ length: 25 }, (_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const opacity = [0.5, 0.3, 0.15, 0.4, 0.1, 0.2, 0.45, 0.35, 0.1, 0.25, 0.1, 0.2, 0.3, 0.15, 0.4, 0.35, 0.1, 0.45, 0.2, 0.3, 0.15, 0.4, 0.1, 0.25, 0.35][i];
                  return (
                    <rect
                      key={i}
                      x={10 + col * 22}
                      y={10 + row * 22}
                      width="18"
                      height="18"
                      rx="3"
                      fill="var(--color-secondary)"
                      opacity={opacity}
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Demo label */}
          <motion.div
            className="mt-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--color-danger)' }} />
            <span className="text-lg font-semibold tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              Live Demo
            </span>
          </motion.div>
        </div>
      </motion.div>
    </SlideContainer>
  );
};

export default WebApp;
