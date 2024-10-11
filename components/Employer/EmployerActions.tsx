"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { EmployerType } from "@/lib/types";
import Link from "next/link";

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
    doc.text(`${employer.firstName} ${employer.lastName} - Detaylar`, 10, 10);

    // Add employer details to the PDF
    doc.setFontSize(12);
    doc.text(`Ad: ${employer.firstName}`, 10, 20);
    doc.text(`Soyad: ${employer.lastName}`, 10, 30);
    doc.text(
      `Doğum Tarihi: ${new Date(employer.birthDate).toLocaleDateString("tr-TR")}`,
      10,
      40,
    );
    doc.text(`Adres: ${employer.address}`, 10, 50);
    doc.text(`Telefon Numarası: ${employer.phoneNumber}`, 10, 60);
    doc.text(`Yer Tipi: ${employer.placeType}`, 10, 70);
    doc.text(`Evcil Hayvan: ${employer.hasPets ? "Evet" : "Hayır"}`, 10, 80);
    doc.text(`Sağlık Durumu: ${employer.healthCondition}`, 10, 90);
    doc.text(`Çocuklar: ${employer.children}`, 10, 100);
    doc.text(`Kilo: ${employer.weight} kg`, 10, 110);
    doc.text(`Notlar: ${employer.notes}`, 10, 120);

    // Save the generated PDF
    doc.save(`${employer.firstName}_${employer.lastName}_detaylar.pdf`);
  };

  // Function to handle form submission and delete the employer
  const handleDeleteEmployer = async () => {
    if (!employer._id) {
      console.error("Employer ID is undefined");
      return; // Exit if employer ID is not available
    }

    const formData = new FormData();
    formData.append("employerId", employer._id); // Assuming employer._id is the ID field
    await deleteEmployer(formData);
  };

  return (
    <div className="mt-10 flex flex-col space-y-5">
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
      <Button asChild>
        <Link href={`/dashboard/employers/${employer._id}/edit`}>
          Müşteriyi Düzenle
        </Link>
      </Button>
      <Button variant="destructive" onClick={handleDeleteEmployer}>
        Müşteriyi Sil
      </Button>
    </div>
  );
}
