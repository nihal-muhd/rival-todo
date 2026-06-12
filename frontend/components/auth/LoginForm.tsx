"use client";

import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="block text-base font-semibold text-foreground"
        >
          Email
        </label>
        <div className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-background px-4 text-muted-foreground shadow-[0_1px_2px_rgba(16,24,40,0.03)] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <svg
            aria-hidden="true"
            className="size-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.75 6.75H19.25V17.25H4.75V6.75Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 7.25L12 12.25L18.75 7.25"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email..."
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="password"
          className="block text-base font-semibold text-foreground"
        >
          Password
        </label>
        <div className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-background px-4 text-muted-foreground shadow-[0_1px_2px_rgba(16,24,40,0.03)] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <svg
            aria-hidden="true"
            className="size-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10V8.25C7 5.49 9.24 3.25 12 3.25C14.76 3.25 17 5.49 17 8.25V10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M5.75 10H18.25V19.25H5.75V10Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M12 14.25V16"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password..."
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-base">
        <Link
          href="/login"
          className="font-medium text-primary hover:brightness-95"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-16 w-full items-center justify-center rounded-lg bg-primary px-6 text-lg font-semibold text-primary-foreground shadow-[0_18px_36px_rgba(85,202,141,0.30)] transition hover:brightness-95 disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
