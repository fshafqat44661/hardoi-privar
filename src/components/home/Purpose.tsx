import Icon, { PURPOSE_ICONS, type PurposeIconName } from '@/components/ui/Icons';
import { cardIconTone } from '@/lib/utils/cn';
import type { PurposeCardDTO } from '@/types';

interface PurposeProps {
  cards: PurposeCardDTO[];
  showHead?: boolean;
}

export default function Purpose({ cards, showHead = true }: PurposeProps) {
  return (
    <section className="bg-cream-2 py-16 md:py-24">
      <div className="container">
        {showHead && (
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Our Purpose</span>
              <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
                Connect, support
                <br />
                and grow — together.
              </h2>
            </div>
            <p className="max-w-[46ch] text-base text-ink-2">
              Five commitments we make to every family in the parivar. Rooted in the values we grew up with; practiced in
              the city we now call home.
            </p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {cards.map((card, i) => (
            <article
              key={card.id}
              className={`flex min-h-[200px] flex-col gap-3.5 rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-card sm:min-h-[220px] sm:p-7 ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <div className={`grid h-11 w-11 place-items-center rounded-[10px] ${cardIconTone(card.tone)}`}>
                {PURPOSE_ICONS[card.icon as PurposeIconName]}
              </div>
              <h3 className="font-head text-[22px] leading-tight">{card.t}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-2">{card.d}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                Learn more <Icon.ArrowRight />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
