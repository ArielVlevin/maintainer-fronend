import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const clientPromise = client.connect();

export default clientPromise;

/*

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) {
  throw new Error("❌ Missing MONGO_URI environment variable");
}

// ✅ שמירת החיבור הגלובלי במצב פיתוח למניעת פתיחת חיבורים כפולים
let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "MaintainerDB", // ⬅️ שנה לשם ה-DB שלך
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    isConnected = true;
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

*/
