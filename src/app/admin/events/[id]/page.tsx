'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import type { EventDTO, MediaTone } from '@/types';

const MEDIA_OPTIONS: MediaTone[] = ['saffron', 'maroon', 'cream', 'sky', 'marigold'];

export default function AdminEventEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [form, setForm] = useState<Partial<EventDTO>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/events/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error ?? 'Failed to load');
        setForm(json.data);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag: form.tag,
        cat: form.cat,
        d: form.d,
        m: form.m,
        media: form.media,
        t: form.t,
        meta: form.meta,
        cat2: form.cat2,
        desc: form.desc,
        img: form.img,
        venue: form.venue,
        time: form.time,
        organizer: form.organizer,
        phone: form.phone,
        details: form.details,
      }),
    });
    const json = await res.json();
    setLoading(false);
    if (!json.success) {
      setError(json.error ?? 'Save failed');
      return;
    }
    router.push('/admin/events');
  }

  if (!form.t && !error) return <p className="text-sm text-ink-2">Loading…</p>;

  return (
    <>
      <AdminPageHeader title="Edit event" desc={form.t} />

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px] border border-line bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="form-label">Title</span>
            <input className="form-input" value={form.t ?? ''} onChange={(e) => setForm({ ...form, t: e.target.value })} required />
          </label>
          <label className="block">
            <span className="form-label">Tag</span>
            <input className="form-input" value={form.tag ?? ''} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
          </label>
          <label className="block">
            <span className="form-label">Category</span>
            <input className="form-input" value={form.cat ?? ''} onChange={(e) => setForm({ ...form, cat: e.target.value })} />
          </label>
          <label className="block">
            <span className="form-label">Day</span>
            <input className="form-input" value={form.d ?? ''} onChange={(e) => setForm({ ...form, d: e.target.value })} />
          </label>
          <label className="block">
            <span className="form-label">Month</span>
            <input className="form-input" value={form.m ?? ''} onChange={(e) => setForm({ ...form, m: e.target.value })} />
          </label>
          <label className="block">
            <span className="form-label">Media tone</span>
            <select className="form-input" value={form.media ?? 'saffron'} onChange={(e) => setForm({ ...form, media: e.target.value as MediaTone })}>
              {MEDIA_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="form-label">Meta line</span>
            <input className="form-input" value={form.meta ?? ''} onChange={(e) => setForm({ ...form, meta: e.target.value })} />
          </label>
          <label className="block md:col-span-2">
            <span className="form-label">Short description</span>
            <textarea className="form-input min-h-[80px] resize-y" value={form.desc ?? ''} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </label>
          <div className="md:col-span-2">
            <ImageUpload
              label="Event image"
              value={form.img ?? ''}
              onChange={(img) => setForm({ ...form, img })}
              folder="hardoi-parivar/events"
            />
          </div>
          <label className="block">
            <span className="form-label">Venue</span>
            <input className="form-input" value={form.venue ?? ''} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </label>
          <label className="block">
            <span className="form-label">Time</span>
            <input className="form-input" value={form.time ?? ''} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </label>
          <label className="block md:col-span-2">
            <span className="form-label">Full details</span>
            <textarea className="form-input min-h-[160px] resize-y" value={form.details ?? ''} onChange={(e) => setForm({ ...form, details: e.target.value })} />
          </label>
        </div>

        {error && <p className="text-sm text-primary-deep">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save event'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/events')}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
