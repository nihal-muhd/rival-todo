"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  taskFormSchema,
  type TaskFormInput,
} from "@/lib/validations";
import type { Task } from "@/types/tasks";

type TaskFormModalProps = {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (input: TaskFormInput) => void;
  isSubmitting: boolean;
  submitError: string | null;
};

const emptyTask: TaskFormInput = {
  title: "",
  description: "",
  dueDate: "",
  priority: "MEDIUM",
};

export function TaskFormModal({
  isOpen,
  task,
  onClose,
  onSubmit,
  isSubmitting,
  submitError,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: emptyTask,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(
      task
        ? {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
          }
        : emptyTask,
    );
  }, [isOpen, reset, task]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close task modal"
      />
      <form
        className="relative w-full rounded-t-2xl border border-border bg-card p-5 shadow-[0_24px_60px_rgba(16,24,40,0.18)] sm:max-w-3xl sm:rounded-2xl sm:p-7"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 id="task-modal-title" className="sr-only">
          {task ? "Edit task" : "Add task"}
        </h2>

        <div className="space-y-2">
          <input
            type="text"
            autoFocus
            placeholder="Task title"
            aria-label="Task title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "task-title-error" : undefined}
            {...register("title")}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-xl font-semibold text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.title ? (
            <p id="task-title-error" className="text-sm text-red-600" role="alert">
              {errors.title.message}
            </p>
          ) : null}
        </div>

        <div className="mt-4 space-y-2">
          <textarea
            rows={3}
            placeholder="Description"
            aria-label="Task description"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "task-description-error" : undefined
            }
            {...register("description")}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.description ? (
            <p
              id="task-description-error"
              className="text-sm text-red-600"
              role="alert"
            >
              {errors.description.message}
            </p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Date</span>
            <input
              type="date"
              {...register("dueDate")}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>Priority</span>
            <select
              {...register("priority")}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
        </div>

        <div className="mt-7 flex justify-end gap-3 border-t border-border pt-5">
          {submitError ? (
            <p className="mr-auto self-center text-sm text-red-600" role="alert">
              {submitError}
            </p>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(85,202,141,0.24)] hover:brightness-95"
          >
            {isSubmitting
              ? "Saving..."
              : task
                ? "Save changes"
                : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}
