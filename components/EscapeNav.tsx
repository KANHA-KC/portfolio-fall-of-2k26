'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EscapeNav({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push(to);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, to]);

  return null;
}
