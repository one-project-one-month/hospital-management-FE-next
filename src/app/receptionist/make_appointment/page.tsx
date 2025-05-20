import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  PatientTable,
} from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const MakeAppointmentPage = () => {
  return (
    <>
      <section>
        <div className="w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" asChild>
                <Link
                  className="flex-center gap-1"
                  href="/receptionist/make_appointment"
                >
                  <Plus />
                  Add Patient Profile
                </Link>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" asChild>
                  <Link href="/receptionist/make_appointment/patient_profile">
                    Create Profile
                  </Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full">
          <PatientTable />
        </div>
      </section>
    </>
  );
};

export default MakeAppointmentPage;
