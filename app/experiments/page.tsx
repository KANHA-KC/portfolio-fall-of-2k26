import type { Metadata } from 'next';
import ExperimentsBench from '@/components/ExperimentsBench';

export const metadata: Metadata = {
  title: 'Experiments — Studio',
  description:
    'Tactile micro-interactions, generative art, and creative code prototypes.',
  alternates: {
    canonical: '/experiments',
  },
};

export default function ExperimentsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__meta">Sandbox &amp; Creative Code</div>
        <h1 className="page-hero__title">The Experiments Bench.</h1>
        <p className="page-hero__sub">
          Tactile micro-interactions, generative vector contours, kinetic
          physics, and editorial tools built to understand software behavior
          from first principles.
        </p>
      </section>

      <ExperimentsBench />
    </>
  );
}
