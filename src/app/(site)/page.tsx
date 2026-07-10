import Hero from '@/components/home/Hero';
import Strip from '@/components/home/Strip';
import About from '@/components/home/About';
import Purpose from '@/components/home/Purpose';
import EventsSection from '@/components/home/EventsSection';
import BlogSection from '@/components/home/BlogSection';
import SocialSection from '@/components/home/SocialSection';
import JoinBand from '@/components/home/JoinBand';
import Stats from '@/components/home/Stats';
import GalleryPreview from '@/components/home/GalleryPreview';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import {
  getBlogs,
  getEvents,
  getFacebookPosts,
  getGalleryItems,
  getMembershipBenefits,
  getPurposeCards,
} from '@/lib/services/content.service';

export default async function HomePage() {
  const [events, blogs, purposeCards, fbPosts, galleryItems, benefits] = await Promise.all([
    getEvents(),
    getBlogs(5),
    getPurposeCards(),
    getFacebookPosts(),
    getGalleryItems(),
    getMembershipBenefits(),
  ]);

  return (
    <>
      <Hero />
      <Strip />
      <About />
      <Purpose cards={purposeCards} />
      <EventsSection initialEvents={events} limit={5} />
      <BlogSection posts={blogs} limit={5} />
      <JoinBand benefits={benefits} />
      <Stats />
      <GalleryPreview items={galleryItems} />
      <Testimonials />
      <SocialSection fbPosts={fbPosts} />
      <FinalCTA />
    </>
  );
}
