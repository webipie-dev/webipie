// import request from 'supertest';
const app = require('../../app')
const request = require('supertest')
// const request = supertest(app)

it('reeturn a 200', async () => {
  return request(app)
    .get('')
    .send({})
    .expect(200)
})
