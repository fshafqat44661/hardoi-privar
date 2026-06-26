import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

/** Blog schema — routes reserved for future release */
const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImage: String,
    author: { type: String, default: 'Hardoi Parivar NCR' },
    published: { type: Boolean, default: false, index: true },
    publishedAt: Date,
  },
  { timestamps: true },
);

export type IBlogPost = InferSchemaType<typeof BlogPostSchema> & { _id: mongoose.Types.ObjectId };

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
