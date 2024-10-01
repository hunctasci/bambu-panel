import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fetchEmployerById } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// params types
type Params = {
  params: {
    id: string;
  };
};

const SingleEmployerView = async ({ params }: Params) => {
  const employer = await fetchEmployerById(params.id);

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/anasayfa/musteriler"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft />
        Geri don
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{`${employer.ad} ${employer.soyad}`}</CardTitle>
          <CardDescription>Details for {employer.ad}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <strong>Ad:</strong> {employer.ad}
            </div>
            <div>
              <strong>Soyad:</strong> {employer.soyad}
            </div>
            <div>
              <strong>Doğum Tarihi:</strong>{" "}
              {new Date(employer.dogumTarihi).toLocaleDateString("tr-TR")}
            </div>
            <div>
              <strong>Adres:</strong> {employer.adres}
            </div>
            <div>
              <strong>Telefon Numarası:</strong> {employer.telefonNumarasi}
            </div>
            <div>
              <strong>Yer Tipi:</strong> {employer.yerTipi}
            </div>
            <div>
              <strong>Evcil Hayvan:</strong>{" "}
              {employer.evcilHayvan ? "Evet" : "Hayır"}
            </div>
            <div>
              <strong>Sağlık Durumu:</strong> {employer.saglikDurumu}
            </div>
            <div>
              <strong>Çocuklar:</strong> {employer.cocuklar}
            </div>
            <div>
              <strong>Kilo:</strong> {employer.kilo} kg
            </div>
            <div>
              <strong>Notlar:</strong> {employer.notlar}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployerView;
