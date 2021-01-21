import { Router } from 'express';

import UserController from './app/controller/UserController';
import AccountController from './app/controller/AccountController';

const routes = new Router();

routes.get('/users', UserController.findAll);
routes.post('/users', UserController.save);

routes.post('/accounts', AccountController.save);
routes.get('/accounts', AccountController.findAll);

export default routes;
