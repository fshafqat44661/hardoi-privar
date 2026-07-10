import Icon from '@/components/ui/Icons';

export default function FinalCTA() {
  return (
    <section className="final-cta relative overflow-hidden py-24 text-center text-white md:py-[120px]">
      <div className="container relative z-[1]">
        <span className="eyebrow !text-marigold before:!bg-marigold">One Parivar · One Identity</span>
        <h2 className="font-head mx-auto mt-[18px] max-w-[18ch] text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.02em] text-white">
          Stay connected to <span className="italic text-marigold">your roots.</span>
        </h2>
        <span className="font-deva mt-6 block text-[clamp(20px,2.4vw,28px)] font-semibold text-marigold">
          अपनी मिट्टी से जुड़े रहें।
        </span>
        <p className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-white/85">
          Wherever life takes you in the NCR, your parivar is just one call away. Join 1,000+ families who chose to never
          lose home.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <a className="btn !bg-marigold !font-bold !text-ink hover:!bg-[#E6A412]" href="/membership">
            Join the Community Today <Icon.ArrowRight />
          </a>
          <a className="btn btn-ghost !border-white/40 !text-white hover:!border-white hover:!bg-white/10" href="/contact">
            Talk to a Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}
