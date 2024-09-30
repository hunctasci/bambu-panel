import mongoose, { Schema, Document } from "mongoose";

const EmployerSchema = new Schema(
  {
    ad: { type: String, required: true }, // Name
    soyad: { type: String, required: true }, // Surname
    dogumTarihi: { type: Date, required: true }, // Date of Birth
    adres: { type: String, required: true }, // Address
    telefonNumarasi: { type: String, required: true }, // Telephone Number
    yerTipi: {
      type: String,
      enum: ["Müstakil", "Dublex", "Normal Daire"], // Place Type
      required: true,
    },
    evcilHayvan: { type: Boolean, default: false }, // Has Pets
    saglikDurumu: { type: String }, // Health Condition
    cocuklar: { type: String }, // Children
    kilo: { type: Number }, // Weight
    notlar: { type: String }, // Notes
  },
  { timestamps: true },
);

const Employer =
  mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);
export default Employer;
