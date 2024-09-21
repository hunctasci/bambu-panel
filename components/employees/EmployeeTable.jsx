import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { fetchEmployees } from "@/lib/data";
import Link from "next/link";

export default async function EmployeeTable({ limit, title }) {
  const employees = await fetchEmployees();

  // Sort employees in dec order based on  created date
  const sortedEmployees = [...employees].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Filter employees based on limit
  const filteredEmployees = limit
    ? sortedEmployees.slice(0, limit)
    : sortedEmployees;

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
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.surname}</TableCell>
              <TableCell>
                {new Date(employee.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>{employee.competence}</TableCell>
              <TableCell>
                <Link
                  href={`/employees/edit/${employee._id}`}
                  className="rounded bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
