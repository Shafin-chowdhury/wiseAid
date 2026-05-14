import { MongoClient } from "mongodb";

// Fallback to a dummy string during the Vercel build phase if the URI isn't loaded yet
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/build_fallback_db";

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // If we already have a connection, reuse it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Safety check for your logs, but handles it gracefully without a hard crash
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is missing. Using local build-phase fallback string.");
  }

  try {
    const client = await MongoClient.connect(URI);
    const db = client.db();

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    // If it's just the Vercel build machine pre-rendering pages, let it pass silently
    if (URI.includes("build_fallback_db")) {
      return { client: {}, db: {} };
    }
    throw error;
  }
}