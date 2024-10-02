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
      ad: data.ad,
      soyad: data.soyad,
      dogumTarihi: new Date(data.dogumTarihi as string),
      adres: data.adres,
      telefonNumarasi: data.telefonNumarasi,
      yerTipi: data.yerTipi,
      evcilHayvan: data.evcilHayvan === "true",
      saglikDurumu: data.saglikDurumu,
      cocuklar: data.cocuklar,
      kilo: data.kilo ? parseFloat(data.kilo as string) : undefined,
      notlar: data.notlar,
    });

    // Save the new employer document to the database
    await newEmployer.save();

    console.log("Employer created successfully:", newEmployer);

    // Revalidate and redirect
    revalidatePath("/anasayfa/musteriler");
    redirect("/anasayfa/musteriler");
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
};

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

    // Revalidate and redirect
    revalidatePath("/anasayfa/musteriler");
    redirect("/anasayfa/musteriler");
  } catch (err) {
    console.error("Error deleting employer:", err);

    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err;
    } else {
      throw new Error("Failed to delete employer!");
    }
  }
};

export const addEmployee = async (formData: FormData) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract and process form data
    const data = Object.fromEntries(formData.entries());

    // Handle file upload
    let fotografPath = "";
    const file = formData.get("fotograf") as File;
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a unique filename
      const filename = `${uuidv4()}_${file.name}`;
      const relativePath = `/uploads/${filename}`;
      const absolutePath = path.join(process.cwd(), "public", relativePath);

      // Ensure the uploads directory exists
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });

      // Write the file
      await fs.writeFile(absolutePath, buffer);
      fotografPath = `${relativePath}`;

      console.log("File saved at:", absolutePath);
    }

    // Create a new employee document
    const newEmployee = new Employee({
      ad: data.ad,
      soyad: data.soyad,
      dogumTarihi: new Date(data.dogumTarihi as string),
      yeterlilik: formData.getAll("yeterlilik"),
      adres: data.adres,
      telefonNumarasi: data.telefonNumarasi,
      medeniDurum: data.medeniDurum,
      cocukSahibi: data.cocukSahibi === "on",
      oncekiIsverenler: data.oncekiIsverenler,
      referanslar: data.referanslar,
      evcilHayvan: data.evcilHayvan === "on",
      uyruk: data.uyruk,
      oturumIzni: data.oturumIzni === "on",
      seyahatKisitlamasi: data.seyahatKisitlamasi === "on",
      notlar: data.notlar,
      fotograf: fotografPath, // Add the photo path to the employee document
    });

    // Save the new employee document to the database
    await newEmployee.save();

    console.log("Employee created successfully:", newEmployee);

    // Revalidate and redirect
    revalidatePath("/anasayfa/personeller");
    redirect("/anasayfa/personeller");
  } catch (err) {
    console.error("Error creating employee:", err);

    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err;
    } else {
      throw new Error("Failed to create employee!");
    }
  }
};

export const deleteEmployee = async (formData: FormData) => {
  try {
    // Extract employeeId from FormData
    const employeeId = formData.get("employeeId") as string;

    // Connect to the database
    await connectToDB();

    // Proceed as before...
    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // If the employee has a photo, delete it from the filesystem
    if (employee.fotograf) {
      const absolutePath = path.join(
        process.cwd(),
        "public",
        employee.fotograf,
      );
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
    revalidatePath("/anasayfa/personeller");
    redirect("/anasayfa/personeller");
  } catch (err) {
    console.error("Error deleting employee:", err);

    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err;
    } else {
      throw new Error("Failed to delete employee!");
    }
  }
};
