import connectToDB from "@/lib/db";
import Employee from "@/app/models/employee";

export const fetchEmployees = async () => {
  await connectToDB(); // Await the connection
  try {
    const employees = await Employee.find();
    console.log(employees);
    return employees;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch employees"); // Optional: throw an error for further handling
  }
};
