'use client';

import React, { useState } from 'react';
import { Principle } from '@/lib/types';

interface PrinciplesAccordionProps {
  principles: Principle[];
}

export default function PrinciplesAccordion({ principles }: PrinciplesAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <ul className="principles__list" id="principles">
      {principles.map((pr, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <li key={pr.n} className={`principle-item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="principle-item__header"
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleIndex(idx)}
            >
              <div className="principle-item__left">
                <span className="principle-item__num">{pr.n}</span>
                <span className="principle-item__title">{pr.t}</span>
              </div>
              <span className="principle-item__icon">+</span>
            </button>
            <div className="principle-item__content">
              <p>{pr.d}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
