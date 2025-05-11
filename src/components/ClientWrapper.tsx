"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const hideNavbarRoutes = ["/login", "/register", "/unauthorized"];
  const pathname = usePathname();

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <AppSidebar />}
      <main className="w-screen">
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}

        {children}
      </main>
    </>
  );
}
