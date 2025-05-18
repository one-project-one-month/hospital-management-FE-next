import { Button, ReceptionistTable } from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const ReceptionistPage = () => {
  return (
    <>
      <section>
        <div className="w-full">
          <Button variant="outline" asChild>
            <Link
              className="flex-center gap-1"
              href="/admin/receptionist/create"
            >
              <Plus />
              Add Receptionist
            </Link>
          </Button>
        </div>

        <div className="w-full">
          <ReceptionistTable />
        </div>
      </section>
    </>
  );
};

export default ReceptionistPage;
