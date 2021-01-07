import User from "../entity/User";

export default interface IUserRepository {
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
}