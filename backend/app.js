const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/product');
const clientRoutes = require('./routes/client');
const addressClientRoutes = require('./routes/addressClient');
const orderRoutes = require('./routes/order');
const storeRoutes = require('./routes/store')
const templateRoutes = require('./routes/template')
const app = express();
const storeOwnerRoutes = require('./routes/storeOwner');


// change the db
mongoose.connect('mongodb+srv://ostuser:ostuser@cluster0.mrzjp.mongodb.net/OSTteam?retryWrites=true&w=majority')
  .then(() => {
    console.log('everything in place');
  })
  .catch(() => {
    console.log('connection failed');
  });

app
  .use('/backend/images',express.static('backend/images'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    next();
  })
  .use("/storeOwner", storeOwnerRoutes)
  .use('/product', productsRoutes)
  .use('/client', clientRoutes)
  .use('/address', addressClientRoutes)
  .use('/order', orderRoutes)
  .use('/store', storeRoutes)
  .use('/template',templateRoutes)


module.exports = app;

//app.listen(3000);

// app.listen(3000);

