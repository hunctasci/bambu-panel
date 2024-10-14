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

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    console.error("Failed to connect to MongoDB", error);
  }
};
