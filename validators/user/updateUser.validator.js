const { body, oneOf, check } = require('express-validator');

module.exports = [
  body("fullName").isLength({ min: 2 }),
  body('email').isEmail().withMessage('Ivalid email address'),
  body('phone').isMobilePhone().isLength({ min: 2 }),
  body('placeOfWork').isString(),
  body('biography').isString(),
  body('nationality').isString(),

  body('university').isInt(),
  body('specialty').isInt(),
  body('scientificDegree').isInt(),
]
