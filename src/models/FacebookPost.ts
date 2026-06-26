import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const FacebookPostSchema = new Schema(
  {
    a: { type: String, default: 'HP' },
    time: String,
    txt: String,
    media: { type: String, default: 'saffron' },
    img: String,
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    emojis: [String],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IFacebookPost = InferSchemaType<typeof FacebookPostSchema> & { _id: mongoose.Types.ObjectId };

export const FacebookPost: Model<IFacebookPost> =
  mongoose.models.FacebookPost ?? mongoose.model<IFacebookPost>('FacebookPost', FacebookPostSchema);
