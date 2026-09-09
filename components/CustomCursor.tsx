'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<{
    hovering: boolean;
    type: string;
    label: string;
  }>({
    hovering: false,
    type: '',
    label: '',
  });

  const [isPressed, setIsPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch desktop devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    // Apple Design: Critically damped motion (damping 1.0, snappy response)
    const renderRing = () => {
      // 0.20 lerp response provides critically-damped settling without sluggishness
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      animationFrameId = requestAnimationFrame(renderRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(renderRing);

    // Apple Design §1: Instant response on pointer-down
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Dynamic delegation for data-cursor hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor') || 'view';
        setCursorState({
          hovering: true,
          type,
          label: type.toUpperCase(),
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        setCursorState({
          hovering: false,
          type: '',
          label: '',
        });
      }
    };

    // Magnetic buttons delegation with Apple spring damping
    const handleMagneticMove = (e: MouseEvent) => {
      const magnet = (e.target as HTMLElement).closest<HTMLElement>('.btn--magnetic, .btn--primary');
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        magnet.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
      }
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const magnet = (e.target as HTMLElement).closest<HTMLElement>('.btn--magnetic, .btn--primary');
      if (magnet) {
        magnet.style.transform = 'translate(0px, 0px)';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousemove', handleMagneticMove);
    document.addEventListener('mouseleave', handleMagneticLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousemove', handleMagneticMove);
      document.removeEventListener('mouseleave', handleMagneticLeave);
    };
  }, []);

  const className = [
    'cursor',
    cursorState.hovering ? 'is-hovering' : '',
    cursorState.type ? `cursor--${cursorState.type}` : '',
    isPressed ? 'is-pressed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        transform: isPressed ? 'scale(0.82)' : 'scale(1)',
        transition: 'transform 80ms cubic-bezier(0, 0, 0.2, 1)',
      }}
    >
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
      <div ref={labelRef} className="cursor__label">
        {cursorState.label}
      </div>
    </div>
  );
}
