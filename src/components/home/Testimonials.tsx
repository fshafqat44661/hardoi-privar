const QUOTES = [
  {
    txt: (
      <>
        Being part of this group makes NCR feel like <em className="italic text-maroon">home.</em> Every Holi, every Diwali — I have my parivar around me again.
      </>
    ),
    name: 'Rohit Singh',
    role: 'Software Engineer · Noida',
    av: 'bg-[#FCD9C0] text-[#8B3A0F]',
    initials: 'RS',
  },
  {
    txt: (
      <>
        When my father needed urgent care in Hardoi, the parivar arranged it within an hour.{' '}
        <em className="italic text-maroon">This isn&apos;t a group — it&apos;s family.</em>
      </>
    ),
    name: 'Priya Verma',
    role: 'Doctor · Delhi',
    av: 'bg-[#F4D0D3] text-[#7A1F2B]',
    initials: 'PV',
  },
  {
    txt: <>I got my first job through a parivar mentor. Ten years on, I now mentor three students from Hardoi every year.</>,
    name: 'Amit Kumar',
    role: 'Banker · Gurgaon',
    av: 'bg-[#C9E4F3] text-[#1F5D82]',
    initials: 'AK',
  },
] as const;

export default function Testimonials() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Community Voices</span>
            <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
              What our parivar
              <br />
              has to say.
            </h2>
          </div>
          <p className="max-w-[46ch] text-base text-ink-2">
            Honest words from the people who make this community what it is — no campaigns, no scripts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          {QUOTES.map((q) => (
            <article
              key={q.name}
              className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="font-head text-[60px] leading-[0.5] text-primary">&ldquo;</div>
              <div className="font-head flex-1 text-lg leading-snug text-ink">{q.txt}</div>
              <div className="flex items-center gap-3 border-t border-line pt-[18px]">
                <div className={`grid h-11 w-11 place-items-center rounded-full text-sm font-semibold ${q.av}`}>
                  {q.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{q.name}</div>
                  <div className="text-xs text-ink-2">{q.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
