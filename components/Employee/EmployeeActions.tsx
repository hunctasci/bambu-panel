"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { EmployeeType } from "@/lib/types";
import { deleteEmployee } from "@/lib/actions";
import Link from "next/link";

type EmployeeActionsProps = {
  employee: EmployeeType;
  competencyOptions: { value: string; label: string }[];
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
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${employee.firstName} ${employee.lastName} - Detayları`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Ad: ${employee.firstName}`, 10, 20);
    doc.text(`Soyad: ${employee.lastName}`, 10, 30);
    doc.text(
      `Doğum Tarihi: ${new Date(employee.birthDate).toLocaleDateString("tr-TR")}`,
      10,
      40,
    );
    doc.text(`Adres: ${employee.address}`, 10, 50);
    doc.text(`Telefon Numarası: ${employee.phoneNumber}`, 10, 60);
    doc.text(`Medeni Durum: ${employee.maritalStatus}`, 10, 70);
    doc.text(
      `Yeterlilikler: ${employee.competencies
        .map(getCompetencyLabel)
        .join(", ")}`,
      10,
      80,
    );
    doc.text(
      `Evcil Hayvanla Çalışır: ${employee.worksWithPets ? "Evet" : "Hayır"}`,
      10,
      90,
    );
    doc.text(`Uyruk: ${employee.nationality}`, 10, 100);
    doc.text(
      `Oturum İzni: ${employee.residencyPermit ? "Var" : "Yok"}`,
      10,
      110,
    );
    doc.text(
      `Seyahat Kısıtlaması: ${employee.travelRestriction ? "Var" : "Yok"}`,
      10,
      120,
    );
    doc.text(
      `Çocuk Sahibi: ${employee.hasChildren ? "Evet" : "Hayır"}`,
      10,
      130,
    );
    doc.text(`Önceki İşverenler: ${employee.previousEmployers}`, 10, 140);
    doc.text(`Referanslar: ${employee.references}`, 10, 150);
    doc.text(`Notlar: ${employee.notes}`, 10, 170);

    if (employee.photo) {
      const imageBase64 = await convertImageToBase64(employee.photo);
      doc.addImage(imageBase64, "JPEG", 150, 10, 40, 40); // x, y, width, height
    }

    doc.save(`${employee.firstName}_${employee.lastName}_detaylar.pdf`);
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
