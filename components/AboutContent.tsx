'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import OrbitVisualization from '@/components/OrbitVisualization';
import LiquidSecondaryButton from '@/components/ui/liquid-button';
import { AboutData } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AboutContentProps {
  aboutData: AboutData;
}

export default function AboutContent({ aboutData }: AboutContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Page hero entrance
        gsap.fromTo(
          '.page-hero > *',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
        );

        // 2. Story text fade-in
        gsap.fromTo(
          '.about-story > *',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-story',
              start: 'top 85%',
            },
          }
        );

        // 3. Section heads reveal
        const heads = gsap.utils.toArray<HTMLElement>('.section-head');
        heads.forEach((h) => {
          gsap.fromTo(
            h.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: h,
                start: 'top 88%',
              },
            }
          );
        });

        // 4. Interests cards stagger
        gsap.fromTo(
          '#interestsGrid .stack__card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#interestsGrid',
              start: 'top 88%',
            },
          }
        );

        // 5. Human grid cards stagger
        gsap.fromTo(
          '#humanGrid .human-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#humanGrid',
              start: 'top 88%',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="page-hero">
        <div className="page-hero__meta">Background &amp; Philosophy</div>
        <h1 className="page-hero__title">
          Designing at the boundary of intent and computation.
        </h1>
      </section>

      <section className="about-grid">
        <div className="about-story">
          <h2>The Perspective</h2>
          {aboutData.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div style={{ marginTop: '40px' }}>
            <Link
              href="/contact"
              className="btn btn--primary btn--magnetic"
              data-cursor="open"
            >
              Let&apos;s talk about a project
            </Link>
            <LiquidSecondaryButton
              href="/work"
              data-cursor="view"
              style={{ marginLeft: '12px' }}
            >
              Browse case studies
            </LiquidSecondaryButton>
          </div>
        </div>

        {/* Interactive Solar Orbit */}
        <OrbitVisualization orbitNodes={aboutData.orbit} />
      </section>

      {/* Areas of Interest */}
      <section className="preview">
        <header className="section-head">
          <span className="section-head__index">§Focus</span>
          <h2 className="section-head__title">Areas of Interest</h2>
          <p className="section-head__sub">
            Disciplines that occupy my thoughts and studio time.
          </p>
        </header>
        <div className="preview__grid" id="interestsGrid">
          {aboutData.interests.map((int) => (
            <div
              key={int.t}
              className="stack__card"
              style={{ minHeight: '140px' }}
            >
              <div className="stack__face">
                <strong>{int.t}</strong>
              </div>
              <p>{int.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outside the Pixels */}
      <section className="human-section">
        <header className="section-head">
          <span className="section-head__index">§Context</span>
          <h2 className="section-head__title">Outside the Pixels</h2>
          <p className="section-head__sub">
            What&apos;s currently happening on the desk and in the notebook.
          </p>
        </header>

        <div className="human-grid" id="humanGrid">
          {aboutData.human.map((h) => (
            <div key={h.t} className="human-card">
              <span>{h.t}</span>
              <p>{h.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
