import { container } from 'tsyringe';
import IUserRepository from '../../repository/IUserRepository';
import UserRepository from '../../repository/UserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
);