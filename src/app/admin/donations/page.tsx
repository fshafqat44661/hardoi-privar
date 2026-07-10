'use client';

import { useEffect, useState } from 'react';
import type { DonationDTO } from '@/types';
import { AdminCard, AdminPageHeader, AdminTable, StatusSelect, formatDate } from '@/components/admin/admin-ui';

export default function AdminDonationsPage() {
  const [rows, setRows] = useState<DonationDTO[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setRows(json.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: DonationDTO['status']) {
    const res = await fetch(`/api/donations/${id}`, {
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
      <AdminPageHeader title="Donations" desc="View and confirm donation pledges submitted from the site." />

      {error && <p className="mb-4 text-sm text-primary-deep">{error}</p>}
      {loading && <p className="text-sm text-ink-2">Loading…</p>}

      <AdminCard>
        <AdminTable>
          <thead className="border-b border-line bg-cream text-xs uppercase tracking-wide text-ink-2">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-2">
                  No donations yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.name}</div>
                    <div className="text-xs text-ink-2">
                      {row.phone}
                      {row.email ? ` · ${row.email}` : ''}
                    </div>
                    {row.message && <div className="mt-1 text-xs text-ink-2">{row.message}</div>}
                  </td>
                  <td className="px-4 py-3 font-semibold">₹{row.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{row.purpose}</td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={row.status}
                      options={['pending', 'confirmed', 'failed']}
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
