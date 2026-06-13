import type { RequestHandler } from "express";

import { env } from "../../config/env";
import { signAccessToken } from "../../lib/jwt";
import { loginUser, signupUser } from "./auth.service";
import type { LoginInput, SignupInput } from "./auth.types";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function setAuthCookie(
  response: Parameters<RequestHandler>[1],
  userId: string,
): void {
  const accessToken = signAccessToken(userId);

  response.cookie(env.COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  });
}

export const signup: RequestHandler = async (request, response, next) => {
  try {
    const input: SignupInput = request.body;
    const user = await signupUser(input);
    setAuthCookie(response, user.id);

    response.status(201).json({
      success: true,
      data: { user },
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (request, response, next) => {
  try {
    const input: LoginInput = request.body;
    const user = await loginUser(input);
    setAuthCookie(response, user.id);

    response.status(200).json({
      success: true,
      data: { user },
      message: "Signed in successfully",
    });
  } catch (error) {
    next(error);
  }
};
