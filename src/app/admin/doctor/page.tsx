import { Button, DoctorTable } from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const DoctorPage = () => {
  return (
    <>
      <section>
        <div className="w-full">
          <Button variant="outline" asChild>
            <Link className="flex-center gap-1" href="/admin/doctor/create">
              <Plus />
              Add Doctor
            </Link>
          </Button>
        </div>

        <div className="w-full">
          <DoctorTable />
        </div>
      </section>
    </>
  );
};

export default DoctorPage;
