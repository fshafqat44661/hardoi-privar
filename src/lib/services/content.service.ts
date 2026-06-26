import { connectDB } from '@/lib/db/connect';
import {
  mapContactInfo,
  mapEvent,
  mapFacebookPost,
  mapGalleryItem,
  mapPurposeCard,
  mapTimelineEntry,
  mapYoutubeVideo,
} from '@/lib/mappers';
import { ContactInfo } from '@/models/ContactInfo';
import { Event } from '@/models/Event';
import { FacebookPost } from '@/models/FacebookPost';
import { GalleryItem } from '@/models/GalleryItem';
import { MembershipBenefit } from '@/models/MembershipBenefit';
import { PurposeCard } from '@/models/PurposeCard';
import { TimelineEntry } from '@/models/TimelineEntry';
import { YoutubeVideo } from '@/models/YoutubeVideo';

/** Server-side data access — used by RSC pages and API routes */
export async function getEvents(limit?: number) {
  await connectDB();
  const query = Event.find().sort({ sortOrder: 1, createdAt: -1 });
  if (limit) query.limit(limit);
  const docs = await query.lean();
  return docs.map((d) => mapEvent(d as never));
}

export async function getEventBySlug(slug: string) {
  await connectDB();
  const doc = await Event.findOne({ slug }).lean();
  return doc ? mapEvent(doc as never) : null;
}

export async function getGalleryItems() {
  await connectDB();
  const docs = await GalleryItem.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapGalleryItem(d as never));
}

export async function getPurposeCards() {
  await connectDB();
  const docs = await PurposeCard.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapPurposeCard(d as never));
}

export async function getTimeline() {
  await connectDB();
  const docs = await TimelineEntry.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapTimelineEntry(d as never));
}

export async function getFacebookPosts() {
  await connectDB();
  const docs = await FacebookPost.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapFacebookPost(d as never));
}

export async function getYoutubeVideos() {
  await connectDB();
  const docs = await YoutubeVideo.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapYoutubeVideo(d as never));
}

export async function getContactInfo() {
  await connectDB();
  const docs = await ContactInfo.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => mapContactInfo(d as never));
}

export async function getMembershipBenefits() {
  await connectDB();
  const docs = await MembershipBenefit.find().sort({ sortOrder: 1 }).lean();
  return docs.map((d) => String(d.text));
}
