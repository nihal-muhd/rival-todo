import { z } from "zod";

const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]);
const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
const dueDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must use YYYY-MM-DD")
  .nullable();

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title must be 200 characters or fewer"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be 1000 characters or fewer")
    .nullable()
    .default(null),
  status: taskStatusSchema.default("TODO"),
  priority: taskPrioritySchema.default("MEDIUM"),
  dueDate: dueDateSchema.default(null),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: "At least one task field is required",
  });

export const taskIdParamsSchema = z.object({
  id: z.uuid("Task id must be a valid UUID"),
});

export const taskListQuerySchema = z.object({
  view: z.enum(["inbox"]).default("inbox"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
