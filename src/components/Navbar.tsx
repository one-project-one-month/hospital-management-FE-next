"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarTrigger,
} from "@/components";
import { usePathname } from "next/navigation";
import { logout } from "./LoginForm/actions";

const Navbar = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="fixed top-0 z-10 w-[-webkit-fill-available]">
      <nav className="bg-background flex items-center justify-between border-b p-4">
        {/* LEFT */}
        {/* <SidebarTrigger /> */}
        <SidebarTrigger />

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <LogOut className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="text-secondary bg-background px-5 pt-2 text-xs">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
              <div className="flex-center gap-3" key={path + index}>
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                </BreadcrumbItem>

                {paths.length !== index + 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Navbar;
