import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export interface JwtPayload {
  sub: string;
  email: string;
}

const JWT_SECRET: Secret = env.jwt.secret as Secret;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] = env.jwt.expiresIn as SignOptions["expiresIn"];

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
