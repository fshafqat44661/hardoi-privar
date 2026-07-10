import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';
import { BLOG_CATEGORIES } from '@/types';

const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImage: String,
    category: {
      type: String,
      enum: BLOG_CATEGORIES,
      default: 'Blogs',
      index: true,
    },
    author: { type: String, default: 'Hardoi Parivar NCR' },
    published: { type: Boolean, default: false, index: true },
    publishedAt: Date,
  },
  { timestamps: true },
);

export type IBlogPost = InferSchemaType<typeof BlogPostSchema> & { _id: mongoose.Types.ObjectId };

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
