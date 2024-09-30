import mongoose, { Schema, Document } from "mongoose";

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
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
