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
import { Plus, Trash2 } from "lucide-react";
import { formSchema } from "./schema";
import { createMedicalRecord, getMedicines } from "./actions";
import { redirect, useSearchParams } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../ui";
import { formattedToday } from "@/constants";
import { useEffect, useState } from "react";
import { IMedicine } from "@/types";

export function MedicalRecordForm() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id") || "";
  const [medicines, setMedicines] = useState<IMedicine[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      record_type_id: "9f050a7d-f882-4111-ba41-ae48b88acaa8", //! hard code
      title: "General Checkup",
      description: "",
      recorded_at: formattedToday,
      medicines: [
        {
          medicine_id: "",
          quantity: 1,
        },
      ],
    },
    mode: "onChange",
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "medicines",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createMedicalRecord({ values, appointmentId });
    if (result.success) {
      SuccessToast("MedicalRecord created");

      redirect("/receptionist/records");
    } else {
      ErrorToast(result.error || "Error creating medicalRecord");
    }
  }

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await getMedicines();
        setMedicines(data || []);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      }
    };

    fetchMedicines();
  }, [setMedicines]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xs space-y-8"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Medicine */}
        {fields.map((field, index) => {
          const selectedIds =
            form.watch("medicines")?.map((m: any) => m.medicine_id) ?? [];

          return (
            <FormItem key={field.id}>
              <FormLabel>Medicine {index + 1}</FormLabel>

              <div className="flex items-start space-x-4">
                {/* Medicine Select */}
                <FormField
                  control={form.control}
                  name={`medicines.${index}.medicine_id`}
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString() ?? ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Medicine" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicines.map((medicine, idx) => {
                            return (
                              <SelectItem
                                key={idx}
                                value={medicine.id!.toString()}
                                disabled={selectedIds.includes(
                                  medicine.id?.toString(),
                                )}
                              >
                                {medicine.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />

                {/* Quantity Input */}
                <FormField
                  control={form.control}
                  name={`medicines.${index}.quantity`}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={99}
                        className="w-[55px]"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 1)
                        }
                      />
                    </FormControl>
                  )}
                />

                {/* Remove Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive border-destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          );
        })}

        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ medicine_id: "", quantity: 1 })}
        >
          <Plus /> Add Medicine
        </Button>
        {/* form actions */}
        <div className="flex gap-3">
          <Button type="submit">Submit</Button>

          <Button variant="outline" asChild>
            <Link href="/receptionist/records">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
