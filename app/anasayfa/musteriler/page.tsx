import Search from "@/app/ui/anasayfa/search/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { EmployerType, columns } from "./columns";

// import { MdEdit, MdOutlineVisibility } from "react-icons/md";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { DataTable } from "@/components/ui/data-table";
import connectToDB from "@/lib/db";

async function getData(): Promise<EmployerType[]> {
  connectToDB();
  try {
    const data = await Employer.find(); // Fetch all employers from the collection
    return data; // Return the fetched employers
  } catch (error) {
    console.error(
      `Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  }
}

export default function EmployersPage() {
  return (
    <div className="my-3">
      <div className="flex justify-between gap-2">
        <Search placeholder="Musteri Ara..." />
        <Button asChild className="w-2/6 bg-lime-500">
          <Link href="/anasayfa/musteriler/ekle">Musteri Ekle</Link>
        </Button>
      </div>
      {/* <div className="pt-3">
        <Table>
          <TableCaption>Musterilerinizin listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ad</TableHead>
              <TableHead>Soyad</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead className="hidden md:table-cell">Lokasyon</TableHead>
              <TableHead className="text-center">Aksiyonlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Hunc</TableCell>
              <TableCell>Tasci</TableCell>
              <TableCell>+905323239825</TableCell>
              <TableCell className="hidden md:table-cell">Dubleks</TableCell>
              <TableCell>
                <div>
                  <Button asChild variant="outline" className="w-1/2">
                    <Link href="/anasayfa/musteriler/ekle" className="gap-2">
                      <MdOutlineVisibility size={20} />
                      <span className="hidden md:block">Gor</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-1/2">
                    <Link href="/anasayfa/musteriler/ekle" className="gap-2">
                      <MdEdit size={20} />
                      <span className="hidden md:block">Duzenle</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
