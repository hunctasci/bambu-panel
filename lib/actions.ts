"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import Employer from "@/app/models/employer";
import { redirect } from "next/navigation";
import Employee from "@/app/models/employee";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const addEmployer = async (formData: FormData) => {
  try {
    // Connect to the database
    connectToDB();

    // Extract and process form data
    const data = Object.fromEntries(formData);

    // Create a new employer document with the provided form data
    const newEmployer = new Employer({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate as string),
      address: data.address,
      phoneNumber: data.phoneNumber,
      placeType: data.placeType,
      hasPets: data.hasPets === "true",
      healthCondition: data.healthCondition,
      hasChildren: data.hasChildren,
      weight: data.weight ? parseFloat(data.weight as string) : undefined,
      notes: data.notes,
    });

    // Save the new employer document to the database
    await newEmployer.save();

    console.log("Employer created successfully:", newEmployer);

    // Revalidate and redirect
  } catch (err) {
    console.error("Error creating employer:", err);

    // Check if the error is a redirect
    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      // This is not an error, but an expected redirect. Re-throw it.
      throw err;
    } else {
      // This is an actual error
      throw new Error("Failed to create employer!");
    }
  }
  revalidatePath("/dashboard/employers");
  redirect("/dashboard/employers");
};

export async function updateEmployer(formData: FormData) {
  console.log("updateEmployer function called");
  console.log("Received formData:", Object.fromEntries(formData));

  const id = formData.get("id") as string;
  console.log("Employer ID:", id);

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  // Remove the id from the data object
  delete data.id;

  console.log("Data to update:", data);

  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedEmployer) {
      throw new Error("Employer not found");
    }

    console.log("Update successful:", updatedEmployer);
  } catch (error) {
    console.error("Failed to update employer:", error);
    // Instead of console.log, throw an error to be caught by the client
    throw new Error("Failed to update employer");
  }
  revalidatePath("/dashboard/employers");
  redirect("/dashboard/employers");
}

export const deleteEmployer = async (formData: FormData) => {
  const employerId = formData.get("employerId") as string;

  try {
    // Connect to the database
    await connectToDB();

    // Find and delete the employer by ID
    const deletedEmployer = await Employer.findByIdAndDelete(employerId);

    if (!deletedEmployer) {
      throw new Error("Employer not found");
    }

    console.log("Employer deleted successfully:", deletedEmployer);
  } catch (err) {
    console.error("Error deleting employer:", err);

    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err;
    } else {
      throw new Error("Failed to delete employer!");
    }
  }
  // Revalidate and redirect
  revalidatePath("/dashboard/employers");
  redirect("/dashboard/employers");
};

export const addEmployee = async (formData: FormData) => {
  await connectToDB();
  try {
    // Connect to the database
    console.log("Connecting to DB...");
    console.log("Connected to DB");

    // Extract and process form data
    const data = Object.fromEntries(formData.entries());
    console.log("Form data extracted:", data);

    const file = formData.get("photo") as File;
    let photoPath = null;

    if (file && file.name) {
      console.log("File found:", file.name);
      const fileBuffer = await file.arrayBuffer();
      console.log("File buffer created");

      // Create a unique filename
      const uniqueFilename = `${uuidv4()}_${file.name}`;
      console.log(uniqueFilename);
      const relativePath = `/uploads/${uniqueFilename}`;
      console.log(relativePath);
      const absolutePath = path.join(process.cwd(), "public", relativePath);
      console.log("absolutePath", absolutePath);

      // Ensure the uploads directory exists
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });
      console.log("Directory created or already exists");

      // Write the file
      await fs.appendFile(absolutePath, Buffer.from(fileBuffer));
      console.log("File saved at:", absolutePath);

      photoPath = relativePath;
    } else {
      console.log("No photo file found, skipping upload process");
    }

    // Create a new employee document
    const newEmployee = new Employee({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate as string),
      competencies: formData.getAll("competencies"),
      address: data.address,
      phoneNumber: data.phoneNumber,
      maritalStatus: data.maritalStatus,
      hasChildren: data.hasChildren === "on",
      previousEmployers: data.previousEmployers,
      references: data.references,
      worksWithPets: data.worksWithPets === "on",
      nationality: data.nationality,
      residencyPermit: data.residencyPermit === "on",
      travelRestriction: data.travelRestriction === "on",
      notes: data.notes,
      photo: photoPath, // Add the photo path to the employee document
    });

    // Save the new employee document to the database
    console.log("Saving employee to DB...");
    await newEmployee.save();

    console.log("Employee created successfully:", newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    throw new Error("Failed to create employee!");
  }
  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};

export async function updateEmployee(formData: FormData) {
  const id = formData.get("id") as string;

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  // Remove the id from the data object
  delete data.id;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedEmployee) {
      throw new Error("Employee not found");
    }

    console.log({ success: true, employee: updatedEmployee });
  } catch (error) {
    console.error("Failed to update employee:", error);
    console.log({ success: false, error: "Failed to update employee" });
  }
  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
}

export const deleteEmployee = async (formData: FormData) => {
  try {
    // Extract employeeId from FormData
    const employeeId = formData.get("employeeId") as string;
    console.log(employeeId);

    // Connect to the database
    await connectToDB();
    console.log("DB Connected");

    // Proceed as before...
    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    console.log(employee);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // If the employee has a photo, delete it from the filesystem
    if (employee.photo) {
      const absolutePath = path.join(process.cwd(), "public", employee.photo);
      try {
        await fs.unlink(absolutePath);
        console.log("Employee photo deleted:", absolutePath);
      } catch (fileErr) {
        console.error("Error deleting employee photo:", fileErr);
        // Optionally handle file deletion error
      }
    }

    // Delete the employee from the database
    await Employee.findByIdAndDelete(employeeId);

    console.log("Employee deleted successfully:", employee);

    // Revalidate and redirect
  } catch (err) {
    console.error("Error deleting employee:", err);
  }
  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};
