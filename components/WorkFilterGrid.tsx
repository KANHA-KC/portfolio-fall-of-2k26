'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';

interface WorkFilterGridProps {
  projects: Project[];
}

export default function WorkFilterGrid({ projects }: WorkFilterGridProps) {
  const [filter, setFilter] = useState<'all' | 'ai' | 'data' | 'healthcare'>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.filterCategory === filter);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__meta">Index of Selected Work</div>
        <h1 className="page-hero__title">Products, systems &amp; interfaces.</h1>
        <p className="page-hero__sub">
          In-depth case studies exploring how complex services and probabilistic
          models can be transformed into calm, guided human workflows.
        </p>

        <div className="filter-bar" id="filterBar" role="tablist">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({projects.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'ai' ? 'is-active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            AI &amp; Systems
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'data' ? 'is-active' : ''}`}
            onClick={() => setFilter('data')}
          >
            Data &amp; Dashboards
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'healthcare' ? 'is-active' : ''}`}
            onClick={() => setFilter('healthcare')}
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
    </>
  );
}
