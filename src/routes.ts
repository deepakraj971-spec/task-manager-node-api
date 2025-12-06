import { Router } from 'express';
import AuthController from './api/controllers/AuthController';
import TasksController from './api/controllers/TasksController';

const routes = Router();

routes.use('/api/auth', AuthController);
routes.use('/api/tasks', TasksController);

export default routes;
