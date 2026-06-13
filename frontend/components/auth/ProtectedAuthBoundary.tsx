"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useCurrentUser, useLogout } from "@/hooks/useAuth";

export function ProtectedAuthBoundary({ children }: { children: ReactNode }) {
  const currentUserQuery = useCurrentUser();
  const logoutMutation = useLogout();
  const isRecoveringSession = useRef(false);

  useEffect(() => {
    if (currentUserQuery.isError && !isRecoveringSession.current) {
      isRecoveringSession.current = true;
      logoutMutation.mutate();
    }
  }, [currentUserQuery.isError, logoutMutation]);

  if (currentUserQuery.isPending || currentUserQuery.isError) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Restoring your session...
      </div>
    );
  }

  return children;
}
