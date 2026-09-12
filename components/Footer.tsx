'use client';

import React, { useState, useEffect, useRef } from 'react';
import { liquidGlass } from '@/lib/liquid-glass';

export default function Footer() {
  const [year, setYear] = useState<number>(2024);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const glass = liquidGlass(footerRef.current, {
      scale: -75,
      chroma: 4,
      border: 0.08,
      mapBlur: 10,
      blur: 4,
      saturate: 1.5,
      fallbackBlur: 20,
    });
    return () => glass.destroy();
  }, []);

  return (
    <footer ref={footerRef} className="foot">
      <p>© {year} Studio. A working portfolio.</p>
      <p>Built with restraint.</p>
    </footer>
  );
}

