// import { MongoMemoryServer } from 'mongodb-memory-server'
// import mongoose from 'mongoose'
// import { app } from '../app'
// const MongoMemoryServer = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = new MongoMemoryServer();

beforeAll(async () => {

  // const mongoUri = await mongo.getUri();
  const mongoUri = 'mongodb+srv://webipie:webipie@webipie.ziihb.mongodb.net/webipie?retryWrites=true&w=majority'

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

  });
});

beforeEach(async () => {
  // console.log(mongoose.connection.readyState)
  const collections = await mongoose.connection.collections;

  for (const key in collections) {
    // console.log(key, collections[key])
    // const collection = collections[key];
    // await collection.deleteMany();
  }
});
//
afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  // await mongo.stop();
});
