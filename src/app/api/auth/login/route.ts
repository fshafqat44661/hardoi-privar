import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { authCookieOptions, signToken, verifyToken, AUTH_COOKIE } from '@/lib/auth/jwt';
import { ok, fail } from '@/lib/api/response';
import { connectDB } from '@/lib/db/connect';
import { loginSchema } from '@/lib/validators/schemas';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Invalid input');

    await connectDB();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (!user) return fail('Invalid email or password', 401);

    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) return fail('Invalid email or password', 401);

    const token = signToken({
      sub: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = ok({
      id: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });
    response.cookies.set(authCookieOptions(token));
    return response;
  } catch {
    return fail('Login failed', 500);
  }
}
