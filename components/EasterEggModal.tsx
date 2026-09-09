'use client';

import React, { useEffect, useState } from 'react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Mini burst paper confetti celebration
    const count = 36;
    const colors = ['#c06f50', '#465d49', '#9a4c2d', '#181715', '#dfd6c5'];
    const flakes: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      flake.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: ${8 + Math.random() * 10}px;
        height: ${12 + Math.random() * 12}px;
        background: ${color};
        border-radius: 2px;
        pointer-events: none;
        z-index: 100000;
        transform: translate(-50%, -50%);
        transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      document.body.appendChild(flake);
      flakes.push(flake);

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 320;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;
      const rot = Math.random() * 720 - 360;

      requestAnimationFrame(() => {
        flake.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rot}deg)`;
        flake.style.opacity = '0';
      });
    }

    const timer = setTimeout(() => {
      flakes.forEach((f) => f.remove());
    }, 1300);

    return () => {
      clearTimeout(timer);
      flakes.forEach((f) => f.remove());
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="easter-modal is-active"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="easter-card">
        <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>🌱 ☕️ ✦</div>
        <h3>Curiosity Rewarded</h3>
        <p>
          You found the workshop backdoor. Software is best when built with equal parts restraint, curiosity, and warmth.
        </p>
        <button className="btn btn--primary" onClick={onClose} id="closeEaster">
          Back to the surface
        </button>
      </div>
    </div>
  );
}
