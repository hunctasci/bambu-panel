import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { fetchEmployers } from "@/lib/data";

export default async function EmployersPage() {
  const data = await fetchEmployers();

  return (
    <div className="my-3">
      <div className="flex justify-end gap-2">
        <Button asChild className="w-2/6 bg-lime-500">
          <Link href="/anasayfa/musteriler/ekle">Musteri Ekle</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
