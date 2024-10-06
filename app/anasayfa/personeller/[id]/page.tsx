import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fetchEmployeeById } from "@/lib/data"; // Assuming you've defined this
import { deleteEmployee } from "@/lib/actions"; // Import the delete action
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmployeeActions from "@/components/EmployeeActions"; // Import the client component

type Params = {
  params: {
    id: string;
  };
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

const SingleEmployeeView = async ({ params }: Params) => {
  const employee = await fetchEmployeeById(params.id);

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/anasayfa/personeller"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft />
        Geri don
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{`${employee.ad} ${employee.soyad}`}</CardTitle>
          <CardDescription>Details for {employee.ad}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Image
                src={`${employee.fotograf}`}
                alt="Employee"
                width={400}
                height={400}
              />
            </div>
            <div>
              <strong>Ad:</strong> {employee.ad}
            </div>
            <div>
              <strong>Soyad:</strong> {employee.soyad}
            </div>
            <div>
              <strong>Doğum Tarihi:</strong>{" "}
              {new Date(employee.dogumTarihi).toLocaleDateString("tr-TR")}
            </div>
            <div>
              <strong>Adres:</strong> {employee.adres}
            </div>
            <div>
              <strong>Telefon Numarası:</strong> {employee.telefonNumarasi}
            </div>
            <div>
              <strong>Medeni Durum:</strong> {employee.medeniDurum}
            </div>
            <div>
              <strong>Yeterlilikler:</strong>
              {employee.yeterlilik
                .map((value) => {
                  const option = competencyOptions.find(
                    (opt) => opt.value === value,
                  );
                  return option ? option.label : value;
                })
                .join(", ")}
            </div>
            <div>
              <strong>Evcil Hayvanla Çalışır:</strong>{" "}
              {employee.evcilHayvan ? "Evet" : "Hayır"}
            </div>
            <div>
              <strong>Uyruk:</strong> {employee.uyruk}
            </div>
            <div>
              <strong>Oturum İzni:</strong>{" "}
              {employee.oturumIzni ? "Var" : "Yok"}
            </div>
            <div>
              <strong>Seyahat Kısıtlaması:</strong>{" "}
              {employee.seyahatKisitlamasi ? "Var" : "Yok"}
            </div>
            <div>
              <strong>Çocuk Sahibi:</strong>{" "}
              {employee.cocukSahibi ? "Evet" : "Hayır"}
            </div>
            <div>
              <strong>Önceki İşverenler:</strong> {employee.oncekiIsverenler}
            </div>
            <div>
              <strong>Referanslar:</strong> {employee.referanslar}
            </div>
            <div>
              <strong>Kilo:</strong> {employee.kilo} kg
            </div>
            <div>
              <strong>Notlar:</strong> {employee.notlar}
            </div>

            {/* Client component for actions like PDF generation and deleting the employee */}
            <EmployeeActions
              employee={employee}
              competencyOptions={competencyOptions}
              deleteEmployee={deleteEmployee} // Pass the delete action
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployeeView;
