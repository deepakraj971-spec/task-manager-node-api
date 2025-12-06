import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { hashPassword, verifyPassword } from '../../infrastructure/auth/password';
import { signToken } from '../../infrastructure/auth/jwt';

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
    if (!user) return '';
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return '';
    return signToken({ sub: user.id, email: user.email });
  }
  
}
