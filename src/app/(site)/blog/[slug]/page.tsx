import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { getBlogBySlug, getBlogs } from '@/lib/services/content.service';

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  return {
    title: post?.title ?? 'Blog',
    description: post?.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const others = (await getBlogs(4)).filter((p) => p.slug !== slug).slice(0, 3);
  const date = formatDate(post.publishedAt ?? post.createdAt);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={<>{post.title}</>}
        hindi={date}
        sub={post.excerpt || undefined}
        bannerImg={post.coverImage}
        bannerColor="saffron"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <section className="py-12 md:pb-24">
        <div className="container">
          <article className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-deep">
                {post.category}
              </span>
              {date && <span>{date}</span>}
              <span className="h-[3px] w-[3px] rounded-full bg-ink-2" />
              <span>{post.author}</span>
            </div>

            {post.coverImage && (
              <div className="mb-10 overflow-hidden rounded-[20px] border border-line">
                <img src={post.coverImage} alt={post.title} className="aspect-[16/9] w-full object-cover" />
              </div>
            )}

            <div className="whitespace-pre-wrap text-[17px] leading-[1.75] text-ink">
              {post.content || post.excerpt}
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <Link href="/blog" className="btn btn-ghost">
                ← Back to blog
              </Link>
            </div>
          </article>

          {others.length > 0 && (
            <div className="mt-16 border-t border-line pt-12">
              <h2 className="font-head mb-7 text-[clamp(24px,3vw,36px)]">More from the parivar</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {others.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="overflow-hidden rounded-[20px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="relative aspect-[16/10] bg-cream-2">
                      {p.coverImage ? (
                        <img src={p.coverImage} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F8C89B,#E85D2B)]" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-1 text-xs text-ink-2">
                        {p.category} · {formatDate(p.publishedAt ?? p.createdAt)}
                      </div>
                      <h3 className="font-head text-lg leading-tight">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
