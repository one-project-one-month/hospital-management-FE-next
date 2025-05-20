import { Button, PatientTable } from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const MakeAppointmentPage = () => {
  return (
    <>
      <section>
        <div className="w-full">
          <Button variant="outline" asChild>
            <Link
              className="flex-center gap-1"
              href="/receptionist/make_appointment"
            >
              <Plus />
              Add Patient Profile
            </Link>
          </Button>
        </div>

        <div className="w-full">
          <PatientTable />
        </div>
      </section>
    </>
  );
};

export default MakeAppointmentPage;
