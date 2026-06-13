import type { z } from "zod";

import type { signupSchema } from "./auth.validation";

export type SignupInput = z.infer<typeof signupSchema>;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
