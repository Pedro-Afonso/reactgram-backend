import mongoose from "mongoose";
import { PhotoModel } from "../models/PhotoModel";
import { UserModel } from "../models/UserModel";
import { generatePasswordHash } from "../utils";

const seed = async () => {
  const users = [
    {
      name: "Jose",
      email: "jose@email.com",
      password: await generatePasswordHash("jose12345"),
    },
    {
      name: "Maria",
      email: "maria@email.com",
      password: await generatePasswordHash("maria12345"),
    },
    {
      name: "João",
      email: "joao@email.com",
      password: await generatePasswordHash("joao12345"),
    },
  ];
  return users;
};

const seedDatabase = async () => {
  const users = await seed();
  await UserModel.insertMany(users);
};

const databaseConnection = async (name: string) => {
  await mongoose.connect(`${globalThis.__MONGO_URI__}${name}`, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  });
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export { databaseConnection, clearDatabase, closeDatabase, seedDatabase };
