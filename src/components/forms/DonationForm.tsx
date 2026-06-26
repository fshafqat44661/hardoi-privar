'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useStore';
import { submitDonation } from '@/store/thunks/forms';
import { DONATION_PURPOSES } from '@/config/site';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icons';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

export default function DonationForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 1000,
    purpose: DONATION_PURPOSES[0] as string,
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) nextErrors.name = 'Please enter your full name';
    if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(form.phone.replace(/\s/g, '')))
      nextErrors.phone = 'Enter a valid 10-digit phone number';
    if (form.amount < 1) nextErrors.amount = 'Enter a valid amount';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await dispatch(
        submitDonation({
          name: form.name,
          email: form.email || undefined,
          phone: form.phone,
          amount: form.amount,
          purpose: form.purpose,
          message: form.message || undefined,
        }),
      ).unwrap();
      setDone(true);
    } catch (err) {
      setErrors({ form: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-line bg-white p-7 shadow-soft">
      {!done ? (
        <>
          <div className="font-head text-2xl">Make a donation</div>
          <p className="mt-1 text-sm text-ink-2">100% of contributions support parivar welfare programmes.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setForm({ ...form, amount: amt })}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  form.amount === amt ? 'border-ink bg-ink text-white' : 'border-line text-ink-2 hover:border-ink-2'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="form-label">Full name</span>
              <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="form-label">Phone</span>
              <input className="form-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </label>
            <label className="block">
              <span className="form-label">Email (optional)</span>
              <input className="form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="form-label">Amount (₹)</span>
              <input
                className="form-input"
                type="number"
                min={1}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              />
              {errors.amount && <span className="form-error">{errors.amount}</span>}
            </label>
            <label className="block">
              <span className="form-label">Purpose</span>
              <select className="form-input" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>
                {DONATION_PURPOSES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="form-label">Message (optional)</span>
              <textarea
                className="form-input min-h-[100px] resize-y"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
          </div>

          {errors.form && <p className="mt-3 text-sm text-primary-deep">{errors.form}</p>}
          <Button type="submit" className="mt-6 w-full justify-center" disabled={loading}>
            {loading ? 'Processing…' : `Donate ₹${form.amount.toLocaleString('en-IN')}`} {!loading && <Icon.ArrowRight />}
          </Button>
          <p className="mt-3 text-center text-xs text-ink-2">
            Payment gateway integration coming soon. Your pledge is recorded and our team will follow up.
          </p>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Icon.Check />
          </div>
          <h3 className="font-deva mt-4 text-2xl">धन्यवाद, {form.name.split(' ')[0]}!</h3>
          <p className="mt-2 text-ink-2">
            Your donation of ₹{form.amount.toLocaleString('en-IN')} for {form.purpose} has been recorded. We&apos;ll contact you at{' '}
            {form.phone}.
          </p>
        </div>
      )}
    </form>
  );
}
