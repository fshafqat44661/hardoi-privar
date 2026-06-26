import mongoose from 'mongoose';

let warned = false;

/** Cached MongoDB connection for Next.js server handlers */
export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (!warned) {
      console.warn('[db] MONGODB_URI is not set — database calls will fail');
      warned = true;
    }
    throw new Error('MONGODB_URI is not configured');
  }

  interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }

  const g = global as typeof globalThis & { mongooseCache?: MongooseCache };
  const cached: MongooseCache = g.mongooseCache ?? { conn: null, promise: null };
  if (!g.mongooseCache) g.mongooseCache = cached;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
