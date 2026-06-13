import type { RequestHandler } from "express";
import type { z } from "zod";

import { AppError } from "../utils/app-error";

export function validateBody(schema: z.ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(new AppError("Validation failed", 400, errors));
      return;
    }

    request.body = result.data;
    next();
  };
}
