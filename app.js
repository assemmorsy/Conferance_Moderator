const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const swagger = require('./utils/swagger');
const routerRegister = require('./middlewares/routersRegister');
const notFoundResourceMiddleware = require('./middlewares/notFoundResource.middleaare');
const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware');
const postgresConnector = require('./utils/postgresConnector');
const staticFileServing = require('./middlewares/staticFileServing');

const app = express();

/**
 * Infrastructure
 */

postgresConnector()
  .then((isConnected) => {
    if (isConnected) {
      app.listen(process.env.DEV_PORT | 8080, () => {
        console.log('Listening on port ' + process.env.DEV_PORT);
      });
    }
  });

/**
 * Services
 */

swagger(app);
app.use(cors());
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(bodyParser.json());

/**
 * Middlewares
*/
routerRegister(app);
staticFileServing(app);
notFoundResourceMiddleware(app);
errorHandlerMiddleware(app);

module.exports = app;
