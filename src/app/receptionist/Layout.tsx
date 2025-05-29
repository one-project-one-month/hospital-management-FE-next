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
import {
  Calendar,
  Search,
  CalendarCheck2,
  BookPlus,
  Syringe,
} from "lucide-react";
import Link from "next/link";

const items = [
  // {
  //   title: "Dashboard",
  //   url: "/receptionist/dashboard",
  //   icon: Home,
  // },
  {
    title: "Medicine",
    url: "/receptionist/medicine",
    icon: Calendar,
  },
  // {
  //   title: "Inventory",
  //   url: "/receptionist/inventory",
  //   icon: Inbox,
  // },
  {
    title: "Apointments",
    url: "/receptionist/appointments",
    icon: Search,
  },
  {
    title: "Make Apointments",
    url: "/receptionist/make_appointment",
    icon: CalendarCheck2,
  },
  {
    title: "Treatment",
    url: "/receptionist/treatment",
    icon: Syringe,
  },
  {
    title: "Medical Records",
    url: "/receptionist/records",
    icon: BookPlus,
  },
];

export default function ReceptionistLayout({
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
