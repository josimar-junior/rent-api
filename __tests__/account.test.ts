import { Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import supertest from 'supertest';
import App from '../src/app';
import "reflect-metadata";
import Account from '../src/app/entity/Account';
import User from '../src/app/entity/User';

const email = `${Date.now()}@gmail.com`;
let savedUser: User;

const MAIN_ROUTE: string = '/accounts';

describe('Accounts test', () => {
    beforeAll(async () => {
        await createConnection();
        const response = await supertest(App).post('/users')
            .send({ name: 'User Account 1', email, password: '123456' });
        savedUser = response.body;
    });

    afterAll(async () => {
        await getConnection().close();
    });

    it('Should save account with successfully', async () => {
        await supertest(App).post(MAIN_ROUTE)
            .send({ name: 'Creating Account', user: savedUser })
            .then((res: Response) => {
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('name', 'Creating Account');
            });
    });

    it('Should list all accounts', async () => {
        await supertest(App).post(MAIN_ROUTE)
            .send({ name: 'Creating Account to list', user: savedUser })
            .then(() => supertest(App).get(MAIN_ROUTE))
            .then((res: Response) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0);
            });
    });

    it('Should return an account by id', async () => {
        await supertest(App).post(MAIN_ROUTE)
            .send({ name: 'Creating Account to get by id', user: savedUser })
            .then((res: Response) => supertest(App).get(`${MAIN_ROUTE}/${res.body.id}`))
            .then((res: Response) => {
                expect(res.status).toBe(200);
                expect(res.body.name).toBe('Creating Account to get by id');
            });
    });
});