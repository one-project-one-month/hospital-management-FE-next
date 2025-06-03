"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getTreatments } from "./actions";
import { ITreatment } from "@/types";
import TreatmentTable from "@/components/TreatmentTable/TreatmentTable";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  doctor: z.string().nonempty(),
  patient: z.string().nonempty(),
});

const TreatmentsPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicalTreatmentsRes] = await Promise.all([getTreatments()]);

        const medicalTreatments = medicalTreatmentsRes?.data || [];

        setTreatments(medicalTreatments);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    redirect(
      `/receptionist/treatment/create?doctor_id=${data.doctor}&patient_id=${data.patient}`,
    );
  }

  return (
    <section>
      <div className="w-full">
        <Dialog open={openSheet} onOpenChange={setOpenSheet}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus />
              Create Treatment
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Please Select Doctor and Patient.</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a doctor." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="doc1">Doc 1</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a patient." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="patient1">Patient 1</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>

                    <Button type="submit" variant="default">
                      Create Treatment
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <DialogFooter className="sm:justify-start"></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full">
        <TreatmentTable treatments={treatments} />
      </div>
    </section>
  );
};

export default TreatmentsPage;
