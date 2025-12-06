import { AppDataSource } from '../../config/data-source';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';

export class UserRepository {
  private readonly repo: Repository<User> = AppDataSource.getRepository(User);

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  create(name:string, email: string, passwordHash: string) {
    const user = this.repo.create({ name,email, passwordHash });
    return this.repo.save(user);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
