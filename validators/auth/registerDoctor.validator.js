const { body, oneOf, check } = require('express-validator');

module.exports = [
  body("firstName").isAlpha().isLength({ min: 2 }),
  body("lastName").isAlpha().isLength({ min: 2 }),
	body('email').isEmail(),
  body("password").exists({ checkNull: true }).withMessage('Password must be filled'),
	body('phone').isMobilePhone().isLength({min: 2}),
	body('specialty').isInt(),
	body('scientificDegree').isInt(),
	body('placeOfWork').isString(),
	body('jobTitle').isString(),
	body('university').isString(),
]
