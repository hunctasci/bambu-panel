import mongoose, { Schema, Document } from "mongoose";

export interface EmployerType extends Document {
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: string;
  telephoneNumber: string;
  placeType: 'Müstakil' | 'Dublex' | 'Normal Daire';
  hasPets: boolean;
  healthCondition: { condition: string };
  children: { age: number; count: number }[];
  weight: number;
  notes: string;
}

const EmployerSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    telephoneNumber: { type: String, required: true },
    placeType: { type: String, enum: ['Müstakil', 'Dublex', 'Normal Daire'], required: true },
    hasPets: { type: Boolean, default: false },
    healthCondition: { condition: String },
    children: [{ age: Number, count: Number }],
    weight: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

const Employer = mongoose.models.Employer || mongoose.model<EmployerType>("Employer", EmployerSchema);
export default Employer;
