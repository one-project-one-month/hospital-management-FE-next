import { z } from "zod";

export const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  doctor: z.string().nonempty(),
  patient: z.string().nonempty(),
});
