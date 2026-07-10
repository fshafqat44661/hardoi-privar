'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { BLOG_CATEGORIES, type BlogCategory, type BlogPostDTO } from '@/types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface BlogFormProps {
  initial?: Partial<BlogPostDTO>;
  postId?: string;
}

export default function BlogForm({ initial, postId }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    coverImage: initial?.coverImage ?? '',
    category: (initial?.category ?? 'Blogs') as BlogCategory,
    author: initial?.author ?? 'Hardoi Parivar NCR',
    published: initial?.published ?? false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateTitle(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: postId ? f.slug : slugify(title),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = postId ? `/api/admin/blogs/${postId}` : '/api/admin/blogs';
    const method = postId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setLoading(false);

    if (!json.success) {
      setError(json.error ?? 'Save failed');
      return;
    }

    router.push('/admin/blog');
    router.refresh();
  }

  async function handleDelete() {
    if (!postId || !confirm('Delete this post?')) return;
    const res = await fetch(`/api/admin/blogs/${postId}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) router.push('/admin/blog');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px] border border-line bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="form-label">Title</span>
          <input className="form-input" value={form.title} onChange={(e) => updateTitle(e.target.value)} required />
        </label>
        <label className="block">
          <span className="form-label">Slug</span>
          <input className="form-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </label>
        <label className="block">
          <span className="form-label">Category</span>
          <select
            className="form-input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as BlogCategory })}
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="form-label">Author</span>
          <input className="form-input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        </label>
        <div className="md:col-span-2">
          <ImageUpload
            label="Cover image"
            value={form.coverImage}
            onChange={(coverImage) => setForm({ ...form, coverImage })}
            folder="hardoi-parivar/blog"
          />
        </div>
        <label className="block md:col-span-2">
          <span className="form-label">Excerpt</span>
          <textarea className="form-input min-h-[80px] resize-y" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </label>
        <label className="block md:col-span-2">
          <span className="form-label">Content</span>
          <textarea className="form-input min-h-[240px] resize-y font-mono text-sm" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </label>
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          <span className="text-sm font-medium">Published</span>
        </label>
      </div>

      {error && <p className="text-sm text-primary-deep">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : postId ? 'Update post' : 'Create post'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog')}>
          Cancel
        </Button>
        {postId && (
          <Button type="button" variant="ghost" className="!text-maroon" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
