const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: unknown[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: unknown[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const payload = (await response.json()) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse;

  if (!payload.success) {
    throw new ApiError(
      payload.message || "Something went wrong",
      response.status,
      payload.errors,
    );
  }

  if (!response.ok) {
    throw new ApiError("Something went wrong", response.status);
  }

  return payload.data;
}
