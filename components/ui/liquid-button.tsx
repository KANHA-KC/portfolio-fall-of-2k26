'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { liquidGlass } from '@/lib/liquid-glass';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export interface LiquidButtonProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-cursor'?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
}

export function LiquidSecondaryButton({
  href,
  onClick,
  children,
  className,
  style,
  'data-cursor': dataCursor = 'view',
  target,
  rel,
  type = 'button',
  disabled,
  id,
  ariaLabel,
}: LiquidButtonProps) {
  const btnRef = useRef<HTMLElement | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const glassRef = useRef<ReturnType<typeof liquidGlass> | null>(null);

  // 1. Apple Liquid Glass Optical Refraction
  useEffect(() => {
    if (!btnRef.current) return;
    const glass = liquidGlass(btnRef.current, {
      scale: -75,
      chroma: 4.5,
      border: 0.08,
      mapBlur: 10,
      blur: 14,
      saturate: 1.4,
      fallbackBlur: 16,
    });
    glassRef.current = glass;

    return () => {
      glass.destroy();
    };
  }, []);

  // 2. GSAP Jumpy Spring Animations
  const { contextSafe } = useGSAP({ scope: btnRef as any });

  const handleMouseEnter = contextSafe(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    // Tactile jumpy pop on container
    gsap.to(btnRef.current, {
      scale: 1.05,
      y: -2,
      duration: 0.42,
      ease: 'back.out(2.4)',
      overwrite: 'auto',
    });

    // Dot collapses cleanly
    gsap.to(dotRef.current, {
      scale: 0,
      opacity: 0,
      width: 0,
      marginRight: 0,
      duration: 0.25,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });

    // Label recenters
    gsap.to(textRef.current, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Arrow pops in with spring bounce
    gsap.to(arrowRef.current, {
      scale: 1,
      opacity: 1,
      width: 15,
      marginLeft: 8,
      duration: 0.44,
      ease: 'back.out(2.8)',
      overwrite: 'auto',
    });
  });

  const handleMouseLeave = contextSafe(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    // Container returns to rest
    gsap.to(btnRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.6)',
      overwrite: 'auto',
    });

    // Dot springs back into position
    gsap.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      width: 7,
      marginRight: 8,
      duration: 0.36,
      ease: 'back.out(2.2)',
      overwrite: 'auto',
    });

    // Text returns
    gsap.to(textRef.current, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Arrow tucks away
    gsap.to(arrowRef.current, {
      scale: 0,
      opacity: 0,
      width: 0,
      marginLeft: 0,
      duration: 0.24,
      ease: 'power2.in',
      overwrite: 'auto',
    });
  });

  const handleMouseDown = contextSafe(() => {
    gsap.to(btnRef.current, {
      scale: 0.94,
      duration: 0.12,
      ease: 'power1.out',
      overwrite: 'auto',
    });
  });

  const handleMouseUp = contextSafe(() => {
    gsap.to(btnRef.current, {
      scale: 1.05,
      duration: 0.28,
      ease: 'back.out(2)',
      overwrite: 'auto',
    });
  });

  // Clean trailing arrows if existing text had one
  const cleanChildren =
    typeof children === 'string'
      ? children.replace(/\s*(?:→|->|&rarr;)\s*$/, '').trim()
      : children;

  const content = (
    <>
      {/* Initial state: solid dot on left */}
      <span ref={dotRef} className="btn-liquid__dot" aria-hidden="true" />

      {/* Button text */}
      <span ref={textRef} className="btn-liquid__text">
        {cleanChildren}
      </span>

      {/* Hover state: arrow springs out on right */}
      <span ref={arrowRef} className="btn-liquid__arrow" aria-hidden="true">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  const sharedProps = {
    className: cn('btn btn--ghost btn-liquid-secondary', className),
    style,
    'data-cursor': dataCursor,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    id,
    'aria-label': ariaLabel,
  };

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal) {
      return (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          onClick={onClick}
          {...sharedProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...sharedProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...sharedProps}
    >
      {content}
    </button>
  );
}

export default LiquidSecondaryButton;
