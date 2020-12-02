const supertest = require('supertest');
const app = require('../src/app');

test('Should respond at the root', async () => {
  await supertest(app).get('/').then((res) => expect(res.status).toBe(200));
});
