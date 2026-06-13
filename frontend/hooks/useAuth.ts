"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  signupUser,
} from "@/lib/auth";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: ["auth", "me"] as const,
};

export function useSignup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.currentUser, user);
      router.push("/inbox");
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.currentUser, user);
      router.push("/inbox");
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.replace("/login");
      router.refresh();
    },
  });
}
