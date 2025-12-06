import { AppDataSource } from '../../config/data-source';
import { Repository } from 'typeorm';
import { TaskItem, Priority, Status } from '../../domain/entities/TaskItem';

export interface TaskQuery {
  page?: number;
  pageSize?: number;
  status?: Status;
  priority?: Priority;
  search?: string;
}

export class TaskRepository {
  private readonly repo: Repository<TaskItem> = AppDataSource.getRepository(TaskItem);

  async list(query: TaskQuery, userId: string) {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 10));

    const qb = this.repo.createQueryBuilder('t').where('t.userId = :userId', { userId });

    if (query.status) qb.andWhere('t.status = :status', { status: query.status });
    if (query.priority) qb.andWhere('t.priority = :priority', { priority: query.priority });
    if (query.search) qb.andWhere('(t.title LIKE :search OR t.description LIKE :search)', { search: `%${query.search}%` });

    const [items, total] = await qb
      .orderBy('t.createdAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { items, total, page, pageSize };
  }

  get(id: string, userId: string) {
    return this.repo.findOne({ where: { id, userId } });
  }

  create(payload: Partial<TaskItem>, userId: string) {
    const entity = this.repo.create({ ...payload, userId });
    return this.repo.save(entity);
  }

  async update(id: string, payload: Partial<TaskItem>, userId: string) {
    const existing = await this.get(id, userId);
    if (!existing) return null;
    Object.assign(existing, payload);
    return this.repo.save(existing);
  }

  async delete(id: string, userId: string) {
    const res = await this.repo.delete({ id, userId });
    return !!res.affected && res.affected > 0;
  }
}
