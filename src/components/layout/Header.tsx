'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/site';
import Icon from '@/components/ui/Icons';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" href="/">
          <div className="brand-mark">
            <img src="/assets/logo.png" alt="Hardoi Parivar logo" />
          </div>
          <div className="brand-text">
            <span className="hi">हरदोई परिवार</span>
            <span className="en">Hardoi Parivar · NCR</span>
          </div>
        </Link>

        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <Link className="btn btn-primary btn-sm" href="/membership">
            Join Now <Icon.ArrowRight />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon.Menu />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--color-line)', background: 'var(--color-cream)' }}>
          <div className="container" style={{ padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '10px 0',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive(item.href) ? 'var(--color-ink)' : 'var(--color-ink-2)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
