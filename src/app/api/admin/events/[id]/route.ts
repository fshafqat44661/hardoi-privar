import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapEvent } from '@/lib/mappers';
import { eventUpdateSchema } from '@/lib/validators/schemas';
import { Event } from '@/models/Event';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    await connectDB();
    const doc = await Event.findById(id).lean();
    if (!doc) return fail('Event not found', 404);
    return ok(mapEvent(doc as never));
  } catch {
    return fail('Failed to fetch event', 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await Event.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
    if (!doc) return fail('Event not found', 404);
    return ok(mapEvent(doc as never));
  } catch {
    return fail('Failed to update event', 500);
  }
}
