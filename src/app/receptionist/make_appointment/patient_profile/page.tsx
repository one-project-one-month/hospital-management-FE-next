"use client";
import {
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import {
  ArrowLeftRight,
  BriefcaseMedical,
  Calendar as CalendarIcon,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IDoctor } from "@/types";
import { getDoctors } from "./actions";
import { useDispatch } from "react-redux";
import { storeDoctor } from "@/redux/doctorSlice";

const EditPatientPage = () => {
  const [date, setDate] = useState<Date>();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();
  const [openSheet, setOpenSheet] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await getDoctors();
        const doctorData = data || [];
        dispatch(storeDoctor(doctorData));
        setDoctors(doctorData);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, [setDoctors, dispatch]);

  // Function to open the sheet
  const closeSheet = () => {
    setOpenSheet(false);
  };

  return (
    <section>
      <div className="w-full">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            {selectedDoctor ? (
              <Button variant="outline">
                <ArrowLeftRight />
                Change Doctor
              </Button>
            ) : (
              <Button variant="outline">
                <BriefcaseMedical />
                Select Doctor
              </Button>
            )}
          </SheetTrigger>

          <SheetContent className="p-5">
            <SheetHeader>
              <SheetTitle>Select Doctor</SheetTitle>
            </SheetHeader>

            <div className="grid gap-4 overflow-auto py-4">
              {doctors.map((doc, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{doc.name}</CardTitle>

                    <CardDescription>
                      <Badge className="bg-yellow-400 text-black">
                        <Star />
                        {doc.experience_years}
                      </Badge>
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-2">
                      <span>specialties:</span>
                      <div className="grid gap-1">
                        {doc.specialty.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      disabled={doc.id === selectedDoctor?.id}
                      type="button"
                      onClick={() => {
                        setSelectedDoctor(doc);
                        closeSheet();
                      }}
                    >
                      Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {selectedDoctor && (
        <Card className="w-sm">
          <CardHeader>
            <CardTitle>{selectedDoctor.name}</CardTitle>

            <CardDescription>
              <Badge className="bg-yellow-400 text-black">
                <Star />
                {selectedDoctor.experience_years}
              </Badge>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2">
              <span>specialties:</span>
              <div className="grid-cols-auto grid gap-1">
                {selectedDoctor.specialty.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedDoctor && (
        <>
          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            <Button>9 am</Button>
            <Button>11 am</Button>
            <Button>1 pm</Button>
            <Button>3 pm</Button>
          </div>

          <div className="grid w-1/2 grid-cols-2 gap-5">
            <Button variant="outline" asChild>
              <Link href="/receptionist/appointments">Confirm</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/receptionist/make_appointment">Cancel</Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default EditPatientPage;
