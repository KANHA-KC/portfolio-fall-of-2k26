import type { Metadata } from 'next';
import WritingFilterList from '@/components/WritingFilterList';
import { getArticles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Writing — Studio',
  description:
    'Observations on cognitive momentum, probabilistic software, typographic restraint, and why the best interfaces feel inevitable.',
};

export default function WritingPage() {
  const articles = getArticles();

  return <WritingFilterList articles={articles} />;
}
