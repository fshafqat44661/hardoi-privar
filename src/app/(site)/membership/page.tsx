import JoinBand from '@/components/home/JoinBand';
import PageHeader from '@/components/layout/PageHeader';
import { getMembershipBenefits } from '@/lib/services/content.service';

export const metadata = { title: 'Membership' };

export default async function MembershipPage() {
  const benefits = await getMembershipBenefits();

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={
          <>
            Join a parivar of <i>1,000+ families.</i>
          </>
        }
        hindi="हमारे साथ जुड़िए।"
        sub="Membership is free and open to anyone whose family roots trace back to Hardoi district, now living across the NCR."
        bannerImg="/assets/FB_IMG_1777382231492.jpg.jpeg"
        bannerColor="sky"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Membership' }]}
      />
      <JoinBand benefits={benefits} />
    </>
  );
}
