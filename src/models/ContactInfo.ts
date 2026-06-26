import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const ContactInfoSchema = new Schema(
  {
    icon: { type: String, enum: ['Phone', 'Whatsapp', 'Mail', 'Pin'], required: true },
    l: String,
    v: String,
    s: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IContactInfo = InferSchemaType<typeof ContactInfoSchema> & { _id: mongoose.Types.ObjectId };

export const ContactInfo: Model<IContactInfo> =
  mongoose.models.ContactInfo ?? mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);
