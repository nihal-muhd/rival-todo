import type { ErrorRequestHandler } from "express";

import { AppError } from "../utils/app-error";

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  console.error("[unhandled-error]", error);

  response.status(500).json({
    success: false,
    message: "Something went wrong",
    errors: [],
  });
};
