import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "", {
        dbName: process.env.MONGODB_DB_NAME || "Promptopedia",
      });
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(`Error connecting to mongo DB, ${err}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Retrying...");
      await connectToDb();
    }
  }
};
