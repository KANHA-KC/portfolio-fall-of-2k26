'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { Project } from '@/lib/types';
import { applyLiquidGlass } from '@/lib/liquid-glass';

gsap.registerPlugin(Flip, useGSAP);

interface WorkFilterGridProps {
  projects: Project[];
}

export default function WorkFilterGrid({ projects }: WorkFilterGridProps) {
  const [filter, setFilter] = useState<'all' | 'ai' | 'data' | 'healthcare'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanupCards = applyLiquidGlass(
      containerRef.current.querySelectorAll('.project-card') as NodeListOf<HTMLElement>,
      { scale: -70, chroma: 4, border: 0.06, mapBlur: 10, blur: 3, saturate: 1.4 }
    );
    const cleanupFilters = applyLiquidGlass(
      containerRef.current.querySelectorAll('.filter-btn') as NodeListOf<HTMLElement>,
      { scale: -50, chroma: 2.5, border: 0.12, mapBlur: 8, blur: 3, saturate: 1.4 }
    );
    return () => {
      cleanupCards();
      cleanupFilters();
    };
  }, [filter]);

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.filterCategory === filter);

  const handleFilterChange = (newFilter: 'all' | 'ai' | 'data' | 'healthcare') => {
    if (newFilter === filter) return;
    const cards = containerRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      flipStateRef.current = Flip.getState(cards);
    }
    setFilter(newFilter);
  };

  useGSAP(
    () => {
      if (flipStateRef.current) {
        Flip.from(flipStateRef.current, {
          duration: 0.55,
          ease: 'power3.inOut',
          stagger: 0.04,
          absolute: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, scale: 0.94 },
              { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            ),
          onLeave: (elements) =>
            gsap.to(elements, {
              opacity: 0,
              scale: 0.9,
              duration: 0.25,
              ease: 'power2.in',
            }),
        });
        flipStateRef.current = null;
      } else {
        // Initial entrance stagger
        gsap.fromTo(
          '.project-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.65, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [filter], scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="page-hero">
        <div className="page-hero__meta">Index of Selected Work</div>
        <h1 className="page-hero__title">Products, systems &amp; interfaces.</h1>
        <p className="page-hero__sub">
          In-depth case studies exploring how complex services and probabilistic
          models can be transformed into calm, guided human workflows.
        </p>

        <div className="filter-bar" id="filterBar" role="tablist" aria-label="Filter project categories">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            aria-controls="workGrid"
            className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Projects ({projects.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'ai'}
            aria-controls="workGrid"
            className={`filter-btn ${filter === 'ai' ? 'is-active' : ''}`}
            onClick={() => handleFilterChange('ai')}
          >
            AI &amp; Systems
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'data'}
            aria-controls="workGrid"
            className={`filter-btn ${filter === 'data' ? 'is-active' : ''}`}
            onClick={() => handleFilterChange('data')}
          >
            Data &amp; Dashboards
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'healthcare'}
            aria-controls="workGrid"
            className={`filter-btn ${filter === 'healthcare' ? 'is-active' : ''}`}
            onClick={() => handleFilterChange('healthcare')}
          >
            Healthcare
          </button>
        </div>
      </section>

      <section className="preview" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="preview__grid" id="workGrid">
          {filteredProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="project-card"
              data-cursor="view"
            >
              <div
                className={`project-card__cover project-card__cover--${p.cover.tone}`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: p.cover.svg }}
                  style={{ display: 'contents' }}
                />
                <div className="project-card__cover-art">{p.title}</div>
              </div>
              <div className="project-card__body">
                <div>
                  <div className="project-card__meta">
                    <span>§{p.n}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__thesis">{p.thesis}</p>
                </div>
                <div className="project-card__footer">
                  <span>{p.category.split('/')[0].trim()}</span>
                  <span>Case Study →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
