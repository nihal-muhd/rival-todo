import type { z } from "zod";
import type { Task } from "@prisma/client";

import type {
  createTaskSchema,
  taskListQuerySchema,
  updateTaskSchema,
} from "./task.validation";

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskListQuery = z.infer<typeof taskListQuerySchema>;

export type TaskListResult = {
  items: Task[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
