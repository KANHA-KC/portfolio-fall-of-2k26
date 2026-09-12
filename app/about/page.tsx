import type { Metadata } from 'next';
import Link from 'next/link';
import OrbitVisualization from '@/components/OrbitVisualization';
import { getAboutData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — Studio',
  description:
    'Product designer, systems thinker and writer. Background, craft orbit, and human context.',
  alternates: {
    canonical: '/about',
  },
};

import AboutContent from '@/components/AboutContent';

export default function AboutPage() {
  const aboutData = getAboutData();

  return <AboutContent aboutData={aboutData} />;
}
