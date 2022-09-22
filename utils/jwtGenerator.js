const jwt = require('jsonwebtoken');

exports.generateJwtForLoggedInUser = (payload) => {
	return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '12h'});
}

exports.generateJwtForEmailConfirmation = (payload) => {
	return jwt.sign(payload, process.env.JWT_KEY);
}
