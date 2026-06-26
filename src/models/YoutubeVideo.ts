import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const YoutubeVideoSchema = new Schema(
  {
    title: { type: String, required: true },
    thumb: String,
    duration: String,
    views: String,
    time: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IYoutubeVideo = InferSchemaType<typeof YoutubeVideoSchema> & { _id: mongoose.Types.ObjectId };

export const YoutubeVideo: Model<IYoutubeVideo> =
  mongoose.models.YoutubeVideo ?? mongoose.model<IYoutubeVideo>('YoutubeVideo', YoutubeVideoSchema);
