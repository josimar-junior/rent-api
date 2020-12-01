const supertest = require('supertest');

const request = supertest('http://localhost:3001');

test('Should respond on port 3001', async () => {
  await request.get('/').then((res) => expect(res.status).toBe(200));
});
