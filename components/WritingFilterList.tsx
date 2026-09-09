'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

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

  const filtered =
    selectedTopic === 'all'
      ? articles
      : articles.filter((a) => a.tag === selectedTopic);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__meta">Editorial Index</div>
        <h1 className="page-hero__title">Writing / Notes</h1>
        <p className="page-hero__sub">
          Observations on cognitive momentum, probabilistic software,
          typographic restraint, and why the best interfaces feel inevitable.
        </p>

        <div className="filter-bar" id="topicFilter" role="tablist">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`filter-btn ${selectedTopic === topic ? 'is-active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
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
    </>
  );
}
