import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const MembershipSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, default: 'Delhi' },
    status: { type: String, enum: ['pending', 'contacted', 'approved'], default: 'pending' },
  },
  { timestamps: true },
);

export type IMembershipSubmission = InferSchemaType<typeof MembershipSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MembershipSubmission: Model<IMembershipSubmission> =
  mongoose.models.MembershipSubmission ??
  mongoose.model<IMembershipSubmission>('MembershipSubmission', MembershipSubmissionSchema);
