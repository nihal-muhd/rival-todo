"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { TaskFormModal } from "@/components/modals/TaskFormModal";
import type { TaskFormInput } from "@/lib/validations";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
};

type TaskWorkspaceValue = {
  tasks: Task[];
  openCreateTask: () => void;
  openEditTask: (task: Task) => void;
  completeTask: (taskId: string) => void;
};

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Review campaign brief",
    description: "Check the final campaign goals and deliverables.",
    dueDate: "",
    priority: "MEDIUM",
  },
  {
    id: "task-2",
    title: "Reply to client email",
    description: "Send the revised timeline and next steps.",
    dueDate: "",
    priority: "HIGH",
  },
  {
    id: "task-3",
    title: "Prepare Q2 performance report",
    description: "Collect the latest metrics for the quarterly review.",
    dueDate: "",
    priority: "HIGH",
  },
  {
    id: "task-4",
    title: "Book flights for offsite",
    description: "Compare the available morning flights.",
    dueDate: "",
    priority: "LOW",
  },
  {
    id: "task-5",
    title: "Update product roadmap",
    description: "Add the confirmed milestones for the next release.",
    dueDate: "",
    priority: "MEDIUM",
  },
];

const TaskWorkspaceContext = createContext<TaskWorkspaceValue | null>(null);

export function TaskWorkspace({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const value = useMemo<TaskWorkspaceValue>(
    () => ({
      tasks,
      openCreateTask: () => {
        setEditingTask(null);
        setIsModalOpen(true);
      },
      openEditTask: (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
      },
      completeTask: (taskId) => {
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== taskId),
        );
      },
    }),
    [tasks],
  );

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function saveTask(input: TaskFormInput) {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...input } : task,
        ),
      );
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: crypto.randomUUID(),
          ...input,
        },
      ]);
    }

    closeModal();
  }

  return (
    <TaskWorkspaceContext.Provider value={value}>
      {children}
      <TaskFormModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={closeModal}
        onSubmit={saveTask}
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
