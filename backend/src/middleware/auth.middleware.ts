import type { RequestHandler } from "express";

import { env } from "../config/env";
import { verifyAccessToken } from "../lib/jwt";
import { clearAuthCookie } from "../modules/auth/auth.cookie";
import { AppError } from "../utils/app-error";

export const requireAuth: RequestHandler = (request, response, next) => {
  const token: unknown = request.cookies?.[env.COOKIE_NAME];

  if (typeof token !== "string" || token.length === 0) {
    next(new AppError("Authentication required", 401));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    request.auth = { userId: payload.userId };
    next();
  } catch {
    clearAuthCookie(response);
    next(new AppError("Authentication required", 401));
  }
};
