import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  COOKIE_NAME: z.string().min(1).default("accessToken"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  FRONTEND_URL: z.url().default("http://localhost:3000"),
  JWT_EXPIRES_IN: z.string().regex(/^\d+[smhd]$/).default("7d"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = parsedEnv.data;
