import { Repository, getRepository } from 'typeorm';
import Account from "../entity/Account";
import IAccountRepository from "./IAccountRepository";

export default class AccountRepository implements IAccountRepository {

    private repository: Repository<Account>;

    constructor() {
        this.repository = getRepository(Account);
    }

    public async save(account: Account): Promise<Account> {
        return await this.repository.save(account);
    }

    public async findAll(): Promise<Account[]> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<Account> {
        return await this.repository.findOne(id);
    }

}