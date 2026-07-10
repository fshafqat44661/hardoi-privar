'use client';

import { useEffect, useState } from 'react';
import type { MembershipSubmissionDTO } from '@/types';
import { AdminCard, AdminPageHeader, AdminTable, StatusSelect, formatDate } from '@/components/admin/admin-ui';

export default function AdminMembershipPage() {
  const [rows, setRows] = useState<MembershipSubmissionDTO[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/membership')
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setRows(json.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: MembershipSubmissionDTO['status']) {
    const res = await fetch(`/api/admin/membership/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!json.success) return;
    setRows((prev) => prev.map((r) => (r.id === id ? json.data : r)));
  }

  return (
    <>
      <AdminPageHeader title="Membership" desc="Registration requests from the membership form." />

      {error && <p className="mb-4 text-sm text-primary-deep">{error}</p>}
      {loading && <p className="text-sm text-ink-2">Loading…</p>}

      <AdminCard>
        <AdminTable>
          <thead className="border-b border-line bg-cream text-xs uppercase tracking-wide text-ink-2">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-2">
                  No membership requests yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.phone}</td>
                  <td className="px-4 py-3">{row.city}</td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={row.status}
                      options={['pending', 'contacted', 'approved']}
                      onChange={(s) => updateStatus(row.id, s)}
                    />
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-2">{formatDate(row.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminCard>
    </>
  );
}
