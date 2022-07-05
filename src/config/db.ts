import mongoose from "mongoose";
import "dotenv/config";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wbryvtq.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Database connection successful!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

export = { conn };
