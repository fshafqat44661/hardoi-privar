'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { fetchMe, logout } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/donations', label: 'Donations' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/membership', label: 'Membership' },
  { href: '/admin/contact', label: 'Contact' },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  async function handleLogout() {
    await dispatch(logout());
    router.replace('/admin/login');
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-cream-2">
      <header className="border-b border-line bg-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <Link href="/admin" className="font-head text-2xl text-ink">
              Admin Dashboard
            </Link>
            <p className="text-sm text-ink-2">
              Hardoi Parivar NCR{user ? ` · ${user.name}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-ink-2 hover:text-ink">
              View site
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <div className="container grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-[20px] border border-line bg-white p-3">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive(item.href, 'exact' in item ? item.exact : false)
                    ? 'bg-primary text-white'
                    : 'text-ink-2 hover:bg-cream hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
