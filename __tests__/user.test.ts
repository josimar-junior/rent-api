import supertest from 'supertest';
import App from '../src/app';
import { createConnection, getConnection } from 'typeorm';

import "reflect-metadata";

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});

test('Should list all users', async () => {
  await supertest(App).get('/users').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
});

test('Should save user successfully', async () => {
  const email = `${Date.now()}@gmail.com`;
  await supertest(App).post('/users')
    .send({ name: 'Maria', email, password: '123456' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', 'Maria');
    });
});
