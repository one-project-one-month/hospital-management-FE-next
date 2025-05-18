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
import { Home, Inbox } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Doctor",
    url: "/admin/doctor",
    icon: Inbox,
  },
  {
    title: "Receptionist",
    url: "/admin/receptionist",
    icon: Inbox,
  },
];

export default function AdminLayout({
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar>

      <div className="w-full">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
