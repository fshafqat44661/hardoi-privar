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
    <section className="py-12 md:py-24">
      <div className="container">
        {showHead && (
          <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-12 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">Events & Activities</span>
              <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(28px,7vw,52px)] leading-[1.05]">
                Our community
                <br />
                gatherings.
              </h2>
            </div>
            <div className="flex max-w-full flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => dispatch(setEventFilter(cat))}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[12px] font-medium transition sm:px-3.5 sm:py-2 sm:text-[13px]',
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

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
          {list.map((event, i) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className={cn(
                'group flex flex-col overflow-hidden rounded-[16px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card sm:rounded-[20px]',
                i === 0 && 'md:row-span-2',
              )}
            >
              <div
                className={cn(
                  'relative',
                  eventMediaClass[event.media],
                  i === 0 ? 'min-h-[200px] flex-1 sm:min-h-[280px]' : 'aspect-[16/10]',
                )}
              >
                {event.img && (
                  <img src={event.img} alt={event.t} className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide sm:left-4 sm:top-4 sm:px-2.5 sm:py-1.5 sm:text-xs">
                  {event.tag}
                </span>
                <div className="absolute right-3 top-3 min-w-[48px] rounded-[10px] bg-black/30 px-2 py-1.5 text-center text-white backdrop-blur-md sm:right-4 sm:top-4 sm:min-w-[56px] sm:px-2.5 sm:py-2">
                  <span className="font-head block text-lg sm:text-xl">{event.d}</span>
                  <span className="mt-0.5 block text-[9px] uppercase tracking-[0.14em] text-white/85 sm:mt-1 sm:text-[10px]">{event.m}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 sm:gap-2.5 sm:p-5">
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-2 sm:text-[13px]">
                  <span>{event.cat}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-ink-2" />
                  <span>{event.meta}</span>
                </div>
                <h3 className="font-head text-[18px] leading-tight sm:text-[22px]">{event.t}</h3>
                <p className="line-clamp-3 text-sm leading-snug text-ink-2">{event.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-ink-2">Members get priority registration and discounted passes.</span>
          <Link href="/events" className="btn btn-ghost w-full sm:w-auto">
            View all events <Icon.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
