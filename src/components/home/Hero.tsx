import Icon, { StarSvg } from '@/components/ui/Icons';

export default function Hero() {
  return (
    <section className="hero-section relative overflow-hidden py-10 md:py-[72px]">
      <div className="hero-bg pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[180px] -top-[180px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(244,178,35,.18),transparent_70%)] blur-[10px]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_72%,rgba(232,93,43,.09),transparent_28%),radial-gradient(circle_at_88%_30%,rgba(244,178,35,.14),transparent_32%),linear-gradient(180deg,#FBF6EE_0%,#FBEBD9_52%,#FBF6EE_100%)] sm:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-[url('/assets/hero-bg.svg')] bg-cover bg-[center_bottom] bg-no-repeat opacity-55 mix-blend-multiply sm:block"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,246,238,.5)_0%,transparent_30%,transparent_70%,rgba(251,246,238,.7)_100%),linear-gradient(90deg,rgba(251,246,238,.7)_0%,transparent_45%)]"
          aria-hidden
        />
      </div>

      <div className="container relative z-[1]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <span className="eyebrow mb-4 block md:mb-5">A Community of Hardoi · in NCR</span>
            <h1 className="font-head text-[clamp(32px,8vw,76px)] font-medium leading-[1.05] tracking-[-0.02em]">
              Our Roots,<br />
              Our Pride —<br />
              <span className="italic text-maroon">
                A Home Away
                <br />
                From Home.
              </span>
            </h1>
            <span className="font-deva mt-3 block text-[clamp(18px,4vw,30px)] font-semibold text-maroon md:mt-4">
              अपनी मिट्टी, अपने लोग।
            </span>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2 md:mt-5 md:text-[17px]">
              A strong, trusted community of families from Hardoi living across Delhi NCR —
              connected by culture, values and a shared sense of belonging. We stand together
              in celebration, in need, and in everyday life.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <a className="btn btn-primary w-full sm:w-auto" href="/membership">
                Join the Parivar <Icon.ArrowRight />
              </a>
              <a className="btn btn-ghost w-full sm:w-auto" href="/events">
                Explore Events
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-11 sm:gap-7">
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
              <p className="min-w-0 text-sm text-ink-2">
                <b className="font-semibold text-ink">1,000+ members</b> across Delhi, Noida, Gurgaon, Ghaziabad & Faridabad.
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[5/6] w-full max-w-lg min-h-0 md:min-h-[420px]" aria-hidden>
            <div className="star-float absolute left-[2%] top-[8%] hidden w-[22px] text-primary sm:block"><StarSvg /></div>
            <div className="star-float absolute right-[2%] top-[60%] hidden w-4 text-marigold [animation-delay:1.2s] sm:block"><StarSvg color="#F4B223" /></div>
            <div className="star-float absolute bottom-[2%] left-[20%] hidden w-[18px] text-maroon [animation-delay:2.4s] sm:block"><StarSvg color="#7A1F2B" /></div>

            <div className="absolute inset-0 overflow-hidden rounded-[16px] border border-line shadow-card sm:right-[10%] sm:bottom-[10%] sm:rounded-[20px]">
              <img src="/assets/IMG-20260315-WA0152.jpg.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-md bg-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/85 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:px-2.5 sm:py-1.5 sm:text-[11px]">
                // Community gathering · Hardoi Parivar NCR
              </span>
            </div>

            <div className="absolute right-0 top-[12%] hidden aspect-[3/4] w-[42%] flex-col justify-between rounded-[20px] border border-line bg-cream p-3 shadow-card sm:flex sm:p-5">
              <span className="font-deva text-[clamp(14px,2.2vw,22px)] font-semibold leading-tight text-maroon">
                सेवा
                <br />
                समर्पण
                <br />
                संगठन
              </span>
              <div>
                <div className="font-head text-[clamp(28px,5vw,46px)] leading-none">1,000+</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-2 sm:text-xs">Members</div>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-2.5 shadow-card sm:bottom-[4%] sm:left-auto sm:right-[8%] sm:gap-3 sm:px-[18px] sm:py-3.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#23A35A] shadow-[0_0_0_4px_rgba(35,163,90,.18)]" />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium">Holi Milan 2026</div>
                <div className="text-xs text-ink-2">Open for registrations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
