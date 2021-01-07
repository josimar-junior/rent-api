import { getRepository, Repository } from 'typeorm';
import User from "../entity/User";
import IUserRepository from "./IUserRepository";

class UserRepository implements IUserRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    public async findAll(): Promise<User[]> {
        return await this.repository.find();
    }
    public async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }
}

export default UserRepository;