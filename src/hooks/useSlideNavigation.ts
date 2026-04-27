import { useState, useEffect, useCallback, useRef } from 'react';

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(() => {
    const hash = window.location.hash;
    const match = hash.match(/slide=(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      return Math.max(0, Math.min(n - 1, totalSlides - 1));
    }
    return 0;
  });

  const [direction, setDirection] = useState<'forward' | 'backward' | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      if (clamped === currentSlide) return;
      setDirection(clamped > currentSlide ? 'forward' : 'backward');
      setCurrentSlide(clamped);
      window.location.hash = `slide=${clamped + 1}`;
    },
    [currentSlide, totalSlides]
  );

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, goTo, totalSlides]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next();
        else prev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [next, prev]);

  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/slide=(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10) - 1;
        if (n !== currentSlide && n >= 0 && n < totalSlides) {
          setDirection(n > currentSlide ? 'forward' : 'backward');
          setCurrentSlide(n);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSlide, totalSlides]);

  return { currentSlide, direction, next, prev, goTo, totalSlides };
}
