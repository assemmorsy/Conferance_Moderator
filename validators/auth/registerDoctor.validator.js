const { body } = require('express-validator');

module.exports = [
  body("name").isLength({ min: 2 }).withMessage('Please, provide a full name'),
  body('email').isEmail().withMessage('Invalid email address'),
  body("password").isStrongPassword().withMessage('Password must be strong'),
  body('phone').isMobilePhone().withMessage('Invalid email address'),
]
