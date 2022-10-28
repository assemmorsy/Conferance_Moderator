const { body } = require('express-validator');

module.exports = [
  body("email").isEmail(),
  body("password").exists({ checkNull: true }).withMessage('Password must be filled')
]
