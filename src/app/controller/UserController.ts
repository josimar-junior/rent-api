import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../entity/User';
import FieldsAreRequiredException from '../exception/FieldsAreRequiredException';
import UserService from '../service/UserService';

class UserController {

  async findAll(req: Request, res: Response): Promise<User[]> {
    const userService = container.resolve(UserService);
    const users = await userService.findAll();
    return res.status(200).json(users);
  }

  async save(req: Request, res: Response): Promise<User> {
    try {
      const userService = container.resolve(UserService);
      const savedUser = await userService.save(req.body);
      return res.status(201).json(savedUser);
    } catch(err) {
      if(err instanceof FieldsAreRequiredException) {
        return res.status(400).json({error : err.message});
      }
      if(err.message.includes('duplicate key value violates unique constraint')) {
        return res.status(500).json({error : 'Existing email'});
      }
    }
  }
}

export default new UserController();
