import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const MembershipBenefitSchema = new Schema(
  {
    text: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IMembershipBenefit = InferSchemaType<typeof MembershipBenefitSchema> & { _id: mongoose.Types.ObjectId };

export const MembershipBenefit: Model<IMembershipBenefit> =
  mongoose.models.MembershipBenefit ??
  mongoose.model<IMembershipBenefit>('MembershipBenefit', MembershipBenefitSchema);
