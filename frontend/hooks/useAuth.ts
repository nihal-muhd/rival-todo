"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupUser } from "@/lib/auth";

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
