import type { Metadata } from 'next';
import WorkFilterGrid from '@/components/WorkFilterGrid';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Work — Studio',
  description:
    'Case studies across AI orchestration, data systems, and healthcare design.',
};

export default function WorkPage() {
  const projects = getProjects();

  return <WorkFilterGrid projects={projects} />;
}
