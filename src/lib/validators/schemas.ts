import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const membershipSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(10),
  city: z.string().trim().min(2),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().trim().min(10),
  topic: z.string().default('General'),
  message: z.string().optional(),
});

export const donationSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().trim().min(10),
  amount: z.number().min(1),
  purpose: z.string().default('General Fund'),
  message: z.string().optional(),
});

export const blogPostSchema = z.object({
  slug: z.string().trim().min(2),
  title: z.string().trim().min(2),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.enum(['Events', 'News', 'Stories', 'Blogs']).optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
});

export const donationStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'failed']),
});

export const membershipStatusSchema = z.object({
  status: z.enum(['pending', 'contacted', 'approved']),
});

export const contactStatusSchema = z.object({
  status: z.enum(['new', 'read', 'replied']),
});

export const eventUpdateSchema = z.object({
  tag: z.string().optional(),
  cat: z.string().optional(),
  d: z.string().optional(),
  m: z.string().optional(),
  media: z.enum(['saffron', 'maroon', 'cream', 'sky', 'marigold']).optional(),
  t: z.string().optional(),
  meta: z.string().optional(),
  cat2: z.string().optional(),
  desc: z.string().optional(),
  img: z.string().optional(),
  venue: z.string().optional(),
  time: z.string().optional(),
  organizer: z.string().optional(),
  phone: z.string().optional(),
  details: z.string().optional(),
});
