import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fetchEmployeeById } from "@/lib/data"; // Assuming you've defined this

// params types
type Params = {
  params: {
    id: string;
  };
};

const SingleEmployeeView = async ({ params }: Params) => {
  const employee = await fetchEmployeeById(params.id);

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>{`${employee.ad} ${employee.soyad}`}</CardTitle>
          <CardDescription>Details for {employee.ad}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <strong>Yeterlilikler:</strong>{" "}
              {employee.yeterlilik.map((item) => item).join(", ")}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployeeView;
