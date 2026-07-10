import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { AuthUser } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET ?? '';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';
export const AUTH_COOKIE = 'hp_auth_token';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: AuthUser['role'];
}

function getSecretKey() {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return new TextEncoder().encode(JWT_SECRET);
}

/** Edge + Node compatible — safe for middleware and API routes */
export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecretKey());
  if (!payload.sub) throw new Error('Invalid token');

  return {
    sub: payload.sub,
    email: String(payload.email ?? ''),
    name: String(payload.name ?? ''),
    role: payload.role as AuthUser['role'],
  };
}

export function toAuthUser(payload: JwtPayload): AuthUser {
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}

/** Read authenticated user from httpOnly cookie (server components / route handlers) */
export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    return toAuthUser(await verifyToken(token));
  } catch {
    return null;
  }
}

export function authCookieOptions(token: string) {
  return {
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}
