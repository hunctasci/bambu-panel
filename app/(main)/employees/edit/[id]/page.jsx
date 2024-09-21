import BackButton from "@/components/BackButton";
import EmployeeEditForm from "@/components/employees/EmployeeEditForm";
import { fetchEmployees } from "@/lib/data";

export default async function EmployeeEditPage({ params }) {
  const employees = await fetchEmployees();
  const employee = employees.find((employee) => employee.id === params.id);
  const plainEmployee = JSON.parse(JSON.stringify(employee));

  return (
    <>
      <BackButton text="Back to Employees" link="/employees" />
      <EmployeeEditForm employee={plainEmployee} />
    </>
  );
}
