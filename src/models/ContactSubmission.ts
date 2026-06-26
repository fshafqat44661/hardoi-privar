import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const ContactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    topic: { type: String, default: 'General' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true },
);

export type IContactSubmission = InferSchemaType<typeof ContactSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ??
  mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);
