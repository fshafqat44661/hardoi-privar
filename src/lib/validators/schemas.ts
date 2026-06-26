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
  author: z.string().optional(),
  published: z.boolean().optional(),
});
