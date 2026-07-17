import Icon from '@/components/ui/Icons';
import { eventMediaClass } from '@/lib/utils/cn';
import type { FacebookPostDTO } from '@/types';

const WA_MESSAGES = [
  { day: 'Today' },
  { sys: 'Rohit Singh added Priya Verma' },
  {
    sender: 'Amit Kumar',
    color: 'c-blue',
    txt: 'Namaste parivar 🙏 Holi Milan ke registrations start ho gaye hain — link group description mein hai.',
    time: '09:42',
  },
  { sender: 'Neha Tripathi', color: 'c-purple', txt: 'Count me in with 2 guests!', time: '09:45' },
  {
    sender: 'Admin · Hardoi Parivar',
    color: 'c-maroon',
    admin: true,
    img: 'saffron',
    caption: "📸 Last year's Holi Milan highlights",
    time: '09:48',
  },
  {
    sender: 'Vikram Dubey',
    color: 'c-green',
    txt: 'Bhai mere bete ka B.Tech ho gaya — Gurgaon mein kisi ka startup ya product company mein reference ho to please DM.',
    time: '10:12',
  },
  {
    sender: 'Rohit Singh',
    color: '',
    txt: '@Vikram ji — main Paytm mein hoon, resume bhej dijiye. Bahut jagah openings hain.',
    time: '10:14',
  },
  { sys: 'Meera Awasthi left · Welfare committee updated' },
  { day: 'Yesterday' },
  {
    sender: 'Admin · Hardoi Parivar',
    color: 'c-maroon',
    admin: true,
    txt: '🚨 Urgent: Sharma family (Hardoi) needs B+ blood in Noida. Fortis Hospital. Please DM if you can help. 🙏',
    time: '18:30',
  },
  { sender: 'Priya Verma', color: '', txt: "I'm B+. Coming in 30 minutes.", time: '18:33' },
  { sender: 'Rohit Singh', color: '', txt: 'Thank you Priya ji 🙏 This is what parivar means.', time: '18:35' },
] as const;

const SENDER_COLORS: Record<string, string> = {
  'c-blue': 'text-[#1F5D82]',
  'c-green': 'text-[#1B7A3C]',
  'c-maroon': 'text-maroon',
  'c-purple': 'text-[#6B3A9B]',
};

interface SocialSectionProps {
  fbPosts: FacebookPostDTO[];
}

export default function SocialSection({ fbPosts }: SocialSectionProps) {
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
            The real conversations — announcements, photos, job referrals, welfare alerts — happen on our Facebook page and
            WhatsApp groups. Jump in.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          <FacebookFeed posts={fbPosts} />
          <WhatsAppFeed />
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(24,119,242,.28)] sm:w-auto sm:px-6 sm:text-[15px]"
          >
            <Icon.Facebook /> Visit Facebook Page
          </a>
          <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(37,211,102,.28)] sm:w-auto sm:px-6 sm:text-[15px]"
          >
            <Icon.Whatsapp /> Join WhatsApp Community
          </a>
        </div>
      </div>
    </section>
  );
}

function FacebookFeed({ posts }: { posts: FacebookPostDTO[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="flex items-center gap-3 border-b border-line px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-[18px]">
        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1877F2] sm:h-11 sm:w-11">
          <img src="/assets/logo.png" alt="" className="h-full w-full bg-white object-contain p-1" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 truncate text-[14px] font-semibold sm:text-[15px]">
            Hardoi Parivar NCR
            <span className="text-[#1877F2]" title="Verified">
              ✓
            </span>
          </div>
          <div className="truncate text-[11px] text-ink-2 sm:text-xs">2,340 followers · Community organisation</div>
        </div>
        <button type="button" className="shrink-0 rounded-lg bg-[#1877F2] px-3 py-1.5 text-[12px] font-semibold text-white sm:px-3.5 sm:text-[13px]">
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
            <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-xs text-ink-2">
              <div className="flex items-center gap-2">
                <span>{post.emojis.join(' ')}</span>
                <span>{post.likes}</span>
              </div>
              <span>
                {post.comments} comments · {post.shares} shares
              </span>
            </div>
            <div className="mt-2 flex justify-around border-t border-line pt-1 text-[13px] font-semibold text-ink-2">
              <button type="button" className="rounded-md px-2 py-1 hover:bg-cream">
                👍 Like
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-cream">
                💬 Comment
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-cream">
                ↗ Share
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function WhatsAppFeed() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="flex items-center gap-3 border-b border-line px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-[18px]">
        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#25D366] sm:h-11 sm:w-11">
          <img src="/assets/logo.png" alt="" className="h-full w-full bg-white object-contain p-1" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-semibold sm:text-[15px]">Hardoi Parivar · NCR</div>
          <div className="truncate text-[11px] text-ink-2 sm:text-xs">🟢 247 members · 12 online</div>
        </div>
        <button type="button" className="shrink-0 rounded-lg bg-[#25D366] px-3 py-1.5 text-[12px] font-semibold text-white sm:px-3.5 sm:text-[13px]">
          Join
        </button>
      </div>

      <div className="max-h-[540px] overflow-y-auto bg-[#EDE4D2] px-3.5 pb-3.5 [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,.015)_0_1px,transparent_1px_22px)]">
        {WA_MESSAGES.map((m, i) => {
          if ('day' in m) {
            return (
              <div key={i} className="sticky top-0 z-[1] py-2.5 text-center">
                <span className="rounded-lg bg-white/80 px-3 py-1 text-[11px] font-medium text-ink-2 shadow-sm">
                  {m.day}
                </span>
              </div>
            );
          }
          if ('sys' in m) {
            return (
              <div key={i} className="mx-auto my-2.5 max-w-[90%] text-center">
                <div className="rounded-lg bg-[#FFF7D6]/95 px-3 py-2 text-xs text-ink-2 shadow-sm">{m.sys}</div>
              </div>
            );
          }

          const isAdmin = 'admin' in m && m.admin;
          const senderColor = m.color ? SENDER_COLORS[m.color] ?? 'text-primary' : 'text-primary';

          return (
            <div key={i} className={`my-2 flex max-w-[82%] flex-col ${isAdmin ? 'ml-auto items-end' : ''}`}>
              <div
                className={`rounded-lg px-2.5 pb-1.5 pt-2 text-sm leading-snug text-ink shadow-[0_1px_0.5px_rgba(0,0,0,.13)] ${
                  isAdmin ? 'bg-[#D9FDD3]' : 'bg-white'
                }`}
              >
                <div className={`mb-0.5 text-xs font-semibold ${isAdmin ? 'text-[#1B7A3C]' : senderColor}`}>
                  {m.sender}
                </div>
                {'img' in m && m.img && (
                  <div className={`-mx-1.5 mb-1.5 aspect-[4/3] overflow-hidden rounded-md ${eventMediaClass[m.img]}`} />
                )}
                {'caption' in m && m.caption && <div className="mb-1 text-[13px]">{m.caption}</div>}
                {'txt' in m && m.txt && <div>{m.txt}</div>}
                <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-black/45">
                  {m.time}
                  {isAdmin && (
                    <svg width="14" height="10" viewBox="0 0 16 10" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1 5l3 3 6-7M6 8l3-3" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 border-t border-black/5 bg-[#F0F0F0] px-3.5 py-3">
        <div className="flex-1 rounded-[20px] bg-white px-3.5 py-2.5 text-[13px] text-ink-2">Only admins can send messages</div>
        <button
          type="button"
          className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#25D366] text-white"
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
