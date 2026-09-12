'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import LiquidSecondaryButton from '@/components/ui/liquid-button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router caught runtime exception:', error);
  }, [error]);

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
      <div
        className="font-instagram"
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--terracotta)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        Signal Interrupted
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: '20px',
        }}
      >
        An unexpected disturbance occurred.
      </h1>
      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--ink-light)',
          maxWidth: '480px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        The interface encountered a temporary exception. You can reset the view
        or return home safely.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => reset()}
          className="btn btn--primary btn--magnetic"
          data-cursor="open"
        >
          Try Again ↺
        </button>
        <LiquidSecondaryButton href="/" data-cursor="view">
          Return Home
        </LiquidSecondaryButton>
      </div>
    </main>
  );
}
