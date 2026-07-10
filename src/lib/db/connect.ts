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

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Another request is already connecting — wait for it (do not disconnect mid-flight)
  if (cached.promise) {
    return cached.promise;
  }

  // Stale socket from a prior failed or dropped connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect().catch(() => undefined);
    cached.conn = null;
  }

  cached.promise = mongoose
    .connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
    })
    .then((conn) => {
      cached.conn = conn;
      return conn;
    })
    .catch((err) => {
      cached.promise = null;
      cached.conn = null;
      throw err;
    });

  return cached.promise;
}
