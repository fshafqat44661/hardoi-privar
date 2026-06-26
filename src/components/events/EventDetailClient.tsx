'use client';

import { useState } from 'react';
import type { EventDTO } from '@/types';

interface Props {
  event: EventDTO;
}

export default function EventDetailClient({ event }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-head mb-4 text-[clamp(24px,3vw,32px)]">About this Event</h2>
        <p className="text-base leading-[1.75] text-ink-2">{event.details}</p>
      </section>

      {event.gallery.length > 0 && (
        <section>
          <h2 className="font-head mb-4 text-[clamp(24px,3vw,32px)]">Event Photos</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {event.gallery.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img src={img} alt={`${event.t} photo ${i + 1}`} className="h-full w-full object-cover transition group-hover:scale-105" />
              </button>
            ))}
          </div>
        </section>
      )}

      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
          <img src={event.gallery[lightbox]} alt="" className="max-h-full max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
