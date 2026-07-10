import type { Document, Types } from 'mongoose';
import type {
  BlogPostDTO,
  ContactInfoDTO,
  DonationDTO,
  EventDTO,
  FacebookPostDTO,
  GalleryItemDTO,
  PurposeCardDTO,
  TimelineEntryDTO,
  YoutubeVideoDTO,
} from '@/types';

export function idOf(doc: { _id: Types.ObjectId | string }): string {
  return String(doc._id);
}

export function mapEvent(doc: Document & Record<string, unknown>): EventDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    slug: String(doc.slug),
    tag: String(doc.tag ?? ''),
    cat: String(doc.cat ?? ''),
    d: String(doc.d ?? ''),
    m: String(doc.m ?? ''),
    media: doc.media as EventDTO['media'],
    t: String(doc.t ?? ''),
    meta: String(doc.meta ?? ''),
    cat2: doc.cat2 ? String(doc.cat2) : undefined,
    desc: String(doc.desc ?? ''),
    img: String(doc.img ?? ''),
    venue: String(doc.venue ?? ''),
    time: String(doc.time ?? ''),
    organizer: String(doc.organizer ?? ''),
    phone: String(doc.phone ?? ''),
    details: String(doc.details ?? ''),
    gallery: Array.isArray(doc.gallery) ? doc.gallery.map(String) : [],
  };
}

export function mapGalleryItem(doc: Document & Record<string, unknown>): GalleryItemDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    media: doc.media as GalleryItemDTO['media'],
    t: String(doc.t ?? ''),
    m: String(doc.m ?? ''),
    img: String(doc.img ?? ''),
  };
}

export function mapFacebookPost(doc: Document & Record<string, unknown>): FacebookPostDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    a: String(doc.a ?? 'HP'),
    time: String(doc.time ?? ''),
    txt: String(doc.txt ?? ''),
    media: doc.media as FacebookPostDTO['media'],
    img: String(doc.img ?? ''),
    likes: Number(doc.likes ?? 0),
    comments: Number(doc.comments ?? 0),
    shares: Number(doc.shares ?? 0),
    emojis: Array.isArray(doc.emojis) ? doc.emojis.map(String) : [],
  };
}

export function mapYoutubeVideo(doc: Document & Record<string, unknown>): YoutubeVideoDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    title: String(doc.title ?? ''),
    thumb: String(doc.thumb ?? ''),
    duration: String(doc.duration ?? ''),
    views: String(doc.views ?? ''),
    time: String(doc.time ?? ''),
  };
}

export function mapPurposeCard(doc: Document & Record<string, unknown>): PurposeCardDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    icon: doc.icon as PurposeCardDTO['icon'],
    tone: (doc.tone ?? '') as PurposeCardDTO['tone'],
    t: String(doc.t ?? ''),
    d: String(doc.d ?? ''),
  };
}

export function mapTimelineEntry(doc: Document & Record<string, unknown>): TimelineEntryDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    y: String(doc.y ?? ''),
    t: String(doc.t ?? ''),
    d: String(doc.d ?? ''),
  };
}

export function mapContactInfo(doc: Document & Record<string, unknown>): ContactInfoDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    icon: doc.icon as ContactInfoDTO['icon'],
    l: String(doc.l ?? ''),
    v: String(doc.v ?? ''),
    s: String(doc.s ?? ''),
  };
}

export function mapDonation(doc: Document & Record<string, unknown>): DonationDTO {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    name: String(doc.name ?? ''),
    email: doc.email ? String(doc.email) : undefined,
    phone: String(doc.phone ?? ''),
    amount: Number(doc.amount ?? 0),
    currency: String(doc.currency ?? 'INR'),
    purpose: String(doc.purpose ?? ''),
    message: doc.message ? String(doc.message) : undefined,
    status: doc.status as DonationDTO['status'],
    createdAt: new Date(String(doc.createdAt)).toISOString(),
  };
}

export function mapBlogPost(doc: Document & Record<string, unknown>): BlogPostDTO {
  const category = String(doc.category ?? 'Blogs');
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    slug: String(doc.slug),
    title: String(doc.title ?? ''),
    excerpt: String(doc.excerpt ?? ''),
    content: String(doc.content ?? ''),
    coverImage: doc.coverImage ? String(doc.coverImage) : undefined,
    category: (['Events', 'News', 'Stories', 'Blogs'].includes(category)
      ? category
      : 'Blogs') as BlogPostDTO['category'],
    author: String(doc.author ?? ''),
    published: Boolean(doc.published),
    publishedAt: doc.publishedAt ? new Date(String(doc.publishedAt)).toISOString() : undefined,
    createdAt: new Date(String(doc.createdAt)).toISOString(),
    updatedAt: doc.updatedAt ? new Date(String(doc.updatedAt)).toISOString() : undefined,
  };
}

export function mapMembershipSubmission(doc: Document & Record<string, unknown>) {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    name: String(doc.name ?? ''),
    phone: String(doc.phone ?? ''),
    city: String(doc.city ?? ''),
    status: doc.status as 'pending' | 'contacted' | 'approved',
    createdAt: new Date(String(doc.createdAt)).toISOString(),
  };
}

export function mapContactSubmission(doc: Document & Record<string, unknown>) {
  return {
    id: idOf(doc as { _id: Types.ObjectId }),
    name: String(doc.name ?? ''),
    email: doc.email ? String(doc.email) : undefined,
    phone: String(doc.phone ?? ''),
    topic: String(doc.topic ?? ''),
    message: String(doc.message ?? ''),
    status: doc.status as 'new' | 'read' | 'replied',
    createdAt: new Date(String(doc.createdAt)).toISOString(),
  };
}
