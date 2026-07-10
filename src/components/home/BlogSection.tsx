'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icons';
import { cn } from '@/lib/utils/cn';
import type { BlogPostDTO } from '@/types';

const FILTERS = ['All', 'Events', 'News', 'Stories', 'Blogs'] as const;

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface BlogSectionProps {
  posts: BlogPostDTO[];
  limit?: number;
  showHead?: boolean;
}

export default function BlogSection({ posts, limit = 5, showHead = true }: BlogSectionProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const filtered = useMemo(() => {
    const list = filter === 'All' ? posts : posts.filter((p) => p.category === filter);
    return list.slice(0, limit);
  }, [posts, filter, limit]);

  const featured = filtered[0];
  const rest = filtered.slice(1, 5);

  if (!posts.length) {
    return showHead ? (
      <section className="py-16 md:py-24">
        <div className="container">
          <span className="eyebrow">Stories & Updates</span>
          <h2 className="font-head mt-4 text-[clamp(32px,4vw,52px)] leading-[1.05]">
            Our community
            <br />
            gathering.
          </h2>
          <p className="mt-4 max-w-xl text-ink-2">
            Published stories and updates will appear here. Create posts from the admin blog panel.
          </p>
        </div>
      </section>
    ) : null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {showHead && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">Stories & Updates</span>
              <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
                Our community
                <br />
                gathering.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-[13px] font-medium transition',
                    filter === cat
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-white text-ink-2 hover:border-ink-2 hover:text-ink',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showHead && (
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  'rounded-full border px-3.5 py-2 text-[13px] font-medium transition',
                  filter === cat
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-white text-ink-2 hover:border-ink-2 hover:text-ink',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="rounded-[20px] border border-line bg-white p-8 text-center text-ink-2">
            No posts in this category yet.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            {featured && <BlogCard post={featured} featured />}
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {showHead && (
          <div className="mt-10 flex justify-end border-t border-line pt-6">
            <Link href="/blog" className="btn btn-ghost">
              View all <Icon.ArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ post, featured = false }: { post: BlogPostDTO; featured?: boolean }) {
  const date = formatDate(post.publishedAt ?? post.createdAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-[20px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card',
        featured && 'h-full',
      )}
    >
      <div className={cn('relative overflow-hidden bg-cream-2', featured ? 'aspect-[16/11] min-h-[240px]' : 'aspect-[16/10]')}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#F8C89B_0%,#E85D2B_55%,#7A1F2B_100%)]" />
        )}
      </div>
      <div className={cn('flex flex-1 flex-col gap-2', featured ? 'p-6' : 'p-4')}>
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-deep">
            {post.category}
          </span>
          {date && <span className="text-ink-2">{date}</span>}
        </div>
        <h3 className={cn('font-head leading-tight text-ink', featured ? 'text-[28px]' : 'text-[18px]')}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className={cn('leading-snug text-ink-2', featured ? 'text-[15px] line-clamp-3' : 'text-sm line-clamp-2')}>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
