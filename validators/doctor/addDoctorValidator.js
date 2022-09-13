const { body } = require('express-validator');

module.exports = [
  body("firstName").isAlpha().isLength({ min: 2 })
]