"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { RootState } from "@/redux/store";
import { Home, Inbox, Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Profile",
    url: "/",
    icon: Home,
  },
  {
    title: "Booking",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Record",
    url: "#",
    icon: Calendar,
  },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "patient") {
    redirect("/unauthorized");
  }

  return (
    <>
      <AppSidebar>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar>

      <main className="w-screen">
        <Navbar />
        {children}
      </main>
    </>
  );
}
