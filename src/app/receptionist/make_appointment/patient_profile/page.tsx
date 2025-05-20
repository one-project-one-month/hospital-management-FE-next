import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { BriefcaseMedical } from "lucide-react";

const EditPatientPage = () => {
  return (
    <section className="grid gap-5">
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
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Today</SelectItem>
            <SelectItem value="dark">Tomorrow</SelectItem>
            <SelectItem value="system">The next day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full grid-cols-2 gap-5">
        <Button>9 am</Button>
        <Button>11 am</Button>
        <Button>1 pm</Button>
        <Button>3 pm</Button>
      </div>

      <div className="grid w-1/2 grid-cols-2 gap-5">
        <Button variant="outline">Confirm</Button>
        <Button variant="secondary">Cancle</Button>
      </div>
    </section>
  );
};

export default EditPatientPage;
