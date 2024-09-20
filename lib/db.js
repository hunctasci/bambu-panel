import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    const connection = await mongoose.connect("mongodb://db:27017/bambuApp");
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
