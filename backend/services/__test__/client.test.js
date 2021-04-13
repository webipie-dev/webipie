const app = require('../../app')
const request = require('supertest')
// const { JWT_SECRET } = require('../../configuration');
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')



it('return a 200', async () => {
  const response = await request(app)
    .get('/client')
    .send({})
    .expect(200);

})
