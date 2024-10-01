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
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal break-words text-center">
        {getValue()}
      </div>
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
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal break-words text-center">
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "dogumTarihi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal lg:table-cell"
      >
        Doğum Tarihi
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as Date | string;
      const date = value instanceof Date ? value : new Date(value);

      return (
        <div className="hidden whitespace-normal break-words text-center lg:table-cell">
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
        className="hidden whitespace-normal lg:table-cell"
      >
        Adres
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal break-words text-center lg:table-cell">
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "telefonNumarasi",
    header: () => (
      <div className="whitespace-normal text-left">Telefon Numarası</div>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal break-words text-center">
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "yerTipi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal lg:table-cell"
      >
        Yer Tipi
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal break-words text-center lg:table-cell">
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "evcilHayvan",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal lg:table-cell"
      >
        Evcil Hayvan
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal break-words text-center lg:table-cell">
        {getValue() ? "Evet" : "Hayır"}
      </div>
    ),
  },
  {
    accessorKey: "saglikDurumu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal lg:table-cell"
      >
        Sağlık Durumu
      </Button>
    ),
    cell: ({ getValue }) => {
      const condition = getValue() as string | undefined;
      return (
        <div className="hidden whitespace-normal break-words text-center lg:table-cell">
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
        className="hidden whitespace-normal lg:table-cell"
      >
        Çocuklar
      </Button>
    ),
    cell: ({ getValue }) => {
      const children = getValue() as
        | { yas: number; sayi: number }[]
        | undefined;
      return (
        <div className="hidden whitespace-normal break-words text-center lg:table-cell">
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
        className="hidden whitespace-normal lg:table-cell"
      >
        Kilo (kg)
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal break-words text-center lg:table-cell">
        {getValue<number>()}
      </div>
    ),
  },
  {
    accessorKey: "notlar",
    header: () => (
      <div className="hidden whitespace-normal text-left lg:table-cell">
        Notlar
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal break-words text-center lg:table-cell">
        {getValue<string>()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employerId = row.original._id;

      return (
        <div className="text-center">
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
        </div>
      );
    },
  },
];
