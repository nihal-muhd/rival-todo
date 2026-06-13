import type { Response } from "express";

import { env } from "../../config/env";
import { signAccessToken } from "../../lib/jwt";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const authCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  path: "/",
};

export function setAuthCookie(response: Response, userId: string): void {
  response.cookie(env.COOKIE_NAME, signAccessToken(userId), {
    ...authCookieOptions,
    maxAge: COOKIE_MAX_AGE_MS,
  });
}

export function clearAuthCookie(response: Response): void {
  response.clearCookie(env.COOKIE_NAME, authCookieOptions);
}
