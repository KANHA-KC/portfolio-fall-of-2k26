'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { OrbitNode } from '@/lib/types';

interface OrbitVisualizationProps {
  orbitNodes: OrbitNode[];
}

const DESCRIPTIONS: Record<string, string> = {
  'Interface Design': 'Spatial ergonomics, tactile microcopy, and fluid state machines.',
  'Design Systems': 'Multi-brand token hierarchy, Figma variables, WCAG AA compliance.',
  'Interaction Models': 'Co-authoring patterns, confidence rings, and token stream UX.',
  'Information Arch': 'Taxonomy design, cognitive load minimization, and task journeys.',
  'Creative Coding': 'Procedural shaders, Three.js 3D physics, and algorithmic layout.',
  'Microcopy Craft': 'Words as structural interface beams, calming errors, zero-jargon.',
};

export default function OrbitVisualization({ orbitNodes }: OrbitVisualizationProps) {
  const [statusText, setStatusText] = useState('✦ Hover an orbiting node to inspect craft depth');
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef({ multiplier: 1.0 });

  useEffect(() => {
    let animationFrameId: number;
    const angles = orbitNodes.map((_, i) => (i / orbitNodes.length) * Math.PI * 2);

    const animate = () => {
      badgesRef.current.forEach((badge, i) => {
        if (!badge) return;
        angles[i] += 0.0035 * (1 - i * 0.08) * speedRef.current.multiplier;
        const radius = orbitNodes[i].radius * 0.62;
        const x = Math.cos(angles[i]) * radius;
        const y = Math.sin(angles[i]) * radius;
        badge.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [orbitNodes]);

  const handleNodeEnter = (item: OrbitNode, idx: number) => {
    // Decelerate orbit to cinematic slow-motion
    gsap.to(speedRef.current, { multiplier: 0.18, duration: 0.5, ease: 'power2.out' });

    const badge = badgesRef.current[idx];
    if (badge) {
      gsap.to(badge, { scale: 1.14, duration: 0.3, ease: 'back.out(2)' });
    }

    if (statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    setStatusText(`“${item.title}: ${DESCRIPTIONS[item.title] || 'Core studio craft focus.'}”`);
  };

  const handleNodeLeave = (idx: number) => {
    // Restore normal orbit speed
    gsap.to(speedRef.current, { multiplier: 1.0, duration: 0.8, ease: 'power2.inOut' });

    const badge = badgesRef.current[idx];
    if (badge) {
      gsap.to(badge, { scale: 1.0, duration: 0.3, ease: 'power2.out' });
    }

    if (statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    setStatusText('✦ Hover an orbiting node to inspect craft depth');
  };

  return (
    <div className="orbit-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="orbit-container" id="orbitContainer" ref={containerRef}>
        <div className="orbit-center">Studio</div>
        {/* Orbit concentric rings */}
        <div className="orbit-ring" style={{ width: '170px', height: '170px' }} />
        <div className="orbit-ring" style={{ width: '260px', height: '260px' }} />
        <div className="orbit-ring" style={{ width: '350px', height: '350px' }} />

        {/* Orbit Badges */}
        {orbitNodes.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              badgesRef.current[i] = el;
            }}
            className="orbit-badge"
            data-cursor="view"
            onMouseEnter={() => handleNodeEnter(item, i)}
            onMouseLeave={() => handleNodeLeave(i)}
          >
            {item.title}
          </div>
        ))}
      </div>

      <div
        id="orbitStatus"
        ref={statusRef}
        style={{
          fontSize: '0.88rem',
          color: 'var(--clay)',
          fontWeight: 500,
          minHeight: '26px',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        {statusText}
      </div>
    </div>
  );
}
