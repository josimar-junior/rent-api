import { container } from 'tsyringe';
import AccountRepository from '../../repository/AccountRepository';
import IAccountRepository from '../../repository/IAccountRepository';
import IUserRepository from '../../repository/IUserRepository';
import UserRepository from '../../repository/UserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
);
container.registerSingleton<IAccountRepository>(
    'AccountRepository',
    AccountRepository
);