import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";

export default function EmployeeTable({ limit, title }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">
        {title ? title : "Employees"}
      </h3>
      <Table>
        <TableCaption>A list of recent Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Competence</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}
