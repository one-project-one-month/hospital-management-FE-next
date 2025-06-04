/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { formSchema } from "./schema";
import { createMedicine, updateMedicine } from "./actions";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/toast";
import { Calendar, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { today } from "@/constants";
import { addDays, format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const default_expired = addDays(today, 365);

export function MedicineForm() {
  const [date, setDate] = useState<Date>(default_expired);
  const [openCalendar, setOpenCalendar] = useState(false);
  const medicinesData = useSelector(
    (state: RootState) => state.medicines.medicines,
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      stock: 1,
      price: 1,
      expired_at: format(default_expired, "yyyy-MM-dd"),
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (pathname.includes("/create")) {
      const result = await createMedicine(values);
      if (result.success) {
        SuccessToast("Medicine created");
        redirect("/receptionist/medicine");
      } else {
        ErrorToast(result.error || "Error creating medicine");
      }
    } else if (pathname.includes("/edit")) {
      const id = searchParams.get("id");
      const result = await updateMedicine({ values, id });
      if (result.success) {
        SuccessToast("Medicine updated");
        redirect("/receptionist/medicine");
      } else {
        ErrorToast(result.error || "Error updating medicine");
      }
    }
  }

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpenCalendar(false);

      const newDate = format(selectedDate, "yyyy-MM-dd");
      form.setValue("expired_at", newDate);
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id || !pathname.includes("/edit")) return;

    const editData = medicinesData?.find((med) => med.id == id);
    if (!editData) return;

    const { expired_at } = editData;

    if (editData) {
      form.reset({
        ...editData,
        expired_at: expired_at || format(default_expired, "yyyy-MM-dd"),
      });
    }
  }, [pathname, searchParams, medicinesData, form]);

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expired */}
        <FormField
          control={form.control}
          name="expired_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expired Date</FormLabel>
              <FormControl>
                <Popover open={openCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setOpenCalendar(!openCalendar)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleSelectDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* form actions */}
        <div className="flex gap-3">
          <Button type="submit">Submit</Button>

          <Button variant="outline" asChild>
            <Link href="/receptionist/medicine">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
