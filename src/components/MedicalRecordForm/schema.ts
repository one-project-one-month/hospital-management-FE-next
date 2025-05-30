import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  recorded_at: z.string().nonempty(),
  description: z.string(),
  record_type_id: z.string().nonempty(),
  medicines: z
    .array(
      z.object({
        medicine_id: z.string().min(1, "Medicine ID is required"),
        quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1),
});
