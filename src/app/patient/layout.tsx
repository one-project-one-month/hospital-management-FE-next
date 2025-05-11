"use client";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "patient") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
