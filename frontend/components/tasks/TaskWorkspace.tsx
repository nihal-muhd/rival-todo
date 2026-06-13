"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { TaskFormModal } from "@/components/modals/TaskFormModal";
import {
  useCompleteTask,
  useCreateTask,
  useInboxTasks,
  useUpdateTask,
} from "@/hooks/useTasks";
import type { TaskFormInput } from "@/lib/validations";
import type { Task } from "@/types/tasks";

type TaskWorkspaceValue = {
  tasks: Task[];
  isLoading: boolean;
  errorMessage: string | null;
  actionErrorMessage: string | null;
  retryTasks: () => void;
  openCreateTask: () => void;
  openEditTask: (task: Task) => void;
  completeTask: (taskId: string) => void;
};

const TaskWorkspaceContext = createContext<TaskWorkspaceValue | null>(null);

export function TaskWorkspace({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const inboxQuery = useInboxTasks();
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const completeMutation = useCompleteTask();
  const value: TaskWorkspaceValue = {
    tasks: inboxQuery.data?.items ?? [],
    isLoading: inboxQuery.isPending,
    errorMessage: inboxQuery.isError
      ? "Could not load tasks. Please try again."
      : null,
    actionErrorMessage: completeMutation.isError
      ? "Could not complete task. Please try again."
      : null,
    retryTasks: () => {
      void inboxQuery.refetch();
    },
    openCreateTask: () => {
      setEditingTask(null);
      setIsModalOpen(true);
    },
    openEditTask: (task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    },
    completeTask: (taskId) => {
      completeMutation.mutate(taskId);
    },
  };

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function saveTask(input: TaskFormInput): void {
    if (editingTask) {
      updateMutation.mutate(
        { taskId: editingTask.id, input },
        { onSuccess: closeModal },
      );
    } else {
      createMutation.mutate(input, { onSuccess: closeModal });
    }
  }

  return (
    <TaskWorkspaceContext.Provider value={value}>
      {children}
      <TaskFormModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={closeModal}
        onSubmit={saveTask}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        submitError={
          createMutation.isError || updateMutation.isError
            ? "Could not save task. Please check the form and retry."
            : null
        }
      />
    </TaskWorkspaceContext.Provider>
  );
}

export function useTaskWorkspace(): TaskWorkspaceValue {
  const context = useContext(TaskWorkspaceContext);

  if (!context) {
    throw new Error("useTaskWorkspace must be used within TaskWorkspace");
  }

  return context;
}
