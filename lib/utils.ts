import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDB = async () => {
  const connection: { isConnected?: number } = {};

  try {
    if (connection.isConnected) return;

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error(
        "MongoDB connection URI is missing in the environment variables.",
      );
    }

    const db = await mongoose.connect(mongoUri);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    console.error("Failed to connect to MongoDB", error);
  }
};
