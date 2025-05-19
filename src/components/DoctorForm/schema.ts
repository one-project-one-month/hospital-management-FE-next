import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  specialty: z.array(z.string().min(1)),
  license_number: z.string(),
  education: z.string(),
  experience_years: z.number(),
  biography: z.string(),
  phone: z.string(),
  address: z.string(),
});
