export default function Strip() {
  return (
    <section className="bg-ink py-6 text-[#F3E9D6] md:py-7">
      <div className="container grid items-center gap-5 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:gap-9">
        <p className="text-[14px] leading-snug text-[#E7DDC9] md:text-[15px]">
          <b className="font-semibold text-white">Hardoi Parivar NCR</b> brings together families who share a common origin —
          and helps every one of us stay connected in a fast-moving city.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:contents">
          {[
            ['4', 'Community'],
            ['पं', 'Culture'],
            ['✓', 'Support'],
            ['↗', 'Growth'],
          ].map(([num, lbl]) => (
            <div key={lbl} className="flex flex-col gap-1 border-l border-white/10 pl-4 sm:pl-5">
              <span className="font-head text-[24px] leading-none text-marigold md:text-[28px]">{num}</span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#C4B89F] md:text-xs">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
