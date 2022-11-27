import { Router, json } from 'express';
import cors from 'cors';
import UsersController from './controllers/users-controller.js';
import SessionController from './controllers/session-controller.js';
import { isManager, isUser } from './middlewares/auth.js';
import TaskController from './controllers/tasks-controller.js'

const routes = new Router();

routes.use(cors());
routes.use(json());

routes.post('/sessions', SessionController.store);

routes.use(isUser); //all users are allowed
routes.get('/users/:id', UsersController.index);
routes.get('/tasks/:id', TaskController.index);
routes.get('/tasks', TaskController.show);
routes.post('/tasks', TaskController.create);
routes.post('/tasks/perform/:id', TaskController.performTask);

routes.use(isManager); //only managers
routes.post('/user', UsersController.create);
routes.delete('/tasks/:id', TaskController.delete);

export default routes;
