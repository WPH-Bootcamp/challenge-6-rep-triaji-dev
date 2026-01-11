import React from 'react';
import { useSlider } from '../../../hooks/useSlider';

interface HeroSliderProps<T> {
  items: T[];
  interval?: number;
  children: (item: T, index: number) => React.ReactNode;
  paused?: boolean;
}

export const HeroSlider = <T,>({
  items,
  interval = 5000,
  children,
  paused = false,
}: HeroSliderProps<T>): React.ReactElement => {
  const { currentIndex, transitioning } = useSlider({
    itemsLength: items.length,
    interval,
    paused,
  });

  return (
    <div className='relative w-full h-full'>
      <div
        className={`flex transition-opacity duration-500 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children(items[currentIndex], currentIndex)}
      </div>
    </div>
  );
};
