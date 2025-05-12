"use client";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "doctor") {
    redirect("/unauthorized");
  }

  return (
    <>
      <AppSidebar />
      <main className="w-screen">
        <Navbar />
        {children}
      </main>
    </>
  );
}
