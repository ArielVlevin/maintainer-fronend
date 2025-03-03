import { z } from "zod";

export const formSchema = z.object({
  product_id: z.string().optional(),
  name: z.string().min(2, { message: "Product name is required" }).max(100),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  tags: z.array(z.string()).optional(),
  purchaseDate: z
    .date()
    .min(new Date(), { message: "Purchase date cannot be in the past" }),
  lastOverallMaintenance: z.date().optional(),
  nextOverallMaintenance: z.date().optional(),
});

export type ProductFormData = z.infer<typeof formSchema>;
