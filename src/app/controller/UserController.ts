import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../entity/User';
import UserService from '../service/UserService';

class UserController {

  async findAll(req: Request, res: Response): Promise<User[]> {
    const userService = container.resolve(UserService);
    const users = await userService.findAll();
    return res.status(200).json(users);
  }

  async save(req: Request, res: Response): Promise<User> {
    const userService = container.resolve(UserService);
    const savedUser = await userService.save(req.body);
    return res.status(201).json(savedUser);
  }
}

export default new UserController();
