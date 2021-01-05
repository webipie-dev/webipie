const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const productsRoutes = require('./routes/product');
const clientRoutes = require('./routes/client');
const orderRoutes = require('./routes/order');
const storeRoutes = require('./routes/store')
const templateRoutes = require('./routes/template')
const app = express();
const storeOwnerRoutes = require('./routes/storeOwner');


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    components: {},
    info: {
      version: "1.0.0",
      title: "Webipie API",
      description: "Webipie API Information",
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["app.js","./routes/*.js"]
};

//enable cors
app.use(cors());

//swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//mongodb+srv://ostuser:ostuser@cluster0.mrzjp.mongodb.net/OSTteam?retryWrites=true&w=majority
// mongodb+srv://webipie:webipie@webipie.ziihb.mongodb.net/webipie?retryWrites=true&w=majority
// change the db
mongoose.connect('mongodb+srv://ostuser:ostuser@cluster0.mrzjp.mongodb.net/OSTteam?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('everything in place');
  })
  .catch(() => {
    console.log('connection failed');
  });

app
  .use('/backend/images',express.static('backend/images'))
  .use('/backend/images/logoImgs',express.static('backend/images/logoImgs'))
  .use('/backend/images/headerImgs',express.static('backend/images/headerImgs'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    next();
  })
  .use('/storeOwner', storeOwnerRoutes)
  .use('/product', productsRoutes)
  .use('/client', clientRoutes)
  .use('/order', orderRoutes)
  .use('/store', storeRoutes)
  .use('/template',templateRoutes)


module.exports = app;
// app.listen(3000);

