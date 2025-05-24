import { addDays, startOfDay } from "date-fns";

export const today = startOfDay(new Date());
export const maxDate = addDays(today, 6);

export * from "./dummyData";
