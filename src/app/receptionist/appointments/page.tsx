"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { getDoctors } from "@/components/AppointmentTable/actions";
import AppointmentTable from "@/components/AppointmentTable/AppointmentTable";
import { getPatients } from "@/components/PatientTable/actions";
import { storeDoctor } from "@/redux/doctorSlice";
import { storePatient } from "@/redux/patientSlice";
import { IDoctor, IPatient } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          getDoctors(),
          getPatients(),
        ]);

        const doctors = doctorRes?.data || [];
        const patients = patientRes?.data || [];

        dispatch(storeDoctor(doctors));
        dispatch(storePatient(patients));
        setDoctors(doctors);
        setPatients(patients);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [dispatch, setDoctors, setPatients]);

  return (
    <section>
      <Tabs defaultValue="today" className="grid w-full gap-5">
        <TabsList>
          <TabsTrigger value="today">Today Appointments</TabsTrigger>
          <TabsTrigger value="default"> Appointments</TabsTrigger>
        </TabsList>

        <TabsContent className="grid gap-5" value="today">
          <AppointmentTable doctors={doctors} patients={patients} tab="today" />
        </TabsContent>

        <TabsContent className="grid gap-5" value="default">
          <AppointmentTable
            doctors={doctors}
            patients={patients}
            tab="default"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentsPage;
