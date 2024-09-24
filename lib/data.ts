import Employer from "@/app/models/employer";
import { connectToDB } from "./utils";

export const fetchEmployers = async () => {
  try {
    connectToDB();
    const employers = await Employer.find().lean();
    return JSON.parse(JSON.stringify(employers));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};
