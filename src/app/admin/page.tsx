'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { fetchMe, logout } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  async function handleLogout() {
    await dispatch(logout());
    router.replace('/admin/login');
  }

  return (
    <div className="min-h-screen bg-cream-2">
      <header className="border-b border-line bg-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="font-head text-2xl">Admin Dashboard</h1>
            <p className="text-sm text-ink-2">Welcome{user ? `, ${user.name}` : ''}</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </header>

      <div className="container grid gap-6 py-10 md:grid-cols-3">
        {[
          { title: 'Donations', desc: 'View pledges via GET /api/donations (auth required)', href: '/donate' },
          { title: 'Blog', desc: 'Blog CMS — route scaffolded at /blog', href: '/blog' },
          { title: 'Events', desc: 'Manage events via MongoDB or future admin UI', href: '/events' },
        ].map((card) => (
          <a key={card.title} href={card.href} className="rounded-[20px] border border-line bg-white p-6 transition hover:shadow-card">
            <h2 className="font-head text-xl">{card.title}</h2>
            <p className="mt-2 text-sm text-ink-2">{card.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
