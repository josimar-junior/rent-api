import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

class UserController {
  async findAll(req: Request, res: Response): Promise<User[]> {
    const users = await getRepository(User).find();
    return res.status(200).json(users);
  }

  async save(req: Request, res: Response): Promise<User> {
    const savedUser = await getRepository(User).save(req.body);
    return res.status(201).json(savedUser);
  }
}

export default new UserController();
