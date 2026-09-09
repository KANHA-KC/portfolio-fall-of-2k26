import type { Metadata } from 'next';
import Link from 'next/link';
import OrbitVisualization from '@/components/OrbitVisualization';
import { getAboutData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — Studio',
  description:
    'Product designer, systems thinker and writer. Background, craft orbit, and human context.',
};

export default function AboutPage() {
  const aboutData = getAboutData();

  return (
    <>
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
            <Link
              href="/work"
              className="btn btn--ghost"
              data-cursor="view"
              style={{ marginLeft: '12px' }}
            >
              Browse case studies
            </Link>
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
    </>
  );
}
