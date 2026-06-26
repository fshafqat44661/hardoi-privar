import EventsSection from '@/components/home/EventsSection';
import PageHeader from '@/components/layout/PageHeader';
import { getEvents } from '@/lib/services/content.service';

export const metadata = { title: 'Events' };

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Events & Activities"
        title={
          <>
            Where our parivar <i>comes together.</i>
          </>
        }
        hindi="त्योहार · मिलन · सेवा"
        sub="Festivals, meetups, service camps and sports — a year-round calendar that keeps the parivar close."
        bannerImg="/assets/FB_IMG_1777382182880.jpg.jpeg"
        bannerColor="saffron"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
      />
      <EventsSection initialEvents={events} limit={50} showHead={false} />
    </>
  );
}
