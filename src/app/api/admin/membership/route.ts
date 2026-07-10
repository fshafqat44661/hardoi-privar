import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapMembershipSubmission } from '@/lib/mappers';
import { MembershipSubmission } from '@/models/MembershipSubmission';

export async function GET() {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    await connectDB();
    const docs = await MembershipSubmission.find().sort({ createdAt: -1 }).limit(200).lean();
    return ok(docs.map((d) => mapMembershipSubmission(d as never)));
  } catch {
    return fail('Failed to fetch membership submissions', 500);
  }
}
