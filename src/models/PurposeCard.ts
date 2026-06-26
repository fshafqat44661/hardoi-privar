import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const PurposeCardSchema = new Schema(
  {
    icon: { type: String, enum: ['Hand', 'Diya', 'Network', 'Heart', 'Tree'], required: true },
    tone: { type: String, default: '' },
    t: { type: String, required: true },
    d: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IPurposeCard = InferSchemaType<typeof PurposeCardSchema> & { _id: mongoose.Types.ObjectId };

export const PurposeCard: Model<IPurposeCard> =
  mongoose.models.PurposeCard ?? mongoose.model<IPurposeCard>('PurposeCard', PurposeCardSchema);
