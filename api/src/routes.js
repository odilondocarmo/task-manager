import { Router, json } from 'express';
import cors from 'cors';
import UsersController from './controllers/users-controller.js';
import sessionController from './controllers/session-controller.js';
import { isManager, isUser } from './middlewares/auth.js';

const routes = new Router();

routes.use(cors());
routes.use(json());

routes.post('/sessions', sessionController.store);

routes.use(isUser); //all users are allowed
routes.get('/user/{id}', UsersController.index);

routes.use(isManager); //only managers
routes.post('/user', UsersController.create);

export default routes;
