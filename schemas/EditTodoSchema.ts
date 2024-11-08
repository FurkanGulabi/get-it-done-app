import { z } from "zod";

export const EditTodoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Please enter a title" })
    .max(125, { message: "Title is too long" }),
  description: z.string().max(255).optional(),
  status: z.enum(["PENDING", "ONGOING", "POSTPONED", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  endDate: z.coerce.date(),
});
