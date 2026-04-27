import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

const steps = [
  {
    icon: '📂',
    title: 'Upload FASTA',
    desc: 'Background proteome (e.g., metagenome-derived)',
    color: '#00e5ff',
  },
  {
    icon: '📊',
    title: 'Upload Peptide Lists',
    desc: 'Peptides + abundances (DDA, DIA, etc.)',
    color: '#b388ff',
  },
  {
    icon: '⚙️',
    title: 'Set Parameters',
    desc: 'E-value cutoff, % identity, top-K hits',
    color: '#ffab00',
  },
  {
    icon: '🗄️',
    title: 'Select Database',
    desc: 'SwissProt, SwissProt/TrEMBL bacterial, …',
    color: '#ff2d78',
  },
];

const UserWorkflow: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="Simple setup for complex annotation">
        Job Setup
      </SlideTitle>

      <div className="relative w-full max-w-[90vw] mt-4">
        <div className="grid grid-cols-4 gap-6 items-start">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
            >
              {/* Step number */}
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                style={{
                  border: `2px solid ${step.color}`,
                  color: step.color,
                  background: `${step.color}10`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                {i + 1}
              </motion.div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute hidden md:block"
                  style={{
                    top: '3.5rem',
                    left: `calc(${(i + 0.5) * 25}% + 1.75rem)`,
                    width: 'calc(25% - 3.5rem)',
                    height: '2px',
                    background: `linear-gradient(90deg, ${step.color}40, ${steps[i + 1].color}40)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                />
              )}

              {/* Card */}
              <div
                className="rounded-xl p-5 w-full flex-1 flex flex-col"
                style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${step.color}25`,
                }}
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit button mockup */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div
            className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-tertiary))',
              color: 'var(--color-bg)',
            }}
          >
            Submit Job →
          </div>
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default UserWorkflow;
