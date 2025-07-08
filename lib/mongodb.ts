import { MongoClient, type Db } from "mongodb"

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    // Return a placeholder URI for build time - actual connection will be handled at runtime
    return "mongodb://localhost:27017"
  }
  return uri
}

function createClient(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    // Return a rejected promise that will be handled gracefully
    return Promise.reject(new Error("MongoDB URI not configured"))
  }

  const uri = process.env.MONGODB_URI
  const options = {}

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    return globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
    return clientPromise
  }
}

export default function getClientPromise(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = createClient()
  }
  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  try {
    const client = await getClientPromise()
    return client.db("rhisprism")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Database connection failed")
  }
}

export function isDatabaseAvailable(): boolean {
  return !!process.env.MONGODB_URI
}
