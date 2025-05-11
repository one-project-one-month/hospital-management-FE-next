"use client";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "./ui";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useState } from "react";
import { redirect } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [role, setRole] = useState<string>("");
  const dispatch = useDispatch();

  const onLogin = () => {
    const allowedRoles = ["admin", "doctor", "receptionist", "patient"];
    if (!allowedRoles.includes(role)) {
      return;
    }

    dispatch(login({ role }));
    redirect("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            {/* Form */}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="patient | doctor | receptionist | admin"
                  value={role || ""}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              {/* <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div> */}

              {/* Password */}
              {/* <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div> */}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
