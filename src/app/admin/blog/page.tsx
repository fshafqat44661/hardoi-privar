'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPostDTO } from '@/types';
import Button from '@/components/ui/Button';
import { AdminCard, AdminPageHeader, AdminTable, formatDate } from '@/components/admin/admin-ui';

export default function AdminBlogListPage() {
  const [rows, setRows] = useState<BlogPostDTO[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blogs')
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
      <AdminPageHeader
        title="Blog"
        desc="Create and publish posts for the public blog."
        action={
          <Link href="/admin/blog/new">
            <Button>New post</Button>
          </Link>
        }
      />

      {error && <p className="mb-4 text-sm text-primary-deep">{error}</p>}
      {loading && <p className="text-sm text-ink-2">Loading…</p>}

      <AdminCard>
        <AdminTable>
          <thead className="border-b border-line bg-cream text-xs uppercase tracking-wide text-ink-2">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-2">
                  No blog posts yet.{' '}
                  <Link href="/admin/blog/new" className="text-primary">
                    Create one
                  </Link>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.title}</div>
                    <div className="text-xs text-ink-2">/{row.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-2">{row.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        row.published ? 'bg-[#D9FDD3] text-[#1B7A3C]' : 'bg-cream-2 text-ink-2'
                      }`}
                    >
                      {row.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-2">
                    {formatDate(row.updatedAt ?? row.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/blog/${row.id}`} className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminCard>
    </>
  );
}
