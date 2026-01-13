import { useState, useEffect, useCallback } from 'react';

interface UseSliderProps {
  itemsLength: number;
  interval?: number;
  paused?: boolean;
}

export const useSlider = ({
  itemsLength,
  interval = 5000,
  paused = false,
}: UseSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (itemsLength === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsLength);
      setTransitioning(false);
    }, 500); 
  }, [itemsLength]);

  useEffect(() => {
    if (paused || itemsLength === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [itemsLength, interval, paused, nextSlide]);

  return {
    currentIndex,
    transitioning,
    nextSlide,
  };
};
