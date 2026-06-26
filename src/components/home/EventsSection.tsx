'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { setEventFilter, setEvents } from '@/store/slices/eventsSlice';
import Icon from '@/components/ui/Icons';
import { cn, eventMediaClass } from '@/lib/utils/cn';
import type { EventDTO } from '@/types';

interface EventsSectionProps {
  limit?: number;
  showHead?: boolean;
  initialEvents: EventDTO[];
}

export default function EventsSection({ limit = 5, showHead = true, initialEvents }: EventsSectionProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((s) => s.events.filter);
  const stored = useAppSelector((s) => s.events.items);

  useEffect(() => {
    if (!stored.length) dispatch(setEvents(initialEvents));
  }, [dispatch, initialEvents, stored.length]);

  const events = stored.length ? stored : initialEvents;
  const categories = ['All', ...Array.from(new Set(events.map((e) => e.cat)))];
  const list = (filter === 'All' ? events : events.filter((e) => e.cat === filter)).slice(0, limit);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {showHead && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">Events & Activities</span>
              <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
                Our community
                <br />
                gatherings.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => dispatch(setEventFilter(cat))}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-[13px] font-medium transition',
                    filter === cat
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-white text-ink-2 hover:border-ink-2 hover:text-ink',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          {list.map((event, i) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className={cn(
                'group flex flex-col overflow-hidden rounded-[20px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card',
                i === 0 && 'md:row-span-2',
              )}
            >
              <div
                className={cn(
                  'relative',
                  eventMediaClass[event.media],
                  i === 0 ? 'min-h-[280px] flex-1' : 'aspect-[16/10]',
                )}
              >
                {event.img && (
                  <img src={event.img} alt={event.t} className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide">
                  {event.tag}
                </span>
                <div className="absolute right-4 top-4 min-w-[56px] rounded-[10px] bg-black/30 px-2.5 py-2 text-center text-white backdrop-blur-md">
                  <span className="font-head block text-xl">{event.d}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/85">{event.m}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 p-5">
                <div className="flex items-center gap-2 text-[13px] text-ink-2">
                  <span>{event.cat}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-ink-2" />
                  <span>{event.meta}</span>
                </div>
                <h3 className="font-head text-[22px] leading-tight">{event.t}</h3>
                <p className="text-sm leading-snug text-ink-2">{event.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-ink-2">Members get priority registration and discounted passes.</span>
          <Link href="/events" className="btn btn-ghost">
            View all events <Icon.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
