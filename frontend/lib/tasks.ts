import { apiRequest } from "@/lib/api";
import type { TaskFormInput } from "@/lib/validations";
import type {
  Task,
  TaskPagination,
  TaskPriority,
  TaskStatus,
} from "@/types/tasks";

type ApiTask = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type TaskResponse = {
  task: ApiTask;
};

type TaskListResponse = {
  items: ApiTask[];
  pagination: TaskPagination;
};

function normalizeTask(task: ApiTask): Task {
  return {
    ...task,
    description: task.description ?? "",
    dueDate: task.dueDate?.slice(0, 10) ?? "",
  };
}

function toTaskPayload(input: TaskFormInput) {
  return {
    title: input.title,
    description: input.description || null,
    dueDate: input.dueDate || null,
    priority: input.priority,
  };
}

export async function getInboxTasks(): Promise<{
  items: Task[];
  pagination: TaskPagination;
}> {
  const response = await apiRequest<TaskListResponse>(
    "/tasks?view=inbox&page=1&limit=100",
  );

  return {
    items: response.items.map(normalizeTask),
    pagination: response.pagination,
  };
}

export async function createTask(input: TaskFormInput): Promise<Task> {
  const response = await apiRequest<TaskResponse>("/tasks", {
    method: "POST",
    body: JSON.stringify({
      ...toTaskPayload(input),
      status: "TODO",
    }),
  });

  return normalizeTask(response.task);
}

export async function updateTask({
  taskId,
  input,
}: {
  taskId: string;
  input: TaskFormInput;
}): Promise<Task> {
  const response = await apiRequest<TaskResponse>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(toTaskPayload(input)),
  });

  return normalizeTask(response.task);
}

export async function completeTask(taskId: string): Promise<Task> {
  const response = await apiRequest<TaskResponse>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "COMPLETED" }),
  });

  return normalizeTask(response.task);
}
