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
import { RootState } from "@/redux/store";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Dashboard",
    url: "/receptionist/dashboard",
    icon: Home,
  },
  {
    title: "Inventory",
    url: "/receptionist/inventory",
    icon: Inbox,
  },
  {
    title: "Medicine",
    url: "/receptionist/medicine",
    icon: Calendar,
  },
  {
    title: "Apointments",
    url: "/receptionist/appointments",
    icon: Search,
  },
  {
    title: "Records",
    url: "/receptionist/records",
    icon: Settings,
  },
];

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "receptionist") {
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
