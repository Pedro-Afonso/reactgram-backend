import mongoose from "mongoose";
import "dotenv/config";

const dbUri = process.env.DB_MONGO_URI;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(dbUri);
    console.log("Database connection successful!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

export { conn };
