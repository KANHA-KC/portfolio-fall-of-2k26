'use client';

import React from 'react';
import { WordRotate } from '@/components/ui/word-rotate';

interface BrandSignatureProps {
  onClick?: (e: React.MouseEvent) => void;
}

export default function BrandSignature({ onClick }: BrandSignatureProps) {
  const duration = 3400;

  return (
    <span
      className="nav__brand inline-flex items-center gap-1.5 cursor-pointer select-none py-1"
      onClick={onClick}
      aria-label="Hi, I am Kanha Chandravanshi :)"
      role="text"
    >
      {/* Brand logo mark */}
      <span className="nav__mark shrink-0 select-none mr-1 inline-flex items-center justify-center" aria-hidden="true">
        <img
          src="/Final.png"
          alt="Logo"
          className="nav__mark-img nav__mark-img--light"
          width={48}
          height={48}
        />
        <img
          src="/Final Dark.png"
          alt="Logo"
          className="nav__mark-img nav__mark-img--dark"
          width={48}
          height={48}
        />
      </span>

      {/* Block 1: [Hi,] - Font Style 1 (Editorial Serif Italic) */}
      <WordRotate
        words={["Hi,", "Hey,", "Hello,", "Hi,"]}
        duration={duration}
        delay={0}
        containerClassName="p-0 inline-flex overflow-hidden"
        className="font-serif italic font-normal text-[14px] sm:text-[15px] text-ink/80 leading-none whitespace-nowrap"
      />

      {/* Block 2: [I am] - Font Style 1 (Editorial Serif Italic) */}
      <WordRotate
        words={["I am", "I'm", "I am", "I'm"]}
        duration={duration}
        delay={140}
        containerClassName="p-0 inline-flex overflow-hidden"
        className="font-serif italic font-normal text-[14px] sm:text-[15px] text-ink/80 leading-none whitespace-nowrap"
      />

      {/* Block 3: [Kanha Chandravanshi :)] - Font Style 2 (Modern Bold Sans) */}
      <WordRotate
        words={[
          "Kanha Chandravanshi :)",
          "Kanha Chandravanshi ;)",
          "Kanha Chandravanshi ✦",
          "Kanha :)"
        ]}
        duration={duration}
        delay={280}
        containerClassName="p-0 inline-flex overflow-hidden"
        className="font-sans font-bold text-[13px] sm:text-[14px] text-ink leading-none whitespace-nowrap tracking-tight"
      />
    </span>
  );
}
