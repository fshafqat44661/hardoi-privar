import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapMembershipSubmission } from '@/lib/mappers';
import { membershipStatusSchema } from '@/lib/validators/schemas';
import { MembershipSubmission } from '@/models/MembershipSubmission';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = membershipStatusSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await MembershipSubmission.findByIdAndUpdate(id, { status: parsed.data.status }, { new: true }).lean();
    if (!doc) return fail('Submission not found', 404);
    return ok(mapMembershipSubmission(doc as never));
  } catch {
    return fail('Failed to update submission', 500);
  }
}
