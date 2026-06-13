import { Router } from "express";

import { validateBody } from "../../middleware/validate.middleware";
import { signup } from "./auth.controller";
import { signupSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/signup", validateBody(signupSchema), signup);
