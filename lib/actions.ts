"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import Employer from "@/app/models/employer";
import { redirect } from "next/navigation";
import Employee from "@/app/models/employee";

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

export const addEmployee = async (formData: FormData) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract and process form data
    const data = Object.fromEntries(formData.entries());

    // Process boolean values and multiple selections
    const newEmployee = new Employee({
      ad: data.ad,
      soyad: data.soyad,
      dogumTarihi: new Date(data.dogumTarihi as string), // Ensure date is correctly parsed
      yeterlilik: formData.getAll("yeterlilik"), // Get all selected competencies
      adres: data.adres,
      telefonNumarasi: data.telefonNumarasi,
      medeniDurum: data.medeniDurum,
      cocukSahibi: data.cocukSahibi === "on", // Handle boolean checkbox for 'cocukSahibi'
      oncekiIsverenler: data.oncekiIsverenler,
      referanslar: data.referanslar,
      evcilHayvan: data.evcilHayvan === "on", // Handle boolean checkbox for 'evcilHayvan'
      uyruk: data.uyruk,
      oturumIzni: data.oturumIzni === "on", // Handle boolean checkbox for 'oturumIzni'
      seyahatKisitlamasi: data.seyahatKisitlamasi === "on", // Handle boolean checkbox for 'seyahatKisitlamasi'
      notlar: data.notlar,
    });

    // Save the new employee document to the database
    await newEmployee.save();

    console.log("Employee created successfully:", newEmployee);

    // Revalidate and redirect
    revalidatePath("/anasayfa/personeller");
    redirect("/anasayfa/personeller");
  } catch (err) {
    console.error("Error creating employee:", err);

    // Check if the error is a redirect
    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      // This is not an error, but an expected redirect. Re-throw it.
      throw err;
    } else {
      // This is an actual error
      throw new Error("Failed to create employee!");
    }
  }
};
