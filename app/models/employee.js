import mongoose from "mongoose";

// Define the Employee Schema
const EmployeeSchema = new mongoose.Schema(
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
    competence: {
      type: [String],
      enum: [
        "evIsiElemanlari",
        "hastaBakimi",
        "yasliBakimi",
        "bebekBakimi",
        "yatalakBakan",
        "ayzaymerBakan",
        "dadiYeniDogan",
        "cocukBakimi",
        "asci",
        "sofor",
        "oyunAblasi",
      ],
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
    maritalStatus: {
      type: String,
      enum: ["Evli", "Bekar"], // Marital status options
    },
    hasChildren: {
      type: Boolean, // Whether the employee has children or not
      default: false,
    },
    previousEmployers: {
      type: String, // Previous employers or places of work (not a reference)
    },
    references: {
      type: String, // Reference information
    },
    worksWithPets: {
      type: Boolean, // Whether the employee is willing to work with pets
    },
    afraidOfAnimals: {
      type: Boolean, // Whether the employee is afraid of animals
    },
    nationality: {
      type: String, // Employee's nationality
    },
    residencyPermit: {
      type: Boolean, // Whether the employee has a residency permit
    },
    travelRestriction: {
      type: Boolean, // Whether the employee has travel restrictions
    },
    notes: {
      type: String, // Additional notes
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt fields

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
