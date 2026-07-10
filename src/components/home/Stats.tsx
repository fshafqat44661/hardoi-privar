const STATS = [
  { num: '1,000', plus: true, lbl: 'Members Connected', sub: 'Families across Delhi NCR' },
  { num: '40', plus: true, lbl: 'Events Organised', sub: 'Festivals, meetups, seva drives' },
  { num: '8', plus: false, lbl: 'Cities Covered', sub: 'Delhi, Noida, Gurgaon & more' },
  { num: '12', plus: false, lbl: 'Years of Unity', sub: 'Since 2014, growing strong' },
] as const;

export default function Stats() {
  return (
    <section className="border-y border-line bg-cream py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.lbl}
              className={`px-6 py-2 text-center ${
                i < STATS.length - 1 ? 'border-r border-dashed border-line max-lg:[&:nth-child(2)]:border-r-0' : ''
              } max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(-n+2)]:border-dashed max-lg:[&:nth-child(-n+2)]:pb-6 max-lg:[&:nth-child(n+3)]:pt-6`}
            >
              <div className="font-head text-[clamp(48px,5.5vw,76px)] font-medium leading-none tracking-[-0.02em] text-ink">
                {stat.num}
                {stat.plus && <span className="text-primary">+</span>}
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-2">{stat.lbl}</div>
              <div className="mt-1.5 text-[13px] leading-snug text-ink-2">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
