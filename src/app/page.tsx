"use client";
import { RootState } from "@/redux/store";
import { UserRole } from "@/types";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const role = useSelector((state: RootState) => state.auth.role);
  const pathname = usePathname();

  useEffect(() => {
    switch (role) {
      case UserRole.Admin:
        redirect("/admin");
        break;
      case UserRole.Doctor:
        redirect("/doctor");
        break;
      case UserRole.Patient:
        redirect("/patient");
        break;
      case UserRole.Receptionist:
        redirect("/receptionist");
        break;

      default:
        redirect("/unauthorized");
        break;
    }
  }, [role, pathname]);

  return <div> Hello world</div>;
}
