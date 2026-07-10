import BlogSection from '@/components/home/BlogSection';
import PageHeader from '@/components/layout/PageHeader';
import { getBlogs } from '@/lib/services/content.service';

export const metadata = { title: 'Blog' };

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <>
      <PageHeader
        eyebrow="Stories & Updates"
        title={
          <>
            Our community <i>gathering.</i>
          </>
        }
        hindi="कहानियाँ · समाचार · मिलन"
        sub="Events, news, stories and blogs from Hardoi Parivar NCR — moments that keep the parivar close."
        bannerImg="/assets/FB_IMG_1777382182880.jpg.jpeg"
        bannerColor="saffron"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />
      <BlogSection posts={posts} limit={50} showHead={false} />
    </>
  );
}
