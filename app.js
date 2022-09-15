const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require('./utils/db');
const swagger = require('./utils/swagger');

const routerRegister = require('./middlewares/routersRegister');
const notFoundResourceMiddleware = require('./middlewares/notFoundResourceMiddleWare');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const associate = require('./models/associate');
const seedData = require('./utils/dataSeeder');

const app = express();
db.sequelize.authenticate()
  .then(() => {
    console.log("conntected to database");
    return db.sequelize.sync({ logging: console.log, alert: true });
  })
  .then(() => {
		associate();
		seedData();
    app.listen(process.env.DEV_PORT | 8080, () => {
      console.log('Listening on port ' + process.env.DEV_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    db.sequelize.close();
  });

/*
 * MW
*/
swagger(app);
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
routerRegister(app);
notFoundResourceMiddleware(app);
errorHandlerMiddleware(app);
