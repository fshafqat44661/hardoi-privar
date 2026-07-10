import { cookies } from 'next/headers';
import { AUTH_COOKIE, toAuthUser, verifyToken } from '@/lib/auth/jwt';
import { ok, fail } from '@/lib/api/response';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return fail('Unauthorized', 401);

  try {
    return ok(toAuthUser(await verifyToken(token)));
  } catch {
    return fail('Unauthorized', 401);
  }
}
