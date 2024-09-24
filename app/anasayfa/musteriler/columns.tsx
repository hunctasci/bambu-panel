"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the Zod schema for Employer data
export type Employer = {
  name: string;
  surname: string;
  dateOfBirth: string; // Consider using Date if you want to handle date as Date object
  address: string;
  telephoneNumber: string;
  placeType: "Müstakil" | "Dublex" | "Normal Daire";
  hasPets: boolean;
  healthCondition: {
    condition: string;
  };
  children: {
    age: number;
    count: number;
  }[];
  weight: number;
  notes: string;
};

export const columns: ColumnDef<Employer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(), // Formatting date
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "telephoneNumber",
    header: "Telephone",
  },
  {
    accessorKey: "placeType",
    header: "Place Type",
  },
  {
    accessorKey: "hasPets",
    header: "Has Pets",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"), // Format boolean
  },
  {
    accessorKey: "healthCondition.condition",
    header: "Health Condition",
  },
  {
    accessorKey: "children",
    header: "Children",
    cell: ({ getValue }) => {
      const children = getValue() as { age: number; count: number }[];
      return children.length
        ? children
            .map(
              (child, index) =>
                `Child ${index + 1}: Age ${child.age}, Count ${child.count}`,
            )
            .join(", ")
        : "No children";
    },
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
