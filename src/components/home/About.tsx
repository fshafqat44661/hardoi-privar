import Icon from '@/components/ui/Icons';

interface AboutProps {
  compact?: boolean;
}

export default function About({ compact = false }: AboutProps) {
  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
          <div className="relative aspect-[4/5] max-h-[420px] overflow-hidden rounded-[16px] border border-line bg-cream-2 sm:max-h-none sm:rounded-[20px]">
            <img
              src="/assets/IMG-20260315-WA0152.jpg.jpeg"
              alt="Community gathering"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2 text-[12px] font-medium shadow-soft sm:bottom-6 sm:left-6 sm:px-3.5 sm:py-2.5 sm:text-[13px]">
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
              Since 2014 · NCR
            </div>
          </div>

          <div className="min-w-0">
            <span className="eyebrow">Who We Are</span>
            <h2 className="font-head mt-4 text-[clamp(28px,7vw,52px)] leading-[1.05]">
              More than a group.
              <br />
              <i className="text-maroon">A parivar.</i>
            </h2>
            <p className="my-4 max-w-[52ch] text-[15px] leading-[1.7] text-ink-2 sm:my-5 sm:text-base">
              Hardoi Parivar NCR is a not-for-profit community of families whose roots trace back to Hardoi — now
              building their lives across Delhi, Noida, Gurgaon, Ghaziabad and Faridabad. We meet, we celebrate, and when
              a hand is needed, we show up for each other.
            </p>
            <blockquote className="my-5 rounded-r-[10px] border-l-[3px] border-primary bg-primary/[0.06] px-4 py-4 font-head text-base italic leading-snug sm:my-7 sm:px-5 sm:py-[18px] sm:text-lg">
              &ldquo;जहाँ अपनापन है, वहीं घर है।&rdquo; — Where there is belonging, there is home.
            </blockquote>
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-ink-2 sm:text-base">
              From weddings and festivals to medical emergencies and career guidance, our parivar is a dependable circle
              of people who remember where they come from and look out for one another.
            </p>
            {!compact && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="btn btn-primary w-full sm:w-auto" href="/about">
                  Read our story <Icon.ArrowRight />
                </a>
                <a className="btn btn-ghost w-full sm:w-auto" href="/purpose">
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
