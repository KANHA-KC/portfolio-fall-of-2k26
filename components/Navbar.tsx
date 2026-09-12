'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from './Toast';
import EasterEggModal from './EasterEggModal';
import BrandSignature from './BrandSignature';
import Switch from '@/components/ui/sky-toggle';
import { ThemeMode } from '@/lib/types';
import { liquidGlass } from '@/lib/liquid-glass';

const THEMES: ThemeMode[] = ['dark', 'light'];
const THEME_LABELS: Record<string, string> = {
  dark: '◐ Dark',
  light: '◐ Light',
  paper: '◐ Light',
  clay: '◐ Light',
};

export default function Navbar() {
  const pathname = usePathname();
  const { showToast } = useToast();

  const [theme, setTheme] = useState<ThemeMode>('dark');
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

  // Initialize theme on mount - permanently Version 2
  useEffect(() => {
    document.documentElement.setAttribute('data-version', 'v2');

    const saved = localStorage.getItem('studio_theme');
    const initialTheme: ThemeMode = saved === 'light' || saved === 'paper' || saved === 'clay' ? 'light' : 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: initialTheme }));
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

  const cycleTheme = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8); } catch {}
    }
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('studio_theme', nextTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
    showToast(nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode');
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
            <div
              className="nav__theme-toggle-wrap"
              title={`Current theme: ${theme === 'dark' ? 'Night Mode' : 'Day Sky Mode'}. Click to switch.`}
            >
              <Switch
                checked={theme === 'dark'}
                onChange={(isDark) => {
                  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                    try { navigator.vibrate(8); } catch {}
                  }
                  const nextTheme: ThemeMode = isDark ? 'dark' : 'light';
                  setTheme(nextTheme);
                  document.documentElement.setAttribute('data-theme', nextTheme);
                  localStorage.setItem('studio_theme', nextTheme);
                  window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
                  showToast(nextTheme === 'dark' ? 'Dark Mode (Night)' : 'Light Mode (Sky)');
                }}
                size="15px"
                aria-label={`Current theme is ${theme}. Click to switch theme.`}
              />
            </div>
          </div>
        </div>
      </header>

      <EasterEggModal isOpen={easterOpen} onClose={() => setEasterOpen(false)} />
    </>
  );
}
