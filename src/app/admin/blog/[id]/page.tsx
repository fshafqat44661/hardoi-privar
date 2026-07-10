'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import type { BlogPostDTO } from '@/types';

export default function AdminBlogEditPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<BlogPostDTO | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setPost(json.data);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="text-sm text-primary-deep">{error}</p>;
  if (!post) return <p className="text-sm text-ink-2">Loading…</p>;

  return (
    <>
      <AdminPageHeader title="Edit blog post" desc={post.title} />
      <BlogForm initial={post} postId={id} />
    </>
  );
}
