import Icon, { StarSvg } from '@/components/ui/Icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-14 md:py-[72px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[180px] -top-[180px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(244,178,35,.18),transparent_70%)] blur-[10px]" />
      </div>

      <div className="container relative z-[1]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <span className="eyebrow mb-5 block">A Community of Hardoi · in NCR</span>
            <h1 className="font-head text-[clamp(40px,6vw,76px)] font-medium leading-[1.02] tracking-[-0.02em]">
              Our Roots,<br />
              Our Pride —<br />
              <span className="italic text-maroon">
                A Home Away
                <br />
                From Home.
              </span>
            </h1>
            <span className="font-deva mt-4 block text-[clamp(22px,2.6vw,30px)] font-semibold text-maroon">
              अपनी मिट्टी, अपने लोग।
            </span>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
              A strong, trusted community of families from Hardoi living across Delhi NCR —
              connected by culture, values and a shared sense of belonging. We stand together
              in celebration, in need, and in everyday life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="/membership">
                Join the Parivar <Icon.ArrowRight />
              </a>
              <a className="btn btn-ghost" href="/events">
                Explore Events
              </a>
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-7">
              <div className="flex" aria-hidden>
                {[
                  ['RS', 'bg-[#FCD9C0] text-[#8B3A0F]'],
                  ['AK', 'bg-[#FDE7B0] text-[#7A5600]'],
                  ['PV', 'bg-[#C9E4F3] text-[#1F5D82]'],
                  ['NT', 'bg-[#F4D0D3] text-[#7A1F2B]'],
                ].map(([label, cls], i) => (
                  <div
                    key={label}
                    className={`-ml-2.5 grid h-9 w-9 place-items-center rounded-full border-2 border-cream text-[13px] font-semibold first:ml-0 ${cls}`}
                    style={{ zIndex: 4 - i }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-2">
                <b className="font-semibold text-ink">1,000+ members</b> across Delhi, Noida, Gurgaon, Ghaziabad & Faridabad.
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[5/6] min-h-[420px] w-full max-w-lg" aria-hidden>
            <div className="star-float absolute left-[-2%] top-[8%] w-[22px] text-primary"><StarSvg /></div>
            <div className="star-float absolute right-[-1%] top-[60%] w-4 text-marigold [animation-delay:1.2s]"><StarSvg color="#F4B223" /></div>
            <div className="star-float absolute bottom-[2%] left-[20%] w-[18px] text-maroon [animation-delay:2.4s]"><StarSvg color="#7A1F2B" /></div>

            <div className="absolute inset-0 right-[10%] bottom-[10%] overflow-hidden rounded-[20px] border border-line shadow-card">
              <img src="/assets/IMG-20260315-WA0152.jpg.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-md bg-black/20 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
                // Community gathering · Hardoi Parivar NCR
              </span>
            </div>

            <div className="absolute right-0 top-[12%] flex aspect-[3/4] w-[42%] flex-col justify-between rounded-[20px] border border-line bg-cream p-5 shadow-card">
              <span className="font-deva text-[22px] font-semibold leading-tight text-maroon">
                सेवा
                <br />
                समर्पण
                <br />
                संगठन
              </span>
              <div>
                <div className="font-head text-[46px] leading-none">1,000+</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-2">Members</div>
              </div>
            </div>

            <div className="absolute right-[8%] bottom-[4%] flex items-center gap-3 rounded-full border border-line bg-white px-[18px] py-3.5 shadow-card">
              <span className="h-2.5 w-2.5 rounded-full bg-[#23A35A] shadow-[0_0_0_4px_rgba(35,163,90,.18)]" />
              <div>
                <div className="text-[13px] font-medium">Holi Milan 2026</div>
                <div className="text-xs text-ink-2">Open for registrations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
