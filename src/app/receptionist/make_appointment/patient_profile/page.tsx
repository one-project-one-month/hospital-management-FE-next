"use client";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { BriefcaseMedical, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import Link from "next/link";

const EditPatientPage = () => {
  const [date, setDate] = useState<Date>();

  return (
    <section className="">
      <div className="w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <BriefcaseMedical />
              Select Doctor
            </Button>
          </SheetTrigger>

          <SheetContent className="p-5">
            <SheetHeader>
              <SheetTitle>Select Doctor</SheetTitle>
            </SheetHeader>

            <div className="grid gap-4 overflow-auto py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Who</CardTitle>
                  <CardDescription>Sepciality</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Experience: 15</p>
                </CardContent>
                <CardFooter>
                  <Button>Book</Button>
                </CardFooter>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid w-full grid-cols-2 gap-5">
        <Button>9 am</Button>
        <Button>11 am</Button>
        <Button>1 pm</Button>
        <Button>3 pm</Button>
      </div>

      <div className="grid w-1/2 grid-cols-2 gap-5">
        <Button variant="outline" asChild>
          <Link href="/receptionist/appointments">Confirm</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/receptionist/make_appointment">Cancel</Link>
        </Button>
      </div>
    </section>
  );
};

export default EditPatientPage;
