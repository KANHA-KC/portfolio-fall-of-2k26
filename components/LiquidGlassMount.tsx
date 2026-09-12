'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyLiquidGlass } from '@/lib/liquid-glass';

export default function LiquidGlassMount() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const mount = () => {
      // Apple Liquid Glass Guidelines (Do #2 & Don't #1):
      // Functional Chrome Layer only (Floating Navigation Bar)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.nav') as NodeListOf<HTMLElement>,
          { scale: -85, chroma: 4.5, border: 0.08, mapBlur: 10, blur: 4, saturate: 1.5 }
        )
      );

      // Transient Floating Chrome (Modals & Toasts)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.easter-modal-card, .toast') as NodeListOf<HTMLElement>,
          { scale: -75, chroma: 4, border: 0.08, mapBlur: 10, blur: 4, saturate: 1.5 }
        )
      );

      // Interactive Filter Controls (Segmented topic pills in Writing & Work)
      cleanups.push(
        applyLiquidGlass(
          document.querySelectorAll('.filter-bar .filter-btn') as NodeListOf<HTMLElement>,
          { scale: -50, chroma: 2.5, border: 0.12, mapBlur: 8, blur: 2.5, saturate: 1.4 }
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
