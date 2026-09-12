'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CopyLinkButton from '@/components/CopyLinkButton';
import EscapeNav from '@/components/EscapeNav';
import LiquidSecondaryButton from '@/components/ui/liquid-button';
import { Project } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CaseStudyViewerProps {
  project: Project;
  nextProject: Project;
}

export default function CaseStudyViewer({ project, nextProject }: CaseStudyViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Header entrance
        gsap.fromTo(
          '.case-study__header > *',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out' }
        );

        // 2. Metrics Row Stagger Reveal
        if (project.metrics && project.metrics.length > 0) {
          gsap.fromTo(
            '.metric-box',
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: '.metrics-row',
                start: 'top 88%',
              },
            }
          );
        }

        // 3. Case study sections scroll reveals
        const sections = gsap.utils.toArray<HTMLElement>('.case-study__section');
        sections.forEach((sec) => {
          gsap.fromTo(
            sec.children,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 85%',
              },
            }
          );
        });

        // 4. Callout reveal
        gsap.fromTo(
          '.case-study__callout',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.case-study__callout',
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
      <EscapeNav to="/work" />

      <article className="case-study">
        <Link href="/work" className="case-study__back" data-cursor="view">
          ← Back to all work
        </Link>

        <header className="case-study__header">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div className="case-study__number">
              §{project.n} • {project.year}
            </div>
            <CopyLinkButton
              label="🔗 Copy Link"
              toastMessage="Case study link copied to clipboard!"
            />
          </div>

          <h1 className="case-study__title">{project.title}</h1>
          <p className="case-study__thesis">{project.thesis}</p>

          <div className="case-study__meta-grid">
            <div className="case-study__meta-item">
              <span>Category</span>
              <strong>{project.category}</strong>
            </div>
            <div className="case-study__meta-item">
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div className="case-study__meta-item">
              <span>Timeline</span>
              <strong>{project.year}</strong>
            </div>
          </div>
        </header>

        {project.metrics && project.metrics.length > 0 && (
          <div className="metrics-row">
            {project.metrics.map((m) => (
              <div key={m.label} className="metric-box">
                <div className="metric-box__val">{m.value}</div>
                <div className="metric-box__label">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <section className="case-study__section">
          <h2>01 / The Friction &amp; Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="case-study__section">
          <h2>02 / The Core Concept</h2>
          <p>{project.idea}</p>
        </section>

        <section className="case-study__section">
          <h2>03 / Research &amp; Process</h2>
          <ul className="case-study__checklist">
            {project.process.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case-study__section">
          <h2>04 / Key Design Decisions</h2>
          <ul className="case-study__checklist">
            {project.design.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="case-study__callout">
          <h3>Reflection &amp; What Was Learned</h3>
          <p>{project.learned}</p>
        </div>

        <nav className="case-study__nav">
          <LiquidSecondaryButton href="/work" data-cursor="view">
            All Work
          </LiquidSecondaryButton>
          <div className="next-nav-item">
            <Link
              href={`/work/${nextProject.slug}`}
              className="btn btn--primary"
              data-cursor="view"
            >
              Next: {nextProject.title} →
            </Link>
          </div>
        </nav>
      </article>
    </div>
  );
}
