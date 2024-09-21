import connectToDB from "@/lib/db";
import Employee from "@/app/models/employee";
import mongoose from "mongoose";

export const fetchEmployees = async () => {
  await connectToDB(); // Await the connection
  try {
    const employees = await Employee.find();
    return employees;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch employees"); // Optional: throw an error for further handling
  }
};

// export const fetchEmployee = async (id) => {
//   await connectToDB(); // Await the connection
//   try {
//     const employee = await Employee.findOne({
//       _id: new mongoose.Types.ObjectId({ id }),
//     });
//     return employee;
//   } catch (error) {
//     console.log(error.message);
//     throw new Error("Failed to fetch employee"); // Optional: throw an error for further handling
//   }
// };
