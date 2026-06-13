import type { RequestHandler } from "express";

import { env } from "../../config/env";
import { signAccessToken } from "../../lib/jwt";
import { signupUser } from "./auth.service";
import type { SignupInput } from "./auth.types";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const signup: RequestHandler = async (request, response, next) => {
  try {
    const input: SignupInput = request.body;
    const user = await signupUser(input);
    const accessToken = signAccessToken(user.id);

    response.cookie(env.COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: COOKIE_MAX_AGE_MS,
      path: "/",
    });

    response.status(201).json({
      success: true,
      data: { user },
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};
