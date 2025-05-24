import { Button } from "@/components";
import MedicineTable from "@/components/MedicineTable/MedicineTable";
import { Plus } from "lucide-react";
import Link from "next/link";

const MedicinePage = () => {
  return (
    <section>
      <div className="w-full">
        <Button variant="outline" asChild>
          <Link
            className="flex-center gap-1"
            href="/receptionist/medicine/create"
          >
            <Plus />
            Add Medicine
          </Link>
        </Button>
      </div>

      <div className="w-full">
        <MedicineTable />
      </div>
    </section>
  );
};

export default MedicinePage;
