"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Home, Inbox, Calendar } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/doctor/dashboard",
    icon: Home,
  },
  {
    title: "Patients",
    url: "/doctor/patients",
    icon: Inbox,
  },
  {
    title: "Appointments",
    url: "/doctor/appointments",
    icon: Calendar,
  },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
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
