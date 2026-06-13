import type { RequestHandler } from "express";

import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "./task.service";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "./task.types";
import { taskIdParamsSchema, taskListQuerySchema } from "./task.validation";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const input: CreateTaskInput = request.body;
    const task = await createTask(
      request.auth.userId,
      input,
    );

    response.status(201).json({
      success: true,
      data: { task },
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const list: RequestHandler = async (request, response, next) => {
  try {
    const query = taskListQuerySchema.parse(request.query);
    const data = await listTasks(request.auth.userId, query);

    response.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getOne: RequestHandler = async (request, response, next) => {
  try {
    const { id } = taskIdParamsSchema.parse(request.params);
    const task = await getTask(request.auth.userId, id);
    response.status(200).json({ success: true, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = taskIdParamsSchema.parse(request.params);
    const input: UpdateTaskInput = request.body;
    const task = await updateTask(
      request.auth.userId,
      id,
      input,
    );

    response.status(200).json({
      success: true,
      data: { task },
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (request, response, next) => {
  try {
    const { id } = taskIdParamsSchema.parse(request.params);
    await deleteTask(request.auth.userId, id);
    response.status(200).json({
      success: true,
      data: {},
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
