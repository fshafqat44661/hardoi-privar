'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { EventDTO } from '@/types';
import { AdminCard, AdminPageHeader, AdminTable } from '@/components/admin/admin-ui';

export default function AdminEventsPage() {
  const [rows, setRows] = useState<EventDTO[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setRows(json.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Events" desc="Edit event details shown on the public site." />

      {error && <p className="mb-4 text-sm text-primary-deep">{error}</p>}
      {loading && <p className="text-sm text-ink-2">Loading…</p>}

      <AdminCard>
        <AdminTable>
          <thead className="border-b border-line bg-cream text-xs uppercase tracking-wide text-ink-2">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{row.t}</div>
                  <div className="text-xs text-ink-2">{row.tag}</div>
                </td>
                <td className="px-4 py-3">{row.cat}</td>
                <td className="px-4 py-3">
                  {row.d} {row.m}
                </td>
                <td className="px-4 py-3 text-sm text-ink-2">{row.meta}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/events/${row.id}`} className="text-sm font-medium text-primary hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </AdminCard>
    </>
  );
}
