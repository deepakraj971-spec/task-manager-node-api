import { TaskRepository, TaskQuery } from '../../infrastructure/repositories/TaskRepository';
import { TaskItem, Priority, Status } from '../../domain/entities/TaskItem';
import { PagedResult } from '../../shared/PagedResult';

interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
}

interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
}

export class TaskService {
  constructor(private repo = new TaskRepository()) {}

  async listAsync(query: TaskQuery, userId: string) {
    const res = await this.repo.list(query, userId);
    const pr = new PagedResult<TaskItem>();
    pr.items = res.items;
    pr.total = res.total;
    pr.page = res.page;
    pr.pageSize = res.pageSize;
    return pr;
  }

  getAsync(id: string, userId: string) {
    return this.repo.get(id, userId);
  }

  createAsync(dto: CreateTaskPayload, userId: string) {
    return this.repo.create(dto, userId);
  }

  async updateAsync(id: string, dto: UpdateTaskPayload, userId: string) {
    const updated = await this.repo.update(id, dto, userId);
    return updated !== null;
  }

  deleteAsync(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
