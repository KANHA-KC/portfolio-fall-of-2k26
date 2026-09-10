'use client';

import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Principle } from '@/lib/types';

gsap.registerPlugin(useGSAP);

interface PrinciplesAccordionProps {
  principles: Principle[];
}

export default function PrinciplesAccordion({ principles }: PrinciplesAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const containerRef = useRef<HTMLUListElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleIndex = contextSafe((index: number) => {
    const isCurrentlyOpen = openIndices.includes(index);
    const nextOpen = isCurrentlyOpen
      ? openIndices.filter((i) => i !== index)
      : [...openIndices, index];

    const panel = panelsRef.current[index];
    const icon = iconsRef.current[index];

    if (panel) {
      if (!isCurrentlyOpen) {
        // Open animation: natural auto height with fade
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' }
        );
      } else {
        // Close animation
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        });
      }
    }

    if (icon) {
      gsap.to(icon, {
        rotation: !isCurrentlyOpen ? 45 : 0,
        duration: 0.35,
        ease: 'back.out(2)',
      });
    }

    setOpenIndices(nextOpen);
  });

  return (
    <ul className="principles__list" id="principles" ref={containerRef}>
      {principles.map((pr, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <li key={pr.n} className={`principle-item ${isOpen ? 'is-open' : ''}`}>
            <button
              id={`principle-header-${idx}`}
              className="principle-item__header"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`principle-panel-${idx}`}
              onClick={() => toggleIndex(idx)}
            >
              <div className="principle-item__left">
                <span className="principle-item__num">{pr.n}</span>
                <span className="principle-item__title">{pr.t}</span>
              </div>
              <span
                ref={(el) => {
                  iconsRef.current[idx] = el;
                }}
                className="principle-item__icon"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={`principle-panel-${idx}`}
              ref={(el) => {
                panelsRef.current[idx] = el;
              }}
              className="principle-item__content"
              role="region"
              aria-labelledby={`principle-header-${idx}`}
              style={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="principle-item__content-inner">
                <p>{pr.d}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
