import Link from 'next/link';
import HeroScene from '@/components/HeroScene';
import PrinciplesAccordion from '@/components/PrinciplesAccordion';
import { getProjects, getPrinciples, getArticles } from '@/lib/data';

export default function HomePage() {
  const projects = getProjects().slice(0, 2);
  const principles = getPrinciples();
  const articles = getArticles().slice(0, 3);

  return (
    <>
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
    </>
  );
}
