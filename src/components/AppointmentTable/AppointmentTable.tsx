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
import { useCallback, useEffect, useState } from "react";

import { IAppointment, IDoctor, IPatient } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { today } from "@/constants";
import {
  cancelAppointment,
  confirmAppointment,
  getAppointmentData,
} from "./actions";
import { ErrorToast, SuccessToast } from "@/lib/toast";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedPatient, setSelectedPatient] = useState<string | undefined>();

  const fetchAppointments = useCallback(async () => {
    try {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
      const { data } = await getAppointmentData({
        date: formattedDate,
        doctor_id: selectedDoctor || "",
        patient_profile_id: selectedPatient || "",
        status: "pending",
      });

      setAppointments(data || []);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  }, [date, selectedDoctor, selectedPatient]);

  const onCancel = useCallback(
    async (id: string) => {
      try {
        await cancelAppointment(id);
        SuccessToast("Appointment cancelled.");
        await fetchAppointments();
      } catch (error) {
        console.error("Failed to cancel appointment:", error);
        ErrorToast("Failed to cancel appointment.");
      }
      setOpenDialog(false);
    },
    [fetchAppointments],
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false);
    }
  };

  const clearDate = () => {
    setDate(undefined);
  };

  const onConfirm = useCallback(
    async (id: string) => {
      try {
        await confirmAppointment(id);
        SuccessToast("Appointment Confirmed.");
        await fetchAppointments();
      } catch (error) {
        console.error("Failed to confirm appointment:", error);
        ErrorToast("Appointment fail to confirm.");
      }
      setOpenDialog(false);
    },
    [fetchAppointments],
  );

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
        {appointments.map((appointment, index) => (
          <Card
            key={
              appointment.appointment_date +
              index +
              appointment.appointment_time
            }
          >
            <CardHeader>
              <CardTitle>{appointment.appointment_date}</CardTitle>
              <CardTitle>{appointment.appointment_time}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Doctor: {appointment.doctor?.name}</p>
              <p>patient: {appointment.patient_profile_name}</p>
              <p>Description:{appointment.notes}</p>
            </CardContent>

            <CardFooter className="flex gap-2">
              {tab !== "default" && (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button>Mark as Confirm</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Treatment</DialogTitle>
                      <DialogDescription>
                        Please create treatment before confirm.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => onConfirm(appointment.id + "" || "")}
                        variant="default"
                      >
                        Confirm
                      </Button>

                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
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
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onCancel(appointment.id + "" || "")}
                      >
                        Yes
                      </Button>
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
