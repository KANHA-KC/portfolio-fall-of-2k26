'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { Article } from '@/lib/types';

gsap.registerPlugin(Flip, useGSAP);

interface WritingFilterListProps {
  articles: Article[];
}

const TOPICS = [
  'all',
  'Design Philosophy',
  'AI & Interaction',
  'Writing & Content',
  'Data UX',
];

export default function WritingFilterList({ articles }: WritingFilterListProps) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<any>(null);

  const filtered =
    selectedTopic === 'all'
      ? articles
      : articles.filter((a) => a.tag === selectedTopic);

  const handleTopicChange = (topic: string) => {
    if (topic === selectedTopic) return;
    const rows = containerRef.current?.querySelectorAll('.article-row');
    if (rows && rows.length > 0) {
      flipStateRef.current = Flip.getState(rows);
    }
    setSelectedTopic(topic);
  };

  useGSAP(
    () => {
      if (flipStateRef.current) {
        Flip.from(flipStateRef.current, {
          duration: 0.5,
          ease: 'power3.inOut',
          stagger: 0.03,
          absolute: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            ),
          onLeave: (elements) =>
            gsap.to(elements, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: 'power2.in',
            }),
        });
        flipStateRef.current = null;
      } else {
        // Initial entrance
        gsap.fromTo(
          '.article-row',
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' }
        );
      }
    },
    { dependencies: [selectedTopic], scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="page-hero">
        <div className="page-hero__meta">Editorial Index</div>
        <h1 className="page-hero__title">Writing / Notes</h1>
        <p className="page-hero__sub">
          Observations on cognitive momentum, probabilistic software,
          typographic restraint, and why the best interfaces feel inevitable.
        </p>

        <div className="filter-bar" id="topicFilter" role="tablist" aria-label="Filter writing topics">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              role="tab"
              aria-selected={selectedTopic === topic}
              aria-controls="articlesList"
              className={`filter-btn ${selectedTopic === topic ? 'is-active' : ''}`}
              onClick={() => handleTopicChange(topic)}
            >
              {topic === 'all' ? 'All Notes' : topic}
            </button>
          ))}
        </div>
      </section>

      <section className="preview" style={{ borderTop: 'none', paddingTop: 0 }}>
        <ul className="articles" id="articlesList">
          {filtered.map((art) => (
            <li key={art.slug} className="article-row">
              <Link href={`/writing/${art.slug}`} data-cursor="read">
                <span className="article-row__date">{art.date}</span>
                <div>
                  <span className="article-row__title">{art.title}</span>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--ink-light)',
                      marginTop: '6px',
                      maxWidth: '640px',
                    }}
                  >
                    {art.excerpt}
                  </p>
                </div>
                <div className="article-row__meta">
                  <span className="tag-pill">{art.tag}</span>
                  <span>{art.read}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
