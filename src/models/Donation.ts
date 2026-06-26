import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const DonationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'INR' },
    purpose: { type: String, default: 'General Fund' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
  },
  { timestamps: true },
);

export type IDonation = InferSchemaType<typeof DonationSchema> & { _id: mongoose.Types.ObjectId };

export const Donation: Model<IDonation> =
  mongoose.models.Donation ?? mongoose.model<IDonation>('Donation', DonationSchema);
