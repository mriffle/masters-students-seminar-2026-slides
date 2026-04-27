import React from 'react';
import { motion } from 'framer-motion';

interface SlideTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const SlideTitle: React.FC<SlideTitleProps> = ({ children, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold tracking-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {children}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-3 text-lg md:text-xl font-light"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SlideTitle;
