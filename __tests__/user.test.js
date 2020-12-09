import supertest from 'supertest';
import App from '../src/app';

test('Should list all users', async () => {
  await supertest(App).get('/users').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'Josimar');
  });
});

test('Should save user successfully', async () => {
  await supertest(App).post('/users')
    .send({ name: 'Maria', email: 'maria@gmail.com' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', 'Maria');
    });
});
