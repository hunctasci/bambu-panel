import mongoose, { Schema, Document } from "mongoose";

// Define a type for the competency options
type CompetencyOption = {
  value: string;
  label: string;
};

// Define the competency options
const competencyOptions: CompetencyOption[] = [
  { value: "evIsiElemanlari", label: "Ev İşi Elemanları" },
  { value: "hastaBakimi", label: "Hasta Bakımı" },
  { value: "yasliBakimi", label: "Yaşlı Bakımı" },
  { value: "bebekBakimi", label: "Bebek Bakımı" },
  { value: "yatalakBakan", label: "Yatalak Hasta Bakımı" },
  { value: "alzheimerBakan", label: "Alzheimer Hasta Bakımı" },
  { value: "dadiYeniDogan", label: "Dadı (Yeni Doğan)" },
  { value: "cocukBakimi", label: "Çocuk Bakımı" },
  { value: "asci", label: "Aşçı" },
  { value: "sofor", label: "Şoför" },
  { value: "oyunAblasi", label: "Oyun Ablası" },
];

// Update the interface to match the schema
export interface EmployeeType extends Document {
  ad: string; // Name
  soyad: string; // Surname
  dogumTarihi: Date; // Date of Birth
  yeterlilik: string[]; // Competence (array of competency values)
  adres: string; // Address
  telefonNumarasi: string; // Telephone Number
  medeniDurum?: "Evli" | "Bekar"; // Marital Status
  cocukSahibi: boolean; // Has Children
  oncekiIsverenler?: string; // Previous Employers
  referanslar?: string; // References
  evcilHayvan?: boolean; // Works With Pets
  uyruk?: string; // Nationality
  oturumIzni?: boolean; // Residency Permit
  seyahatKisitlamasi?: boolean; // Travel Restriction
  notlar?: string; // Notes
  fotograf?: string; //
}

const EmployeeSchema = new Schema<EmployeeType>(
  {
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    dogumTarihi: { type: Date, required: true },
    yeterlilik: {
      type: [String],
      enum: competencyOptions.map((option) => option.value),
      required: true,
    },
    adres: { type: String, required: true },
    telefonNumarasi: { type: String, required: true },
    medeniDurum: { type: String, enum: ["Evli", "Bekar"] },
    cocukSahibi: { type: Boolean, default: false },
    oncekiIsverenler: { type: String },
    referanslar: { type: String },
    evcilHayvan: { type: Boolean },
    uyruk: { type: String },
    oturumIzni: { type: Boolean },
    seyahatKisitlamasi: { type: Boolean },
    notlar: { type: String },
    fotograf: { type: String },
  },
  { timestamps: true },
);

const Employee =
  mongoose.models.Employee ||
  mongoose.model<EmployeeType>("Employee", EmployeeSchema);

export default Employee;
