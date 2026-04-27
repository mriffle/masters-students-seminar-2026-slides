import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { slides } from './slides';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const { currentSlide, direction, totalSlides } = useSlideNavigation(slides.length);

  const SlideComponent = slides[currentSlide];

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <AnimatePresence mode="wait">
        <SlideComponent
          key={currentSlide}
          isActive={true}
          direction={direction}
        />
      </AnimatePresence>
      <ProgressBar current={currentSlide} total={totalSlides} />
    </div>
  );
};

export default App;
