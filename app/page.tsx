'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroScene from '@/components/HeroScene';
import PrinciplesAccordion from '@/components/PrinciplesAccordion';
import { getProjects, getPrinciples, getArticles } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = getProjects().slice(0, 2);
  const principles = getPrinciples();
  const articles = getArticles().slice(0, 3);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Hero Entrance Timeline
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
          .fromTo(
            '.hero__meta span',
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, stagger: 0.06, duration: 0.6 }
          )
          .fromTo(
            '.hero__title .line span',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.95, ease: 'power4.out' },
            '-=0.35'
          )
          .fromTo(
            '.hero__lede',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.75 },
            '-=0.55'
          )
          .fromTo(
            '.hero__cta .btn',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
            '-=0.45'
          )
          .fromTo(
            '.hero__scroll',
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            '-=0.2'
          );

        // 2. Intro Section ScrollTrigger
        gsap.fromTo(
          '.intro__lede .line',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.intro',
              start: 'top 82%',
            },
          }
        );

        gsap.fromTo(
          '.intro__body p',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.intro__body',
              start: 'top 85%',
            },
          }
        );

        // 3. Intro Stack Cards Stagger
        gsap.fromTo(
          '.stack__card',
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.stack',
              start: 'top 85%',
            },
          }
        );

        // 4. Section Headers ScrollTrigger Reveal
        const sectionHeads = gsap.utils.toArray<HTMLElement>('.section-head');
        sectionHeads.forEach((head) => {
          gsap.fromTo(
            head.children,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: head,
                start: 'top 88%',
              },
            }
          );
        });

        // 5. Selected Work Project Cards Stagger
        gsap.fromTo(
          '.preview__grid .project-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#previewGrid',
              start: 'top 85%',
            },
          }
        );

        // 6. Article Rows Stagger
        gsap.fromTo(
          '.articles--preview .article-row',
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.09,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#articlesPreview',
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
      <HeroScene />

      <section className="hero">
        <div className="hero__meta">
          <span>UI/UX Design</span>
          <span>Product</span>
          <span>Writing</span>
          <span>Experiments</span>
        </div>

        <h1 className="hero__title">
          <span className="line">
            <span>Designing</span>
          </span>
          <span className="line">
            <span>ideas into</span>
          </span>
          <span className="line">
            <span>
              <em>experiences.</em>
            </span>
          </span>
        </h1>

        <p className="hero__lede">
          UI/UX designer, product thinker and writer exploring the space between
          people, technology and ideas.
        </p>

        <div className="hero__cta">
          <Link
            className="btn btn--primary btn--magnetic"
            href="/work"
            data-cursor="view"
          >
            Explore my work
          </Link>
          <Link className="btn btn--ghost" href="/about" data-cursor="view">
            About me
          </Link>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="hero__arrow">↓</span>
        </div>
      </section>

      <section className="intro">
        <p className="intro__lede">
          <span className="line">I like solving problems</span>
          <span className="line">that don&apos;t have obvious answers.</span>
        </p>
        <div className="intro__body">
          <p>
            I design digital experiences, products and systems — while constantly
            writing, experimenting and building things to understand how they
            work.
          </p>
        </div>

        <ol className="stack" id="stack">
          <li className="stack__card">
            <div className="stack__face">
              <span>01</span>
              <strong>Think</strong>
            </div>
            <p>Understand the problem before designing the interface.</p>
          </li>
          <li className="stack__card">
            <div className="stack__face">
              <span>02</span>
              <strong>Design</strong>
            </div>
            <p>Turn complexity into clear, usable experiences.</p>
          </li>
          <li className="stack__card">
            <div className="stack__face">
              <span>03</span>
              <strong>Write</strong>
            </div>
            <p>Use words as part of the interface.</p>
          </li>
          <li className="stack__card">
            <div className="stack__face">
              <span>04</span>
              <strong>Build</strong>
            </div>
            <p>Prototype ideas instead of only talking about them.</p>
          </li>
          <li className="stack__card">
            <div className="stack__face">
              <span>05</span>
              <strong>Iterate</strong>
            </div>
            <p>Make, test, learn and make again.</p>
          </li>
        </ol>
      </section>

      {/* Selected Work Preview */}
      <section className="preview">
        <header className="section-head">
          <span className="section-head__index">§01</span>
          <h2 className="section-head__title">Selected work</h2>
          <p className="section-head__sub">
            Some things I&apos;ve designed, explored and built.
          </p>
        </header>

        <div className="preview__grid" id="previewGrid">
          {projects.map((p) => (
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

        <Link className="preview__more" href="/work" data-cursor="view">
          View all work →
        </Link>
      </section>

      {/* How I Think / Principles */}
      <section className="principles">
        <header className="section-head">
          <span className="section-head__index">§02</span>
          <h2 className="section-head__title">How I think</h2>
          <p className="section-head__sub">
            A working set of principles. Tap one to open.
          </p>
        </header>
        <PrinciplesAccordion principles={principles} />
      </section>

      {/* Writing / Notes Preview */}
      <section className="preview">
        <header className="section-head">
          <span className="section-head__index">§03</span>
          <h2 className="section-head__title">Writing / Notes</h2>
          <p className="section-head__sub">Things I&apos;m thinking about.</p>
        </header>

        <ul className="articles articles--preview" id="articlesPreview">
          {articles.map((art) => (
            <li key={art.slug} className="article-row">
              <Link href={`/writing/${art.slug}`} data-cursor="read">
                <span className="article-row__date">{art.date}</span>
                <span className="article-row__title">{art.title}</span>
                <div className="article-row__meta">
                  <span className="tag-pill">{art.tag}</span>
                  <span>{art.read}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link className="preview__more" href="/writing" data-cursor="read">
          All writing →
        </Link>
      </section>
    </div>
  );
}
