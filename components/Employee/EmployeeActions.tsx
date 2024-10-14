"use client";

import { Button } from "@/components/ui/button";
import { EmployeeType } from "@/lib/types";
import { deleteEmployee } from "@/lib/actions";
import Link from "next/link";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import the fonts for utf-8 support

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type EmployeeActionsProps = {
  employee: EmployeeType;
  competencyOptions: { value: string; label: string }[];
  deleteEmployee: (formData: FormData) => Promise<never>;
};

export default function EmployeeActions({
  employee,
  competencyOptions,
}: EmployeeActionsProps) {
  const getCompetencyLabel = (value: string): string => {
    const option = competencyOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const convertImageToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  const generatePdf = async () => {
    const docDefinition: any = {
      content: [
        {
          text: `${employee.firstName} ${employee.lastName} - Detayları`,
          style: "header",
        },
        { text: `Ad: ${employee.firstName}` },
        { text: `Soyad: ${employee.lastName}` },
        {
          text: `Doğum Tarihi: ${new Date(employee.birthDate).toLocaleDateString("tr-TR")}`,
        },
        { text: `Adres: ${employee.address}` },
        { text: `Telefon Numarası: ${employee.phoneNumber}` },
        { text: `Medeni Durum: ${employee.maritalStatus}` },
        {
          text: `Yeterlilikler: ${employee.competencies.map(getCompetencyLabel).join(", ")}`,
        },
        {
          text: `Evcil Hayvanla Çalışır: ${employee.worksWithPets ? "Evet" : "Hayır"}`,
        },
        { text: `Uyruk: ${employee.nationality}` },
        { text: `Oturum İzni: ${employee.residencyPermit ? "Var" : "Yok"}` },
        {
          text: `Seyahat Kısıtlaması: ${employee.travelRestriction ? "Var" : "Yok"}`,
        },
        { text: `Çocuk Sahibi: ${employee.hasChildren ? "Evet" : "Hayır"}` },
        { text: `Önceki İşverenler: ${employee.previousEmployers}` },
        { text: `Referanslar: ${employee.references}` },
        { text: `Notlar: ${employee.notes}` },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    // If there's an employee photo, add it to the PDF
    if (employee.photo) {
      const imageBase64 = await convertImageToBase64(employee.photo);
      docDefinition.content.push({
        image: imageBase64,
        width: 150,
        height: 150,
      });
    }

    pdfMake
      .createPdf(docDefinition)
      .download(`${employee.firstName}_${employee.lastName}_detaylar.pdf`);
  };

  const handleDeleteEmployee = async () => {
    if (!employee._id) {
      console.error("Employer ID is undefined");
      return; // Exit if employer ID is not available
    }

    const formData = new FormData();
    formData.append("employeeId", employee._id); // Assuming employer._id is the ID field
    await deleteEmployee(formData);
  };

  return (
    <div className="mt-10 flex flex-col space-y-5">
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
      <Button asChild>
        <Link href={`/dashboard/employees/${employee._id}/edit`}>
          Personeli Düzenle
        </Link>
      </Button>
      <Button variant="destructive" onClick={handleDeleteEmployee}>
        Personeli Sil
      </Button>
    </div>
  );
}
