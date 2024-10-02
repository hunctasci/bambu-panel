"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { EmployerType } from "@/lib/types"; // Assuming you have this type defined

type EmployerActionsProps = {
  employer: EmployerType;
  deleteEmployer: (formData: FormData) => Promise<void>;
};

export default function EmployerActions({
  employer,
  deleteEmployer,
}: EmployerActionsProps) {
  // Function to generate the PDF
  const generatePdf = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(`${employer.ad} ${employer.soyad} - Detaylar`, 10, 10);

    // Add employer details to the PDF
    doc.setFontSize(12);
    doc.text(`Ad: ${employer.ad}`, 10, 20);
    doc.text(`Soyad: ${employer.soyad}`, 10, 30);
    doc.text(
      `Doğum Tarihi: ${new Date(employer.dogumTarihi).toLocaleDateString("tr-TR")}`,
      10,
      40,
    );
    doc.text(`Adres: ${employer.adres}`, 10, 50);
    doc.text(`Telefon Numarası: ${employer.telefonNumarasi}`, 10, 60);
    doc.text(`Yer Tipi: ${employer.yerTipi}`, 10, 70);
    doc.text(
      `Evcil Hayvan: ${employer.evcilHayvan ? "Evet" : "Hayır"}`,
      10,
      80,
    );
    doc.text(`Sağlık Durumu: ${employer.saglikDurumu}`, 10, 90);
    doc.text(`Çocuklar: ${employer.cocuklar}`, 10, 100);
    doc.text(`Kilo: ${employer.kilo} kg`, 10, 110);
    doc.text(`Notlar: ${employer.notlar}`, 10, 120);

    // Save the generated PDF
    doc.save(`${employer.ad}_${employer.soyad}_detaylar.pdf`);
  };

  // Function to handle form submission and delete the employer
  const handleDeleteEmployer = async () => {
    const formData = new FormData();
    formData.append("employerId", employer._id); // Assuming employer._id is the ID field
    await deleteEmployer(formData);
  };

  return (
    <div className="mt-10 flex gap-4">
      <Button variant="destructive" onClick={handleDeleteEmployer}>
        Müşteriyi Sil
      </Button>
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
    </div>
  );
}
