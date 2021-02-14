import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AccountService from '../service/AccountService';
import FieldsAreRequiredException from '../exception/FieldsAreRequiredException';
import Account from '../entity/Account';
class AccountController {

    public async save(req: Request, res: Response) {
        try {
            const accountService = container.resolve(AccountService);
            const accountSaved = await accountService.save(req.body);
            return res.status(201).json(accountSaved);
        } catch (err) {
            if (err instanceof FieldsAreRequiredException) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Account[]> {
        const accountService = container.resolve(AccountService);
        const accounts = await accountService.findAll();
        return res.status(200).json(accounts);
    }

    public async findById(req: Request, res: Response): Promise<Account> {
        const { id } = req.params;
        const accountService = container.resolve(AccountService);
        const account = await accountService.findById(id);
        return res.status(200).json(account);
    }
}

export default new AccountController();