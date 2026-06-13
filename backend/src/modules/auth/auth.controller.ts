import type { RequestHandler } from "express";

import { clearAuthCookie, setAuthCookie } from "./auth.cookie";
import { getCurrentUser, loginUser, signupUser } from "./auth.service";
import type { LoginInput, SignupInput } from "./auth.types";

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

export const logout: RequestHandler = (_request, response) => {
  clearAuthCookie(response);

  response.status(200).json({
    success: true,
    data: {},
    message: "Signed out successfully",
  });
};

export const me: RequestHandler = async (request, response, next) => {
  try {
    const user = await getCurrentUser(request.auth.userId);

    response.status(200).json({
      success: true,
      data: { user },
      message: "Current user retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
