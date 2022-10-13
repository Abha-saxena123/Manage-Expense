import { Db, MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://AbhaSaxena:b5qzh0aCWfq1yiOK@cluster0.stxt2.mongodb.net";
const MONGODB_DB = "expense";

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;
  return {
    client: cachedClient,
    db: cachedDb,
  };
}
