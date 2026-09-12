'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyLiquidGlass } from '@/lib/liquid-glass';

export default function LiquidGlassMount() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const mount = () => {
      // Buttons & Pills (Hero CTA, pagination Next/Back, preview links, topic pills, orbit nodes)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll(
            '.btn--primary, .btn--ghost, .preview__more, .topic-pill, .orbit-badge, .filter-btn'
          ) as NodeListOf<HTMLElement>,
          { scale: -60, chroma: 3, border: 0.12, mapBlur: 8, blur: 3, saturate: 1.4 }
        )
      );

      // Circular Hub (Studio orbit center)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.orbit-center') as NodeListOf<HTMLElement>,
          { scale: -70, chroma: 4, border: 0.1, mapBlur: 10, blur: 3, saturate: 1.4 }
        )
      );

      // Cards (Work cards, Benchmark experiment cards, Process stack cards)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.project-card, .bench-card, .stack__card') as NodeListOf<HTMLElement>,
          { scale: -70, chroma: 4, border: 0.07, mapBlur: 10, blur: 3, saturate: 1.4 }
        )
      );

      // Large Panels (Footer, Contact Form card)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.foot, .contact-form') as NodeListOf<HTMLElement>,
          { scale: -75, chroma: 4, border: 0.06, mapBlur: 10, blur: 4, saturate: 1.5 }
        )
      );
    };

    const frameId = requestAnimationFrame(mount);

    return () => {
      cancelAnimationFrame(frameId);
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}
