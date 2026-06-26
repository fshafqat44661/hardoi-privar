import Icon from '@/components/ui/Icons';

interface AboutProps {
  compact?: boolean;
}

export default function About({ compact = false }: AboutProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-cream-2">
            <img
              src="/assets/IMG-20260315-WA0152.jpg.jpeg"
              alt="Community gathering"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2.5 rounded-[10px] bg-white px-3.5 py-2.5 text-[13px] font-medium shadow-soft">
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
              Since 2014 · NCR
            </div>
          </div>

          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="font-head mt-4 text-[clamp(32px,4vw,52px)] leading-[1.05]">
              More than a group.
              <br />
              <i className="text-maroon">A parivar.</i>
            </h2>
            <p className="my-5 max-w-[52ch] text-base leading-[1.7] text-ink-2">
              Hardoi Parivar NCR is a not-for-profit community of families whose roots trace back to Hardoi — now
              building their lives across Delhi, Noida, Gurgaon, Ghaziabad and Faridabad. We meet, we celebrate, and when
              a hand is needed, we show up for each other.
            </p>
            <blockquote className="my-7 rounded-r-[10px] border-l-[3px] border-primary bg-primary/[0.06] px-5 py-[18px] font-head text-lg italic leading-snug">
              &ldquo;जहाँ अपनापन है, वहीं घर है।&rdquo; — Where there is belonging, there is home.
            </blockquote>
            <p className="max-w-[52ch] text-base leading-[1.7] text-ink-2">
              From weddings and festivals to medical emergencies and career guidance, our parivar is a dependable circle
              of people who remember where they come from and look out for one another.
            </p>
            {!compact && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="/about">
                  Read our story <Icon.ArrowRight />
                </a>
                <a className="btn btn-ghost" href="/purpose">
                  Our purpose
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
