import { z } from "zod";

export const AddTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  status: z.enum(["PENDING", "ONGOING", "POSTPONED", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  endDate: z.coerce.date(),
});
