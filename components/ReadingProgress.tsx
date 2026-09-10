'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      }
    );
  }, { scope: barRef });

  return (
    <div
      id="readingProgress"
      ref={barRef}
      aria-hidden="true"
      style={{
        width: '100%',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        willChange: 'transform',
      }}
    />
  );
}
