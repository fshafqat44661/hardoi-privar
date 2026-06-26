import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const TimelineEntrySchema = new Schema(
  {
    y: { type: String, required: true },
    t: { type: String, required: true },
    d: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ITimelineEntry = InferSchemaType<typeof TimelineEntrySchema> & { _id: mongoose.Types.ObjectId };

export const TimelineEntry: Model<ITimelineEntry> =
  mongoose.models.TimelineEntry ?? mongoose.model<ITimelineEntry>('TimelineEntry', TimelineEntrySchema);
