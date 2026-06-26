import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

/** Pages load content from MongoDB at request time */
export const dynamic = 'force-dynamic';

/** Public site shell — shared header/footer across marketing pages */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
