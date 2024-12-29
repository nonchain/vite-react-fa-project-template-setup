import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  laptop: 1440,
  '2xl': 1544,
};

type Breakpoint = keyof typeof breakpoints;

export function useTailwindBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (width >= breakpoints['2xl']) {
      setBreakpoint('2xl');
    } else if (width >= breakpoints.xl) {
      setBreakpoint('xl');
    } else if (width >= breakpoints.lg) {
      setBreakpoint('lg');
    } else if (width >= breakpoints.md) {
      setBreakpoint('md');
    } else if (width >= breakpoints.sm) {
      setBreakpoint('sm');
    } else {
      setBreakpoint(null); // smaller than sm
    }
  }, [width]);

  return { breakpoint, width };
}