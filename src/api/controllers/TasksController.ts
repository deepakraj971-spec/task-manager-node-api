import { Router } from 'express';
import { ApiResponse } from '../responses/ApiResponse';
import { TaskService } from '../../application/services/TaskService';
import { authGuard } from '../middleware/authGuard';
import { validateBody, dueDateNotPast } from '../middleware/validation';
import { CreateTaskDto } from '../../application/dto/CreateTaskDto';
import { UpdateTaskDto } from '../../application/dto/UpdateTaskDto';

const router = Router();
const taskService = new TaskService();

router.use(authGuard);

// GET /api/tasks (list)
router.get('/', async (req, res) => {
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
    status: req.query.status as any,
    priority: req.query.priority as any,
    search: req.query.search as string | undefined,
  };
  const result = await taskService.listAsync(query, req.userId!);
  return res.status(200).json(new ApiResponse(true, 'Tasks retrieved successfully', result));
});

// POST /api/tasks (create)
router.post(
  '/',
  validateBody(CreateTaskDto, dueDateNotPast),
  async (req, res) => {
    const dto = req.body as CreateTaskDto;
    const created = await taskService.createAsync(
      {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        priority: dto.priority,
        status: dto.status,
      },
      req.userId!,
    );
    return res.status(201).json(new ApiResponse(true, 'Task created successfully', created));
  },
);

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const item = await taskService.getAsync(id, req.userId!);
  if (!item) return res.status(404).json(new ApiResponse(false, `Task with id ${id} not found`));
  return res.status(200).json(new ApiResponse(true, 'Task retrieved successfully', item));
});

// PUT /api/tasks/:id
router.put(
  '/:id',
  validateBody(UpdateTaskDto, dueDateNotPast),
  async (req, res) => {
    const id = req.params.id;
    const dto = req.body as UpdateTaskDto;
    const ok = await taskService.updateAsync(
      id,
      {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        priority: dto.priority,
        status: dto.status,
      },
      req.userId!,
    );
    if (!ok) return res.status(404).json(new ApiResponse(false, `Task with id ${id} not found`));
    return res.status(200).json(new ApiResponse(true, 'Task updated successfully'));
  },
);

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const ok = await taskService.deleteAsync(id, req.userId!);
  if (!ok) return res.status(404).json(new ApiResponse(false, `Task with id ${id} not found`));
  return res.status(200).json(new ApiResponse(true, 'Task deleted successfully'));
});

export default router;
