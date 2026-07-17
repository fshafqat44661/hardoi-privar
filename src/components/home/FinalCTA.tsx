import Icon from '@/components/ui/Icons';

export default function FinalCTA() {
  return (
    <section className="final-cta relative overflow-hidden px-1 py-16 text-center text-white md:py-[120px]">
      <div className="container relative z-[1]">
        <span className="eyebrow !text-marigold before:!bg-marigold">One Parivar · One Identity</span>
        <h2 className="font-head mx-auto mt-[18px] max-w-[18ch] text-[clamp(32px,8vw,84px)] leading-[1.05] tracking-[-0.02em] text-white">
          Stay connected to <span className="italic text-marigold">your roots.</span>
        </h2>
        <span className="font-deva mt-6 block text-[clamp(20px,2.4vw,28px)] font-semibold text-marigold">
          अपनी मिट्टी से जुड़े रहें।
        </span>
        <p className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-white/85">
          Wherever life takes you in the NCR, your parivar is just one call away. Join 1,000+ families who chose to never
          lose home.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5">
          <a className="btn w-full !bg-marigold !font-bold !text-ink hover:!bg-[#E6A412] sm:w-auto" href="/membership">
            Join the Community Today <Icon.ArrowRight />
          </a>
          <a className="btn btn-ghost w-full !border-white/40 !text-white hover:!border-white hover:!bg-white/10 sm:w-auto" href="/contact">
            Talk to a Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}
