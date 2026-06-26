import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { connectDB } from '@/lib/db/connect';
import { contactSchema } from '@/lib/validators/schemas';
import { ContactSubmission } from '@/models/ContactSubmission';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const doc = await ContactSubmission.create({
      ...parsed.data,
      email: parsed.data.email || undefined,
    });
    return ok({ id: String(doc._id), message: 'Message received' }, 201);
  } catch {
    return fail('Failed to send message', 500);
  }
}
