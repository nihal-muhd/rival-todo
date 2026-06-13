import { Prisma } from "@prisma/client";

import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../../lib/password";
import { AppError } from "../../utils/app-error";
import type { AuthUser, LoginInput, SignupInput } from "./auth.types";

export async function signupUser(input: SignupInput): Promise<AuthUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await hashPassword(input.password);

  try {
    return await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError("An account with this email already exists", 409);
    }

    throw error;
  }
}

export async function loginUser(input: LoginInput): Promise<AuthUser> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user || !(await comparePassword(input.password, user.passwordHash))) {
    throw new AppError("Invalid email or password", 401);
  }

  const { passwordHash: _passwordHash, ...authUser } = user;

  return authUser;
}

export async function getCurrentUser(userId: string): Promise<AuthUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("Authentication required", 401);
  }

  return user;
}
