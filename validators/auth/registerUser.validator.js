const { body } = require('express-validator');

module.exports = [
  body("fullName")
    //.exists().withMessage('fullName is required')
    .notEmpty().withMessage('fullName value is required')
    .isLength({ min: 2 }).withMessage('Please, provide a full name'),
  body('email')
    //.exists().withMessage('email is required')
    .notEmpty().withMessage('email value is required')
    .isEmail().withMessage('Invalid email address'),
  body("password")
    //.exists().withMessage('password is required')
    .notEmpty().withMessage('password value is required')
    .isStrongPassword().withMessage('Password must be strong'),
  body('phone')
    //.exists().withMessage('phone is required')
    .notEmpty().withMessage('password value is required')
    .isMobilePhone().withMessage('Invalid phone address'),
]
