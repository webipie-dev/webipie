// import request from 'supertest';
const app = require('../../app')
const request = require('supertest')
// const request = supertest(app)

it('return a 200', async () => {

  const response = await request(app)
    .get('/product')
    .send({})
    .expect(200);

})
