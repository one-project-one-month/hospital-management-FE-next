/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { formSchema } from "./schema";
import { createDoctor } from "./actions";
import { redirect } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/toast";

export function DoctorForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      specialty: [],
      license_number: "",
      education: "",
      experience_years: 1,
      biography: "",
      phone: "",
      address: "",

      // name: "Mg Mg",
      // email: "mgmg@gmail.com",
      // password: "password",
      // specialty: ["Cardiology", "Internal Medicine"],
      // license_number: "MTL7448",
      // education: "M.D. from Harvard Medical School",
      // experience_years: 10,
      // biography: "A brief biography of the doctor.",
      // phone: "09123456789",
      // address: "Yangon",
    },
    mode: "onChange",
  });

  const { control, register } = form;
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "specialty",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createDoctor(values);
    if (result.success) {
      SuccessToast("Doctor created");

      redirect("/admin/doctor");
    } else {
      ErrorToast(result.error || "Error creating doctor");
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
                <Input placeholder="doctor@email.com" {...field} />
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

        {/* Specialty */}
        {fields.map((field, index) => {
          return (
            <FormField
              key={field.id}
              control={form.control}
              name="education"
              render={() => (
                <FormItem>
                  <FormLabel>Specialty {index + 1}:</FormLabel>

                  <div className="flex space-x-5">
                    <FormControl>
                      <Input
                        {...register(`specialty.${index}` as const)}
                        placeholder="Enter specialty..."
                        defaultValue={field.id}
                      />
                    </FormControl>
                    <FormMessage />

                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive border-destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          );
        })}

        <Button type="button" variant="secondary" onClick={() => append("")}>
          <Plus /> Add Specialty
        </Button>

        {/* Lincense Number */}
        <FormField
          control={form.control}
          name="license_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lincense Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education */}
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience Years */}
        <FormField
          control={form.control}
          name="experience_years"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Years</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Biography */}
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* form actions */}
        <div className="flex gap-3">
          <Button type="submit">Submit</Button>

          <Button variant="outline" asChild>
            <Link href="/admin/doctor">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
