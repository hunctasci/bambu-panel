import mongoose from "mongoose";

// Define the Employer Schema
const EmployerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    telephoneNumber: {
      type: String,
      required: true,
    },
    placeType: {
      type: String,
      enum: ["Müstakil", "Dublex", "Normal Daire"], // Type of residence
      required: true,
    },
    hasPets: {
      type: Boolean, // Whether the employer has pets
      default: false,
    },
    healthCondition: {
      condition: String, // Health condition of the employer
    },
    children: [
      {
        age: Number, // Age of each child
        count: Number, // Number of children
      },
    ],
    weight: {
      type: Number, // Weight of the employer (especially for health conditions)
    },
    notes: {
      type: String, // Additional notes for the employer
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt fields

const Employer = mongoose.model("Employer", EmployerSchema);

export default Employer;
