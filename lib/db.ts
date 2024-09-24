import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    const connection = await mongoose.connect("mongodb://db:27017/bambuApp");
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      // Error has a 'message' property
      console.log(`Error: ${error.message}`);
    } else {
      // For non-Error objects or unknown errors
      console.log("An unknown error occurred during database connection.");
    }
    process.exit(1);
  }
}
