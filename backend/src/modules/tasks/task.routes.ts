import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../middleware/validate.middleware";
import { create, getOne, list, remove, update } from "./task.controller";
import {
  createTaskSchema,
  taskIdParamsSchema,
  taskListQuerySchema,
  updateTaskSchema,
} from "./task.validation";

export const taskRoutes = Router();

taskRoutes.use(requireAuth);
taskRoutes.post("/", validateBody(createTaskSchema), create);
taskRoutes.get("/", validateQuery(taskListQuerySchema), list);
taskRoutes.get("/:id", validateParams(taskIdParamsSchema), getOne);
taskRoutes.patch(
  "/:id",
  validateParams(taskIdParamsSchema),
  validateBody(updateTaskSchema),
  update,
);
taskRoutes.delete("/:id", validateParams(taskIdParamsSchema), remove);
