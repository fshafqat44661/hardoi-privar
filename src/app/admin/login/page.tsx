'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { clearAuthError, fetchMe, login } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) router.replace('/admin');
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(clearAuthError());
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) router.replace('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[20px] border border-line bg-white p-8 shadow-soft">
        <h1 className="font-head text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-ink-2">Hardoi Parivar NCR dashboard</p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="form-label">Email</span>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <span className="form-label">Password</span>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-primary-deep">{error}</p>}
        <Button type="submit" className="mt-6 w-full justify-center" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
