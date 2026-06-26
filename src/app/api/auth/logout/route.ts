import { NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth/jwt';
import { ok } from '@/lib/api/response';

export async function POST() {
  const response = ok({ message: 'Logged out' });
  response.cookies.set({
    name: AUTH_COOKIE,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
