"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import MedicalRecordTable from "@/components/MedicalRecordTable/MedicalRecordTable";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getAppointmentData, getMedicalRecords } from "./actions";
import { IAppointment, IMedicalRecord } from "@/types";
import Link from "next/link";

const RecordsPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, medicalRecordsRes] = await Promise.all([
          getAppointmentData(),
          getMedicalRecords(),
        ]);

        const appointments = appointmentsRes?.data || [];
        const medicalRecords = medicalRecordsRes?.data || [];

        const filteredAppointments = appointments.filter(
          (appointment) =>
            !medicalRecords.some(
              (record) => record.appointment_id === appointment.id,
            ),
        );

        setAppointments(filteredAppointments);
        setMedicalRecords(medicalRecords);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="w-full">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus />
              Create Medical Record
            </Button>
          </SheetTrigger>

          <SheetContent className="p-5">
            <SheetHeader>
              <SheetTitle>Select Appointment</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 overflow-auto py-4">
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
                    <Button type="button" variant="default" asChild>
                      <Link
                        href={{
                          pathname: "/receptionist/records/create",
                          query: {
                            appointment_id: appointment.id,
                          },
                        }}
                      >
                        Create Medical Record
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full">
        <MedicalRecordTable medicalRecords={medicalRecords} />
      </div>
    </section>
  );
};

export default RecordsPage;
