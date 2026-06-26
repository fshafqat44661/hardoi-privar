import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { connectDB } from '@/lib/db/connect';
import { mapDonation } from '@/lib/mappers';
import { getAuthUser } from '@/lib/auth/jwt';
import { donationSchema } from '@/lib/validators/schemas';
import { Donation } from '@/models/Donation';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return fail('Unauthorized', 401);

    await connectDB();
    const docs = await Donation.find().sort({ createdAt: -1 }).limit(100).lean();
    return ok(docs.map((d) => mapDonation(d as never)));
  } catch {
    return fail('Failed to fetch donations', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = donationSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await Donation.create({
      ...parsed.data,
      email: parsed.data.email || undefined,
      status: 'pending',
    });

    return ok(mapDonation(doc.toObject() as never), 201);
  } catch {
    return fail('Failed to record donation', 500);
  }
}
