export default function Strip() {
  return (
    <section className="bg-ink py-7 text-[#F3E9D6]">
      <div className="container grid items-center gap-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:gap-9">
        <p className="text-[15px] leading-snug text-[#E7DDC9] lg:col-span-1">
          <b className="font-semibold text-white">Hardoi Parivar NCR</b> brings together families who share a common origin —
          and helps every one of us stay connected in a fast-moving city.
        </p>
        {[
          ['4', 'Community'],
          ['पं', 'Culture'],
          ['✓', 'Support'],
          ['↗', 'Growth'],
        ].map(([num, lbl]) => (
          <div key={lbl} className="flex flex-col gap-1 border-l border-white/10 pl-5">
            <span className="font-head text-[28px] leading-none text-marigold">{num}</span>
            <span className="text-xs uppercase tracking-[0.14em] text-[#C4B89F]">{lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
