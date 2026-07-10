import { getAuthUser } from '@/lib/auth/jwt';
import { fail } from '@/lib/api/response';
import type { AuthUser } from '@/types';

export async function requireAuth(): Promise<{ user: AuthUser } | { error: ReturnType<typeof fail> }> {
  const user = await getAuthUser();
  if (!user) return { error: fail('Unauthorized', 401) };
  return { user };
}
