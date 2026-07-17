'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useStore';
import { submitMembership } from '@/store/thunks/forms';
import FormSelect from '@/components/ui/FormSelect';
import Icon from '@/components/ui/Icons';

const CITIES = ['Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad', 'Other NCR'] as const;

interface JoinBandProps {
  benefits: string[];
}

export default function JoinBand({ benefits }: JoinBandProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: '', phone: '', city: 'Delhi' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) nextErrors.name = 'Please enter your full name';
    if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(form.phone.replace(/\s/g, '')))
      nextErrors.phone = 'Enter a valid 10-digit phone number';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await dispatch(submitMembership(form)).unwrap();
      setDone(true);
    } catch (err) {
      setErrors({ form: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-ink py-16 text-cream md:py-24">
      <div className="container grid items-start gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow text-marigold before:bg-marigold">Membership</span>
          <h2 className="font-head mt-4 text-[clamp(32px,4vw,52px)] leading-[1.05]">
            <span className="font-deva block text-marigold">हमारे परिवार का हिस्सा बनिए</span>
            Become a part
            <br />
            of our family.
          </h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-[#E7DDC9]">
            Membership is free for Hardoi families living in the NCR. Join for the people,
            stay for the parivar. No paperwork gymnastics — just a simple form and a warm welcome.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-[#E7DDC9]">
                <Icon.Check className="mt-0.5 shrink-0 text-marigold" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-[20px] border border-white/10 bg-white p-5 text-ink sm:p-7">
          {!done ? (
            <>
              <div className="font-head text-2xl">Quick registration</div>
              <p className="mt-1 text-sm text-ink-2">Takes under a minute. We&apos;ll call to welcome you.</p>
              <div className="mt-6 space-y-4">
                <Field label="Full name" error={errors.name}>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rohit Singh"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" error={errors.phone}>
                    <input
                      className="form-input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="98xxxxxxxx"
                    />
                  </Field>
                  <Field label="City">
                    <FormSelect value={form.city} onChange={(city) => setForm({ ...form, city })} options={CITIES} />
                  </Field>
                </div>
              </div>
              {errors.form && <p className="mt-3 text-sm text-primary-deep">{errors.form}</p>}
              <button type="submit" className="btn btn-primary mt-6 w-full justify-center" disabled={loading}>
                {loading ? 'Submitting…' : 'Join Hardoi Parivar NCR'} {!loading && <Icon.ArrowRight />}
              </button>
              <p className="mt-3 text-center text-xs text-ink-2">
                By joining, you agree to receive occasional event updates on WhatsApp.
              </p>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon.Check />
              </div>
              <h3 className="font-deva mt-4 text-2xl">स्वागत है, {form.name.split(' ')[0]}!</h3>
              <p className="mt-2 text-ink-2">
                Your request is in. A parivar volunteer will reach out on {form.phone} within 24 hours.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-2">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-primary-deep">{error}</span>}
    </label>
  );
}
