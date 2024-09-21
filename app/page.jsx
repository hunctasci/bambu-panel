import DashboardCard from "@/components/dashboard/DashboardCard";
import EmployeeTable from "@/components/employees/EmployeeTable";
import { Users, BriefcaseBusiness } from "lucide-react";
import { fetchEmployees } from "@/lib/data";

export default function Home() {
  fetchEmployees();
  return (
    <>
      <div className="mb-5 flex flex-col justify-between gap-5 md:flex-row">
        <DashboardCard
          title="Employees"
          count={100}
          icon={<Users className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Employers"
          count={12}
          icon={<BriefcaseBusiness className="text-slate-500" size={72} />}
        />
      </div>
      <EmployeeTable title="Latest Employees" limit={5} />
    </>
  );
}
