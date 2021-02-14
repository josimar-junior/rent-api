import * as Yup from 'yup';
import { inject, injectable } from "tsyringe";
import Account from "../entity/Account";
import IAccountRepository from "../repository/IAccountRepository";
import FieldsAreRequiredException from '../exception/FieldsAreRequiredException';

@injectable()
export default class AccountService {

    constructor(
        @inject('AccountRepository')
        private accountRepository: IAccountRepository
    ) { }

    public async save(account: Account): Promise<Account> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            user: Yup.object().required()
        });
        if (!(await schema.isValid(account))) {
            throw new FieldsAreRequiredException('Fields are required');
        }

        return await this.accountRepository.save(account);
    }

    public async findAll(): Promise<Account[]> {
        return await this.accountRepository.findAll();
    }

    public async findById(id: number): Promise<Account> {
        return await this.accountRepository.findById(id);
    }
}