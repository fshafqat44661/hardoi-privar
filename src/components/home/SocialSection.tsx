import Icon from '@/components/ui/Icons';
import { eventMediaClass } from '@/lib/utils/cn';
import type { FacebookPostDTO, YoutubeVideoDTO } from '@/types';

interface SocialSectionProps {
  fbPosts: FacebookPostDTO[];
  youtubeVideos: YoutubeVideoDTO[];
}

export default function SocialSection({ fbPosts, youtubeVideos }: SocialSectionProps) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Stay Connected</span>
            <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
              Follow the parivar,
              <br />
              every day.
            </h2>
          </div>
          <p className="max-w-[46ch] text-base text-ink-2">
            Event highlights, cultural moments and community stories — follow us on Facebook and YouTube to stay in the loop.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          <FacebookFeed posts={fbPosts} />
          <YouTubeFeed videos={youtubeVideos} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(24,119,242,.28)]"
          >
            <Icon.Facebook /> Visit Facebook Page
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(255,0,0,.22)]"
          >
            <Icon.Youtube /> Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function FacebookFeed({ posts }: { posts: FacebookPostDTO[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="flex items-center gap-3.5 border-b border-line px-5 py-[18px]">
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1877F2]">
          <img src="/assets/logo.png" alt="" className="h-full w-full bg-white object-contain p-1" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[15px] font-semibold">
            Hardoi Parivar NCR
            <span className="text-[#1877F2]" title="Verified">✓</span>
          </div>
          <div className="text-xs text-ink-2">2,340 followers · Community organisation</div>
        </div>
        <button type="button" className="rounded-lg bg-[#1877F2] px-3.5 py-1.5 text-[13px] font-semibold text-white">
          Follow
        </button>
      </div>
      <div className="max-h-[540px] overflow-y-auto">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-line px-5 py-4 last:border-b-0">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-marigold to-primary text-[13px] font-semibold text-white">
                {post.a}
              </div>
              <div>
                <div className="text-[13px] font-semibold">Hardoi Parivar NCR</div>
                <div className="text-[11px] text-ink-2">{post.time}</div>
              </div>
            </div>
            <p className="mb-3 text-sm leading-snug">{post.txt}</p>
            <div className={`relative aspect-[16/10] overflow-hidden rounded-[10px] ${eventMediaClass[post.media]}`}>
              {post.img && <img src={post.img} alt="" className="absolute inset-0 h-full w-full object-cover" />}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-ink-2">
              <div className="flex items-center gap-2">
                <span>{post.emojis.join(' ')}</span>
                <span>{post.likes}</span>
              </div>
              <span>
                {post.comments} comments · {post.shares} shares
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function YouTubeFeed({ videos }: { videos: YoutubeVideoDTO[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="flex items-center gap-3.5 border-b border-line px-5 py-[18px]">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FF0000] text-white">
          <Icon.Youtube />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold">Hardoi Parivar NCR</div>
          <div className="text-xs text-ink-2">{videos.length} videos · Community channel</div>
        </div>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#FF0000] px-3.5 py-1.5 text-[13px] font-semibold text-white">
          Subscribe
        </a>
      </div>
      <div className="divide-y divide-line">
        {videos.map((video) => (
          <div key={video.id} className="flex gap-3.5 px-5 py-4">
            <div className="relative w-[140px] shrink-0">
              <img src={video.thumb} alt={video.title} className="aspect-video w-full rounded-[10px] object-cover" />
              <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white">
                {video.duration}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold leading-snug">{video.title}</h4>
              <p className="mt-1 text-xs text-ink-2">
                {video.views} views · {video.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
