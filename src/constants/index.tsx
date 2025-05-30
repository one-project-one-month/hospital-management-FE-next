import { addDays, format, startOfDay } from "date-fns";

export const today = startOfDay(new Date());
export const formattedToday = format(today, "yyyy-MM-dd");
export const maxDate = addDays(today, 6);

export * from "./dummyData";
