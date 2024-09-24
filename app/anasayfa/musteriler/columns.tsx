"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

// Define the Zod schema for Employer data
export type EmployerType = {
  name: string;
  surname: string;
  dateOfBirth: Date; // Use Date for date handling
  address: string;
  telephoneNumber: string;
  placeType: "Müstakil" | "Dublex" | "Normal Daire";
  hasPets: boolean;
  healthCondition?: {
    // Make optional to match schema
    condition?: string | null; // Allow for null values
  } | null; // Allow healthCondition itself to be null
  children?: {
    // Make optional to match schema
    age: number;
    count: number;
  }[]; // Optional array to indicate no children
  weight?: number; // Make optional to match schema
  notes?: string; // Make optional to match schema
};

export const columns: ColumnDef<EmployerType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Surname
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date of Birth
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as Date | string;
      return (
        <div className="text-left">
          {value instanceof Date
            ? value.toLocaleDateString()
            : new Date(value).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "telephoneNumber",
    header: () => <div className="text-left">Telephone</div>,
  },
  {
    accessorKey: "placeType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Place Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "hasPets",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Has Pets
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "healthCondition.condition",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Health Condition
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const condition = getValue() as string | null | undefined;
      return (
        <div className="text-left">
          {condition ? condition : "No health condition"}
        </div>
      );
    },
  },
  {
    accessorKey: "children",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Children
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const children = getValue() as
        | { age: number; count: number }[]
        | undefined;
      return (
        <div className="text-left">
          {Array.isArray(children) && children.length
            ? children
                .map(
                  (child, index) =>
                    `Child ${index + 1}: Age ${child.age}, Count ${child.count}`,
                )
                .join(", ")
            : "No children"}
        </div>
      );
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Weight (kg)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<number>()}</div>
    ),
  },
  {
    accessorKey: "notes",
    header: () => <div className="text-left">Notes</div>,
    cell: ({ getValue }) => (
      <div className="text-left">{getValue<string>()}</div>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Goruntule</DropdownMenuItem>
            <DropdownMenuItem>Duzenle</DropdownMenuItem>
            <DropdownMenuItem>PDF&apos;ini al</DropdownMenuItem>
            <DropdownMenuItem>Sil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
