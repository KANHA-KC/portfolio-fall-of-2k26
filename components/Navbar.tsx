'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from './Toast';
import EasterEggModal from './EasterEggModal';
import { ThemeMode } from '@/lib/types';

const THEMES: ThemeMode[] = ['paper', 'clay', 'dark'];
const THEME_LABELS: Record<ThemeMode, string> = {
  paper: '◐ Paper',
  clay: '◐ Clay',
  dark: '◐ Nocturne',
};

export default function Navbar() {
  const pathname = usePathname();
  const { showToast } = useToast();

  const [theme, setTheme] = useState<ThemeMode>('paper');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [easterOpen, setEasterOpen] = useState(false);

  const clicksRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('studio_theme') as ThemeMode | null;
    if (saved && THEMES.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'paper');
    }
  }, []);

  const cycleTheme = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8); } catch {}
    }
    const nextIdx = (THEMES.indexOf(theme) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIdx];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('studio_theme', nextTheme);
    showToast(`Theme switched to ${nextTheme.toUpperCase()}`);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(6); } catch {}
    }
    clicksRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clicksRef.current = 0;
    }, 2500);

    if (clicksRef.current >= 5) {
      e.preventDefault();
      clicksRef.current = 0;
      setEasterOpen(true);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { href: '/work', label: 'Work', cursor: 'view' },
    { href: '/writing', label: 'Writing', cursor: 'read' },
    { href: '/experiments', label: 'Experiments', cursor: 'play' },
    { href: '/about', label: 'About', cursor: 'view' },
    { href: '/contact', label: 'Contact', cursor: 'open' },
  ];

  return (
    <>
      <header className="nav" role="banner">
        <Link
          href="/"
          className="nav__logo"
          onClick={handleLogoClick}
          title="Click 5 times for a small secret"
        >
          <span className="nav__mark">◐</span>
          <span className="nav__name">Studio</span>
        </Link>

        <nav
          className={`nav__links ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = pathname
              ? link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
              : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor={link.cursor}
                className={isActive ? 'is-active' : ''}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme-btn"
            onClick={cycleTheme}
            title="Cycle Paper / Clay / Nocturne themes"
            aria-label={`Current theme: ${theme}. Click to switch.`}
          >
            {THEME_LABELS[theme]}
          </button>

          <button
            type="button"
            className="nav__mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <EasterEggModal isOpen={easterOpen} onClose={() => setEasterOpen(false)} />
    </>
  );
}
