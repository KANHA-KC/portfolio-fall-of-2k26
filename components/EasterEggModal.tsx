'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Spring-backed Modal Dialog Entrance
    if (modalRef.current && cardRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { scale: 0.82, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }

    // 2. High-precision GSAP Confetti Celebration Burst
    const count = 42;
    const colors = ['#c06f50', '#465d49', '#9a4c2d', '#181715', '#dfd6c5', '#c88a42'];
    const flakes: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sizeW = 6 + Math.random() * 8;
      const sizeH = 10 + Math.random() * 12;

      flake.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: ${sizeW}px;
        height: ${sizeH}px;
        background: ${color};
        border-radius: 2px;
        pointer-events: none;
        z-index: 100001;
        transform: translate(-50%, -50%);
        will-change: transform, opacity;
      `;
      document.body.appendChild(flake);
      flakes.push(flake);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 140 + Math.random() * 300;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;

      // Realistic burst with gravity drift and rotational flutter
      gsap.to(flake, {
        x: destX,
        y: destY + 90, // gravity curve
        rotation: gsap.utils.random(-720, 720),
        rotationX: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0.4, 1.1),
        opacity: 0,
        duration: gsap.utils.random(1.1, 1.6),
        ease: 'power3.out',
        onComplete: () => flake.remove(),
      });
    }

    return () => {
      flakes.forEach((f) => f.remove());
    };
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.88,
        y: 15,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="easter-modal is-active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="easterTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div ref={cardRef} className="easter-card">
        <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>🌱 ☕️ ✦</div>
        <h3 id="easterTitle">Curiosity Rewarded</h3>
        <p>
          You found the workshop backdoor. Software is best when built with equal parts restraint, curiosity, and warmth.
        </p>
        <button className="btn btn--primary" onClick={handleClose} id="closeEaster">
          Back to the surface
        </button>
      </div>
    </div>
  );
}
