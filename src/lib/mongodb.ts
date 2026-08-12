import { MongoClient, type Db } from "mongodb";

interface CachedConnection {
  client: MongoClient;
  db: Db;
}

let cached: CachedConnection | null = null;

export async function connectToDatabase(): Promise<CachedConnection> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (cached) {
    return cached;
  }

  const dbName = process.env.MONGODB_DB || "geez_admin";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  cached = { client, db };
  return cached;
}
