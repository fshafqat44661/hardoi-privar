import Purpose from '@/components/home/Purpose';
import JoinBand from '@/components/home/JoinBand';
import PageHeader from '@/components/layout/PageHeader';
import { getMembershipBenefits, getPurposeCards } from '@/lib/services/content.service';

export const metadata = { title: 'Purpose' };

export default async function PurposePage() {
  const [cards, benefits] = await Promise.all([getPurposeCards(), getMembershipBenefits()]);

  return (
    <>
      <PageHeader
        eyebrow="Our Purpose"
        title={
          <>
            Five commitments <i>we live by.</i>
          </>
        }
        hindi="सेवा · संस्कृति · संगठन"
        sub="These aren't slogans. They are the reason our parivar exists — and the standard we hold ourselves to every year."
        bannerImg="/assets/IMG-20260409-WA0001.jpg.jpeg"
        bannerColor="marigold"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Purpose' }]}
      />
      <Purpose cards={cards} showHead={false} />
      <JoinBand benefits={benefits} />
    </>
  );
}
