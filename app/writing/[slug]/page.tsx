import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReadingProgress from '@/components/ReadingProgress';
import CopyLinkButton from '@/components/CopyLinkButton';
import EscapeNav from '@/components/EscapeNav';
import { getArticles, getArticleBySlug } from '@/lib/data';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found — Studio' };

  return {
    title: `${article.title} — Studio`,
    description: article.excerpt,
  };
}

function parseMarkdownBlock(block: string) {
  if (block.startsWith('### ')) {
    return <h3>{block.replace('### ', '')}</h3>;
  }
  if (block.startsWith('1. ') || block.startsWith('- ')) {
    const text = block.replace(/^[0-9]+\.\s*|-\s*/, '');
    return (
      <p style={{ marginLeft: '18px', marginBottom: '12px' }}>
        • {parseInlineBold(text)}
      </p>
    );
  }
  return <p>{parseInlineBold(block)}</p>;
}

function parseInlineBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = getArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  return (
    <>
      <ReadingProgress />
      <EscapeNav to="/writing" />

      <article className="article-reader">
        <Link href="/writing" className="case-study__back" data-cursor="read">
          ← Back to all writing
        </Link>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div className="article-reader__meta" style={{ marginBottom: 0 }}>
            <span>{article.date}</span>
            <span>•</span>
            <span className="tag-pill">{article.tag}</span>
            <span>•</span>
            <span>{article.read}</span>
          </div>

          <CopyLinkButton
            label="🔗 Copy Article Link"
            toastMessage="Article link copied to clipboard!"
          />
        </div>

        <h1 className="article-reader__title">{article.title}</h1>
        <p className="article-reader__lede">{article.excerpt}</p>

        <div className="article-reader__content">
          {article.body.map((block, idx) => (
            <React.Fragment key={idx}>{parseMarkdownBlock(block)}</React.Fragment>
          ))}
        </div>

        <div
          className="case-study__callout"
          style={{ marginTop: '56px', borderLeftColor: 'var(--moss)' }}
        >
          <h3>Share or Discuss</h3>
          <p>
            Enjoyed this note? Feel free to share with your team or send your
            perspective directly to{' '}
            <Link
              href="/contact"
              style={{ textDecoration: 'underline', color: 'var(--clay)' }}
            >
              hello@studio.example
            </Link>
            .
          </p>
        </div>

        <nav className="case-study__nav" style={{ marginTop: '48px' }}>
          <Link href="/writing" className="btn btn--ghost" data-cursor="read">
            ← All Writing
          </Link>
          <Link
            href={`/writing/${nextArticle.slug}`}
            className="btn btn--primary"
            data-cursor="read"
          >
            Next Note: {nextArticle.title} →
          </Link>
        </nav>
      </article>
    </>
  );
}
