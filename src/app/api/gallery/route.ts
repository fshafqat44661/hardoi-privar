import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { getGalleryItems } from '@/lib/services/content.service';

export async function GET() {
  try {
    return ok(await getGalleryItems());
  } catch {
    return fail('Failed to fetch gallery', 500);
  }
}
