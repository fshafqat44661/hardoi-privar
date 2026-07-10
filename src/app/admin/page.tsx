'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AdminStatsDTO } from '@/types';
import { AdminCard, AdminPageHeader } from '@/components/admin/admin-ui';

const LINKS = [
  { href: '/admin/donations', label: 'Donations', key: 'donations' as const },
  { href: '/admin/blog', label: 'Blog posts', key: 'blog' as const },
  { href: '/admin/events', label: 'Events', key: 'events' as const },
  { href: '/admin/membership', label: 'Membership', key: 'membership' as const },
  { href: '/admin/contact', label: 'Contact', key: 'contact' as const },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStatsDTO | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setStats(json.data);
      })
      .catch((e) => setError(e.message));
  }, []);

  function statText(key: (typeof LINKS)[number]['key']) {
    if (!stats) return '—';
    switch (key) {
      case 'donations':
        return `${stats.donations.total} (${stats.donations.pending} pending)`;
      case 'blog':
        return `${stats.blog.total} (${stats.blog.drafts} drafts)`;
      case 'events':
        return String(stats.events);
      case 'membership':
        return `${stats.membership.total} (${stats.membership.pending} pending)`;
      case 'contact':
        return `${stats.contact.total} (${stats.contact.new} new)`;
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Overview"
        desc="Manage donations, blog posts, events, and form submissions from one place."
      />

      {error && <p className="mb-4 text-sm text-primary-deep">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            <AdminCard className="p-6 transition hover:shadow-card">
              <h2 className="font-head text-xl">{item.label}</h2>
              <p className="mt-2 text-2xl font-semibold text-ink">{statText(item.key)}</p>
              <p className="mt-2 text-sm text-primary">Open →</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <AdminCard className="mt-8 p-6">
        <h2 className="font-head text-xl">Quick actions</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-2">
          <li>
            <Link href="/admin/blog/new" className="text-primary hover:underline">
              Write a new blog post
            </Link>
          </li>
          <li>
            <Link href="/admin/membership" className="text-primary hover:underline">
              Review pending membership requests
            </Link>
          </li>
          <li>
            <Link href="/admin/donations" className="text-primary hover:underline">
              Confirm donation pledges
            </Link>
          </li>
        </ul>
      </AdminCard>
    </>
  );
}
