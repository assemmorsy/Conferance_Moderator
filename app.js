const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const app = express();
app.listen(process.env.DEV_PORT, () => {
  console.log('Listening on port ' + process.env.DEV_PORT);
});

/*
 * MW
*/

// Logger
app.use(morgan('combined'));

// Not Found
app.use((req, res) => {
  res.status(404).json(({ message: "Not found!" }));
});

// ErrorHandler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.status)
    return res.status(err.status).json({ errors: err.message });
  else
    return res.status(500).json({ errors: err.message });
});