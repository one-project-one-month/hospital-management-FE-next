"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { getDoctors } from "@/components/AppointmentTable/actions";
import AppointmentTable from "@/components/AppointmentTable/AppointmentTable";
import { storeDoctor } from "@/redux/doctorSlice";
import { IDoctor } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

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

  return (
    <section>
      <Tabs defaultValue="today" className="grid w-full gap-5">
        <TabsList>
          <TabsTrigger value="today">Today Appointments</TabsTrigger>
          <TabsTrigger value="default"> Appointments</TabsTrigger>
        </TabsList>

        <TabsContent className="grid gap-5" value="today">
          <AppointmentTable doctors={doctors} tab="today" />
        </TabsContent>

        <TabsContent className="grid gap-5" value="default">
          <AppointmentTable doctors={doctors} tab="default" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentsPage;
