/**
 * Database seed — imports legacy JSON content + creates admin user.
 * Run: npm run seed (requires MONGODB_URI in .env.local)
 */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is required');
  process.exit(1);
}

const seedPath = resolve(process.cwd(), '../hr-project/src/data/db.json');
const data = JSON.parse(readFileSync(seedPath, 'utf-8'));

async function seed() {
  await mongoose.connect(MONGODB_URI!);

  const { User } = await import('../src/models/User');
  const { Event } = await import('../src/models/Event');
  const { GalleryItem } = await import('../src/models/GalleryItem');
  const { FacebookPost } = await import('../src/models/FacebookPost');
  const { YoutubeVideo } = await import('../src/models/YoutubeVideo');
  const { PurposeCard } = await import('../src/models/PurposeCard');
  const { TimelineEntry } = await import('../src/models/TimelineEntry');
  const { ContactInfo } = await import('../src/models/ContactInfo');
  const { MembershipBenefit } = await import('../src/models/MembershipBenefit');

  await Promise.all([
    Event.deleteMany({}),
    GalleryItem.deleteMany({}),
    FacebookPost.deleteMany({}),
    YoutubeVideo.deleteMany({}),
    PurposeCard.deleteMany({}),
    TimelineEntry.deleteMany({}),
    ContactInfo.deleteMany({}),
    MembershipBenefit.deleteMany({}),
  ]);

  await Event.insertMany(
    data.events.map((e: Record<string, unknown>, i: number) => ({
      ...e,
      sortOrder: i,
    })),
  );

  await GalleryItem.insertMany(
    data.gallery.map((g: Record<string, unknown>, i: number) => ({
      ...g,
      sortOrder: i,
    })),
  );

  await FacebookPost.insertMany(
    data.fbPosts.map((p: Record<string, unknown>, i: number) => ({
      ...p,
      sortOrder: i,
    })),
  );

  await YoutubeVideo.insertMany(
    data.youtubeVideos.map((v: Record<string, unknown>, i: number) => ({
      ...v,
      sortOrder: i,
    })),
  );

  await PurposeCard.insertMany(
    data.purposeCards.map((c: Record<string, unknown>, i: number) => ({
      ...c,
      sortOrder: i,
    })),
  );

  await TimelineEntry.insertMany(
    data.timeline.map((t: Record<string, unknown>, i: number) => ({
      ...t,
      sortOrder: i,
    })),
  );

  await ContactInfo.insertMany(
    data.contactInfo.map((c: Record<string, unknown>, i: number) => ({
      ...c,
      sortOrder: i,
    })),
  );

  await MembershipBenefit.insertMany(
    data.membershipBenefits.map((text: string, i: number) => ({
      text,
      sortOrder: i,
    })),
  );

  const email = process.env.ADMIN_EMAIL ?? 'admin@hardoiparivar.org';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@123456';
  const passwordHash = await bcrypt.hash(password, 12);

  await User.findOneAndUpdate(
    { email },
    { email, passwordHash, name: 'Site Admin', role: 'admin' },
    { upsert: true, new: true },
  );

  console.log('Seed complete.');
  console.log(`Admin: ${email} / ${password}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
