import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  stock: z.number().min(1, {
    message: "stock must be at least 1 characters.",
  }),
  price: z.number().min(1, {
    message: "price must be at least 1 characters.",
  }),
  expired_at: z.string().nonempty(),
});
