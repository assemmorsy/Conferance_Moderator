const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const routerRegister = require('./middlewares/routersRegister');
const notFoundResourceMiddleware = require('./middlewares/notFoundResourceMiddleWare');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');


const app = express();

app.listen(process.env.DEV_PORT, () => {
  console.log('Listening on port ' + process.env.DEV_PORT);
});

/*
 * MW
*/

app.use(morgan('combined'));
routerRegister(app);
notFoundResourceMiddleware(app);
errorHandlerMiddleware(app);