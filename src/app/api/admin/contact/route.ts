import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { mapContactSubmission } from '@/lib/mappers';
import { ContactSubmission } from '@/models/ContactSubmission';

export async function GET() {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    await connectDB();
    const docs = await ContactSubmission.find().sort({ createdAt: -1 }).limit(200).lean();
    return ok(docs.map((d) => mapContactSubmission(d as never)));
  } catch {
    return fail('Failed to fetch contact submissions', 500);
  }
}
