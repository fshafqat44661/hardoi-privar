'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useStore';
import { submitContact } from '@/store/thunks/forms';
import Icon from '@/components/ui/Icons';

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'General', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(
        submitContact({
          ...form,
          email: form.email || undefined,
        }),
      ).unwrap();
      setSent(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-line bg-white p-7">
      {!sent ? (
        <>
          <div className="font-head text-2xl">Send us a message</div>
          <p className="mt-1 text-sm text-ink-2">We reply within one working day.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="form-label">Name</span>
              <input required className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="form-label">Phone</span>
              <input required className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="form-label">Email</span>
            <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="mt-4 block">
            <span className="form-label">Topic</span>
            <select className="form-input" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  {['General', 'Membership', 'Events', 'Volunteering', 'Welfare / Help'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="form-label">Message</span>
            <textarea className="form-input min-h-[100px] resize-y" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          {error && <p className="mt-3 text-sm text-primary-deep">{error}</p>}
          <button type="submit" className="btn btn-primary mt-6" disabled={loading}>
            {loading ? 'Sending…' : 'Send message'} {!loading && <Icon.ArrowRight />}
          </button>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Icon.Check />
          </div>
          <h3 className="font-deva mt-4 text-2xl">धन्यवाद!</h3>
          <p className="mt-2 text-ink-2">Your message is with us. We&apos;ll reply to {form.name || 'you'} shortly.</p>
        </div>
      )}
    </form>
  );
}
