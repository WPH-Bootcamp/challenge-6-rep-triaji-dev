import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColCount = (w: number) => {
    if (w < 640) return 2; // sm
    if (w < 768) return 2; // md
    if (w < 1024) return 3; // lg
    if (w < 1280) return 4; // xl
    return 5; // 2xl
  };

  return {
    width,
    colCount: getColCount(width),
  };
};
