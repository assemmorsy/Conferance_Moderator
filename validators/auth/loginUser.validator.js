const { body } = require('express-validator');

module.exports = [
  body("email").isEmail().withMessage('Invalid email address'),
  body("password").exists({ checkNull: true }).withMessage('Password is required')
]
