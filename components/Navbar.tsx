'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from './Toast';
import EasterEggModal from './EasterEggModal';
import BrandSignature from './BrandSignature';
import { ThemeMode } from '@/lib/types';
import { liquidGlass } from '@/lib/liquid-glass';

const THEMES: ThemeMode[] = ['paper', 'clay', 'dark'];
const THEME_LABELS: Record<ThemeMode, string> = {
  paper: '◐ Olive & Linen',
  clay: '◐ Terracotta',
  dark: '◐ Deep Forest',
};

export default function Navbar() {
  const pathname = usePathname();
  const { showToast } = useToast();

  const [theme, setTheme] = useState<ThemeMode>('paper');
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [easterOpen, setEasterOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const clicksRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize liquid glass refraction on header
  useEffect(() => {
    if (!navRef.current) return;
    const glass = liquidGlass(navRef.current, {
      scale: -85,
      chroma: 4.5,
      border: 0.09,
      mapBlur: 10,
      blur: 3.5,
      saturate: 1.5,
      fallbackBlur: 20,
    });

    return () => {
      glass.destroy();
    };
  }, []);

  // Initialize theme and version on mount
  useEffect(() => {
    const saved = localStorage.getItem('studio_theme') as ThemeMode | null;
    if (saved && THEMES.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
      window.dispatchEvent(new CustomEvent('theme-change', { detail: saved }));
    } else {
      document.documentElement.setAttribute('data-theme', 'paper');
      window.dispatchEvent(new CustomEvent('theme-change', { detail: 'paper' }));
    }

    const savedVersion = localStorage.getItem('studio_version') as 'v1' | 'v2' | null;
    if (savedVersion === 'v2') {
      setVersion('v2');
      document.documentElement.setAttribute('data-version', 'v2');
      window.dispatchEvent(new CustomEvent('version-change', { detail: 'v2' }));
    } else {
      document.documentElement.setAttribute('data-version', 'v1');
      window.dispatchEvent(new CustomEvent('version-change', { detail: 'v1' }));
    }
  }, []);

  // Synchronize favicon dynamically with theme changes
  useEffect(() => {
    const iconHref = theme === 'dark' ? '/Final Dark.png' : '/Final.png';
    const links = document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']");
    if (links.length > 0) {
      links.forEach((link) => {
        link.href = iconHref;
      });
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = iconHref;
      document.head.appendChild(link);
    }
  }, [theme]);

  const toggleVersion = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(10); } catch {}
    }
    const nextVersion = version === 'v1' ? 'v2' : 'v1';
    setVersion(nextVersion);
    document.documentElement.setAttribute('data-version', nextVersion);
    localStorage.setItem('studio_version', nextVersion);
    window.dispatchEvent(new CustomEvent('version-change', { detail: nextVersion }));
    showToast(nextVersion === 'v2' ? 'Switched to Version 2' : 'Switched to Version 1');
  };

  const cycleTheme = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8); } catch {}
    }
    const nextIdx = (THEMES.indexOf(theme) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIdx];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('studio_theme', nextTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
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
      <header ref={navRef} className="nav" role="banner">
        <Link
          href="/"
          className="nav__logo"
          title="Click 5 times for a small secret"
        >
          <BrandSignature onClick={handleLogoClick} />
        </Link>

        <div className="nav__right">
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
                  aria-current={isActive ? 'page' : undefined}
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
              className={`nav__version-btn ${version === 'v2' ? 'is-active' : ''}`}
              onClick={toggleVersion}
              title={version === 'v2' ? 'Switch back to Version 1' : 'Switch to Version 2'}
              aria-label={`Current design: Version ${version === 'v2' ? '2' : '1'}. Click to switch.`}
            >
              <span className={`nav__version-dot ${version === 'v2' ? 'is-v2' : ''}`} aria-hidden="true" />
              <span className="nav__version-text">{version === 'v2' ? 'Version 1' : 'Version 2'}</span>
            </button>

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
        </div>
      </header>

      <EasterEggModal isOpen={easterOpen} onClose={() => setEasterOpen(false)} />
    </>
  );
}
