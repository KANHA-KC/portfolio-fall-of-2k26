import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyLinkButton from '@/components/CopyLinkButton';
import EscapeNav from '@/components/EscapeNav';
import { getProjects, getProjectBySlug } from '@/lib/data';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Case Study Not Found — Studio' };

  return {
    title: `${project.title} — Case Study — Studio`,
    description: project.thesis,
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const allProjects = getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
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
          <Link href="/work" className="btn btn--ghost" data-cursor="view">
            ← All Work
          </Link>
          <Link
            href={`/work/${nextProject.slug}`}
            className="btn btn--primary"
            data-cursor="view"
          >
            Next: {nextProject.title} →
          </Link>
        </nav>
      </article>
    </>
  );
}
