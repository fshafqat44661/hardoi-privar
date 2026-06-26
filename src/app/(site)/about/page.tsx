import About from '@/components/home/About';
import PageHeader from '@/components/layout/PageHeader';
import { getTimeline } from '@/lib/services/content.service';

export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const timeline = await getTimeline();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            From Hardoi to NCR <i>— together.</i>
          </>
        }
        hindi="अपनी जड़ों से जुड़े, अपने शहर में बसे।"
        sub="Hardoi Parivar NCR began as a WhatsApp group of a few dozen families in 2014. A decade later, it is a trusted community of over a thousand."
        bannerImg="/assets/IMG-20260315-WA0152.jpg.jpeg"
        bannerColor="maroon"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />
      <About compact />
      <section className="bg-cream-2 py-16 md:py-[72px]">
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="font-head mt-3.5 text-[clamp(30px,3.6vw,46px)] leading-tight">
              A decade of
              <br />
              showing up.
            </h2>
          </div>
          <div className="space-y-7">
            {timeline.map((entry, i) => (
              <div
                key={entry.id}
                className={`grid gap-6 border-line pb-6 sm:grid-cols-[80px_1fr] ${i < timeline.length - 1 ? 'border-b' : ''}`}
              >
                <div className="font-head text-[32px] text-primary">{entry.y}</div>
                <div>
                  <h3 className="font-head text-[22px]">{entry.t}</h3>
                  <p className="mt-1.5 text-ink-2">{entry.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
