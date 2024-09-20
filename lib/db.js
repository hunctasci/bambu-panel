import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
  } catch (error) {
    console.log(error.message);
    throw new Error("Connection failed!");
  }
}

export default connectToDB;
