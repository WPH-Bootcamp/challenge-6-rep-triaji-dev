import React from 'react';


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
  getImageUrl,
  paused = false,
}: HeroSliderProps<T> & { getImageUrl?: (item: T) => string }): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [transitioning, setTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (paused || items.length === 0) return;

    let isMounted = true;
    
    const transitionToNext = async () => {
      const nextIndex = (currentIndex + 1) % items.length;
      
      if (getImageUrl) {
        try {
          const nextItem = items[nextIndex];
          const url = getImageUrl(nextItem);
          const img = new Image();
          img.src = url;
          await new Promise((resolve) => {
            if (img.complete) resolve(true);
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true); 
          });
        } catch (error) {
          console.error("Failed to preload image", error);
        }
      }

      if (!isMounted) return;

      setTransitioning(true);

      setTimeout(() => {
        if (!isMounted) return;
        setCurrentIndex(nextIndex);
        setTransitioning(false); 
      }, 500);
    };

    const intervalId = setInterval(transitionToNext, interval);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [currentIndex, items, interval, paused, getImageUrl]);

  React.useEffect(() => {
     if (items.length > 1 && getImageUrl) {
        const nextIndex = (currentIndex + 1) % items.length;
        const img = new Image();
        img.src = getImageUrl(items[nextIndex]);
     }
  }, [items, currentIndex, getImageUrl]);

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
