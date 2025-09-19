import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || "rhisprism"

if (!MONGODB_URI) {
  console.warn("MONGODB_URI not found in environment variables. Using mock data.")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise && MONGODB_URI) {
    client = new MongoClient(MONGODB_URI)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise || Promise.reject(new Error("MongoDB URI not configured"))
} else {
  // In production mode, it's best to not use a global variable.
  if (MONGODB_URI) {
    client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
  } else {
    clientPromise = Promise.reject(new Error("MongoDB URI not configured"))
  }
}

export async function getDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MongoDB not configured")
  }

  try {
    const client = await clientPromise
    return client.db(MONGODB_DB)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export function isDatabaseAvailable(): boolean {
  return !!MONGODB_URI
}

export default clientPromise
