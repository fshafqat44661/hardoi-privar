import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapDonation } from '@/lib/mappers';
import { donationStatusSchema } from '@/lib/validators/schemas';
import { Donation } from '@/models/Donation';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = donationStatusSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await Donation.findByIdAndUpdate(id, { status: parsed.data.status }, { new: true }).lean();
    if (!doc) return fail('Donation not found', 404);
    return ok(mapDonation(doc as never));
  } catch {
    return fail('Failed to update donation', 500);
  }
}
