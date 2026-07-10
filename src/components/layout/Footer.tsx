import Link from 'next/link';
import { SITE } from '@/config/site';
import Icon from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-cream-2 py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
                <img src="/assets/logo.png" alt="" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-deva text-base font-semibold text-maroon">हरदोई परिवार · NCR</div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                  A community of families from Hardoi, living across Delhi NCR — bound by culture,
                  values and the simple idea of showing up for each other.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-head text-lg">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-2">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li><Link href="/about" className="hover:text-ink">About</Link></li>
              <li><Link href="/purpose" className="hover:text-ink">Purpose</Link></li>
              <li><Link href="/events" className="hover:text-ink">Events</Link></li>
              <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-head text-lg">Get Involved</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-2">
              <li><Link href="/membership" className="hover:text-ink">Membership</Link></li>
              <li><Link href="/gallery" className="hover:text-ink">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
              <li><a href="#" className="hover:text-ink">Volunteer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-head text-lg">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-2">
              <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="inline-flex items-center hover:text-ink"><Icon.Phone /> &nbsp;{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="inline-flex items-center hover:text-ink"><Icon.Mail /> &nbsp;{SITE.email}</a></li>
              <li><span className="inline-flex items-center"><Icon.Pin /> &nbsp;Delhi · Noida · Gurgaon</span></li>
            </ul>
            <div className="mt-3.5 flex gap-2.5 text-ink-2">
              <a href="#" aria-label="WhatsApp"><Icon.Whatsapp /></a>
              <a href="#" aria-label="Instagram"><Icon.Instagram /></a>
              <a href="#" aria-label="Facebook"><Icon.Facebook /></a>
              <a href="#" aria-label="YouTube"><Icon.Youtube /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-2 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {SITE.name}. A community initiative.</span>
          <span className="font-deva">हरदोई परिवार · Built on trust, culture, and connection.</span>
        </div>
      </div>
    </footer>
  );
}
