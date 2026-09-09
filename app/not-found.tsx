import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      <div className="font-instagram" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--clay)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
        404 — Missing Coordinate
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: '20px',
        }}
      >
        This path leads nowhere.
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--ink-light)',
          maxWidth: '480px',
          lineHeight: 1.6,
          marginBottom: '36px',
        }}
      >
        The note, project, or lab artifact you are looking for has been moved,
        archived, or never existed in this timeline.
      </p>
      <Link href="/" className="btn btn--primary btn--magnetic" data-cursor="view">
        Return to Studio →
      </Link>
    </main>
  );
}
