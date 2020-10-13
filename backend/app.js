const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');

// change the db
mongoose.connect('mongodb+srv://ostuser:ostuser@cluster0.mrzjp.mongodb.net/OSTteam?retryWrites=true&w=majority')
  .then(() => {
    console.log('everything in place');
  })
  .catch(() => {
    console.log('connection failed');
  });

app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    next();
  });


app.use("/users", users);



module.exports = app;
