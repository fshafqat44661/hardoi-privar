import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const GalleryItemSchema = new Schema(
  {
    media: { type: String, enum: ['saffron', 'maroon', 'cream', 'sky', 'marigold'], default: 'saffron' },
    t: { type: String, required: true },
    m: String,
    img: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IGalleryItem = InferSchemaType<typeof GalleryItemSchema> & { _id: mongoose.Types.ObjectId };

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ?? mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
