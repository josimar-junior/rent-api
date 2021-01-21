import Account from "../entity/Account";

export default interface IAccountRepository {
    save(account: Account): Promise<Account>;
    findAll(): Promise<Account[]>;
}