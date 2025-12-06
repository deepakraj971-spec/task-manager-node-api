import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';

export interface JwtPayload {
  sub: string;
  email: string;
  type?: 'access' | 'refresh';
}

const JWT_SECRET: Secret = env.jwt.secret as Secret;

export const signToken = (
  payload: JwtPayload,
  expiresIn: SignOptions['expiresIn']
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
