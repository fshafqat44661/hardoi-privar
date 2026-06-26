/** Shared domain types — kept separate from Mongoose document interfaces */

export type MediaTone = 'saffron' | 'maroon' | 'cream' | 'sky' | 'marigold';
export type BannerColor = MediaTone;

export interface EventDTO {
  id: string;
  slug: string;
  tag: string;
  cat: string;
  d: string;
  m: string;
  media: MediaTone;
  t: string;
  meta: string;
  cat2?: string;
  desc: string;
  img: string;
  venue: string;
  time: string;
  organizer: string;
  phone: string;
  details: string;
  gallery: string[];
}

export interface GalleryItemDTO {
  id: string;
  media: MediaTone;
  t: string;
  m: string;
  img: string;
}

export interface FacebookPostDTO {
  id: string;
  a: string;
  time: string;
  txt: string;
  media: MediaTone;
  img: string;
  likes: number;
  comments: number;
  shares: number;
  emojis: string[];
}

export interface YoutubeVideoDTO {
  id: string;
  title: string;
  thumb: string;
  duration: string;
  views: string;
  time: string;
}

export interface PurposeCardDTO {
  id: string;
  icon: 'Hand' | 'Diya' | 'Network' | 'Heart' | 'Tree';
  tone: '' | 'maroon' | 'marigold' | 'sky';
  t: string;
  d: string;
}

export interface TimelineEntryDTO {
  id: string;
  y: string;
  t: string;
  d: string;
}

export interface ContactInfoDTO {
  id: string;
  icon: 'Phone' | 'Whatsapp' | 'Mail' | 'Pin';
  l: string;
  v: string;
  s: string;
}

export interface DonationDTO {
  id: string;
  name: string;
  email?: string;
  phone: string;
  amount: number;
  currency: string;
  purpose: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface BlogPostDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
