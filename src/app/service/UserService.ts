import { inject, injectable } from "tsyringe";
import * as Yup from 'yup';
import User from "../entity/User";
import FieldsAreRequiredException from "../exception/FieldsAreRequiredException";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class UserService {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async save(user: User): Promise<User> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });

        if(!(await schema.isValid(user))) {
            throw new FieldsAreRequiredException('Fields are required');
        }

        return await this.userRepository.save(user);
    }
}