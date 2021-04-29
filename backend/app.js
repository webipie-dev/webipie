const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require('morgan');
const helmet = require('helmet')
const path = require('path')

const app = express();

const productsRoutes = require('./routes/product');
const clientRoutes = require('./routes/client');
const orderRoutes = require('./routes/order');
const storeRoutes = require('./routes/store')
const templateRoutes = require('./routes/template')
const storeOwnerRoutes = require('./routes/storeOwner');
const healthcheckRoutes = require('./routes/healthCheck');
const uploadRoutes = require('./routes/upload');


const errorHandler = require('./middlewares/error-handler')
const ApiError = require("./errors/api-error");
const { httpProtocol, hostname, port } = require('./configuration');
// require('./middlewares/caching/cache')

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    components: {},
    info: {
      version: "1.0.0",
      title: "Webipie API",
      description: "Webipie API Information",
      servers: [`${httpProtocol}://${hostname}:${port}`]
    }
  },
  apis: ["./swagger-doc/*.js"]
};

app.use(morgan('common'));
app.use(helmet());

app.use(cors());

//swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app
  .use('/backend/images',express.static(path.join(__dirname,'images')))
  .use('/backend/images/logos',express.static(path.join(__dirname,'images/logos')))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use('/storeOwner', storeOwnerRoutes)
  .use('/product', productsRoutes)
  .use('/client', clientRoutes)
  .use('/order', orderRoutes)
  .use('/store', storeRoutes)
  .use('/template',templateRoutes)
  .use('/health_check', healthcheckRoutes)
  .use('/upload',uploadRoutes);


app.all('*', async (req, res, next) => {
  next(ApiError.NotFound(`Route Not Found. req: ${req}`))
});

app.use(errorHandler);


module.exports = app;
