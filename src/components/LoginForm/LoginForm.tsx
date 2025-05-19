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
} from "../ui";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { login as loginReduxAction } from "@/redux/authSlice";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const [state, loginAction] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.user) {
      const { name, roles } = state?.user;
      const primaryRole = roles[0];
      const userInRTK = { name, role: primaryRole };
      dispatch(loginReduxAction({ user: userInRTK }));

      redirect("/");
    }
  }, [state, dispatch]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={loginAction}>
            {/* Form */}
            <div className="grid gap-6">
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />

                {state?.errors?.email && (
                  <p className="text-red-500">{state.errors.email}</p>
                )}
              </div>
              {/* Password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                {state?.errors?.password && (
                  <p className="text-red-500">{state.errors.password}</p>
                )}
              </div>

              <SubmitButton />
            </div>

            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?
              <a href="/register" className="underline underline-offset-4">
                Register
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full">
      Login
    </Button>
  );
}
