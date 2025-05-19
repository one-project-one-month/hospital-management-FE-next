"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";
import { formSchema } from "./schema";
import { createReceptionist } from "./actions";
import { redirect } from "next/navigation";

export function ReceptionistForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createReceptionist(values);
    if (result.success) {
      toast.success("Receptionist created", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      redirect("/admin/receptionist");
    } else {
      toast.error(result.error || "Error creating receptionist", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xs space-y-8"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="receptionist@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground absolute inset-y-0 right-2 flex items-center"
                    tabIndex={-1} // prevent tab focus if not needed
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* form actions */}
        <div className="flex gap-3">
          <Button type="submit">Submit</Button>

          <Button variant="outline" asChild>
            <Link href="/admin/receptionist">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
