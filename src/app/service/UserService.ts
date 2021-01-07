import { inject, injectable } from "tsyringe";
import User from "../entity/User";
import IUserRepository from "../repository/IUserRepository";

@injectable()
class UserService {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}

export default UserService;