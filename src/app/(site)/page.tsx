import Hero from '@/components/home/Hero';
import Strip from '@/components/home/Strip';
import About from '@/components/home/About';
import Purpose from '@/components/home/Purpose';
import EventsSection from '@/components/home/EventsSection';
import SocialSection from '@/components/home/SocialSection';
import JoinBand from '@/components/home/JoinBand';
import {
  getEvents,
  getFacebookPosts,
  getMembershipBenefits,
  getPurposeCards,
  getYoutubeVideos,
} from '@/lib/services/content.service';

export default async function HomePage() {
  const [events, purposeCards, fbPosts, youtubeVideos, benefits] = await Promise.all([
    getEvents(),
    getPurposeCards(),
    getFacebookPosts(),
    getYoutubeVideos(),
    getMembershipBenefits(),
  ]);

  return (
    <>
      <Hero />
      <Strip />
      <About />
      <Purpose cards={purposeCards} />
      <EventsSection initialEvents={events} limit={5} />
      <SocialSection fbPosts={fbPosts} youtubeVideos={youtubeVideos} />
      <JoinBand benefits={benefits} />
    </>
  );
}
