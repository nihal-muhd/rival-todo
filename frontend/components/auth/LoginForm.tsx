"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";
import { loginSchema, type LoginInput } from "@/lib/validations";

export function LoginForm() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const serverError = loginMutation.error;
  const serverErrorMessage =
    serverError instanceof ApiError
      ? serverError.message
      : serverError
        ? "Unable to sign in. Please try again."
        : null;

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
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
            type="email"
            autoComplete="email"
            placeholder="Enter your email..."
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {errors.email ? (
          <p id="email-error" className="text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        ) : null}
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
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password..."
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {errors.password ? (
          <p id="password-error" className="text-sm text-red-600" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 text-base">
        <Link
          href="/login"
          className="font-medium text-primary hover:brightness-95"
        >
          Forgot password?
        </Link>
      </div>

      {serverErrorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {serverErrorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="flex min-h-16 w-full items-center justify-center rounded-lg bg-primary px-6 text-lg font-semibold text-primary-foreground shadow-[0_18px_36px_rgba(85,202,141,0.30)] transition hover:brightness-95 disabled:opacity-70"
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
