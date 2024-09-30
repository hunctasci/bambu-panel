"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type EmployerType = {
  _id: string;
  ad: string; // Name
  soyad: string; // Surname
  dogumTarihi: Date; // Date of Birth
  adres: string; // Address
  telefonNumarasi: string; // Telephone Number
  yerTipi: "Müstakil" | "Dublex" | "Normal Daire"; // Place Type
  evcilHayvan: boolean; // Has Pets
  saglikDurumu?: string; // Health condition (optional)
  cocuklar?: string; // Optional array to indicate no children
  kilo?: number; // Weight
  notlar?: string; // Notes
};

export const columns: ColumnDef<EmployerType>[] = [
  {
    accessorKey: "ad",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Ad
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "soyad",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Soyad
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "dogumTarihi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Doğum Tarihi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as Date | string;

      // Convert value to Date object and format it in Turkish locale
      const date = value instanceof Date ? value : new Date(value);

      // Check if the date is valid before formatting
      return (
        <div className="text-left">
          {!isNaN(date.getTime())
            ? date.toLocaleDateString("tr-TR")
            : "Invalid Date"}
        </div>
      );
    },
  },

  {
    accessorKey: "adres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Adres
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "telefonNumarasi",
    header: () => (
      <div className="whitespace-normal text-left">Telefon Numarası</div>
    ),
  },
  {
    accessorKey: "yerTipi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Yer Tipi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "evcilHayvan",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Evcil Hayvan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() ? "Evet" : "Hayır"}</div>
    ),
  },
  {
    accessorKey: "saglikDurumu", // Accessing the string directly
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Sağlık Durumu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const condition = getValue() as string | undefined;
      return (
        <div className="text-left">
          {condition ? condition : "Sağlık durumu yok"}
        </div>
      );
    },
  },
  {
    accessorKey: "cocuklar",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Çocuklar
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const children = getValue() as
        | { yas: number; sayi: number }[]
        | undefined;
      return (
        <div className="text-left">
          {Array.isArray(children) && children.length
            ? children
                .map(
                  (child, index) =>
                    `Çocuk ${index + 1}: Yaş ${child.yas}, Sayı ${child.sayi}`,
                )
                .join(", ")
            : "Çocuk yok"}
        </div>
      );
    },
  },
  {
    accessorKey: "kilo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal"
      >
        Kilo (kg)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<number>()}</div>
    ),
  },
  {
    accessorKey: "notlar",
    header: () => <div className="whitespace-normal text-left">Notlar</div>,
    cell: ({ getValue }) => (
      <div className="text-left">{getValue<string>()}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employerId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/anasayfa/musteriler/${employerId}`} passHref>
              <DropdownMenuItem>Görüntüle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
