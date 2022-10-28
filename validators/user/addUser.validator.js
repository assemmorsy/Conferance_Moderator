const { body, oneOf, check } = require('express-validator');

module.exports = [
  body("fullName").isLength({ min: 2 }),
  body('email').isEmail(),
  body('phone').isMobilePhone().isLength({ min: 2 }),
  // body('specialty').isInt(),
  // body('scientificDegree').isInt(),
  // body('placeOfWork').isString(),
  // body('jobTitle').isString(),
  // body('university').isString(),
]
