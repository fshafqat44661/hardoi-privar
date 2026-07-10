import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { connectDB } from '@/lib/db/connect';
import { BlogPost } from '@/models/BlogPost';
import { ContactSubmission } from '@/models/ContactSubmission';
import { Donation } from '@/models/Donation';
import { Event } from '@/models/Event';
import { MembershipSubmission } from '@/models/MembershipSubmission';

export async function GET() {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  try {
    await connectDB();
    const [donationTotal, donationPending, blogTotal, blogPublished, events, membershipTotal, membershipPending, contactTotal, contactNew] =
      await Promise.all([
        Donation.countDocuments(),
        Donation.countDocuments({ status: 'pending' }),
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ published: true }),
        Event.countDocuments(),
        MembershipSubmission.countDocuments(),
        MembershipSubmission.countDocuments({ status: 'pending' }),
        ContactSubmission.countDocuments(),
        ContactSubmission.countDocuments({ status: 'new' }),
      ]);

    return ok({
      donations: { total: donationTotal, pending: donationPending },
      blog: { total: blogTotal, published: blogPublished, drafts: blogTotal - blogPublished },
      events,
      membership: { total: membershipTotal, pending: membershipPending },
      contact: { total: contactTotal, new: contactNew },
    });
  } catch {
    return fail('Failed to load stats', 500);
  }
}
