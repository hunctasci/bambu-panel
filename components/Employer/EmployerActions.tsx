"use client";

import { Button } from "@/components/ui/button";
import { EmployerType } from "@/lib/types";
import Link from "next/link";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import the fonts for utf-8 support

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type EmployerActionsProps = {
  employer: EmployerType;
  deleteEmployer: (formData: FormData) => Promise<void>;
};

export default function EmployerActions({
  employer,
  deleteEmployer,
}: EmployerActionsProps) {
  // Function to generate the PDF using pdfMake
  const generatePdf = () => {
    const docDefinition: any = {
      content: [
        {
          text: `${employer.firstName} ${employer.lastName} - Detaylar`,
          style: "header",
        },
        { text: `Ad: ${employer.firstName}` },
        { text: `Soyad: ${employer.lastName}` },
        {
          text: `Doğum Tarihi: ${new Date(
            employer.birthDate,
          ).toLocaleDateString("tr-TR")}`,
        },
        { text: `Adres: ${employer.address}` },
        { text: `Telefon Numarası: ${employer.phoneNumber}` },
        { text: `Yer Tipi: ${employer.placeType}` },
        { text: `Evcil Hayvan: ${employer.hasPets ? "Evet" : "Hayır"}` },
        { text: `Sağlık Durumu: ${employer.healthCondition}` },
        { text: `Çocuklar: ${employer.children}` },
        { text: `Kilo: ${employer.weight} kg` },
        { text: `Notlar: ${employer.notes}` },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${employer.firstName}_${employer.lastName}_detaylar.pdf`);
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
