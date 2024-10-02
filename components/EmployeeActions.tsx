"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { EmployeeType } from "@/lib/types"; // Assuming this is the employee type interface

type EmployeeActionsProps = {
  employee: EmployeeType;
  competencyOptions: { value: string; label: string }[];
  deleteEmployee: () => void;
};

export default function EmployeeActions({
  employee,
  competencyOptions,
  deleteEmployee,
}: EmployeeActionsProps) {
  const getCompetencyLabel = (value: string): string => {
    const option = competencyOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // Helper function to fetch image and convert it to base64
  const convertImageToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  // Function to generate the PDF
  const generatePdf = async () => {
    const doc = new jsPDF();

    // Add the title
    doc.setFontSize(18);
    doc.text(`${employee.ad} ${employee.soyad} - Detayları`, 10, 10);

    // Add employee data to the PDF
    doc.setFontSize(12);
    doc.text(`Ad: ${employee.ad}`, 10, 20);
    doc.text(`Soyad: ${employee.soyad}`, 10, 30);
    doc.text(
      `Doğum Tarihi: ${new Date(employee.dogumTarihi).toLocaleDateString("tr-TR")}`,
      10,
      40,
    );
    doc.text(`Adres: ${employee.adres}`, 10, 50);
    doc.text(`Telefon Numarası: ${employee.telefonNumarasi}`, 10, 60);
    doc.text(`Medeni Durum: ${employee.medeniDurum}`, 10, 70);
    doc.text(
      `Yeterlilikler: ${employee.yeterlilik
        .map(getCompetencyLabel)
        .join(", ")}`,
      10,
      80,
    );
    doc.text(
      `Evcil Hayvanla Çalışır: ${employee.evcilHayvan ? "Evet" : "Hayır"}`,
      10,
      90,
    );
    doc.text(`Uyruk: ${employee.uyruk}`, 10, 100);
    doc.text(`Oturum İzni: ${employee.oturumIzni ? "Var" : "Yok"}`, 10, 110);
    doc.text(
      `Seyahat Kısıtlaması: ${employee.seyahatKisitlamasi ? "Var" : "Yok"}`,
      10,
      120,
    );
    doc.text(
      `Çocuk Sahibi: ${employee.cocukSahibi ? "Evet" : "Hayır"}`,
      10,
      130,
    );
    doc.text(`Önceki İşverenler: ${employee.oncekiIsverenler}`, 10, 140);
    doc.text(`Referanslar: ${employee.referanslar}`, 10, 150);
    doc.text(`Kilo: ${employee.kilo} kg`, 10, 160);
    doc.text(`Notlar: ${employee.notlar}`, 10, 170);

    // Add the employee's photo to the PDF (if available)
    if (employee.fotograf) {
      const imageBase64 = await convertImageToBase64(employee.fotograf);
      doc.addImage(imageBase64, "JPEG", 150, 10, 40, 40); // x, y, width, height
    }

    // Save the generated PDF
    doc.save(`${employee.ad}_${employee.soyad}_detaylar.pdf`);
  };

  return (
    <div className="mt-10 flex gap-4">
      <form action={deleteEmployee}>
        <input type="hidden" name="employeeId" value={employee._id} />
        <Button variant="destructive">Çalışanı Sil</Button>
      </form>
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
    </div>
  );
}
