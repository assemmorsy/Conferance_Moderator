const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const swagger = require('./utils/swagger');

const routerRegister = require('./middlewares/routersRegister');
const notFoundResourceMiddleware = require('./middlewares/notFoundResourceMiddleWare');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const dbConnector = require('./utils/dbConnector');

const app = express();

dbConnector()
	.then((isConnected) => {
		if (isConnected) {
			app.listen(process.env.DEV_PORT | 8080, () => {
				console.log('Listening on port ' + process.env.DEV_PORT);
			});
		}
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
