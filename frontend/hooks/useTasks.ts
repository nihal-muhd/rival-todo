"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  completeTask,
  createTask,
  getInboxTasks,
  updateTask,
} from "@/lib/tasks";

export const taskKeys = {
  all: ["tasks"] as const,
  inbox: ["tasks", "inbox"] as const,
};

export function useInboxTasks() {
  return useQuery({
    queryKey: taskKeys.inbox,
    queryFn: getInboxTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
