import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import Icon from '@/components/ui/Icons';
import EventDetailClient from '@/components/events/EventDetailClient';
import { getEventBySlug, getEvents } from '@/lib/services/content.service';
import { cn, eventMediaClass } from '@/lib/utils/cn';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event?.t ?? 'Event' };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const allEvents = await getEvents();
  const otherEvents = allEvents.filter((e) => e.slug !== slug).slice(0, 3);

  const bannerColor =
    event.media === 'saffron' ? 'saffron' : event.media === 'maroon' ? 'maroon' : event.media === 'sky' ? 'sky' : 'cream';

  return (
    <>
      <PageHeader
        eyebrow={event.cat}
        title={<>{event.t}</>}
        hindi={`${event.d} ${event.m} · ${event.meta}`}
        sub={event.desc}
        bannerImg={event.img}
        bannerColor={bannerColor}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: event.t }]}
      />

      <section className="py-12 md:pb-24">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <EventDetailClient event={event} />

            <aside className="lg:sticky lg:top-[120px]">
              <div className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-7">
                <h3 className="font-head border-b border-line pb-4 text-[22px]">Event Details</h3>
                <InfoRow label="Date" value={`${event.d} ${event.m}`} />
                <InfoRow label="Time" value={event.time} />
                <InfoRow label="Venue" value={event.venue} />
                <InfoRow label="Organised by" value={event.organizer} />
                <InfoRow label="Contact" value={event.phone} />
                <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                  <span className="rounded-full border border-ink bg-ink px-3.5 py-2 text-[13px] font-medium text-white">{event.cat}</span>
                  <span className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink-2">{event.tag}</span>
                  {event.cat2 && (
                    <span className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink-2">{event.cat2}</span>
                  )}
                </div>
              </div>
              <Link href="/membership" className="btn btn-primary mt-4" style={{ width: '100%', justifyContent: 'center' }}>
                Register Now <Icon.ArrowRight />
              </Link>
            </aside>
          </div>

          {otherEvents.length > 0 && (
            <div className="mt-16 border-t border-line pt-12">
              <h2 className="font-head mb-7 text-[clamp(24px,3vw,36px)]">More Events</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {otherEvents.map((e) => (
                  <Link key={e.id} href={`/events/${e.slug}`} className="overflow-hidden rounded-[20px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card">
                    <div className={cn('relative aspect-[16/10]', eventMediaClass[e.media])}>
                      {e.img && <img src={e.img} alt={e.t} className="absolute inset-0 h-full w-full object-cover" />}
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase">{e.tag}</span>
                    </div>
                    <div className="p-4">
                      <div className="mb-1 text-xs text-ink-2">
                        {e.d} {e.m} · {e.meta}
                      </div>
                      <h3 className="font-head text-lg">{e.t}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-2">{label}</div>
      <div className="mt-0.5 text-[15px] font-medium">{value}</div>
    </div>
  );
}
