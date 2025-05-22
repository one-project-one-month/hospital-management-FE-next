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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { addDays, format, isAfter, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { IDoctor } from "@/types";
import { getDoctors, getAppointmentData } from "./actions";
import { useDispatch } from "react-redux";
import { storeDoctor } from "@/redux/doctorSlice";

const today = startOfDay(new Date());
const maxDate = addDays(today, 6);

const shifts = [
  {
    time: 9,
    title: "9 A.M.",
  },
  {
    time: 11,
    title: "11 P.M.",
  },
  {
    time: 13,
    title: "1 P.M.",
  },
  {
    time: 15,
    title: "3 P.M.",
  },
];

const EditPatientPage = () => {
  const [date, setDate] = useState<Date>(today);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();
  const [openSheet, setOpenSheet] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
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

  useEffect(() => {
    const newDate = new Date(date).toLocaleDateString("en-CA");

    const fetchAppointments = async () => {
      try {
        const { data } = await getAppointmentData({
          date: newDate,
          doctor_id: selectedDoctor?.id || "",
        });
        const doctorData = data || [];
        console.log(doctorData);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchAppointments();
  }, [selectedDoctor, date]);

  // Function to open the sheet
  const closeSheet = () => {
    setOpenSheet(false);
  };

  const BookDoctor = (doctor: IDoctor) => {
    setSelectedDoctor(doctor);
    closeSheet();
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false); // close popover after date selection
    }
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
                        BookDoctor(doc);
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
            <Popover open={openCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelectDate}
                  initialFocus
                  disabled={(date) =>
                    isBefore(date, today) || isAfter(date, maxDate)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            {shifts.map((shift, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button variant="outline" key={index}>
                    {shift.title}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      You are booking an appointment with{" "}
                      <span className="mx-2 font-bold text-blue-700">
                        {"Dr John"}
                      </span>
                      for
                      <span className="mx-2 font-black">{"9 P.M."}</span>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button type="button">Confirm</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* <div className="grid w-1/2 grid-cols-2 gap-5">
            <Button variant="outline" asChild>
              <Link href="/receptionist/appointments">Confirm</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/receptionist/make_appointment">Cancel</Link>
            </Button>
          </div> */}
        </>
      )}
    </section>
  );
};

export default EditPatientPage;
