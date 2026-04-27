import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1 z-50" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-tertiary))',
        }}
      />
    </div>
  );
};

export default ProgressBar;
