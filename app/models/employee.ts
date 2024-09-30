import mongoose, { Schema, Document } from "mongoose";

export interface EmployeeType extends Document {
  ad: string; // Name
  soyad: string; // Surname
  dogumTarihi: Date; // Date of Birth
  yeterlilik: (
    | "evIsiElemanlari"
    | "hastaBakimi"
    | "yasliBakimi"
    | "bebekBakimi"
    | "yatalakBakan"
    | "alzheimerBakan"
    | "dadiYeniDogan"
    | "cocukBakimi"
    | "asci"
    | "sofor"
    | "oyunAblasi"
  )[]; // Competence
  adres: string; // Address
  telefonNumarasi: string; // Telephone Number
  medeniDurum: "Evli" | "Bekar"; // Marital Status
  cocukSahibi: boolean; // Has Children
  oncekiIsverenler: string; // Previous Employers
  referanslar: string; // References
  evcilHayvan: boolean; // Works With Pets
  uyruk: string; // Nationality
  oturumIzni: boolean; // Residency Permit
  seyahatKisitlamasi: boolean; // Travel Restriction
  notlar: string; // Notes
}

const EmployeeSchema = new Schema(
  {
    ad: { type: String, required: true }, // Name
    soyad: { type: String, required: true }, // Surname
    dogumTarihi: { type: Date, required: true }, // Date of Birth
    yeterlilik: {
      type: [String],
      enum: [
        "evIsiElemanlari",
        "hastaBakimi",
        "yasliBakimi",
        "bebekBakimi",
        "yatalakBakan",
        "alzheimerBakan",
        "dadiYeniDogan",
        "cocukBakimi",
        "asci",
        "sofor",
        "oyunAblasi",
      ], // Competence
      required: true,
    },
    adres: { type: String, required: true }, // Address
    telefonNumarasi: { type: String, required: true }, // Telephone Number
    medeniDurum: { type: String, enum: ["Evli", "Bekar"] }, // Marital Status
    cocukSahibi: { type: Boolean, default: false }, // Has Children
    oncekiIsverenler: { type: String }, // Previous Employers
    referanslar: { type: String }, // References
    evcilHayvan: { type: Boolean }, // Works With Pets
    uyruk: { type: String }, // Nationality
    oturumIzni: { type: Boolean }, // Residency Permit
    seyahatKisitlamasi: { type: Boolean }, // Travel Restriction
    notlar: { type: String }, // Notes
  },
  { timestamps: true },
);

const Employee =
  mongoose.models.Employee ||
  mongoose.model<EmployeeType>("Employee", EmployeeSchema);

export default Employee;
