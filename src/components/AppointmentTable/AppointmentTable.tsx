"use client";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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

import { IAppointment, IDoctor } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { today } from "@/constants";
import { getAppointmentData } from "./actions";

const AppointmentTable = ({
  tab,
  doctors,
}: {
  tab: "today" | "default";
  doctors: IDoctor[];
}) => {
  const [date, setDate] = useState<Date>(today);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const { data } = await getAppointmentData({
          date: formattedDate,
          doctor_id: selectedDoctor?.id || "",
        });

        console.log(data);

        setAppointments(data || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [date, selectedDoctor?.id, setAppointments, setSelectedDoctor]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false);
    }
  };

  return (
    <>
      <div className="flex w-full gap-2">
        {/* Doctor */}
        <Select>
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

        {/* Date */}
        {tab === "default" && (
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

            <CardFooter className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button variant="destructive">medical record</Button>
                <Button variant="destructive">Lab res</Button>
              </div>

              <div className="flex gap-2">
                {tab !== "default" && <Button>Mark as Complete</Button>}

                <Button variant="destructive">Delete</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AppointmentTable;
