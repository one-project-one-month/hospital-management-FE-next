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
  Textarea,
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
import { format, isAfter, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { IAppointment, IDoctor } from "@/types";
import { getDoctors, getAppointmentData, createAppointment } from "./actions";
import { useDispatch } from "react-redux";
import { storeDoctor } from "@/redux/doctorSlice";
import { redirect, useSearchParams } from "next/navigation";
import { today, maxDate } from "@/constants";
import { ErrorToast, SuccessToast } from "@/lib/toast";

type Shift = {
  time: string;
  title: string;
};

const shifts: Shift[] = [
  { time: "09:00:00", title: "9 A.M." },
  { time: "11:00:00", title: "11 A.M." },
  { time: "13:00:00", title: "1 P.M." },
  { time: "15:00:00", title: "3 P.M." },
];

const DoctorCard = ({
  doctor,
  selectedDoctorId,
  onSelect,
}: {
  doctor: IDoctor;
  selectedDoctorId?: string;
  onSelect: () => void;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{doctor.name}</CardTitle>
      <CardDescription>
        <Badge className="bg-yellow-400 text-black">
          <Star />
          {doctor.experience_years}
        </Badge>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2">
        <span>specialties:</span>
        <div className="grid-cols-auto grid gap-1">
          {doctor.specialty.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        disabled={doctor.id === selectedDoctorId}
        type="button"
        onClick={onSelect}
      >
        Book
      </Button>
    </CardFooter>
  </Card>
);

const SelectedDoctorCard = ({ doctor }: { doctor: IDoctor }) => (
  <Card className="w-sm">
    <CardHeader>
      <CardTitle>{doctor.name}</CardTitle>
      <CardDescription>
        <Badge className="bg-yellow-400 text-black">
          <Star />
          {doctor.experience_years}
        </Badge>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2">
        <span>specialties:</span>
        <div className="grid-cols-auto grid gap-1">
          {doctor.specialty.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ShiftBookingButton = ({
  doctor,
  shift,
  disabled = false,
  date,
}: {
  doctor: IDoctor;
  shift: Shift;
  disabled: boolean;
  date: Date;
}) => {
  const searchParams = useSearchParams();
  const [note, setNote] = useState<string>("");

  const handleCreateAppointment = async () => {
    const id = searchParams.get("id");
    const newDate = format(date, "yyyy-MM-dd");

    const data = {
      patient_profile_id: id || "",
      doctor_profile_id: doctor.id || "",
      appointment_date: newDate,
      appointment_time: shift.time,
      notes: note,
    };

    const result = await createAppointment({ ...data });
    if (result.success) {
      SuccessToast("Appointment created");
      redirect("/receptionist/appointments");
    } else {
      ErrorToast(result.error || "Error creating appointment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className={cn(disabled && "border-red-400")}
          variant="outline"
        >
          {shift.title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are booking an appointment with
            <span className="mx-2 font-bold text-blue-700">{doctor.name}</span>
            for
            <span className="mx-2 font-black">{shift.title}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="w-full">
          <div className="w-full">
            <label htmlFor="email" className="text-sm font-medium">
              Note
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type your note here."
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleCreateAppointment}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function AppointmentForm() {
  const [date, setDate] = useState<Date>(today);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();
  const [openSheet, setOpenSheet] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await getDoctors();
        dispatch(storeDoctor(data || []));
        setDoctors(data || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, [dispatch, setDoctors]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const { data } = await getAppointmentData({
          date: formattedDate,
          doctor_id: selectedDoctor?.id || "",
        });

        setAppointments(data || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [selectedDoctor, date]);

  const handleSelectDoctor = (doc: IDoctor) => {
    setSelectedDoctor(doc);
    setOpenSheet(false);
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false);
    }
  };

  const IsAppointmentAvailable = ({
    appointments = [],
    time,
  }: {
    appointments: IAppointment[];
    time: string;
  }) => {
    return appointments.some(
      (appointment) => appointment.appointment_time === time,
    );
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
              {doctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  selectedDoctorId={selectedDoctor?.id}
                  onSelect={() => handleSelectDoctor(doc)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {selectedDoctor && <SelectedDoctorCard doctor={selectedDoctor} />}

      {selectedDoctor && (
        <>
          <div className="w-full">
            <Popover open={openCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
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
                  disabled={(d) => isBefore(d, today) || isAfter(d, maxDate)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            {shifts.map((shift, index) => (
              <ShiftBookingButton
                key={index}
                doctor={selectedDoctor}
                shift={shift}
                date={date}
                disabled={IsAppointmentAvailable({
                  appointments,
                  time: shift.time,
                })}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
