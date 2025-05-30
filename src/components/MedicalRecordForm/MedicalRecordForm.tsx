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
import { createMedicalRecord } from "./actions";
import { redirect } from "next/navigation";
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

export function MedicalRecordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      record_type_id: "9f050a7d-f882-4111-ba41-ae48b88acaa8", //! hard code
      title: "General Checkup",
      description: "",
      recorded_at: formattedToday,
      medicines: [
        {
          medicine_id: "light",
          quantity: 2,
        },
      ],
    },
    mode: "onChange",
  });

  const { control, register } = form;
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "medicines",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // const result = await createMedicalRecord(values);
    // if (result.success) {
    //   SuccessToast("MedicalRecord created");

    //   redirect("/admin/medicalRecord");
    // } else {
    //   ErrorToast(result.error || "Error creating medicalRecord");
    // }
  }

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

        {/* Specialty */}
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`medicines.${index}`} // form array name
            render={() => (
              <FormItem>
                <FormLabel>Medicine {index + 1}</FormLabel>

                <div className="flex items-start space-x-4">
                  {/* Medicine ID Input */}
                  <FormControl
                    {...register(`medicines.${index}.medicine_id` as const)}
                  >
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Medicine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Medicine 1</SelectItem>
                        <SelectItem value="dark">Medicine 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  {/* Quantity Input */}
                  <FormControl>
                    <Input
                      type="number"
                      className="w-[55px]"
                      {...register(`medicines.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      min={1}
                      max={99}
                      defaultValue={1}
                    />
                  </FormControl>

                  <FormMessage />

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
              </FormItem>
            )}
          />
        ))}

        <Button type="button" variant="secondary" onClick={() => append("")}>
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
