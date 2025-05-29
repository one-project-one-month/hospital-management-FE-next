import { Button } from "@/components";
import MedicalRecordTable from "@/components/MedicalRecordTable/MedicalRecordTable";
import { Plus } from "lucide-react";
import Link from "next/link";

const RecordsPage = () => {
  return (
    <section>
      <div className="w-full">
        <Button variant="outline" asChild>
          <Link
            className="flex-center gap-1"
            href="/receptionist/records/create"
          >
            <Plus />
            Create Medical Record
          </Link>
        </Button>
      </div>

      <div className="w-full">
        <MedicalRecordTable />
      </div>
    </section>
  );
};

export default RecordsPage;
