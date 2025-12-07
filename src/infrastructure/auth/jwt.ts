import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';

export interface JwtPayload {
  sub: string;
  email: string;
  type?: 'access' | 'refresh';
}

const JWT_SECRET: Secret = env.jwt.secret as Secret;
const JWT_REFRESH_SECRET:Secret = env.jwt.refreshSecret as Secret;

export const signToken = (
  payload: JwtPayload,
  expiresIn: SignOptions['expiresIn']
): string => {

  if(payload.type==='access'){
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }else{
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
  }
};

export const verifyToken = (token: string,type:string): JwtPayload | null => {
  try {
    if(type==='access'){
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    }else{
      return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
    }
  } catch {
    return null;
  }
};
