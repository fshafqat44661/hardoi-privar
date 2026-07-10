import Link from 'next/link';
import type { BannerColor } from '@/types';
import { cn } from '@/lib/utils/cn';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  hindi?: string;
  sub?: string;
  bannerImg?: string;
  bannerColor?: BannerColor;
  breadcrumbs?: Breadcrumb[];
}

const bannerGradients: Record<BannerColor, string> = {
  saffron: 'bg-[linear-gradient(135deg,#F8C89B_0%,#E85D2B_55%,#7A1F2B_100%)]',
  maroon: 'bg-[linear-gradient(135deg,#A83248_0%,#7A1F2B_60%,#3D0F15_100%)]',
  marigold: 'bg-[linear-gradient(135deg,#FDED96_0%,#F4B223_55%,#D48D00_100%)]',
  sky: 'bg-[linear-gradient(135deg,#8DD0F0_0%,#3DA4D9_55%,#1F5D82_100%)]',
  cream: 'bg-[linear-gradient(135deg,#FBF6EE_0%,#F4ECDD_55%,#E6D5B3_100%)]',
};

export default function PageHeader({
  eyebrow,
  title,
  hindi,
  sub,
  bannerImg,
  bannerColor = 'saffron',
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="page-banner">
      <div className={cn('absolute inset-0 z-0', bannerGradients[bannerColor])} />
      {bannerImg && (
        <>
          <img
            src={bannerImg}
            alt=""
            aria-hidden
            className="absolute inset-0 z-[1] h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/45 to-black/30" />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
        style={{
          background: 'repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 1px, transparent 1px 20px)',
        }}
      />

      <div className="container page-banner-content">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((b, i) => (
              <span key={`${b.label}-${i}`}>
                {b.href ? (
                  <Link href={b.href}>{b.label}</Link>
                ) : (
                  <span className="current">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="sep">/</span>}
              </span>
            ))}
          </nav>
        )}

        <span className="eyebrow page-banner-eyebrow">{eyebrow}</span>
        <h1 className="page-banner-title font-head">{title}</h1>
        {hindi && <span className="page-banner-hindi">{hindi}</span>}
        {sub && <p className="page-banner-sub">{sub}</p>}
      </div>
    </section>
  );
}
