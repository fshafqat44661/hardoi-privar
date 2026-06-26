import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const EventSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    tag: String,
    cat: { type: String, required: true, index: true },
    d: String,
    m: String,
    media: { type: String, enum: ['saffron', 'maroon', 'cream', 'sky', 'marigold'], default: 'saffron' },
    t: { type: String, required: true },
    meta: String,
    cat2: String,
    desc: String,
    img: String,
    venue: String,
    time: String,
    organizer: String,
    phone: String,
    details: String,
    gallery: [String],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type IEvent = InferSchemaType<typeof EventSchema> & { _id: mongoose.Types.ObjectId };

export const Event: Model<IEvent> =
  mongoose.models.Event ?? mongoose.model<IEvent>('Event', EventSchema);
