import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const clientPromise = client.connect();

export default clientPromise;
