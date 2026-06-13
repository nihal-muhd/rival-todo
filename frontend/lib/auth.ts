import { apiRequest } from "@/lib/api";
import type { LoginInput, SignupInput } from "@/lib/validations";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type SignupResponse = {
  user: AuthUser;
};

type LoginResponse = {
  user: AuthUser;
};

type CurrentUserResponse = {
  user: AuthUser;
};

export function signupUser(input: SignupInput): Promise<SignupResponse> {
  return apiRequest<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginUser(input: LoginInput): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logoutUser(): Promise<Record<string, never>> {
  return apiRequest<Record<string, never>>("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return apiRequest<CurrentUserResponse>("/auth/me");
}
