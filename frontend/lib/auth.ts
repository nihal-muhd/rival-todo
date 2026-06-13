import { apiRequest } from "@/lib/api";
import type { SignupInput } from "@/lib/validations";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type SignupResponse = {
  user: AuthUser;
};

export function signupUser(input: SignupInput): Promise<SignupResponse> {
  return apiRequest<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
