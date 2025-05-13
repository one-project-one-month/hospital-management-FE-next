import { Button, EnployeeTable } from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const EmployeePage = () => {
  return (
    <>
      <section>
        <div className="w-full">
          <Button variant="outline">
            <Link className="flex-center gap-1" href="/admin/employee/create">
              <Plus />
              Add Employee
            </Link>
          </Button>
        </div>

        <div className="w-full">
          <EnployeeTable />
        </div>
      </section>
    </>
  );
};

export default EmployeePage;
