import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";

const EditPatientPage = () => {
  return (
    <section>
      <div className="w-full">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
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
            <SelectValue placeholder="Theme" />
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
    </section>
  );
};

export default EditPatientPage;
