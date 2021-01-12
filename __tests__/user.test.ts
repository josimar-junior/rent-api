import { Response } from 'express';
import supertest from 'supertest';
import App from '../src/app';
import { createConnection, getConnection } from 'typeorm';

import "reflect-metadata";

const email = `${Date.now()}@gmail.com`;

describe('Users test', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('Should list all users', async () => {
    await supertest(App).get('/users').then((res: Response) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('Should save user successfully', async () => {
    await supertest(App).post('/users')
      .send({ name: 'Maria', email, password: '123456' })
      .then((res: Response) => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('name', 'Maria');
      });
  });

  it('Should not enter an unnamed user', async () => {
    await supertest(App).post('/users')
      .send({ email: 'jose@gmail.com', password: '123456' })
      .then((res: Response) => {
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Fields are required');
      });
  })

  it('Should not enter a user without email', async () => {
    await supertest(App).post('/users')
      .send({ name: 'Maria', password: '123456' })
      .then((res: Response) => {
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Fields are required');
      });
  })

  it('Should not enter a user without password', async () => {
    await supertest(App).post('/users')
      .send({ name: 'Maria', email: 'jose@gmail.com' })
      .then((res: Response) => {
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Fields are required');
      });
  })

  it('Should not save user with existing email', async () => {
    await supertest(App).post('/users')
      .send({ name: 'Maria', email, password: '123456' })
      .then((res: Response) => {
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Existing email');
      });
  });
});
