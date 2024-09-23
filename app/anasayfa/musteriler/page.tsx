import Search from "@/app/ui/anasayfa/search/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { MdEdit, MdOutlineVisibility } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployersPage() {
  return (
    <div className="my-3">
      <div className="flex justify-between gap-2">
        <Search placeholder="Musteri Ara..." />
        <Button asChild className="w-2/6 bg-lime-500">
          <Link href="/anasayfa/musteriler/ekle">Musteri Ekle</Link>
        </Button>
      </div>
      <div className="pt-3">
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
      </div>
    </div>
  );
}
