import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapBlogPost } from '@/lib/mappers';
import { blogPostSchema } from '@/lib/validators/schemas';
import { BlogPost } from '@/models/BlogPost';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    await connectDB();
    const doc = await BlogPost.findById(id).lean();
    if (!doc) return fail('Post not found', 404);
    return ok(mapBlogPost(doc as never));
  } catch {
    return fail('Failed to fetch blog post', 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const existing = await BlogPost.findById(id);
    if (!existing) return fail('Post not found', 404);

    const wasPublished = existing.published;
    const published = parsed.data.published ?? existing.published;

    existing.set({
      ...parsed.data,
      published,
      publishedAt: published && !wasPublished ? new Date() : existing.publishedAt,
    });
    await existing.save();

    return ok(mapBlogPost(existing.toObject() as never));
  } catch {
    return fail('Failed to update blog post', 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    await connectDB();
    const doc = await BlogPost.findByIdAndDelete(id);
    if (!doc) return fail('Post not found', 404);
    return ok({ deleted: true });
  } catch {
    return fail('Failed to delete blog post', 500);
  }
}
