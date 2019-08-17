const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/User')

beforeEach(async () => {
  await User.deleteMany({})
});

test('Username length is longer than 3 characters', async () => {
  const username = '12';
  const password = 'helsinki';

  const user = { username, password };

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
})

test('Password length is longer than 3 characters', async () => {
  const password = '12';
  const username = 'helsinki';

  const user = { username, password };
  
  await api
    .post('/api/users')
    .send(user)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
}) 