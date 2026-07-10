import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { getBlogBySlug, getBlogs } from '@/lib/services/content.service';

/** Public blog listing — published posts only. Optional ?slug= for a single post. */
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    if (slug) {
      const post = await getBlogBySlug(slug);
      if (!post) return fail('Post not found', 404);
      return ok(post);
    }

    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? Number(limitParam) : undefined;
    return ok(await getBlogs(Number.isFinite(limit) ? limit : undefined));
  } catch {
    return fail('Failed to fetch blogs', 500);
  }
}
