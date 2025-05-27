"use client";
import {
  Button,
  Calendar,
  Card,
  CardContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { useEffect, useState } from "react";

import { IAppointment, IDoctor, IPatient } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { today } from "@/constants";
import { getAppointmentData } from "./actions";

const AppointmentTable = ({
  tab,
  doctors,
  patients,
}: {
  tab: "today" | "default";
  doctors: IDoctor[];
  patients: IPatient[];
}) => {
  const [date, setDate] = useState<Date | undefined>(
    tab === "today" ? today : undefined,
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedPatient, setSelectedPatient] = useState<string | undefined>();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
        const { data } = await getAppointmentData({
          date: formattedDate,
          doctor_id: selectedDoctor || "",
          patient_profile_id: selectedPatient || "",
          status: "pending",
        });

        setAppointments(data || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, [date, selectedDoctor, selectedPatient]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false);
    }
  };

  const clearDate = () => {
    setDate(undefined);
  };

  return (
    <>
      <div className="flex w-full gap-2">
        {/* Doctor */}
        <Select
          onValueChange={(value) => {
            setSelectedDoctor(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Doctor" />
          </SelectTrigger>

          <SelectContent>
            {doctors.map((doc, index) => (
              <SelectItem key={index} value={doc.id || ""}>
                {doc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Patient */}
        <Select
          onValueChange={(value) => {
            setSelectedPatient(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Patient" />
          </SelectTrigger>

          <SelectContent>
            {patients.map((patient, index) => (
              <SelectItem key={index} value={patient.id || ""}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date */}
        {tab === "default" && (
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <div className="relative">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start pr-10 text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>

              {date && (
                <Button
                  variant="ghost"
                  onClick={clearDate}
                  size="icon"
                  className="text-muted-foreground absolute top-1/2 right-3 z-10 h-4 w-4 -translate-y-1/2 cursor-pointer"
                >
                  <XIcon />
                </Button>
              )}
            </div>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-5">
        {appointments.map((appointments, index) => (
          <Card
            key={
              appointments.appointment_date +
              index +
              appointments.appointment_time
            }
          >
            <CardHeader>
              <CardTitle>{appointments.appointment_date}</CardTitle>
              <CardTitle>{appointments.appointment_time}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Doctor: {appointments.doctor?.name}</p>
              <p>patient: {appointments.patient_profile_name}</p>
              <p>Description:{appointments.notes}</p>
            </CardContent>

            <CardFooter className="flex gap-2">
              {tab !== "default" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Mark as Complete</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="destructive">Yes</Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button>Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive">Yes</Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AppointmentTable;
