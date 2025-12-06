import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { hashPassword, verifyPassword } from '../../infrastructure/auth/password';
import { signToken } from '../../infrastructure/auth/jwt';
import { env } from "../../config/env";
import { SignOptions } from 'jsonwebtoken';

export class AuthService {
  constructor(private users = new UserRepository()) {}

  async registerAsync(name:string,email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) return false;
    const hash = await hashPassword(password);
    await this.users.create(name,email, hash);
    return true;
  }

  async loginAsync(email: string, password: string) {
  const user = await this.users.findByEmail(email);
  if (!user) return null;

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;

  const accessToken = signToken(
    { sub: user.id, email: user.email, type: 'access' },
    env.jwt.accessExpiresIn as SignOptions['expiresIn']
  );

  const refreshToken = signToken(
    { sub: user.id, email: user.email, type: 'refresh' },
    env.jwt.refreshExpiresIn as SignOptions['expiresIn']
  );

  return { accessToken, refreshToken };
}
  
}
