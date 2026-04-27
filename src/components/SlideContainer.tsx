import React from 'react';
import { motion } from 'framer-motion';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute inset-0 w-screen h-screen flex flex-col items-center justify-center px-16 py-12 overflow-hidden ${className}`}
      style={{ background: 'var(--color-bg)' }}
    >
      {children}
    </motion.div>
  );
};

export default SlideContainer;
