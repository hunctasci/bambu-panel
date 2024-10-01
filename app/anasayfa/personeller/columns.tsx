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

// Çalışan verileri için Zod şemasını tanımlayın
export type CalisanTipi = {
  _id: string;
  ad: string;
  soyad: string;
  dogumTarihi: Date;
  yeterlilik: string[]; // Yeterliliklerin dizisi
  adres: string;
  telefonNumarasi: string;
  medeniDurum?: "Evli" | "Bekar"; // Opsiyonel alan
  cocukVarmi?: boolean; // Opsiyonel alan
  oncekiIsler?: string; // Opsiyonel alan
  referanslar?: string; // Opsiyonel alan
  evcilHayvan?: boolean; // Opsiyonel alan
  hayvanlardanKorkma?: boolean; // Opsiyonel alan
  uyruk?: string; // Opsiyonel alan
  ikametIzin?: boolean; // Opsiyonel alan
  seyahatKisitlamasi?: boolean; // Opsiyonel alan
  notlar?: string; // Opsiyonel alan
};

const competencyOptions = [
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

const getCompetencyLabel = (value: string): string => {
  const option = competencyOptions.find((opt) => opt.value === value);

  return option ? option.label : value;
};

export const columns: ColumnDef<CalisanTipi>[] = [
  {
    accessorKey: "ad",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal break-words"
      >
        Ad
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal text-center">{getValue()}</div>
    ),
    meta: {
      className: "table-cell", // Shown on all screens
    },
  },
  {
    accessorKey: "soyad",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="whitespace-normal break-words"
      >
        Soyad
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal text-center">{getValue()}</div>
    ),
    meta: {
      className: "table-cell", // Shown on all screens
    },
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
    accessorKey: "yeterlilik",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Yeterlilik
      </Button>
    ),
    cell: ({ getValue }) => {
      const yeterlilikler = getValue<string[]>();
      return (
        <div className="hidden whitespace-normal text-left lg:table-cell">
          {yeterlilikler.map((value) => getCompetencyLabel(value)).join(", ")}
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
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Adres
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal lg:table-cell">{getValue()}</div>
    ),
  },
  {
    accessorKey: "telefonNumarasi",
    header: () => (
      <div className="whitespace-normal break-words text-left">Telefon</div>
    ),
    cell: ({ getValue }) => (
      <div className="whitespace-normal text-center">{getValue()}</div>
    ),
    meta: {
      className: "table-cell", // Shown on all screens
    },
  },
  {
    accessorKey: "medeniDurum",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Medeni Durum
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal lg:table-cell">{getValue()}</div>
    ),
  },
  {
    accessorKey: "cocukVarmi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Çocuk Varmı
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal text-left lg:table-cell">
        {getValue() ? "Evet" : "Hayır"}
      </div>
    ),
  },
  {
    accessorKey: "evcilHayvan",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Evcil Hayvan
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal text-left lg:table-cell">
        {getValue() ? "Evet" : "Hayır"}
      </div>
    ),
  },
  {
    accessorKey: "uyruk",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Uyruk
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal lg:table-cell">{getValue()}</div>
    ),
  },
  {
    accessorKey: "ikametIzin",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        İkamet İzin
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal text-left lg:table-cell">
        {getValue() ? "Evet" : "Hayır"}
      </div>
    ),
  },
  {
    accessorKey: "seyahatKisitlamasi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hidden whitespace-normal break-words lg:table-cell"
      >
        Seyahat Kısıtlaması
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="hidden whitespace-normal text-left lg:table-cell">
        {getValue() ? "Evet" : "Hayır"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employeeId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/anasayfa/personeller/${employeeId}`} passHref>
              <DropdownMenuItem>Görüntüle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: {
      className: "table-cell", // Shown on all screens
    },
  },
];
