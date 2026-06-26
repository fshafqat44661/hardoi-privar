import GalleryGrid from '@/components/gallery/GalleryGrid';
import PageHeader from '@/components/layout/PageHeader';
import { getGalleryItems } from '@/lib/services/content.service';

export const metadata = { title: 'Gallery' };

export default async function GalleryPage() {
  const tiles = await getGalleryItems();

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            Ten years <i>in pictures.</i>
          </>
        }
        hindi="यादें, जो हम सब की हैं।"
        sub="Moments from festivals, meetups and seva drives. Every face here is a part of our parivar."
        bannerImg="/assets/IMG-20260409-WA0002.jpg.jpeg"
        bannerColor="saffron"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
      <section className="py-8 md:pb-24">
        <div className="container">
          <GalleryGrid tiles={tiles} />
        </div>
      </section>
    </>
  );
}
