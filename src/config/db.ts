import mongoose from "mongoose";
import "dotenv/config";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const getUriByEnv = () => {
  if (process.env.NODE_ENV === "test") {
    //console.log(globalThis.__MONGO_URI__);
    return globalThis.__MONGO_URI__;
  }
  const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wbryvtq.mongodb.net/?retryWrites=true&w=majority`;
  return uri;
};

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(getUriByEnv());
    //console.log("Database connection successful!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

export { conn };
