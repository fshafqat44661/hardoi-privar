import { connectDB } from '@/lib/db/connect';
import {
  getStaticContactInfo,
  getStaticEventBySlug,
  getStaticEvents,
  getStaticFacebookPosts,
  getStaticGalleryItems,
  getStaticMembershipBenefits,
  getStaticPurposeCards,
  getStaticTimeline,
  getStaticYoutubeVideos,
} from '@/lib/data/static-content';
import {
  mapBlogPost,
  mapContactInfo,
  mapEvent,
  mapFacebookPost,
  mapGalleryItem,
  mapPurposeCard,
  mapTimelineEntry,
  mapYoutubeVideo,
} from '@/lib/mappers';
import { BlogPost } from '@/models/BlogPost';
import { ContactInfo } from '@/models/ContactInfo';
import { Event } from '@/models/Event';
import { FacebookPost } from '@/models/FacebookPost';
import { GalleryItem } from '@/models/GalleryItem';
import { MembershipBenefit } from '@/models/MembershipBenefit';
import { PurposeCard } from '@/models/PurposeCard';
import { TimelineEntry } from '@/models/TimelineEntry';
import { YoutubeVideo } from '@/models/YoutubeVideo';
import type { BlogPostDTO } from '@/types';

async function withDb<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.MONGODB_URI) return fallback;

  try {
    return await read();
  } catch (err) {
    console.error('[content] MongoDB read failed, using static fallback:', err);
    return fallback;
  }
}

/** Server-side data access — used by RSC pages and API routes */
export async function getEvents(limit?: number) {
  return withDb(async () => {
    await connectDB();
    const query = Event.find().sort({ sortOrder: 1, createdAt: -1 });
    if (limit) query.limit(limit);
    const docs = await query.lean();
    return docs.map((d) => mapEvent(d as never));
  }, getStaticEvents(limit));
}

export async function getEventBySlug(slug: string) {
  return withDb(async () => {
    await connectDB();
    const doc = await Event.findOne({ slug }).lean();
    return doc ? mapEvent(doc as never) : null;
  }, getStaticEventBySlug(slug));
}

export async function getGalleryItems() {
  return withDb(async () => {
    await connectDB();
    const docs = await GalleryItem.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapGalleryItem(d as never));
  }, getStaticGalleryItems());
}

export async function getPurposeCards() {
  return withDb(async () => {
    await connectDB();
    const docs = await PurposeCard.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapPurposeCard(d as never));
  }, getStaticPurposeCards());
}

export async function getTimeline() {
  return withDb(async () => {
    await connectDB();
    const docs = await TimelineEntry.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapTimelineEntry(d as never));
  }, getStaticTimeline());
}

export async function getFacebookPosts() {
  return withDb(async () => {
    await connectDB();
    const docs = await FacebookPost.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapFacebookPost(d as never));
  }, getStaticFacebookPosts());
}

export async function getYoutubeVideos() {
  return withDb(async () => {
    await connectDB();
    const docs = await YoutubeVideo.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapYoutubeVideo(d as never));
  }, getStaticYoutubeVideos());
}

export async function getContactInfo() {
  return withDb(async () => {
    await connectDB();
    const docs = await ContactInfo.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => mapContactInfo(d as never));
  }, getStaticContactInfo());
}

export async function getMembershipBenefits() {
  return withDb(async () => {
    await connectDB();
    const docs = await MembershipBenefit.find().sort({ sortOrder: 1 }).lean();
    return docs.map((d) => String(d.text));
  }, getStaticMembershipBenefits());
}

export async function getBlogs(limit?: number): Promise<BlogPostDTO[]> {
  return withDb(async () => {
    await connectDB();
    const query = BlogPost.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 });
    if (limit) query.limit(limit);
    const docs = await query.lean();
    return docs.map((d) => mapBlogPost(d as never));
  }, []);
}

export async function getBlogBySlug(slug: string): Promise<BlogPostDTO | null> {
  return withDb(async () => {
    await connectDB();
    const doc = await BlogPost.findOne({ slug, published: true }).lean();
    return doc ? mapBlogPost(doc as never) : null;
  }, null);
}
