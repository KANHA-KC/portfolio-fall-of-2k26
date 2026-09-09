'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const badgesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    const angles = orbitNodes.map((_, i) => (i / orbitNodes.length) * Math.PI * 2);

    const animate = () => {
      badgesRef.current.forEach((badge, i) => {
        if (!badge) return;
        angles[i] += 0.004 * (1 - i * 0.1);
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
              if (el) badgesRef.current[i] = el;
            }}
            className="orbit-badge"
            data-cursor="view"
            onMouseEnter={() =>
              setStatusText(`“${item.title}: ${DESCRIPTIONS[item.title] || 'Core studio craft focus.'}”`)
            }
            onMouseLeave={() =>
              setStatusText('✦ Hover an orbiting node to inspect craft depth')
            }
          >
            {item.title}
          </div>
        ))}
      </div>

      <div
        id="orbitStatus"
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
