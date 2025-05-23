import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

const AppointmentsPage = () => {
  return (
    <section>
      <Tabs defaultValue="current" className="grid w-full gap-5">
        <TabsList>
          <TabsTrigger value="current">Today Appointments</TabsTrigger>
          <TabsTrigger value="appointment"> Appointments</TabsTrigger>
        </TabsList>

        <TabsContent className="grid gap-5" value="current">
          <div className="grid w-full grid-cols-2 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>9 am</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Mark as Complete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>11 am</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Mark as Complete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>1 pm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Mark as Complete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3 pm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Mark as Complete</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent className="grid gap-5" value="appointment">
          <div className="w-full">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="light">Doctor 1</SelectItem>
                <SelectItem value="dark">Doctor 2</SelectItem>
                <SelectItem value="system">Doctor 3</SelectItem>
              </SelectContent>
            </Select>
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
            <Card>
              <CardHeader>
                <CardTitle>9 am</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Delete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>11 am</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Delete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>1 pm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Delete</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3 pm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doctor: Dr who</p>
                <p>patient: patient 1</p>
                <p>Description: wan shaw</p>
              </CardContent>

              <CardFooter>
                <Button>Delete</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentsPage;
