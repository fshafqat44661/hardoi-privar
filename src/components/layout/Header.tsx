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

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="brand min-w-0" href="/">
          <div className="brand-mark">
            <img src="/assets/logo.png" alt="Hardoi Parivar logo" />
          </div>
          <div className="brand-text min-w-0">
            <span className="hi truncate">हरदोई परिवार</span>
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

        <div className="header-cta shrink-0">
          <Link className="btn btn-primary btn-sm" href="/membership">
            Join Now <Icon.ArrowRight />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-line bg-cream md:max-h-[calc(100dvh-64px)] md:overflow-y-auto">
          <div className="container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-3 text-[15px] font-medium ${
                  isActive(item.href) ? 'bg-cream-2 text-ink' : 'text-ink-2'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="btn btn-primary mt-2 w-full"
              href="/membership"
              onClick={() => setMobileOpen(false)}
            >
              Join Now <Icon.ArrowRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
