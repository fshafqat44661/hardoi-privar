import { ok, fail } from '@/lib/api/response';
import { connectDB } from '@/lib/db/connect';
import { mapBlogPost } from '@/lib/mappers';
import { BlogPost } from '@/models/BlogPost';

/** Public blog listing — returns published posts only */
export async function GET() {
  try {
    await connectDB();
    const docs = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean();
    return ok(docs.map((d) => mapBlogPost(d as never)));
  } catch {
    return fail('Failed to fetch blogs', 500);
  }
}
