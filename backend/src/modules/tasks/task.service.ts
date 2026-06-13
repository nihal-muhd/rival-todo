import { TaskStatus, type Task } from "@prisma/client";

import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type {
  CreateTaskInput,
  TaskListResult,
  TaskListQuery,
  UpdateTaskInput,
} from "./task.types";

function toDueDate(value: string | null | undefined): Date | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  return value === null ? null : new Date(`${value}T00:00:00.000Z`);
}

export async function createTask(
  userId: string,
  input: CreateTaskInput,
): Promise<Task> {
  return prisma.task.create({
    data: {
      userId,
      title: input.title,
      description: input.description || null,
      status: input.status,
      priority: input.priority,
      dueDate: toDueDate(input.dueDate),
    },
  });
}

export async function listTasks(
  userId: string,
  query: TaskListQuery,
): Promise<TaskListResult> {
  const where = {
    userId,
    status: { not: TaskStatus.COMPLETED },
  };
  const skip = (query.page - 1) * query.limit;

  const [items, totalItems] = await prisma.$transaction([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: query.limit,
    }),
    prisma.task.count({ where }),
  ]);
  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      totalItems,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}

export async function getTask(userId: string, taskId: string): Promise<Task> {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
}

export async function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const result = await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && {
        description: input.description || null,
      }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.priority !== undefined && { priority: input.priority }),
      ...(input.dueDate !== undefined && {
        dueDate: toDueDate(input.dueDate),
      }),
    },
  });

  if (result.count === 0) {
    throw new AppError("Task not found", 404);
  }

  return getTask(userId, taskId);
}

export async function deleteTask(
  userId: string,
  taskId: string,
): Promise<void> {
  const result = await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });

  if (result.count === 0) {
    throw new AppError("Task not found", 404);
  }
}
