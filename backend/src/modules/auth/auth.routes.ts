import { Router } from "express";

import { validateBody } from "../../middleware/validate.middleware";
import { login, signup } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/signup", validateBody(signupSchema), signup);
authRoutes.post("/login", validateBody(loginSchema), login);
