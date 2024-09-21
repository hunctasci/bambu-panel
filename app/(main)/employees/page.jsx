import EmployeeTable from "@/components/employees/EmployeeTable";
import BackButton from "@/components/BackButton";
import EmployeesPagination from "@/components/employees/EmployeePagination";

export default function EmployeesPage() {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <EmployeeTable />
      <EmployeesPagination />
    </>
  );
}
