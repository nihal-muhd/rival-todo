import jwt from "jsonwebtoken";

import { env } from "../config/env";

type JwtPayload = {
  userId: string;
};

const durationMultipliers = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 24 * 60 * 60,
};

function getTokenDurationSeconds(duration: string): number {
  const unit = duration.at(-1);
  const value = Number(duration.slice(0, -1));

  if (unit !== "s" && unit !== "m" && unit !== "h" && unit !== "d") {
    throw new Error("JWT_EXPIRES_IN has an unsupported unit");
  }

  return value * durationMultipliers[unit];
}

export function signAccessToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: getTokenDurationSeconds(env.JWT_EXPIRES_IN),
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  const payload: unknown = jwt.verify(token, env.JWT_SECRET);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload) ||
    typeof payload.userId !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return { userId: payload.userId };
}
