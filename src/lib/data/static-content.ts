import db from '@/data/db.json';
import type {
  ContactInfoDTO,
  EventDTO,
  FacebookPostDTO,
  GalleryItemDTO,
  PurposeCardDTO,
  TimelineEntryDTO,
  YoutubeVideoDTO,
} from '@/types';

const events: EventDTO[] = db.events.map((e) => ({
  id: String(e.id),
  slug: e.slug,
  tag: e.tag,
  cat: e.cat,
  d: e.d,
  m: e.m,
  media: e.media as EventDTO['media'],
  t: e.t,
  meta: e.meta,
  cat2: e.cat2,
  desc: e.desc,
  img: e.img,
  venue: e.venue,
  time: e.time,
  organizer: e.organizer,
  phone: e.phone,
  details: e.details,
  gallery: e.gallery,
}));

const gallery: GalleryItemDTO[] = db.gallery.map((g) => ({
  id: String(g.id),
  media: g.media as GalleryItemDTO['media'],
  t: g.t,
  m: g.m,
  img: g.img,
}));

const fbPosts: FacebookPostDTO[] = db.fbPosts.map((p) => ({
  id: String(p.id),
  a: p.a,
  time: p.time,
  txt: p.txt,
  media: p.media as FacebookPostDTO['media'],
  img: p.img,
  likes: p.likes,
  comments: p.comments,
  shares: p.shares,
  emojis: p.emojis,
}));

const youtubeVideos: YoutubeVideoDTO[] = db.youtubeVideos.map((v) => ({
  id: String(v.id),
  title: v.title,
  thumb: v.thumb,
  duration: v.duration,
  views: v.views,
  time: v.time,
}));

const purposeCards: PurposeCardDTO[] = db.purposeCards.map((c) => ({
  id: String(c.id),
  icon: c.icon as PurposeCardDTO['icon'],
  tone: c.tone as PurposeCardDTO['tone'],
  t: c.t,
  d: c.d,
}));

const timeline: TimelineEntryDTO[] = db.timeline.map((t, i) => ({
  id: t.y || String(i),
  y: t.y,
  t: t.t,
  d: t.d,
}));

const contactInfo: ContactInfoDTO[] = db.contactInfo.map((c, i) => ({
  id: String(i),
  icon: c.icon as ContactInfoDTO['icon'],
  l: c.l,
  v: c.v,
  s: c.s,
}));

export function getStaticEvents(limit?: number): EventDTO[] {
  return limit ? events.slice(0, limit) : events;
}

export function getStaticEventBySlug(slug: string): EventDTO | null {
  return events.find((e) => e.slug === slug) ?? null;
}

export function getStaticGalleryItems(): GalleryItemDTO[] {
  return gallery;
}

export function getStaticPurposeCards(): PurposeCardDTO[] {
  return purposeCards;
}

export function getStaticTimeline(): TimelineEntryDTO[] {
  return timeline;
}

export function getStaticFacebookPosts(): FacebookPostDTO[] {
  return fbPosts;
}

export function getStaticYoutubeVideos(): YoutubeVideoDTO[] {
  return youtubeVideos;
}

export function getStaticContactInfo(): ContactInfoDTO[] {
  return contactInfo;
}

export function getStaticMembershipBenefits(): string[] {
  return db.membershipBenefits;
}
