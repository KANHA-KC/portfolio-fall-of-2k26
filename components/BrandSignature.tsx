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
      className="nav__brand inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer select-none py-1"
      onClick={onClick}
      aria-label="Hi, I am Kanha :)"
      role="text"
    >
      {/* Brand logo mark */}
      <span className="nav__mark shrink-0 select-none mr-0.5 sm:mr-1 inline-flex items-center justify-center" aria-hidden="true">
        <img
          src="/Final.png"
          alt="Logo"
          className="nav__mark-img nav__mark-img--light"
          width={36}
          height={36}
        />
        <img
          src="/Final Dark.png"
          alt="Logo"
          className="nav__mark-img nav__mark-img--dark"
          width={36}
          height={36}
        />
      </span>

      {/* Mobile Animated WordRotate (< 640px) - Compact without long surname */}
      <div className="inline-flex sm:hidden items-center gap-1 leading-none whitespace-nowrap overflow-hidden">
        <WordRotate
          words={["Hi,", "Hey,", "Hello,", "Hi,"]}
          duration={duration}
          delay={0}
          containerClassName="p-0 inline-flex overflow-hidden"
          className="font-serif italic font-normal text-[13px] text-ink/80 leading-none whitespace-nowrap"
        />

        <WordRotate
          words={["I am", "I'm", "I am", "I'm"]}
          duration={duration}
          delay={140}
          containerClassName="p-0 inline-flex overflow-hidden"
          className="font-serif italic font-normal text-[13px] text-ink/80 leading-none whitespace-nowrap"
        />

        <WordRotate
          words={["Kanha :)", "Kanha ;)", "Kanha ✦", "Kanha :)"]}
          duration={duration}
          delay={280}
          containerClassName="p-0 inline-flex overflow-hidden"
          className="font-sans font-bold text-[13px] text-ink leading-none whitespace-nowrap tracking-tight"
        />
      </div>

      {/* Desktop Animated WordRotate (>= 640px) - Full signature */}
      <div className="hidden sm:inline-flex items-center gap-1.5 leading-none whitespace-nowrap overflow-hidden">
        <WordRotate
          words={["Hi,", "Hey,", "Hello,", "Hi,"]}
          duration={duration}
          delay={0}
          containerClassName="p-0 inline-flex overflow-hidden"
          className="font-serif italic font-normal text-[14px] sm:text-[15px] text-ink/80 leading-none whitespace-nowrap"
        />

        <WordRotate
          words={["I am", "I'm", "I am", "I'm"]}
          duration={duration}
          delay={140}
          containerClassName="p-0 inline-flex overflow-hidden"
          className="font-serif italic font-normal text-[14px] sm:text-[15px] text-ink/80 leading-none whitespace-nowrap"
        />

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
      </div>
    </span>
  );
}
