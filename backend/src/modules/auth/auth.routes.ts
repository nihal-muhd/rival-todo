import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { validateBody } from "../../middleware/validate.middleware";
import { login, logout, me, signup } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/signup", validateBody(signupSchema), signup);
authRoutes.post("/login", validateBody(loginSchema), login);
authRoutes.post("/logout", requireAuth, logout);
authRoutes.get("/me", requireAuth, me);
