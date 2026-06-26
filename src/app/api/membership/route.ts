import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { connectDB } from '@/lib/db/connect';
import { membershipSchema } from '@/lib/validators/schemas';
import { MembershipSubmission } from '@/models/MembershipSubmission';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = membershipSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await MembershipSubmission.create(parsed.data);
    return ok({ id: String(doc._id), message: 'Registration received' }, 201);
  } catch {
    return fail('Failed to submit membership', 500);
  }
}
