import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapBlogPost } from '@/lib/mappers';
import { blogPostSchema } from '@/lib/validators/schemas';
import { BlogPost } from '@/models/BlogPost';

export async function GET() {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    await connectDB();
    const docs = await BlogPost.find().sort({ createdAt: -1 }).lean();
    return ok(docs.map((d) => mapBlogPost(d as never)));
  } catch {
    return fail('Failed to fetch blog posts', 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const body = await req.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const published = parsed.data.published ?? false;
    const doc = await BlogPost.create({
      ...parsed.data,
      published,
      publishedAt: published ? new Date() : undefined,
    });

    return ok(mapBlogPost(doc.toObject() as never), 201);
  } catch {
    return fail('Failed to create blog post', 500);
  }
}
