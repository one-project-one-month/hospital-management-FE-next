"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image
                  src="https://avatars.githubusercontent.com/u/1486366"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <span>Name</span>
                <Badge>{role || "not user"}</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>{children}</SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
