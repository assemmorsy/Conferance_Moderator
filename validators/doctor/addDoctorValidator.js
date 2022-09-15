const { body } = require('express-validator');

module.exports = [
  body("firstName").isAlpha().isLength({ min: 2 }),
  body("lastName").isAlpha().isLength({ min: 2 })
]
