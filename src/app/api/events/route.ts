import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { getEvents, getEventBySlug } from '@/lib/services/content.service';

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    if (slug) {
      const event = await getEventBySlug(slug);
      if (!event) return fail('Event not found', 404);
      return ok(event);
    }
    const limit = Number(req.nextUrl.searchParams.get('limit') ?? 0) || undefined;
    return ok(await getEvents(limit));
  } catch {
    return fail('Failed to fetch events', 500);
  }
}
